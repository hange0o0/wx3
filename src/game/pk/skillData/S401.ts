class S401 extends SBase {
    constructor() {
        super();
    }

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData);
        var value = this.getSkillValue(401,1)/100;
        var cd = this.getSkillValue(401,2)
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(target.getVO().isNearAtk())
                continue;
            var buff = new PKBuffData_wx3()
            buff.id = 401;
            buff.value = value;
            buff.user = player;
            buff.endTime = PD.actionTime + cd;
            var keys = ['atk+']
            buff.addValue('atk',Math.ceil(value*target.baseAtk));
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