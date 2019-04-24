class M73_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12971(){console.log(7839)}
    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var b = super.atk_wx3(user,target)
        if(b)
        {
            var hp = this.getAtkHp_wx3(user,target)
            user.addHp(Math.ceil(hp/100*user.getSkillValue(1)));
	wx3_function(2733);
        }
        return b;
    }
}