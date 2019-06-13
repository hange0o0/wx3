class S319 extends SBase {
    constructor() {
        super();
    }

    //预加载
    public preload() {
        MonsterVO.getObject(65).preLoad();
    }


    public onSkill(player) {
        return this.addMonsterSkill(player,319,65,0,true)
    }
}