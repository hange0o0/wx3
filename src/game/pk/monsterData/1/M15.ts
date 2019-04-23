class M15_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //a对B攻击到达时的逻辑（攻击正式生效）
    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var b = super.atk_wx3(user,target)
        if(b)
        {
            user.atk += Math.ceil(user.baseAtk*user.getSkillValue(1)/100)

            //PKData.getInstance().addVideo({
            //    type:PKConfig.VIDEO_MONSTER_ADD_STATE,
            //    user:user,
            //    key:1,
            //    stateType:1
            //})
        }
        return b;
    }
}