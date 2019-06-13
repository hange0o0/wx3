class S241 extends SBase {
    constructor() {
        super();
    }



    public onSkill(player) {
        var listener = new S241StateListener()
        var teamData = player.teamData.enemy;
        listener.owner = player;
        listener.mvID = this.mvID1;
        listener.addValue = this.getSkillValue(241,1,true);
        listener.endTime = PKData_wx3.getInstance().actionTime + this.getSkillValue(241,2) *1000;
        teamData.addStateLister(listener);
        return [];
    }


}


class S241StateListener extends PKStateListener_wx3 {
    public type = PKConfig_wx3.LISTENER_CREATE
    public isSkill = true;
    public addValue
    constructor() {
        super();
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){
        //console.log(target.getOwner().teamData.enemy.id,this.owner.getOwner().teamData.id)
        //if(target.getOwner().teamData.enemy != this.owner.getOwner().teamData)
        //    return;

        target.addHp(-this.addValue)
    }
}