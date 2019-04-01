class MainPKUI extends game.BaseUI {
    private static _instance:MainPKUI;
    public static getInstance() {
        if (!this._instance) this._instance = new MainPKUI();
        return this._instance;
    }

    public constructor() {
        super();
        this.skinName = "MainPKUISkin";
    }

    private con: eui.Group;
    private lineMC: eui.Rect;
    private scroller: eui.Scroller;
    private list1: eui.List;
    private list2: eui.List;
    private cost1Group: eui.Group;
    private force1Text: eui.Label;
    private cost2Group: eui.Group;
    private force2Text: eui.Label;
    private cdGroup: eui.Group;
    private timeText: eui.Label;
    private winGroup: eui.Group;
    private winText: eui.Label;
    private desGroup: eui.Group;
    private des1: eui.Label;
    private des2: eui.Label;
    private failGroup: eui.Group;
    private failText: eui.Label;
    private btnGroup: eui.Group;
    private backBtn: eui.Button;
    private doubleBtn: eui.Button;
    private replayBtn: eui.Button;
    private bottomBar: eui.Group;
    private hpBar1: eui.Image;
    private hpBar2: eui.Image;
    private addSpeedBtn: eui.Group;
    private speedMC: eui.Image;
    private speedMC2: eui.Image;
    private hurt1: eui.Image;
    private hurt2: eui.Image;
    private bottomUI: BottomUI;
    private topUI: TopUI;














    public dataIn;
    public finish = false
    public lastRota = 0
    public list1Data
    public list2Data
    public resultTimer
    public isQuick
    public lastRenewTime = 0;



    private shareStr

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.hide,this);

        this.addBtnEvent(this.replayBtn,this.onReplay)
        this.addBtnEvent(this.backBtn,this.onBack)
        this.addBtnEvent(this.doubleBtn,this.onDouble)
        this.addBtnEvent(this.addSpeedBtn,this.onSpeed)

        var pkvideo = PKVideoCon.getInstance();
        this.con.addChild(pkvideo)
        pkvideo.y = 0;
        pkvideo.x = -(PKConfig.floorWidth + PKConfig.appearPos*2 - 640)/2;

        PKData.getInstance().addEventListener('video_word',this.onVideoEvent,this);
        PKData.getInstance().addEventListener('video',this.onVideoEvent2,this);

        this.list1.itemRenderer = MainPKItem
        this.list2.itemRenderer = MainPKItem

        // egret.Tween.get(this.speedMC,{loop:true}).to({rotation:360},3000)
        // egret.Tween.get(this.speedMC2,{loop:true}).to({rotation:-360},3000)
    }

    public onVideoEvent2(e){
        if(!this.stage)
            return;
        var videoData = e.data;
        switch(videoData.type)//动画类型
        {
            case PKConfig.VIDEO_MONSTER_WIN:
                var rota = videoData.user.getOwner().teamData.atkRota == PKConfig.ROTA_LEFT?PKConfig.ROTA_RIGHT:PKConfig.ROTA_LEFT
                this.showHurt(rota);
                break;
        }
    }

    private onSpeed(){
        PKData.getInstance().playSpeed ++;
        if(PKData.getInstance().playSpeed > 3)
            PKData.getInstance().playSpeed = 1;
        this.renewSpeedBtn();
    }

    private renewSpeedBtn(){
        this.speedMC.visible = PKData.getInstance().playSpeed > 1
        this.speedMC2.visible = PKData.getInstance().playSpeed > 2
    }

    private onDouble(){
        ShareTool.share(this.shareStr,Config.localResRoot + "share_img_2.jpg",{},()=>{

        })
    }

    private onBack(){
        this.hide();
        //if(!this.dataIn.isMain)
        //    LogUI.getInstance().show()
    }


    public onVideoEvent(e){
        var videoData = e.data;
        if(videoData.type != PKConfig.VIDEO_MONSTER_ADD && videoData.type != PKConfig.VIDEO_MONSTER_DIE)
            return;
        var data:PKMonsterData = videoData.user;
        if(!data.index)
            return;

        var index = data.index - 1;
        var teamID = data.getOwner().teamData.id;
        switch(videoData.type)//动画类型
        {
            case PKConfig.VIDEO_MONSTER_ADD:
                if(teamID == 1)
                {
                    this.runItemFun(this.list1,index,'showBorn')
                    this.list1Data[index].isDie = false;
                }
                else
                {
                    this.runItemFun(this.list2,index,'showBorn')
                    this.list2Data[index].isDie = false;
                }
                break;

            case PKConfig.VIDEO_MONSTER_DIE:
                if(teamID == 1)
                {
                    this.runItemFun(this.list1,index,'showDie')
                    this.list1Data[index].isDie = true;
                }
                else
                {
                    this.runItemFun(this.list2,index,'showDie')
                    this.list2Data[index].isDie = true;
                }
                break;
        }
    }

    private runItemFun(list,index,funName){
        if(list.numChildren <= index)
            return
        var item:any = list.getChildAt(index)
        item[funName] && item[funName]();
    }

    public show(data?){
        PKManager.getInstance().isPKing = true
        this.dataIn = data,
        super.show();
    }

    public onShow(){

        PKData.getInstance().playSpeed = 1;
        this.renewSpeedBtn();
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
    }

    public hide(){
        PKManager.getInstance().isPKing = false
        SoundManager.getInstance().playSound('bg');
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onStep,this)
        PKVideoCon.getInstance().remove();
       super.hide();
    }

    public onReplay(){

        this.dataIn.passTime = 0;
        this.bottomBar.visible = true;
        this.reset();
        this.renewSpeedBtn();
    }

    private resetList(list){
        var orginList = list.concat();
        for(var i=0;i<list.length;i++)
        {
            list[i]  = {id:list[i],isDie:true,index:i+1,list:orginList}
        }
    }

    public reset(){
        if(this.dataIn.isReplay)
        {
            this.currentState = 's2'
            this.topUI.setTitle(this.dataIn.title || '回放')
        }
        else
        {
            this.currentState = 's1'
        }

        PKVideoCon.getInstance().x = -(PKConfig.floorWidth + PKConfig.appearPos*2 - 640)/2;
        //this.stopScrollTimer = 0;
        this.winGroup.visible = false;
        this.failGroup.visible = false;
        this.btnGroup.visible = false;
        this.hurt1.visible = false
        this.hurt2.visible = false
        egret.Tween.removeTweens(this.hurt1)
        egret.Tween.removeTweens(this.hurt2)
        this.finish = false;
        this.isQuick = true;

        clearTimeout(this.resultTimer);
        egret.Tween.removeTweens(this.failGroup)
        egret.Tween.removeTweens(this.winGroup)

        var data = {
            seed:this.dataIn.seed,
            players:[
                {id:1,gameid:'team1',team:1,force:this.dataIn.force1,hp:1,autolist:this.dataIn.list1,mforce:this.dataIn.mforce1,buff:this.dataIn.buff1},
                {id:2,gameid:'team2',team:2,force:this.dataIn.force2,hp:1,autolist:this.dataIn.list2,mforce:this.dataIn.mforce2,buff:this.dataIn.buff2}
            ]
        };

        this.scroller.viewport.scrollV = 0;
        var list1 = this.list1Data = this.dataIn.list1?this.dataIn.list1.split(','):[];
        var list2 = this.list2Data = this.dataIn.list2?this.dataIn.list2.split(','):[];

        this.resetList(list1)
        this.resetList(list2)

        this.list1.dataProvider = new eui.ArrayCollection(list1)
        this.list2.dataProvider = new eui.ArrayCollection(list2)

        this.lineMC.height =  Math.ceil(Math.max(list1.length,list2.length)/3)*(95+6)

        PKBulletManager.getInstance().freeAll();
        var PD = PKData.getInstance();
        PD.init(data);
        if(this.dataIn.passTime && this.dataIn.passTime > 0)
        {
            PD.quick = true;
            PD.quickTime = this.dataIn.passTime*1000;
        }

        PKVideoCon.getInstance().init(this.dataIn);


        PD.start();
        this.lastRenewTime = 0;
        this.renewForce();
        this.renewHp(true);
        this.onStep()
        this.isQuick = false;
        if(PD.isGameOver)
        {
            PKVideoCon.getInstance().resetView();
            
        

            var videoCon = PKVideoCon.getInstance();
            var result = PD.getPKResult();
            if(result == 1)
            {
                var item = PKData.getInstance().getFirstItem(PKData.getInstance().myPlayer.teamData.id);
                var item2 = PKData.getInstance().getBackItem(PKData.getInstance().myPlayer.teamData.id);
            }
            else if(result == 2)
            {
                var item = PKData.getInstance().getFirstItem(PKData.getInstance().myPlayer.teamData.enemy.id);
                var item2 = PKData.getInstance().getBackItem(PKData.getInstance().myPlayer.teamData.enemy.id);
            }
            else
            {
                var item = PKData.getInstance().getFirstItem(PKData.getInstance().myPlayer.teamData.id);
                var item2 = PKData.getInstance().getFirstItem(PKData.getInstance().myPlayer.teamData.enemy.id);
            }

            if(item && item2)
            {
                var w = 640
                var scrollH = -((item.x + item2.x)/2 - w/2);
                if(scrollH > 0)
                    scrollH = 0;
                else if(scrollH < w - videoCon.width)
                    scrollH = w - videoCon.width;
                videoCon.x = scrollH;
            }

        }
        else
            SoundManager.getInstance().playSound('pkbg')
    }

    public showHurt(rota){
        var mc;
        if(rota == PKConfig.ROTA_LEFT)
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

    public onStep(){
        if(this.finish)
        {
            PKVideoCon.getInstance().action();
            return;
        }
        var PD = PKData.getInstance();
        var PC = PKCode.getInstance();

        PC.onStep();
        PKVideoCon.getInstance().action();



        this.timeText.text = Math.floor(PD.actionTime/1000) + ''
        this.testRenew();
        if(PD.isGameOver)
        {
            this.renewForce();
            this.renewHp();
            this.bottomBar.visible = false;
            PD.playSpeed = 1;
            

            this.shareStr = ''
            this.finish = true;
            this.desGroup.visible = false;
            this.desGroup['callVisible'] = false
            PKBulletManager.getInstance().freeAll();
            var result = PD.getPKResult();
            //if(this.dataIn.isPK)
            //{
                if(result == 1)
                {
                    this.delayShowResult(this.failGroup);
                    this.failText.text = '失败'
                    this.backBtn.label = '重试'
                }
                else if(result == 2)
                {
                    this.delayShowResult(this.winGroup);
                    this.winText.text = '胜利'
                    var addCoin = 1;
                    if(addCoin)
                    {
                        this.desGroup['callVisible'] = true
                        this.des1.text = '恭喜获得'
                        this.des2.text = 'x' + NumberUtil.addNumSeparator(addCoin)
                    }
                    this.shareStr = '已成功通过第'+this.dataIn.level+'关，需要向我取经吗？'
                    this.backBtn.label = '下一关'
                }
                else
                {
                    this.delayShowResult(this.failGroup);
                    this.failText.text = '平手'
                    this.backBtn.label = '重试'
                }
            //}


            if(this.shareStr)
            {
                this.btnGroup.addChild(this.doubleBtn)
            }
            else
            {
                MyTool.removeMC(this.doubleBtn)
            }
        }
        else
        {
            var item = PKData.getInstance().getFirstItem(PKData.getInstance().myPlayer.teamData.id);
            var item2 = PKData.getInstance().getFirstItem(PKData.getInstance().myPlayer.teamData.enemy.id);
            if(item && item2)
            {
                var videoCon = PKVideoCon.getInstance();
                var w = 640
                var scrollH = -((item.x + item2.x)/2 - w/2);
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
                    }
                    this.lastRota = rote
                }

            }
        }
    }

    private testRenew(){
        if(PKData.getInstance().actionTime - this.lastRenewTime > 200)
        {
            this.lastRenewTime = PKData.getInstance().actionTime
            this.renewForce();
            this.renewHp();
        }
    }

    private renewForce(){
        var forceObj = PKData.getInstance().getForceData();
        var force1 =  Math.round(forceObj[1] || 0);
        var force2 =  Math.round(forceObj[2] || 0);
        var green = 0x66ff66
        var white = 0xFFEDC9
        this.force1Text.text = force1 + ''
        this.force2Text.text = force2 + ''
        this.force1Text.textColor = force1 > force2 ?green:white
        this.force2Text.textColor = force2 > force1 ?green:white
    }

    private renewHp(isInit?){
        var forceObj = PKData.getInstance().getHpData();
        var hpRate1 =  (forceObj[1] || 0)/(forceObj['1_max'] || 1)
        var hpRate2 =  (forceObj[2] || 0)/(forceObj['2_max'] || 1)

        var w1 = 300 * Math.min(1,hpRate1)
        var w2 = 300 * Math.min(1,hpRate2)
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

    public delayShowResult(mc)
    {
        clearTimeout(this.resultTimer);

        this.resultTimer = setTimeout(()=>{
            PKVideoCon.getInstance().resetAllMVSpeed();
            if(mc == this.winGroup)
                SoundManager.getInstance().playEffect('win');
            else
                SoundManager.getInstance().playEffect('fail');
            mc.visible = true;
            mc.scaleX = mc.scaleY = 0;
            var tw = egret.Tween.get(mc).to({scaleX:1.2,scaleY:1.2},300).to({scaleX:1,scaleY:1},300)
            tw.call(()=>{
                SoundManager.getInstance().playSound('bg');
                this.desGroup.visible = this.desGroup['callVisible'];
            })

            tw.call(()=>{
                this.btnGroup.visible = true
            })

        },1000)
    }
}