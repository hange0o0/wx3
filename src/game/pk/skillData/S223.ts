class S223 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 112

    public onSkill(playerID) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(PD.getPlayer(playerID).teamData.enemy);
        var targets = [];
        var value = user.getSkillValue(1,true)
        for(var i=0;i<arr.length;i++)
        {
            var targetEnemy = arr[i];
            if(!targetEnemy.beSkillAble())
                continue;
            if(targetEnemy.dieTime)
                targetEnemy.addHp(-value*2)
            else
                targetEnemy.addHp(-value)
            targets.push(targetEnemy);
        }
        return targets;
    }
}