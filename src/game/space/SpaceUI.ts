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

        })

        var name = 'door_mv'
        var data:any = RES.getRes(name + "_json"); //qid
        var texture:egret.Texture = RES.getRes(name + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, texture);
        this.doorMV = new egret.MovieClip();
        this.doorMV.movieClipData = mcFactory.generateMovieClipData('door');
        this.addChild(this.doorMV);
        this.doorMV.y = 220;
        this.doorMV.x = 230;
        this.doorMV.frameRate = 12
        this.doorMV.scaleX = this.doorMV.scaleY = 1.2
    }

    public show(data?){
        super.show()
    }

    public hide() {
        super.hide();
        this.doorMV.stop()
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onTimer)
    }

    private onTimer(){
        this.mvCount ++;
        if(this.mvCount< 15)
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
    }
}