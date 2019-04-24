class M3_wx3 extends MBase_wx3{
    constructor() {
        super();
    }

	private wx3_functionX_12886(){console.log(3143)}
    public preload_wx3(){
        AtkMVCtrl_wx3.getInstance().preLoadPNG('monster/enemy3_attack.png')
    }

    public atkAction_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3,actionTime){
        super.atkAction_wx3(user,target,actionTime);
        //第二次伤害
	wx3_function(3968);
        var endTime = actionTime + this.getAtkArriveCD_wx3(user,target)+50;
        this.sendAtkAction_wx3(user,target,actionTime,endTime) //攻击起作用
        //第3次伤害
        var endTime = endTime+50;
        this.sendAtkAction_wx3(user,target,actionTime,endTime) //攻击起作用
    }

    //伤害飞行时间
	private wx3_functionX_12887(){console.log(5477)}
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return Math.abs(user.x - target.x) + 200;
    }



}