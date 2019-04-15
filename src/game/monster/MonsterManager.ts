class MonsterManager {

    private static _instance:MonsterManager;

    public static getInstance():MonsterManager {
        if (!this._instance)
            this._instance = new MonsterManager();
        return this._instance;
    }

    private numCost = [10,20,40,80,160,999];
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

    public editDef(){
        PKPosUI.getInstance().show({
            type:'def',
            title:'防守阵容调整',
            chooseList:this.defList,
            isPK:true,
            maxNum:TecManager.getInstance().getTeamNum(),
            maxCost:TecManager.getInstance().getTeamCost(),
            fun:(list)=>{
                PKPosUI.getInstance().hide();
                if(list != this.defList)
                {
                    this.defList = list;
                    UM.needUpUser = true;
                    EM.dispatchEventWith(GameEvent.client.DEF_CHANGE)
                }
                if(!FightManager.getInstance().nextBeHitTime)
                    FightManager.getInstance().resetNextBeHit();
            },
        })
    }
    /////////////////////////////////// def end //////////////////////


    //取队伍战力
    public tempForceAdd = 0;//用于计算玩家最强战力
    public getMyListForce(list,isAtk?){
        this.tempForceAdd = 0;
        if(!list)
            return 0;
        var count = 0;
        var force = isAtk?TecManager.getInstance().getAtkForce():TecManager.getInstance().getDefForce();
        force += BuffManager.getInstance().getForceAdd();
        var arr = (list+'').split(',');
        for(var i=0;i<arr.length;i++)
        {
            var vo = MonsterVO.getObject(arr[i]);
            var forceAdd = (force + this.getForceAdd(vo.id));
            count += vo.cost*(1+forceAdd/100);
            this.tempForceAdd += forceAdd;
        }
        this.tempForceAdd/=arr.length;
        return Math.floor(count);
    }

    public forceAdd

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

    public levelUpMonster(id){
        if(!this.monsterData[id])
            this.monsterData[id] = {}
        this.monsterData[id].lv = this.getMonsterLevel(id) + 1;
        EM.dispatch(GameEvent.client.TASK_CHANGE)
    }

    public numUpMonster(id){
        if(!this.monsterData[id])
            this.monsterData[id] = {}
        this.monsterData[id].num = this.getMonsterNum(id) + 1;
        EM.dispatch(GameEvent.client.TASK_CHANGE)
    }


    public getMonsterLevel(id){
        if(!this.monsterData[id])
            return 0;
        return this.monsterData[id].lv || 0;
    }

    public getMonsterNum(id){
        //return 3;
        if(!this.monsterData[id])
            return 1;
        return this.monsterData[id].num || 1;
    }

    public getLevelCost(id,lv?){

        lv = lv || this.getMonsterLevel(id)+1;
        var vo = MonsterVO.getObject(id);
        return  MyTool.reInit(Math.pow(lv + (1+lv/10)*vo.level/10,2.5)*1000,3);
    }

    //最多10只分身
    public getNumCost(id,num?){
        num = num || this.getMonsterNum(id)+1;
        return this.numCost[num-2] + MonsterVO.getObject(id).level - 1;
    }

    //增加的工作收益
    public getWorkAdd(id)
    {
        var lv = this.getMonsterLevel(id);
        return lv*5;
    }

    //增加的战力加成
    public getForceAdd(id)
    {
        var lv = this.getMonsterLevel(id);
        var force = 0
        for(var i=0;i<lv;i++)
        {
            force += (i+10)*5;
        }
        return force;
    }

    public getAtkAdd(id){
        var tecForce =TecManager.getInstance().getAtkForce()
        var buffForce = BuffManager.getInstance().getForceAdd();
        var monsterForce = this.getForceAdd(id);
        return (1+(tecForce + monsterForce)/100)*(1+buffForce/100)
    }

    public getDefAdd(id){
        var tecForce =TecManager.getInstance().getDefForce()
        var buffForce = BuffManager.getInstance().getForceAdd();
        var monsterForce = this.getForceAdd(id);
        return (1+(tecForce + monsterForce)/100)*(1+buffForce/100)
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
        var taskNum = TaskManager.getInstance().getNumObj();
        var returnArr = [];
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
            var maxNum = this.getMonsterNum(id)
            var useNum = (defNum[id] || 0) + (workNum[id] || 0) + (fightNum[id] || 0) + (taskNum[id] || 0);
            if(maxNum > useNum)
            {
                returnArr.push({vo:arr[i],num:maxNum-useNum});
                if(isTestRed)
                    return returnArr;
            }
        }
        return returnArr;
    }

    public getNumOver(num){
        var arr = this.getOpenMonster();
        var count = 0;
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
            var maxNum = this.getMonsterNum(id)
            if(maxNum >= num)
                count ++
        }
        return count;
    }

    public getLevelOver(num){
        var arr = this.getOpenMonster();
        var count = 0;
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
            var maxNum = this.getMonsterLevel(id)
            if(maxNum >= num)
                count ++
        }
        return count;
    }

    public getTotalMonsterNum(){
        var arr = this.getOpenMonster();
        var count = 0;
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
            count += this.getMonsterNum(id)
        }
        return count;
    }
}