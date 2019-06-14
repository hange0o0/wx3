//玩家数据
class PKPlayerData_wx3 {
    public id;//唯一ID
    public gameid;
    public nick;
    public head;
	private wx3_functionX_12777(){console.log(7964)}
    public hp; //城堡的血量
    public type//类型
    private force;//怪的基础属性
    public mforce={};//怪的基础属性
    public hpBuff;//buff的加成
    public atkBuff;//buff的加成
	private wx3_functionX_12778(){console.log(6887)}
    public teamData:PKTeamData_wx3   //对应队伍

    public autoList
    public maxPlayer

    public maxTeamHp = 0
	private wx3_functionX_12779(){console.log(8939)}
    public monsterHpList = [];

    constructor(obj?){
        if(obj)
            this.fill(obj);

        if(this.nick)
            this.nick = Base64.decode(this.nick);
        else
            this.nick = '守卫者' + this.id;
	wx3_function(8225);
    }
    private wx3_fun_asdfasdfasdf_8783(){}
    private wx3_fun_ast34_935(){}

    public fill(obj)
    {
        obj = ObjectUtil.clone(obj);
        //console.log(JSON.stringify(obj));
        for (var key in obj) {
            this[key] = obj[key];
	wx3_function(9788);
        }
        this.hpBuff = this.hpBuff || 0
        this.atkBuff = this.atkBuff || 0

        if(obj['autolist'])
            this.autoList = obj['autolist'].split(',');
        else
            this.autoList = [];
	wx3_function(6069);
        this.maxTeamHp = 0;
        for(var i=0;i<this.autoList.length;i++)
        {
            var vo = MonsterVO.getObject(this.autoList[i]);
            var hp = Math.floor(vo.hp*(1+this.getMonsterForce(vo.id)/100)*(1+this.hpBuff/100));
            this.monsterHpList.push(hp);
	wx3_function(9305);
            this.maxTeamHp += hp;
        }
        this.maxPlayer = this.autoList.length;
        this.autoList[0] && MonsterVO.getObject(this.autoList[0]).preLoad();
        //console.log(this.autoList)
    }

	private wx3_functionX_12780(){console.log(8635)}
    public getLeaveHp(){
        var count = 0;
        for(var i=0;i<this.monsterHpList.length;i++)
        {
            count += this.monsterHpList[i];
        }
        return count;
    }
	private wx3_functionX_12781(){console.log(5930)}

    //buff对本身和战力都有增益
    public getMonsterForce(mid?){
        return (this.force + (this.mforce[mid] || 0))
    }

    public getTeamForce(){
        var count = 0;
	wx3_function(8512);
        for(var i=0;i<this.autoList.length;i++)
        {
            var mid = this.autoList[i];
             var force = MonsterVO.getObject(mid).cost*(1+this.getMonsterForce(mid)/100)
            force *= 1 + (this.hpBuff + this.atkBuff)/2/100
            count += force;
	wx3_function(6221);
        }
        return Math.round(count);
    }

    public addMonster(){
        //var PD = PKData.getInstance();
        if(this.autoList.length == 0)
            return;

	wx3_function(6037);
        var mid = Math.floor(this.autoList.shift());
        this.monsterHpList.shift();
        if(this.autoList[0])
        {
            MonsterVO.getObject(this.autoList[0]).preLoad();
        }
        //var owner = this.id
	wx3_function(8902);
        var atkRota = this.teamData.atkRota;
        var x = atkRota == PKConfig_wx3.ROTA_LEFT ? PKConfig_wx3.appearPos:PKConfig_wx3.floorWidth + PKConfig_wx3.appearPos;

        PKData_wx3.getInstance().addMonster(this.getMonsterCreateData({
            mid:mid,
            fromPos:true,
            index:this.maxPlayer - this.autoList.length,
            x:x,
        }))
    }
	private wx3_functionX_12782(){console.log(5550)}

    public getMonsterCreateData(oo):any{
        var mid = oo.mid;
        var data =  {
            force:this.getMonsterForce(mid),
            hpBuff:this.hpBuff,
            atkBuff:this.atkBuff,
            mid:mid,
            owner:this.id,
            atkRota:this.teamData.atkRota,
            y:-25 + PKData_wx3.getInstance().random2()*50,
            actionTime:PKData_wx3.getInstance().actionTime
        }
        for(var s in oo)
        {
            data[s] = oo[s];
        }
        return data;
    }


}