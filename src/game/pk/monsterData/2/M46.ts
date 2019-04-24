class M46_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12936(){console.log(2021)}
    public mvID2 = 8;

    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkX = 20
        user.atkY = 40
    }
	private wx3_functionX_12937(){console.log(9306)}

    //伤害飞行时间
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return Math.abs(user.x - target.x)*2 + 200;
    }


	private wx3_functionX_12938(){console.log(5773)}



    public skill_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var skillValue = user.getSkillValue(1);
        var buff = new PKBuffData_wx3()
        buff.id = 46;
	wx3_function(4335);
        buff.value = skillValue;
        buff.addValue('def',skillValue);
        buff.user = user;
        buff.endTime = PKData_wx3.getInstance().actionTime + 1000*user.getSkillValue(2);
        target.addBuff(buff)

        if(buff.ing)
        {
            PKData_wx3.getInstance().addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                user:target,
                keys:['def+']
            })
        }
    }
	private wx3_functionX_12939(){console.log(5727)}

    //
    public getSkillTarget_wx3(user:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData);
        var atkrage = user.getVO().getAtkDis() + 100;
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
	wx3_function(497);
            if(target.haveBuff(46))
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