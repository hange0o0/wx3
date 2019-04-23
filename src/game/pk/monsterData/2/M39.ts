class M39_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //被攻击时的处理
    public beAtkAction_wx3(user,data){
        var target = data.atker
        if(target && target.getVO().isNearAtk())
        {
            if(PKData_wx3.getInstance().random() < user.getSkillValue(1)/100)
            {
                var buff = new PKBuffData_wx3()
                buff.user = user;
                buff.isDebuff = true;
                buff.addState(PKConfig_wx3.STATE_YUN);
                buff.endTime = PKData_wx3.getInstance().actionTime + 1000*user.getSkillValue(2);
                target.addBuff(buff)
            }
        }
    }
}