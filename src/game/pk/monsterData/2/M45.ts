class M45_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12932(){console.log(9749)}
    public mvID2 = 8;

    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkX = 20
        user.atkY = 40
    }
	private wx3_functionX_12933(){console.log(220)}

    //伤害飞行时间
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return Math.abs(user.x - target.x)*2 + 200;
    }


	private wx3_functionX_12934(){console.log(1003)}





    public skill_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var skillValue = user.getSkillValue(1);
	wx3_function(7694);
        var buff = new PKBuffData_wx3()
        buff.id = 45;
        buff.value = skillValue;
        buff.addValue('addSpeed',skillValue);
        buff.user = user;
        buff.endTime = PKData_wx3.getInstance().actionTime + 1000*user.getSkillValue(2);
	wx3_function(4394);
        target.addBuff(buff)

        if(buff.ing)
        {
            PKData_wx3.getInstance().addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                user:target,
                keys:['speed+']
            })
        }
    }
	private wx3_functionX_12935(){console.log(7086)}

    //
    public getSkillTarget_wx3(user:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData);
        var atkrage = user.getVO().getAtkDis() + 100;
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
	wx3_function(1313);
            if(target.haveBuff(45))
                continue;

            var des = Math.abs(user.x - target.x);
            if(des<=atkrage)
            {
                return [target]
            }
        }
        return [];
    }
}