class SpaceInfoUI extends game.BaseWindow_wx3 {

    private static _instance: SpaceInfoUI;
    public static getInstance(): SpaceInfoUI {
        if(!this._instance)
            this._instance = new SpaceInfoUI();
        return this._instance;
    }

    private titleText: eui.Label;
    private infoBtn: eui.Button;
    private pkBtn: eui.Button;
    private desText: eui.Label;
    private closeBtn: eui.Image;
    private iconMC: eui.Image;
    private cdText: eui.Label;



    public constructor() {
        super();
        this.skinName = "SpaceInfoUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)

        this.addBtnEvent(this.pkBtn,()=>{

        })

        this.addBtnEvent(this.infoBtn,()=>{

        })


    }

    public show(data?){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
    }

    private onTimer(){

    }

    public renew(){

    }
}