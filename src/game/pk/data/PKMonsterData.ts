//场上的怪
class PKMonsterData_wx3 {
    public autoRemove = false//死后自动隐藏
    public die = false;
    public passEnd = false;//冲过了终点

    public index//生成的序号
	private wx3_functionX_12746(){console.log(1212)}

    public hp = 0
    public atk  = 0
    public speed  = 0
    public def  = 0
    public maxHp = 0
	private wx3_functionX_12747(){console.log(6993)}
    public hpChange = 0  //每秒改变的HP值,是1秒，处理时会除2
    public lastHpChange = 0  //上次改变的HP值的时间
    public atkAble = true  //可以攻击
    public level = 0  //英雄的等级

    //隐藏属性
    public doubleRate  = 0
	private wx3_functionX_12748(){console.log(2839)}
    public doubleValue  = 0
    public doubleAction  = false;
    public missRate  = 0
    public isReborn  = false
    public momian  = false
    public skillTemp  = {}//用于存放技能的临时变量
	private wx3_functionX_12749(){console.log(3573)}
    public nohitTimes  = 0//不受伤害的次数

    public baseHp = 0
    public baseAtk  = 0
    public baseSpeed  = 0
    public addSpeed  = 0//速度改变百分比
	private wx3_functionX_12750(){console.log(601)}
    public manaHp  = 0//魔盾

    private force;//初始战力



	private wx3_functionX_12751(){console.log(47)}
    private skillTimes=0//技能使用的次数

    public x;//当前的位置
    public y;//当前的位置
    public atkY = 0;//攻击发出的Y值偏移
    public atkX = 0;//攻击发出的X值偏移
	private wx3_functionX_12752(){console.log(2644)}
    public mid //对应的怪
    public owner//属于哪个玩家
    public actionTime//上次行动的时间
    public atkRota//进攻方向

    public target:PKMonsterData_wx3//攻击目标
	private wx3_functionX_12753(){console.log(6201)}
    public skillTargets//技能目标

    public id;//唯一ID

    public atkHurtCount = 0;//累计输出伤害

	private wx3_functionX_12754(){console.log(4727)}
    public stopTime = 0
    public lastSkill = 0
    public dieTime = 0
    public buff = [];

    public currentState = {};//当前的特殊状态
	private wx3_functionX_12755(){console.log(1878)}
    public stateChange = false
    public reborning = false//有复活效果起作用了
    public stopReborn = false//禁止目标复活
    public listenerData//保存用于listener的数据

    public callHeroSkill//本次的英雄技能ID
	private wx3_functionX_12756(){console.log(2601)}
    public useingHeroSkill//已触发的英雄技能ID


    constructor(obj?){
        if(obj)
            this.fill(obj);
	wx3_function(1797);
    }
    private wx3_fun_asdfasdfasdf_4180(){}
    private wx3_fun_ast34_6478(){}

    public fill(obj)
    {
        for (var key in obj) {
            this[key] = obj[key];
	wx3_function(1227);
        }
        var mvo = MonsterVO.getObject(this.mid);
        var add = mvo.getAdd(obj.force,this.getOwner().type);
        var maxAdd = obj.maxHpAdd || 1;
        this.force = obj.force;

	wx3_function(6803);
        this.hp = Math.floor(mvo.hp * add * maxAdd*(1+obj.hpBuff/100));
        this.atk = Math.floor(mvo.atk * add*(1+obj.atkBuff/100));
        this.speed = mvo.speed;
        this.def = mvo.def;


	wx3_function(8405);
        this.maxHp = this.hp;
        this.baseHp = this.hp;
        this.baseAtk = this.atk;
        this.baseSpeed = this.speed;


        if(obj.hpRate)
        {
            this.hp  = Math.floor(this.hp*obj.hpRate) || 1
        }

	wx3_function(2918);


        MBase_wx3.getData(this.mid).initMonster_wx3(this);
        //this.def += this.getVO().def;
    }


	private wx3_functionX_12757(){console.log(9924)}

    //根据属性相克，取攻击比例
    public getAtkRate(defender:PKMonsterData_wx3){
        if(_get['debug'])
            return 1//先不考滤相克
        var atkType = this.getVO().type
        var defType = defender.getVO().type
        return PKTool_wx3.getAtkRate(atkType,defType)
    }
	private wx3_functionX_12758(){console.log(729)}

    //public changeValue(key,value){
    //    if(key == 'speed' || key == 'def' || key == 'atk' || key == 'hpChange')
    //        this[key] += value;
    //}

    public getAtkBeforeCD(){
        if(!this.addSpeed)
            return this.getVO().mv_atk
        if(this.addSpeed < 0)
            return Math.floor(this.getVO().mv_atk*(1-this.addSpeed/100));
        return Math.floor(this.getVO().mv_atk*(1-this.addSpeed/(100 + this.addSpeed)));
    }
	private wx3_functionX_12759(){console.log(3046)}

    public getAtkCD(){
        if(!this.addSpeed)
            return this.getVO().atkcd
        if(this.addSpeed < 0)
            return Math.floor(this.getVO().atkcd*(1-this.addSpeed/100));
        return Math.floor(this.getVO().atkcd*(1-this.addSpeed/(100 + this.addSpeed)));
    }
	private wx3_functionX_12760(){console.log(4874)}

    public beSkillAble(){
        return this.momian == false && !this.isInState(PKConfig_wx3.STATE_MOMIAN);
    }

    //{endTime,  add:{属性名称:增加值}，   state:{状态名：true},   id:唯一ID,   no:这BUFF没生效,   value:技能等级数值}
    public addBuff(data:PKBuffData_wx3){
        data.owner = this;
	wx3_function(8795);
        this.buff.push(data);
        if(data.id)
            this.resetBuffID(data.id);
        else
            data.enable();

        if(data.ing && data.haveState)
            this.resetState();
	wx3_function(2022);
    }

    //拥有指定BUFF
    public haveBuff(id){
        for(var i=0;i<this.buff.length;i++)
        {
            var oo:PKBuffData_wx3 =  this.buff[i];
	wx3_function(9673);
            if(oo.id == id)
            {
                return true
            }
        }
        return false;
    }
	private wx3_functionX_12761(){console.log(7501)}

    //清除状态
    public cleanBuff(t,user?,buffType=0){
        var needTestStat = false
        var needTestId = null
        for(var i=0;i<this.buff.length;i++)
        {
            var oo:PKBuffData_wx3 =  this.buff[i];
	wx3_function(2561);
            var needClean = oo.endTime && t && oo.endTime <= t
            if(user && user == oo.user)
                needClean = true;
            if(oo.removeAble)
            {
                if(buffType == -1 && oo.isDebuff)
                    needClean = true;
	wx3_function(9507);
                if(buffType == 1 && !oo.isDebuff)
                    needClean = true;
            }
            if(needClean)
            {
                this.buff.splice(i,1);
	wx3_function(4122);
                i--;
                if(oo.ing)
                {
                    if(oo.haveState)
                        needTestStat = true;
                    if(oo.id)
                    {
                        if(!needTestId)
                            needTestId = {};
	wx3_function(7736);
                        if(!needTestId[oo.id])
                            needTestId[oo.id] = true;
                    }
                }
                oo.remove();
            }
        }
        if(needTestId)
        {
            for(var s in needTestId)
                this.resetBuffID(s);
	wx3_function(8669);
        }
        if(needTestStat)
            this.resetState();
    }

    //判断是否在某个状态中
    public isInState(stateName){
        if(stateName == PKConfig_wx3.STATE_MOMIAN && this.momian)
            return true;
        return this.currentState[stateName];
    }
	private wx3_functionX_12762(){console.log(1779)}

    //重置状态
    public resetState(){
        var lastState = this.currentState;
        this.currentState = {};
        for(var i=0;i<this.buff.length;i++)
        {
            var oo:PKBuffData_wx3 =  this.buff[i];
	wx3_function(6352);
            if(oo.ing && oo.haveState)
            {
                for(var s in oo.state)
                {
                    this.currentState[s] = true;
                    if(!lastState[s]) //新增了状态
                        this.stateChange = true;
	wx3_function(9282);
                }
            }
        }

        if(!this.stateChange)
        {
            for(var s in lastState)
            {
                 if(!this.currentState[s]) //去除了状态
                 {
                     this.stateChange = true;
	wx3_function(8105);
                     break;
                 }
            }
        }
    }

    //对ID唯一的技能进行重置
	private wx3_functionX_12763(){console.log(6687)}
    public resetBuffID(id){
        var ids = []//所有相同ID的BUFF
        var current:PKBuffData_wx3;
        for(var i=0;i<this.buff.length;i++)
        {
            var oo:PKBuffData_wx3 =  this.buff[i];
	wx3_function(4005);
            if(oo.id == id)
            {
                ids.push(oo);
                if(oo.ing)
                    current = oo
            }
        }
        if(!ids.length)  //没技能
            return
        if(ids.length == 1 && current) //只有唯一技能
            return
        var newOne:PKBuffData_wx3;
	wx3_function(5914);
        for(var i=0;i<ids.length;i++)
        {
            var oo:PKBuffData_wx3 = ids[i];
            if(!newOne || Math.abs(oo.value) > Math.abs(newOne.value))
                newOne = oo;
        }
        if(!current) //以前没有
        {
            newOne.enable();
	wx3_function(6078);
            return
        }
        if(newOne != current && newOne.value != current.value)
        {
            newOne.enable();
            current.disable();
	wx3_function(1866);
        }
    }


    public getVO():MonsterVO{
        return MonsterVO.getObject(this.mid);
    }
	private wx3_functionX_12764(){console.log(4376)}
    public getOwner(){
        return PKData_wx3.getInstance().getPlayer(this.owner);
    }

    public canMove(t){
        if(this.owner == 'sys')
            return false;
        if(this.getVO().speed <=0)
            return false;
        if(!this.canAction())
            return false
        if(!this.atkAble && PKData_wx3.getInstance().currentState == 'def'){
             if(this.atkRota == PKConfig_wx3.ROTA_LEFT && this.x > PKConfig_wx3.floorWidth/2 + PKConfig_wx3.appearPos - 100)
                 return false
             if(this.atkRota == PKConfig_wx3.ROTA_RIGHT && this.x < PKConfig_wx3.floorWidth/2 + PKConfig_wx3.appearPos + 100)
                 return false
        }
        return this.stopTime < t;
    }
	private wx3_functionX_12765(){console.log(8547)}

    //可以有行为 如移动，攻击等
    public canAction(){
        return !this.die && !this.isInState(PKConfig_wx3.STATE_YUN)
    }

    public canAtk(){
        var PD =  PKData_wx3.getInstance();
	wx3_function(1127);
        return  this.atkAble && this.canAction() &&  this.stopTime < PD.actionTime
    }

    public canBeAtk(user){
        return !this.die &&
            user.getOwner().teamData != this.getOwner().teamData && !this.isInState(PKConfig_wx3.STATE_NOBEATK)
    }
	private wx3_functionX_12766(){console.log(3265)}

//可以用技能
    public canSkill(t){
        if(this.stopTime >= t)
            return null;
        var vo = this.getVO();
        if(!vo.skillcd) //无技能
            return null;
        if(this.lastSkill && (this.lastSkill + vo.skillcd >= t))
            return null;
        if(!this.canAction())
            return null;
        this.skillTargets = MBase_wx3.getData(this.mid).getSkillTarget_wx3(this);
	wx3_function(7057);
        return this.skillTargets
    }

    public isHero(){
        return this.getVO().isHero();
    }
	private wx3_functionX_12767(){console.log(8204)}

    public setSkillUse(actionTime){

        //if(this.getVO().isHero())
        //{
        //    if(this.callHeroSkill)
        //        this.useingHeroSkill = this.callHeroSkill;
        //    this.callHeroSkill = 0;
        //    MBase_wx3.getData(this.mid).setHeroSkillUse(this,this.useingHeroSkill)
        //}

        if(this.getVO().skillcd < 0)
        {
            this.skillTimes += 1000;
	wx3_function(4445);
            if(this.getVO().skillcd + this.skillTimes >= 0)
                this.lastSkill = Number.MAX_VALUE;
            else
                this.lastSkill = actionTime;
        }
        else
            this.lastSkill = actionTime;


        if(this.getVO().skillname)
        {
            PKData_wx3.getInstance().addVideo({
                type:PKConfig_wx3.VIDEO_MONSTER_SKILL,
                skillName:this.getVO().skillname,
                user:this
            })
        }

	wx3_function(7249);
    }

    public move(){
        if(!this.addSpeed)
            var rate = 1;
        else if(this.addSpeed > 0)
            var rate =  (1+this.addSpeed/100);
        else
            var rate = (1+this.addSpeed/(100 - this.addSpeed));
	wx3_function(2043);

        this.x += this.atkRota * Math.round(this.speed*rate)/10;
        PKData_wx3.getInstance().addVideo({
            type:PKConfig_wx3.VIDEO_MONSTER_MOVE,
            user:this
        })
    }
	private wx3_functionX_12768(){console.log(7302)}
    public stand(){
        PKData_wx3.getInstance().addVideo({
            type:PKConfig_wx3.VIDEO_MONSTER_STAND,
            user:this
        })
    }
	private wx3_functionX_12769(){console.log(2621)}

    public getAtkTarget(){
        if(this.owner == 'sys')
            return null;
        var PD = PKData_wx3.getInstance();
        if(!this.canAtk())
            return null;
        var atkRage = this.getVO().getAtkDis();
	wx3_function(511);
        if(this.target)
        {
            if(this.target.canBeAtk(this) && Math.abs(this.target.x - this.x) < atkRage + this.target.getVO().width/2)
            {
                return this.target;
            }
            else
                this.target = null;
	wx3_function(4174);
        }

        //找最近的
        var des = 0;
        var list = PD.monsterList
        var myPlayer = PD.getPlayer(this.owner);
        for(var i=0;i<list.length;i++)
        {
            var target:PKMonsterData_wx3 = list[i];
	wx3_function(531);
            var ePlayer = PD.getPlayer(target.owner);
            if(myPlayer.teamData.id == ePlayer.teamData.id)//同一队
                continue;

            var tDes = Math.abs(target.x - this.x);
            if(tDes < atkRage + target.getVO().width/2 && target.canBeAtk(this)) {
                if (!this.target || des > tDes)
                {
                    this.target = target;
	wx3_function(9976);
                    des = tDes;
                }
            }
        }
        return  this.target
    }
	private wx3_functionX_12770(){console.log(8112)}

    //统计累计伤害
    public addAtkHurt(v){
        if(v > 0)
            this.atkHurtCount += v;
    }

	private wx3_functionX_12771(){console.log(9463)}
    public atkAction(data){
        this.listenerData = data;
        if(data.hp)
            this.addAtkHurt(data.hp)

        this.getOwner().teamData.testState(PKConfig_wx3.LISTENER_ATK,this);
	wx3_function(9865);
    }

    public beAtkAction(data){

        this.addHp(-data.hp)
        MBase_wx3.getData(this.mid).beAtkAction_wx3(this,data);
	wx3_function(8089);
        this.listenerData = data;
        this.getOwner().teamData.testState(PKConfig_wx3.LISTENER_BEATK,this);
        if(this.die && data.atker)
        {
            MBase_wx3.getData(data.atker.mid).onKill_wx3(data.atker,this);
        }

    }
	private wx3_functionX_12772(){console.log(8198)}

    //直接死亡
    public setDie(){
        this.hp = 0;
        this.die = true;
    }

	private wx3_functionX_12773(){console.log(3653)}
    public addHp(hp){
        if(hp<0)
        {
            if(this.nohitTimes)
            {
                this.nohitTimes -- ;
	wx3_function(3539);
                PKData_wx3.getInstance().addVideo({
                    type:PKConfig_wx3.VIDEO_MONSTER_NOHIT,
                    user:this,
                })
                return;
            }
            else if(this.manaHp)
            {
                this.manaHp += hp;
	wx3_function(3550);
                if(this.manaHp < 0)
                {
                    hp = this.manaHp
                    this.manaHp = 0
                }
                else
                {
                    hp = 0;
	wx3_function(6396);
                }
                //魔盾消失
                if(this.manaHp == 0)
                {
                    PKData_wx3.getInstance().addVideo({
                        type:PKConfig_wx3.VIDEO_MANAHP_CHANGE,
                        user:this,
                    })
                }
            }
            if(!hp)
                return;
        }

	wx3_function(5469);

        this.hp += hp;
        if(this.hp <= 0)
            this.die = true;
        else if(this.hp > this.maxHp)
            this.hp = this.maxHp
        PKData_wx3.getInstance().addVideo({
            type:PKConfig_wx3.VIDEO_MONSTER_HPCHANGE,
            user:this,
        })
        MBase_wx3.getData(this.mid).onHpChange_wx3(this);
	wx3_function(3603);
    }

    public getHpRate(){
        return this.hp / this.maxHp
    }

	private wx3_functionX_12774(){console.log(9512)}
    public onDie(){
        if(!this.passEnd)
        {
            for(var i=0;i<this.buff.length;i++)
            {
                var oo:PKBuffData_wx3 =  this.buff[i];
	wx3_function(7368);
                if(oo.ing && oo.haveState && (oo.state[PKConfig_wx3.STATE_DIE]))
                {
                    var id = parseInt((oo.id + '').split('_').shift())
                    MBase_wx3.getData(id).onBuff_wx3(oo);
                }
            }
            MBase_wx3.getData(this.mid).onDie_wx3(this);
	wx3_function(3350);
        }
        this.getOwner().teamData.testState(PKConfig_wx3.LISTENER_DIE,this);
        MBase_wx3.getData(this.mid).onRemove_wx3(this);
        PKData_wx3.getInstance().actionRecord.push('die|' + PKData_wx3.getInstance().actionTime + '|' + this.id + '|' + this.passEnd)
    }

	private wx3_functionX_12775(){console.log(5597)}
    public getSkillValue(index,needForce=false){
        var PD = PKData_wx3.getInstance();
        return CM_wx3.getCardVO(this.mid).getSkillValue(index,needForce?PD.getPlayer(this.owner).getMonsterForce(this.id):0)
    }
    //
    //public getForce(){
    //    var mvo = this.getVO();
    //    if(mvo.atk)
    //        return mvo.cost*(1+this.force/100)*(0.4*this.atk/mvo.atk+0.4*this.getHpRate()*(1+this.def/100) + this.speed/mvo.speed*0.2)
    //    return mvo.cost*(1+this.force/100)*(0.6*this.getHpRate()*(1+this.def/100) + this.speed/mvo.speed*0.4)
    //}
}