class S220 extends SBase {
    constructor() {
        super();
    }

    public onSkill(player) {
        var cd = this.getSkillValue(220,1)*1000;
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData);
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            var buff = new PKBuffData_wx3()
            buff.user = player;
            buff.id = 220;
            buff.value = 1;
            buff.endTime = PD.actionTime + cd;
            buff.addState(PKConfig_wx3.STATE_MOMIAN);
            buff.addState(PKConfig_wx3.STATE_NOBEATK);
            target.addBuff(buff)

            PD.addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                user:target,
                keys:['momian']
            })
        }
        return arr;
    }
}