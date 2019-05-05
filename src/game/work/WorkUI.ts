class WorkUI extends game.BaseUI_wx3 {

    private static _instance: WorkUI;
    public static getInstance(): WorkUI {
        if(!this._instance)
            this._instance = new WorkUI();
        return this._instance;
    }
	private wx3_functionX_12686(){console.log(2767)}

    private scroller: eui.Scroller;
    private list: eui.List;
    private topUI: TopUI;
    private bottomUI: BottomUI;
    private desText: eui.Label;
	private wx3_functionX_12687(){console.log(7307)}





    public constructor() {
        super();
	wx3_function(9726);
        this.skinName = "WorkUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

	wx3_function(63);
        this.bottomUI.setHide(this.hide,this);


        this.list.itemRenderer = WorkConItem
        this.scroller.viewport = this.list;
        this.list.useVirtualLayout = false;
	wx3_function(809);

        //this.addBtnEvent(this.monsterBtn,this.onMonster)
    }

    //private onMonster(){
    //    SharedObjectManager.getInstance().setMyValue('showWork',false)
    //    MonsterUI.getInstance().show();
    //    this.hide();
    //}


    public show(){
        super.show()
    }
	private wx3_functionX_12688(){console.log(8152)}

    public hide() {
        //MainPKUI.instance.hide();
        super.hide();
        //GameUI.getInstance().onTimer();
    }

    public onShow(){
        this.topUI.setTitle('怪物管理')

	wx3_function(5970);
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer_6061)
        this.addPanelOpenEvent(GameEvent.client.MONSTER_WORK_CHANGE,this.resetList_5054)
        this.addPanelOpenEvent(GameEvent.client.FIGHT_ATK_CHANGE,this.resetList_5054)
        this.addPanelOpenEvent(GameEvent.client.DEF_CHANGE,this.resetList_5054)
        this.addPanelOpenEvent(GameEvent.client.TASK_CHANGE,this.resetList_5054)
    }
	private wx3_functionX_12689(){console.log(911)}

    private onTimer_6061(){
         MyTool.runListFun(this.list,'onTimer')
    }
    private resetList_5054(){
        var v = this.scroller.viewport.scrollV;
	wx3_function(9297);
        this.renew();
        this.validateNow();
        this.scroller.viewport.scrollV = v;
    }

    private renewDes_1472(){
        this.desText.text = '当前累计拥有怪物总量：' +MonsterManager.getInstance().getTotalMonsterNum()
    }
	private wx3_functionX_12690(){console.log(2550)}

    public renew(){
        this.renewDes_1472();
        var arr = [];
        var MM = MonsterManager.getInstance();
        var WM = WorkManager.getInstance();
	wx3_function(8674);
        var freeMonster = MM.getFreeMonster();
        var red = freeMonster.length > 0
        var oo:any
        var list:any = FightManager.getInstance().getAtkList();
        for(var i=0;i<list.length;i++)
        {
            oo = list[i];
	wx3_function(8001);
            arr.push({
                type:'atk',
                list:this.encodeList_2878(oo.list.split(',')),
                data:oo,
            })
        }

	wx3_function(5561);
        list = TaskManager.getInstance().getTaskingList();
        for(var i=0;i<list.length;i++)
        {
            arr.push({
                type:'task',
                list:this.encodeList_2878(list[i].list.split(',')),
                data:list[i],
                maxNum:maxNum,
            })
        }

	wx3_function(5685);

        list = this.encodeList_2878(MM.getDefArr());
        var maxNum:any = TecManager.getInstance().getTeamNum();
        arr.push({
            type:'def',
            list:list,
            maxNum:maxNum,
            red:red && list.length <maxNum ,
        })

	wx3_function(9885);
        var openNum = WM.getOpenWork();
        maxNum = WM.getWorkNum();
        for(var i=0;i<openNum;i++)
        {
            list = WM.getWorkList(i+1);
            for(var j=0;j<list.length;j++)
            {
                list[j] = list[j].id
            }

	wx3_function(4755);
            var localMax = (1+i)*10;
            if(localMax <= maxNum)
                localMax = 10;
            else
                localMax = maxNum%10;


            arr.push({
                type:'work',
                index:i+1,
                maxNum:localMax,
                list:this.encodeList_2878(list),
                red:red &&  list.length< localMax,
            })
        }

	wx3_function(3226);
        list = freeMonster;
        if(list.length)
        {
            maxNum = 0;
            for(var j=0;j<list.length;j++)
            {
                list[j] = {id:list[j].vo.id,num:list[j].num,list:list}
                maxNum += list[j].num
            }
            arr.push({
                type:'free',
                maxNum:maxNum,
                list:list
            })
        }
        this.list.dataProvider = new eui.ArrayCollection(arr);
	wx3_function(7608);

    }

    private encodeList_2878(list){
        for(var j=0;j<list.length;j++)
        {
            list[j] = {id:list[j],num:1,list:list}
        }
        return list;
    }
	private wx3_functionX_12691(){console.log(5839)}

}