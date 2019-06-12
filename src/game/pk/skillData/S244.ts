class S244 extends SBase {
    constructor() {
        super();
    }
    public onSkill(playerID) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(PD.getPlayer(playerID).teamData);
        var addValue = user.getSkillValue(1);
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            target.nohitTimes += addValue
        }
        return arr;
    }

}