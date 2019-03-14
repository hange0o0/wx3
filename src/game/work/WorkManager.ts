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

    public initWork(arr){
        this.workList.length = 0;
        for(var i=0;i<arr.length;i++)
        {
            var temp = arr[i].split('#');
            this.workList.push({
                id:temp[0],
                resetTime:parseInt(temp[2])*1000,  //单位，ms
                index:temp[3]
            })
        }
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
        return Math.floor(cd*2 + 1000);
    }

    public getWorkCoin(id){
        return Math.ceil(this.getBaseWorkCoin(id)*(1+TecManager.getInstance().getSkillValue(21)/100 + MonsterManager.getInstance().getWorkAdd(id)));
    }

    //基础挖矿效率
    public getBaseWorkCoin(id){
        var vo = MonsterVO.getObject(id);
        if(!vo.coinAdd)
            vo.coinAdd =  Math.ceil(this.getWorkCD(id)/1000 + vo.cost/2 + vo.level/2)
        return vo.coinAdd;
    }

    //传入的是秒
    public onTimer(t=0){
        var t = t*1000 || TM.nowMS();
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
                UM.addCoin(this.getWorkCoin(oo.id)*num,true);
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
}