class MonsterUI extends game.BaseUI_wx3 {

    private static _instance: MonsterUI;
    public static getInstance(): MonsterUI {
        if(!this._instance)
            this._instance = new MonsterUI();
        return this._instance;
    }
	private wx3_functionX_12435(){console.log(1827)}


    private topGroup: eui.Group;
    private desText: eui.Label;
    private addBtn: eui.Image;
    private scroller: eui.Scroller;
    public list: eui.List;
    private topUI: TopUI;
    private bottomUI: BottomUI;
    private sortBtn: eui.Group;
    private sortText: eui.Label;





    private wx3_functionX_12437(){console.log(9217)}

    private sortIndex = 0
    private sortBase= [
        {key:'default',name:'默认\n排序',color:0xFFFFFF},
        {key:'level',name:'等级\n升序',color:0xFFFF00},
        {key:'star',name:'星级\n升序',color:0x00FFFF},
        {key:'cost',name:'费用\n升序',color:0x00FF00},
        {key:'type',name:'阵营\n排序',color:0xFF00FF}
    ]
	private wx3_functionX_12438(){console.log(1168)}

    private dataProvider = new eui.ArrayCollection([]);
    public constructor() {
        super();
        this.skinName = "MonsterUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
	wx3_function(4372);

        this.bottomUI.setHide(this.hide,this);
        this.topUI.setTitle('我的怪物')


        this.scroller.viewport = this.list;
	wx3_function(2483);
        this.list.itemRenderer = MonsterItem
        this.list.dataProvider = this.dataProvider
        this.addBtnEvent(this.sortBtn,this.onSort_5969)
        this.addBtnEvent(this.topGroup,()=>{
            if(TecManager.getInstance().getTecLevel(11) >= TecManager.getInstance().tecBase[11].max)
                return;
            MyWindow.Confirm('升级'+this.createHtml('【'+TecManager.getInstance().tecBase[11].name+'】',0xFFD86D)+'可获得更多怪物，是否前往升级？',(b)=>{
                if(b==1)
                {
                    this.hide();
                    TaskManager.getInstance().guideTaskVO = TaskVO.getObject(17);
                   TecUI.getInstance().show();

                }
            },['知道了', '前往升级']);
        })
    }

    private onSort_5969(){
        this.sortIndex ++;
	wx3_function(1495);
        if(this.sortIndex >= this.sortBase.length)
            this.sortIndex = 0;
        this.renew();
    }


    //private onWork(){
    //    SharedObjectManager.getInstance().setMyValue('showWork',true)
    //    WorkUI.getInstance().show();
    //    this.hide();
    //}
	private wx3_functionX_12439(){console.log(8846)}


    public show(){
        super.show()
    }

	private wx3_functionX_12440(){console.log(835)}
    public hide() {
        super.hide();
        //TaskManager.getInstance().guideTaskVO = null;
    }

    public onShow(){
        this.renew();
	wx3_function(4540);
        this.renewDes_9848();
        this.addPanelOpenEvent(GameEvent.client.MONSTER_CHANGE,this.renewList_5981)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        GuideManager.getInstance().testShowGuide()
        TaskTips.getInstance().show(['mlv','mnum','mlv2','mnum2']);
        if(TecManager.getInstance().getTecLevel(11) >= TecManager.getInstance().tecBase[11].max)
        {
            MyTool.removeMC(this.addBtn)
        }
    }

    private onE(){
        MyTool.runListFun(this.list,'onE');
    }

    private renewList_5981(){
        MyTool.renewList(this.list);
	wx3_function(1337);
        this.renewDes_9848();
    }

    private renewDes_9848(){
        this.desText.text = '当前已解锁怪物种类：' +MonsterManager.getInstance().getOpenMonster().length + ' / ' + ObjectUtil.objToArray(MonsterVO.data).length;
    }
	private wx3_functionX_12441(){console.log(3948)}

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
	wx3_function(2399);
                break;
            case 'level':
                for(var i=0;i<list.length;i++)
                {
                    list[i].temp = MM.getMonsterLevel(list[i].id)
                }
                ArrayUtil.sortByField(list,['temp','level','cost','type'],[0,0,0,0]);
	wx3_function(4681);
                break;
            case 'star':
                for(var i=0;i<list.length;i++)
                {
                    list[i].temp = MM.getMonsterNum(list[i].id)
                }
                ArrayUtil.sortByField(list,['temp','level','cost','type'],[0,0,0,0]);
	wx3_function(2897);
                break;
            case 'cost':
                ArrayUtil.sortByField(list,['cost','level','type'],[0,0,0]);
                break;
            case 'type':
                ArrayUtil.sortByField(list,['type','cost','level'],[0,0,0]);
	wx3_function(6387);
                break;
        }


        for(var i=0;i<list.length;i++)
        {
            list[i] = {vo:list[i],list:list};
	wx3_function(7540);
        }
        this.dataProvider.source = list;
        this.dataProvider.refresh()
    }

}