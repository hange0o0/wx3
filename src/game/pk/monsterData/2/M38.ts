class M38_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkY = 10
        user.atkX = 30
    }

    //伤害飞行时间
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return Math.abs(user.x - target.x)*2 + 100;
    }



    protected getSkillArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return Math.abs(user.x - target.x)*2 + 100;
    }

    public skill_wx3(user:PKMonsterData_wx3,target){
        var hp = Math.ceil(this.getAtkHp_wx3(user,target));
        target.beAtkAction({hp:hp,atker:user})
        user.atkAction({hp:hp})

        var skillValue = user.getSkillValue(1);
        var buff = new PKBuffData_wx3()
        buff.isDebuff = true;
        buff.value = skillValue;
        buff.addValue('def',-skillValue);
        buff.addValue('addSpeed',-skillValue);
        buff.addValue('atk',-Math.floor(skillValue/100*target.baseAtk));
        buff.user = user;
        buff.endTime = PKData_wx3.getInstance().actionTime + 1000*user.getSkillValue(2);
        target.addBuff(buff)

        if(buff.ing)
        {
            PKData_wx3.getInstance().addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                user:target,
                keys:['def-','speed-','atk-']
            })
        }
    }



    //对最多3个单位进行一次攻击
    public getSkillTarget_wx3(user:PKMonsterData_wx3){
        user.getAtkTarget();
        var target = user.target
        if(target && target.beSkillAble())
        {
            return [target];
        }
        return [];
    }

    ////技能前处理（生成技能事件）
    //public skillBefore(user:PKMonsterData,actionTime){
    //    var endTime = actionTime + this.getAtkMVCD(user)//这个时间后发出攻击时件(前摇)
    //    var target = this.getSkillTarget(user)[0];
    //    var times = user.getSkillValue(1);
    //    for(var i=0;i<times;i++)
    //    {
    //        this.sendSkillBefore(user,target,actionTime,endTime + i*100)
    //    }
    //}
}