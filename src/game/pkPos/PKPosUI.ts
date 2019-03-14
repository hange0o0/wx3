class PKPosUI extends game.BaseUI {

    private static _instance: PKPosUI;
    public static getInstance(): PKPosUI {
        if(!this._instance)
            this._instance = new PKPosUI();
        return this._instance;
    }

    private topUI: TopUI;
    private bottomUI: BottomUI;
    private mainCon: eui.Group;
    private con: eui.Group;
    private bg: eui.Image;
    private otherForceText: eui.Label;
    private forceText: eui.Label;
    private numText: eui.Label;
    private costText: eui.Label;
    private chooseGroup: eui.Group;
    private desText: eui.Label;
    private chooseList: eui.List;
    private scroller: eui.Scroller;
    private list: eui.List;
    private btnGroup: eui.Group;
    private resetBtn: eui.Group;
    private okBtn: eui.Group;
    private pkBtn: eui.Group;








    private dragTarget = new PKPosChooseItem()


    private monsterArr = []
    private dataProvider:eui.ArrayCollection
    private chooseDataProvider:eui.ArrayCollection

    //public level = 1;
    //public question = {"list1":"1,11,44,6,72,4,16","list2":"42,73,17,10,73","seed":19348313264,"cost":30}

    public emptyNum = {}; //空闲怪的数量
    public maxCost = 0  //最大消耗
    public maxNum = 0 //最大数量
    public currentCost = 0 //当前消耗

    public dataIn;
    public constructor() {
        super();
        this.skinName = "PKPosUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.onClose,this);


        this.chooseList.itemRenderer = PKPosChooseItem
        this.chooseList.dataProvider = this.dataProvider = new eui.ArrayCollection();

        this.scroller.viewport = this.list;
        this.list.itemRenderer = PKPosListItem
        this.list.dataProvider =  this.chooseDataProvider = new eui.ArrayCollection()

        this.addBtnEvent(this.pkBtn,this.onPK);
        this.addBtnEvent(this.okBtn,this.onSave);
        this.addBtnEvent(this.resetBtn,this.reset);

        this.chooseList.addEventListener('start_drag',this.onDragStart,this);
        this.chooseList.addEventListener('end_drag',this.onDragEnd,this);
        this.chooseList.addEventListener('move_drag',this.onDragMove,this);


        this.addBtnEvent(this.con,this.onMClick)
        this.reset();

        this.stage.addChild(this.dragTarget);
        this.dragTarget.initDragItem();
        MyTool.removeMC(this.dragTarget);
    }

    private onMClick(e){
        var x = e.stageX;
        var y = e.stageY;

        for(var i=this.monsterArr.length-1;i>=0;i--)
        {
            var mc = this.monsterArr[i];
            if(mc.currentMV.hitTestPoint(x,y,true))
            {
                var list = [];
                for(var j=0;j<this.monsterArr.length;j++)
                {
                    list.push(this.monsterArr[j].id)
                }
                CardInfoUI.getInstance().show(mc.id,list,i);
                break;
            }
        }
    }

    public stopDrag(){
        MyTool.removeMC(this.dragTarget)
        for(var i=0;i<this.chooseList.numChildren;i++) {
            var mc:any = this.chooseList.getChildAt(i);
            mc.setChoose(false);
        }
    }

    private onDragStart(e){
        e.target.setChoose(true);
        this.dragTarget.data = e.target.data
        this.stage.addChild(this.dragTarget);
        this.dragTarget.x = e.data.x;
        this.dragTarget.y = e.data.y;
        this.dragTarget.showDragState(0)
    }

    private onDragMove(e){
        if(!this.dragTarget.parent)
            return;
        this.dragTarget.x = e.data.x - this.dragTarget.width/2;
        this.dragTarget.y = e.data.y - this.dragTarget.height/2;



        var x = this.dragTarget.x + this.dragTarget.width/2
        var y = this.dragTarget.y + this.dragTarget.height/2
        if(this.chooseList.hitTestPoint(x,y))
        {
            for(var i=0;i<this.chooseList.numChildren;i++)
            {
                var mc:any = this.chooseList.getChildAt(i);
                if(mc.visible && mc.hitMC.hitTestPoint(x,y))
                {
                    if(mc.data == this.dragTarget.data)
                    {
                        this.dragTarget.showDragState(0);
                        return;
                    }
                    var p = mc.globalToLocal(x,y);
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

    private onDragEnd(e){
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
                if(mc.visible && mc.hitMC.hitTestPoint(x,y))
                {
                    if(mc.data == this.dragTarget.data)
                        break
                    var currentIndex =  this.dataProvider.source.indexOf(mc.data)// this.chooseList会有不存在数组中数据的显示对象
                    var index = this.dataProvider.source.indexOf(this.dragTarget.data)
                    var p = mc.globalToLocal(x,y);
                    if(p.x < mc.width/4 || p.x > mc.width/4*3)//insert
                    {
                        var targetIndex = p.x < mc.width/4?currentIndex:currentIndex+1;
                        if(targetIndex == index)
                            break;
                        this.dataProvider.removeItemAt(index)
                        if(targetIndex > index)
                            targetIndex --;
                        this.dataProvider.addItemAt(this.dragTarget.data,targetIndex)
                    }
                    else//swap
                    {
                        this.dataProvider.source[index] = mc.data
                        this.dataProvider.source[currentIndex] = this.dragTarget.data
                    }

                    this.dataProvider.refresh();
                    break
                }
            }
        }

        for(var i=0;i<this.chooseList.numChildren;i++) {
            var mc:any = this.chooseList.getChildAt(i);
            mc.setChoose(false);
        }
    }

    public addChoose(id){
        this.dataProvider.addItem({id:id,list:this.dataProvider.source})
        this.addFreeMonsterNum(id,-1)
        this.onItemChange();
    }

    public deleteItem(data){
        var index = this.dataProvider.getItemIndex(data)
        this.addFreeMonsterNum(data.id,1)
        this.dataProvider.removeItemAt(index);
        this.onItemChange()
    }

    private onItemChange(){
        if(this.dataIn.isPK)
        {
            var cost = this.currentCost = this.getMyCost();
            this.costText.text = '费用：' + cost + '/' + this.maxCost;
            this.numText.text = '数量：' + this.getChooseNum() + '/' + this.maxNum;
            this.forceText.text = '战力：' + this.getForce();
        }
        MyTool.renewList(this.list)
        this.desText.visible = this.getChooseNum() == 0
    }

    public getForce(){
        return MonsterManager.getInstance().getMyListForce(this.getMyList(),this.dataIn.isAtk)
    }

    public getChooseNum(){
        return this.dataProvider.length;
    }

    public getFreeMonsterNum(id){
          return this.emptyNum[id] || 0
    }

    public addFreeMonsterNum(id,num){
        this.emptyNum[id] = this.getFreeMonsterNum(id) + num;
    }



    public onPK(){
        var list = this.getMyList();
        if(!list)
        {
            MyWindow.ShowTips('队列阵容不可为空')
            return;
        }
        var baseForce = MonsterManager.getInstance().getMyListForce(this.getMyList(),this.dataIn.isAtk,false)
        UM.maxForce = Math.max(UM.maxForce,baseForce);
        this.dataIn.fun && this.dataIn.fun(list)
    }
    public onSave(){
        this.dataIn.fun && this.dataIn.fun(this.getMyList())
    }

    public onClose(){
        this.hide();
    }

     /*
     title
     enemy:{list,seed,force}
     chooseList//已选中列表，已在list中扣除
     isPK
      isAtk
      maxCost
      maxNum
     fun
     noEmpty
      */
    public show(dataIn?){
        this.dataIn = dataIn;
        this.maxCost = this.dataIn.maxCost || 9999;
        this.maxNum = this.dataIn.maxNum || 0;
        super.show()
    }

    public hide() {
        super.hide();
    }



    public onShow(){

        this.renew();
        this.addPanelOpenEvent(GameEvent.client.CHAPTER_CHANGE,this.renew)
    }

    public showEnemy() {
        while(this.monsterArr.length > 0)
        {
            PKMonsterMV.freeItem(this.monsterArr.pop());
        }

        if(!this.dataIn.enemy)
        {
            MyTool.removeMC(this.con);
            return;
        }
        this.mainCon.addChildAt(this.con,0);

        var arr = this.dataIn.enemy.list.split(',')
        arr.reverse();
        var des = Math.min(500/(arr.length-1),80)
        var begin = (640-des*(arr.length-1))/2
        var count = 0;
        var force = this.dataIn.enemy.force || 0;

        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i]
            var vo = MonsterVO.getObject(id);
            var item = PKMonsterMV.createItem();
            count += vo.cost*(1+force/100);
            console.log(count)
            this.con.addChild(item);
            item.load(id)
            item.stand();
            item.scaleX = item.scaleY = 1.2;
            item.currentMV.scaleX = -Math.abs(item.currentMV.scaleX);
            item.bottom = -30+vo.height*1 - 5 + 10*Math.random()// + Math.random()*80
            item['w'] = vo.width
            item.x = begin + i*des
            this.monsterArr.push(item);
        }
        var sortList = this.monsterArr.concat();
        ArrayUtil.sortByField(sortList,['bottom','w'],[1,1]);
        for(var i=0;i<sortList.length;i++)
        {
            this.con.addChild(sortList[i]);
        }
        if(this.dataIn.enemy.bgid)
            this.bg.source = 'map'+this.dataIn.enemy.bgid+'_jpg';
        else
            this.bg.source = PKManager.getInstance().getPKBG(this.dataIn.enemy.seed);

        this.otherForceText.text = '' + Math.floor(count);
    }
    private renewTitle(){
        this.topUI.setTitle(this.dataIn.title || '布阵')
    }

    private renewDownList() {
        var list = MonsterManager.getInstance().getFreeMonster();
        var obj = {};
        this.emptyNum = {};
        for(var i=0;i<list.length;i++)
        {
            obj[list[i].vo.id] = true;
            this.emptyNum[list[i].vo.id] = list[i].num;
            list[i] = list[i].vo;
        }
        if(this.dataIn.chooseList)
        {
            var temp = this.dataIn.chooseList.split(',');
            for(var i=0;i<temp.length;i++)
            {
                if(!obj[temp[i]])
                    list.push(MonsterVO.getObject(temp[i]))
            }
        }


        ArrayUtil.sortByField(list,['cost','type'],[0,0])
        for(var i=0;i<list.length;i++)
        {
            list[i] = {id:list[i].id,list:list,index:i};
        }
        this.chooseDataProvider.source = list;
        this.chooseDataProvider.refresh();
    }

    private renewTopList(){
        var layOut:any = this.chooseList.layout;
        if(this.maxNum > 7)
        {
            layOut.requestedColumnCount = 7
            layOut.requestedRowCount = 2
            this.chooseGroup.height = 200;
        }
        else
        {
            layOut.requestedColumnCount = this.maxNum;
            layOut.requestedRowCount = 1
            this.chooseGroup.height = 110;
        }
        var list = this.dataIn.chooseList?this.dataIn.chooseList.split(','):[];
        for(var i=0;i<list.length;i++)
        {
            list[i] = {id:list[i],list:list} ;
        }
        this.dataProvider.source = list;
        this.dataProvider.refresh();
        this.onItemChange();
    }

    private renew(){
        if(this.dataIn.isPK)
            this.currentState = 'pk';
        else
            this.currentState = 'normal';

        this.renewTitle();
        this.showEnemy();
        this.renewDownList();
        this.renewTopList();
        this.reset();
    }

    public reset(){
        this.dataProvider.source = [];
        this.dataProvider.refresh();
        this.onItemChange();
    }

    private getMyCost(){
        var arr = this.dataProvider.source;
        var cost = 0;
        for(var i=0;i<arr.length;i++)
        {
            cost += MonsterVO.getObject(arr[i].id).cost
        }
        return cost;
    }

    private getMyList(){
        var arr = this.dataProvider.source;
        var list = [];
        for(var i=0;i<arr.length;i++)
        {
            list.push(arr[i].id)
        }
        return list.join(',')
    }
}