//玩家数据
class PKPlayerData {
    public id;//唯一ID
    public gameid;
    public nick;
    public head;
    public hp; //城堡的血量
    public type//类型
    private force;//怪的基础属性
    public mforce={};//怪的基础属性
    public buff;//buff的加成
    public teamData:PKTeamData   //对应队伍

    public autoList
    public maxPlayer

    public maxTeamHp = 0
    public monsterHpList = [];

    constructor(obj?){
        if(obj)
            this.fill(obj);

        if(this.nick)
            this.nick = Base64.decode(this.nick);
        else
            this.nick = '守卫者' + this.id;
    }

    public fill(obj)
    {
        obj = ObjectUtil.clone(obj);
        //console.log(JSON.stringify(obj));
        for (var key in obj) {
            this[key] = obj[key];
        }

        if(obj['autolist'])
            this.autoList = obj['autolist'].split(',');
        else
            this.autoList = [];
        this.maxTeamHp = 0;
        for(var i=0;i<this.autoList.length;i++)
        {
            var vo = MonsterVO.getObject(this.autoList[i]);
            var hp = Math.floor(vo.hp*(1+this.getMonsterForce(vo.id)/100));
            this.monsterHpList.push(hp);
            this.maxTeamHp += hp;
        }
        this.maxPlayer = this.autoList.length;
        this.autoList[0] && MonsterVO.getObject(this.autoList[0]).preLoad();
        //console.log(this.autoList)
    }

    public getLeaveHp(){
        var count = 0;
        for(var i=0;i<this.monsterHpList.length;i++)
        {
            count += this.monsterHpList[i];
        }
        return count;
    }

    //buff对本身和战力都有增益
    public getMonsterForce(mid?){
        return (this.force + (this.mforce[mid] || 0))*(1+(this.buff || 0)/100) +  (this.buff || 0)
    }

    public addMonster(){
        //var PD = PKData.getInstance();
        if(this.autoList.length == 0)
            return;

        var mid = this.autoList.shift();
        this.monsterHpList.shift();
        if(this.autoList[0])
        {
            MonsterVO.getObject(this.autoList[0]).preLoad();
        }
        //var owner = this.id
        var atkRota = this.teamData.atkRota;
        var x = atkRota == PKConfig.ROTA_LEFT ? PKConfig.appearPos:PKConfig.floorWidth + PKConfig.appearPos;
        PKData.getInstance().addMonster({
            force:this.getMonsterForce(mid),
            mid:mid,
            owner:this.id,
            atkRota:atkRota,
            fromPos:true,
            index:this.maxPlayer - this.autoList.length,
            x:x,
            y:-25 + PKData.getInstance().random2()*50,
            actionTime:PKData.getInstance().actionTime
        })
    }

}