class S226 extends SBase {
    constructor() {
        super();
    }
    public mvID1 = 102;
    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var teamData = player.teamData.enemy;
        var arr = PD.getMonsterByTeam(teamData);
        var value = this.getSkillValue(226,1,true)
        while(true)
        {
            var target = PD.randomOne(arr,true)
            if(!target)
                return [];
            if(target.beSkillAble())
            {
                target.addHp(-value)
                return [target]
            }
        }
    }
}