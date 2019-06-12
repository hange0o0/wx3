class S226 extends SBase {
    constructor() {
        super();
    }
    public mvID1 = 102;
    public onSkill(playerID) {
        var PD = PKData_wx3.getInstance();
        var teamData = PD.getPlayer(playerID).teamData.enemy;
        var arr = PD.getMonsterByTeam(teamData);
        var value = user.getSkillValue(1,true)
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