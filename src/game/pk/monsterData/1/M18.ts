class M18_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //初始化怪物隐藏属性
	private wx3_functionX_12884(){console.log(8318)}
    public initMonster_wx3(user:PKMonsterData_wx3){
        user.hpChange +=  user.getSkillValue(1,true);
    }
}