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
    private titleText: eui.Label;
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
    }

    public renew(){
        this.maxPage = Math.ceil(UM.chapterLevel/this.pageSize);

        var arr = PKManager.getInstance().chapterData.slice((this.page-1)*this.pageSize,this.page*this.pageSize);
        this.titleText.text = '第 ' + NumberUtil.cNum(this.page) + ' 区';
        this.dataProvider.source = arr
        this.dataProvider.refresh();

        this.leftBtn.visible = this.page > 1;
        this.rightBtn.visible = this.page < this.maxPage;
    }
}