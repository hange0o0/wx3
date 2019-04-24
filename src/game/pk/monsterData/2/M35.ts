class M35_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }
    public mvID1 = 103;
	private wx3_functionX_12906(){console.log(3624)}
    public initMonster_wx3(user:PKMonsterData_wx3){
        user.atkY = -30
    }

    //伤害飞行时间
    protected getAtkArriveCD_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        return Math.abs(user.x - target.x) + 100;
    }
	private wx3_functionX_12907(){console.log(7434)}


    public skill_wx3(user:PKMonsterData_wx3,target:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var mid = 35;
        var owner = PD.getPlayer(user.owner);
	wx3_function(2867);
        var atkRota = owner.teamData.atkRota;
        var num =1
        for(var i=0;i<num;i++)
        {
            var mData = owner.getMonsterCreateData({
                //force:owner.getMonsterForce(mid),
                mid:mid,
                //owner:user.owner,
                //atkRota:atkRota,
                x:user.x,
                //y:-25 + PD.random2()*50,
                lastSkill:Number.MAX_VALUE,
                dieTime:PD.actionTime + user.getSkillValue(1)*1000,
                //actionTime:PD.actionTime
            })
            PD.addMonster(mData);
	wx3_function(5020);
        }
    }

    public getSkillTarget_wx3(user:PKMonsterData_wx3){
        user.getAtkTarget();
        if(user.target)
            return [null];
        return [];
    }
}

//
//class M35StateListener extends PKStateListener {
//    public type = PKConfig.LISTENER_TIMER
//    public actionTime
//    constructor() {
//        super();
//        this.actionTime = PKData.getInstance().actionTime;
//    }
//
//    // 起作用时会调用的方法
//    public actionFun(target?:PKMonsterData){
//        var user:PKPosCardData = <PKPosCardData>this.owner;
//
//        if(PKData.getInstance().actionTime - this.actionTime < 1000)
//            return;
//        var PD = PKData.getInstance();
//        var arr = PD.getMonsterByTeam(user.getOwner().teamData.enemy);
//        var atkrage = user.getSkillValue(3);
//        var list = [];
//        for(var i=0;i<arr.length;i++)
//        {
//            var targetX = arr[i];
//            if(!targetX.beSkillAble())
//                continue;
//            var des = Math.abs(this.x - targetX.x);
//            if(des<=atkrage)
//            {
//                list.push(targetX)
//            }
//        }
//        var selectTarget = ArrayUtil.randomOne(list);
//        if(selectTarget)
//        {
//            this.actionTime = PKData.getInstance().actionTime;
//            AtkMVCtrl.getInstance().playAniOn(selectTarget.id,this.mvID)
//            selectTarget.addHp(-user.getSkillValue(1,true))
//        }
//    }
//
//    public onRemove(){
//        PKData.getInstance().addVideo({
//            type:PKConfig.VIDEO_TOTEM_REMOVE,
//            user:this
//        })
//    }
//}