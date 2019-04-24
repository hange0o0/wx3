class M2_wx3 extends MBase_wx3{
    constructor() {
        super();
    }

    //初始化怪物隐藏属性
	private wx3_functionX_12885(){console.log(6823)}
    public initMonster_wx3(user:PKMonsterData_wx3){
        user.missRate =  user.getSkillValue(1)/100;
    }


}