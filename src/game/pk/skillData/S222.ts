class S222 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 128

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData);
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            target.addHp(this.getSkillValue(222,1,true))
        }
        return arr;
    }
}