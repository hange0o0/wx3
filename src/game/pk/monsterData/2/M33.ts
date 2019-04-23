class M33_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkY = -30
    }

    //伤害飞行时间
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return Math.abs(user.x - target.x) + 100;
    }

    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var hp = Math.floor((1-target.getHpRate())*target.maxHp*0.35)
        var b = super.atk_wx3(user,target)
        if(b && target.mid != 99 && hp > 0)
        {
            hp = Math.min(hp,user.getSkillValue(1,true));
            target.beAtkAction({hp:hp})
            user.addAtkHurt(hp)
            PKData_wx3.getInstance().addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_DOUBLE,
                user:user,
                value:hp,
            })
        }
        return b;
    }
}