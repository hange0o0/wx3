class S322 extends SBase {
    constructor() {
        super();
    }

    //预加载
    public preload() {
        MonsterVO.getObject(76).preLoad();
    }


    public onSkill(player) {
        return this.addMonsterSkill(player,322,76)
    }
}