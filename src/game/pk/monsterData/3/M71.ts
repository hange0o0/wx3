class M71_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //取最终伤害
    public getAtkHp_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        if(target.mid == 99)
            return 1
        return super.getAtkHp_wx3(user,target) + Math.ceil(target.maxHp/100*user.getSkillValue(1));
    }

    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var b = super.atk_wx3(user,target);
        if(b && target.mid != 99)
        {
            var hp = this.getAtkHp_wx3(user,target);
            PKData_wx3.getInstance().addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_DOUBLE,
                user:user,
                value:hp,
            })
        }
        return b;
    }
}