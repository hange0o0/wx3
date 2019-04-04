class DefUI extends game.BaseItem{

    private con: eui.Group;
    private bg: eui.Image;
    private bgFront: eui.Image;
    private forceText: eui.Label;
    private redMC: eui.Image;
    private numText: eui.Label;
    private costText: eui.Label;
    private defList: eui.List;










    private dataProvider:eui.ArrayCollection

    public constructor() {
        super();
        this.skinName = "DefUISkin";
    }

    public monsterArr = [];

    public childrenCreated() {
        super.childrenCreated();
        //this.desText.text = '防守阵容'
        this.addBtnEvent(this,this.onClick)
        this.defList.itemRenderer = DefItem;
        this.defList.dataProvider = this.dataProvider = new eui.ArrayCollection();
        //this.addBtnEvent(this.taskGroup,this.onTask)

    }

    //private onTask(e){
    //    e.stopImmediatePropagation();
    //    TaskManager.getInstance().onTaskGo();
    //}

    private onClick(){
        MonsterManager.getInstance().editDef();
    }


    //public renewTask(){
    //    var TSM = TaskManager.getInstance();
    //    var vo = TSM.getCurrentTask();
    //    if(vo)
    //    {
    //        var value = Math.min(TSM.getTaskValue(vo),vo.value);
    //        this.setHtml(this.taskText,vo.getDes() + '  ' + this.createHtml(value + '/' + vo.value,0xFFECA5))
    //        if(value<vo.value)
    //        {
    //            this.taskText2.text = '去完成>>'
    //            this.taskText2.textColor = 0xFCB33C
    //        }
    //        else
    //        {
    //            this.taskText2.text = '【领取奖励】'
    //            this.taskText2.textColor = 0x70F45F
    //        }
    //    }
    //    else
    //    {
    //        this.taskGroup.visible = false;
    //    }
    //}

    public dataChanged():void {
        while(this.monsterArr.length > 0)
        {
            PKMonsterMV.freeItem(this.monsterArr.pop());
        }
        var teamCost = TecManager.getInstance().getTeamCost();
        var teamNum = TecManager.getInstance().getTeamNum();

        var arr = MonsterManager.getInstance().getDefArr();
        var cost = 0;

        var des = Math.min(500/(arr.length-1),80)
        var begin = (640-des*(arr.length-1))/2
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i];
            var vo = MonsterVO.getObject(id);
            cost += vo.cost;
            var item = PKMonsterMV.createItem();
            this.con.addChild(item);
            item.load(id)
            item.stand();
            item.scaleX = item.scaleY = 1.2;
            item.bottom = 30+vo.height*0.6 - 5 + 10*Math.random()// + Math.random()*80
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

        this.bg.source = PKManager.getInstance().getDefBG()
        this.bgFront.source = PKManager.getInstance().getDefBGFront()


        //this.numText.text = '数量：' + arr.length + '/'+ teamNum;
        //this.costText.text =  '费用：' +cost + '/' + teamCost;
        this.forceText.text = '防守战力：' + MonsterManager.getInstance().getMyListForce(MonsterManager.getInstance().defList,false)


        this.redMC.visible = arr.length < teamNum && MonsterManager.getInstance().getFreeMonster(true).length>0;

        this.dataProvider.source = FightManager.getInstance().getDefList();
        this.dataProvider.refresh();

        //this.renewTask();
    }

    public onE(){
        if(!this.visible || !GameUI.getInstance().visible)
            return;
        this.randomTalk();
        MyTool.runListFun(this.defList,'onE');
    }

    public defGuide(){
        TaskManager.getInstance().showGuideMC(this)
    }


    private lastTalk = 0
    public randomTalk(){

        if(PKManager.getInstance().isPKing)
            return;
        if(GuideManager.getInstance().isGuiding)
            return;
        if(egret.getTimer() < this.lastTalk)
            return;
        if(Math.random() > 0.2)
            return;
        var item = this.monsterArr[Math.floor(this.monsterArr.length*Math.random())];
        if(item && !item.talkItm)
        {
            item.talk();
            this.lastTalk = egret.getTimer() + 5000 + Math.floor(Math.random()*5000) - this.monsterArr.length*500;
        }
    }



}