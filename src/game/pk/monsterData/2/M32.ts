class M32_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }
    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkY = -30
    }
	private wx3_functionX_12899(){console.log(935)}

    //伤害飞行时间
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return Math.abs(user.x - target.x) + 100;
    }


	private wx3_functionX_12900(){console.log(1439)}

    public onCreate_wx3(user:PKMonsterData_wx3){
        var listener = new M32StateListener();
        listener.owner = user;
        user.getOwner().teamData.addStateLister(listener)
    }
	private wx3_functionX_12901(){console.log(8488)}

    public onRemove_wx3(user:PKMonsterData_wx3){
        //var PD = PKData.getInstance();
        //var arr = PD.getMonsterByTeam(user.getOwner().teamData);
        //for(var i=0;i<arr.length;i++)
        //{
        //    var target:PKMonsterData = arr[i];
        //    target.cleanBuff(0,user);
        //}
        user.getOwner().teamData.removeStateListerByOwner(user)
    }
}

class M32StateListener extends PKStateListener_wx3 {
	private wx3_functionX_12902(){console.log(51)}
    public type = PKConfig_wx3.LISTENER_TIMER
    public actionTime
    //public x
    constructor() {
        super();
        this.actionTime = PKData_wx3.getInstance().actionTime;
    }
	private wx3_functionX_12903(){console.log(2727)}

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){

        if(PKData_wx3.getInstance().actionTime - this.actionTime < 1000)
            return;

	wx3_function(9236);


        this.actionTime = PKData_wx3.getInstance().actionTime;


        var user:PKMonsterData_wx3 = <PKMonsterData_wx3>this.owner;
	wx3_function(6351);
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData);
        var atkrage = user.getSkillValue(1);
        var list = [];
        var hp = user.getSkillValue(2,true);
        for(var i=0;i<arr.length;i++)
        {
            var targetEnemy = arr[i];
	wx3_function(9883);
            var des = Math.abs(user.x - targetEnemy.x);
            if(des<=atkrage)
            {
                //if(!targetEnemy.skillTemp[32])
                //    targetEnemy.skillTemp[32] = [];
                //if(targetEnemy.skillTemp[32].length >= 3)
                //{
                //    while(targetEnemy.skillTemp[32][0] &&  PKData.getInstance().actionTime - targetEnemy.skillTemp[32][0] > 1000)
                //        targetEnemy.skillTemp[32].shift();
                //}
                //if(targetEnemy.skillTemp[32].length >= 3)
                //{
                //    continue;
                //}
                //targetEnemy.skillTemp[32].push(this.actionTime);
                targetEnemy.addHp(hp)
            }
        }
        return list;
    }
}