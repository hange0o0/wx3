class TecManager {

    private static _instance:TecManager;

    public static getInstance():TecManager {
        if (!this._instance)
            this._instance = new TecManager();
        return this._instance;
    }
	private wx3_functionX_12646(){console.log(8026)}
    public tecBase = {
        11:{'name':'科技革命',des:'提升主科技等级可增加怪物的种类',type:'coin',max:20,v1:-94716,v2:4.52,v3:5000},
        21:{'name':'挖矿加成',des:'增加怪物的挖矿效率',type:'coin',v1:0,v2:3,v3:2000},
        22:{'name':'矿坑容量',des:'增加一个新的挖矿位置',type:'coin',v1:0,v2:3,v3:500},
        31:{'name':'防守加成',des:'增加怪物的防守战力',type:'coin',v1:0,v2:3,v3:4000},
        32:{'name':'进攻加成',des:'增加怪物的进攻战力',type:'coin',v1:0,v2:3,v3:4000},
        33:{'name':'战队费用',des:'增加战斗队伍费用上限',type:'coin',v1:0,v2:3.7,v3:800},
        34:{'name':'战队容量',des:'增加战斗队伍队员上限',max:14-4,type:'coin',v1:0,v2:6,v3:3000},
        41:{'name':'技能加成',des:'增加技能卷轴威力',type:'coin',v1:0,v2:3.2,v3:4000},
        //8:{'name':'科技革命',des:'提升主科技等级可提高其它科技的等级上限',type:'diamond',v1:0,v2:0,v3:0},
    }
	private wx3_functionX_12647(){console.log(8431)}

    public tecList;

    public tecData;
    public maxSkillNum = 10;
    public skillCD = 2*3600;
	private wx3_functionX_12648(){console.log(4379)}

    public initTec(data){
       this.tecData = data || {};
        this.tecList = ObjectUtil.objToArray(this.tecBase);
        for(var s in this.tecBase)
        {
            this.tecBase[s].id = s;
	wx3_function(9385);
        }
        for(var i=0;i<this.tecList.length;i++)
        {
            this.tecList[i].index = i;
        }
        if(!this.tecData[11])
            this.tecData[11] = 1;
	wx3_function(2694);
    }

    public getDes(id){
        var str = this.tecBase[id].des
        var lv = this.getTecLevel(id)+1;
         switch(parseInt(id))
         {
             case 11:
             case 41:
                 return str;
             case 21:
             case 31:
             case 32:
                 return str + '\n' + MyTool.createHtml(this.getSkillValue(id) + '%',0xffff33)+ MyTool.createHtml(' -> ',0xFFFFFF) + MyTool.createHtml(this.getSkillValue(id,lv) + '%',0x33ff33);
             case 22:
             case 33:
             case 34:
                 return str + '\n' + MyTool.createHtml(this.getSkillValue(id),0xffff33) + MyTool.createHtml(' -> ',0xFFFFFF) + MyTool.createHtml(this.getSkillValue(id,lv) + '',0x66ff66);
         }
    }
	private wx3_functionX_12649(){console.log(291)}

    public getUnlockValue(floor){
        return  (floor-1)*10-3 + 1
    }

    public getSkillValue(id,lv?){
        lv = lv || this.getTecLevel(id)
        switch(parseInt(id))
        {
            case 11: return lv;
            case 21: return lv * 10;
            case 22: return lv + 3;
            case 31: return this.getForceLevelValue_6862(lv);
            case 32: return this.getForceLevelValue_6862(lv);
            case 33: return lv + 16;
            case 34: return lv + 4;
        }
    }
	private wx3_functionX_12650(){console.log(7202)}

    private getForceLevelValue_6862(lv){
        var force = 0
        for(var i=0;i<lv;i++)
        {
            force += (i+10)*5
        }
        return force;
    }
	private wx3_functionX_12651(){console.log(6764)}

    public getTecLevel(id){
        return this.tecData[id] || 0;
    }

    public getTecCost(id,lv?){
         lv = lv || (this.getTecLevel(id)+1);
	wx3_function(2463);
        var oo = this.tecBase[id]
        return MyTool.reInit(oo.v1 + Math.pow(lv,oo.v2)*oo.v3,3);
    }

    public getDefForce(){
        return this.getSkillValue(31)
    }
	private wx3_functionX_12652(){console.log(5364)}
    public getAtkForce(){
        return this.getSkillValue(32)
    }
    public getTeamCost(){
        return this.getSkillValue(33)
    }
	private wx3_functionX_12653(){console.log(5590)}
    public getTeamNum(){
        return this.getSkillValue(34)
    }

    public tecUp(id,fun?){
       var oo = this.tecBase[id]
        if(oo.type == 'diamond')
        {
            UM_wx3.addDiamond(-this.getTecCost(id))
        }
        else
        {
            UM_wx3.addCoin(-this.getTecCost(id))
        }
        this.tecData[id] = this.getTecLevel(id) + 1;
	wx3_function(9641);
        EM_wx3.dispatch(GameEvent.client.TEC_CHANGE)
        TaskManager.getInstance().testMainTask('tec',id)
        fun && fun();
    }

}