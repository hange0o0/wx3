class M77_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    //预加载
    public preload_wx3(){
        AtkMVCtrl_wx3.getInstance().preLoadPNGLocal('enemy78_png')
    }

    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkAble =  false;
    }

    public onHpChange_wx3(user:PKMonsterData_wx3){
        if(!user.skillTemp[77] && user.getHpRate() < 0.5)
        {
            user.skillTemp[77] = true;
            user.addSpeed += 100;
            PKData_wx3.getInstance().addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_CHANGE_SKIN,
                user:user,
                skin:78,
            })
        }
    }

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