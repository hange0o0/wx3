class M5_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    public initMonster_wx3(user:PKMonsterData_wx3){
        user.doubleRate = user.getSkillValue(1)/100;
        user.doubleValue = user.getSkillValue(2)/100;
    }
}