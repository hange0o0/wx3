class S243 extends SBase {
    constructor() {
        super();
    }

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData);
        var addValue = this.getSkillValue(243,1);
        var addValue2 = this.getSkillValue(243,2,true);
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            target.nohitTimes += addValue
            target.addHp(addValue2)
        }
        return arr;
    }
}