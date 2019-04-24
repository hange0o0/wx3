class M75_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12975(){console.log(7179)}
    public bulleteID = 1;

    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkX = 80
    }

    //伤害飞行时间
	private wx3_functionX_12976(){console.log(7755)}
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return 1000;
    }



	private wx3_functionX_12977(){console.log(4064)}
    public atk_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return false;
    }

    protected sendAtkBefore_wx3(user,target,actionTime,endTime){
        PKMonsterAction_wx3.getInstance().addAtkList({   //到actionTime后根据条件产生攻击事件
            type:'atk_before',
            model:this,
            stopTestDie:true,
            user:user,
            target:target,
            actionTime:actionTime,
            endTime:endTime
        })
    }
	private wx3_functionX_12978(){console.log(9676)}
    protected sendAtkAction_wx3(user,target,actionTime,endTime){
       super.sendAtkAction_wx3(user,target,actionTime,endTime)

        var listener = new M75StateListener();
        listener.owner = user;
        listener.stopDieRemove = true;
	wx3_function(3257);
        listener.endTime = actionTime + this.getAtkArriveCD_wx3(user,target);
        listener.id = this.bulleteID
        listener.beginX = user.x
        if(target.x > user.x)
        {
            listener.beginX += user.atkX
            listener.targetX= listener.beginX + user.getSkillValue(1)
        }
        else
        {
            listener.beginX -= user.atkX
            listener.targetX= listener.beginX - user.getSkillValue(1)
        }

	wx3_function(5911);
        this.bulleteID ++;
        user.getOwner().teamData.addStateLister(listener)
    }
}

class M75StateListener extends PKStateListener_wx3 {
	private wx3_functionX_12979(){console.log(7137)}
    public type = PKConfig_wx3.LISTENER_TIMER
    public actionTime
    public id
    public targetX
    public beginX
    constructor() {
        super();
	wx3_function(1685);
        this.actionTime = PKData_wx3.getInstance().actionTime;
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var user = <PKMonsterData_wx3>this.owner
        var arr = PD.getMonsterByNoTeam(user.getOwner().teamData);
	wx3_function(1704);
        var atkrage = 0
        var currentX = this.beginX + (this.targetX - this.beginX)*(PD.actionTime - this.actionTime)/(this.endTime - this.actionTime)
        for(var i=0;i<arr.length;i++)
        {
            var targetX = arr[i];
            if(!targetX.skillTemp[75])
                targetX.skillTemp[75] = {};
	wx3_function(587);
            if(!targetX.skillTemp[75][this.id] && Math.abs(currentX - targetX.x)<=atkrage + targetX.getVO().width/2)
            {
                targetX.skillTemp[75][this.id] = true;
                var hp = MBase_wx3.getData(75).getAtkHp_wx3(user,targetX);
                targetX.beAtkAction({hp:hp,atker:user})
                user.addAtkHurt(hp)
            }
        }
    }
}