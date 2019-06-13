class S317 extends SBase {
    constructor() {
        super();
    }

    //预加载
    public preload() {
        MonsterVO.getObject(63).preLoad();
    }


    public onSkill(player) {
        return this.addMonsterSkill(player,317,63)
    }
}