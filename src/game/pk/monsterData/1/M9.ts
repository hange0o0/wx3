class M9_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

    public onCreate_wx3(user:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData);
        var rate = user.getSkillValue(1)/100;
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            var buff = new PKBuffData_wx3()
            buff.id = 9;
            buff.user = user;
            buff.addValue('atk',Math.max(1,Math.floor(target.baseAtk*rate)));
            target.addBuff(buff)



            if(buff.ing)
            {

                PKData_wx3.getInstance().addVideo({
                    type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                    user:target,
                    keys:['atk+']
                })
            }

        }

        var listener = new M9StateListener();
        listener.owner = user;
        user.getOwner().teamData.addStateLister(listener)
    }

    public onRemove_wx3(user:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData);
        for(var i=0;i<arr.length;i++)
        {
            var target:PKMonsterData_wx3 = arr[i];
            target.cleanBuff(0,user);
        }
        user.getOwner().teamData.removeStateListerByOwner(user)
    }
}

class M9StateListener extends PKStateListener_wx3 {
    public type = PKConfig_wx3.LISTENER_CREATE
    constructor() {
        super();
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){
        var rate = this.owner.getSkillValue(1)/100;
        var buff = new PKBuffData_wx3()
        buff.id = 9;
        buff.user = this.owner;
        buff.addValue('atk',Math.max(1,Math.floor(target.baseAtk*rate)));
        target.addBuff(buff)

        if(buff.ing)
        {
            PKData_wx3.getInstance().addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_ADD_STATE,
                user:target,
                keys:['atk+']
            })
        }
    }
}