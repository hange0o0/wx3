class SpaceUI extends game.BaseWindow_wx3 {

    private static _instance: SpaceUI;
    public static getInstance(): SpaceUI {
        if(!this._instance)
            this._instance = new SpaceUI();
        return this._instance;
    }

    private bg: eui.Image;
    private joinBtn: eui.Button;
    private closeBtn: eui.Image;
    private timeText: eui.Label;








    public doorMV:egret.MovieClip;
    private mvCount = 0
    public constructor() {
        super();
        this.skinName = "SpaceUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.joinBtn,()=>{
            if(UM_wx3.chapterLevel < 10)
            {
                MyWindow.ShowTips('通关据点10后开启')
                return;
            }
            var SM = SpaceManager.getInstance();
            if(!DateUtil.isSameDay(SM.addTime))
            {
                this.openSpace();
                return;
            }

            if(this.joinBtn.label == '观看广告开启')
            {
                ShareTool.openGDTV(()=>{
                    this.openSpace();
                })
                return;
            }


            var str = SM.adType == 'cd'?"在《别碰小广告》游戏中坚持"+SM.adValue+"秒，即可开启空间":"在《别碰小广告》游戏中获得"+SM.adValue+"分，即可开启空间"

            MyWindow.Alert(str,()=>{
                MyADManager.getInstance().openWX5({
                    key:SM.adType,
                    value:SM.adValue,
                    callBack:'openSpace',
                })
            },'开始挑战')

            //ShareTool.openGDTV(()=>{
            //    this.openSpace();
            //})
        })

        var name = 'door_mv'
        var data:any = RES.getRes(name + "_json"); //qid
        var texture:egret.Texture = RES.getRes(name + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, texture);
        this.doorMV = new egret.MovieClip();
        this.doorMV.movieClipData = mcFactory.generateMovieClipData('door');
        this.addChild(this.doorMV);
        this.doorMV.y = 240;
        this.doorMV.x = 250;
        this.doorMV.frameRate = 12
        this.doorMV.scaleX = this.doorMV.scaleY = 1.2
    }

    private openSpace(){
        SpaceManager.getInstance().randomSpace();
        SpaceInfoUI.getInstance().show();
        this.hide();
    }

    public show(){
        var SM = SpaceManager.getInstance();
        if(SM.isPKing())
        {
            SpaceInfoUI.getInstance().show();
            return;
        }
        super.show()
    }

    public hide() {
        super.hide();
        this.doorMV.stop()
    }

    public onShow(){
        AniManager_wx3.getInstance().removeAllMV()
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)


    }

    private onTimer(){
        if(this.joinBtn.label == '挑战开启' || this.joinBtn.label == '观看广告开启')
        {
            var SM = SpaceManager.getInstance();
            if(!DateUtil.isSameDay(SM.addTime))
            {
                this.renew();
                return;
            }
            var cd = DateUtil.getNextDateTimeByHours(0) - TM_wx3.now();
            this.timeText.text = '下次免费进入时间：' + DateUtil.getStringBySecond(cd);
        }
    }

    private onE(){
        this.mvCount ++;
        if(this.mvCount< 12)
            return;
        this.mvCount = 0;

        var AM = AniManager_wx3.getInstance();
        var mv = AM.playOnItem(103,this.bg,{x:80 + Math.random()*340,y:350 - 60*Math.random()});
        if(mv)
            mv.scaleX = mv.scaleY = 2
    }

    public renew(){
        this.bg.source = PKManager_wx3.getInstance().getDefBG()
        this.doorMV.play(-1)

        var SM = SpaceManager.getInstance();
        var isFree = !DateUtil.isSameDay(SM.addTime);
        if(UM_wx3.chapterLevel < 10)
        {
            this.joinBtn.label = '通关据点10开启'
        }
        else if(isFree)
        {
            this.joinBtn.label = '进入空间'
            this.timeText.text = '';
        }
        else
        {
            if(Config.isZJ)
                this.joinBtn.label = '观看广告开启'
            else
                this.joinBtn.label = '挑战开启'
            this.onTimer();
        }

        if(SM.spaceType)
        {
            SM.spaceType = 0;
            UM_wx3.needUpUser = true;
            MyWindow.Alert('上次进入空间的时间已到，被排斥出来了')
        }


    }
}