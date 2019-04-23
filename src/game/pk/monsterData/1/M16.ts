class M16_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //a对B攻击到达时的逻辑（攻击正式生效）
    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var b = super.atk_wx3(user,target)
        if(b)
        {
            this.addBuff(user,target)
        }
        return b;
    }

    //被攻击时的处理
    public beAtkAction_wx3(user,data){
        var target = data.atker
        if(target && target.getVO().isNearAtk())
        {
            this.addBuff(user,target)
        }
    }

    private addBuff(user,target){
        if(target.beSkillAble())
        {
            var skillValue = user.getSkillValue(1,true)
            var buff = new PKBuffData_wx3()
            buff.id = 16;
            buff.isDebuff = true;
            buff.value = skillValue
            buff.addValue('hpChange',-skillValue);
            buff.user = user;
            buff.endTime = PKData_wx3.getInstance().actionTime + 1000*user.getSkillValue(2);
            target.addBuff(buff)

            if(buff.ing)
            {
                PKData_wx3.getInstance().addVideo({
                    type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                    user:target,
                    keys:['hp-']
                })
            }
        }
    }
}