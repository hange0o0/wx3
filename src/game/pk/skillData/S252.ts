class S252 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 112
    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData.enemy);
        var num = this.getSkillValue(252,1)
        if(arr.length > num)
        {
            PD.randSort(arr)
        }
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(target.isHero())
                continue;
            target.setDie();
            num --;
            if(num <= 0)
                break;
        }
        return arr;
    }
}