class M7_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //初始化怪物隐藏属性
	private wx3_functionX_12895(){console.log(3564)}
    public initMonster_wx3(user:PKMonsterData_wx3){
        user.doubleValue = user.getSkillValue(2)/100;
    }

    public atkAction_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3,actionTime){
        if(user.getHpRate() < user.getSkillValue(1)/100)
        {
            user.doubleRate = 1;
	wx3_function(3744);
        }
        super.atkAction_wx3(user,target,actionTime);
        user.doubleRate = 0
    }
}