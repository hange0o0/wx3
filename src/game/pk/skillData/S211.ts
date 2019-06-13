class S211 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 102;


    //生效时的逻辑
    public onSkill(player){

        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData.enemy);
        var list = []
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(!target.beSkillAble())
                continue;
            if(target.isHero())
                continue;
            list.push(target)

        }
        var item = PD.randomOne(list)
        if(!item)
        {
            return []
        }

        var owner = player;
        var atkRota = owner.teamData.atkRota;

        var num = this.getSkillValue(211,1);
        var cd = this.getSkillValue(211,2)*1000;
        for(var i=0;i<num;i++)
        {
            var x = item.x + PD.random()*100 - 50;
            var mData = {
                force:MonsterManager.getInstance().getAtkAdd(65),
                mid:65,
                owner:owner,
                atkRota:atkRota,
                x:x,
                y:-25 + PD.random()*50,
                lastSkill:Number.MAX_VALUE,
                actionTime:PD.actionTime,
                dieTime:PD.actionTime + cd
            }
            PD.addMonster(mData);
        }

        item.setDie();

        return [item];

    }
}