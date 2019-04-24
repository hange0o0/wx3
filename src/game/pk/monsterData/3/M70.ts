class M70_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12966(){console.log(4267)}
    public atkBefore_wx3(user:PKMonsterData_wx3,actionTime){
        var endTime = actionTime  + this.getAtkMVCD(user)//这个时间后发出攻击时件(前摇)
        this.sendAtkBefore_wx3(user,user,actionTime,endTime)
    }

    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return 300;
    }
	private wx3_functionX_12967(){console.log(7549)}



    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        user.setDie();
        var PD = PKData_wx3.getInstance();
	wx3_function(2378);
        var arr = PD.getMonsterByNoTeam(user.getOwner().teamData);
        var atkrage = user.getSkillValue(1);
        for(var i=0;i<arr.length;i++)
        {
            var targetX = arr[i];
            var des = Math.abs(user.x - targetX.x);
	wx3_function(8482);
            if(des<=atkrage + targetX.getVO().width/2)
            {
                var hp = this.getAtkHp_wx3(user,targetX);
                targetX.beAtkAction({hp:hp,atker:user})
                user.addAtkHurt(hp)

                if(targetX.beSkillAble())
                {
                    var skillValue = user.getSkillValue(2);
	wx3_function(7022);
                    var buff = new PKBuffData_wx3()
                    buff.isDebuff = true;
                    buff.id = 70;
                    buff.value = skillValue;
                    buff.addValue('addSpeed',-skillValue);
                    buff.user = user;
	wx3_function(2996);
                    buff.endTime = PKData_wx3.getInstance().actionTime + 1000*user.getSkillValue(3);
                    targetX.addBuff(buff)

                    if(buff.ing)
                    {
                        PKData_wx3.getInstance().addVideo({
                            type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                            user:targetX,
                            keys:['speed-']
                        })
                    }
                }
            }
        }
        return true;
    }
}