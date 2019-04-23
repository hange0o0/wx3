class M61_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    public atkBefore_wx3(user:PKMonsterData_wx3,actionTime){
        var endTime = actionTime + this.getAtkMVCD(user)//这个时间后发出攻击时件(前摇)
        this.sendAtkBefore_wx3(user,user,actionTime,endTime)
    }

    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return 300;
    }



    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        user.setDie();
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByNoTeam(user.getOwner().teamData);
        var atkrage = user.getSkillValue(1);
        for(var i=0;i<arr.length;i++)
        {
            var targetX = arr[i];
            var des = Math.abs(user.x - targetX.x);
            if(des<=atkrage + targetX.getVO().width/2)
            {
                var hp = this.getAtkHp_wx3(user,targetX);
                targetX.beAtkAction({hp:hp,atker:user})
                user.addAtkHurt(hp)

                var buff = new PKBuffData_wx3()
                buff.user = user;
                buff.isDebuff = true;
                buff.addState(PKConfig_wx3.STATE_YUN);
                buff.endTime = PKData_wx3.getInstance().actionTime + 1000*user.getSkillValue(2);
                targetX.addBuff(buff)
            }
        }
        return true;
    }

}