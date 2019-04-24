class M69_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12965(){console.log(3335)}
    public onDie_wx3(user:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData);
        var atkrage = user.getSkillValue(1);
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
	wx3_function(5236);

            var des = Math.abs(user.x - target.x);
            if(des<=atkrage + target.getVO().width/2)
            {
                var skillValue = user.getSkillValue(2);
                var buff = new PKBuffData_wx3()
                buff.id = 69;
	wx3_function(5864);
                buff.value = skillValue;
                buff.addValue('atk',Math.floor(target.baseAtk * skillValue/100));
                buff.user = user;
                buff.endTime = PKData_wx3.getInstance().actionTime + 1000*user.getSkillValue(3);
                target.addBuff(buff)

                if(buff.ing)
                {
                    PKData_wx3.getInstance().addVideo({
                        type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                        user:target,
                        keys:['atk+']
                    })
                }
            }
        }
    }
}