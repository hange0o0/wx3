class M4_wx3 extends MBase_wx3{
    constructor() {
        super();
    }

    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var b = super.atk_wx3(user,target)
       if(b && PKData_wx3.getInstance().random() < user.getSkillValue(1)/100)
       {
           var buff = new PKBuffData_wx3()
           buff.user = user;
           buff.isDebuff = true;
           buff.addState(PKConfig_wx3.STATE_YUN);
           buff.endTime = PKData_wx3.getInstance().actionTime + 1000*user.getSkillValue(2);
           target.addBuff(buff)
       }
        return b;
    }

}