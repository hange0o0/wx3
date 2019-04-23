class M43_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //private mvID = 103;
    public mvID2 = 8;

    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkX = 20
        user.atkY = 40
    }


    //伤害飞行时间
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return Math.abs(user.x - target.x)*2 + 200;
    }





    public skill_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        //var buff = new PKBuffData()
        //buff.user = user;
        //buff.addState(PKConfig.STATE_MOMIAN);
        //buff.endTime = PKData.getInstance().actionTime + 1000*user.getSkillValue(1);
        //target.addBuff(buff)

        var buff = new PKBuffData_wx3()
        var skillValue = user.getSkillValue(2,true);
        buff.id = 43;
        buff.value = skillValue;
        buff.user = user;
        buff.addValue('hpChange',skillValue);
        buff.addState(PKConfig_wx3.STATE_MOMIAN);
        buff.endTime = PKData_wx3.getInstance().actionTime + 1000*user.getSkillValue(1);
        target.addBuff(buff)

        PKData_wx3.getInstance().addVideo({
            type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
            user:target,
            keys:['hp+','momian']
        })
    }

    //
    public getSkillTarget_wx3(user:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData);
        var atkrage = user.getVO().getAtkDis() + 100;
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(target.haveBuff(43))
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