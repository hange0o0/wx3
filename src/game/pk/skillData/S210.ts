class S210 extends SBase {
    constructor() {
        super();
    }

    public mvID1 = 128;


    public onSkill(player) {
        var num = this.getSkillValue(210,1);
        var cd = this.getSkillValue(210,2)*1000;
        var PD = PKData_wx3.getInstance();
        var arr = player.teamData.dieList;
        if(arr.length > num)
        {
            PD.randSort(arr);
        }
        var list = [];
        while(num > 0)
        {
            var oo = arr.pop();
            if(!oo)
                break;

            var mData = player.getMonsterCreateData({
                mid:oo.mid,
                x:oo.x,
                lastSkill:Number.MAX_VALUE,
                dieTime:PD.actionTime + cd
            })
            list.push(PD.addMonster(mData));
            num--;
        }
        if(list.length == 0)
        {
            MyWindow.ShowTips('没有可被复活的怪物')
        }
        return list;
    }
}