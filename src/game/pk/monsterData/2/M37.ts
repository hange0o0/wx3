class M37_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12914(){console.log(9364)}
    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var b = super.atk_wx3(user,target);
        if(!b)
            return false;
        //溅射
        var isToRight = user.x<target.x
        var PD = PKData_wx3.getInstance();
	wx3_function(4620);
        var arr = PD.getMonsterByTeam(user.getOwner().teamData.enemy);
        var atkRage = user.getVO().getAtkDis() + user.getSkillValue(2);
        var hitRate = user.getSkillValue(1)/100;
        for(var i=0;i<arr.length;i++)
        {
            var newTarget = arr[i];
	wx3_function(4776);
            if(newTarget == target)
                continue;
            if(isToRight)
            {
                if(user.x > newTarget.x)
                    continue
            }
            else if(user.x < newTarget.x)
                continue
            if(!newTarget.canBeAtk(user))
                continue;
	wx3_function(577);
            var tDes = Math.abs(user.x - newTarget.x);
            if(tDes > atkRage + newTarget.getVO().width/2)
                continue;

            var hp = Math.ceil(this.getAtkHp_wx3(user,newTarget)*hitRate);
            newTarget.beAtkAction({hp:hp})
            user.addAtkHurt(hp)
        }
        return true;
    }
}