class S241 extends SBase {
    constructor() {
        super();
    }



    public onSkill(playerID) {
        var listener = new S241StateListener()
        var teamData = PKData_wx3.getInstance().getPlayer(playerID).teamData.enemy;
        listener.owner = user;
        listener.mvID = this.mvID1;
        listener.addValue = user.getSkillValue(1,true);
        listener.endTime = PKData_wx3.getInstance().actionTime + user.getSkillValue(2) *1000;
        teamData.addStateLister(listener);
        return [];
    }


}


class S241StateListener extends PKStateListener {
    public type = PKConfig.LISTENER_CREATE
    public addValue
    constructor() {
        super();
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData){
        //console.log(target.getOwner().teamData.enemy.id,this.owner.getOwner().teamData.id)
        //if(target.getOwner().teamData.enemy != this.owner.getOwner().teamData)
        //    return;

        target.addHp(-this.addValue)
    }
}