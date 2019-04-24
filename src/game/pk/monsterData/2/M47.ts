class M47_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12940(){console.log(2415)}
    public mvID1 = 104;
    public skill_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var skillValue = user.getSkillValue(1,true);
        target.manaHp += skillValue
        PKData_wx3.getInstance().addVideo({
            type:PKConfig_wx3.VIDEO_MANAHP_CHANGE,
            user:target,
        })
        //PKData.getInstance().addVideo({
        //    type:PKConfig.VIDEO_MONSTER_ADD_STATE,
        //    user:target,
        //    key:1,
        //    stateType:1
        //})
    }
	private wx3_functionX_12941(){console.log(1253)}

    //
    public getSkillTarget_wx3(user:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData);
        var atkrage = user.getVO().getAtkDis() + 100;
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
	wx3_function(4456);
            if(target.manaHp > 0)
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