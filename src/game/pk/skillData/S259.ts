class S259 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 111;
    public onSkill(playerID) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(PD.getPlayer(playerID).teamData.enemy);
        var value = user.getSkillValue(1,true);
        var cd = user.getSkillValue(2)*1000
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(!target.beSkillAble())
                continue;

            var buff = new PKBuffData()
            buff.id = 259;
            buff.value = value;
            buff.user = user;
            buff.isDebuff = true;
            buff.addValue('hpChange',-value);
            buff.endTime = PD.actionTime + cd;
            target.addBuff(buff)
        }
        return arr;
    }
}