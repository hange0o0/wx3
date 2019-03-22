class WorkUI extends game.BaseUI {

    private static _instance: WorkUI;
    public static getInstance(): WorkUI {
        if(!this._instance)
            this._instance = new WorkUI();
        return this._instance;
    }

    private topUI: TopUI;
    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    private list: eui.List;
    private monsterBtn: eui.Group;




    public constructor() {
        super();
        this.skinName = "WorkUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.hide,this);
        this.topUI.setTitle('工作中的怪物')

        this.list.itemRenderer = WorkConItem
        this.scroller.viewport = this.list;
        this.list.useVirtualLayout = false;

        this.addBtnEvent(this.monsterBtn,this.onMonster)
    }

    private onMonster(){
        SharedObjectManager.getInstance().setMyValue('showWork',false)
        MonsterUI.getInstance().show();
        this.hide();
    }


    public show(){
        super.show()
    }

    public hide() {
        //MainPKUI.instance.hide();
        super.hide();
        //GameUI.getInstance().onTimer();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        this.addPanelOpenEvent(GameEvent.client.MONSTER_WORK_CHANGE,this.resetList)
        this.addPanelOpenEvent(GameEvent.client.FIGHT_ATK_CHANGE,this.resetList)
    }

    private onTimer(){
         MyTool.runListFun(this.list,'onTimer')
    }
    private resetList(){
        var v = this.scroller.viewport.scrollV;
        this.renew();
        this.validateNow();
        this.scroller.viewport.scrollV = v;
    }

    public renew(){
        var arr = [];
        var MM = MonsterManager.getInstance();
        var WM = WorkManager.getInstance();
        var freeMonster = MM.getFreeMonster();
        var red = freeMonster.length > 0
        var oo:any
        var list:any = FightManager.getInstance().getAtkList();
        for(var i=0;i<list.length;i++)
        {
            oo = list[i];
            arr.push({
                type:'atk',
                list:this.encodeList(oo.list.split(',')),
                data:oo,
            })
        }

        list = this.encodeList(MM.getDefArr());
        var maxNum:any = TecManager.getInstance().getTeamNum();
        arr.push({
            type:'def',
            list:list,
            maxNum:maxNum,
            red:red && list.length <maxNum ,
        })

        maxNum = WM.getOpenWork();
        for(var i=0;i<maxNum;i++)
        {
            list = WM.getWorkList(i+1);
            for(var j=0;j<list.length;j++)
            {
                list[j] = list[j].id
            }

            var localMax = (1+i)*10;
            if(localMax >= maxNum)
                localMax = 10;
            else
                localMax = localMax%10;

            arr.push({
                type:'work',
                index:i+1,
                maxNum:localMax,
                list:this.encodeList(list),
                red:red &&  list.length< localMax,
            })
        }

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

    }

    private encodeList(list){
        for(var j=0;j<list.length;j++)
        {
            list[j] = {id:list[j],num:1,list:list}
        }
        return list;
    }

}