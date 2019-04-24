class M13_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12875(){console.log(9954)}
    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkAble =  false;
    }

    public onCreate_wx3(user:PKMonsterData_wx3){
        var listener = new M13StateListener();
	wx3_function(2262);
        listener.owner = user;
        user.getOwner().teamData.addStateLister(listener)
    }

    public onRemove_wx3(user:PKMonsterData_wx3){
        //var PD = PKData.getInstance();
        //var arr = PD.getMonsterByTeam(user.getOwner().teamData);
        //for(var i=0;i<arr.length;i++)
        //{
        //    var target:PKMonsterData = arr[i];
        //    target.cleanBuff(0,user);
        //}
        user.getOwner().teamData.removeStateListerByOwner(user)
    }
}

class M13StateListener extends PKStateListener_wx3 {
	private wx3_functionX_12876(){console.log(2961)}
    public type = PKConfig_wx3.LISTENER_TIMER
    public actionTime
    //public x
    constructor() {
        super();
        this.actionTime = PKData_wx3.getInstance().actionTime;
    }
	private wx3_functionX_12877(){console.log(3724)}

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){

        if(PKData_wx3.getInstance().actionTime - this.actionTime < 500)
            return;

	wx3_function(1832);
        this.actionTime = PKData_wx3.getInstance().actionTime;

        var user:PKMonsterData_wx3 = <PKMonsterData_wx3>this.owner;
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData.enemy);
        var atkrage = user.getSkillValue(1);
	wx3_function(7336);
        var list = [];

        for(var i=0;i<arr.length;i++)
        {
            var targetEnemy = arr[i];
            if(!targetEnemy.beSkillAble())
                continue;
	wx3_function(4736);
            var des = Math.abs(user.x - targetEnemy.x);
            if(des<=atkrage)
            {
                targetEnemy.addHp(-Math.ceil(user.getSkillValue(2,true)*user.getAtkRate(targetEnemy)*0.5))
            }
        }
        return list;
    }
}