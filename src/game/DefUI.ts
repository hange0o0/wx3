class DefUI extends game.BaseItem_wx3{

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
    private spaceBtn: eui.Group;
    private spaceRed: eui.Image;
    private buffBtn: eui.Group;
    private rankBtn: eui.Group;
    private guessBtn: eui.Group;
    private guessRed: eui.Image;
    private askBtn: eui.Group;
    private mailBtn: eui.Image;
    private defList: eui.List;
    private addDefBtn: eui.Button;




    private wx3_functionX_11911(){console.log(1519)}



    public isPos = false


	private wx3_functionX_11912(){console.log(9429)}




    private walkStep = 40/10*20/1000//每毫秒移动距离
    private monsterStep = 110//每个怪的间距
	private wx3_functionX_11913(){console.log(769)}
    private roundLength = 800*2//单次行动的长度
    private roundTime = 0//移动一轮需要的时间ms
    private monsterStepTime = 0//间距移动时间ms


    private dataProvider:eui.ArrayCollection
	private wx3_functionX_11914(){console.log(2275)}



    public constructor() {
        super();
        this.roundTime = Math.floor(this.roundLength/this.walkStep)
        this.monsterStepTime = Math.floor(this.monsterStep/this.walkStep)
        this.skinName = "DefUISkin";
	wx3_function(1427);
    }

    //public monsterArr = [];

    public childrenCreated() {
        super.childrenCreated();
        //this.desText.text = '防守阵容'
        this.addBtnEvent(this,this.onClick_8285)
        this.defList.itemRenderer = DefItem;
	wx3_function(8638);
        this.defList.dataProvider = this.dataProvider = new eui.ArrayCollection();
        this.addBtnEvent(this.taskBtn,this.onTask_9885)
        this.addBtnEvent(this.taskBtn2,this.onTask2_7155)
        this.addBtnEvent(this.buffBtn,this.onBuff_1268)
        this.addBtnEvent(this.coinBtn,this.onCoin_4808)
        this.addBtnEvent(this.rankBtn,this.onRank_3089)

        this.addBtnEvent(this.spaceBtn,(e)=>{
            e.stopImmediatePropagation();
            SpaceUI.getInstance().show();
        })

        this.addBtnEvent(this.mailBtn,(e)=>{
            e.stopImmediatePropagation();
            this.mailBtn.visible = false;
            egret.Tween.removeTweens(this.mailBtn)
            TaskManager.getInstance().lastShowMailTime = TM_wx3.now();
            JumpWX4UI.getInstance().show();
        })

        this.addBtnEvent(this.guessBtn,(e)=>{
            e.stopImmediatePropagation();
            GuessUI.getInstance().show();
        })

        this.addBtnEvent(this.askBtn,(e)=>{
            e.stopImmediatePropagation();
            AskManager.getInstance().init();
            AskManager.getInstance().showPK();
        })

    }
	private wx3_functionX_11915(){console.log(4716)}

    private onCoin_4808(e){
        e.stopImmediatePropagation();
        GetCoinUI.getInstance().show();
    }
    private onRank_3089(e){
        e.stopImmediatePropagation();
	wx3_function(6417);
        RankUI.getInstance().show();
    }
    private onBuff_1268(e){
        e.stopImmediatePropagation();
        BuffUI.getInstance().show();
    }
	private wx3_functionX_11916(){console.log(2922)}

    private onTask_9885(e){
        e.stopImmediatePropagation();
        TaskUI.getInstance().show();
    }
    private onTask2_7155(e){
        e.stopImmediatePropagation();
	wx3_function(9874);
        TaskUI2.getInstance().show();
    }

    private onClick_8285(){
        MonsterManager.getInstance().editDef();
    }
	private wx3_functionX_11917(){console.log(2479)}


    public renewTask(){
        var TSM = TaskManager.getInstance();
        this.taskRed.visible = TSM.isTaskFinish();
        this.taskRed2.visible = TSM.dayTaskRed();
	wx3_function(3754);
        this.coinRed.visible = !TSM.openCoinUI;

        var monsterNum = MonsterManager.getInstance().getTotalMonsterNum();
        //if(monsterNum < 20)
        //    MyTool.removeMC(this.taskBtn2)
        //else
        //    this.btnGroup.addChildAt(this.taskBtn2,1)
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
	private wx3_functionX_11918(){console.log(3890)}

    public dataChanged():void {
        if(PKManager_wx3.getInstance().isPKing)
            return;
        var pkvideo = PKVideoCon_wx3.getInstance()
        this.con.addChild(pkvideo)
        pkvideo.y = 0;
        pkvideo.x = -(PKConfig_wx3.floorWidth + PKConfig_wx3.appearPos*2 - 640)/2;

        if(!PKData_wx3.getInstance().isDef)
            this.restartGame();
        //while(this.monsterArr.length > 0)
        //{
        //    DefMonsterItem.freeItem(this.monsterArr.pop());
        //}
        var teamCost = TecManager.getInstance().getTeamCost();
	wx3_function(1721);
        var teamNum = TecManager.getInstance().getTeamNum();

        var arr = MonsterManager.getInstance().getDefArr();
        //var cost = 0;

     //   var h = 120;
	//wx3_function(385);
     //   var des = Math.min(h/(arr.length-1),20)
     //   var begin = (h-des*(arr.length-1))/2
     //   var renewFun = ()=>{this.renewY()};
     //   for(var i=0;i<arr.length;i++)
     //   {
     //       var id = arr[i];
     //       var vo = MonsterVO.getObject(id);
     //       cost += vo.cost;
     //       var item = DefMonsterItem.createItem();
     //       this.con.addChild(item);
     //       item.load(id)
     //       item.run();
     //       item.scaleX = item.scaleY = 1.2;
     //       item.atkRota = 0//Math.random()>0.5?1:-1;
     //       //item.renewScale();
     //       //item.bottom = vo.height//*1 - 20 + 50*Math.random()// + Math.random()*80
     //       item['w'] = vo.width
     //       item['renewY'] = renewFun;
     //       //item.x = 20 + Math.random()*600
     //       //item.x = begin + i*des
     //       this.monsterArr.push(item);
     //   }
     //   this.renewMonsterPos_5086();
	wx3_function(9304);

        //var sortList = this.monsterArr.concat();
        //ArrayUtil.sortByField(sortList,['bottom','w'],[1,1]);
        //var len = sortList.length;
        //for(var i=0;i<len;i++)
        //{
        //    sortList[i].bottom = 10 +begin + (len-i)*des
        //    this.con.addChild(sortList[i]);
        //}

        this.bg.source = PKManager_wx3.getInstance().getDefBG()
        this.bgFront.source = PKManager_wx3.getInstance().getDefBGFront()


        //this.numText.text = '数量：' + arr.length + '/'+ teamNum;
        //this.costText.text =  '费用：' +cost + '/' + teamCost;
        this.forceText.text = '防守战力：' + MonsterManager.getInstance().getMyListForce(MonsterManager.getInstance().defList,false)

	wx3_function(3637);

        //this.redMC.visible = arr.length < teamNum && MonsterManager.getInstance().getFreeMonster(true).length>0;

        this.dataProvider.source = FightManager.getInstance().getDefList();
        this.dataProvider.refresh();

        this.addDefBtn.visible = !this.isPos && arr.length == 0
        this.btnGroup.visible = !this.isPos
        egret.Tween.removeTweens(this.mailBtn)
        this.mailBtn.visible = (TM_wx3.now() - UM_wx3.regTime > 10*60) && (TM_wx3.now() - TaskManager.getInstance().lastShowMailTime > 30*60);
        if(this.mailBtn.visible)
        {
            this.mailBtn.rotation = 0;
            egret.Tween.get(this.mailBtn,{loop:true}).wait(1000).to({rotation:-10},100).to({rotation:10},100).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},100)
        }
        this.renewTask();
	wx3_function(8021);
    }

    public restartGame(){
        var defList = MonsterManager.getInstance().defList
        var arr = MonsterManager.getInstance().getDefArr();
        var cost = 0;
       for(var i=0;i<arr.length;i++) {
           var id = arr[i];
           var vo = MonsterVO.getObject(id);
           cost += vo.cost;
       }
        var totalCost = Math.max(5,Math.ceil(cost*0.8));
        cost = 0;
        var enemyList = [];
        var monsterList = MonsterManager.getInstance().getOpenMonster()
        while(cost < totalCost)
        {
            var vo2 = ArrayUtil.randomOne(monsterList)
            enemyList.push(vo2.id);
            cost += vo2.cost;
        }


        var data = {
            isDef:true,
            seed:Math.random()*1000000000,
            players:[
                {id:1,gameid:'team1',team:1,force:Math.floor(UM_wx3.maxForce*0.5),hp:100000,autolist:enemyList.join(','),mforce:{}},
                {id:2,gameid:'team2',team:2,force:TecManager.getInstance().getDefForce() + BuffManager.getInstance().getForceAdd(),hp:100000,autolist:defList,mforce:MonsterManager.getInstance().getMonsterPKForce(defList)}
            ]
        };

        PKBulletManager_wx3.getInstance().freeAll();
        var PD = PKData_wx3.getInstance();
        PD.init(data);
        PKVideoCon_wx3.getInstance().init(data);
        PD.start();
        this.onStep();

    }

    private onStep(){
        PKCode_wx3.getInstance().onStep();
        PKVideoCon_wx3.getInstance().action();
        var PD = PKData_wx3.getInstance();
        PD.play();
        if(PD.monsterList.length == 0 && PD.getPlayer(1).autoList.length == 0 && PD.getPlayer(2).autoList.length == 0)
        {
            this.restartGame();
        }
    }

    //public renewY(){
    //    egret.callLater(this._renewY_958,this)
    //}
    //
    //private wx3_functionX_11919(){console.log(5446)}
    //private _renewY_958(){
    //    var sortList = this.monsterArr.concat();
    //    ArrayUtil.sortByField(sortList,['bottom','w'],[1,1]);
    //    var len = sortList.length;
    //    for(var i=0;i<len;i++)
    //    {
    //        this.con.addChild(sortList[i]);
    //wx3_function(9649);
    //    }
    //}

    public onE(){
        if(!this.visible)
        {
            if(PKVideoCon_wx3.getInstance().parent == this.con)
                PKData_wx3.getInstance().stop();
            return;
        }
        MyTool.runListFun(this.defList,'onE');
        this.onStep();
        this.randomTalk();
        this.spaceRed.visible = UM_wx3.chapterLevel>=10 && !DateUtil.isSameDay(SpaceManager.getInstance().addTime)
	wx3_function(1065);
        //this.renewMonsterPos_5086();
        //for(var i=0;i<this.monsterArr.length;i++)
        //    this.monsterArr[i].onE();
    }

    public onMainHide(){
        if(PKVideoCon_wx3.getInstance().parent == this.con)
            PKData_wx3.getInstance().stop();
    }

    public onTimer(){
        if(!this.visible)
            return;

	wx3_function(1087);


    }

    //private walkStep = Math.round(50)/10*20/1000//每毫秒移动距离
    //private monsterStep = 100//每个怪的间距
    //private roundLength = 760*2//单次行动的长度
    //private roundTime = 0//移动一轮需要的时间ms
    //private monsterStepTime = 0//间距移动时间ms
    //private renewMonsterPos_5086(){
    //    //var round = TM.nowMS()/(this.roundTime*2)
    //    var roundCD = TM_wx3.nowMS()%(this.roundTime)
    //    var halfPos = this.roundLength/2;
    //wx3_function(2954);
    //    var offset = (halfPos-640)/2
    //
    //    //roundCD -= this.monsterStepTime;
    //    //if(roundCD < 0)
    //    //    roundCD += this.roundTime;
    //    var pos = roundCD*this.walkStep //第一个的位置
    //    for(var i=0;i<this.monsterArr.length;i++)
    //    {
    //        var mc = this.monsterArr[i];
    //wx3_function(1823);
    //
    //        pos -= mc.showWidth()/2 + 10;
    //        if(pos < 0)
    //            pos += this.roundLength;
    //
    //        if(pos<halfPos)
    //        {
    //            mc.x = pos - offset
    //            mc.renewRota(-1)
    //        }
    //        else
    //        {
    //            mc.x = this.roundLength -  pos - offset
    //            mc.renewRota(1)
    //        }
    //
    //wx3_function(5138);
    //        pos -= mc.showWidth()/2 + 10;
    //        if(pos < 0)
    //            pos += this.roundLength;
    //        //if(i==0)
    //        //console.log(mc.x,mc.bottom)
    //    }
    //}

	private wx3_functionX_11920(){console.log(3822)}
    public defGuide(){
        TaskManager.getInstance().showGuideMC(this.addDefBtn)
    }


    //private lastTalk = 0
	//private wx3_functionX_11921(){console.log(7549)}
    public randomTalk(){

        if(PKManager_wx3.getInstance().isPKing)
            return;
        if(GuideManager.getInstance().isGuiding)
            return;
        if(!PKData_wx3.getInstance().isDef)
            return;
        if(this.addDefBtn.visible)
            return;
        //if(egret.getTimer() < this.lastTalk)
        //    return;
        //this.lastTalk = egret.getTimer() + 3000 + Math.floor(Math.random()*5000) - this.monsterArr.length*500;
        PKVideoCon_wx3.getInstance().randomTalk()
        //if(Math.random() > 0.2)
        //    return;
	//wx3_function(4966);
     //   var item = this.monsterArr[Math.floor(this.monsterArr.length*Math.random())];
     //   if(item && !item.talkItm && item.x > 100 && item.x < 540)
     //   {
    //
     //       if(item.atkRota == -1 && this.isPos)
     //           return;
     //       if(item.atkRota == 1 && item.x < 320)
     //           return;
     //       if(item.atkRota == -1 && item.x > 320)
     //           return;
     //       item.talk();
	//wx3_function(1274);
     //       this.lastTalk = egret.getTimer() + 3000 + Math.floor(Math.random()*5000) - this.monsterArr.length*500;
     //   }
    }



}