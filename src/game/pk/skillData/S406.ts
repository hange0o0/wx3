class S406 extends SBase {
    constructor() {
        super();
    }
    public mvID1 = 103;
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

        var myList = PD.getMonsterByTeam(player.teamData);
        var hp = Math.ceil(item.hp/myList.length);
        for(var i=0;i<myList.length;i++)
        {
            myList[i].addHp(hp)
        }

        item.setDie();
        return [item];
    }
}