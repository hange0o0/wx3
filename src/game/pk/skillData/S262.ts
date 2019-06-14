class S262 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 112;
    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData.enemy);
        var value = this.getSkillValue(262,1,true);
        var list = [];
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(target.isHero())
                continue;
            if(target.hp < value)
            {
                target.setDie();
                list.push(target);
            }
        }
        return list;
    }
}