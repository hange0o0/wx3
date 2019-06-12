class S222 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 30

    public onSkill(playerID) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(PD.getPlayer(playerID).teamData);
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            target.addHp(user.getSkillValue(1,true))
        }
        return arr;
    }
}