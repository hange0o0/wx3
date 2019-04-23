class M63_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    public atkBefore_wx3(user:PKMonsterData_wx3,actionTime){
        var endTime = actionTime  + this.getAtkMVCD(user)//这个时间后发出攻击时件(前摇)
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
        var skillValue = user.getSkillValue(2,true)
        //var cd = 1000*user.getSkillValue(3);
        for(var i=0;i<arr.length;i++)
        {
            var targetX = arr[i];
            var des = Math.abs(user.x - targetX.x);
            if(des<=atkrage + targetX.getVO().width/2)
            {
                var hp = this.getAtkHp_wx3(user,targetX);
                targetX.beAtkAction({hp:hp,atker:user})
                user.addAtkHurt(hp)

                if(targetX.beSkillAble())
                {
                    var buff = new PKBuffData_wx3()
                    buff.id = 63;
                    buff.value = skillValue
                    buff.addValue('hpChange',-skillValue);
                    buff.user = user;
                    //buff.endTime = PKData.getInstance().actionTime + cd;
                    targetX.addBuff(buff)

                    if(buff.ing)
                    {
                        PKData_wx3.getInstance().addVideo({
                            type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                            user:targetX,
                            keys:['hp-']
                        })
                    }
                }
            }
        }
        return true;
    }
}