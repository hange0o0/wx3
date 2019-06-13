class S324 extends SBase {
    constructor() {
        super();
    }

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData);
        var addValue = this.getSkillValue(324,1,true);
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            var type = 'atk+'
            target.atk += addValue

            PD.addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                user:target,
                keys:[type]
            })
        }
        return arr;
    }
}