class S211 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 112;


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
            var mData = owner.getMonsterCreateData({
                mid:65,
                x:x,
                lastSkill:Number.MAX_VALUE,
            })
            PD.addMonster(mData);
        }

        item.setDie();

        return [item];

    }
}