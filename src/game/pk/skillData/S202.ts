class S202 extends SBase{
    constructor() {
        super();
    }

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();

        var listener = new S202StateListener()
        var teamData = player.teamData;
        listener.owner = player;
        listener.mvID = this.mvID1;
        listener.skillValue1 = Math.floor(this.getSkillValue(202,1,true)/2)
        listener.endTime = PD.actionTime + this.getSkillValue(202,2) *1000;
        teamData.addStateLister(listener);
        return []
    }

}

class S202StateListener extends PKStateListener_wx3 {
    public type = PKConfig_wx3.LISTENER_TIMER
    public isSkill = true;
    public actionTime
    public skillValue1
    constructor() {
        super();
        this.actionTime = PKData_wx3.getInstance().actionTime;
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){
        if(PKData_wx3.getInstance().actionTime - this.actionTime < 500)
            return;
        this.actionTime = PKData_wx3.getInstance().actionTime;

        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam((<PKPlayerData_wx3>this.owner).teamData);
        for(var i=0;i<arr.length;i++)
        {
            var targetEnemy = arr[i];
            targetEnemy.addHp(this.skillValue1)
        }
    }

    public onRemove(){

    }
}
