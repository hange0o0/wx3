class PKPosUI extends game.BaseUI {

    private static _instance: PKPosUI;
    public static getInstance(): PKPosUI {
        if(!this._instance)
            this._instance = new PKPosUI();
        return this._instance;
    }
	private wx3_functionX_12533(){console.log(9174)}

    private bottomUI: BottomUI;
    private topUI: TopUI;
    private mainCon: eui.Group;
    private con: eui.Group;
    private bg: eui.Image;
	private wx3_functionX_12534(){console.log(1436)}
    private otherForceText: eui.Label;
    private forceText: eui.Label;
    private coinText: eui.Label;
    private costText: eui.Label;
    private numText: eui.Label;
    private chooseGroup: eui.Group;
	private wx3_functionX_12535(){console.log(2779)}
    private desText: eui.Label;
    public chooseList: eui.List;
    private scroller: eui.Scroller;
    public list: eui.List;
    private emptyGroup: eui.Group;
    private emptyText: eui.Label;
	private wx3_functionX_12536(){console.log(4071)}
    private tecBtn: eui.Button;
    private monsterBtn: eui.Button;
    private workBtn: eui.Button;
    private btnGroup: eui.Group;
    private sortBtn: eui.Group;
    private sortText: eui.Label;
	private wx3_functionX_12537(){console.log(5623)}
    private okText: eui.Label;
    private resetBtn: eui.Group;
    public okBtn: eui.Group;
    public pkBtn: eui.Group;


	private wx3_functionX_12538(){console.log(1507)}






	private wx3_functionX_12539(){console.log(5986)}

    private defItem:DefUI
    private workItem:MainWorkItem
    private fightItem:FightItem
    private taskItem:TaskItem

	private wx3_functionX_12540(){console.log(2413)}



    private dragTarget = new PKPosChooseItem_wx3()


	private wx3_functionX_12541(){console.log(7444)}
    private monsterArr = []
    private dataProvider:eui.ArrayCollection
    private chooseDataProvider:eui.ArrayCollection

    //public level = 1;
    //public question = {"list1":"1,11,44,6,72,4,16","list2":"42,73,17,10,73","seed":19348313264,"cost":30}

    public emptyNum = {}; //空闲怪的数量
	private wx3_functionX_12542(){console.log(6148)}
    public maxCost = 0  //最大消耗
    public maxNum = 0 //最大数量
    public currentCost = 0 //当前消耗

    private sortIndexWork = 0
    private sortIndexPK = 0
	private wx3_functionX_12543(){console.log(5852)}
    private sortIndexTask = 0
    private sortBaseTask= [
        {key:'default',name:'默认\n排序',color:0xFFFFFF},
        {key:'level2',name:'等级\n升序',color:0xFFFF00},
        //{key:'type',name:'阵营\n排序'}
    ]
    private sortBaseWork= [
        {key:'default',name:'默认\n排序',color:0xFFFFFF},
        {key:'work',name:'效率\n降序',color:0xFF8800},
        {key:'level',name:'等级\n降序',color:0xFFFF00},
        //{key:'type',name:'阵营\n排序'}
    ]
	private wx3_functionX_12544(){console.log(5023)}
    private sortBasePK= [
        {key:'default',name:'默认\n排序',color:0xFFFFFF},
        {key:'pk',name:'战力\n降序',color:0xFF0000},
        {key:'level',name:'等级\n降序',color:0xFFFF00},
        {key:'cost',name:'费用\n升序',color:0x00FF00},
        {key:'type',name:'阵营\n排序',color:0xFF00FF}
    ]
	private wx3_functionX_12545(){console.log(8385)}

    public dataIn;
    public constructor() {
        super();
        this.skinName = "PKPosUISkin";
    }
	private wx3_functionX_12546(){console.log(245)}

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.onClose,this);


        this.chooseList.itemRenderer = PKPosChooseItem_wx3
        this.chooseList.dataProvider = this.chooseDataProvider = new eui.ArrayCollection();
	wx3_function(1995);

        this.scroller.viewport = this.list;
        this.list.itemRenderer = PKPosListItem_wx3
        this.list.dataProvider =  this.dataProvider = new eui.ArrayCollection()

        this.addBtnEvent(this.pkBtn,this.onPK);
	wx3_function(6941);
        this.addBtnEvent(this.okBtn,this.onSave);
        this.addBtnEvent(this.resetBtn,this.reset);
        this.addBtnEvent(this.tecBtn,()=>{
            this.hide();
            TecUI.getInstance().show()
        });
	wx3_function(5069);
        this.addBtnEvent(this.monsterBtn,()=>{
            this.hide();
            MonsterUI.getInstance().show()
        });
        this.addBtnEvent(this.workBtn,()=>{
            this.hide();
	wx3_function(5260);
            WorkUI.getInstance().show()
        });

        this.chooseList.addEventListener('start_drag',this.onDragStart_1592,this);
        this.chooseList.addEventListener('end_drag',this.onDragEnd_4863,this);
        this.chooseList.addEventListener('move_drag',this.onDragMove_5461,this);
	wx3_function(4602);


        this.addBtnEvent(this.con,this.onMClick_412)
        this.reset();

        this.stage.addChild(this.dragTarget);
	wx3_function(9187);
        this.dragTarget.initDragItem();
        MyTool.removeMC(this.dragTarget);
        this.addBtnEvent(this.sortBtn,this.onSort_3736)
    }


	private wx3_functionX_12547(){console.log(7169)}
    private onSort_3736(){
        if(this.dataIn.type == 'task')
        {
            this.sortIndexTask ++;
            if(this.sortIndexTask >= this.sortBaseTask.length)
                this.sortIndexTask = 0;
	wx3_function(1388);
        }
        else if(this.dataIn.isPK)
        {
            this.sortIndexPK ++;
            if(this.sortIndexPK >= this.sortBasePK.length)
                this.sortIndexPK = 0;
	wx3_function(1988);
        }
        else
        {
            this.sortIndexWork ++;
            if(this.sortIndexWork >= this.sortBaseWork.length)
                this.sortIndexWork = 0;
	wx3_function(6099);
        }

        this.renewDownList_4788();
    }

    private onMClick_412(e){
        var x = e.stageX;
	wx3_function(4331);
        var y = e.stageY;

        for(var i=this.monsterArr.length-1;i>=0;i--)
        {
            var mc = this.monsterArr[i];
            if(mc.clickMC.hitTestPoint(x,y))
            {
                var list = [];
	wx3_function(4486);
                for(var j=0;j<this.monsterArr.length;j++)
                {
                    list.push(this.monsterArr[j].id)
                }
                CardInfoUI.getInstance().show(mc.id,list,i,{otherForce:this.dataIn.enemy.force || 0});
                break;
            }
        }
    }
	private wx3_functionX_12548(){console.log(4740)}

    public stopDrag(){
        MyTool.removeMC(this.dragTarget)
        for(var i=0;i<this.chooseList.numChildren;i++) {
            var mc:any = this.chooseList.getChildAt(i);
            mc.setChoose(false);
	wx3_function(5960);
        }
    }

    private onDragStart_1592(e){
        e.target.setChoose(true);
        this.dragTarget.data = e.target.data
        this.stage.addChild(this.dragTarget);
	wx3_function(2629);
        this.dragTarget.x = e.data.x;
        this.dragTarget.y = e.data.y;
        this.dragTarget.showDragState(0)
    }

    private onDragMove_5461(e){
        if(!this.dragTarget.parent)
            return;
        this.dragTarget.x = e.data.x - this.dragTarget.width/2;
	wx3_function(3859);
        this.dragTarget.y = e.data.y - this.dragTarget.height/2;



        var x = this.dragTarget.x + this.dragTarget.width/2
        var y = this.dragTarget.y + this.dragTarget.height/2
        if(this.chooseList.hitTestPoint(x,y))
        {
            for(var i=0;i<this.chooseList.numChildren;i++)
            {
                var mc:any = this.chooseList.getChildAt(i);
	wx3_function(2317);
                if(mc.data && mc.visible && mc.hitMC.hitTestPoint(x,y))
                {
                    if(mc.data == this.dragTarget.data)
                    {
                        this.dragTarget.showDragState(0);
                        return;
                    }
                    var p = mc.globalToLocal(x,y);
	wx3_function(3509);
                    if(p.x < mc.width/4 || p.x > mc.width/4*3)
                        this.dragTarget.showDragState(2);
                    else
                        this.dragTarget.showDragState(1)
                    return
                }
            }
            this.dragTarget.showDragState(0)
        }
        else
        {
            this.dragTarget.showDragState(0)
        }
    }
	private wx3_functionX_12549(){console.log(1474)}

    private onDragEnd_4863(e){
        if(!this.dragTarget.parent)
            return;
        MyTool.removeMC(this.dragTarget)
        var x = this.dragTarget.x + this.dragTarget.width/2
        var y = this.dragTarget.y + this.dragTarget.height/2
        if(this.chooseList.hitTestPoint(x,y))
        {
            for(var i=0;i<this.chooseList.numChildren;i++)
            {
                var mc:any = this.chooseList.getChildAt(i);
	wx3_function(5436);
                if(mc.data && mc.visible && mc.hitMC.hitTestPoint(x,y))
                {
                    if(mc.data == this.dragTarget.data)
                        break
                    var currentIndex =  this.chooseDataProvider.source.indexOf(mc.data)// this.chooseList会有不存在数组中数据的显示对象
                    if(GuideManager.getInstance().isGuiding && currentIndex != 0)
                        return;
                    var index = this.chooseDataProvider.source.indexOf(this.dragTarget.data)
                    var p = mc.globalToLocal(x,y);
	wx3_function(4142);
                    if(p.x < mc.width/4 || p.x > mc.width/4*3)//insert
                    {
                        var targetIndex = p.x < mc.width/4?currentIndex:currentIndex+1;
                        if(targetIndex == index)
                            break;
                        this.chooseDataProvider.removeItemAt(index)
                        if(targetIndex > index)
                            targetIndex --;
	wx3_function(392);
                        this.chooseDataProvider.addItemAt(this.dragTarget.data,targetIndex)
                    }
                    else//swap
                    {
                        this.chooseDataProvider.source[index] = mc.data
                        this.chooseDataProvider.source[currentIndex] = this.dragTarget.data
                    }

                    GuideManager.getInstance().testShowGuide()

	wx3_function(4238);
                    this.chooseDataProvider.refresh();
                    this.chooseList.validateNow();
                    break
                }
            }
        }

        for(var i=0;i<this.chooseList.numChildren;i++) {
            var mc:any = this.chooseList.getChildAt(i);
	wx3_function(4302);
            mc.setChoose(false);
        }
    }

    public addChoose(id){
        var index = this.getChooseNum();
	wx3_function(4472);
        this.chooseDataProvider.removeItemAt(this.chooseDataProvider.length - 1);
        this.chooseDataProvider.addItemAt({id:id,list:this.chooseDataProvider.source},index)
        this.addFreeMonsterNum(id,-1)
        this.onItemChange_5686();
        GuideManager.getInstance().testShowGuide()
    }
	private wx3_functionX_12550(){console.log(0)}

    public deleteItem(data){
        var index = this.chooseDataProvider.getItemIndex(data)
        this.addFreeMonsterNum(data.id,1)
        this.chooseDataProvider.removeItemAt(index);
        this.chooseDataProvider.addItem(null);
	wx3_function(8788);
        this.chooseList.validateNow();
        this.onItemChange_5686()
    }

    private onItemChange_5686(){
        if(this.dataIn.isPK)
        {
            var cost = this.currentCost = this.getMyCost_46();
	wx3_function(7909);
            this.costText.text = '费用：' + cost + '/' + this.maxCost;

            this.forceText.text = '战力：' + this.getForce();
        }
        else
        {
            this.coinText.text = '产出：' + NumberUtil.addNumSeparator(WorkManager.getInstance().getListHourEarn(this.getMyList_2065()),2) + ' /小时'
        }
        this.numText.text = '数量：' + this.getChooseNum() + '/' + this.maxNum;
	wx3_function(2042);
        MyTool.renewList(this.list)
        this.desText.visible = this.getChooseNum() == 0
        this.chooseList.visible = !this.desText.visible;
    }

    public getForce(){
        return MonsterManager.getInstance().getMyListForce(this.getMyList_2065(),this.dataIn.isAtk)
    }
	private wx3_functionX_12551(){console.log(3791)}

    public getChooseNum(){
        var count = 0;
        var arr = this.chooseDataProvider.source;
        for(var i = 0;i<arr.length;i++)
        {
            if(arr[i])
                count += 1;
	wx3_function(8682);
        }
        return count;
    }

    public getFreeMonsterNum(id){
          return this.emptyNum[id] || 0
    }
	private wx3_functionX_12552(){console.log(832)}

    public addFreeMonsterNum(id,num){
        this.emptyNum[id] = this.getFreeMonsterNum(id) + num;
    }


	private wx3_functionX_12553(){console.log(9766)}

    public onPK(){
        var list = this.getMyList_2065();
        if(!list)
        {
            MyWindow.ShowTips('队列阵容不可为空')
            return;
        }
        if(this.dataIn.autoList)
            SharedObjectManager_wx3.getInstance().setMyValue('lastAtkList',list);
	wx3_function(9718);
        MonsterManager.getInstance().getMyListForce(list,this.dataIn.isAtk)
        UM_wx3.maxForce = Math.max(UM_wx3.maxForce,Math.ceil(MonsterManager.getInstance().tempForceAdd));
        this.dataIn.fun && this.dataIn.fun(list)
    }
    public onSave(){
        var list = this.getMyList_2065();
	wx3_function(4748);
        if(this.dataIn.type == 'task')
        {
            if(this.getChooseNum() != this.maxNum)
            {
                MyWindow.ShowTips('需要上阵'+this.maxNum+'个怪物才能开始任务')
                return;
            }
        }
        if(list && this.dataIn.isPK)
        {
            MonsterManager.getInstance().getMyListForce(list,this.dataIn.isAtk)
            UM_wx3.maxForce = Math.max(UM_wx3.maxForce,Math.ceil(MonsterManager.getInstance().tempForceAdd));
	wx3_function(5616);
        }

        this.dataIn.fun && this.dataIn.fun(list)
        GuideManager.getInstance().testShowGuide()
    }

	private wx3_functionX_12554(){console.log(4011)}
    public onClose(){
        this.hide();
    }

     /*
     title
	private wx3_functionX_12555(){console.log(3284)}
     enemy:{list,seed,force}
     chooseList//已选中列表，已在list中扣除    string
     isPK
      isAtk
      maxCost
      maxNum
	private wx3_functionX_12556(){console.log(1358)}
     fun
     autoList
     noEmpty
     workIndex
      fightData
      taskData
	private wx3_functionX_12557(){console.log(4141)}
      */
    public show(dataIn?){

        this.dataIn = dataIn;
        this.maxCost = this.dataIn.maxCost || 9999;
        this.maxNum = this.dataIn.maxNum || 0;
	wx3_function(9144);
        super.show()
    }

    public hide() {
        super.hide();
    }
	private wx3_functionX_12558(){console.log(490)}



    public onShow(){

        this.okText.text = '保存'
        this.renew_2927();
	wx3_function(6679);
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE_8047)
        this.addPanelOpenEvent(GameEvent.client.MONSTER_CHANGE,this.onMonsterChange_9873) //怪物升级/升星

        GuideManager.getInstance().testShowGuide()
    }

	private wx3_functionX_12559(){console.log(4759)}
    private onMonsterChange_9873(){
        this.renewDownList_4788()
        this.onItemChange_5686();
    }

    private onE_8047(){
        switch (this.dataIn.type)
        {
            case 'chapter':
                this.randomTalk();
	wx3_function(5989);
                break;
            case 'def':
                this.defItem && this.defItem.onE();
                break;
            case 'work':
                this.workItem && this.workItem.onE();
	wx3_function(394);
                break;

        }
    }

    private renewByType_493(){
        while(this.monsterArr.length > 0)
        {
            PKMonsterMV_wx3.freeItem(this.monsterArr.pop());
	wx3_function(1339);
        }
        MyTool.removeMC(this.con)
        this.defItem && MyTool.removeMC(this.defItem)
        this.workItem && MyTool.removeMC(this.workItem)
        this.fightItem && MyTool.removeMC(this.fightItem)
        this.taskItem && MyTool.removeMC(this.taskItem)
        switch (this.dataIn.type)
        {
            case 'chapter':
                this.mainCon.addChildAt(this.con,0);
	wx3_function(2043);
                this.showEnemy();
                break;
            case 'def':
                if(!this.defItem){
                    this.defItem = new DefUI();
                    this.defItem.isPos = true;
	wx3_function(5020);
                }
                this.mainCon.addChildAt(this.defItem,0);
                this.defItem.dataChanged();
                this.defItem.touchChildren = this.defItem.touchEnabled = false
                break;
            case 'work':
                if(!this.workItem){
                    this.workItem = new MainWorkItem();
	wx3_function(4592);
                }
                this.mainCon.addChildAt(this.workItem,0);
                this.workItem.data = {id:this.dataIn.workIndex};
                this.workItem.touchChildren = this.workItem.touchEnabled = false
                break;
            case 'fight':
                if(!this.fightItem){
                    this.fightItem = new FightItem();
	wx3_function(7041);
                    this.fightItem.horizontalCenter = 0
                    this.fightItem.verticalCenter = 0
                }
                this.bg.source = PKManager_wx3.getInstance().getDefBG(this.dataIn.fightData.level);
                this.otherForceText.text = '对方总战力：???';
                this.mainCon.addChildAt(this.con,0);
	wx3_function(398);
                this.con.addChild(this.fightItem)
                this.fightItem.data = this.dataIn.fightData;
                this.fightItem.touchChildren = this.fightItem.touchEnabled = false
                break;
            case 'task':
                this.currentState = 'task'
                if(!this.taskItem){
                    this.taskItem = new TaskItem();
	wx3_function(3944);
                    this.taskItem.horizontalCenter = 0
                    this.taskItem.verticalCenter = 0
                    this.taskItem.currentState = 's2'
                }
                this.okText.text = '接单'
                this.bg.source = PKManager_wx3.getInstance().getDefBG();
	wx3_function(6223);
                this.otherForceText.text = '';
                this.mainCon.addChildAt(this.con,0);
                this.con.addChild(this.taskItem)
                this.taskItem.data = this.dataIn.taskData;
                this.taskItem.touchChildren = this.taskItem.touchEnabled = false
                break;
        }
    }
	private wx3_functionX_12560(){console.log(1461)}

    public showEnemy() {

        var arr = this.dataIn.enemy.list.split(',')
        arr.reverse();
        var des = Math.min(500/(arr.length-1),80)
        var begin = (640-des*(arr.length-1))/2
        var count = 0;
	wx3_function(3129);
        var force = this.dataIn.enemy.force || 0;

        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i]
            var vo = MonsterVO.getObject(id);
	wx3_function(5831);
            var item = PKMonsterMV_wx3.createItem();
            count += vo.cost*(1+force/100);
            this.con.addChild(item);
            item.load(vo.id)
            item.stand();
            item.scaleX = item.scaleY = 1.2;
	wx3_function(4542);
            item.currentMV.scaleX = -Math.abs(item.currentMV.scaleX);
            item.bottom = -30+vo.height*1 - 5 + 10*Math.random()// + Math.random()*80
            item['w'] = vo.width
            item.x = begin + i*des
            this.monsterArr.push(item);
        }
        var sortList = this.monsterArr.concat();
	wx3_function(8338);
        ArrayUtil.sortByField(sortList,['bottom','w'],[1,1]);
        for(var i=0;i<sortList.length;i++)
        {
            this.con.addChild(sortList[i]);
        }
        if(this.dataIn.enemy.bgid)
            this.bg.source = 'map'+this.dataIn.enemy.bgid+'_jpg';
        else
            this.bg.source = PKManager_wx3.getInstance().getPKBG(this.dataIn.enemy.seed);
	wx3_function(7361);

        this.otherForceText.text = '对方总战力：' + Math.floor(count);
    }
    private renewTitle_3397(){
        this.topUI.setTitle(this.dataIn.title || '布阵')
    }
	private wx3_functionX_12561(){console.log(5492)}





    private renewDownList_4788() {
        var list = [];
	wx3_function(2003);
        var obj = {};
        for(var s in this.emptyNum)
        {
            if(this.emptyNum[s])
            {
                obj[s] = true;
	wx3_function(2070);
                list.push(MonsterVO.getObject(s))
            }
        }

        var myList = this.getMyList_2065();
        if(myList)
        {
            var temp = myList.split(',');
	wx3_function(9206);
            for(var i=0;i<temp.length;i++)
            {
                if(!obj[temp[i]])
                {
                    list.push(MonsterVO.getObject(temp[i]))
                    obj[temp[i]] = true;
	wx3_function(4984);
                }
            }
        }


        if(this.dataIn.type == 'task')
        {
            var sortObj = this.sortBaseTask[this.sortIndexTask];
	wx3_function(4996);
        }
        else if(this.dataIn.isPK)
        {
            var sortObj = this.sortBasePK[this.sortIndexPK];
        }
        else
        {
            var sortObj = this.sortBaseWork[this.sortIndexWork];
	wx3_function(9053);
        }
        this.sortText.text = sortObj.name
        this.sortText.textColor = sortObj.color
    //private sortBaseWork= [
    //        {key:'default',name:'默认排序'},
    //        {key:'work',name:'效率降序'},
    //        {key:'level',name:'等级降序'},
    //        {key:'type',name:'阵营排序'}
    //    ]
    //private sortBasePK= [
    //        {key:'default',name:'默认排序'},
    //        {key:'pk',name:'战力降序'},
    //        {key:'level',name:'等级降序'},
    //        {key:'cost',name:'费用升序'},
    //        {key:'type',name:'阵营排序'}
    //    ]
        switch(sortObj.key)
        {
            case 'default':
                ArrayUtil.sortByField(list,['level','cost','type'],[0,0,0]);
	wx3_function(933);
                break;
            case 'level':
                for(var i=0;i<list.length;i++)
                {
                    list[i].temp = MonsterManager.getInstance().getMonsterLevel(list[i].id)
                }
                ArrayUtil.sortByField(list,['temp','level','cost','type'],[1,0,0,0]);
	wx3_function(5775);
                break;
            case 'level2':
                for(var i=0;i<list.length;i++)
                {
                    list[i].temp = MonsterManager.getInstance().getMonsterLevel(list[i].id)
                }
                ArrayUtil.sortByField(list,['temp','level','cost','type'],[0,0,0,0]);
	wx3_function(8335);
                break;
            case 'pk':
                for(var i=0;i<list.length;i++)
                {
                    list[i].temp = MonsterManager.getInstance().getMyListForce(list[i].id + '',this.dataIn.isAtk)
                }
                ArrayUtil.sortByField(list,['temp','level','cost','type'],[1,0,0,0]);
	wx3_function(2693);
                break;
            case 'work':
                for(var i=0;i<list.length;i++)
                {
                    list[i].temp = WorkManager.getInstance().getListHourEarn(list[i].id)
                }
                ArrayUtil.sortByField(list,['temp','level','cost','type'],[1,0,0,0]);
	wx3_function(2617);
                break;
            case 'cost':
                ArrayUtil.sortByField(list,['cost','level','type'],[0,0,0]);
                break;
            case 'type':
                ArrayUtil.sortByField(list,['type','cost','level'],[0,0,0]);
	wx3_function(8600);
                break;
        }

        for(var i=0;i<list.length;i++)
        {
            list[i] = {id:list[i].id,list:list,index:i};
	wx3_function(8375);
        }
        if(list.length > 0)
            list.push({add:true})
        this.dataProvider.source = list;
        this.dataProvider.refresh();

        this.emptyGroup.visible = list.length == 0
    }
	private wx3_functionX_12562(){console.log(9117)}

    private renewTopList_4865(){
        var layOut:any = this.chooseList.layout;
        if(this.maxNum > 7)
        {
            layOut.requestedColumnCount = 7
            layOut.requestedRowCount = 2
            this.chooseGroup.height = 200;
	wx3_function(5502);
        }
        else
        {
            layOut.requestedColumnCount = this.maxNum;
            layOut.requestedRowCount = 1
            this.chooseGroup.height = 110;
	wx3_function(9443);
        }
        var list = [];
        if(this.dataIn.chooseList)
        {
            list = this.dataIn.chooseList.split(',');
        }
        if(this.dataIn.autoList)
        {
            var pkList = SharedObjectManager_wx3.getInstance().getMyValue('lastAtkList')
            if(pkList)
            {
                var temp = pkList.split(',');
	wx3_function(6353);
                var numObj = {}
                for(var i=0;i<temp.length;i++)
                {
                    var id = temp[i];
                    numObj[id] = (numObj[id] || 0)+1
                    if(this.getFreeMonsterNum(id) < numObj[id])
                    {
                        pkList = null;
	wx3_function(9644);
                        break;
                    }
                }

                if(pkList)//可上阵
                {
                    list = temp;
	wx3_function(8213);
                    for(var i=0;i<temp.length;i++)
                    {
                        var id = temp[i];
                        this.addFreeMonsterNum(id,-1);
                    }
                }
            }
        }
        for(var i=0;i<list.length;i++)
        {
            list[i] = {id:list[i],list:list} ;
	wx3_function(1926);
        }
        while(list.length < this.maxNum)
            list.push(null)
        this.chooseDataProvider.source = list;
        this.chooseDataProvider.refresh();
        this.onItemChange_5686();
	wx3_function(3914);
    }

    private renew_2927(){
        this.btnGroup.removeChildren();
        this.btnGroup.addChild(this.sortBtn)
        this.btnGroup.addChild(this.resetBtn)
        if(this.dataIn.isPK)
        {
            this.currentState = 'pk';
	wx3_function(5672);
            if(this.dataIn.isAtk)
                this.btnGroup.addChild(this.pkBtn)
            else
                this.btnGroup.addChild(this.okBtn)
        }
        else
        {
            this.currentState = 'normal';
	wx3_function(5188);
            this.btnGroup.addChild(this.okBtn)
        }

        this.renewTitle_3397();
        this.renewByType_493();

	wx3_function(5425);
        var freeList = MonsterManager.getInstance().getFreeMonster();
        this.emptyNum = {};
        for(var i=0;i<freeList.length;i++)
        {
            this.emptyNum[freeList[i].vo.id] = freeList[i].num;
        }
        this.renewTopList_4865();
	wx3_function(6015);
        this.renewDownList_4788();

        //this.reset();
    }



	private wx3_functionX_12563(){console.log(2167)}
    public reset(){
        var arr = this.chooseDataProvider.source;
        for(var i=0;i<arr.length;i++)
        {
            if(arr[i])
                this.addFreeMonsterNum(arr[i].id,1);
	wx3_function(6125);
        }
        arr = [];
        while(arr.length<this.maxNum)
            arr.push(null)
        this.chooseDataProvider.source = arr;
        this.chooseDataProvider.refresh();
	wx3_function(7727);
        this.onItemChange_5686();
    }

    private getMyCost_46(){
        var arr = this.chooseDataProvider.source;
        var cost = 0;
	wx3_function(8170);
        for(var i=0;i<arr.length;i++)
        {
            if(arr[i])
                cost += MonsterVO.getObject(arr[i].id).cost
        }
        return cost;
    }
	private wx3_functionX_12564(){console.log(2434)}

    private getMyList_2065(){
        var arr = this.chooseDataProvider.source;
        var list = [];
        for(var i=0;i<arr.length;i++)
        {
            if(arr[i])
                list.push(arr[i].id)
        }
        return list.join(',')
    }
	private wx3_functionX_12565(){console.log(1836)}

    private lastTalk = 0;
    public randomTalk(){
        if(!this.dataIn.enemy)
            return;
        if(Math.random() > 0.3)
            return;
        var item = this.monsterArr[Math.floor(this.monsterArr.length*Math.random())];
	wx3_function(6822);
        if(item && !item.talkItm)
        {
            if(egret.getTimer() < this.lastTalk)
                return;
            item.talk(2);
            this.lastTalk = egret.getTimer() + 3000 + Math.floor(Math.random()*5000);
	wx3_function(7700);
        }
    }
}