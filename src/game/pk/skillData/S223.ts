class S223 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 112

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData.enemy);
        var targets = [];
        var value = this.getSkillValue(223,1,true)
        for(var i=0;i<arr.length;i++)
        {
            var targetEnemy = arr[i];
            if(!targetEnemy.beSkillAble())
                continue;
            targetEnemy.addHp(-value)
            targets.push(targetEnemy);
        }
        return targets;
    }
}