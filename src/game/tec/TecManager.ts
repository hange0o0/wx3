class TecManager {

    private static _instance:TecManager;

    public static getInstance():TecManager {
        if (!this._instance)
            this._instance = new TecManager();
        return this._instance;
    }
    public tecBase = {
        11:{'name':'科技革命',des:'提升主科技等级可增加怪物的种类',type:'diamond',v1:0,v2:0,v3:0},
        21:{'name':'挖矿加成',des:'增加挖矿时的金币收益',type:'coin',v1:0,v2:0,v3:0},
        22:{'name':'挖矿位置',des:'增加一个新的挖矿位置',type:'coin',v1:0,v2:0,v3:0},
        31:{'name':'防守加成',des:'增加防守时的战力加成',type:'coin',v1:0,v2:0,v3:0},
        32:{'name':'进攻加成',des:'增加进攻时的战力加成',type:'diamond',v1:0,v2:0,v3:0},
        33:{'name':'战队费用',des:'增加出战/防守队伍的费用上限',type:'diamond',v1:0,v2:0,v3:0},
        34:{'name':'战队容量',des:'增加出战/防守队伍的怪物数量上限',type:'diamond',v1:0,v2:0,v3:0},
        //8:{'name':'科技革命',des:'提升主科技等级可提高其它科技的等级上限',type:'diamond',v1:0,v2:0,v3:0},
    }

    public tecData;
    public initTec(data){
       this.tecData = data || {};
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
        return this.getTecLevel(31)*10
    }
    public getAtkForce(){
        return this.getTecLevel(32)*10
    }
    public getTeamCost(){
        return this.getTecLevel(33)+20
    }
    public getTeamNum(){
        return this.getTecLevel(34)+4
    }
}