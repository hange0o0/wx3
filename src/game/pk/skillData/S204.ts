class S204 extends SBase {
    constructor() {
        super();
    }

    //生效时的逻辑
    public onSkill(playerID){
        var PD = PKData_wx3.getInstance();
        var list = PD.getMonsterByTeam(PD.getPlayer(playerID).teamData);
        var skillValue = this.getSkillValue(204,1);
        var cd = this.getSkillValue(204,2)*1000;
        for(var i=0;i<list.length;i++)
        {
            var target:PKMonsterData_wx3 = list[i];
            var addValue = Math.floor(target.baseAtk * skillValue/100);
            //target.atk += addValue;
            var buff = new PKBuffData_wx3()
            buff.user = PD.getPlayer(playerID);
            buff.id = 204;
            buff.value = skillValue;
            buff.endTime = PD.actionTime + cd;
            buff.addValue('atk',addValue)
            target.addBuff(buff)

            if(buff.ing)
            {
                PD.addVideo({
                    type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                    user:target,
                    keys:['atk+']
                })
            }
        }
        return list;



    }
}