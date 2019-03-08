class MonsterManager {

    private static _instance:MonsterManager;

    public static getInstance():MonsterManager {
        if (!this._instance)
            this._instance = new MonsterManager();
        return this._instance;
    }

    private numCost = [10,50,100,200,500,1000,2000,5000,10000]
    public monsterData;  //{lv,num};
    public defList = '';



    public initMonster(data,def){
        this.monsterData = data || {};
        this.defList = def || '';
    }

    /////////////////////////////////// def //////////////////////
    public getDefNumObj(){
        var obj = {};
        var list = this.defList.split(',');
        for(var i=0;i<list.length;i++)
        {
            obj[list[i]] = (obj[list[i]] || 0) + 1;
        }
        return obj;
    }

    public getDefArr(){
        return this.defList?this.defList.split(','):[];
    }
    /////////////////////////////////// def end //////////////////////
    //取队伍战力
    public getMyListForce(list,isAtk?){
        if(!list)
            return 0;
        var count = 0;
        var force = isAtk?TecManager.getInstance().getAtkForce():TecManager.getInstance().getDefForce();
        var arr = list.split(',');
        for(var i=0;i<arr.length;i++)
        {
            var vo = MonsterVO.getObject(arr[i]);
            count += vo.cost*(1+(force + this.getForceAdd(vo.id))/100)
        }
        return count;
    }

    //生成战斗用的怪物战力数据
    public getMonsterPKForce(list)
    {
        var arr = list.split(',')
        var oo = {};
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i];
            oo[id] = this.getForceAdd(id)
        }
        return oo;
    }


    public getMonsterLevel(id){
        if(!this.monsterData[id])
            return 0;
        return this.monsterData[id].lv || 0;
    }

    public getMonsterNum(id){
        if(!this.monsterData[id])
            return 1;
        return this.monsterData[id].num || 1;
    }

    public getLevelCost(id,lv?){
        lv = lv || this.getMonsterLevel(id)+1;
        var vo = MonsterVO.getObject(id);
        return  Math.floor(Math.pow(lv + vo.level/10,2.5)*10);
    }

    //最多10只分身
    public getNumCost(id,num?){
        num = num || this.getMonsterNum(id)+1;
        return this.numCost[num-1];
    }

    //增加的工作收益
    public getWorkAdd(id)
    {
        var lv = this.getMonsterLevel(id);
        return lv*0.05;
    }

    //增加的战力加成
    public getForceAdd(id)
    {
        var lv = this.getMonsterLevel(id);
        return lv*10;
    }


    //已解锁的怪物
    public getOpenMonster(){
        var arr = []
        var data = MonsterVO.data;
        var lv = TecManager.getInstance().getTecLevel(11)
       for(var s in data)
       {
            if(data[s].level <= lv)
            {
                arr.push(data[s])
            }
       }
        return arr;
    }

    //取空闲怪物数据
    public getEmptyNum(id){
        var defNum = this.getDefNumObj();
        var fightNum = FightManager.getInstance().getFightNumObj();
        var workNum = WorkManager.getInstance().getNumObj();
        var maxNum = this.getMonsterNum(id)
        var useNum = (defNum[id] || 0) + (workNum[id] || 0) + (fightNum[id] || 0);
        return maxNum - useNum;
    }


    public getFreeMonster(isTestRed?){
         var arr = this.getOpenMonster();
        var defNum = this.getDefNumObj();
        var fightNum = FightManager.getInstance().getFightNumObj();
        var workNum = WorkManager.getInstance().getNumObj();
        var returnArr = [];
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
            var maxNum = this.getMonsterNum(id)
            var useNum = (defNum[id] || 0) + (workNum[id] || 0) + (fightNum[id] || 0);
            if(maxNum > useNum)
            {
                returnArr.push({vo:arr[i],num:maxNum-useNum});
                if(isTestRed)
                    return returnArr;
            }
        }
        return returnArr;
    }
}