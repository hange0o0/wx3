class PKMonsterAction_wx3 {
    private static instance:PKMonsterAction_wx3;

    public static getInstance() {
        if (!this.instance) this.instance = new PKMonsterAction_wx3();
        return this.instance;
    }

    private atkList = [];

    public addAtkList(data){
        this.atkList.push(data)
    }

    public init(){
        this.atkList.length = 0;
    }

    private wx3_fun_asdfasdfasdf(){}
    private wx3_fun_ast34(){}

    public actionAtk(t){
        for(var i=0;i<this.atkList.length;i++)
        {
            var data = this.atkList[i];
            if(data.endTime <= t)  //事件生效
            {

                this.atkList.splice(i,1);
                i--;

                var user:PKMonsterData_wx3 = data.user;
                var target:PKMonsterData_wx3 = data.target;

                //if(user.mid == 36 && data.type == 'skill_before')
                //    console.log(99999)

                //判断攻击是否生效
                if(target && target.die && !data.stopTestDie)
                {
                    continue;
                }
                if(data.type == 'delay_run')   //延迟执行
                {
                    data.fun && data.fun();
                }
                else if(data.type == 'atk_before')   //攻击产生
                {
                    if(!user.canAction())
                        continue;
                    data.model.atkAction_wx3(user,target,t)
                }
                else if(data.type == 'atk')  //攻击生效
                {
                    if(target.isInState(PKConfig_wx3.STATE_NOBEATK))
                        return;
                    MBase_wx3.getData(user.mid).atk_wx3(user,target)
                }
                else if(data.type == 'skill_before')   //技能产生
                {
                    if(!user.canAction() && !data.stopTestDie)
                        continue;
                    user.setSkillUse(data.actionTime);
                    data.model.skillAction_wx3(user,data.target,t)
                }
                else if(data.type == 'skill')  //技能生效
                {
                    MBase_wx3.getData(user.mid).skill_wx3(user,data.target)

                }
            }
        }
    }

    public atk(user:PKMonsterData_wx3,actionTime){
        var time = actionTime + user.getAtkCD();
        user.stopTime = Math.max(user.stopTime,time)

        PKData_wx3.getInstance().addVideo({   //攻击动画开始
            type:PKConfig_wx3.VIDEO_MONSTER_ATK,
            user:user,
            target:user.target
        })

        MBase_wx3.getData(user.mid).atkBefore_wx3(user,actionTime)
    }

    public skill(user:PKMonsterData_wx3,actionTime){
        var time = actionTime + user.getAtkCD();
        user.stopTime = Math.max(user.stopTime,time)

        PKData_wx3.getInstance().addVideo({   //攻击动画开始
            type:PKConfig_wx3.VIDEO_MONSTER_ATK,
            user:user,
            target:user.skillTargets[0]
        })

        MBase_wx3.getData(user.mid).skillBefore_wx3(user,actionTime)
    }
}