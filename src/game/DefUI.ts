class DefUI extends game.BaseItem{

    private con: eui.Group;
    private bg: eui.Image;
    private bgFront: eui.Image;
    private forceText: eui.Label;
    private numText: eui.Label;
    private costText: eui.Label;
    private btnGroup: eui.Group;
    private taskBtn: eui.Group;
    private taskRed: eui.Image;
    private taskBtn2: eui.Group;
    private taskRed2: eui.Image;
    private coinBtn: eui.Group;
    private coinRed: eui.Image;
    private buffBtn: eui.Group;
    private rankBtn: eui.Group;
    private defList: eui.List;
    private redMC: eui.Image;
    private addDefBtn: eui.Button;






    public isPos = false






    private walkStep = 40/10*20/1000//每毫秒移动距离
    private monsterStep = 110//每个怪的间距
    private roundLength = 800*2//单次行动的长度
    private roundTime = 0//移动一轮需要的时间ms
    private monsterStepTime = 0//间距移动时间ms


    private dataProvider:eui.ArrayCollection

    public constructor() {
        super();
        this.roundTime = Math.floor(this.roundLength/this.walkStep)
        this.monsterStepTime = Math.floor(this.monsterStep/this.walkStep)
        this.skinName = "DefUISkin";
    }

    public monsterArr = [];

    public childrenCreated() {
        super.childrenCreated();
        //this.desText.text = '防守阵容'
        this.addBtnEvent(this,this.onClick)
        this.defList.itemRenderer = DefItem;
        this.defList.dataProvider = this.dataProvider = new eui.ArrayCollection();
        this.addBtnEvent(this.taskBtn,this.onTask)
        this.addBtnEvent(this.taskBtn2,this.onTask2)
        this.addBtnEvent(this.buffBtn,this.onBuff)
        this.addBtnEvent(this.coinBtn,this.onCoin)
        this.addBtnEvent(this.rankBtn,this.onRank)

    }

    private onCoin(e){
        e.stopImmediatePropagation();
        GetCoinUI.getInstance().show();
    }
    private onRank(e){
        e.stopImmediatePropagation();
        RankUI.getInstance().show();
    }
    private onBuff(e){
        e.stopImmediatePropagation();
        BuffUI.getInstance().show();
    }

    private onTask(e){
        e.stopImmediatePropagation();
        TaskUI.getInstance().show();
    }
    private onTask2(e){
        e.stopImmediatePropagation();
        TaskUI2.getInstance().show();
    }

    private onClick(){
        MonsterManager.getInstance().editDef();
    }


    public renewTask(){
        var TSM = TaskManager.getInstance();
        this.taskRed.visible = TSM.isTaskFinish();
        this.taskRed2.visible = TSM.dayTaskRed();
        this.coinRed.visible = !TSM.openCoinUI;
        //this.taskRed.visible = true//vo && vo.value <= TSM.getTaskValue(vo)
        //if(vo)
        //{
        //    var value = Math.min(TSM.getTaskValue(vo),vo.value);
        //    this.setHtml(this.taskText,vo.getDes() + '  ' + this.createHtml(value + '/' + vo.value,0xFFECA5))
        //    if(value<vo.value)
        //    {
        //        this.taskText2.text = '去完成>>'
        //        this.taskText2.textColor = 0xFCB33C
        //    }
        //    else
        //    {
        //        this.taskText2.text = '【领取奖励】'
        //        this.taskText2.textColor = 0x70F45F
        //    }
        //}
        //else
        //{
        //    this.taskGroup.visible = false;
        //}
    }

    public dataChanged():void {
        while(this.monsterArr.length > 0)
        {
            DefMonsterItem.freeItem(this.monsterArr.pop());
        }
        var teamCost = TecManager.getInstance().getTeamCost();
        var teamNum = TecManager.getInstance().getTeamNum();

        var arr = MonsterManager.getInstance().getDefArr();
        var cost = 0;

        var h = 120;
        var des = Math.min(h/(arr.length-1),20)
        var begin = (h-des*(arr.length-1))/2
        var renewFun = ()=>{this.renewY()};
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i];
            var vo = MonsterVO.getObject(id);
            cost += vo.cost;
            var item = DefMonsterItem.createItem();
            this.con.addChild(item);
            item.load(id)
            item.run();
            item.scaleX = item.scaleY = 1.2;
            item.atkRota = 0//Math.random()>0.5?1:-1;
            //item.renewScale();
            //item.bottom = vo.height//*1 - 20 + 50*Math.random()// + Math.random()*80
            item['w'] = vo.width
            item['renewY'] = renewFun;
            //item.x = 20 + Math.random()*600
            //item.x = begin + i*des
            this.monsterArr.push(item);
        }
        this.renewMonsterPos();

        //var sortList = this.monsterArr.concat();
        //ArrayUtil.sortByField(sortList,['bottom','w'],[1,1]);
        //var len = sortList.length;
        //for(var i=0;i<len;i++)
        //{
        //    sortList[i].bottom = 10 +begin + (len-i)*des
        //    this.con.addChild(sortList[i]);
        //}

        this.bg.source = PKManager.getInstance().getDefBG()
        this.bgFront.source = PKManager.getInstance().getDefBGFront()


        //this.numText.text = '数量：' + arr.length + '/'+ teamNum;
        //this.costText.text =  '费用：' +cost + '/' + teamCost;
        this.forceText.text = '防守战力：' + MonsterManager.getInstance().getMyListForce(MonsterManager.getInstance().defList,false)


        this.redMC.visible = arr.length < teamNum && MonsterManager.getInstance().getFreeMonster(true).length>0;

        this.dataProvider.source = FightManager.getInstance().getDefList();
        this.dataProvider.refresh();

        this.addDefBtn.visible = this.monsterArr.length == 0
        this.renewTask();
    }

    public renewY(){
        egret.callLater(this._renewY,this)
    }

    private _renewY(){
        var sortList = this.monsterArr.concat();
        ArrayUtil.sortByField(sortList,['bottom','w'],[1,1]);
        var len = sortList.length;
        for(var i=0;i<len;i++)
        {
            this.con.addChild(sortList[i]);
        }
    }

    public onE(){
        if(!this.visible)
            return;
        MyTool.runListFun(this.defList,'onE');
        this.renewMonsterPos();
        //for(var i=0;i<this.monsterArr.length;i++)
        //    this.monsterArr[i].onE();
    }

    public onTimer(){
        if(!this.visible)
            return;
        this.randomTalk();


    }

    //private walkStep = Math.round(50)/10*20/1000//每毫秒移动距离
    //private monsterStep = 100//每个怪的间距
    //private roundLength = 760*2//单次行动的长度
    //private roundTime = 0//移动一轮需要的时间ms
    //private monsterStepTime = 0//间距移动时间ms
    private renewMonsterPos(){
        //var round = TM.nowMS()/(this.roundTime*2)
        var roundCD = TM.nowMS()%(this.roundTime)
        var halfPos = this.roundLength/2;
        var offset = (halfPos-640)/2

        //roundCD -= this.monsterStepTime;
        //if(roundCD < 0)
        //    roundCD += this.roundTime;
        var pos = roundCD*this.walkStep //第一个的位置
        for(var i=0;i<this.monsterArr.length;i++)
        {
            var mc = this.monsterArr[i];

            pos -= mc.showWidth()/2 + 10;
            if(pos < 0)
                pos += this.roundLength;

            if(pos<halfPos)
            {
                mc.x = pos - offset
                mc.renewRota(-1)
            }
            else
            {
                mc.x = this.roundLength -  pos - offset
                mc.renewRota(1)
            }

            pos -= mc.showWidth()/2 + 10;
            if(pos < 0)
                pos += this.roundLength;
            //if(i==0)
            //console.log(mc.x,mc.bottom)
        }
    }

    public defGuide(){
        TaskManager.getInstance().showGuideMC(this.addDefBtn)
    }


    private lastTalk = 0
    public randomTalk(){

        if(PKManager.getInstance().isPKing)
            return;
        if(GuideManager.getInstance().isGuiding)
            return;
        if(egret.getTimer() < this.lastTalk)
            return;
        //if(Math.random() > 0.2)
        //    return;
        var item = this.monsterArr[Math.floor(this.monsterArr.length*Math.random())];
        if(item && !item.talkItm && item.x > 100 && item.x < 540)
        {

            if(item.atkRota == -1 && this.isPos)
                return;
            if(item.atkRota == 1 && item.x < 320)
                return;
            if(item.atkRota == -1 && item.x > 320)
                return;
            item.talk();
            this.lastTalk = egret.getTimer() + 3000 + Math.floor(Math.random()*5000) - this.monsterArr.length*500;
        }
    }



}