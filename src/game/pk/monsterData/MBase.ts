class MBase_wx3 {
    private static baseData = {};
    public static getData(id):MBase_wx3{
        if(!this.baseData[id])
        {
            var myClass = this.getClass(id)
            this.baseData[id] = new myClass();
            this.baseData[id].id = id;
        }
        return this.baseData[id];
    }

    public static getClass(id){
        switch (Math.floor(id)){
            case 1:return M1_wx3;
            case 2:return M2_wx3;
            case 3:return M3_wx3;
            case 4:return M4_wx3;
            case 5:return M5_wx3;
            case 6:return M6_wx3;
            case 7:return M7_wx3;
            case 8:return M8_wx3;
            case 9:return M9_wx3;
            case 10:return M10_wx3;
            case 11:return M11_wx3;
            case 12:return M12_wx3;
            case 13:return M13_wx3;
            case 14:return M14_wx3;
            case 15:return M15_wx3;
            case 16:return M16_wx3;
            case 17:return M17_wx3;
            case 18:return M18_wx3;

            case 31:return M31_wx3;
            case 32:return M32_wx3;
            case 33:return M33_wx3;
            case 34:return M34_wx3;
            case 35:return M35_wx3;
            case 36:return M36_wx3;
            case 37:return M37_wx3;
            case 38:return M38_wx3;
            case 39:return M39_wx3;
            case 40:return M40_wx3;
            case 41:return M41_wx3;
            case 42:return M42_wx3;
            case 43:return M43_wx3;
            case 44:return M44_wx3;
            case 45:return M45_wx3;
            case 46:return M46_wx3;
            case 47:return M47_wx3;
            case 48:return M48_wx3;

            case 61:return M61_wx3;
            case 62:return M62_wx3;
            case 63:return M63_wx3;
            case 64:return M64_wx3;
            case 65:return M65_wx3;
            case 66:return M66_wx3;
            case 67:return M67_wx3;
            case 68:return M68_wx3;
            case 69:return M69_wx3;
            case 70:return M70_wx3;
            case 71:return M71_wx3;
            case 72:return M72_wx3;
            case 73:return M73_wx3;
            case 74:return M74_wx3;
            case 75:return M75_wx3;
            case 76:return M76_wx3;
            case 77:return M77_wx3;
            case 78:return M78_wx3;
        }
    }

    public mvID1
    public mvID2
    public mvID3

    public id
    public type = 'monster'
    constructor() {
    }

    // public isHeroSkillCDOK(user,id){
    //     var lastSkillTime = user.skillTemp['hs' + id] || 0;

    //     var cd = user.getVO().getHeroSkill(id).skillcd;
    //     if(user.mid == 102 && user.level >=5) //减CD技能
    //     {
    //         cd = user.getVO().getHeroSkillValue(5,1) * 1000;
    //     }
    //     if(PKData.getInstance().actionTime > lastSkillTime + cd)
    //     {
    //         //console.log(PKData.getInstance().actionTime , lastSkillTime , user.getVO().getHeroSkill(id).skillcd,JSON.stringify(user.skillTemp))
    //         return true;
    //     }
    //     return false;
    // }
    // public setHeroSkillUse(user,id,t?){
    //     user.skillTemp['hs' + id] = Math.max(t || PKData.getInstance().actionTime, user.skillTemp['hs' + id] || 0);
    //     //console.log( JSON.stringify(user.skillTemp))
    // }

    public onHpChange_wx3(user:PKMonsterData_wx3){

    }
    public onCreate_wx3(user:PKMonsterData_wx3){

    }
    public onDie_wx3(user:PKMonsterData_wx3){

    }
    public onRemove_wx3(user:PKMonsterData_wx3){

    }
    public onBuff_wx3(buff:PKBuffData_wx3){

    }
    //被攻击时的处理
    public beAtkAction_wx3(user:PKMonsterData_wx3,data){

    }
    //杀死单位的处理
    public onKill_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){

    }

    //预加载
    public preload_wx3(){
        if(this.mvID1)
            AtkMVCtrl_wx3.getInstance().preLoadMV(this.mvID1)
        if(this.mvID2)
            AtkMVCtrl_wx3.getInstance().preLoadMV(this.mvID2)
        if(this.mvID3)
            AtkMVCtrl_wx3.getInstance().preLoadMV(this.mvID3)
    }
    //初始化怪物隐藏属性
    public initMonster_wx3(user:PKMonsterData_wx3){

    }

    //////////////////////////////////////////////////////  skill
    //取技能目标
    public getSkillTarget_wx3(user:PKMonsterData_wx3){
        return [];
    }

    //伤害飞行时间
    protected getSkillArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return 0;
    }

    //技能动画
    public skillMV_wx3(user,target,actionTime,endTime){
        AtkMVCtrl_wx3.getInstance().mSkillMV(this.id,user,target,actionTime,endTime)
    }

    //实现技能
    public skill_wx3(user:PKMonsterData_wx3,target){

    }


    //////////////////////////////////////////////////////    atk
    //取技能目标
    protected getAtkTargets_wx3(user:PKMonsterData_wx3){
        return [user.target];
    }
    //伤害飞行时间
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return 0;
    }

    //攻击发出时的附加动画，如箭，魔发效果
    public atkMV_wx3(user,target,actionTime,endTime){
        AtkMVCtrl_wx3.getInstance().mAtkMV(this.id,user,target,actionTime,endTime)
    }



   //////////////////////////////////////////////////////   other上面的为要处理的函数
    //技能前处理（生成技能事件）
    public skillBefore_wx3(user:PKMonsterData_wx3,actionTime){
        var endTime = actionTime + this.getAtkMVCD(user)//这个时间后发出攻击时件(前摇)
        var targets = user.skillTargets;
        for(var i=0;i<targets.length;i++)
        {
            this.sendSkillBefore_wx3(user,targets[i],actionTime,endTime)
        }
    }

    //技能发出处理
    public skillAction_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3,actionTime){
        var endTime = actionTime + this.getSkillArriveCD_wx3(user,target);
        this.sendSkillAction_wx3(user,target,actionTime,endTime) //攻击起作用
    }

    //攻击前处理（生成PK事件）设攻击发出时间，攻击目标选择
    public atkBefore_wx3(user:PKMonsterData_wx3,actionTime){
        var endTime = actionTime + this.getAtkMVCD(user)//这个时间后发出攻击时件(前摇)
        var targets = this.getAtkTargets_wx3(user);
        for(var i=0;i<targets.length;i++)
        {
            this.sendAtkBefore_wx3(user,targets[i],actionTime,endTime)
        }
    }

    public getAtkMVCD(user:PKMonsterData_wx3){
        return user.getAtkBeforeCD();
    }

    //攻击发出，设攻击生效(起作用)时间
    public atkAction_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3,actionTime){
        var endTime = actionTime + this.getAtkArriveCD_wx3(user,target);

        if(user.doubleRate && PKData_wx3.getInstance().random() < user.doubleRate)
        {
            user.doubleAction = true;
            PKData_wx3.getInstance().addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_DOUBLE,
                user:user,
                value:user.atk*user.doubleValue,
            })
        }
        else
            user.doubleAction = false;


        this.sendAtkAction_wx3(user,target,actionTime,endTime) //攻击起作用
    }

    //a对B攻击到达时的逻辑（攻击正式生效）
    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        if(!user.doubleAction && target.missRate && PKData_wx3.getInstance().random() < target.missRate)  //暴击不可闪
        {
            if(target.die)
                return false;
            PKData_wx3.getInstance().addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_MISS,
                user:target
            })
            return false;
        }
        var hp = this.getAtkHp_wx3(user,target);
        target.beAtkAction({hp:hp,atker:user})
        user.atkAction({hp:hp})
        return true;
    }

    //取攻击力
    protected getAtkerAtk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var atk = user.atk * user.getAtkRate(target);
        if(user.doubleAction)
            atk *= user.doubleValue;
        return Math.ceil(atk);
    }

    //取最终伤害
    public getAtkHp_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var atk = this.getAtkerAtk_wx3(user,target);
        var teamDef = target.getOwner().teamData.getTeamDef();
        var hp = Math.floor(atk * Math.max(1-(target.def + teamDef)/100,0));
        if(hp < 1)
            hp = 1;
        return Math.ceil(hp);
    }

    protected sendAtkBefore_wx3(user,target,actionTime,endTime){
        PKMonsterAction_wx3.getInstance().addAtkList({   //到actionTime后根据条件产生攻击事件
            type:'atk_before',
            model:this,
            user:user,
            target:target,
            actionTime:actionTime,
            endTime:endTime
        })
    }
    protected sendSkillBefore_wx3(user,target,actionTime,endTime){
        PKMonsterAction_wx3.getInstance().addAtkList({   //到actionTime后根据条件产生攻击事件
            type:'skill_before',
            model:this,
            user:user,
            target:target,
            actionTime:actionTime,
            endTime:endTime
        })
    }

    protected sendAtkAction_wx3(user,target,actionTime,endTime){
        PKMonsterAction_wx3.getInstance().addAtkList({   //到actionTime后根据条件攻击起作用
            type:'atk',
            user:user,
            target:target,
            actionTime:actionTime,
            endTime:endTime
        })

        if(!PKData_wx3.getInstance().quick)
            this.atkMV_wx3(user,target,actionTime,endTime)

    }
    protected sendSkillAction_wx3(user,target,actionTime,endTime){
        PKMonsterAction_wx3.getInstance().addAtkList({   //到actionTime后根据条件产生攻击事件
            type:'skill',
            user:user,
            target:target,
            actionTime:actionTime,
            endTime:endTime
        })

        if(!PKData_wx3.getInstance().quick)
            this.skillMV_wx3(user,target,actionTime,endTime)

    }
}