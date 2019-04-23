class M34_wx3 extends MBase_wx3 {
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
        var b = super.atk_wx3(user,target)
        if(b && target.beSkillAble())
        {
            var skillValue = user.getSkillValue(1);
            var buff = new PKBuffData_wx3()
            buff.id = 34;
            buff.isDebuff = true;
            buff.value = skillValue;
            buff.addValue('addSpeed',-skillValue);
            buff.user = user;
            buff.endTime = PKData_wx3.getInstance().actionTime + 1000*user.getSkillValue(2);
            target.addBuff(buff)

            if(buff.ing)
            {
                PKData_wx3.getInstance().addVideo({
                    type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                    user:target,
                    keys:['speed-']
                })
            }
        }
        return b;
    }
}