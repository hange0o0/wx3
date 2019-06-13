class S236 extends SBase {
    constructor() {
        super();
    }
    public onSkill(player) {
        var listener = new S236StateListener()
        var teamData = player.teamData;
        listener.owner = player;
        listener.mvID = this.mvID1;
        listener.addValue = this.getSkillValue(236,1,true);
        listener.endTime = PKData_wx3.getInstance().actionTime + this.getSkillValue(236,2) *1000;
        teamData.addStateLister(listener);
        return [];
    }


}


class S236StateListener extends PKStateListener_wx3 {
    public type = PKConfig_wx3.LISTENER_CREATE
    public isSkill = true;
    public addValue
    constructor() {
        super();
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){
        if(target.skillTemp[236])
            return;
        //if(target.getOwner().teamData != this.owner.getOwner().teamData)
        //    return;
        target.skillTemp[236] = true;

        target.atk += this.addValue
        PKData_wx3.getInstance().addVideo({
            type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
            user:target,
            keys:['atk+']
        })
    }
}