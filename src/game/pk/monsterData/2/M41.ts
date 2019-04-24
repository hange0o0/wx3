class M41_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //被攻击时的处理
	private wx3_functionX_12922(){console.log(3655)}
    public beAtkAction_wx3(user,data){
        var target = data.atker
        if(target && target.getVO().isNearAtk())
        {
            if(target.beSkillAble())
            {
                var skillValue = user.getSkillValue(1);
	wx3_function(3063);
                var buff = new PKBuffData_wx3()
                buff.id = 41;
                buff.isDebuff = true;
                buff.value = skillValue;
                buff.addValue('addSpeed',-skillValue);
                buff.user = user;
	wx3_function(7155);
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
        }
    }
}