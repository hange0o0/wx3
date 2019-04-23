class M8_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }
    public mvID1 = 119;
    //初始化怪物隐藏属性
    public initMonster_wx3(user:PKMonsterData_wx3){
        user.doubleValue = user.getSkillValue(1)/100;
    }

    public atkAction_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3,actionTime){
        if(target.dieTime)
        {
            user.doubleRate = 1;
        }
        super.atkAction_wx3(user,target,actionTime);
        user.doubleRate = 0
    }



    public skill_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        target.owner = user.owner
        target.atkRota = user.atkRota;
        PKData_wx3.getInstance().addVideo({
            type:PKConfig_wx3.VIDEO_MONSTER_CHANGE_TEAM,
            user:target
        })
        //var hp = Math.ceil(this.getAtkHp(user,target)*0.5);
        //target.beAtkAction({hp:hp,atker:user})
        //user.atkAction({hp:hp})
    }
    //转化
    public getSkillTarget_wx3(user:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData.enemy);
        var atkrage = 300;
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(!target.dieTime)
                continue;
            if(target.hp>= user.getSkillValue(2,true))
                continue;
            if(!target.beSkillAble())
                continue;
            var des = Math.abs(user.x - target.x);
            if(des<=atkrage)
            {
                return [target]
            }
        }
        return [];
    }
}