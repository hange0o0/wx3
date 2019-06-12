class S210 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 119;


    public onSkill(playerID) {
        var num = this.getSkillValue(210,1);
        var skillValue = this.getSkillValue(210,2)/100;
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(PD.getPlayer(playerID).teamData);
        if(arr.length > num)
        {
            PD.randSort(arr)
            //arr.length = num;
        }
        for(var i=0;i<arr.length && num > 0;i++)
        {
            var target = arr[i];
            if(target.dieTime)
                continue;
            if(target.haveBuff(210))
                continue;

            var buff = new PKBuffData_wx3()
            buff.user = PD.getPlayer(playerID);
            buff.id = 210;
            buff.value = skillValue;
            buff.endTime = Number.MAX_VALUE
            buff.addState(PKConfig_wx3.STATE_DIE)
            buff.addState(PKConfig_wx3.STATE_REBORN);
            target.addBuff(buff)
            num--;
        }
        return arr;
    }

    public onBuff(buff:PKBuffData_wx3){
        var PD = PKData_wx3.getInstance();
        var target:PKMonsterData_wx3 = buff.owner;
        if(target.reborning)
            return;
        target.reborning = true;
        PKMonsterAction_wx3.getInstance().addAtkList({   //到actionTime后根据条件产生攻击事件
            type:'delay_run',
            fun:()=>{
                this.delayFun(target,buff)
            },
            stopTestDie:true,
            actionTime:PD.actionTime,
            endTime:PD.actionTime + 1000
        })
    }

    public delayFun(target:PKMonsterData_wx3,buff:PKBuffData_wx3){
        var PD = PKData_wx3.getInstance();
        var mid = target.mid;
        var owner = PD.getPlayer(target.owner);
        var atkRota = owner.teamData.atkRota;
        var mData = {
            force:owner.force,
            mid:mid,
            owner:target.owner,
            atkRota:atkRota,
            x:target.x,
            y:target.y,
            hpRate:buff.value,
            actionTime:PD.actionTime
        }

        var monster = PD.addMonster(mData);
        var mc = AtkMVCtrl.getInstance().playAniOn(monster.id,this.mvID1)
        if(mc)
        {
            mc.y -= 30
        }
    }
}