class S313 extends SBase {
    constructor() {
        super();
    }

    //预加载
    public preload() {
        MonsterVO.getObject(41).preLoad();
    }


    public onSkill(player) {
        return this.addMonsterSkill(player,313,41,1)
    }
}