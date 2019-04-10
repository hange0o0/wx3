class WorkManager {

    private static _instance:WorkManager;

    public static getInstance():WorkManager {
        if (!this._instance)
            this._instance = new WorkManager();
        return this._instance;
    }

    public workHideTime =0//3000;//挖矿时间
    public workStart = 0//70
    public workLen = 800//500
    public workList = []

    public offlineEarn = 0;

    public initWork(dataIn){
        this.workList.length = 0;
        if(!dataIn)
            return;
        var arr = dataIn.split(',')
        for(var i=0;i<arr.length;i++)
        {
            var temp = arr[i].split('#');
            this.workList.push({
                id:temp[0],
                resetTime:parseInt(temp[1])*1000,  //单位，ms
                index:temp[2]
            })
        }
    }

    public editWork(workIndex){
        var maxNum = this.getWorkNum();
        var localMax = (workIndex)*10;
        if(localMax <= maxNum)
            localMax = 10;
        else
            localMax = maxNum%10;

        var workList = this.getWorkList(workIndex);
        var strList = [];
        for(var i=0;i<workList.length;i++)
        {
            strList.push(workList[i].id)
        }

        PKPosUI.getInstance().show({
            title:'矿坑'+workIndex+'-工作怪物调整',
            chooseList:strList.join(','),
            maxNum:localMax,
            maxCost:Number.MAX_VALUE,
            fun:(list)=>{
                PKPosUI.getInstance().hide();
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
                        resetTime:TM.nowMS()-Math.random()*5000,  //单位，ms
                        index:workIndex
                    })
                }

                if(b)
                {
                    UM.resetHourEarn();
                    UM.needUpUser = true;
                    EM.dispatchEventWith(GameEvent.client.MONSTER_WORK_CHANGE)
                }
            },
        })
    }

    public getWorkSave(){
        var def = []
        for(var i=0;i<this.workList.length;i++)
        {
            var oo = this.workList[i];
            def.push(oo.id+'#'+Math.floor(oo.resetTime/1000)+'#'+oo.index);
        }
        return def.join(',');
    }

    public getNumObj(){
        var numObj = {};
        for(var i=0;i<this.workList.length;i++)
        {
            var oo = this.workList[i];
            numObj[oo.id] = (numObj[oo.id] || 0) + 1;
        }
        return numObj;
    }

    public getWorkNum(){
        return TecManager.getInstance().getSkillValue(22)
    }
    public getOpenWork(){
        return Math.ceil(this.getWorkNum()/10);
    }

    public getWorkCD(id){
        var vo = MonsterVO.getObject(id);
        var disPerSec = Math.round(vo.speed)/10 * (1000/50)
        var cd = this.workLen/disPerSec*1000
        return Math.floor(cd*2 + 2000);
    }

    public getWorkCoin(id,t?){
        var buffAdd = (1+BuffManager.getInstance().getCoinAdd()/100);
        return Math.ceil(this.getBaseWorkCoin(id)*(1+TecManager.getInstance().getSkillValue(21)/100 + MonsterManager.getInstance().getWorkAdd(id)/100)*buffAdd);
    }

    //基础挖矿效率
    public getBaseWorkCoin(id){
        var vo = MonsterVO.getObject(id);
        if(!vo.coinAdd)
            vo.coinAdd =  Math.ceil(this.getWorkCD(id)/2000 + vo.cost*0.6 + vo.level*0.8)
        return vo.coinAdd;
    }

    //传入的是秒
    public onTimer(tIn=0){
        var t = tIn*1000 || TM.nowMS();
        var cd24 = 24*3600*1000;
        for(var i=0;i<this.workList.length;i++)
        {
            var oo = this.workList[i];
            if(!oo.resetTime)
            {
                oo.resetTime = t;
                continue;
            }
            if(t < oo.resetTime)//这个时间点已计算过了
                continue;
            var workCD = this.getWorkCD(oo.id);
            var isOver24 = (t - oo.resetTime) > cd24
            if(isOver24)
                var num = Math.floor(cd24 / workCD)
            else
                var num = Math.floor((t - oo.resetTime)/ workCD)
            if(num)
            {
                oo.resetTime += num*workCD;
                var coin = this.getWorkCoin(oo.id,tIn)*num
                this.offlineEarn += coin;
                UM.addCoin(coin,true);
            }
            if(isOver24)
                oo.resetTime = t;
        }
    }

    public getWorkList(index){
        var arr = [];
        for(var i=0;i<this.workList.length;i++)
        {
            var oo = this.workList[i];
           if(oo.index == index)
           {
               arr.push(oo);
           }
        }
        return arr;
    }

    public getListHourEarn(str){
        if(!str)
            return 0;
        var count = 0
        var arr = (str+'').split(',')
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i];
            var v1 = this.getWorkCD(id)
            var v2 = this.getWorkCoin(id)
            count += v2*(3600*1000/v1)
        }
        return Math.floor(count);
    }

    public getHourEarn(index){
        var arr = this.getWorkList(index);
        var count = 0
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
             var v1 = this.getWorkCD(id)
             var v2 = this.getWorkCoin(id)
            count += v2*(3600*1000/v1)
        }
        return Math.floor(count);
    }

    public getTotalHourEarn(){
        var count = 0
        for(var i=0;i<this.workList.length;i++)
        {
            var id = this.workList[i].id;
            var v1 = this.getWorkCD(id)
            var v2 = this.getWorkCoin(id,null)
            count += v2*(3600*1000/v1)
        }
        return Math.floor(count);
    }
}