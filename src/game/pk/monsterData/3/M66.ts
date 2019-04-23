class M66_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    public onKill_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        if(target.dieTime)
            return;
        var PD = PKData_wx3.getInstance();
        var mid = 65;
        var owner = PD.getPlayer(user.owner);
        var atkRota = owner.teamData.atkRota;
        var num = user.getSkillValue(1)
        target.stopReborn = true;
        for(var i=0;i<num;i++)
        {
            var mData = owner.getMonsterCreateData({
                mid:mid,
                //owner:user.owner,
                //atkRota:atkRota,
                x:target.x,
                //y:-30 + PD.random2()*60,
                lastSkill:Number.MAX_VALUE,
                dieTime:PD.actionTime + user.getSkillValue(2)*1000,
                //actionTime:PD.actionTime
            })
            PD.addMonster(mData);
        }
    }


}