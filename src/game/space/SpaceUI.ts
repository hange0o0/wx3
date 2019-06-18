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
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.joinBtn,()=>{
            var SM = SpaceManager.getInstance();
            if( DateUtil.isSameDay(SM.addTime))
            {
                this.openSpace();
                return;
            }
            ShareTool.openGDTV(()=>{
                this.openSpace();
            })
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
        this.hide();
        SpaceInfoUI.getInstance().show();
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
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onTimer)


    }

    private onTimer(){
        if(this.joinBtn.label == '观看广告开启')
        {
            var SM = SpaceManager.getInstance();
            if( !DateUtil.isSameDay(SM.addTime))
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

        if(isFree)
        {
            this.joinBtn.label = '进入空间'
            this.timeText.text = '';
        }
        else
        {
            this.joinBtn.label = '观看广告开启'
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