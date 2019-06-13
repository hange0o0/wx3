class S256 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 128;
    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData);
        var value = this.getSkillValue(256,1,true);
        var cd = this.getSkillValue(256,2)*1000
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];

            var buff = new PKBuffData_wx3()
            buff.id = 256;
            buff.value = value;
            buff.user = player;
            buff.addValue('hpChange',value);
            buff.endTime = PD.actionTime + cd;
            target.addBuff(buff)
        }
        return arr;
    }
}