class S221 extends SBase {
    constructor() {
        super();
    }
    public onSkill(player) {
        var listener = new S221StateListener()
        var teamData = player.teamData;
        listener.owner = player;
        listener.hpRate = this.getSkillValue(221,2)/100;
        listener.endTime = PKData_wx3.getInstance().actionTime + this.getSkillValue(221,1) *1000;
        teamData.addStateLister(listener);
        return [];
    }
}


class S221StateListener extends PKStateListener_wx3 {
    public type = PKConfig_wx3.LISTENER_ATK
    public isSkill = 221;
    public hpRate
    constructor() {
        super();
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){
        if(target.getVO().isNearAtk())
        {
            var hp = Math.ceil(target.listenerData.hp*this.hpRate);
            target.addHp(hp);
        }
    }


}