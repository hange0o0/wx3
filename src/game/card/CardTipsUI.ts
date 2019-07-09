class CardTipsUI extends game.BaseWindow_wx3{

    private static _instance:CardTipsUI;
    public static getInstance() {
        if (!this._instance) this._instance = new CardTipsUI();
        return this._instance;
    }

    public closeBtn: eui.Image;

    public constructor() {
        super();
        this.skinName = "CardTipsUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.closeBtn,()=>{
            this.hide();
            GuideManager.getInstance().testShowGuide()
        })
    }

    public show(){
        super.show();
    }

    public onShow(){
        this.renew();
        GuideManager.getInstance().testShowGuide()
    }

    public renew(){

    }

    public hide(){
        super.hide();
    }
}