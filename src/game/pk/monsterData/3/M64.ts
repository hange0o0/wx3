class M64_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //伤害飞行时间
	private wx3_functionX_12954(){console.log(1796)}
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return Math.abs(user.x - target.x) + 200;
    }



	private wx3_functionX_12955(){console.log(5069)}
    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var b = super.atk_wx3(user,target)
        if(b && target.mid != 99)
        {
            var hp = user.getSkillValue(1,true);
            target.beAtkAction({hp:hp})
            user.addAtkHurt(hp)
            PKData_wx3.getInstance().addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_DOUBLE,
                user:user,
                value:hp,
            })
        }
        return b;
    }
	private wx3_functionX_12956(){console.log(1081)}


}