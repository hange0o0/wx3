class M13_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkAble =  false;
    }

    public onCreate_wx3(user:PKMonsterData_wx3){
        var listener = new M13StateListener();
        listener.owner = user;
        user.getOwner().teamData.addStateLister(listener)
    }

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

class M13StateListener extends PKStateListener_wx3 {
    public type = PKConfig_wx3.LISTENER_TIMER
    public actionTime
    //public x
    constructor() {
        super();
        this.actionTime = PKData_wx3.getInstance().actionTime;
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){

        if(PKData_wx3.getInstance().actionTime - this.actionTime < 500)
            return;

        this.actionTime = PKData_wx3.getInstance().actionTime;

        var user:PKMonsterData_wx3 = <PKMonsterData_wx3>this.owner;
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData.enemy);
        var atkrage = user.getSkillValue(1);
        var list = [];

        for(var i=0;i<arr.length;i++)
        {
            var targetEnemy = arr[i];
            if(!targetEnemy.beSkillAble())
                continue;
            var des = Math.abs(user.x - targetEnemy.x);
            if(des<=atkrage)
            {
                targetEnemy.addHp(-Math.ceil(user.getSkillValue(2,true)*user.getAtkRate(targetEnemy)*0.5))
            }
        }
        return list;
    }
}