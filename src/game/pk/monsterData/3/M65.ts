class M65_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12957(){console.log(6259)}
    public getSkillTarget_wx3(user:PKMonsterData_wx3){
        return [null];
    }

    public skill_wx3(user:PKMonsterData_wx3,targets){
        var PD = PKData_wx3.getInstance();
	wx3_function(7350);
        var mid = 65;
        var owner = PD.getPlayer(user.owner);
        var atkRota = owner.teamData.atkRota;
        var mData = owner.getMonsterCreateData({
            mid:mid,
            //owner:user.owner,
            //atkRota:atkRota,
            x:user.x,
            //y:-30 + PD.random2()*60,
            lastSkill:Number.MAX_VALUE,
            //actionTime:PD.actionTime
        })
        PD.addMonster(mData);
        //mData.y = -30 + Math.random()*60;
        //PD.addMonster(mData);
    }
}