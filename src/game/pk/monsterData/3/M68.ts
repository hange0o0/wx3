class M68_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12962(){console.log(5888)}
    public preload_wx3(){
        AtkMVCtrl_wx3.getInstance().preLoadPNG('monster/enemy68_attack.png')
    }



    //取攻击力
	private wx3_functionX_12963(){console.log(8232)}
    protected getAtkerAtk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var atk = super.getAtkerAtk_wx3(user,target)
        if(!target.skillTemp[66])
            target.skillTemp[66] = {}
        if(!target.skillTemp[66][user.id])
            target.skillTemp[66][user.id] = 1
        atk = atk * (target.skillTemp[66][user.id])
        return atk;
    }
	private wx3_functionX_12964(){console.log(5775)}

    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var b = super.atk_wx3(user,target);
        if(b)
            target.skillTemp[66][user.id] = target.skillTemp[66][user.id] * user.getSkillValue(1)
        return b;
    }
}