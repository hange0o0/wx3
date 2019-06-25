class GuessLogUI extends game.BaseWindow_wx3 {

    private static _instance: GuessLogUI;
    public static getInstance(): GuessLogUI {
        if(!this._instance)
            this._instance = new GuessLogUI();
        return this._instance;
    }

    private closeBtn: eui.Image;
    private desText: eui.Label;
    private scroller: eui.Scroller;
    private list: eui.List;




    private dataProvider:eui.ArrayCollection

    public constructor() {
        super();
        this.skinName = "GuessLogUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)

        this.scroller.viewport = this.list;
        this.list.itemRenderer = GuessLogItem
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
        this.addPanelOpenEvent(GameEvent.client.GUESS_CHANGE,this.onHistoryChange)
    }

    private onHistoryChange(){
        var v = this.scroller.viewport.scrollV;
        this.renew();
        this.validateNow();
        this.scroller.viewport.scrollV = v;
    }

    public renew(){
        this.dataProvider.source = GuessManager.getInstance().logs
        this.dataProvider.refresh();
        //this.list.dataProvider = new eui.ArrayCollection(UM.history);
    }


    public showHistory(userData,roundData){


    }

}