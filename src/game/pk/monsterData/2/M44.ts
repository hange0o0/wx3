class M44_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }
    public mvID1 = 112;
	private wx3_functionX_12923(){console.log(6543)}
    public mvID2 = 8;

    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkX = 20
        user.atkY = 40
    }
	private wx3_functionX_12924(){console.log(1838)}


    //伤害飞行时间
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return Math.abs(user.x - target.x)*2 + 200;
    }

	private wx3_functionX_12925(){console.log(4954)}



    public onKill_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData.enemy);
	wx3_function(137);
        var atkRage = user.getSkillValue(1);
        var hurt = user.getSkillValue(2,true);
        target.stopReborn = true;
        for(var i=0;i<arr.length;i++)
        {
            var newTarget = arr[i];
	wx3_function(5327);
            if(newTarget == target)
                continue;
            if(!newTarget.canBeAtk(user))
                continue;
            var tDes = Math.abs(target.x - newTarget.x);
            if(tDes > atkRage)
                continue;
	wx3_function(5570);
            newTarget.beAtkAction({hp:hurt})
            user.addAtkHurt(hurt)
        }
        var mv = AtkMVCtrl_wx3.getInstance().playAniOn(target.id,this.mvID1)
        if(mv)
        {
            mv.scaleX = mv.scaleY = 1;
            //mv.x -= 10
            mv.y -= 40
        }

    }
}