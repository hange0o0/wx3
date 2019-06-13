class S404 extends SBase {
    constructor() {
        super();
    }

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var hp = this.getSkillValue(404,1,true)

        var arr = PD.getMonsterByTeam(player.teamData.enemy);
        var list = [];
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(!target.beSkillAble())
                continue;
            list.push(target)
        }
        if(!list.length)
        {
            return [];
        }

        var target = PKData_wx3.getInstance().randomOne(list)
        target.beAtkAction({hp:hp})
        var buff = new PKBuffData_wx3()
        buff.user = player;
        buff.isDebuff = true;
        buff.addState(PKConfig_wx3.STATE_YUN);
        buff.endTime = PD.actionTime + 1000*this.getSkillValue(404,2)
        target.addBuff(buff)
    }
}