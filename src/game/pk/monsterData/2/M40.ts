class M40_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //被攻击时的处理
	private wx3_functionX_12920(){console.log(4899)}
    public beAtkAction_wx3(user,data){
        var target = data.atker
        if(target && target.getVO().isNearAtk())
        {
            if(target.beSkillAble())
            {
                var skillValue = user.getSkillValue(1);
	wx3_function(8203);
                var buff = new PKBuffData_wx3()
                buff.id = 40;
                buff.isDebuff = true;
                buff.value = skillValue;
                buff.addValue('def',-skillValue);
                buff.user = user;
	wx3_function(2868);
                buff.endTime = PKData_wx3.getInstance().actionTime + 1000*user.getSkillValue(2);
                target.addBuff(buff)

                if(buff.ing)
                {
                    PKData_wx3.getInstance().addVideo({
                        type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                        user:target,
                        keys:['def-']
                    })
                }
            }
        }
    }
}