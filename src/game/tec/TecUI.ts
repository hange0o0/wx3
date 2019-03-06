class TecUI extends game.BaseUI {

    private static _instance: TecUI;
    public static getInstance(): TecUI {
        if(!this._instance)
            this._instance = new TecUI();
        return this._instance;
    }

    private topUI: TopUI;
    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    private list: eui.List;




    public constructor() {
        super();
        this.skinName = "TecUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.hide,this);
        this.topUI.setTitle('科技升级')

        this.list.itemRenderer = FightingItem

    }



    public show(){
        super.show()
    }

    public hide() {
        //MainPKUI.instance.hide();
        super.hide();
        //GameUI.getInstance().onTimer();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
    }

    private onTimer(){
        var v = this.scroller.viewport.scrollV;
        this.renew();
        this.validateNow();
        this.scroller.viewport.scrollV = v;
    }

    public renew(){

    }

}