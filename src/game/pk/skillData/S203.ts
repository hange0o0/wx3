class S203 extends SBase{
    constructor() {
        super();
    }

    public mvID1 = 103;

    //生效时的逻辑
    public onSkill(player){

        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData.enemy);
        var list = []
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(!target.beSkillAble())
                continue;
            list.push(target)

        }
        var num = this.getSkillValue(203,2);
        if(list.length > num)
        {
            ArrayUtil.sortByField(list,['hp'],[1])
            list.length = num;
        }
        for(var i=0;i<list.length;i++)
        {
            list[i].addHp(-this.getSkillValue(203,1,true))
        }
        return list;

    }
}