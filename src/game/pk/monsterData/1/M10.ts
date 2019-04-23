class M10_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    public mvID1 = 128;

    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkAble =  false;
    }



    public skill_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        target.addHp(user.getSkillValue(1,true))
    }

    //治疗1个单位
    public getSkillTarget_wx3(user:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData);
        var atkrage = user.getVO().getAtkDis() + 100;
        var selectTarget
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(target.hp >= target.maxHp)
                continue;

            var des = Math.abs(user.x - target.x);
            if(des<=atkrage)
            {
                target.temp = target.getHpRate();
                if(!selectTarget || selectTarget.temp > target.temp)
                    selectTarget = target
            }
        }
        if(selectTarget)
        {
           return [selectTarget]
        }
        return [];
    }
}