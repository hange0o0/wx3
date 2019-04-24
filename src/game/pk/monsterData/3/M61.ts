class M61_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12948(){console.log(2092)}
    public atkBefore_wx3(user:PKMonsterData_wx3,actionTime){
        var endTime = actionTime + this.getAtkMVCD(user)//这个时间后发出攻击时件(前摇)
        this.sendAtkBefore_wx3(user,user,actionTime,endTime)
    }

    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return 300;
    }
	private wx3_functionX_12949(){console.log(2933)}



    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        user.setDie();
        var PD = PKData_wx3.getInstance();
	wx3_function(1252);
        var arr = PD.getMonsterByNoTeam(user.getOwner().teamData);
        var atkrage = user.getSkillValue(1);
        for(var i=0;i<arr.length;i++)
        {
            var targetX = arr[i];
            var des = Math.abs(user.x - targetX.x);
	wx3_function(1119);
            if(des<=atkrage + targetX.getVO().width/2)
            {
                var hp = this.getAtkHp_wx3(user,targetX);
                targetX.beAtkAction({hp:hp,atker:user})
                user.addAtkHurt(hp)

                var buff = new PKBuffData_wx3()
                buff.user = user;
	wx3_function(8170);
                buff.isDebuff = true;
                buff.addState(PKConfig_wx3.STATE_YUN);
                buff.endTime = PKData_wx3.getInstance().actionTime + 1000*user.getSkillValue(2);
                targetX.addBuff(buff)
            }
        }
        return true;
    }
	private wx3_functionX_12950(){console.log(2874)}

}