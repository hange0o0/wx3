class S226 extends SBase{
    constructor() {
        super();
    }
    public mvID1 = 103;
    public onSkill(player) {
        var PD = PKData_wx3.getInstance();

        var listener = new S226StateListener()
        var teamData = player.teamData;
        listener.owner = player;
        listener.mvID = this.mvID1;
        listener.skillValue1 = -Math.floor(this.getSkillValue(226,1,true)/2)
        listener.endTime = PD.actionTime + this.getSkillValue(226,2) *1000;
        teamData.addStateLister(listener);
        return []
    }
}

class S226StateListener extends PKStateListener_wx3 {
    public type = PKConfig_wx3.LISTENER_TIMER
    public isSkill = 226;
    public actionTime
    public skillValue1
    constructor() {
        super();
        this.actionTime = PKData_wx3.getInstance().actionTime;
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){
        if(PKData_wx3.getInstance().actionTime - this.actionTime < 1000)
            return;
        this.actionTime = PKData_wx3.getInstance().actionTime;

        var PD = PKData_wx3.getInstance();
        var teamData = (<PKPlayerData_wx3>this.owner).teamData.enemy;
        var arr = PD.getMonsterByTeam(teamData);
        var value = this.skillValue1
        while(true)
        {
            var targetEnamy = PD.randomOne(arr,true)
            if(!targetEnamy)
                return [];
            if(targetEnamy.beSkillAble())
            {
                targetEnamy.addHp(-value)
                AtkMVCtrl_wx3.getInstance().sSkillMV(226,targetEnamy)
                return [targetEnamy]
            }
        }
    }

    public onRemove(){

    }
}