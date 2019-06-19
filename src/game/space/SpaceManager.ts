class SpaceManager {
    private static _instance:SpaceManager;

    public static getInstance():SpaceManager {
        if (!this._instance)
            this._instance = new SpaceManager();
        return this._instance;
    }
    public isDelete = false;
    public adType = 'cd'
    public adValue = 0


    public maxTime = 12*3600//
    public baseData = {
        1:{name:'闯关空间',des:'在闯关中使用过的怪物会被封印无法再次使用，但可在列表中重新解除封印，玩家通过的关卡越多，奖励越丰厚'},
        2:{name:'无尽空间',des:'玩家需在无尽空间中坚持足够长的时间来获取更多奖励，过早突破敌人出生点是一个错误的选择'},
        3:{name:'随机空间',des:'与闯关空间类似，但每出战一个怪物，玩家的手牌会全部重新刷新'},
        4:{name:'克隆空间',des:'在进入空间前，玩家要从自己的怪物中选出6张，然后把所有的怪物替换成那6张怪物的复制'},
        5:{name:'双倍圣水空间',des:'在双倍圣水空间，圣水产生的速度是其它空间的两倍'},
        6:{name:'自走怪物空间',des:'每隔10秒钟，双方的出生点会由系统随机刷出一个怪物，这个怪物不会消耗玩家任何东西'},
        7:{name:'无尽随机空间',des:'与无尽空间类似，但每出战一个怪物，玩家的手牌会全部重新刷新'}
    }

    public spaceType = 0;
    public addTime = 0;//开始的时间
    public historyTimes = 1;
    public enemyForce = 1;
    public level = 1;  //关卡进度
    public myCurrentList = [];
    public myDieList = [];
    public autoMonster = '';
    public enemyList = '';
    public rebornTime = 0;
    public adLevel = 0;
    public diamondNum = 0;//每天最多10粒

    public initData(data){
        data = data || {spaceType:0,addTime:0,historyTimes:0,myCurrentList:'',myDieList:''};
         this.spaceType = data.spaceType;
         this.addTime = data.addTime;
         this.level = data.level;
         this.adLevel = data.adLevel || 0;
         this.rebornTime = data.rebornTime || 0;
         this.diamondNum = data.diamondNum || 0;
         this.enemyList = data.enemyList;
         this.autoMonster = data.autoMonster;
         this.enemyForce = data.enemyForce;
         this.historyTimes = data.historyTimes;
         this.myCurrentList = data.myCurrentList?data.myCurrentList.split(','):[];
         this.myDieList = data.myDieList?data.myDieList.split(','):[];

        this.resetAD();
    }

    public getSaveData(){
       return {
           spaceType:this.spaceType,
           addTime:this.addTime,
           level:this.level,
           adLevel:this.adLevel,
           rebornTime:this.rebornTime,
           enemyList:this.enemyList,
           diamondNum:this.diamondNum,
           autoMonster:this.autoMonster,
           enemyForce:this.enemyForce,
           historyTimes:this.historyTimes,
           myCurrentList:this.myCurrentList.join(','),
           myDieList:this.myDieList.join(','),
       }
    }

    public isPKing(){
        return this.spaceType && TM_wx3.now() - this.addTime < this.maxTime
    }

    public monsterUse(mid){
       var index = this.myCurrentList.indexOf(mid);
        this.myCurrentList.splice(index,1)
        this.myDieList.push(mid);
        UM_wx3.needUpUser = true
    }

    //随机一个空间
    public randomSpace(){
        var type = Math.ceil(Math.random()*7);
        if(this.historyTimes<7)
            type = this.historyTimes + 1;
        this.historyTimes ++;
        while(type == this.spaceType)
        {
            type = Math.ceil(Math.random()*7);
        }
        this.spaceType = type;
        if(!DateUtil.isSameDay(this.addTime))
            this.diamondNum = 0;
        this.addTime = TM_wx3.now();
        this.level = 0;
        this.rebornTime = 0;
        this.autoMonster = '';
        this.enemyList = '';
        var arr = []
        if(type != 4)
        {
            var MM = MonsterManager.getInstance();
            var data = MonsterVO.data;
            var lv = TecManager.getInstance().getTecLevel(11)
            for(var s in data)
            {
                if(data[s].level <= lv)
                {
                    var num = MM.getMonsterNum(s)
                    while(num > 0)
                    {
                        arr.push(s)
                        num --;
                    }
                }
            }
            this.resetEnemyForce(arr)
            this.level = 1;
        }

        this.myCurrentList = arr;

        this.myDieList = [];


        this.resetAD();
        UM_wx3.needUpUser = true;
    }

    private resetAD(){
        this.adType = Math.random()>0.5?'cd':'score'
        var level =Math.floor((0.5 + Math.random()*0.5)*Math.min(this.adLevel,10))
        this.adValue = 30 + level*5;
        if(this.adType == 'score')
            this.adValue *= 30;
    }

    private resetEnemyForce(arr){
        var force = 0;
        var MM = MonsterManager.getInstance();
        for(var i=0;i<arr.length;i++)
        {
            force += MM.getForceAdd(arr[i])
        }
        this.enemyForce = Math.floor(force/arr.length + TecManager.getInstance().getAtkForce() + BuffManager.getInstance().getForceAdd()*0.5)
        UM_wx3.needUpUser = true;
    }

    public reborn(isFree?){
        var arr = []
        for(var i=0;i<6 && this.myDieList.length>0;i++)
        {
            var id = ArrayUtil.randomOne(this.myDieList,true)
            arr.push(id);
            this.myCurrentList.push(id);
        }
        SpaceRebornUI.getInstance().show(arr,isFree);
        UM_wx3.needUpUser = true;
        EM_wx3.dispatch(GameEvent.client.SPACE_CHANGE)
    }

    public resetType4(){
        var total = MonsterManager.getInstance().getTotalMonsterNum()
        this.resetEnemyForce(this.myCurrentList)
        while(this.myCurrentList.length < total)
        {
            this.myCurrentList = this.myCurrentList.concat(this.myCurrentList);
        }
        this.myCurrentList.length = total
        this.level = 1;
        UM_wx3.needUpUser = true;
        EM_wx3.dispatch(GameEvent.client.SPACE_CHANGE)
    }

    public startPK(){

        if(!this.level)
        {
            SpaceChooseCardUI.getInstance().show();
            return;
        }

        if(this.myCurrentList.length == 0)
        {
            MyWindow.Alert('所有的怪物已被封印，无法进入战斗')
            return;
        }
        if(!this.enemyList)
            this.enemyList = this.getEnemyList();

        if(this.spaceType == 6)
        {
            var list = MonsterManager.getInstance().getOpenMonster(TecManager.getInstance().getTecLevel(11) + 1)
            var autoMonster = [];
            for(var i=0;i<20;i++)
            {
                autoMonster.push(ArrayUtil.randomOne(list).id);
            }
            this.autoMonster = autoMonster.join(',')
        }

        var enemy = {
            bgid:PKManager_wx3.getInstance().getDefBG(),
            list:this.enemyList,
            seed:Math.ceil((Math.random() + 1)*10000000000),
            force:this.enemyForce * (0.9 + this.level/10)
        }
        var name = this.baseData[this.spaceType].name
        if(this.spaceType != 2 && this.spaceType != 4)
            name += ' - 第'+this.level+'关'

        ArrayUtil.random(this.myCurrentList)
        var myList = this.myCurrentList.join(',');
        var pkObj:any = {
            title:name,
            seed:enemy.seed,
            list1:enemy.list,
            force1:enemy.force,
            mforce1:{},
            list2:myList,
            force2:TecManager.getInstance().getAtkForce() + BuffManager.getInstance().getForceAdd(),
            mforce2:MonsterManager.getInstance().getMonsterPKForce(myList)
        }

        SpacePKUI.getInstance().show(pkObj);
        SpaceInfoUI.getInstance().hide();
        UM_wx3.needUpUser = true;
    }

    public getEnemyList(){
        var list = MonsterManager.getInstance().getOpenMonster(TecManager.getInstance().getTecLevel(11) + 1)
        var cost = 20 + Math.floor(Math.pow(this.level,2.2));
        if(this.spaceType == 2 || this.spaceType == 7)
            cost = TecManager.getInstance().getTecLevel(11)*50 + 100;
        var arr = [];
        var nowCost = 0;
        var num = 0;
        while(nowCost < cost)
        {
            num++;
            if(num > 200)
                break;
            var vo = ArrayUtil.randomOne(list)
            if(vo.cost + nowCost <= cost)
            {
                nowCost +=vo.cost
                arr.push(vo.id);
            }
        }
        ArrayUtil.random(arr);
        return arr.join(',');
    }

    public testFreeBorn(){
        if(this.rebornTime < 3 && this.myDieList.length >= 6)
        {
            this.rebornTime ++;
            this.reborn(true);
        }
    }

    public onPKFinish(result,data){
       if(result == 1)//loss
            return;
        var maxDiamnd = 10;
        var diamond = 0;
        if(this.spaceType == 2 || this.spaceType == 7)//endless
        {
            var coin = Math.floor(Math.pow(PKData_wx3.getInstance().actionTime/1000/3,3))*2
            diamond = Math.floor(PKData_wx3.getInstance().actionTime/1000/30);
        }
        else
        {
            this.level ++
            var coin = Math.floor(Math.pow(this.level,3.4))*50

            if((this.level-1)%3 == 0)
                diamond = 1;
        }

        if(this.diamondNum + diamond > maxDiamnd)
        {
            diamond = Math.max(0,maxDiamnd - this.diamondNum)
        }

        data.coin = coin
        data.diamond = diamond
    }

}
