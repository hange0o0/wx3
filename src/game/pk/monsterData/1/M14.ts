class M14_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //被攻击时的处理
	private wx3_functionX_12878(){console.log(7849)}
    public beAtkAction_wx3(user,data){
        //{hp:hp,atker:user}
        if(data.atker && data.atker.getVO().isNearAtk())
        {
            var hp = Math.ceil(data.hp*user.getSkillValue(1)/100)
            data.atker.addHp(-hp);
            user.addHp(hp)
        }
    }
}