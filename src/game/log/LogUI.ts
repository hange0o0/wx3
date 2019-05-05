class LogUI extends game.BaseUI_wx3 {

    private static _instance: LogUI;
    public static getInstance(): LogUI {
        if(!this._instance)
            this._instance = new LogUI();
        return this._instance;
    }
	private wx3_functionX_12390(){console.log(9639)}

    private topUI: TopUI;
    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    private list: eui.List;
    private desText: eui.Label;
	private wx3_functionX_12391(){console.log(9789)}



    private dataProvider:eui.ArrayCollection

    public constructor() {
        super();
	wx3_function(4311);
        this.skinName = "LogUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

	wx3_function(2685);
        this.bottomUI.setHide(this.onClose,this);
        this.topUI.setTitle('掠夺日志')

        this.scroller.viewport = this.list;
        this.list.itemRenderer = LogItem
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();
	wx3_function(1892);
        this.desText.text = '掠夺日志最多只保留3天'

    }

    public onClose(){
        this.hide();
	wx3_function(88);
    }


    public show(){
        super.show()
    }
	private wx3_functionX_12392(){console.log(5406)}

    public hide() {
        var red = FightManager.getInstance().notReadLog.length;
        FightManager.getInstance().notReadLog.length = 0;
        super.hide();
        if(red)
        {
            EM_wx3.dispatchEventWith(GameEvent.client.FIGHT_CHANGE)
            RobotVO.change = true;
	wx3_function(1752);
            FightManager.getInstance().save();
        }
    }

    public onShow(){
        this.renew();
	wx3_function(7517);
        this.addPanelOpenEvent(GameEvent.client.FIGHT_CHANGE,this.onHistoryChange_8194)
    }

    private onHistoryChange_8194(){
        var v = this.scroller.viewport.scrollV;
        this.renew();
	wx3_function(3277);
        this.validateNow();
        this.scroller.viewport.scrollV = v;
    }

    public renew(){
        ArrayUtil.sortByField(FightManager.getInstance().log,['logTime'],[1])
        this.dataProvider.source = FightManager.getInstance().log
        this.dataProvider.refresh();
	wx3_function(1988);
    }

}