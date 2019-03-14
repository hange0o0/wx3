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
    private scrollGroup: eui.Group;
    private list: eui.List;
    private energyText: eui.Label;
    private addBtn: eui.Image;
    private cdText: eui.Label;
    private refreshBtn: eui.Image;
    private list2: eui.List;
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
        this.addBtnEvent(this.refreshBtn,this.onSearch)
        this.refreshBtn.visible = !UM.isTest
    }

    private onAddEnergy(){
        ShareTool.share('日常推荐一个好游戏',Config.localResRoot + "share_img_2.jpg",{},()=>{
            UM.addEnergy(10);
        })
        //MyWindow.Confirm('确定花费 1 钻石补满所有体力吗？',(b)=>{
        //    if(b==1)
        //    {
        //        if(UM.diamond < 0)
        //        {
        //            MyWindow.ShowTips('钻石不足')
        //            return;
        //        }
        //        UM.addDiamond(-1);
        //        UM.fullEnergy();
        //    }
        //},['取消','补满']);
    }
    private onLog(){
        LogUI.getInstance().show();
    }
    private onSearch(){
        ShareTool.share('日常推荐一个好游戏',Config.localResRoot + "share_img_2.jpg",{},()=>{
            FightManager.getInstance().renewSearch(true);
            this.renewSearch();
        })
    }

    private renewEnergy(){
        var energy = UM.getEnergy();
        if(energy > 0)
        {
            this.energyText.text = energy + '/' + UM.maxEnergy
            this.energyText.textColor = 0xFFE3B7
            this.addBtn.visible = false
        }
        else
        {
            this.energyText.text = DateUtil.getStringBySecond(UM.getNextEnergyCD()).substr(-5);
            this.energyText.textColor = 0xFF0000
            this.addBtn.visible = !UM.isTest
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

        this.renewRed();
        this.renewIng();
        this.renewSearch();
        this.renewEnergy()
        this.onTimer();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        this.addPanelOpenEvent(GameEvent.client.FIGHT_CHANGE,this.onFightChange)
    }

    private renewRed(){
        this.logRedMC.visible = FightManager.getInstance().notReadLog.length > 0;
    }

    private onFightChange(){
        this.renewIng();
        MyTool.renewList(this.list2);
        this.renewRed();
    }

    public renewIng(){
        var arr = FightManager.getInstance().getAtkList();
        if(arr.length == 0)
        {
            MyTool.removeMC(this.list);
            return;
        }
        this.scrollGroup.addChildAt(this.list,0);
        this.list.dataProvider = new eui.ArrayCollection(arr)
    }

    public renewSearch(){
        this.list2.dataProvider = new eui.ArrayCollection(FightManager.getInstance().searchRobot);
    }

    private onTimer(){
       this.renewEnergy();
        MyTool.runListFun(this.list,'onTimer');
        var FM = FightManager.getInstance()
        if(TM.now() - FM.searchTime >= FM.refreshSearchTime)
        {
            FightManager.getInstance().renewSearch();
            this.renewSearch();
        }
        var cd = FM.refreshSearchTime - (TM.now() - FM.searchTime);
        this.cdText.text = DateUtil.getStringBySecond(cd);
    }

}