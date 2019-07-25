class SpacePKUI extends game.BaseUI_wx3 {
    private static _instance:SpacePKUI;
    public static getInstance() {
        if (!this._instance) this._instance = new SpacePKUI();
        return this._instance;
    }

    public constructor() {
        super();
        this.skinName = "SpacePKUISkin";
        this.isShowAD = true
        this.adBottom = 0
    }

    private topUI: TopUI;
    private con: eui.Group;
    private chooseGroup: eui.Group;
    private addSpeedBtn: eui.Group;
    private speedMC: eui.Image;
    private speedMC2: eui.Image;
    private speedText: eui.Label;
    private skillList: eui.List;
    private force1Text: eui.Label;
    private force2Text: eui.Label;
    private cdGroup: eui.Group;
    private timeText: eui.Label;
    private winGroup: eui.Group;
    private winText: eui.Label;
    private starGroup: eui.Group;
    private s0: eui.Image;
    private s1: eui.Image;
    private s2: eui.Image;
    private desGroup: eui.Group;
    private resourceGroup: eui.Group;
    private coinGroup: eui.Group;
    private des1: eui.Label;
    private diamondGroup: eui.Group;
    private des2: eui.Label;
    private failGroup: eui.Group;
    private failText: eui.Label;
    private btnGroup: eui.Group;
    private backBtn: eui.Button;
    private doubleBtn: eui.Button;
    private replayBtn: eui.Button;
    private hurt1: eui.Image;
    private hurt2: eui.Image;
    private skillBuffList: eui.List;
    private tipsGroup: eui.Group;
    private tipsText: eui.Label;
    private monsterList: eui.List;
    private costBarMC: eui.Image;
    private costText: eui.Label;
    private bottomUI: BottomUI;
    private spaceBtnGroup: eui.Group;
    private infoBtn: eui.Button;
    private closeBtn: eui.Button;










    public finish = false
    public dataIn;
    public lastAction; //上次操作
    public gameStart = false
    public lastRota = 0
    public resultTimer
    public isQuick
    public lastRenewTime = 0;



    private monsterdDataProvider
    private shareStr
    private dragTarget: eui.Image = new eui.Image();

    public childrenCreated() {
        super.childrenCreated();

        this.skillList.itemRenderer = PKSkillItem
        this.skillBuffList.itemRenderer = PKSkillBuffItem
        this.monsterList.itemRenderer = SpacePKItem
        this.monsterList.dataProvider = this.monsterdDataProvider = new eui.ArrayCollection([])

        this.skillBuffList.touchChildren = true;
        this.bottomUI.setHide(this.hide,this);
        this.dragTarget.width = 100
        this.dragTarget.height = 100
        this.dragTarget.alpha = 0.5

        this.addBtnEvent(this.replayBtn,this.onReplay)
        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.backBtn,this.onBack_3581)
        this.addBtnEvent(this.doubleBtn,this.onDouble_8100)
        this.addBtnEvent(this.addSpeedBtn,this.onSpeed_8527)
        this.addBtnEvent(this.infoBtn,()=>{
             SpaceMyListUI.getInstance().show();
        })
        //this.addBtnEvent(this.strongBtn,this.onStrong_947)

        var pkvideo = PKVideoCon_wx3.getInstance();
        this.con.addChild(pkvideo)
        pkvideo.y = 0;
        pkvideo.x = -(PKConfig_wx3.floorWidth + PKConfig_wx3.appearPos*2 - 640)/2;

        PKData_wx3.getInstance().addEventListener('video',this.onVideoEvent2,this);



        this.skillList.addEventListener('start_drag',this.onDragStart,this);
        this.skillList.addEventListener('end_drag',this.onDragEnd,this);
        this.skillList.addEventListener('move_drag',this.onDragMove,this);
        this.monsterList.addEventListener('start_drag',this.onDragStart,this);
        this.monsterList.addEventListener('end_drag',this.onDragEnd,this);
        this.monsterList.addEventListener('move_drag',this.onDragMove,this);
    }
    private onDragStart(e){
        this.dragTarget.source = e.target.getDragSource()
        this.dragTarget['id'] = e.target.getDragData()
        this.stage.addChild(this.dragTarget);
        this.dragTarget.x = e.data.x;
        this.dragTarget.y = e.data.y;
    }

    private onDragMove(e){
        if(!this.dragTarget.parent)
            return;
        this.dragTarget.x = e.data.x - this.dragTarget.width/2;
        this.dragTarget.y = e.data.y - this.dragTarget.height/2;
    }

    private onDragEnd(e){
        if(!this.dragTarget.parent)
            return;
        MyTool.removeMC(this.dragTarget)
        var x = this.dragTarget.x + this.dragTarget.width/2
        var y = this.dragTarget.y + this.dragTarget.height/2
        if(y > 55 && y < 555)
        {
            if(this.dragTarget['id'] >200)
                PKData_wx3.getInstance().useSkill(this.dragTarget['id'])
           else
                PKData_wx3.getInstance().useMonster(this.dragTarget['id'])
        }
    }

    public getMItemIndex(item){
        for(var i=0;i<this.monsterList.numChildren;i++)
        {
            if(this.monsterList.getChildAt(i) == item)
                return i;
        }
    }

    //private onStrong_947(){
    //    var tecid = 32;
    //    if(this.dataIn.fight && this.dataIn.fight.type == 'def')
    //        tecid = 31
    //    PKFailUI.getInstance().show(tecid)
    //}

    public onVideoEvent2(e){
        if(!this.stage)
            return;
        var videoData = e.data;
        switch(videoData.type)//动画类型
        {
            case PKConfig_wx3.VIDEO_MONSTER_WIN:
                var rota = videoData.user.getOwner().teamData.atkRota == PKConfig_wx3.ROTA_LEFT?PKConfig_wx3.ROTA_RIGHT:PKConfig_wx3.ROTA_LEFT
                this.showHurt(rota);
                break;
            case PKConfig_wx3.VIDEO_SKILL_USE:
                this.showSkillUse(videoData.skillID);
                this.renewSkill();
                break;
            case PKConfig_wx3.VIDEO_SKILL_BUFF:
                this.renewSkillBuff();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_ADD:
                this.renewMonsterNum();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_USE:
                this.onMonsterUse(videoData.index);
                var PD = PKData_wx3.getInstance();
                if(!PD.startTime)
                    this.startGame();
                break;
        }
    }

    private renewMonsterNum(){
        var PD = PKData_wx3.getInstance();
        this.force1Text.text = '剩余：' + PD.getPlayer(1).autoList.length;
        var num = PD.handCardList.length;
        for(var s in PD.handData)
        {
            if(PD.handData[s])
                num ++;
        }
        this.force2Text.text = '剩余：' + num
    }

    //更新显示
    private onMonsterUse(index = -1){
        var PD = PKData_wx3.getInstance();
        if(index != -1)
        {
            this.monsterList.getChildAt(index)['showMV'](PD.handData[index]);
        }
        else
        {
             for(var i=0;i<this.monsterList.numChildren;i++)
             {
                 this.monsterList.getChildAt(i)['showMV'](PD.handData[i]);
             }
        }
    }

    private showSkillUse(skillID){
        UseSkillItem.showMV(skillID,this)
    }

    private renewSkill(){
        var arr = []
        if(this.dataIn.isReplay)
        {
            while(arr.length < 5)
                arr.push({disable:true})
        }
        else
        {
            for(var s in UM_wx3.skills)
            {
                arr.push({
                    id:s,
                    num:UM_wx3.skills[s]
                })
            }
            while(arr.length < 5)
            {
                arr.push(null);
            }
        }
        this.skillList.dataProvider = new eui.ArrayCollection(arr)
    }

    private onSpeed_8527(){
        if(!DEBUG)
        {
            if(BuffManager.getInstance().getUserNum()<1)
            {
                MyWindow.ShowTips('在【好友助力】中解锁PK加速功能')
                return;
            }
        }
        PKData_wx3.getInstance().playSpeed ++;
        if(PKData_wx3.getInstance().playSpeed > 3)
            PKData_wx3.getInstance().playSpeed = 1;
        this.renewSpeedBtn_6940();
    }

    private renewSpeedBtn_6940(){
        this.speedText.text =  'x' + PKData_wx3.getInstance().playSpeed;
    }

    private onDouble_8100(){
        ShareTool.share(this.shareStr,Config.localResRoot + "share_img_2.jpg",{},()=>{

        },true)
    }

    private onBack_3581(){
        this.hide();
        SpaceManager.getInstance().startPK();
    }

    private runItemFun_8414(list,index,funName){
        if(list.numChildren <= index)
            return
        var item:any = list.getChildAt(index)
        item[funName] && item[funName]();
    }

    public show(data?){

        PKManager_wx3.getInstance().isPKing = true
        this.dataIn = data
        super.show();
    }

    public onShow(){
        this.lastAction = []
        var pkvideo = PKVideoCon_wx3.getInstance()
        this.con.addChild(pkvideo)
        pkvideo.y = 0;

        if(this.dataIn.isMain)
        {
            MyTool.removeMC(this.backBtn)
        }
        else
        {
            this.btnGroup.addChildAt(this.backBtn,0)
            this.backBtn.label = '关闭'
        }
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onStep)
        this.addPanelOpenEvent(GameEvent.client.SPACE_CHANGE,this.onSpaceChange)
        this.reset();
    }

    private onSpaceChange(){
        if(!this.finish)//未打
        {
            this.onBack_3581();
        }
    }

    public hide(){
        SpaceInfoUI.getInstance().show();
        PKManager_wx3.getInstance().isPKing = false
        SoundManager_wx3.getInstance().playSound('bg');
        PKVideoCon_wx3.getInstance().remove();
        super.hide();
    }

    public onReplay(){
        this.dataIn.passTime = 0;
        this.dataIn.isReplay = true;
        this.lastAction = PKData_wx3.getInstance().actionList.concat();
        this.reset();
    }

    public reset(){
        this.timeText.text = '0'
        this.gameStart = false;
        this.addSpeedBtn.visible = true
        this.skillList.touchChildren = this.skillList.touchEnabled = false;

        if(this.dataIn.isReplay)
        {
            this.currentState = 's2'
            this.adBottom = 100;
            MyADManager.getInstance().showBanner(100)
            this.topUI.setTitle(this.dataIn.title || '回放')
            this.monsterList.touchChildren = this.monsterList.touchEnabled = false;
        }
        else
        {
            this.currentState = 's1'
            this.adBottom = 0;
            MyADManager.getInstance().showBanner(0)
            this.topUI.setTitle(this.dataIn.title || '战斗进行中...')
            this.monsterList.touchChildren = this.monsterList.touchEnabled = true;

        }

        PKVideoCon_wx3.getInstance().x = -(PKConfig_wx3.floorWidth + PKConfig_wx3.appearPos*2 - 640)/2;
        this.winGroup.visible = false;
        this.failGroup.visible = false;
        this.btnGroup.visible = false;
        this.hurt1.visible = false
        this.hurt2.visible = false
        egret.Tween.removeTweens(this.hurt1)
        egret.Tween.removeTweens(this.hurt2)
        this.isQuick = true;
        this.finish = false;

        clearTimeout(this.resultTimer);
        egret.Tween.removeTweens(this.failGroup)
        egret.Tween.removeTweens(this.winGroup)

        var data = {
            seed:this.dataIn.seed,
            pkModel:2,
            isReplay:this.dataIn.isReplay,
            spaceType:SpaceManager.getInstance().spaceType,
            autoMonster:SpaceManager.getInstance().autoMonster,
            players:[
                {id:1,gameid:'team1',team:1,force:this.dataIn.force1,hp:1,autolist:this.dataIn.list1,mforce:this.dataIn.mforce1,atkBuff:this.dataIn.atkBuff1,hpBuff:this.dataIn.hpBuff1},
                {id:2,gameid:'team2',team:2,force:this.dataIn.force2,hp:1,autolist:this.dataIn.list2,mforce:this.dataIn.mforce2,atkBuff:this.dataIn.atkBuff2,hpBuff:this.dataIn.hpBuff2}
            ]
        };





        PKBulletManager_wx3.getInstance().freeAll();
        var PD = PKData_wx3.getInstance();
        PD.init(data);
        if(this.lastAction.length)
            PD.actionList = this.lastAction;
        if(!this.dataIn.isReplay && DM.jumpPK)
        {
            PD.quick = true;
            PD.quickTime = Number.MAX_VALUE;
        }
        PKData_wx3.getInstance().playSpeed = 1;
        this.renewSpeedBtn_6940();

        PKVideoCon_wx3.getInstance().init(this.dataIn);
        this.lastRenewTime = 0;
        this.renewSkill();
        this.renewSkillBuff();
        this.renewCost();
        this.renewMonsterNum();
        this.monsterdDataProvider.source = [PD.handData[0],PD.handData[1],PD.handData[2],PD.handData[3],PD.handData[4],PD.handData[5]];
        this.monsterdDataProvider.refresh();


        if(this.dataIn.isReplay)
        {
            this.startGame();
        }
        else
        {
            egret.Tween.removeTweens(this.tipsText)
            this.tipsGroup.visible = true
            this.spaceBtnGroup.visible = true
            if(SpaceManager.getInstance().myDieList.length == 0)
            {
                MyTool.removeMC(this.infoBtn);
            }
            else
            {
                this.spaceBtnGroup.addChildAt(this.infoBtn,0)
            }
            this.tipsGroup.rotation = 0
            egret.Tween.get(this.tipsText,{loop:true}).to({rotation:8},100).to({rotation:-8},100).to({rotation:8},100).to({rotation:-8},100).to({rotation:0},100).wait(1000)
        }

    }

    public startGame(){
        this.tipsGroup.visible = false
        this.spaceBtnGroup.visible = false
        egret.Tween.removeTweens(this.tipsText)
        this.gameStart = true;
        if(!this.dataIn.isReplay)
            this.skillList.touchChildren = this.skillList.touchEnabled = true;
        var PD = PKData_wx3.getInstance();
        PD.start();
        this.onStep()
        //this.isQuick = false;
        //if(PD.isGameOver)
        //{
        //    PKVideoCon_wx3.getInstance().resetView();
        //    var videoCon = PKVideoCon_wx3.getInstance();
        //    var result = PD.getPKResult();
        //    if(result == 1)
        //    {
        //        var item = PKData_wx3.getInstance().getFirstItem(PKData_wx3.getInstance().myPlayer.teamData.id);
        //        var item2 = PKData_wx3.getInstance().getBackItem(PKData_wx3.getInstance().myPlayer.teamData.id);
        //    }
        //    else if(result == 2)
        //    {
        //        var item = PKData_wx3.getInstance().getFirstItem(PKData_wx3.getInstance().myPlayer.teamData.enemy.id);
        //        var item2 = PKData_wx3.getInstance().getBackItem(PKData_wx3.getInstance().myPlayer.teamData.enemy.id);
        //    }
        //    else
        //    {
        //        var item = PKData_wx3.getInstance().getFirstItem(PKData_wx3.getInstance().myPlayer.teamData.id);
        //        var item2 = PKData_wx3.getInstance().getFirstItem(PKData_wx3.getInstance().myPlayer.teamData.enemy.id);
        //    }
        //
        //    if(item && item2)
        //    {
        //        var w = 640
        //        var scrollH = -((item.x + item2.x)/2 - w/2);
        //        if(scrollH > 0)
        //            scrollH = 0;
        //        else if(scrollH < w - videoCon.width)
        //            scrollH = w - videoCon.width;
        //        videoCon.x = scrollH;
        //    }
        //}
        //else
            SoundManager_wx3.getInstance().playSound('pkbg')
    }

    public showHurt(rota){
        var mc;
        if(rota == PKConfig_wx3.ROTA_LEFT)
            mc = this.hurt1
        else
            mc = this.hurt2
        egret.Tween.removeTweens(mc);
        mc.visible = true
        mc.alpha = 0
        egret.Tween.get(mc).to({alpha:1},150).to({alpha:0},150).call(function(){
            mc.visible = false
        },this)
    }

    private renewSkillBuff(){
        var PD = PKData_wx3.getInstance();
        this.skillBuffList.dataProvider = new eui.ArrayCollection(PD.getSkillBuff());
    }

    private renewCost(){
        var PD = PKData_wx3.getInstance();
        var player = PD.getPlayer(2)
        player.resetCost()
        this.costText.text = player.cost + '';
        this.costBarMC.width = Math.min(1,(player.cost + (PD.actionTime-player.costTime)/PD.getCostCD())/20)*600
    }

    public onStep(){
        if(!this.gameStart)
            return;

        if(this.finish)
        {
            PKVideoCon_wx3.getInstance().action();
            return;
        }

        var PD = PKData_wx3.getInstance();
        var PC = PKCode_wx3.getInstance();
        var SM = SpaceManager.getInstance()

        PC.onStep();
        PKVideoCon_wx3.getInstance().action();
        MyTool.runListFun(this.skillList,'onE')
        MyTool.runListFun(this.monsterList,'onE')
        this.renewCost();

        this.timeText.text = Math.floor(PD.actionTime/1000) + ''
        if(PD.isGameOver)
        {
            this.finish = true;
            PD.playSpeed = 1;
            this.addSpeedBtn.visible = false

            this.shareStr = ''
            this.desGroup.visible = false;
            this.desGroup['callVisible'] = false
            PKBulletManager_wx3.getInstance().freeAll();
            var result = PD.getPKResult();
            var isEndLess = SM.spaceType == 2 || SM.spaceType == 7;
            if(isEndLess)
                result = 2;
            if(!this.dataIn.isReplay)
            {
                SM.onPKFinish(result,this.dataIn);
            }
            if(result == 1)
            {
                this.delayShowResult(this.failGroup);
                this.failText.text = '挑战失败'
                this.backBtn.label = '再试一次'//SM.myCurrentList.length>0 || SM.rebornTime < 3?'再试一次':'关闭'
            }
            else
            {
                this.starGroup.removeChildren();
                this.resourceGroup.removeChildren()
                this.delayShowResult(this.winGroup);
                this.winText.text = isEndLess?'' + DateUtil.getStringBySecond(Math.round(PD.actionTime/1000)).substr(-5):'挑战成功';
                this.backBtn.label = (isEndLess)?'继续战斗':'下一关'
                if(this.dataIn.coin)
                {
                    this.desGroup['callVisible'] = true
                    this.resourceGroup.addChild(this.coinGroup)
                    this.des1.text = 'x' + NumberUtil.addNumSeparator(this.dataIn.coin,2)
                }
                if(this.dataIn.diamond)
                {
                    this.desGroup['callVisible'] = true
                    this.resourceGroup.addChild(this.diamondGroup)
                    this.des2.text = 'x' + this.dataIn.diamond;
                }
                var bData = SM.baseData[SM.spaceType];
                if(isEndLess)
                    this.shareStr = '我在'+bData.name+'中坚持了'+DateUtil.getStringBySecond(Math.round(PD.actionTime/1000)).substr(-5)+',收获丰厚！'
                else
                    this.shareStr = '我在'+bData.name+'中成功通过了第'+(SM.level-1)+'关,收获丰厚！';
            }

            if(this.shareStr)
            {
                this.btnGroup.addChild(this.doubleBtn)
                //MyTool.removeMC(this.strongBtn)
            }
            else
            {
                MyTool.removeMC(this.doubleBtn)
                //this.btnGroup.addChild(this.strongBtn)
            }
            if(this.backBtn.label == '关闭')
                MyTool.removeMC(this.backBtn)
        }
        else
        {
            var item = PKData_wx3.getInstance().getFirstItem(PKData_wx3.getInstance().myPlayer.teamData.id);
            var item2 = PKData_wx3.getInstance().getFirstItem(PKData_wx3.getInstance().myPlayer.teamData.enemy.id);
            if(item && item2)
            {
                var posDes = 80
                var videoCon = PKVideoCon_wx3.getInstance();
                var w = 640
                var scrollH = -((item.x + item2.x)/2 - w/2);
                if(scrollH > -posDes)
                    scrollH = -posDes;
                else if(scrollH < w - videoCon.width + posDes)
                    scrollH = w - videoCon.width + posDes;
                var dec = Math.abs(videoCon.x - scrollH)
                var rote =  videoCon.x > scrollH ?1:-1
                if(dec > 80 || this.lastRota == rote)
                {
                    egret.Tween.removeTweens(videoCon)
                    if(dec > 10)
                    {
                        var tw = egret.Tween.get(videoCon)
                        tw.to({x:scrollH},Math.min(300,dec*10))
                    }
                    else
                    {
                        videoCon.x = scrollH;
                    }
                    this.lastRota = rote
                }
            }
        }
    }



    public delayShowResult(mc)
    {
        clearTimeout(this.resultTimer);
        this.skillList.touchChildren = this.skillList.touchEnabled = false;
        this.monsterList.touchChildren = this.monsterList.touchEnabled = false;
        this.resultTimer = setTimeout(()=>{
            PKVideoCon_wx3.getInstance().resetAllMVSpeed();
            if(mc == this.winGroup)
                SoundManager_wx3.getInstance().playEffect('win');
            else
                SoundManager_wx3.getInstance().playEffect('fail');
            mc.visible = true;
            mc.scaleX = mc.scaleY = 0;
            var tw = egret.Tween.get(mc).to({scaleX:1.2,scaleY:1.2},300).to({scaleX:1,scaleY:1},300)
            tw.call(()=>{
                SoundManager_wx3.getInstance().playSound('bg');
                this.desGroup.visible = this.desGroup['callVisible'];
            })

            tw.call(()=>{

                if(CardInfoUI.getInstance().stage)
                    CardInfoUI.getInstance().hide();
                if(SkillInfoUI.getInstance().stage)
                    SkillInfoUI.getInstance().hide();


                this.skillBuffList.dataProvider = new eui.ArrayCollection([]);
                this.btnGroup.visible = true
                this.currentState = 's2'
                this.adBottom = 100;
                MyADManager.getInstance().showBanner(100)

                if(!this.dataIn.isReplay)
                {
                    SpaceManager.getInstance().testFreeBorn();
                }


            })

        },1000)
    }
}