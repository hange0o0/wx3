class TaskManager {
    private static _instance:TaskManager;
    public static getInstance():TaskManager {
        if (!this._instance)
            this._instance = new TaskManager();
        return this._instance;
    }

    public dayTaskBase = {
        1:{name:'打猎',des:'1'},
        2:{name:'烹调食材',des:'1'},
        3:{name:'收集珍珠',des:'1'},
        4:{name:'采集蘑菇',des:'1'},
        5:{name:'收集鸟蛋',des:'1'},
        6:{name:'采果子',des:'1'},
        7:{name:'种植草药',des:'1'},
        8:{name:'清理池塘',des:'1'},
    }

    public newRed= false;
    public taskFinish= false;
    public openCoinUI = false;
    public constructor() {

    }

    //在MC上显示一次光效
    private guideLight;
    private guideTimer;
    public showGuideMC(mc) {
        if(TaskUI.getInstance().stage)
            return;
        if (!this.guideLight) {
            var data:any = RES.getRes('guide_mv' + "_json"); //qid
            var texture:egret.Texture = RES.getRes('guide_mv' + "_png");
            if (data == null || texture == null) {
                return
            }
            var mcFactory = new egret.MovieClipDataFactory(data, texture);

            this.guideLight = new egret.MovieClip();
            this.guideLight.movieClipData = mcFactory.generateMovieClipData('click_guide');
            this.guideLight.addEventListener(egret.MovieClipEvent.COMPLETE, ()=>{
                this.guideLight.stop();
                MyTool.removeMC(this.guideLight);
            }, this)
            this.guideLight.frameRate = 12//技能动画变慢
            this.guideLight.touchEnabled = false;
        }

        egret.clearTimeout(this.guideTimer);
        this.guideTimer = egret.setTimeout(function(){
            var rect = mc.getBounds();
            rect.x += mc.anchorOffsetX
            rect.y += mc.anchorOffsetY
            var p1 = mc.localToGlobal(rect.x, rect.y);
            var p2 = mc.localToGlobal(rect.x + rect.width, rect.y + rect.height);
            console.log(p1,p2)

            this.guideLight.x = p1.x + (p2.x - p1.x) / 2
            this.guideLight.y = p1.y + (p2.y - p1.y) / 2
            GameManager.container.addChild(this.guideLight);
            this.guideLight.gotoAndPlay(1, 1);
        },this,200);

    }

    public hideGuideLight(){
        egret.clearTimeout(this.guideTimer);
        if(this.guideLight)
        {
            this.guideLight.stop();
            MyTool.removeMC(this.guideLight);
        }

    }

    public init(){
        this.lastTaskFinish = this.isTaskFinish()
    }

    private lastTaskFinish = false;
    public testMainTask(){
        if(GuideManager.getInstance().isGuiding)
            return;
        if(!this.lastTaskFinish && this.isTaskFinish())
        {
            this.lastTaskFinish = true;
            TaskUI.getInstance().show();
            //MyWindow.ShowTips(''+this.getCurrentTask().getDes()+' - 任务完成')
            EM.dispatch(GameEvent.client.TASK_CHANGE)
        }

    }


    //任务是否完成
    public isTaskFinish(){
        var vo = this.getCurrentTask();
        return vo && this.getTaskValue(vo) >= vo.value
    }

    //取正在进行的任务(未领奖)
    public getCurrentTask():TaskVO{
        if(!UM.task)
            return TaskVO.orderList[0];
        var index = TaskVO.orderList.indexOf(TaskVO.getObject(UM.task))
        if(index == -1)
            return null;
        return TaskVO.orderList[index+1];
    }

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
                return UM.chapterLevel
            case 'cstar'://星星数量
                return ChapterManager.getInstance().getTotalStar()
        }
    }


    public getTaskAward(fun?){
        var vo = this.getCurrentTask();
        if(!vo)
            return;
        if(!this.isTaskFinish())
            return
        if(vo.coin)
        {
            UM.addCoin(vo.coin)
            MyWindow.ShowTips('获得金币：+'+MyTool.createHtml(NumberUtil.addNumSeparator(vo.coin,2),0xFFFF00),2000)
        }
        if(vo.diamond)
        {
            UM.addDiamond(vo.diamond)
            MyWindow.ShowTips('获得钻石：+'+MyTool.createHtml(vo.diamond,0x6ffdfd),2000)
        }
        UM.task = vo.id;
        this.lastTaskFinish = this.isTaskFinish();
        EM.dispatch(GameEvent.client.TASK_CHANGE)
    }

    //未完成任务前往
    public guideTaskVO:TaskVO;
    public onTaskGo(){
        var vo = this.guideTaskVO = this.getCurrentTask();
        var type = vo.type
        if(vo.index > 20)
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
                break;
            case 'mlv'://指定ID
                this.showGuideMC(GameUI.getInstance().monsterBtn)
                break;
            case 'mnum': //指定ID
                if(CardInfoUI.getInstance().stage && CardInfoUI.getInstance().visible && CardInfoUI.getInstance().data == vo.key)
                {
                    CardInfoUI.getInstance().showFinish();
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

        PopUpManager.hideAll();
        this.guideTaskVO = vo;
         return true;
        //clv,mlv*2,mnum*2,clv,clv*2,mlv,clv*2
    }


    public addTaskTime = 0;
    public onTimer(){
        var arr = UM.dayTask;
        if(!arr)
            return;
        if(!this.addTaskTime)
        {
            this.addTaskTime = SharedObjectManager.getInstance().getMyValue('addTaskTime') || 1
        }
        var b = false
        if(!this.taskFinish)
        {
            b = this.taskFinish = this.testTaskFinish();
        }
        var needAddNum = Math.min(Math.floor((TM.now() - this.addTaskTime)/30/60), 5-arr.length,2);
        if(needAddNum > 0)//
        {
            this.addTaskTime = TM.now()
            SharedObjectManager.getInstance().setMyValue('addTaskTime',this.addTaskTime)
            var list = [1,2,3,4,5,6,7,8];
            for(var i=0;i<arr.length;i++)
            {
                var oo = arr[i]
                var index = list.indexOf(oo.id);
                if(index != -1)
                    list.splice(index,1);
            }

            UM.needUpUser = true;
            while(needAddNum > 0) //加入新的
            {
                needAddNum --;
                var cd = Math.ceil(Math.random()*4);
                arr.push({
                    id:ArrayUtil.randomOne(list,true),
                    num:Math.ceil(TecManager.getInstance().getTecLevel(11)/2),
                    cd:cd,
                    award:Math.ceil(UM.hourEarn*Math.pow(cd,1.1)*(0.8+0.2*Math.random()))
                })
                b = true
                this.newRed = true;
            }
        }
        b && EM.dispatch(GameEvent.client.TASK_CHANGE);
    }

    public testTaskFinish(){
        var arr = this.getTaskingList();
        var t = TM.now();
        for(var i=0;i<arr.length;i++)   //可领奖
        {
            if(t - arr[i].time > arr[i].cd*3600)
            {
                return true;
            }
        }
        return false;
    }

    public dayTaskRed(){
        return this.newRed || this.taskFinish
    }

    //进行中的日常
    public getTaskingList(){
        var arr = UM.dayTask;
        var list = [];
        for(var i=0;i<arr.length;i++)
        {
             if(arr[i].time && arr[i].list)
                 list.push(arr[i])
        }
        return list;
    }

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
                numObj[id] = (numObj[id] || 0) + 1;
            }
        }
        return numObj;
    }
}