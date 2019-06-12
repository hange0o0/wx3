class S245 extends SBase {
    constructor() {
        super();
    }

    public onSkill(playerID) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(PD.getPlayer(playerID).teamData);
        var num = user.getSkillValue(1);
        var addValue = user.getSkillValue(2,true);
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
                type:PKConfig.VIDEO_MANAHP_CHANGE,
                user:target,
            })
        }
        return arr;
    }
}