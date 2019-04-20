class FightUI extends game.BaseUI {

    private static _instance: FightUI;
    public static getInstance(): FightUI {
        if(!this._instance)
            this._instance = new FightUI();
        return this._instance;
    }

    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    private scrollGroup: eui.Group;
    private list: eui.List;
    private cdText: eui.Label;
    private refreshBtn: eui.Image;
    private list2: eui.List;
    private logBtn: eui.Group;
    private logRedMC: eui.Image;
    private topUI: TopUI;






    public dataProvider = new eui.ArrayCollection()
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
        this.list2.dataProvider = this.dataProvider



        this.addBtnEvent(this.logBtn,this.onLog)
        this.addBtnEvent(this.refreshBtn,this.onSearch)

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




    public show(){
        super.show()
    }

    public hide() {
        //MainPKUI.instance.hide();
        super.hide();
        //TaskManager.getInstance().guideTaskVO = null;
        //GameUI.getInstance().onTimer();
    }

    public onShow(){
        FightManager.getInstance().renewSearch();

        this.renewRed();
        this.renewIng();
        this.renewSearch();

        this.onTimer();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        this.addPanelOpenEvent(GameEvent.client.FIGHT_CHANGE,this.onFightChange)

        var TSM = TaskManager.getInstance()
        if(TSM.guideTaskVO && TSM.guideTaskVO.type == 'fight')
        {
            this.list2.validateNow();
            var list = []
            for(var i=0;i<this.list2.numChildren;i++)
            {
                var mc = this.list2.getChildAt(i)
                var data = mc['data']
                if(!data.isAtked())
                {
                    TaskManager.getInstance().showGuideMC(mc);
                    break;
                }
            }
        }
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
        var FM = FightManager.getInstance()
        this.dataProvider.source = FM.searchRobot;
        this.dataProvider.refresh();
        this.refreshBtn.visible = !UM.isTest && TM.now() - FM.searchTime >= 3600;;
    }

    private onTimer(){
        MyTool.runListFun(this.list,'onTimer');
        var FM = FightManager.getInstance()
        if(TM.now() - FM.searchTime >= FM.refreshSearchTime)
        {
            FightManager.getInstance().renewSearch();
            this.renewSearch();
        }
        var cd = FM.refreshSearchTime - (TM.now() - FM.searchTime);
        this.cdText.text = '离下次刷新还有：' + DateUtil.getStringBySecond(cd);

        this.refreshBtn.visible = !UM.isTest && TM.now() - FM.searchTime >= 3600;
    }

}