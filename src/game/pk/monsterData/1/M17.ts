class M17_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //被攻击时的处理
    public beAtkAction_wx3(user,data){
        //{hp:hp,atker:user}
        if(data.atker)
            data.atker.addHp(-Math.ceil(user.getSkillValue(1,true)*user.getAtkRate(data.atker)));
    }
}