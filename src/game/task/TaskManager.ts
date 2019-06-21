class TaskManager {
    private static _instance:TaskManager;
    public static getInstance():TaskManager {
        if (!this._instance)
            this._instance = new TaskManager();
        return this._instance;
    }
	private wx3_functionX_12611(){console.log(8066)}

    public dayTaskBase = {
        1:{name:'捕鱼',des:'1'},
        2:{name:'烹调食材',des:'1'},
        3:{name:'收集珍珠',des:'1'},
        4:{name:'采集蘑菇',des:'1'},
        5:{name:'收集鸟蛋',des:'1'},
        6:{name:'摘果子',des:'1'},
        7:{name:'种植草药',des:'1'},
        8:{name:'清理池塘',des:'1'},
    }
	private wx3_functionX_12612(){console.log(2728)}

    public newRed= false;
    public taskFinish= false;
    public openCoinUI = false;
    public lastShowMailTime = 0;

    public autoTask:TaskVO; //自动增长的任务
	private wx3_functionX_12613(){console.log(2042)}
    public constructor() {

    }

    //在MC上显示一次光效
    private guideLight;
    private guideTimer;
	private wx3_functionX_12614(){console.log(6198)}
    public showGuideMC(mc) {
        if(TaskUI.getInstance().stage)
            return;
        if (!this.guideLight) {
            var data:any = RES.getRes('guide_mv' + "_json"); //qid
            var texture:egret.Texture = RES.getRes('guide_mv' + "_png");
	wx3_function(2219);
            if (data == null || texture == null) {
                return
            }
            var mcFactory = new egret.MovieClipDataFactory(data, texture);

            this.guideLight = new egret.MovieClip();
	wx3_function(5062);
            this.guideLight.movieClipData = mcFactory.generateMovieClipData('click_guide');
            this.guideLight.addEventListener(egret.MovieClipEvent.COMPLETE, ()=>{
                this.guideLight.stop();
                MyTool.removeMC(this.guideLight);
            }, this)
            this.guideLight.frameRate = 12//技能动画变慢
            this.guideLight.touchEnabled = false;
	wx3_function(185);
        }

        egret.clearTimeout(this.guideTimer);
        this.guideTimer = egret.setTimeout(function(){
            var rect = mc.getBounds();
            rect.x += mc.anchorOffsetX
            rect.y += mc.anchorOffsetY
            var p1 = mc.localToGlobal(rect.x, rect.y);
	wx3_function(7450);
            var p2 = mc.localToGlobal(rect.x + rect.width, rect.y + rect.height);
            console.log(p1,p2)

            this.guideLight.x = p1.x + (p2.x - p1.x) / 2
            this.guideLight.y = p1.y + (p2.y - p1.y) / 2
            GameManager_wx3.container.addChild(this.guideLight);
	wx3_function(8249);
            this.guideLight.gotoAndPlay(1, 1);
        },this,200);

    }

    public hideGuideLight(){
        egret.clearTimeout(this.guideTimer);
	wx3_function(5766);
        if(this.guideLight)
        {
            this.guideLight.stop();
            MyTool.removeMC(this.guideLight);
        }

    }
	private wx3_functionX_12615(){console.log(1478)}

    public init(){
        this.lastTaskFinish = this.isTaskFinish()

        //自动生成任务
        var arr = ['def','cstar','fight'];
        var clv = 0;
	wx3_function(2220);
        var id = TaskVO.orderList[TaskVO.orderList.length-1].id;
        for(var i=TaskVO.orderList.length-1;i>=0;i--)
        {
             if(TaskVO.orderList[i].type == 'clv')
             {
                 clv = TaskVO.orderList[i].value;
	wx3_function(2375);
                 break;
             }
        }
        var lastClv = clv;
        for(var i=0;i<705;i++)//clv只支持去到708
        {
            var type = arr[i%3];
	wx3_function(2575);
            id++;
            clv += 3;
            if(lastClv && clv > 2150)
            {
                sendClientError('lastClv:' + lastClv + '   index:' + i + '   clv:' + clv)
                lastClv = 0;
            }

            this.createTask_7626(id,'clv',clv);
            id++;
            switch(type)
            {
                case 'def':
                    this.createTask_7626(id,type,Math.floor(DM.getChapterForce(clv)*0.8));
                    break;
                case 'cstar':
                    this.createTask_7626(id,type,Math.floor(clv*3*0.8));
                    break;
                case 'fight':
                    this.createTask_7626(id,type,id - 50);
                    break;
            }
        }
    }

    private createTask_7626(id,type,value){
        var coin = Math.floor(Math.pow(id,1.3)*1000);
	wx3_function(3520);
        var vo = new TaskVO({
            id:id,
            index:id,
            type:type,
            key:'',
            value:value,
            coin:coin,
            diamond:3
        })
        TaskVO.orderList.push(vo)
        TaskVO.data[id] = vo;
	wx3_function(8341);
    }

    private lastTaskFinish = false;
    public testMainTask(type,id?){
        if(GuideManager.getInstance().isGuiding)
            return;
        if(!this.lastTaskFinish && this.isTaskFinish())
        {
            this.lastTaskFinish = true;
	wx3_function(4408);
            TaskUI.getInstance().show();
            //MyWindow.ShowTips(''+this.getCurrentTask().getDes()+' - 任务完成')
            EM_wx3.dispatch(GameEvent.client.TASK_CHANGE)
        }
        else if(!this.lastTaskFinish)
        {
            var vo = this.getCurrentTask();
	wx3_function(8397);
            var value = this.getTaskValue(vo);
            switch(type)
            {
                case 'fight':
                    if(vo.type != 'fight')
                    {
                       return
                    }
                    break;
                case 'chapter':
                    if(vo.type != 'clv' && vo.type != 'cstar')
                    {
                        return
                    }
                    break;
                case 'monster':
                    if(vo.type != 'mlv' && vo.type != 'mnum' && vo.type != 'mlv2' && vo.type != 'mnum2')
                    {
                        return
                    }
                    if(vo.type == 'mlv' ||  vo.type == 'mnum')
                    {
                        if(vo.key != id)
                        {
                             return
                        }
                    }
                    break;
                case 'tec':
                    if(vo.type != 'tlv')
                    {
                        return
                    }
                    if(vo.key != id)
                    {
                        return
                    }
                    break;
                case 'def':
                    if(vo.type != 'def')
                    {
                        return
                    }
                    break;
            }
            MyWindow.ShowTips(vo.getDes() + '  ' +MyTool.createHtml( value + '/' + vo.value,0xFF0000),3000)
            EM_wx3.dispatch(GameEvent.client.TASK_CHANGE)
        }

    }
	private wx3_functionX_12616(){console.log(2048)}


    //任务是否完成
    public isTaskFinish(){
        var vo = this.getCurrentTask();
        return vo && this.getTaskValue(vo) >= vo.value
    }
	private wx3_functionX_12617(){console.log(2073)}

    //取正在进行的任务(未领奖)
    public getCurrentTask():TaskVO{
        if(!UM_wx3.task)
            return TaskVO.orderList[0];
        var index = TaskVO.orderList.indexOf(TaskVO.getObject(UM_wx3.task))
        if(index == -1) //自动生成任务
        {

            var id = UM_wx3.task + 1
            var add = UM_wx3.task - TaskVO.orderList.length;
	wx3_function(1011);
            if(!this.autoTask || this.autoTask.id != id)
            {
                var lastCoin = TaskVO.orderList[TaskVO.orderList.length-1].coin;
                this.autoTask = new TaskVO({
                    id:id,
                    index:id,
                    type:'clv',
                    key:'',
                    value:1000+add*10,
                    coin:lastCoin + Math.floor(200000*Math.pow(1.06,add)),
                    diamond:5
                });
	wx3_function(69);
            }
            return this.autoTask;
        }
        return TaskVO.orderList[index+1];
    }

	private wx3_functionX_12618(){console.log(5811)}
    public getTaskValue(vo:TaskVO){
        var type = vo.type
        switch(type)
        {
            case 'fight':
                return FightManager.getInstance().fightNum;
            case 'def':
                return MonsterManager.getInstance().getMyListForce(MonsterManager.getInstance().defList,false);
            case 'mlv'://指定ID
                return MonsterManager.getInstance().getMonsterLevel(vo.key)
            case 'mnum': //指定ID
                return MonsterManager.getInstance().getMonsterNum(vo.key)
            case 'mlv2'://等级大于v1的数量
                return MonsterManager.getInstance().getLevelOver(vo.key)
            case 'mnum2'://数量大于v1的数量
                return MonsterManager.getInstance().getNumOver(vo.key)
            case 'tlv':
                return TecManager.getInstance().getTecLevel(vo.key)
            case 'clv':
                return UM_wx3.chapterLevel
            case 'cstar'://星星数量
                return ChapterManager.getInstance().getTotalStar()
            case 'space'://星星数量
                return SpaceManager.getInstance().historyTimes;
        }
    }
	private wx3_functionX_12619(){console.log(1812)}


    public getTaskAward(fun?){
        var vo = this.getCurrentTask();
        if(!vo)
            return;
        if(!this.isTaskFinish())
            return
        if(vo.coin)
        {
            UM_wx3.addCoin(vo.coin)
            AwardTipsUI.showTips('coin',vo.coin)
        }
        if(vo.diamond)
        {
            UM_wx3.addDiamond(vo.diamond)
            AwardTipsUI.showTips('diamond',vo.diamond)
        }
        UM_wx3.task = vo.id;
	wx3_function(7615);
        this.lastTaskFinish = this.isTaskFinish();
        EM_wx3.dispatch(GameEvent.client.TASK_CHANGE)
    }

    //未完成任务前往
    public guideTaskVO:TaskVO;
    public onTaskGo(){
        var vo = this.guideTaskVO = this.getCurrentTask();
	wx3_function(3769);
        var type = vo.type
        if(vo.index >= 20)
        {
            var needHideAll = true;
            switch(type)
            {
                case 'mlv'://指定ID
                case 'mnum': //指定ID
                    if(CardInfoUI.getInstance().stage && CardInfoUI.getInstance().visible)
                        needHideAll = false
                    break;
            }
            if(needHideAll)
                PopUpManager.hideAll();
	wx3_function(7237);
            this.guideTaskVO = vo;
            switch(type)
            {
                case 'fight':
                    FightUI.getInstance().show();
                    break;
                case 'def':
                    MonsterManager.getInstance().editDef()
                    break;
                case 'mlv'://指定ID
                    CardInfoUI.getInstance().show(vo.key)
                    break;
                case 'mnum': //指定ID
                    CardInfoUI.getInstance().show(vo.key)
                    break;
                case 'mlv2'://等级大于v1的数量
                   MonsterUI.getInstance().show();
	wx3_function(2577);
                    break;
                case 'mnum2'://数量大于v1的数量
                    MonsterUI.getInstance().show();
                    break;
                case 'tlv':
                    TecUI.getInstance().show()
                    break;
                case 'clv':
                    ChapterUI.getInstance().show()
                    break;
                case 'cstar'://星星数量
                    ChapterUI.getInstance().show()
                    break;
                case 'space'://
                    SpaceUI.getInstance().show()
                    break;
            }
            return true
        }
        switch(type)
        {
            case 'fight':
                this.showGuideMC(GameUI.getInstance().fightBtn)
                break;
            case 'def':
                GameUI.getInstance().showDefGuide();
	wx3_function(8550);
                break;
            case 'mlv'://指定ID
                this.showGuideMC(GameUI.getInstance().monsterBtn)
                break;
            case 'mnum': //指定ID
                if(CardInfoUI.getInstance().stage && CardInfoUI.getInstance().visible && CardInfoUI.getInstance().data == vo.key)
                {
                    CardInfoUI.getInstance().showFinish();
	wx3_function(246);
                    return;
                }
                this.showGuideMC(GameUI.getInstance().monsterBtn)
                break;
            case 'mlv2'://等级大于v1的数量
                this.showGuideMC(GameUI.getInstance().monsterBtn)
                break;
            case 'mnum2'://数量大于v1的数量
                this.showGuideMC(GameUI.getInstance().monsterBtn)
                break;
            case 'tlv':
                if(TecUI.getInstance().stage && TecUI.getInstance().visible)
                {
                    TecUI.getInstance().show();
	wx3_function(8920);
                    return;
                }
                this.showGuideMC(GameUI.getInstance().tecBtn)
                break;
            case 'clv':
                this.showGuideMC(GameUI.getInstance().chapterBtn)
                break;
            case 'cstar'://星星数量
                this.showGuideMC(GameUI.getInstance().chapterBtn)
                break;
        }

	wx3_function(5473);
        PopUpManager.hideAll();
        this.guideTaskVO = vo;
         return true;
        //clv,mlv*2,mnum*2,clv,clv*2,mlv,clv*2
    }


	private wx3_functionX_12620(){console.log(5382)}
    public addTaskTime = 0;
    public addTaskNum = 0
    public onTimer(){
        var arr = UM_wx3.dayTask;
        if(!arr)
            return;
        var needAddNum = Math.min(Math.floor((TM_wx3.now() - this.addTaskTime)/30/60), 5-arr.length,2);

        if(!this.addTaskTime)//首次进入onTimer
        {
            this.addTaskTime = Math.max(TM_wx3.now() + 5*60,SharedObjectManager_wx3.getInstance().getMyValue('addTaskTime') || 1)
            for(var i=0;i<arr.length;i++)
            {
                 if(!arr[i].time)//未做的要去掉
                {
                    arr.splice(i,1);
                    i--;
                    needAddNum++;
                }
            }
        }
        var b = false
        if(!this.taskFinish)
        {
            b = this.taskFinish = this.testTaskFinish();
        }
        b && EM_wx3.dispatch(GameEvent.client.TASK_CHANGE);
    }

    public addDayTask(){
        if(!this.addTaskTime || TM_wx3.now() < this.addTaskTime)
            return;
        if(this.guideTaskVO)
            return;
        if(UM_wx3.dayTask.length >= 5)
            return;

        var arr = UM_wx3.dayTask;
        this.addTaskTime = TM_wx3.now() + 60*10 + this.addTaskNum*3*60;
        SharedObjectManager_wx3.getInstance().setMyValue('addTaskTime',this.addTaskTime)
        var list = [1,2,3,4,5,6,7,8];
        for(var i=0;i<arr.length;i++)
        {
            var oo = arr[i]
            var index = list.indexOf(oo.id);
            if(index != -1)
                list.splice(index,1);
        }


        var cd = Math.ceil(Math.random()*4);
        TaskInfoUI.getInstance().show({
            id:ArrayUtil.randomOne(list,true),
            num:Math.ceil(TecManager.getInstance().getTecLevel(11)/2),
            cd:cd,
            create:TM_wx3.now(),
            award:Math.ceil(UM_wx3.hourEarn*Math.pow(cd,1.1)*(0.8+0.2*Math.random()))
        })
        this.addTaskNum ++;
    }

    public testTaskFinish(){
        var arr = this.getTaskingList();
	wx3_function(2488);
        var t = TM_wx3.now();
        for(var i=0;i<arr.length;i++)   //可领奖
        {
            if(t - arr[i].time > arr[i].cd*3600)
            {
                return true;
            }
        }
        return false;
    }
	private wx3_functionX_12621(){console.log(9585)}

    public dayTaskRed(){
        return this.newRed || this.taskFinish
    }

    //进行中的日常
    public getTaskingList(){
        var arr = UM_wx3.dayTask;
	wx3_function(1761);
        var list = [];
        for(var i=0;i<arr.length;i++)
        {
             if(arr[i].time && arr[i].list)
                 list.push(arr[i])
        }
        return list;
    }
	private wx3_functionX_12622(){console.log(69)}

    //任务中的怪物
    public getNumObj(){
        var numObj = {};
        var arr = this.getTaskingList();
        for(var i=0;i<arr.length;i++)
        {
            var temp = arr[i].list.split(',')
            for(var j=0;j<temp.length;j++)
            {
                var id = temp[j];
	wx3_function(9509);
                numObj[id] = (numObj[id] || 0) + 1;
            }
        }
        return numObj;
    }
}