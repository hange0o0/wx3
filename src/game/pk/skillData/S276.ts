class S276 extends SBase {
    constructor() {
        super();
    }

    public initSkill(user:PKPosCardData){
        user.needRemoveListener = false
    }


    public onSkill(playerID) {
        var PD = PKData_wx3.getInstance()
        var listener = new S276StateListener()
        var teamData = PD.getPlayer(playerID).teamData;
        listener.owner = user;
        listener.mvID = this.mvID1;
        listener.endTime = PD.actionTime + user.getSkillValue(3) *1000;
        listener.x = PD.getFirstX(teamData.enemy.id) + teamData.enemy.atkRota*(PD.random()*30 + 20);
        teamData.addStateLister(listener);


        //加入动画图腾
        PD.addVideo({
            type:PKConfig.VIDEO_TOTEM_ADD,
            totemType:1,
            user:listener,
            x:listener.x,
            y:-25 + Math.random()*50

        })
        return [];
    }
}


class S276StateListener extends PKStateListener {
    public type = PKConfig.LISTENER_TIMER
    public actionTime
    constructor() {
        super();
        this.actionTime = PKData_wx3.getInstance().actionTime;
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData){
        var user:PKPosCardData = <PKPosCardData>this.owner;

        var PD = PKData_wx3.getInstance();
        var arr = PD.monsterList;
        var atkrage = user.getSkillValue(1);
        var value = -user.getSkillValue(2);
        for(var i=0;i<arr.length;i++)
        {
            var targetX:PKMonsterData = arr[i];
            var des = Math.abs(this.x - targetX.x);
            if(des<=atkrage)
            {
                if(!targetX.skillTemp['276'])
                {
                    targetX.skillTemp['276'] = value;
                    targetX.addSpeed += value
                }
            }
            else
            {
                if(targetX.skillTemp['276'])
                {
                    targetX.addSpeed -= targetX.skillTemp['276']
                    targetX.skillTemp['276'] = 0;
                }
            }
        }
    }

    public onRemove(){
        var PD = PKData_wx3.getInstance();
        PD.addVideo({
            type:PKConfig.VIDEO_TOTEM_REMOVE,
            user:this
        })


        var arr = PD.monsterList;
        for(var i=0;i<arr.length;i++)
        {
            var targetX:PKMonsterData = arr[i];
            if(targetX.skillTemp['276'])
            {
                targetX.addSpeed -= targetX.skillTemp['276']
                targetX.skillTemp['276'] = 0;
            }
        }
    }
}