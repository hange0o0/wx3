class S216 extends SBase {
    constructor() {
        super();
    }
    public mvID1 = 30

    //生效时的逻辑
    public onSkill(playerID){

        var PD = PKData_wx3.getInstance();
        var list = PD.getMonsterByTeam(PD.getPlayer(playerID).teamData);
        var targets = [];
        var skillValue = user.getSkillValue(1);
        var addValue = user.getSkillValue(3,true);
        var cd = user.getSkillValue(2)*1000;
        for(var i=0;i<list.length;i++)
        {
            var target:PKMonsterData = list[i];

            var buff = new PKBuffData()
            buff.user = user;
            buff.id =  216;
            buff.value = skillValue;
            buff.endTime = PD.actionTime + cd;
            buff.addValue('atk',Math.ceil(skillValue/100*target.baseAtk))
            target.addBuff(buff)
            target.addHp(addValue)

            if(buff.ing)
            {
                PD.addVideo({
                    type:PKConfig.VIDEO_MONSTER_ADD_STATE,
                    user:target,
                    keys:['atk+']
                })
            }
            targets.push(target)
        }

        return targets
    }
}