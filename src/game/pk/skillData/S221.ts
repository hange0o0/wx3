class S221 extends SBase {
    constructor() {
        super();
    }
    public onSkill(playerID) {
        var listener = new S221StateListener()
        var teamData = PKData_wx3.getInstance().getPlayer(playerID).teamData;
        listener.owner = user;
        listener.hpRate = user.getSkillValue(1)/100;
        teamData.addStateLister(listener);
        return [];
    }
}


class S221StateListener extends PKStateListener {
    public type = PKConfig.LISTENER_ATK
    public hpRate
    constructor() {
        super();
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData){
        if(target.getVO().isNearAtk())
        {
            var hp = target.listenerData.hp;
            target.addHp(Math.ceil(hp*this.hpRate));
        }
    }


}