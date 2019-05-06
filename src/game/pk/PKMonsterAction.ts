class PKMonsterAction_wx3 {
    private static instance:PKMonsterAction_wx3;

    public static getInstance() {
        if (!this.instance) this.instance = new PKMonsterAction_wx3();
        return this.instance;
    }
	private wx3_functionX_12506(){console.log(789)}

    private atkList = [];

    public addAtkList(data){
        this.atkList.push(data)
    }
	private wx3_functionX_12507(){console.log(5149)}

    public init(){
        this.atkList.length = 0;
    }

    private wx3_fun_asdfasdfasdf_1131(){}
	private wx3_functionX_12508(){console.log(8275)}
    private wx3_fun_ast34_2816(){}

    public actionAtk(t){
        for(var i=0;i<this.atkList.length;i++)
        {
            var data = this.atkList[i];
	wx3_function(8928);
            if(data.endTime <= t)  //事件生效
            {

                this.atkList.splice(i,1);
                i--;

	wx3_function(674);
                var user:PKMonsterData_wx3 = data.user;
                var target:PKMonsterData_wx3 = data.target;

                //if(user.mid == 36 && data.type == 'skill_before')
                //    console.log(99999)

                //判断攻击是否生效
                if(target && target.die && !data.stopTestDie)
                {
                    continue;
	wx3_function(6549);
                }
                if(data.type == 'delay_run')   //延迟执行
                {
                    data.fun && data.fun();
                }
                else if(data.type == 'atk_before')   //攻击产生
                {
                    if(!user.canAction())
                        continue;
	wx3_function(7758);
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
	wx3_function(4642);
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
	private wx3_functionX_12509(){console.log(4339)}

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
	private wx3_functionX_12510(){console.log(2984)}

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