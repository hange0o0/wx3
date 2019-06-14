class S235 extends SBase {
    constructor() {
        super();
    }
    public onSkill(player) {
        var listener = new S235StateListener()
        var teamData = player.teamData;
        listener.owner = player;
        listener.mvID = this.mvID1;
        listener.addValue = this.getSkillValue(235,1,true);
        listener.endTime = PKData_wx3.getInstance().actionTime + this.getSkillValue(235,2) *1000;
        teamData.addStateLister(listener);
        return [];
    }


}


class S235StateListener extends PKStateListener_wx3 {
    public type = PKConfig_wx3.LISTENER_CREATE
    public isSkill = 235;
    public addValue
    constructor() {
        super();
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){
        if(target.skillTemp[235])
            return;
        //if(target.getOwner().teamData != this.owner.getOwner().teamData)
        //    return;
        target.skillTemp[235] = true;

        target.maxHp += this.addValue
        target.addHp(this.addValue)

        PKData_wx3.getInstance().addVideo({
            type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
            user:target,
            keys:['hp+']
        })
    }
}