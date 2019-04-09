class BuffManager {
    private static _instance:BuffManager;
    public static getInstance():BuffManager {
        if (!this._instance)
            this._instance = new BuffManager();
        return this._instance;
    }

    public lastBuffValue = {}
    public buffCD = 24*3600*3
    public buffBase = {
        1: {id: 1, type: 'atk', value: 30},
        2: {id: 2, type: 'atk', value: 30},
        3: {id: 3, type: 'def', value: 30},
        4: {id: 4, type: 'def', value: 30},
        5: {id: 5, type: 'work', value: 20},
        6: {id: 6, type: 'work', value: 20},
        7: {id: 7, type: 'work', value: 20},
        8: {id: 8, type: 'work', value: 20},
    }

    //定时器处理BUFF
    public onTimer(){
        var b = false
        var t = TM.now()
        for(var s in UM.shareUser)
        {
            var user = UM.shareUser[s];
            user.openid = s;
            if(!user ||  t- user.time > this.buffCD)
            {
                var buffID = this.getUserBuff(s)
                if(buffID)
                {
                    delete UM.buffUser[buffID];
                }
                delete UM.shareUser[s]
                b = true;
            }
        }
        if(b)
        {
            UM.resetHourEarn();
            UM.needUpUser = true;
            EM.dispatch(GameEvent.client.BUFF_CHANGE)
        }
    }

    public getBuffUser(id,t?){
        t = t || TM.now();
         var openid = UM.buffUser[id];
        if(openid)
        {
             var user = UM.shareUser[openid];
            if(!user ||  t- user.time > this.buffCD)
            {
                delete UM.buffUser[id];
                delete UM.shareUser[openid];
                EM.dispatch(GameEvent.client.BUFF_CHANGE)
                return null;
            }
            if(user && user.time > t)
                return null;

            return user;
        }
        return null;
    }

    public getUserBuff(openid){
        for(var s in UM.buffUser)
        {
            if(UM.buffUser[s] == openid)
                return s
        }
        return null;
    }


    public deleteBuff(id)
    {
        delete UM.buffUser[id];
        UM.resetHourEarn();
        UM.needUpUser = true;
        EM.dispatch(GameEvent.client.BUFF_CHANGE)
    }


    public addBuff(id,openid)
    {
        var oldID;
        for(var s in UM.buffUser)
        {
            if(UM.buffUser[s] == openid)
            {
                oldID = s;
                break;
            }
        }
        if(oldID)
        {
            if(UM.buffUser[id])//原来位置有
                UM.buffUser[oldID] = UM.buffUser[id];
            else
                delete UM.buffUser[oldID]
        }
        UM.buffUser[id] = openid
        UM.needUpUser = true;
        UM.resetHourEarn();
        EM.dispatch(GameEvent.client.BUFF_CHANGE)
    }

    private getAdd(type,time){
        time = time || TM.now()
        if(this.lastBuffValue[type] && this.lastBuffValue[type].time==time)//1秒内只计算一次
            return this.lastBuffValue[type].value;
        var add = 0;
        for(var s in this.buffBase)
        {
            if(this.buffBase[s].type==type && this.getBuffUser(s,time))
            {
                add += this.buffBase[s].value
            }
        }
        this.lastBuffValue[type] = {time:time,value:add};
        return add;
    }

    public getForceAdd(){
        return 0//this.getAdd('atk',t)
    }

    public getCoinAdd(){
        return 0//this.getAdd('work',t)
    }

    //public getDefAdd(t?){
    //    return this.getAdd('def',t)
    //}

}