class FightUI extends game.BaseUI {

    private static _instance: FightUI;
    public static getInstance(): FightUI {
        if(!this._instance)
            this._instance = new FightUI();
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
        this.skinName = "FightUISkin";
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

    private renewEnergy(){
        var energy = UM.getEnergy();
        if(energy > 0)
        {
            this.energyText.text = energy + '/' + UM.maxEnergy
            this.energyText.textColor = 0xFFE3B7
        }
        else
        {
            this.energyText.text = DateUtil.getStringBySecond(UM.getNextEnergyCD()).substr(-5)
            this.energyText.textColor = 0xFF0000
        }

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
        FightManager.getInstance().renewSearch();
        this.logRedMC.visible = false;
        this.renewIng();
        this.renewSearch();
        this.renewEnergy()
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
    }


    public renewIng(){
        this.list.dataProvider = new eui.ArrayCollection(FightManager.getInstance().getAtkList())
    }

    public renewSearch(){
        this.list2.dataProvider = new eui.ArrayCollection(FightManager.getInstance().searchRobot)
    }

    private onTimer(){
       this.renewEnergy()
    }

}