class S205 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 128
    //生效时的逻辑
    public onSkill(player){

        var PD = PKData_wx3.getInstance();
        var list = PD.getMonsterByTeam(player.teamData);
        var targets = [];
        var skillValue = this.getSkillValue(205,1);
        var addValue = this.getSkillValue(205,3,true);
        var cd = this.getSkillValue(205,2)*1000;
        for(var i=0;i<list.length;i++)
        {
            var target:PKMonsterData_wx3 = list[i];

            var buff = new PKBuffData_wx3()
            buff.user = player;
            buff.id = 205;
            buff.value = skillValue;
            buff.endTime = PD.actionTime + cd;
            buff.addValue('def',skillValue)
            target.addBuff(buff)
            target.addHp(addValue)

            if(buff.ing)
            {
                PD.addVideo({
                    type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                    user:target,
                    keys:['def+']
                })
            }
            targets.push(target)
        }

        return targets
    }
}