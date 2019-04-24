class M42_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12931(){console.log(6738)}
    public onDie_wx3(user:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByNoTeam(user.getOwner().teamData);
        var atkrage = user.getSkillValue(1);
        var hp = user.getSkillValue(2,true);
        var cd = 1000*user.getSkillValue(3);
	wx3_function(2882);
        for(var i=0;i<arr.length;i++)
        {
            var targetX = arr[i];
            if(!targetX.beSkillAble())
                continue;
            var des = Math.abs(user.x - targetX.x);
	wx3_function(732);
            if(des<=atkrage + targetX.getVO().width/2)
            {
                var buff = new PKBuffData_wx3()
                buff.id = 16;
                buff.isDebuff = true;
                buff.value = hp
                buff.addValue('hpChange',-hp);
	wx3_function(296);
                buff.user = user;
                buff.endTime = PKData_wx3.getInstance().actionTime + cd;
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
}