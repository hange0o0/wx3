class MainPKUI_wx3 extends game.BaseUI_wx3 {
    private static _instance:MainPKUI_wx3;
    public static getInstance() {
        if (!this._instance) this._instance = new MainPKUI_wx3();
        return this._instance;
    }
	private wx3_functionX_12442(){console.log(3417)}

    public constructor() {
        super();
        this.skinName = "MainPKUISkin";
        this.isShowAD = true
        this.adBottom = 0
    }

    private topUI: TopUI;
    private con: eui.Group;
    private forceGroup: eui.Group;
    private lineMC: eui.Rect;
    private scroller: eui.Scroller;
    private list1: eui.List;
    private list2: eui.List;
    private chooseGroup: eui.Group;
    private addSpeedBtn: eui.Group;
    private speedMC: eui.Image;
    private speedMC2: eui.Image;
    private speedText: eui.Label;
    private skillList: eui.List;
    private skillBuffList: eui.List;
    private cost1Group: eui.Group;
    private force1Text: eui.Label;
    private cost2Group: eui.Group;
    private force2Text: eui.Label;
    private bottomBar: eui.Group;
    private hpBar1: eui.Image;
    private hpBar2: eui.Image;
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
    private strongBtn: eui.Button;
    private hurt1: eui.Image;
    private hurt2: eui.Image;
    private bottomUI: BottomUI;


    public dataIn;
    public lastAction; //上次操作
    public finish = false
	private wx3_functionX_12453(){console.log(4360)}
    public gameStart = false
    public lastRota = 0
    public list1Data
    public list2Data
    public resultTimer
    public isQuick
	private wx3_functionX_12454(){console.log(6880)}
    public lastRenewTime = 0;



    private shareStr
    private dragTarget: eui.Image = new eui.Image();

	private wx3_functionX_12455(){console.log(6012)}
    public childrenCreated() {
        super.childrenCreated();

        this.skillList.itemRenderer = PKSkillItem
        this.skillBuffList.itemRenderer = PKSkillBuffItem
        this.skillBuffList.touchChildren = true;
        this.bottomUI.setHide(this.hide,this);
        this.dragTarget.width = 100
        this.dragTarget.height = 100
        this.dragTarget.alpha = 0.5

        this.addBtnEvent(this.replayBtn,this.onReplay)
        this.addBtnEvent(this.backBtn,this.onBack_3581)
        this.addBtnEvent(this.doubleBtn,this.onDouble_8100)
        this.addBtnEvent(this.addSpeedBtn,this.onSpeed_8527)
        this.addBtnEvent(this.strongBtn,this.onStrong_947)

	wx3_function(9144);
        var pkvideo = PKVideoCon_wx3.getInstance();
        this.con.addChild(pkvideo)
        pkvideo.y = 0;
        pkvideo.x = -(PKConfig_wx3.floorWidth + PKConfig_wx3.appearPos*2 - 640)/2;

        PKData_wx3.getInstance().addEventListener('video_word',this.onVideoEvent,this);
	wx3_function(3237);
        PKData_wx3.getInstance().addEventListener('video',this.onVideoEvent2,this);

        this.list1.itemRenderer = MainPKItem_wx3
        this.list2.itemRenderer = MainPKItem_wx3


        this.skillList.addEventListener('start_drag',this.onDragStart,this);
        this.skillList.addEventListener('end_drag',this.onDragEnd,this);
        this.skillList.addEventListener('move_drag',this.onDragMove,this);
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
            PKData_wx3.getInstance().useSkill(this.dragTarget['id'])
        }
    }

    private onStrong_947(){
        var tecid = 32;
        if(this.dataIn.fight && this.dataIn.fight.type == 'def')
            tecid = 31
        PKFailUI.getInstance().show(tecid)
    }
	private wx3_functionX_12457(){console.log(4973)}

    public onVideoEvent2(e){
        if(!this.stage)
            return;
        var videoData = e.data;
        switch(videoData.type)//动画类型
        {
            case PKConfig_wx3.VIDEO_MONSTER_WIN:
                var rota = videoData.user.getOwner().teamData.atkRota == PKConfig_wx3.ROTA_LEFT?PKConfig_wx3.ROTA_RIGHT:PKConfig_wx3.ROTA_LEFT
                this.showHurt(rota);
	wx3_function(4237);
                break;
            case PKConfig_wx3.VIDEO_SKILL_USE:
                this.showSkillUse(videoData.skillID);
                this.renewSkill();
                break;
            case PKConfig_wx3.VIDEO_SKILL_BUFF:
                this.renewSkillBuff();
                break;
        }
    }

    private showSkillUse(skillID){
        UseSkillItem.showMV(skillID,this)
        //console.log('使用了技能' + skillID)
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
            if(GuideManager.getInstance().isGuiding)
                return;
            if(BuffManager.getInstance().getUserNum()<1)
            {
                MyWindow.ShowTips('在【好友助力】中解锁PK加速功能')
                return;
            }
        }

	wx3_function(5861);
        PKData_wx3.getInstance().playSpeed ++;
        if(PKData_wx3.getInstance().playSpeed > 3)
            PKData_wx3.getInstance().playSpeed = 1;
        SharedObjectManager_wx3.getInstance().setMyValue('pkSpeed',PKData_wx3.getInstance().playSpeed)
        this.renewSpeedBtn_6940();
    }
	private wx3_functionX_12458(){console.log(1127)}

    private renewSpeedBtn_6940(){
        this.speedText.text =  'x' + PKData_wx3.getInstance().playSpeed;
        //this.speedMC.visible = PKData_wx3.getInstance().playSpeed > 1
        //this.speedMC2.visible = PKData_wx3.getInstance().playSpeed > 2
    }

	private wx3_functionX_12459(){console.log(6967)}
    private onDouble_8100(){
        ShareTool.share(this.shareStr,Config.localResRoot + "share_img_2.jpg",{},()=>{

        },true)
    }

	private wx3_functionX_12460(){console.log(8120)}
    private onBack_3581(){
        this.hide();
        if(this.dataIn.chapterid)
        {
            if(this.backBtn.label == '重试')
            {
                 ChapterManager.getInstance().pkChapter(this.dataIn.chapterid)
            }
            else if(this.backBtn.label == '下一关')
            {
                 ChapterManager.getInstance().pkChapter(this.dataIn.chapterid + 1)
            }
        }
        else if(this.dataIn.isAsk)
        {
            AskManager.getInstance().showPK()
        }
        //if(!this.dataIn.isMain)
        //    LogUI.getInstance().show()
    }
	private wx3_functionX_12461(){console.log(9487)}


    public onVideoEvent(e){
        if(!this.stage)
            return;
        var videoData = e.data;
        if(videoData.type != PKConfig_wx3.VIDEO_MONSTER_ADD && videoData.type != PKConfig_wx3.VIDEO_MONSTER_DIE)
            return;
        var data:PKMonsterData_wx3 = videoData.user;
	wx3_function(5305);
        if(!data.index)
            return;

        var index = data.index - 1;
        var teamID = data.getOwner().teamData.id;
        switch(videoData.type)//动画类型
        {
            case PKConfig_wx3.VIDEO_MONSTER_ADD:
                if(teamID == 1)
                {
                    this.runItemFun_8414(this.list1,index,'showBorn')
                    this.list1Data[index].isDie = false;
	wx3_function(8710);
                }
                else
                {
                    this.runItemFun_8414(this.list2,index,'showBorn')
                    this.list2Data[index].isDie = false;
                }
                break;

            case PKConfig_wx3.VIDEO_MONSTER_DIE:
                if(teamID == 1)
                {
                    this.runItemFun_8414(this.list1,index,'showDie')
                    this.list1Data[index].isDie = true;
	wx3_function(6410);
                }
                else
                {
                    this.runItemFun_8414(this.list2,index,'showDie')
                    this.list2Data[index].isDie = true;
                }
                break;
        }
    }
	private wx3_functionX_12462(){console.log(6181)}

    private runItemFun_8414(list,index,funName){
        if(list.numChildren <= index)
            return
        var item:any = list.getChildAt(index)
        item[funName] && item[funName]();
	wx3_function(9193);
    }

    public show(data?){
        if(UM_wx3.isTest)
        {
            MainPKTestUI.getInstance().show(data);
            return;
        }

        PKManager_wx3.getInstance().isPKing = true
        this.dataIn = data,
        super.show();
	wx3_function(2946);
    }

    public onShow(){
        this.lastAction = []
        if(Config.adHeight)
        {
            this.scroller.bottom = Config.adHeight;
        }
        var pkvideo = PKVideoCon_wx3.getInstance()
        this.con.addChild(pkvideo)
        pkvideo.y = 0;

        this.bottomBar.visible = true
        if(this.dataIn.isMain)
        {
            MyTool.removeMC(this.backBtn)
        }
        else
        {
            this.btnGroup.addChildAt(this.backBtn,0)
            this.backBtn.label = '关闭'
        }
        this.addEventListener(egret.Event.ENTER_FRAME,this.onStep,this)
        this.reset();
	wx3_function(6451);

        this.forceGroup.visible = !this.dataIn.isGuess && !this.dataIn.isAsk
    }

    public hide(){
        PKManager_wx3.getInstance().isPKing = false
        SoundManager_wx3.getInstance().playSound('bg');
	wx3_function(1103);
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onStep,this)
        PKVideoCon_wx3.getInstance().remove();
       super.hide();
    }

    public onReplay(){
        this.dataIn.passTime = 0;
	wx3_function(3151);
        this.dataIn.isReplay = true;
        this.bottomBar.visible = true
        this.lastAction = PKData_wx3.getInstance().actionList.concat();
        this.reset();
    }

    private resetList_1055(list,otherForce=-1){
        var orginList = list.concat();
	wx3_function(6664);
        for(var i=0;i<list.length;i++)
        {
            list[i]  = {id:list[i],isDie:true,index:i+1,list:orginList,otherForce:otherForce}
        }
    }

	private wx3_functionX_12463(){console.log(3369)}
    public reset(){
        this.gameStart = false;
        this.addSpeedBtn.visible = true
        if(this.dataIn.isReplay)
        {
            this.currentState = 's2'
            this.adBottom = 100;
            MyADManager.getInstance().showBanner(100)
            this.topUI.setTitle(this.dataIn.title || '回放')
            this.skillList.touchChildren = this.skillList.touchEnabled = false;
        }
        else
        {
            this.currentState = 's1'
            this.adBottom = 0;
            MyADManager.getInstance().showBanner(0)
            this.topUI.setTitle(this.dataIn.title || '战斗进行中...')
            this.skillList.touchChildren = this.skillList.touchEnabled = true;
        }



	wx3_function(9719);
        PKVideoCon_wx3.getInstance().x = -(PKConfig_wx3.floorWidth + PKConfig_wx3.appearPos*2 - 640)/2;
        //this.stopScrollTimer = 0;
        this.winGroup.visible = false;
        this.failGroup.visible = false;
        this.btnGroup.visible = false;
        this.hurt1.visible = false
        this.hurt2.visible = false
        egret.Tween.removeTweens(this.hurt1)
        egret.Tween.removeTweens(this.hurt2)
        this.finish = false;
	wx3_function(8247);
        this.isQuick = true;

        clearTimeout(this.resultTimer);
        egret.Tween.removeTweens(this.failGroup)
        egret.Tween.removeTweens(this.winGroup)

        var data = {
            seed:this.dataIn.seed,
            isReplay:this.dataIn.isReplay,
            players:[
                {id:1,gameid:'team1',team:1,force:this.dataIn.force1,hp:1,autolist:this.dataIn.list1,mforce:this.dataIn.mforce1,atkBuff:this.dataIn.atkBuff1,hpBuff:this.dataIn.hpBuff1},
                {id:2,gameid:'team2',team:2,force:this.dataIn.force2,hp:1,autolist:this.dataIn.list2,mforce:this.dataIn.mforce2,atkBuff:this.dataIn.atkBuff2,hpBuff:this.dataIn.hpBuff2}
            ]
        };
	wx3_function(56);

        this.scroller.viewport.scrollV = 0;
        var list1 = this.list1Data = this.dataIn.list1?this.dataIn.list1.split(','):[];
        var list2 = this.list2Data = this.dataIn.list2?this.dataIn.list2.split(','):[];

        this.resetList_1055(list1,this.dataIn.force1)
        if(this.dataIn.isGuess || this.dataIn.isAsk)
            this.resetList_1055(list2,this.dataIn.force2)
        else
            this.resetList_1055(list2)

        this.list1.dataProvider = new eui.ArrayCollection(list1)
        this.list2.dataProvider = new eui.ArrayCollection(list2)

        this.lineMC.height =  Math.ceil(Math.max(list1.length,list2.length)/3)*(95+6)

	wx3_function(3464);
        PKBulletManager_wx3.getInstance().freeAll();
        var PD = PKData_wx3.getInstance();
        PD.init(data);
        if(this.lastAction.length)
            PD.actionList = this.lastAction;
        console.log(PD.actionList)
        if(!this.dataIn.isReplay && DM.jumpPK)
        {
            PD.quick = true;
	wx3_function(9628);
            PD.quickTime = Number.MAX_VALUE;
        }
        PKData_wx3.getInstance().playSpeed = SharedObjectManager_wx3.getInstance().getMyValue('pkSpeed') || 1;
        this.renewSpeedBtn_6940();

        PKVideoCon_wx3.getInstance().init(this.dataIn);
	wx3_function(7529);
        this.lastRenewTime = 0;
        this.renewForce_6226();
        this.renewHp_8712(true);
        this.renewSkill();
        this.renewSkillBuff();


        if(!GuideManager.getInstance().isGuiding)
            this.startGame();
        else
        {
            GuideManager.getInstance().testShowGuide();
	wx3_function(9600);
        }


    }

    public startGame(){
        if(UM_wx3.isTest)
        {
            MainPKTestUI.getInstance().startGame();
            return;
        }
        this.gameStart = true;
	wx3_function(2647);
        var PD = PKData_wx3.getInstance();
        PD.start();
        this.onStep()
        this.isQuick = false;
        if(PD.isGameOver)
        {
            PKVideoCon_wx3.getInstance().resetView();
	wx3_function(1493);



            var videoCon = PKVideoCon_wx3.getInstance();
            var result = PD.getPKResult();
            if(result == 1)
            {
                var item = PKData_wx3.getInstance().getFirstItem(PKData_wx3.getInstance().myPlayer.teamData.id);
	wx3_function(8399);
                var item2 = PKData_wx3.getInstance().getBackItem(PKData_wx3.getInstance().myPlayer.teamData.id);
            }
            else if(result == 2)
            {
                var item = PKData_wx3.getInstance().getFirstItem(PKData_wx3.getInstance().myPlayer.teamData.enemy.id);
                var item2 = PKData_wx3.getInstance().getBackItem(PKData_wx3.getInstance().myPlayer.teamData.enemy.id);
	wx3_function(6844);
            }
            else
            {
                var item = PKData_wx3.getInstance().getFirstItem(PKData_wx3.getInstance().myPlayer.teamData.id);
                var item2 = PKData_wx3.getInstance().getFirstItem(PKData_wx3.getInstance().myPlayer.teamData.enemy.id);
            }

            if(item && item2)
            {
                var w = 640
                var scrollH = -((item.x + item2.x)/2 - w/2);
	wx3_function(5798);
                if(scrollH > 0)
                    scrollH = 0;
                else if(scrollH < w - videoCon.width)
                    scrollH = w - videoCon.width;
                videoCon.x = scrollH;
            }

        }
        else
            SoundManager_wx3.getInstance().playSound('pkbg')
    }
	private wx3_functionX_12464(){console.log(772)}

    public showHurt(rota){
        var mc;
        if(rota == PKConfig_wx3.ROTA_LEFT)
            mc = this.hurt1
        else
            mc = this.hurt2

	wx3_function(5936);

        egret.Tween.removeTweens(mc);
        mc.visible = true
        mc.alpha = 0
        egret.Tween.get(mc).to({alpha:1},150).to({alpha:0},150).call(function(){
            mc.visible = false
        },this)
    }
	private wx3_functionX_12465(){console.log(305)}

    private renewSkillBuff(){
        console.log('renewSkillBuff')
        var PD = PKData_wx3.getInstance();
        this.skillBuffList.dataProvider = new eui.ArrayCollection(PD.getSkillBuff());
    }

    public onStep(){
        if(!this.gameStart)
            return;
        if(this.finish)
        {
            PKVideoCon_wx3.getInstance().action();
	wx3_function(7371);
            return;
        }
        var PD = PKData_wx3.getInstance();
        var PC = PKCode_wx3.getInstance();

        PC.onStep();
	wx3_function(5613);
        PKVideoCon_wx3.getInstance().action();
        MyTool.runListFun(this.skillList,'onE')
        //this.renewSkillBuff();



        this.timeText.text = Math.floor(PD.actionTime/1000) + ''
        this.testRenew_6196();
	wx3_function(8009);
        if(PD.isGameOver)
        {
            if(this.dataIn.chapterid && !this.dataIn.isReplay)
                ChapterManager.getInstance().onChapterEnd(this.dataIn)
            this.renewHp_8712();

            PD.playSpeed = 1;
            this.addSpeedBtn.visible = false

            this.shareStr = ''
            this.finish = true;
	wx3_function(899);
            this.desGroup.visible = false;
            this.desGroup['callVisible'] = false
            PKBulletManager_wx3.getInstance().freeAll();
            var result = PD.getPKResult();
            if(this.dataIn.isAsk)
            {
                if(result == 2)
                {
                    this.shareStr = '已成功通过第'+UM_wx3.askLevel+'关，需要向我取经吗？'
                    if(!this.dataIn.addCoin)
                    {
                        this.dataIn.addCoin = UM_wx3.askLevel * 1000;
                        UM_wx3.askLevel ++;
                        UM_wx3.addCoin(this.dataIn.addCoin)
                    }
                    var addCoin = this.dataIn.addCoin
                    this.starGroup.removeChildren();
                    this.resourceGroup.removeChildren()
                    this.delayShowResult(this.winGroup);
                    this.winText.text = '挑战成功'

                    this.desGroup['callVisible'] = true
                    this.resourceGroup.addChild(this.coinGroup)
                    this.des1.text = 'x' + NumberUtil.addNumSeparator(addCoin,2)
                    this.backBtn.label = '下一关';

                }
                else
                {
                    this.delayShowResult(this.failGroup);
                    this.failText.text = '挑战失败'
                    this.backBtn.label = '重试';

                }
            }
            else if(this.dataIn.isGuess)
            {
                if(this.dataIn.result)
                {
                    var addCoin = this.dataIn['coin' + result]
                    if(addCoin)
                    {
                        this.starGroup.removeChildren();
                        this.resourceGroup.removeChildren()
                        this.delayShowResult(this.winGroup);
                        this.winText.text = '竞猜成功'

                        this.desGroup['callVisible'] = true
                        this.resourceGroup.addChild(this.coinGroup)
                        this.des1.text = 'x' + NumberUtil.addNumSeparator(addCoin,2)
                        this.backBtn.label = '关闭'
                        this.shareStr = '轻松赚取'+addCoin+'金，我的眼光确实不错！!'
                    }
                    else
                    {
                        this.delayShowResult(this.failGroup);
                        this.failText.text = '竞猜失败'
                        this.backBtn.label = '关闭'
                    }
                }
                else
                {
                    this.starGroup.removeChildren();
                    this.resourceGroup.removeChildren()
                    this.delayShowResult(this.winGroup);
                    this.winText.text = '队伍'+result+'胜利'
                    this.backBtn.label = '关闭'
                }

            }
            else{

                if(result == 1)
                {
                    this.delayShowResult(this.failGroup);
	wx3_function(9425);
                    this.failText.text = this.dataIn.chapterid?'挑战失败':'失败'
                    this.backBtn.label = this.dataIn.chapterid?'重试':'关闭'
                }
                else if(result == 2)
                {
                    this.starGroup.removeChildren();
	wx3_function(8819);
                    this.resourceGroup.removeChildren()
                    this.delayShowResult(this.winGroup);
                    this.winText.text = this.dataIn.chapterid?'挑战成功':'胜利'
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
	wx3_function(4107);
                    }
                    if(this.dataIn.chapterid)
                    {
                        this.shareStr = '已成功通过第'+this.dataIn.chapterid+'关，需要向我取经吗？'
                        this.backBtn.label = this.dataIn.chapterid == UM_wx3.chapterLevel?'下一关':'关闭'
                        if(this.dataIn.star)
                        {
                            this.winText.text = ''
                            for(var i=0;i<this.dataIn.star;i++)
                            {
                                this.starGroup.addChild(this['s' + i])
                            }
                        }
                    }
                    else
                    {
                        if(this.dataIn.fight)
                        {
                            if(this.dataIn.fight.type == 'atk')
                                this.shareStr = '我成功突破了【'+this.dataIn.fight.robot.nick+'】的防守，获得了'+NumberUtil.addNumSeparator(this.dataIn.coin,1)+'金币'
                            else
                                this.shareStr = '我成功防守住了【'+this.dataIn.fight.robot.nick+'】来势汹汹的进攻，牛得不要不要的~'
                        }
                        this.backBtn.label = '关闭'
                    }

                }
                else
                {
                    this.delayShowResult(this.failGroup);
	wx3_function(5348);
                    this.failText.text = '双方平手'
                    this.backBtn.label = this.dataIn.chapterid?'重试':'关闭'
                }
            }


            if(this.shareStr)
            {
                this.btnGroup.addChild(this.doubleBtn)
                MyTool.removeMC(this.strongBtn)
            }
            else
            {
                MyTool.removeMC(this.doubleBtn)
                this.btnGroup.addChild(this.strongBtn)
            }
            if(this.backBtn.label == '关闭' && !this.dataIn.isGuess && !this.dataIn.isAsk)
                MyTool.removeMC(this.backBtn)
            if(this.dataIn.isAsk || this.dataIn.isGuess)
                MyTool.removeMC(this.strongBtn)
        }
        else
        {
            var item = PKData_wx3.getInstance().getFirstItem(PKData_wx3.getInstance().myPlayer.teamData.id);
	wx3_function(5489);
            var item2 = PKData_wx3.getInstance().getFirstItem(PKData_wx3.getInstance().myPlayer.teamData.enemy.id);
            if(item && item2)
            {
                var videoCon = PKVideoCon_wx3.getInstance();
                var w = 640
                var scrollH = -((item.x + item2.x)/2 - w/2);
	wx3_function(6368);
                if(scrollH > 0)
                    scrollH = 0;
                else if(scrollH < w - videoCon.width)
                    scrollH = w - videoCon.width;
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
	wx3_function(6353);
                    }
                    this.lastRota = rote
                }

            }
        }
    }
	private wx3_functionX_12466(){console.log(2927)}

    private testRenew_6196(){
        if(PKData_wx3.getInstance().actionTime - this.lastRenewTime > 200)
        {
            this.lastRenewTime = PKData_wx3.getInstance().actionTime
            this.renewHp_8712();
	wx3_function(6804);
        }
    }

    private renewForce_6226(){
        var forceObj = PKData_wx3.getInstance().getForceData();
        var force1 =  Math.round(forceObj[1] || 0);
	wx3_function(3862);
        var force2 =  Math.round(forceObj[2] || 0);
        var green = 0x66ff66
        var white = 0xFFEDC9
        this.force1Text.text = "总战力：" + force1 + ''
        this.force2Text.text = "总战力：" + force2 + ''
        this.force1Text.textColor = force1 > force2 ?green:white
        this.force2Text.textColor = force2 > force1 ?green:white
    }
	private wx3_functionX_12467(){console.log(3009)}

    private renewHp_8712(isInit?){
        var forceObj = PKData_wx3.getInstance().getHpData();
        var hpRate1 =  (forceObj[1] || 0)/(forceObj['1_max'] || 1)
        var hpRate2 =  (forceObj[2] || 0)/(forceObj['2_max'] || 1)



        var w1 = Math.max(5,300 * Math.min(1,hpRate1))
        var w2 = Math.max(5,300 * Math.min(1,hpRate2))
        egret.Tween.removeTweens(this.hpBar1)
        egret.Tween.removeTweens(this.hpBar2)
        if(isInit)
        {
            this.hpBar1.width = w1
            this.hpBar2.width = w2
        }
        else
        {
            egret.Tween.get(this.hpBar1).to({width:w1},150)
            egret.Tween.get(this.hpBar2).to({width:w2},150)
        }
    }
	private wx3_functionX_12468(){console.log(1719)}

    public delayShowResult(mc)
    {
        clearTimeout(this.resultTimer);
        this.skillList.touchChildren = this.skillList.touchEnabled = false;
        if(this.dataIn.showTaskChange)
            ChapterManager.getInstance().sendGameEnd(mc == this.winGroup);

        this.resultTimer = setTimeout(()=>{
            PKVideoCon_wx3.getInstance().resetAllMVSpeed();
	wx3_function(8316);
            if(mc == this.winGroup)
                SoundManager_wx3.getInstance().playEffect('win');
            else
                SoundManager_wx3.getInstance().playEffect('fail');
            mc.visible = true;
            mc.scaleX = mc.scaleY = 0;
	wx3_function(6861);
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
                //this.bottomBar.visible = false;
	wx3_function(6213);
                this.currentState = 's2'
                this.adBottom = 100;
                MyADManager.getInstance().showBanner(100)
                if(this.dataIn.showTaskChange)
                {
                    TaskManager.getInstance().testMainTask('chapter');
                    TaskTips.getInstance().show(['cstar','clv']);
                }

                GuideManager.getInstance().testShowGuide();



            })

        },1000)
    }
}