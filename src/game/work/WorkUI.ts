class WorkUI extends game.BaseUI {

    private static _instance: WorkUI;
    public static getInstance(): WorkUI {
        if(!this._instance)
            this._instance = new WorkUI();
        return this._instance;
    }

    private topUI: TopUI;
    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    private list: eui.List;
    private list2: eui.List;
    private energyText: eui.Label;
    private addBtn: eui.Image;
    private searchBtn: eui.Group;
    private searchText: eui.Label;
    private logBtn: eui.Group;
    private logRedMC: eui.Image;



    public constructor() {
        super();
        this.skinName = "WorkUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.hide,this);
        this.topUI.setTitle('掠夺玩家')

        this.list.itemRenderer = FightingItem
        this.list2.itemRenderer = FightItem


        this.addBtnEvent(this.addBtn,this.onAddEnergy)
        this.addBtnEvent(this.logBtn,this.onLog)
        this.addBtnEvent(this.searchBtn,this.onSearch)
    }

    private onAddEnergy(){

    }
    private onLog(){

    }
    private onSearch(){

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