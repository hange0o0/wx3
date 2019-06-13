class S219 extends SBase {
    constructor() {
        super();
    }

    public onSkill(player) {
        var cd = this.getSkillValue(219,2)*1000;
        var rate = this.getSkillValue(219,1)/100;
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData);
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            var buff = new PKBuffData_wx3()
            buff.user = player;
            buff.removeAble = false
            buff.id = 219;
            buff.value = rate;
            buff.endTime = PD.actionTime + cd;
            buff.addValue('atk',target.baseAtk*rate)
            buff.addValue('addSpeed',this.getSkillValue(219,1))
            buff.addState(PKConfig_wx3.STATE_MOMIAN);
            buff.endFun = function(buff:PKBuffData_wx3){
                buff.owner.setDie();
            }
            target.addBuff(buff)

            PD.addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                user:target,
                keys:['momian','atk+','speed+']
            })
        }
        return arr;
    }

}