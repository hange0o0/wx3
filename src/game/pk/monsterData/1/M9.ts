class M9_wx3 extends MBase_wx3 {
    constructor() {
        super();
    }

	private wx3_functionX_12896(){console.log(4576)}
    public onCreate_wx3(user:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(user.getOwner().teamData);
        var rate = user.getSkillValue(1)/100;
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
	wx3_function(1687);
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

	wx3_function(2583);
        var listener = new M9StateListener();
        listener.owner = user;
        user.getOwner().teamData.addStateLister(listener)
    }

    public onRemove_wx3(user:PKMonsterData_wx3){
        var PD = PKData_wx3.getInstance();
	wx3_function(9077);
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
	private wx3_functionX_12897(){console.log(1780)}
    public type = PKConfig_wx3.LISTENER_CREATE
    constructor() {
        super();
    }

    // 起作用时会调用的方法
    public actionFun(target?:PKMonsterData_wx3){
        var rate = (<PKMonsterData_wx3>this.owner).getSkillValue(1)/100;
	wx3_function(38);
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