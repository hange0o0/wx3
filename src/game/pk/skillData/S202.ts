class S202 extends SBase{
    constructor() {
        super();
    }

    public onSkill(playerID) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(PD.getPlayer(playerID).teamData);
        for(var i=0;i<arr.length;i++)
        {
            var targetEnemy = arr[i];
            targetEnemy.addHp(this.getSkillValue(202,1,true))
        }
        return arr;
    }
}
