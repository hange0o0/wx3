class WorkManager {

    private static _instance:WorkManager;

    public static getInstance():WorkManager {
        if (!this._instance)
            this._instance = new WorkManager();
        return this._instance;
    }
	private wx3_functionX_12667(){console.log(513)}

    public workHideTime =0//3000;//挖矿时间
    public workStart = 0//70
    public workLen = 800//500
    public workList = []

	private wx3_functionX_12668(){console.log(3342)}
    public offlineEarn = 0;

    public initWork(dataIn){
        this.workList.length = 0;
        if(!dataIn)
            return;
        var arr = dataIn.split(',')
        for(var i=0;i<arr.length;i++)
        {
            var temp = arr[i].split('#');
	wx3_function(4);
            this.workList.push({
                id:temp[0],
                resetTime:parseInt(temp[1])*1000,  //单位，ms
                index:temp[2]
            })
        }
    }
	private wx3_functionX_12669(){console.log(771)}

    public editWork(workIndex){
        var maxNum = this.getWorkNum();
        var localMax = (workIndex)*10;
        if(localMax <= maxNum)
            localMax = 10;
        else
            localMax = maxNum%10;
	wx3_function(4369);

        var workList = this.getWorkList(workIndex);
        var strList = [];
        for(var i=0;i<workList.length;i++)
        {
            strList.push(workList[i].id)
        }

        PKPosUI.getInstance().show({
            type:'work',
            title:'矿坑'+workIndex+'-工作怪物调整',
            chooseList:strList.join(','),
            maxNum:localMax,
            maxCost:Number.MAX_VALUE,
            workIndex:workIndex,
            fun:(list)=>{
                PKPosUI.getInstance().hide();
	wx3_function(8043);
                var newList = list?list.split(','):[];
                ArrayUtil.sortByField(workList,['resetTime'],[1])
                var b = false;
                for(var i=0;i<workList.length;i++) //重复
                {
                    var index = newList.indexOf(workList[i].id + '')
                    if(index != -1)
                    {
                        newList.splice(index,1)
                        workList.splice(i,1)
                    }
                }

                //去掉移除的
                while(workList.length)
                {
                    b = true
                    var oo = workList.pop();
	wx3_function(3300);
                    var index2 = this.workList.indexOf(oo);
                    if(index2 != -1)
                        this.workList.splice(index2,1)
                }
                //加入新的
                while(newList.length)
                {
                    b = true
                    this.workList.push({
                        id:newList.pop(),
                        resetTime:TM_wx3.nowMS()-Math.random()*5000,  //单位，ms
                        index:workIndex
                    })
                }

                if(b)
                {
                    UM_wx3.resetHourEarn();
	wx3_function(1097);
                    UM_wx3.needUpUser = true;
                    EM_wx3.dispatchEventWith(GameEvent.client.MONSTER_WORK_CHANGE)
                }
            },
        })
    }
	private wx3_functionX_12670(){console.log(7055)}

    public getWorkSave(){
        var def = []
        for(var i=0;i<this.workList.length;i++)
        {
            var oo = this.workList[i];
	wx3_function(7903);
            def.push(oo.id+'#'+Math.floor(oo.resetTime/1000)+'#'+oo.index);
        }
        return def.join(',');
    }

    public getNumObj(){
        var numObj = {};
	wx3_function(6353);
        for(var i=0;i<this.workList.length;i++)
        {
            var oo = this.workList[i];
            numObj[oo.id] = (numObj[oo.id] || 0) + 1;
        }
        return numObj;
    }
	private wx3_functionX_12671(){console.log(5207)}

    public getWorkNum(){
        return TecManager.getInstance().getSkillValue(22)
    }
    public getOpenWork(){
        return Math.ceil(this.getWorkNum()/10);
    }
	private wx3_functionX_12672(){console.log(3085)}

    public getWorkCD(id){
        var vo = MonsterVO.getObject(id);
        var disPerSec = Math.round(vo.speed)/10 * (1000/50)
        var cd = this.workLen/disPerSec*1000
        return Math.floor(cd*2 + 2000);
    }
	private wx3_functionX_12673(){console.log(7502)}

    public getWorkCoin(id,t?){
        var buffAdd = (1+BuffManager.getInstance().getCoinAdd()/100);
        return Math.ceil(this.getBaseWorkCoin(id)*(1+TecManager.getInstance().getSkillValue(21)/100 + MonsterManager.getInstance().getWorkAdd(id)/100)*buffAdd);
    }

    //基础挖矿效率
	private wx3_functionX_12674(){console.log(1354)}
    public getBaseWorkCoin(id){
        var vo = MonsterVO.getObject(id);
        if(!vo.coinAdd)
            vo.coinAdd =  Math.ceil(this.getWorkCD(id)/2000 + vo.cost*0.6 + vo.level*0.8)
        return vo.coinAdd;
    }
	private wx3_functionX_12675(){console.log(4678)}

    //传入的是秒
    public onTimer(tIn=0){
        var t = tIn*1000 || TM_wx3.nowMS();
        var cd24 = 24*3600*1000;
        for(var i=0;i<this.workList.length;i++)
        {
            var oo = this.workList[i];
	wx3_function(7900);
            if(!oo.resetTime)
            {
                oo.resetTime = t;
                continue;
            }
            if(t < oo.resetTime)//这个时间点已计算过了
                continue;
	wx3_function(500);
            var workCD = this.getWorkCD(oo.id);
            var isOver24 = (t - oo.resetTime) > cd24
            if(isOver24)
                var num = Math.floor(cd24 / workCD)
            else
                var num = Math.floor((t - oo.resetTime)/ workCD)
            if(num)
            {
                oo.resetTime += num*workCD;
	wx3_function(3629);
                var coin = this.getWorkCoin(oo.id,tIn)*num
                this.offlineEarn += coin;
                UM_wx3.addCoin(coin,true);
            }
            if(isOver24)
                oo.resetTime = t;
	wx3_function(6253);
        }
    }

    public getWorkList(index){
        var arr = [];
        for(var i=0;i<this.workList.length;i++)
        {
            var oo = this.workList[i];
	wx3_function(6554);
           if(oo.index == index)
           {
               arr.push(oo);
           }
        }
        return arr;
    }
	private wx3_functionX_12676(){console.log(2602)}

    public getListHourEarn(str){
        if(!str)
            return 0;
        var count = 0
        var arr = (str+'').split(',')
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i];
	wx3_function(828);
            var v1 = this.getWorkCD(id)
            var v2 = this.getWorkCoin(id)
            count += v2*(3600*1000/v1)
        }
        return Math.floor(count);
    }
	private wx3_functionX_12677(){console.log(3263)}

    public getHourEarn(index){
        var arr = this.getWorkList(index);
        var count = 0
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
	wx3_function(6457);
             var v1 = this.getWorkCD(id)
             var v2 = this.getWorkCoin(id)
            count += v2*(3600*1000/v1)
        }
        return Math.floor(count);
    }
	private wx3_functionX_12678(){console.log(8847)}

    public getTotalHourEarn(){
        var arr = MonsterManager.getInstance().getOpenMonster();
        var count = 0
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
	wx3_function(7869);
            var v1 = this.getWorkCD(id)
            var v2 = this.getWorkCoin(id)
            count += v2*(3600*1000/v1)*MonsterManager.getInstance().getMonsterNum(id)
        }
        return Math.floor(count);
    }
}