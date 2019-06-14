class S407 extends SBase {
    constructor() {
        super();
    }
    public mvID1 = 112;
    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData.enemy);
        var item
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(!target.beSkillAble())
                continue;
            if(target.isHero())
                continue;
            if(!item || item.hp < target.hp)
                item = target;

        }
        if(!item)
        {
            return []
        }

        var hurt = item.atk;
        for(var i=0;i<arr.length;i++)
        {
            var targetEnemy = arr[i];
            if(!targetEnemy.beSkillAble())
                continue;
            targetEnemy.addHp(-hurt)
        }

        item.setDie();
        return [item];
    }
}