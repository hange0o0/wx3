class MonsterManager {

    private static _instance:MonsterManager;

    public static getInstance():MonsterManager {
        if (!this._instance)
            this._instance = new MonsterManager();
        return this._instance;
    }

    private numCost = [10,50,100,200,500,1000,2000,5000,10000]
    public monsterData;  //{lv,num};
    public defList = [];



    public initMonster(data,def){
        this.monsterData = data || {};

        if(def)
        {
            var list = def.split(',')
            for(var i=0;i<list.length;i++)
            {
                var temp = list[i].split('#')
                this.defList.push({
                    id:temp[0],
                    bornTime:parseInt(temp[1]),
                })
            }
        }
    }

    public createDefSave(){
        var def = []
        for(var i=0;i<this.defList.length;i++)
        {
            var oo = this.defList[i];
            def.push(oo.id+'#'+oo.bornTime);
        }
        return def.join(',');
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

    //最多10只
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

    public getDefNumObj(){
        return {};
    }

    public getFreeMonster(isTestRed?){
         var arr = this.getOpenMonster();
        var defNum = this.getDefNumObj();
        var workNum = WorkManager.getInstance().getNumObj();
        var returnArr = [];
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
            var maxNum = this.getMonsterNum(id)
            var useNum = (defNum[id] || 0) + (workNum[id] || 0)
            if(maxNum > useNum)
            {
                returnArr.push(arr[i]);
                if(isTestRed)
                    return returnArr;
            }
        }
        return returnArr;
    }
}