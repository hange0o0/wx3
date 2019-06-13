class S245 extends SBase {
    constructor() {
        super();
    }

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData);
        var num = this.getSkillValue(245,1);
        var addValue = this.getSkillValue(245,2,true);
        if(arr.length > num)
        {
            PD.randSort(arr)
            arr.length = num;
        }
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            target.manaHp += addValue
            PD.addVideo({
                type:PKConfig_wx3.VIDEO_MANAHP_CHANGE,
                user:target,
            })
        }
        return arr;
    }
}