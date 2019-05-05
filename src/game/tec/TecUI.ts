class TecUI extends game.BaseUI_wx3 {

    private static _instance: TecUI;
    public static getInstance(): TecUI {
        if(!this._instance)
            this._instance = new TecUI();
        return this._instance;
    }
	private wx3_functionX_12662(){console.log(2176)}

    private topUI: TopUI;
    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    public list: eui.List;
    private coinGroup: eui.Group;
	private wx3_functionX_12663(){console.log(5026)}
    private coinText: eui.Label;
    private addCoinBtn: eui.Image;




	private wx3_functionX_12664(){console.log(5597)}

    public constructor() {
        super();
        this.skinName = "TecUISkin";
    }

	private wx3_functionX_12665(){console.log(8595)}
    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.hide,this);
        this.topUI.setTitle('科技升级')

        this.addBtnEvent(this.coinGroup,this.onAddCoin_6534)

	wx3_function(3835);
        this.list.itemRenderer = TecItem;
        this.scroller.viewport = this.list;

    }

    private onAddCoin_6534(){
        GetCoinUI.getInstance().show();
	wx3_function(306);
    }

    public show(){
        super.show()
    }

	private wx3_functionX_12666(){console.log(8355)}
    public hide() {
        //MainPKUI.instance.hide();
        super.hide();
        //TaskManager.getInstance().guideTaskVO = null;
        //GameUI.getInstance().onTimer();
    }

    public onShow(){
        this.renew();
	wx3_function(5874);
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.onCoinChange_9332)
        this.testShowTask();
        TaskTips.getInstance().show(['tlv','def']);
    }

    public testShowTask(){
        var TSM = TaskManager.getInstance()
        if(TSM.guideTaskVO && TSM.guideTaskVO.type == 'tlv')
        {
            var index = TecManager.getInstance().tecBase[TSM.guideTaskVO.key].index;
	wx3_function(8988);
            if(index <= 3)
                this.scroller.viewport.scrollV = 0;
            else
            {
                this.validateNow()
                this.scroller.viewport.scrollV = Math.max(0,this.scroller.viewport.contentHeight - this.scroller.height);
	wx3_function(78);
            }


        }
    }

    private onCoinChange_9332(){
        this.coinText.text = UM_wx3.coinText
        MyTool.runListFun(this.list,'renewCost');
	wx3_function(6126);
    }


    public renew(){
         this.list.dataProvider = new eui.ArrayCollection(TecManager.getInstance().tecList);
        this.onCoinChange_9332();
	wx3_function(1116);
    }

}