class M72_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12968(){console.log(6054)}
    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkX = 20
        user.atkY = 65
    }

    public preload_wx3(){
        AtkMVCtrl_wx3.getInstance().preLoadPNG('monster/enemy72_attack.png')
    }
	private wx3_functionX_12969(){console.log(5404)}

    //伤害飞行时间
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return Math.abs(user.x - target.x)*1.5 + 200;
    }


	private wx3_functionX_12970(){console.log(5002)}

    public getSkillTarget_wx3(user:PKMonsterData_wx3){
        return [null];
    }

    public skill_wx3(user:PKMonsterData_wx3,targets){
        var PD = PKData_wx3.getInstance();
	wx3_function(1839);
        var mid = 65;
        var owner = PD.getPlayer(user.owner);
        var atkRota = owner.teamData.atkRota;
        var num = user.getSkillValue(1)
        for(var i=0;i<num;i++)
        {
            var mData = owner.getMonsterCreateData({
                mid:mid,
                //owner:user.owner,
                //atkRota:atkRota,
                x:user.x,
                //y:-25 + PD.random2()*50,
                lastSkill:Number.MAX_VALUE,
                dieTime:PD.actionTime + user.getSkillValue(2)*1000,
                //actionTime:PD.actionTime
            })
            PD.addMonster(mData);
	wx3_function(4496);
        }

    }
}