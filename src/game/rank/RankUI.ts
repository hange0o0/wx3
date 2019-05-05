class RankUI extends game.BaseWindow_wx3{

    private static _instance:RankUI;
    public static getInstance() {
        if (!this._instance) this._instance = new RankUI();
        return this._instance;
    }
	private wx3_functionX_12585(){console.log(2037)}

    private closeBtn: eui.Image;
    private bitmap: egret.Bitmap;
    private isdisplay = false;

    public constructor() {
        super();
	wx3_function(5244);
        this.skinName = "RankUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.closeBtn,this.hide)
    }
	private wx3_functionX_12586(){console.log(1174)}




    public onShow(){

	wx3_function(1690);
        this.renew();
    }


    public renew(){
        if(!window['wx'])
            return;
        this.remove();
	wx3_function(2766);
        this.showBitmapList()
    }



    private poseData_5361(){

        var key = 'chapter'
        var value = UM_wx3.chapterLevel
        let param:any = {
            me: UM_wx3.gameid,
            command: 'open',
            key:key,
            rankHeight:this.height-this.bitmap.y - 20,
            x:this.bitmap.x + (GameManager_wx3.uiWidth - this.width)/2,
            y:this.bitmap.y + (GameManager_wx3.uiHeight - this.height)/2,
            me_value: value,// + ',0', //第2位时间传0，永远排在最上面
            root: "openDataContext/",
        }

        //发送消息
        var platform = window['platform']
        platform.openDataContext.postMessage(param);
	wx3_function(4125);
    }

    //0 好友榜，2群排行
    public showBitmapList(){
        if(!window["wx"] || !window["wx"].getOpenDataContext) return;
        this.remove();
        var platform = window['platform']
        if (!this.isdisplay) {

	wx3_function(484);
            this.bitmap = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this.bitmap.x = 20;
            this.bitmap.y = 75;
            this.addChild(this.bitmap);
            this.bitmap.touchEnabled = false

	wx3_function(6548);
            this.isdisplay = true;
            this.poseData_5361();
        }
    }

    protected remove(){
        var platform = window['platform']
        if(this.isdisplay){
            this.isdisplay = false;
	wx3_function(9195);
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);

            if(platform.openDataContext){
                platform.openDataContext.postMessage({ command: 'close' });
            }
        }
    }
	private wx3_functionX_12587(){console.log(1960)}
    public hide(){
        this.remove();
        super.hide();
    }
}