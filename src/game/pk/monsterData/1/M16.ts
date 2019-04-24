class M16_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //a对B攻击到达时的逻辑（攻击正式生效）
	private wx3_functionX_12879(){console.log(5866)}
    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var b = super.atk_wx3(user,target)
        if(b)
        {
            this.addBuff_5626(user,target)
        }
        return b;
    }
	private wx3_functionX_12880(){console.log(349)}

    //被攻击时的处理
    public beAtkAction_wx3(user,data){
        var target = data.atker
        if(target && target.getVO().isNearAtk())
        {
            this.addBuff_5626(user,target)
        }
    }
	private wx3_functionX_12881(){console.log(5048)}

    private addBuff_5626(user,target){
        if(target.beSkillAble())
        {
            var skillValue = user.getSkillValue(1,true)
            var buff = new PKBuffData_wx3()
            buff.id = 16;
	wx3_function(2302);
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