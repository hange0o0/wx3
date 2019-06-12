class S201 extends SBase{
    constructor() {
        super();
    }



    public onSkill(playerID) {
        var PD = PKData_wx3.getInstance();
        var arr = PD.monsterList.concat();
        var targets = [];
        for(var i=0;i<arr.length;i++)
        {
            var targetEnemy = arr[i];
            if(!targetEnemy.beSkillAble())
                continue;
            targetEnemy.addHp(-this.getSkillValue(201,1,true))
            targets.push(targetEnemy);
        }
        return targets;
    }

}
