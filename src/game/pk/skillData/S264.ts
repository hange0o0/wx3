class S264 extends SBase {
    constructor() {
        super();
    }

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData);
        var cd = 1000*this.getSkillValue(264,1);
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];

            var buff = new PKBuffData_wx3()
            buff.id = 264;
            buff.user = player;
            buff.addState(PKConfig_wx3.STATE_MOMIAN);
            buff.endTime = PD.actionTime + cd
            target.addBuff(buff)
        }
        return arr;
    }
}