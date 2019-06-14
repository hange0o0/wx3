class S319 extends SBase{
    constructor() {
        super();
    }

    public onSkill(player) {
        var listener = new S319StateListener()
        var teamData = player.teamData;
        listener.owner = player;
        listener.skillValue1 = this.getSkillValue(319,1);
        listener.skillValue2 = this.getSkillValue(319,2)*1000;
        listener.endTime = Number.MAX_VALUE
        teamData.addStateLister(listener);
        return []

    }
}

class S319StateListener extends PKStateListener_wx3 {
    public type = PKConfig_wx3.LISTENER_TIMER
    public actionTime
    public skillValue1
    public skillValue2
    public cd = 0;
    constructor() {
        super();
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){
        if(this.cd<3)
        {
            this.cd ++;
            return;
        }

        if(this.skillValue1 <= 0)
        {
            this.endTime = 0;
            return;
        }
        this.cd = 0;
        this.skillValue1 --;
        var PD = PKData_wx3.getInstance();
        var mid = 65;
        var owner:PKPlayerData_wx3 = <PKPlayerData_wx3>this.owner
       var x = owner.teamData.atkRota == PKConfig_wx3.ROTA_LEFT ? PKConfig_wx3.appearPos:PKConfig_wx3.floorWidth + PKConfig_wx3.appearPos;
        var mData = owner.getMonsterCreateData({
            mid:mid,
            x:x,
            lastSkill:Number.MAX_VALUE,
            dieTime:PD.actionTime + this.skillValue2
        })
        PD.addMonster(mData);
    }

}