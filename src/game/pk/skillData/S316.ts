class S316 extends SBase {
    constructor() {
        super();
    }

    //预加载
    public preload() {
        MonsterVO.getObject(62).preLoad();
    }


    public onSkill(playerID) {
        return this.addMonsterSkill(user,62)
    }
}