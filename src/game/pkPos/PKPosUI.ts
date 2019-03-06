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
    private forceText: eui.Label;
    private chooseGroup: eui.Group;
    private desText: eui.Label;
    private chooseList: eui.List;
    private scroller: eui.Scroller;
    private list: eui.List;
    private btnGroup: eui.Group;
    private resetBtn: eui.Group;
    private okBtn: eui.Group;
    private pkBtn: eui.Group;
    private costText: eui.Label;






    private dragTarget = new PKPosChooseItem()


    private monsterArr = []
    private dataProvider:eui.ArrayCollection
    private chooseDataProvider:eui.ArrayCollection
    public leaveCost = 0

    public level = 1;
    public question = {"list1":"1,11,44,6,72,4,16","list2":"42,73,17,10,73","seed":19348313264,"cost":30}

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
                if(mc.visible && mc.hitTestPoint(x,y))
                {
                    if(mc.data == this.dragTarget.data)
                    {
                        this.dragTarget.showDragState(0);
                        break;
                    }
                    var p = mc.globalToLocal(x,y);
                    if(p.x < mc.width/4 || p.x > mc.width/4*3)
                        this.dragTarget.showDragState(2);
                    else
                        this.dragTarget.showDragState(1)
                    break
                }
            }
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
        for(var i=0;i<this.chooseList.numChildren;i++)
        {
            var mc:any = this.chooseList.getChildAt(i);
            if(mc.visible && mc.hitTestPoint(x,y))
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
        for(var i=0;i<this.chooseList.numChildren;i++) {
            var mc:any = this.chooseList.getChildAt(i);
            mc.setChoose(false);
        }
    }

    public addChoose(id){
        this.dataProvider.addItem({id:id,list:this.dataProvider.source})
        this.onItemChange();
    }

    public deleteItem(data){
        var index = this.dataProvider.getItemIndex(data)
        this.dataProvider.removeItemAt(index);
        this.onItemChange()
    }

    private onItemChange(){
        if(this.dataIn.cost)
        {
            var cost = this.getMyCost();
            this.leaveCost = (this.dataIn.cost - cost)
            this.costText.text = '剩余费用：' + this.leaveCost
        }
        MyTool.renewList(this.list)
        this.desText.visible = this.getChooseNum() == 0
    }

    public getChooseNum(){
        return this.dataProvider.length;
    }



    public onPK(){

    }





    public onClose(){
        this.hide();
    }


    public show(dataIn?){
        this.dataIn = dataIn;
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
        var arr = this.question.list1.split(',')
        arr.reverse();
        var des = Math.min(500/(arr.length-1),80)
        var begin = (640-des*(arr.length-1))/2
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i]
            var vo = MonsterVO.getObject(id);
            var item = PKMonsterMV.createItem();
            this.con.addChild(item);
            item.load(id)
            item.stand();
            item.scaleX = item.scaleY = 1.2;
            item.currentMV.scaleX = -Math.abs(item.currentMV.scaleX);
            item.bottom = 0+vo.height*1.2 - 5 + 10*Math.random()// + Math.random()*80
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
        this.bg.source = PKManager.getInstance().getPKBG(this.question)
    }
    private renewTitle(){
        if(MainPKUI.instance.visible && MainPKUI.instance.dataIn.isPK)
            this.topUI.setTitle('关卡解迷 - 第'+MainPKUI.instance.dataIn.level+'关')
        else
            this.topUI.setTitle('关卡解迷 - 第'+this.level+'关')
    }

    private setChooseList() {
        var arr = [];
        var arr2 = [];
        var answer = this.question.list2.split(',')
        var data = MonsterVO.data;
        for (var s in data) {
            if (answer.indexOf(s) == -1) {
                arr2.push(data[s])
            }
            else {
                arr.push(data[s])
            }
        }
        ArrayUtil.sortByField(arr2,['id'],[0])
        var PKM = PKManager.getInstance();
        PKM.randomSeed = (this.question.seed * 1.66);
        while (arr.length < 18)
        {
            var index = Math.floor(PKM.random()*arr2.length)
            arr.push(arr2[index])
            arr2.splice(index,1);
        }
        ArrayUtil.sortByField(arr,['cost','type'],[0,0])
        for(var i=0;i<arr.length;i++)
        {
            arr[i] = {id:arr[i].id,list:arr,index:i};
        }
        this.chooseDataProvider.source = arr;
        this.chooseDataProvider.refresh();
    }

    private renew(){
        this.level = UM.chapterLevel;
        this.question = PKManager.getInstance().getChapterData();
        this.renewTitle();
        this.showEnemy();
        this.setChooseList();

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