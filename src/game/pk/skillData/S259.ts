class S259 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 112;
    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData.enemy);
        var value = this.getSkillValue(259,1,true);
        var cd = this.getSkillValue(259,2)*1000
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(!target.beSkillAble())
                continue;

            var buff = new PKBuffData_wx3()
            buff.id = 259;
            buff.value = value;
            buff.user = player;
            buff.isDebuff = true;
            buff.addValue('hpChange',-value);
            buff.endTime = PD.actionTime + cd;
            target.addBuff(buff)
        }
        return arr;
    }
}