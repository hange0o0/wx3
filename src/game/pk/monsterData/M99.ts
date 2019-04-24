class M99_wx3 extends MBase_wx3{
    constructor() {
        super();
    }

	private wx3_functionX_12776(){console.log(6158)}
    public onCreate_wx3(user:PKMonsterData_wx3){
        user.momian = true
    }

    public beAtkAction_wx3(user,data){
        data.atker.getOwner().teamData.def ++;
	wx3_function(4878);
        PKData_wx3.getInstance().addVideo({
            type:PKConfig_wx3.VIDEO_TEAM_DEF,
            user:data.atker
        })
        PKData_wx3.getInstance().addVideo({
            type:PKConfig_wx3.VIDEO_MONSTER_ATK,
            user:user
        })

        if(user.die)
        {
            PKData_wx3.getInstance().currentState = 'pk'
            PKData_wx3.getInstance().addVideo({
                type:PKConfig_wx3.VIDEO_TEAM_DEF2,
                user:data.atker
            })
        }

    }
}