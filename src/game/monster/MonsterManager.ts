class MonsterManager {

    private static _instance:MonsterManager;

    public static getInstance():MonsterManager {
        if (!this._instance)
            this._instance = new MonsterManager();
        return this._instance;
    }
	private wx3_functionX_12393(){console.log(5670)}

    private numCost = [10,20,50,120,300,99999];
    public monsterData;  //{lv,num};
    public defList = '';


	private wx3_functionX_12394(){console.log(4894)}

    public initMonster(data,def){
        this.monsterData = data || {};
        this.defList = def || '';
    }

    /////////////////////////////////// def //////////////////////
	private wx3_functionX_12395(){console.log(3776)}
    public getDefNumObj(){
        var obj = {};
        var list = this.defList.split(',');
        for(var i=0;i<list.length;i++)
        {
            obj[list[i]] = (obj[list[i]] || 0) + 1;
	wx3_function(6228);
        }
        return obj;
    }

    public getDefArr(){
        return this.defList?this.defList.split(','):[];
    }
	private wx3_functionX_12396(){console.log(2738)}

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
	wx3_function(5109);
                if(list != this.defList)
                {
                    this.defList = list;
                    UM_wx3.needUpUser = true;
                    EM_wx3.dispatchEventWith(GameEvent.client.DEF_CHANGE)
                }
                if(!FightManager.getInstance().nextBeHitTime)
                    FightManager.getInstance().resetNextBeHit();
	wx3_function(2155);
                TaskManager.getInstance().testMainTask('def') ;
            },
        })
    }
    /////////////////////////////////// def end //////////////////////


    //取队伍战力
	private wx3_functionX_12397(){console.log(8645)}
    public tempForceAdd = 0;//用于计算玩家最强战力
    public getMyListForce(list,isAtk?){
        this.tempForceAdd = 0;
        if(!list)
            return 0;
        var count = 0;
	wx3_function(6543);
        var force = isAtk?TecManager.getInstance().getAtkForce():TecManager.getInstance().getDefForce();
        force += BuffManager.getInstance().getForceAdd();
        var arr = (list+'').split(',');
        for(var i=0;i<arr.length;i++)
        {
            var vo = MonsterVO.getObject(arr[i]);
	wx3_function(2871);
            var forceAdd = (force + this.getForceAdd(vo.id));
            count += vo.cost*(1+forceAdd/100);
            this.tempForceAdd += forceAdd;
        }
        this.tempForceAdd/=arr.length;
        return Math.floor(count);
    }
	private wx3_functionX_12398(){console.log(9038)}

    //public forceAdd

    //生成战斗用的怪物战力数据
    public getMonsterPKForce(list)
    {
        var arr = list.split(',')
        var oo = {};
	wx3_function(8835);
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i];
            oo[id] = this.getForceAdd(id)
        }
        return oo;
    }
	private wx3_functionX_12399(){console.log(9224)}

    public levelUpMonster(id){
        if(!this.monsterData[id])
            this.monsterData[id] = {}
        this.monsterData[id].lv = this.getMonsterLevel(id) + 1;
        TaskManager.getInstance().testMainTask('monster')
        EM_wx3.dispatch(GameEvent.client.MONSTER_CHANGE)
    }
	private wx3_functionX_12400(){console.log(1146)}

    public numUpMonster(id){
        if(!this.monsterData[id])
            this.monsterData[id] = {}
        this.monsterData[id].num = this.getMonsterNum(id) + 1;
        TaskManager.getInstance().testMainTask('monster')
        EM_wx3.dispatch(GameEvent.client.MONSTER_CHANGE)
    }
	private wx3_functionX_12401(){console.log(5133)}


    public getMonsterLevel(id){
        if(!this.monsterData[id])
            return 0;
        return this.monsterData[id].lv || 0;
    }
	private wx3_functionX_12402(){console.log(563)}

    public getMonsterNum(id){
        //return 3;
        if(!this.monsterData[id])
            return 1;
        return this.monsterData[id].num || 1;
    }
	private wx3_functionX_12403(){console.log(8884)}

    public getLevelCost(id,lv?){

        lv = lv || this.getMonsterLevel(id)+1;
        var vo = MonsterVO.getObject(id);
        return  MyTool.reInit(Math.pow(lv + (1+lv/10)*vo.level/10,2.5)*1000,3);
    }
	private wx3_functionX_12404(){console.log(4783)}

    //最多10只分身
    public getNumCost(id,num?){
        num = num || this.getMonsterNum(id)+1;
        return this.numCost[num-2] + MonsterVO.getObject(id).level - 1;
    }

    //增加的工作收益
	private wx3_functionX_12405(){console.log(6247)}
    public getWorkAdd(id)
    {
        var lv = this.getMonsterLevel(id);
        return lv*5;
    }

    //增加的战力加成
	private wx3_functionX_12406(){console.log(5648)}
    public getForceAdd(id)
    {
        var lv = this.getMonsterLevel(id);
        var force = 0
        for(var i=0;i<lv;i++)
        {
            force += (i+10)*5;
	wx3_function(8098);
        }
        return force;
    }

    public getAtkAdd(id){
        var tecForce =TecManager.getInstance().getAtkForce()
        var buffForce = BuffManager.getInstance().getForceAdd();
	wx3_function(7346);
        var monsterForce = this.getForceAdd(id);
        return (1+(tecForce + monsterForce)/100)*(1+buffForce/100)
    }

    public getDefAdd(id){
        var tecForce =TecManager.getInstance().getDefForce()
        var buffForce = BuffManager.getInstance().getForceAdd();
	wx3_function(1869);
        var monsterForce = this.getForceAdd(id);
        return (1+(tecForce + monsterForce)/100)*(1+buffForce/100)
    }


    //已解锁的怪物
    public getOpenMonster(){
        var arr = []
        var data = MonsterVO.data;
	wx3_function(9972);
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
	private wx3_functionX_12407(){console.log(5852)}

    //取空闲怪物数据
    public getEmptyNum(id){
        var defNum = this.getDefNumObj();
        var fightNum = FightManager.getInstance().getFightNumObj();
        var workNum = WorkManager.getInstance().getNumObj();
        var maxNum = this.getMonsterNum(id)
        var useNum = (defNum[id] || 0) + (workNum[id] || 0) + (fightNum[id] || 0);
	wx3_function(4925);
        return maxNum - useNum;
    }


    public getFreeMonster(isTestRed?){
         var arr = this.getOpenMonster();
	wx3_function(3528);
        var defNum = this.getDefNumObj();
        var fightNum = FightManager.getInstance().getFightNumObj();
        var workNum = WorkManager.getInstance().getNumObj();
        var taskNum = TaskManager.getInstance().getNumObj();
        var returnArr = [];
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
	wx3_function(2841);
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
	private wx3_functionX_12408(){console.log(7520)}

    public getNumOver(num){
        var arr = this.getOpenMonster();
        var count = 0;
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
	wx3_function(3265);
            var maxNum = this.getMonsterNum(id)
            if(maxNum >= num)
                count ++
        }
        return count;
    }
	private wx3_functionX_12409(){console.log(3104)}

    public getLevelOver(num){
        var arr = this.getOpenMonster();
        var count = 0;
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
	wx3_function(183);
            var maxNum = this.getMonsterLevel(id)
            if(maxNum >= num)
                count ++
        }
        return count;
    }
	private wx3_functionX_12410(){console.log(480)}

    public getTotalMonsterNum(){
        var arr = this.getOpenMonster();
        var count = 0;
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
	wx3_function(2150);
            count += this.getMonsterNum(id)
        }
        return count;
    }
}