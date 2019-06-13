class S402 extends SBase {
    constructor() {
        super();
    }

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData);
        var value = this.getSkillValue(402,1);
        var cd = this.getSkillValue(402,2)
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            var buff = new PKBuffData_wx3()
            buff.id = 402;
            buff.value = value;
            buff.user = player;
            buff.endTime = PD.actionTime + cd;
            if(target.getVO().isNearAtk())
            {
                buff.addValue('def',value);
                var keys = ['def+']
            }

            target.addBuff(buff)
            if(buff.ing)
            {
                PKData_wx3.getInstance().addVideo({
                    type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                    user:target,
                    keys:keys
                })
            }
        }
        return [];
    }
}