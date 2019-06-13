class S248 extends SBase {
    constructor() {
        super();
    }

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData.enemy);
        var cd = this.getSkillValue(248,1)*1000;
        var hp = this.getSkillValue(248,2,true);
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(target.beSkillAble())
                target.beAtkAction({hp:hp})

            var buff = new PKBuffData_wx3()
            buff.user = player;
            buff.isDebuff = true;
            buff.addState(PKConfig_wx3.STATE_YUN);
            buff.endTime = PD.actionTime + cd;
            target.addBuff(buff)
        }
        return arr;
    }
}