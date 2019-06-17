class SpaceManager {
    private static _instance:SpaceManager;

    public static getInstance():SpaceManager {
        if (!this._instance)
            this._instance = new SpaceManager();
        return this._instance;
    }

    public maxTime = 24*3600//
    public baseData = {
        1:{name:'闯关世界',des:'在闯关中使用过的怪物会被封印无法再次使用，但可在列表中重新解除封印，玩家通过的关卡越多，奖励越丰厚'},
        2:{name:'无尽世界',des:'玩家需在无尽世界中坚持足够长的时间来获取更多奖励，过早突破敌人出生点是一个错误的选择'},
        3:{name:'随机世界',des:'与闯关世界类似，但每出战一个怪物，玩家的手牌会全部重新刷新'},
        4:{name:'克隆世界',des:'在进入世界前，玩家要从自己的怪物中选出6张，然后把所有的怪物替换成那6张怪物的复制'},
        5:{name:'双倍圣水世界',des:'在双倍圣水世界，圣水产生的速度是其它世界的两倍'},
        6:{name:'自走怪物世界',des:'每隔10秒钟，双方的出生点会由系统随机刷出一个怪物，这个怪物不会消耗玩家任何东西'},
        7:{name:'无尽随机世界',des:'与无尽世界类似，但每出战一个怪物，玩家的手牌会全部重新刷新'}
    }

    public spaceType = 0;
    public addTime = 0;//开始的时间
    public historyTimes = 1;
    public enemyForce = 1;
    public myCurrentList = [];
    public myDieList = [];

    public initData(data){
        data = data || {spaceType:0,addTime:0,historyTimes:0,myCurrentList:'',myDieList:''};
         this.spaceType = data.spaceType;
         this.addTime = data.addTime;
         this.enemyForce = data.enemyForce;
         this.historyTimes = data.historyTimes;
         this.myCurrentList = data.myCurrentList?data.myCurrentList.split(','):[];
         this.myDieList = data.myDieList?data.myDieList.split(','):[];
    }

    public getSaveData(){
       return {
           spaceType:this.spaceType,
           addTime:this.addTime,
           enemyForce:this.enemyForce,
           historyTimes:this.historyTimes,
           myCurrentList:this.myCurrentList.join(','),
           myDieList:this.myDieList.join(','),
       }
    }

    //随机一个怪物
    public randomSpace(){
        var type = Math.ceil(Math.random()*7);
        if(this.historyTimes<7)
            type = this.historyTimes + 1;
        this.historyTimes ++;
        while(type == this.spaceType)
        {
            type = Math.ceil(Math.random()*7);
        }
        this.addTime = TM_wx3.now();

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
        }

        this.myCurrentList = arr;
        this.myDieList = [];
    }

    private resetEnemyForce(arr){
        var force = 0;
        var MM = MonsterManager.getInstance();
        for(var i=0;i<arr.length;i++)
        {
            force += MM.getForceAdd(arr[i])
        }
        this.enemyForce = Math.floor(force/arr.length + TecManager.getInstance().getAtkForce() + BuffManager.getInstance().getForceAdd()*0.5)
    }

    public resetType4(){
        var total = MonsterManager.getInstance().getTotalMonsterNum()
        this.resetEnemyForce(this.myCurrentList)
        while(this.myCurrentList.length < total)
        {
            this.myCurrentList = this.myCurrentList.concat(this.myCurrentList);
        }
        this.myCurrentList.length = total
    }

}
