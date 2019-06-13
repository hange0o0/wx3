class S206 extends SBase {
    constructor() {
        super();
    }
    public mvID1 = 128

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData);
        var selectTarget
        for(var i=0;i<arr.length;i++)
        {
            var temp = arr[i];
            if(temp.hp >= temp.maxHp)
                continue;

            temp.temp = temp.getHpRate();
            if(!selectTarget || selectTarget.temp > temp.temp)
                selectTarget = temp
        }
        if(selectTarget)
        {
            selectTarget.addHp(this.getSkillValue(206,1,true))
            return [selectTarget];
        }
        return [];
    }
}
