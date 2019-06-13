class S276 extends SBase {
    constructor() {
        super();
    }

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData.enemy);
        var value = this.getSkillValue(276,1);
        var cd = this.getSkillValue(276,2)*1000
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(!target.beSkillAble())
                continue;

            var buff = new PKBuffData_wx3()
            buff.id = 276;
            buff.value = value;
            buff.user = player;
            buff.addValue('addSpeed',-value);
            buff.isDebuff = true;
            buff.endTime = PD.actionTime + cd;
            target.addBuff(buff)

            if(buff.ing)
            {
                PD.addVideo({
                    type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                    user:target,
                    keys:['speed-']
                })
            }
        }
        return arr;
    }
}
