class S220 extends SBase {
    constructor() {
        super();
    }

    public onSkill(playerID) {
        var cd = user.getSkillValue(1)*1000;
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(PD.getPlayer(playerID).teamData);
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            var buff = new PKBuffData()
            buff.user = user;
            buff.id = 220;
            buff.value = 1;
            buff.endTime = PD.actionTime + cd;
            buff.addState(PKConfig.STATE_MOMIAN);
            buff.addState(PKConfig.STATE_NOBEATK);
            target.addBuff(buff)

            PD.addVideo({
                type:PKConfig.VIDEO_MONSTER_ADD_STATE,
                user:target,
                keys:['momian']
            })
        }
        return arr;
    }
}