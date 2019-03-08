class LogUI extends game.BaseUI {

    private static _instance: LogUI;
    public static getInstance(): LogUI {
        if(!this._instance)
            this._instance = new LogUI();
        return this._instance;
    }

    private topUI: TopUI;
    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    private list: eui.List;
    private desText: eui.Label;



    private dataProvider:eui.ArrayCollection

    public constructor() {
        super();
        this.skinName = "LogUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.onClose,this);
        this.topUI.setTitle('打赏日志')

        this.scroller.viewport = this.list;
        this.list.itemRenderer = LogItem
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();

    }

    public onClose(){
        this.hide();
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
        //SoundManager.getInstance().playSound('bg');
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.HISTORY_CHANGE,this.onHistoryChange)
    }

    private onHistoryChange(){
        var v = this.scroller.viewport.scrollV;
        this.renew();
        this.validateNow();
        this.scroller.viewport.scrollV = v;
    }

    public renew(){
        this.dataProvider.source = UM.history
        this.dataProvider.refresh();
        //this.list.dataProvider = new eui.ArrayCollection(UM.history);
    }


    public showHistory(userData,roundData){


    }

}