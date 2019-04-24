class M48_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12945(){console.log(9646)}
    public mvID1 = 200;

    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkX = 40
        //user.atkY = 65
    }

	private wx3_functionX_12946(){console.log(2151)}

    //伤害飞行时间
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return 100//Math.abs(user.x - target.x) + 100;
    }


	private wx3_functionX_12947(){console.log(9773)}

    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var b = super.atk_wx3(user,target);
        if(!b)
            return false;
        var PD = PKData_wx3.getInstance();
	wx3_function(3819);
        var arr = PD.getMonsterByTeam(user.getOwner().teamData.enemy);
        var atkRage = user.getSkillValue(1);
        var hurt = user.getSkillValue(2,true);
        for(var i=0;i<arr.length;i++)
        {
            var newTarget = arr[i];
	wx3_function(9972);
            if(newTarget == target)
                continue;

            if(!newTarget.canBeAtk(user))
                continue;
            var tDes = Math.abs(target.x - newTarget.x);
	wx3_function(1550);
            if(tDes > atkRage + newTarget.getVO().width/2)
                continue;

            newTarget.beAtkAction({hp:hurt})
            user.addAtkHurt(hurt)
        }
        return true;
    }
}