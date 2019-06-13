class S316 extends SBase {
    constructor() {
        super();
    }

    //预加载
    public preload() {
        MonsterVO.getObject(62).preLoad();
    }


    public onSkill(player) {
        return this.addMonsterSkill(player,316,62)
    }
}