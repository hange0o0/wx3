class M36_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12910(){console.log(7527)}
    public mvID1 = 128;
    public onDie_wx3(user:PKMonsterData_wx3){
        if(user.skillTemp[36])
            return;
        if(user.reborning)
            return;
        user.reborning = true;
	wx3_function(1586);
        var PD = PKData_wx3.getInstance();
        PKMonsterAction_wx3.getInstance().addAtkList({   //到actionTime后根据条件产生攻击事件
            type:'skill_before',
            model:this,
            user:user,
            target:user,
            stopTestDie:true,
            actionTime:PD.actionTime,
            endTime:PD.actionTime + 1000*user.getSkillValue(1)
        })
    }
	private wx3_functionX_12911(){console.log(9018)}

    protected sendSkillAction_wx3(user,target,actionTime,endTime){
        PKMonsterAction_wx3.getInstance().addAtkList({   //到actionTime后根据条件产生攻击事件
            type:'skill',
            user:user,
            target:target,
            stopTestDie:true,
            actionTime:actionTime,
            endTime:endTime
        })
    }
	private wx3_functionX_12912(){console.log(9374)}





    public skill_wx3(user:PKMonsterData_wx3,targets){
        var PD = PKData_wx3.getInstance();
	wx3_function(691);
        var mid = 36;
        var owner = PD.getPlayer(user.owner);
        var atkRota = owner.teamData.atkRota;
        var mData = owner.getMonsterCreateData({
            mid:mid,
            //owner:user.owner,
            //atkRota:atkRota,
            x:user.x,
            //y:user.y,
            index:user.index,
            isReborn:true,
            lastSkill:Number.MAX_VALUE,
            //actionTime:PD.actionTime
        })

	wx3_function(2656);
        var monster = PD.addMonster(mData);
        monster.skillTemp[36] = true;

        var mc = AtkMVCtrl_wx3.getInstance().playAniOn(monster.id,this.mvID1)
        if(mc)
        {
            mc.y -= 30
        }
    }
	private wx3_functionX_12913(){console.log(7324)}


}