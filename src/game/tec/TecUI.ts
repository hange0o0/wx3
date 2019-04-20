class TecUI extends game.BaseUI {

    private static _instance: TecUI;
    public static getInstance(): TecUI {
        if(!this._instance)
            this._instance = new TecUI();
        return this._instance;
    }

    private topUI: TopUI;
    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    public list: eui.List;
    private coinGroup: eui.Group;
    private coinText: eui.Label;
    private addCoinBtn: eui.Image;





    public constructor() {
        super();
        this.skinName = "TecUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.hide,this);
        this.topUI.setTitle('科技升级')

        this.addBtnEvent(this.coinGroup,this.onAddCoin)

        this.list.itemRenderer = TecItem;
        this.scroller.viewport = this.list;

    }

    private onAddCoin(){
        GetCoinUI.getInstance().show();
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
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.onCoinChange)
        this.testShowTask();

    }

    public testShowTask(){
        var TSM = TaskManager.getInstance()
        if(TSM.guideTaskVO && TSM.guideTaskVO.type == 'tlv')
        {
            var index = TecManager.getInstance().tecBase[TSM.guideTaskVO.key].index;
            if(index <= 3)
                this.scroller.viewport.scrollV = 0;
            else
            {
                this.validateNow()
                this.scroller.viewport.scrollV = Math.max(0,this.scroller.viewport.contentHeight - this.scroller.height);
            }
        }
    }

    private onCoinChange(){
        this.coinText.text = UM.coinText
        MyTool.runListFun(this.list,'renewCost');
    }


    public renew(){
         this.list.dataProvider = new eui.ArrayCollection(TecManager.getInstance().tecList);
        this.onCoinChange();
    }

}