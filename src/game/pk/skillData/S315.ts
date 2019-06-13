class S315 extends SBase {
    constructor() {
        super();
    }

    //预加载
    public preload() {
        MonsterVO.getObject(61).preLoad();
    }


    public onSkill(player) {
        return this.addMonsterSkill(player,315,61)
    }
}