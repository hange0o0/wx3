class S278 extends SBase {
    constructor() {
        super();
    }

    public onSkill(playerID) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(PD.getPlayer(playerID).teamData.enemy);
        var value = user.getSkillValue(1);
        var cd = user.getSkillValue(2)*1000
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(!target.beSkillAble())
                continue;

            var buff = new PKBuffData()
            buff.id = 278;
            buff.value = value;
            buff.user = user;
            buff.addValue('def',-value);
            buff.isDebuff = true;
            buff.endTime = PD.actionTime + cd;
            target.addBuff(buff)

            if(buff.ing)
            {
                PD.addVideo({
                    type:PKConfig.VIDEO_MONSTER_ADD_STATE,
                    user:target,
                    keys:['def-']
                })
            }
        }
        return arr;
    }
}