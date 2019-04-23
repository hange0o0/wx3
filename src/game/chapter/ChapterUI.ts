class ChapterUI extends game.BaseUI {

    private static _instance: ChapterUI;
    public static getInstance(): ChapterUI {
        if(!this._instance)
            this._instance = new ChapterUI();
        return this._instance;
    }

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







    private dataProvider:eui.ArrayCollection
    private page = 1;
    private maxPage = 1;
    private pageSize = 30;



    public constructor() {
        super();
        this.skinName = "ChapterUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.onClose,this);
        this.topUI.setTitle('收复据点')

        this.scroller.viewport = this.list;
        this.list.itemRenderer = ChapterItem
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();

        this.addBtnEvent(this.rightBtn,this.onRight)
        this.addBtnEvent(this.leftBtn,this.onLeft)
        this.addBtnEvent(this.addBtn,this.onAddEnergy)
        this.addBtnEvent(this.getCoinBtn,()=>{
            var coin = ChapterManager.getInstance().getChapterCoin();
            MyWindow.ShowTips('获得金币：' + MyTool.createHtml('+' + NumberUtil.addNumSeparator(coin,2),0xFBB646),1500)
            UM.addCoin(coin);
            UM.chapterCoin = 0;
        })

        MyTool.addLongTouch(this.energyText,()=>{
            if(egret.getTimer() - DebugUI.getInstance().debugTimer < 3000)
            {
                MyWindow.ShowTips('你作弊！')
                DebugUI.getInstance().debugOpen = true
            }
        },this)
    }

    private onAddEnergy(){
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

    private renewCoin(){
        var coin = ChapterManager.getInstance().getChapterCoin();
        this.coinText.text = NumberUtil.addNumSeparator(coin,2)
        this.getCoinBtn.visible = coin > 0
    }

    private onRight(){
        this.page ++;
        this.renew();
    }

    private onLeft(){
        this.page --;
        this.renew();
    }

    public onClose(){
        this.hide();
    }

    public show(){
        super.show()
    }

    public hide() {
        super.hide();
        //TaskManager.getInstance().guideTaskVO = null;
    }

    public onShow(){
        GuideManager.getInstance().enableScrollV(this.scroller);
        this.renewPage();
        this.page = this.maxPage;
        var index = UM.chapterLevel%this.pageSize;
        this.scroller.viewport.scrollV = Math.max(0,Math.floor(index/5)*140);
        this.renew();
        this.renewEnergy()
        this.renewCoin()
        this.addPanelOpenEvent(GameEvent.client.CHAPTER_CHANGE,this.onChapterChange)
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        GuideManager.getInstance().testShowGuide()
    }

    private onTimer(){
        this.renewEnergy();
        this.renewCoin();
    }

    private onChapterChange(){
        MyTool.renewList(this.list);
        this.renewPage();
    }

    private renewPage(){
        this.maxPage = Math.ceil((UM.chapterLevel+1)/this.pageSize);
        this.leftBtn.visible = this.page > 1;
        this.rightBtn.visible = this.page < this.maxPage;
    }

    public renew(){

        var arr = PKManager_wx3.getInstance().chapterData.slice((this.page-1)*this.pageSize,this.page*this.pageSize);
        this.topUI.setTitle('收复据点 （' + '第 ' + NumberUtil.cNum(this.page) + ' 区）')
        this.dataProvider.source = arr
        this.dataProvider.refresh();

        this.renewPage();


    }


}