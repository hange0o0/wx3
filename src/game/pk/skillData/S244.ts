class S244 extends SBase {
    constructor() {
        super();
    }
    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData);
        var addValue = this.getSkillValue(244,1);
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            target.nohitTimes += addValue
        }
        return arr;
    }

}