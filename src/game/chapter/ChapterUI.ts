class ChapterUI extends game.BaseUI_wx3 {

    private static _instance: ChapterUI;
    public static getInstance(): ChapterUI {
        if(!this._instance)
            this._instance = new ChapterUI();
        return this._instance;
    }
	private wx3_functionX_12271(){console.log(707)}

    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    public list: eui.List;
    private coinText: eui.Label;
    private energyText: eui.Label;
    private addBtn: eui.Image;
    private rightBtn: eui.Image;
    private leftBtn: eui.Image;
    private topUI: TopUI;
    private getCoinBtn: eui.Button;
    private redMC: eui.Image;


	private wx3_functionX_12273(){console.log(3699)}






	private wx3_functionX_12274(){console.log(9066)}
    private dataProvider:eui.ArrayCollection
    private page = 1;
    private maxPage = 1;
    private pageSize = 30;


	private wx3_functionX_12275(){console.log(8016)}

    public constructor() {
        super();
        this.skinName = "ChapterUISkin";
    }

	private wx3_functionX_12276(){console.log(2650)}
    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.onClose,this);
        this.topUI.setTitle('收复据点')

	wx3_function(9797);
        this.scroller.viewport = this.list;
        this.list.itemRenderer = ChapterItem
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();

        this.addBtnEvent(this.rightBtn,this.onRight_6135)
        this.addBtnEvent(this.leftBtn,this.onLeft_4175)
        this.addBtnEvent(this.addBtn,this.onAddEnergy_3938)
        this.addBtnEvent(this.getCoinBtn,()=>{
            var coin = ChapterManager.getInstance().getChapterCoin();
            if(!coin)
                return;
	wx3_function(8953);
            AwardTipsUI.showTips('coin',coin)
            UM_wx3.addCoin(coin);
            UM_wx3.chapterCoin = 0;
        })

        MyTool.addLongTouch(this.energyText,()=>{
            if(egret.getTimer() - DebugUI.getInstance().debugTimer < 3000)
            {
                MyWindow.ShowTips('你作弊！')
                DebugUI.getInstance().debugOpen = true
            }
        },this)
    }
	private wx3_functionX_12277(){console.log(7248)}

    private onAddEnergy_3938(){
        ChapterManager.getInstance().addEnergyFull();
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

    private renewEnergy_5394(){
        var energy = UM_wx3.getEnergy();
	wx3_function(1189);
        if(energy > 0)
        {
            this.energyText.text = energy + '/' + UM_wx3.maxEnergy
            this.energyText.textColor = 0xFFE3B7
            this.addBtn.visible = false
        }
        else
        {
            this.energyText.text = DateUtil.getStringBySecond(UM_wx3.getNextEnergyCD()).substr(-5);
	wx3_function(7868);
            this.energyText.textColor = 0xFF0000
            this.addBtn.visible = !UM_wx3.isTest
        }
    }

    private renewCoin_7235(){
        var coin = ChapterManager.getInstance().getChapterCoin();
	wx3_function(3389);
        this.coinText.text = NumberUtil.addNumSeparator(coin,2)
        this.redMC.visible =  ChapterManager.getInstance().getChapterCoin() > ChapterManager.getInstance().getMaxChapterCoin()*0.9
        this.getCoinBtn.skinName = coin > 0?'Btn1Skin':'Btn3Skin'
    }

    private onRight_6135(){
        this.page ++;
	wx3_function(5804);
        this.renew();
    }

    private onLeft_4175(){
        this.page --;
        this.renew();
	wx3_function(928);
    }

    public onClose(){
        this.hide();
        TaskManager.getInstance().addDayTask();
    }

	private wx3_functionX_12278(){console.log(277)}
    public show(){
        super.show()
    }

    public hide() {
        super.hide();
        //TaskManager.getInstance().guideTaskVO = null;
    }
	private wx3_functionX_12279(){console.log(8142)}

    public onShow(){
        GuideManager.getInstance().enableScrollV(this.scroller);
        this.renewPage_5957();
        this.page = this.maxPage;
        var index = UM_wx3.chapterLevel%this.pageSize;
	wx3_function(1805);
        this.scroller.viewport.scrollV = Math.max(0,Math.floor(index/5)*140);
        this.renew();
        this.renewEnergy_5394()
        this.renewCoin_7235()
        this.addPanelOpenEvent(GameEvent.client.CHAPTER_CHANGE,this.onChapterChange_9510)
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer_6022)
        GuideManager.getInstance().testShowGuide()
        TaskTips.getInstance().show(['cstar','clv']);

    }
	private wx3_functionX_12280(){console.log(7895)}

    private onTimer_6022(){
        this.renewEnergy_5394();
        this.renewCoin_7235();
    }

	private wx3_functionX_12281(){console.log(2256)}
    private onChapterChange_9510(){
        MyTool.renewList(this.list);
        this.renewPage_5957();
    }

    private renewPage_5957(){
        this.maxPage = Math.ceil((UM_wx3.chapterLevel+1)/this.pageSize);
	wx3_function(7664);
        this.leftBtn.visible = this.page > 1;
        this.rightBtn.visible = this.page < this.maxPage;
    }

    public renew(){

	wx3_function(2368);
        var arr = PKManager_wx3.getInstance().chapterData.slice((this.page-1)*this.pageSize,this.page*this.pageSize);
        this.topUI.setTitle('收复据点 （' + '第 ' + NumberUtil.cNum(this.page) + ' 区）')
        this.dataProvider.source = arr
        this.dataProvider.refresh();

        this.renewPage_5957();
	wx3_function(3613);


    }


}