class WorkManager {

    private static _instance:WorkManager;

    public static getInstance():WorkManager {
        if (!this._instance)
            this._instance = new WorkManager();
        return this._instance;
    }

    public workHideTime = 3000;//挖矿时间
    public workStart = 70
    public workLen = 500
    public workList = []

    public initWork(arr){
        this.workList.length = 0;
        for(var i=0;i<arr.length;i++)
        {
            var temp = arr[i].split('#');
            this.workList.push({
                id:temp[0],
                bornTime:parseInt(temp[1])*1000,    //单位，ms
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
            def.push(oo.id+'#'+Math.floor(oo.bornTime/1000)+'#'+Math.floor(oo.resetTime/1000)+'#'+oo.index);
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
        return TecManager.getInstance().getTecLevel(22) + 3
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
        var vo = MonsterVO.getObject(id);
        return Math.ceil((this.getWorkCD(id)/10000 + vo.cost)*(1+TecManager.getInstance().getTecLevel(21)/100 + MonsterManager.getInstance().getWorkAdd(id)));
    }

    public onTimer(){
        var t = UM.nowMS();
        for(var i=0;i<this.workList.length;i++)
        {
            var oo = this.workList[i];
            var workCD = this.getWorkCD(oo.id);
            var num = Math.floor((t - oo.resetTime)/ workCD)
            if(num)
            {
                oo.resetTime += num*workCD;
                UM.addCoin(this.getWorkCoin(oo.id),true);
            }
        }
        WorkManager.getInstance().getWorkCD(1)/10000
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