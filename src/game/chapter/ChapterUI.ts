class ChapterUI extends game.BaseUI {

    private static _instance: ChapterUI;
    public static getInstance(): ChapterUI {
        if(!this._instance)
            this._instance = new ChapterUI();
        return this._instance;
    }

    private topUI: TopUI;
    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    private list: eui.List;
    private energyText: eui.Label;
    private addBtn: eui.Image;
    private rightBtn: eui.Image;
    private leftBtn: eui.Image;






    private dataProvider:eui.ArrayCollection
    private page = 1;
    private maxPage = 1;
    private pageSize = 50;



    public constructor() {
        super();
        this.skinName = "ChapterUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.onClose,this);
        this.topUI.setTitle('扩张版图')

        this.scroller.viewport = this.list;
        this.list.itemRenderer = ChapterItem
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();

        this.addBtnEvent(this.rightBtn,this.onRight)
        this.addBtnEvent(this.leftBtn,this.onLeft)
        this.addBtnEvent(this.addBtn,this.onAddEnergy)
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
    }

    public onShow(){
        this.renew();
        this.renewEnergy()
        this.addPanelOpenEvent(GameEvent.client.CHAPTER_CHANGE,this.onChapterChange)
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
    }

    private onTimer(){
        this.renewEnergy();
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


        var arr = PKManager.getInstance().chapterData.slice((this.page-1)*this.pageSize,this.page*this.pageSize);
        this.topUI.setTitle('扩张版图（' + '第 ' + NumberUtil.cNum(this.page) + ' 区）')
        this.dataProvider.source = arr
        this.dataProvider.refresh();

        this.renewPage();


    }
}