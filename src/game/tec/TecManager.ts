class TecManager {

    private static _instance:TecManager;

    public static getInstance():TecManager {
        if (!this._instance)
            this._instance = new TecManager();
        return this._instance;
    }
    public tecBase = {
        11:{'name':'科技革命',des:'提升主科技等级可增加怪物的种类',type:'lv',v1:0,v2:0,v3:0},
        21:{'name':'挖矿加成',des:'增加挖矿时的金币收益',type:'coin',v1:0,v2:0,v3:0},
        22:{'name':'挖矿位置',des:'增加一个新的挖矿位置',type:'coin',v1:0,v2:0,v3:0},
        31:{'name':'防守加成',des:'增加防守时的战力加成',type:'coin',v1:0,v2:0,v3:0},
        32:{'name':'进攻加成',des:'增加进攻时的战力加成',type:'coin',v1:0,v2:0,v3:0},
        33:{'name':'战队费用',des:'增加战斗队伍费用上限',type:'coin',v1:0,v2:0,v3:0},
        34:{'name':'战队容量',des:'增加战斗队伍队员上限',type:'coin',v1:0,v2:0,v3:0},
        //8:{'name':'科技革命',des:'提升主科技等级可提高其它科技的等级上限',type:'diamond',v1:0,v2:0,v3:0},
    }

    public tecList;

    public tecData;
    public maxSkillNum = 10;
    public skillCD = 2*3600;

    public initTec(data){
       this.tecData = data || {};
        if(!this.tecData.cd)
        {
            this.tecData.cd = {v:0,t:0}
        }
        this.tecList = ObjectUtil.objToArray(this.tecBase);
        for(var s in this.tecBase)
        {
            this.tecBase[s].id = s;
        }
    }

    public getDes(id){
        var str = this.tecBase[id].des
        var lv = this.getTecLevel(id)+1;
         switch(id)
         {
             case 11:
                 return str;
             case 21:
             case 31:
             case 32:
                 return str + '\n' + this.getSkillValue(id) + '% -> ' + this.getSkillValue(id,lv) + '%';
             case 22:
             case 33:
             case 34:
                 return str + '\n' + this.getSkillValue(id) + ' -> ' + this.getSkillValue(id,lv) + '';

         }
    }

    public getSkillValue(id,lv?){
        lv = lv || this.getTecLevel(id)
        switch(id)
        {
            case 11: return lv;
            case 21: return lv * 10;
            case 22: return lv + 3;
            case 31: return lv * 10;
            case 32: return lv * 10;
            case 33: return lv + 20;
            case 34: return lv + 4;
        }
    }

    public getTecLevel(id){
        return this.tecData[id] || 0;
    }

    public getTecCost(id,lv?){
         lv = lv || (this.getTecLevel(id)+1);
        var oo = this.tecBase[id]
        return Math.floor(oo.v1 + Math.pow(lv,oo.v2)*oo.v3);
    }

    public getDefForce(){
        return this.getSkillValue(31)
    }
    public getAtkForce(){
        return this.getSkillValue(32)
    }
    public getTeamCost(){
        return this.getSkillValue(33)
    }
    public getTeamNum(){
        return this.getSkillValue(34)
    }

    public tecUp(id){
       var oo = this.tecBase[id]
        if(oo.type == 'diamond')
        {
            UM.addDiamond(this.getTecCost(id))
        }
        else
        {
            UM.addCoin(this.getTecCost(id))
        }
        this.tecData[id] = this.getTecLevel(id) + 1;
        EM.dispatch(GameEvent.client.TEC_CHANGE)
    }


    public addSkill(v){
        if(!v)
            return;
        this.resetSkill();
        if(this.tecData.cd.v >= this.maxSkillNum)
            this.tecData.cd.t = TM.now();
        this.tecData.cd.v += v;

        UM.needUpUser = true;
    }

    private resetSkill(){
        var v = this.skillCD;
        var t = TM.now();
        var add =  Math.floor((t - this.tecData.cd.t)/v)
        if(add > 0)
        {
            this.tecData.cd.v = Math.min(this.maxSkillNum,this.tecData.cd.v + add);
            this.tecData.cd.t = this.tecData.cd.t + add*v;
            EM.dispatchEventWith(GameEvent.client.energy_change)
        }
    }

    public getSkill(){
        this.resetSkill();
        return this.tecData.cd.v;
    }

    public getNextSkillCD(){
        var v = this.skillCD;
        this.resetSkill();
        return  this.tecData.cd.t + v -  TM.now();
    }
}