class S224 extends SBase {
    constructor() {
        super();

    }

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var teamData = player.teamData.enemy;
        var arr = PD.getMonsterByTeam(teamData);
        var targets = [];
        var value = this.getSkillValue(224,2,true)
        var rage = this.getSkillValue(224,1)
        var xx = PD.getFirstX(teamData.id) - teamData.atkRota*rage;
        for(var i=0;i<arr.length;i++)
        {
            var targetEnemy = arr[i];
            if(!targetEnemy.beSkillAble())
                continue;
            var des = Math.abs(targetEnemy.x - xx);
            if(des<=rage)
            {
                targetEnemy.addHp(-value)
                targets.push(targetEnemy);
            }
        }
        return targets;
    }
}