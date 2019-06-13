class S221 extends SBase {
    constructor() {
        super();
    }
    public onSkill(player) {
        var listener = new S221StateListener()
        var teamData = player.teamData;
        listener.owner = player;
        listener.hpRate = this.getSkillValue(221,1)/100;
        teamData.addStateLister(listener);
        return [];
    }
}


class S221StateListener extends PKStateListener_wx3 {
    public type = PKConfig_wx3.LISTENER_ATK
    public isSkill = true;
    public hpRate
    constructor() {
        super();
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){
        if(target.getVO().isNearAtk())
        {
            var hp = target.listenerData.hp;
            target.addHp(Math.ceil(hp*this.hpRate));
        }
    }


}