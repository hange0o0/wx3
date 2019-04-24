//队伍数据
class PKTeamData_wx3 {
    public id  //1 or 2  or sys
    public atkRota = 0  //进攻方向  0左路出发，1右路出发
    public enemy:PKTeamData_wx3

	private wx3_functionX_12738(){console.log(9972)}
    public force = 0;//队伍战力





	private wx3_functionX_12739(){console.log(1112)}
    public hp  = 0 //城堡的血
    public def  = 0
    public autoDef  = 0//10 //防守方增加防御

    public toFront = 0;//前线出兵

	private wx3_functionX_12740(){console.log(1256)}
    public killNum = 0;//消灭单位数量
    public bornNum = 0;//生产单位数量

    public members = [];
    public posList = []; //全队上阵的顺序
    public stateObj = {};  //监听队伍中的状态，触发
	private wx3_functionX_12741(){console.log(8415)}
    constructor(obj?){
        if(obj)
            this.fill(obj);
        //this.autoDef = PKConfig.autoDef;
    }

    private wx3_fun_asdfasdfasdf_6940(){}
	private wx3_functionX_12742(){console.log(4367)}
    private wx3_fun_ast34_5983(){}

    public fill(obj)
    {
        for (var key in obj) {
            this[key] = obj[key];
	wx3_function(1808);
        }
    }

    public reInit(){

    }
	private wx3_functionX_12743(){console.log(8561)}

    public getTeamDef(){
        return Math.floor(this.def / 5)  + this.autoDef
    }

    //监听状态
    public addStateLister(listener:PKStateListener_wx3){
        if(!this.stateObj[listener.type])
            this.stateObj[listener.type] = [];
	wx3_function(6604);
        this.stateObj[listener.type].push(listener)
        //console.log('add')
    }
    //
    public testState(state,target:PKMonsterData_wx3){
        if(!this.stateObj[state] || this.stateObj[state].length == 0)
            return
        for(var i=0;i<this.stateObj[state].length;i++)
        {
            var listener:PKStateListener_wx3 = this.stateObj[state][i];
	wx3_function(1525);
            listener.actionFun(target)
        }
    }

    //
    public removeStateListener(listener:PKStateListener_wx3){
        var state = listener.type
        if(!state || !this.stateObj[state] || this.stateObj[state].length == 0)
            return
        ArrayUtil.removeItem(this.stateObj[state],listener);
	wx3_function(5754);
        listener.onRemove()
    }
    //
    public removeStateListerByOwner(owner){
        for(var state in this.stateObj)
        {
            for(var i=0;i<this.stateObj[state].length;i++)
            {
                var listener:PKStateListener_wx3 = this.stateObj[state][i];
	wx3_function(5448);
                if(!listener.stopDieRemove && listener.owner == owner)
                {
                    this.stateObj[state].splice(i,1);
                    i--;
                    listener.onRemove()
                }
            }
        }
    }
	private wx3_functionX_12744(){console.log(8746)}

    public onStateTimer(){
        for(var state in this.stateObj)
        {
            for(var i=0;i<this.stateObj[state].length;i++)
            {
                var listener:PKStateListener_wx3 = this.stateObj[state][i];
	wx3_function(6729);
                if(listener.endTime && listener.endTime <= PKData_wx3.getInstance().actionTime)
                {
                    this.stateObj[state].splice(i,1);
                    i--;
                    listener.onRemove()
                }
                else if(parseInt(state) == PKConfig_wx3.LISTENER_TIMER)
                {
                    this.stateObj[state][i].actionFun()
                }
            }
        }
    }
	private wx3_functionX_12745(){console.log(988)}



}