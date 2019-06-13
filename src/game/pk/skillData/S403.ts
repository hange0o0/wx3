class S403 extends SBase {
    constructor() {
        super();
    }

    public onSkill(player) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.getMonsterByTeam(player.teamData.enemy);
        var list = [];
        for(var i=0;i<arr.length;i++)
        {
            var target = arr[i];
            if(!target.beSkillAble())
                continue;
            list.push(target)
        }
        if(!list.length)
        {
            MyWindow.ShowTips('没有可被转化的怪物')
            return [];
        }

        var target = PKData_wx3.getInstance().randomOne(list)
        target.owner = player.id
        target.atkRota = player.atkRota;
        PKData_wx3.getInstance().addVideo({
            type:PKConfig_wx3.VIDEO_MONSTER_CHANGE_TEAM,
            user:target
        })
        return [];
    }
}