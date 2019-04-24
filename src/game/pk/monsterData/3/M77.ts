class M77_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //预加载
	private wx3_functionX_12984(){console.log(9572)}
    public preload_wx3(){
        AtkMVCtrl_wx3.getInstance().preLoadPNGLocal('enemy78_png')
    }

    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkAble =  false;
	wx3_function(4979);
    }

    public onHpChange_wx3(user:PKMonsterData_wx3){
        if(!user.skillTemp[77] && user.getHpRate() < 0.5)
        {
            user.skillTemp[77] = true;
	wx3_function(2666);
            user.addSpeed += 100;
            PKData_wx3.getInstance().addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_CHANGE_SKIN,
                user:user,
                skin:78,
            })
        }
    }
	private wx3_functionX_12985(){console.log(4254)}

    //public onKill(user:PKMonsterData,target:PKMonsterData){
    //    var PD = PKData.getInstance();
    //    var mid = 65;
    //    var owner = PD.getPlayer(user.owner);
    //    var atkRota = owner.teamData.atkRota;
    //    var num = user.getSkillValue(1)
    //    for(var i=0;i<num;i++)
    //    {
    //        var mData = {
    //            force:owner.force,
    //            mid:mid,
    //            owner:user.owner,
    //            atkRota:atkRota,
    //            x:target.x,
    //            y:target.y,
    //            lastSkill:Number.MAX_VALUE,
    //            dieTime:PD.actionTime + user.getSkillValue(2)*1000,
    //            actionTime:PD.actionTime
    //        }
    //        PD.addMonster(mData);
    //    }
    //}
}