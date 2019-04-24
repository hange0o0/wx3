class FightUI extends game.BaseUI {

    private static _instance: FightUI;
    public static getInstance(): FightUI {
        if(!this._instance)
            this._instance = new FightUI();
        return this._instance;
    }
	private wx3_functionX_12336(){console.log(1960)}

    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    private scrollGroup: eui.Group;
    private list: eui.List;
    private cdText: eui.Label;
	private wx3_functionX_12337(){console.log(4673)}
    private refreshBtn: eui.Image;
    private list2: eui.List;
    private logBtn: eui.Group;
    private logRedMC: eui.Image;
    private topUI: TopUI;

	private wx3_functionX_12338(){console.log(4933)}





    public dataProvider = new eui.ArrayCollection()
	private wx3_functionX_12339(){console.log(8386)}
    public constructor() {
        super();
        this.skinName = "FightUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
	wx3_function(575);

        this.bottomUI.setHide(this.hide,this);
        this.topUI.setTitle('掠夺玩家')

        this.list.itemRenderer = FightingItem
        this.list2.itemRenderer = FightItem
        this.list2.dataProvider = this.dataProvider



        this.addBtnEvent(this.logBtn,this.onLog_8602)
        this.addBtnEvent(this.refreshBtn,this.onSearch_828)

    }
	private wx3_functionX_12340(){console.log(6850)}


    private onLog_8602(){
        LogUI.getInstance().show();
    }
    private onSearch_828(){
        ShareTool.share('日常推荐一个好游戏',Config.localResRoot + "share_img_2.jpg",{},()=>{
            FightManager.getInstance().renewSearch(true);
	wx3_function(5547);
            this.renewSearch();
        })
    }



	private wx3_functionX_12341(){console.log(8303)}

    public show(){
        super.show()
    }

    public hide() {
        //MainPKUI.instance.hide();
	wx3_function(2194);
        super.hide();
        //TaskManager.getInstance().guideTaskVO = null;
        //GameUI.getInstance().onTimer();
    }

    public onShow(){
        FightManager.getInstance().renewSearch();

	wx3_function(2289);
        this.renewRed_9969();
        this.renewIng();
        this.renewSearch();

        this.onTimer_6217();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer_6217)
        this.addPanelOpenEvent(GameEvent.client.FIGHT_CHANGE,this.onFightChange_7729)

        var TSM = TaskManager.getInstance()
        if(TSM.guideTaskVO && TSM.guideTaskVO.type == 'fight')
        {
            this.list2.validateNow();
	wx3_function(1580);
            var list = []
            for(var i=0;i<this.list2.numChildren;i++)
            {
                var mc = this.list2.getChildAt(i)
                var data = mc['data']
                if(!data.isAtked())
                {
                    TaskManager.getInstance().showGuideMC(mc);
	wx3_function(4780);
                    break;
                }
            }
        }
    }

	private wx3_functionX_12342(){console.log(5028)}
    private renewRed_9969(){
        this.logRedMC.visible = FightManager.getInstance().notReadLog.length > 0;
    }

    private onFightChange_7729(){
        this.renewIng();
	wx3_function(3392);
        MyTool.renewList(this.list2);
        this.renewRed_9969();
    }

    public renewIng(){
        var arr = FightManager.getInstance().getAtkList();
	wx3_function(4597);
        if(arr.length == 0)
        {
            MyTool.removeMC(this.list);
            return;
        }
        this.scrollGroup.addChildAt(this.list,0);
	wx3_function(6629);
        this.list.dataProvider = new eui.ArrayCollection(arr)
    }

    public renewSearch(){
        var FM = FightManager.getInstance()
        this.dataProvider.source = FM.searchRobot;
	wx3_function(5779);
        this.dataProvider.refresh();
        this.refreshBtn.visible = !UM_wx3.isTest && TM_wx3.now() - FM.searchTime >= 3600;;
    }

    private onTimer_6217(){
        MyTool.runListFun(this.list,'onTimer');
	wx3_function(914);
        var FM = FightManager.getInstance()
        if(TM_wx3.now() - FM.searchTime >= FM.refreshSearchTime)
        {
            FightManager.getInstance().renewSearch();
            this.renewSearch();
        }
        var cd = FM.refreshSearchTime - (TM_wx3.now() - FM.searchTime);
	wx3_function(4735);
        this.cdText.text = '离下次刷新还有：' + DateUtil.getStringBySecond(cd);

        this.refreshBtn.visible = !UM_wx3.isTest && TM_wx3.now() - FM.searchTime >= 3600;
    }

}