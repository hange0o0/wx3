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
    public hpBuff;//buff的加成
    public atkBuff;//buff的加成
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
        this.hpBuff = this.hpBuff || 0
        this.atkBuff = this.atkBuff || 0

        if(obj['autolist'])
            this.autoList = obj['autolist'].split(',');
        else
            this.autoList = [];
        this.maxTeamHp = 0;
        for(var i=0;i<this.autoList.length;i++)
        {
            var vo = MonsterVO.getObject(this.autoList[i]);
            var hp = Math.floor(vo.hp*(1+this.getMonsterForce(vo.id)/100)*(1+this.hpBuff/100));
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
        return (this.force + (this.mforce[mid] || 0))
    }

    public getTeamForce(){
        var count = 0;
        for(var i=0;i<this.autoList.length;i++)
        {
            var mid = this.autoList[i];
             var force = MonsterVO.getObject(mid).cost*(1+this.getMonsterForce(mid)/100)
            force *= 1 + (this.hpBuff + this.atkBuff)/2/100
            count += force;
        }
        return Math.round(count);
    }

    public addMonster(){
        //var PD = PKData.getInstance();
        if(this.autoList.length == 0)
            return;

        var mid = Math.floor(this.autoList.shift());
        this.monsterHpList.shift();
        if(this.autoList[0])
        {
            MonsterVO.getObject(this.autoList[0]).preLoad();
        }
        //var owner = this.id
        var atkRota = this.teamData.atkRota;
        var x = atkRota == PKConfig.ROTA_LEFT ? PKConfig.appearPos:PKConfig.floorWidth + PKConfig.appearPos;

        PKData.getInstance().addMonster(this.getMonsterCreateData({
            mid:mid,
            fromPos:true,
            index:this.maxPlayer - this.autoList.length,
            x:x,
        }))
    }

    public getMonsterCreateData(oo):any{
        var mid = oo.mid;
        var data =  {
            force:this.getMonsterForce(mid),
            hpBuff:this.hpBuff,
            atkBuff:this.atkBuff,
            mid:mid,
            owner:this.id,
            atkRota:this.teamData.atkRota,
            y:-25 + PKData.getInstance().random2()*50,
            actionTime:PKData.getInstance().actionTime
        }
        for(var s in oo)
        {
            data[s] = oo[s];
        }
        return data;
    }


}