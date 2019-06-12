class S323 extends SBase {
    constructor() {
        super();
    }

    public onSkill(playerID) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(PD.getPlayer(playerID).teamData);
        var addValue = user.getSkillValue(1,true);
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            var type = 'hp+'
            target.maxHp += addValue
            target.addHp(addValue)

            PD.addVideo({
                type:PKConfig.VIDEO_MONSTER_ADD_STATE,
                user:target,
                keys:[type]
            })
        }
        return arr;
    }
}