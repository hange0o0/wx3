class M67_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //初始化怪物隐藏属性
	private wx3_functionX_12961(){console.log(5432)}
    public initMonster_wx3(user:PKMonsterData_wx3){
        user.nohitTimes += user.getSkillValue(1);
    }
}