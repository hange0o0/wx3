class S315 extends SBase {
    constructor() {
        super();
    }

    //预加载
    public preload() {
        MonsterVO.getObject(61).preLoad();
    }


    public onSkill(playerID) {
        return this.addMonsterSkill(user,61)
    }
}