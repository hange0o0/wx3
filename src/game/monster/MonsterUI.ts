class MonsterUI extends game.BaseUI {

    private static _instance: MonsterUI;
    public static getInstance(): MonsterUI {
        if(!this._instance)
            this._instance = new MonsterUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;
    private topUI: TopUI;
    private bottomUI: BottomUI;
    private workBtn: eui.Group;




    public constructor() {
        super();
        this.skinName = "MonsterUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.hide,this);
        this.topUI.setTitle('我的怪物')

        this.addBtnEvent(this.workBtn,this.onWork)

        this.scroller.viewport = this.list;
        this.list.itemRenderer = MonsterItem
    }

    private onWork(){
        SharedObjectManager.getInstance().setMyValue('showWork',true)
        WorkUI.getInstance().show();
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
        var MM = MonsterManager.getInstance();
        var list = MM.getOpenMonster();
        ArrayUtil.sortByField(list,['level','cost','type'],[0,0,0])
        for(var i=0;i<list.length;i++)
        {
            list[i] = {vo:list[i],list:list};
        }
        this.list.dataProvider = new eui.ArrayCollection(list);
    }

}