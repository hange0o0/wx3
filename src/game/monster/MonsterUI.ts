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
    private sortBtn: eui.Group;
    private sortText: eui.Label;
    private desText: eui.Label;





    private sortIndex = 0
    private sortBase= [
        {key:'default',name:'默认\n排序',color:0xFFFFFF},
        {key:'level',name:'等级\n升序',color:0xFFFF00},
        {key:'star',name:'星级\n升序',color:0x00FFFF},
        {key:'cost',name:'费用\n升序',color:0x00FF00},
        {key:'type',name:'阵营\n排序',color:0xFF00FF}
    ]
    public constructor() {
        super();
        this.skinName = "MonsterUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.hide,this);
        this.topUI.setTitle('我的怪物')


        this.scroller.viewport = this.list;
        this.list.itemRenderer = MonsterItem
        this.addBtnEvent(this.sortBtn,this.onSort)
    }

    private onSort(){
        this.sortIndex ++;
        if(this.sortIndex >= this.sortBase.length)
            this.sortIndex = 0;
        this.renew();
    }


    //private onWork(){
    //    SharedObjectManager.getInstance().setMyValue('showWork',true)
    //    WorkUI.getInstance().show();
    //    this.hide();
    //}


    public show(){
        super.show()
    }

    public hide() {
        super.hide();
        TaskManager.getInstance().guideTaskVO = null;
    }

    public onShow(){
        this.renew();
        this.renewDes();
        this.addPanelOpenEvent(GameEvent.client.TASK_CHANGE,this.renewList)
    }

    private renewList(){
        MyTool.renewList(this.list);
        this.renewDes();
    }

    private renewDes(){
        this.desText.text = '当前已解锁怪物种类：' +MonsterManager.getInstance().getOpenMonster().length + ' / ' + ObjectUtil.objToArray(MonsterVO.data).length;
    }

    public renew(){
        var MM = MonsterManager.getInstance();
        var list = MM.getOpenMonster();
        var sortObj = this.sortBase[this.sortIndex];
        this.sortText.text = sortObj.name
        this.sortText.textColor = sortObj.color
        //{key:'default',name:'默认排序'},
        //{key:'level',name:'等级升序'},
        //{key:'star',name:'星级升序'},
        //{key:'cost',name:'费用升序'},
        //{key:'type',name:'阵营排序'}
        switch(sortObj.key)
        {
            case 'default':
                ArrayUtil.sortByField(list,['level','cost','type'],[0,0,0]);
                break;
            case 'level':
                for(var i=0;i<list.length;i++)
                {
                    list[i].temp = MM.getMonsterLevel(list[i].id)
                }
                ArrayUtil.sortByField(list,['temp','level','cost','type'],[0,0,0,0]);
                break;
            case 'star':
                for(var i=0;i<list.length;i++)
                {
                    list[i].temp = MM.getMonsterNum(list[i].id)
                }
                ArrayUtil.sortByField(list,['temp','level','cost','type'],[0,0,0,0]);
                break;
            case 'cost':
                ArrayUtil.sortByField(list,['cost','level','type'],[0,0,0]);
                break;
            case 'type':
                ArrayUtil.sortByField(list,['type','cost','level'],[0,0,0]);
                break;
        }


        for(var i=0;i<list.length;i++)
        {
            list[i] = {vo:list[i],list:list};
        }
        this.list.dataProvider = new eui.ArrayCollection(list);
    }

}