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
        this.topUI.setTitle('掠夺日志')

        this.scroller.viewport = this.list;
        this.list.itemRenderer = LogItem
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();
        this.desText.text = '掠夺日志最多只保留3天'

    }

    public onClose(){
        this.hide();
    }


    public show(){
        super.show()
    }

    public hide() {
        var red = FightManager.getInstance().notReadLog.length;
        FightManager.getInstance().notReadLog.length = 0;
        super.hide();
        if(red)
            EM.dispatchEventWith(GameEvent.client.FIGHT_CHANGE)
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.FIGHT_CHANGE,this.onHistoryChange)
    }

    private onHistoryChange(){
        var v = this.scroller.viewport.scrollV;
        this.renew();
        this.validateNow();
        this.scroller.viewport.scrollV = v;
    }

    public renew(){
        ArrayUtil.sortByField(FightManager.getInstance().log,['logTime'],[1])
        this.dataProvider.source = FightManager.getInstance().log
        this.dataProvider.refresh();
    }

}