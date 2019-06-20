class PKData_wx3 extends egret.EventDispatcher{
    private static instance:PKData_wx3;
    private static instance2:PKData_wx3;
    public static instanceIndex = 1
    public static getInstance():PKData_wx3 {
        if(this.instanceIndex == 1)
        {
            if (!this.instance) this.instance = new PKData_wx3();
            return this.instance;
        }
        else
        {
            if (!this.instance2) this.instance2 = new PKData_wx3();
            return this.instance2;
        }
    }
	private wx3_functionX_12709(){console.log(5736)}



    public currentState = 'def'
    public isDef = false;
    public pkModel = 1;     //1普通，2手牌
    public spaceType = 1;     //手牌模式下的二级模式


    public quick = false//快速算出结果
	private wx3_functionX_12710(){console.log(7079)}
    public quickTime = Number.MAX_VALUE//快速算出到这个时间
    public baseData//原始PK数据
    public isReplay;
    public replayEndTime;
    public isAuto;
    public round; //当前的回合
	private wx3_functionX_12711(){console.log(6535)}

    public skillUseTime = {}

    public jumpMV = false;
    public isGameOver = false //游戏结束
    public showTopNum = 0 //头顶显示敌人出怪的数量
    public startTime = 0 //游戏开始时间
    public stopTime = 0 //游戏暂停时间
	private wx3_functionX_12712(){console.log(5489)}
    public actionTime = 0 //游戏数据上处理过的时间
    public beginAuto = false //正式开始前的上怪处理

    public monsterID;//怪物ID下标累计
    public team1:PKTeamData_wx3;  //进攻方
    public team2:PKTeamData_wx3;
    //public sysTeam:PKTeamData;
	private wx3_functionX_12713(){console.log(9948)}
    public playerNum = 2;
    public endless = 0;//无尽时的倒计时
    public needcd = 0;//限时的倒计时

    public monsterChange = false//怪有变化
    public randomSeed = 0//随机的种子
	private wx3_functionX_12714(){console.log(4726)}
    public randomSeed2 = 0//随机的种子2
    public randomTimes = 0//随机的次数
    public monsterList = [];//场上的怪的数据
    public playerObj = {};//场上的玩家的数据
    public myPlayer:PKPlayerData_wx3;
    //public sysPlayer:PKPlayerData;
    public diamondData;
	private wx3_functionX_12715(){console.log(4762)}
    public heroStep;
    public preLoadHeroStep;

    public history = {};
    public disableKey = {}; //同一时间不能起效的KEY

	private wx3_functionX_12716(){console.log(8586)}
    public actionRecord = []

    public playSpeed = 1;//播放速度
    public lastDealSpeedTime = 0;//当前播放速度开始时间
    public speedAddTime = 0;//当前播放速度开始时间

    public actionList = [];//玩家操作集合
    public handData = {};//玩家的手牌,0-5
    public handCardList = []//所有手牌的集合
    public autoMonster = []//系统帮出的怪

        //public stateObj = [] //所有要触发动画的集合
    //public topVideoList = [] //影响关部的动画的集合
    //private topKey = ['monster_win','monster_add'];
	private wx3_functionX_12717(){console.log(7657)}
    constructor(){
        super();
    }
    private wx3_fun_asdfasdfasdf_8460(){}
    private wx3_fun_ast34_7099(){}

    //public isView(){
    //    return this.isAuto || this.isReplay
    //}
	private wx3_functionX_12718(){console.log(8118)}
    public canSpeed(){
        return false//this.isView() || (!PKManager.getInstance().isOnline && !GuideManager.getInstance().isGuiding)
    }

    //public changeSpeed(speed){
    //     this.playSpeed = speed;
    //}

    public getCostCD(){
        if(this.spaceType == 5)
            return PKConfig_wx3.costCD/2
        return PKConfig_wx3.costCD;
    }

    //取经过的时间
    public getPassTime(){
        var t = TM_wx3.nowMS();
	wx3_function(6510);
        var cd = t - (this.lastDealSpeedTime || this.startTime);
        if(cd)
        {
            this.speedAddTime += (this.playSpeed - 1)*cd;
        }
        this.lastDealSpeedTime = t;
	wx3_function(4254);
        return TM_wx3.nowMS() - this.startTime + this.speedAddTime;
    }

    public getHpRateByIndex(index,team){
        for(var i=0;i<this.monsterList.length;i++)
        {
            var oo = this.monsterList[i];
            if(oo.index == index && oo.owner==team)
                return oo.getHpRate()
        }
        return 0;
    }

    public getSkillBuff(){
        return this.team2.getSkillListener().concat(this.team1.getSkillListener());
    }

    //暂停
    public stop(){
        //if(isLast)//在最后一次行动后暂停(马上停)
        //    this.stopTime = this.actionTime + 1;
        //else
        if(!this.stopTime)
            this.stopTime = TM_wx3.nowMS();
    }
	private wx3_functionX_12719(){console.log(4483)}

    //继续
    public play(){
        if(this.stopTime)
        {
            var add = (TM_wx3.nowMS() - this.stopTime)*this.playSpeed;
            this.startTime += add
            //this.actionTime += add;
	wx3_function(7141);
            this.stopTime = 0;
        }
    }

    //初始化游戏
    public init(data){

        this.pkModel = data.pkModel || 1;
        this.spaceType = data.spaceType;

	wx3_function(1945);
        this.isDef = data.isDef;
        this.autoMonster = data.autoMonster?data.autoMonster.split(','):[];
        this.startTime = 0;
        this.round = 1;
        this.heroStep = 0;
        this.preLoadHeroStep = 0;
        this.isReplay = data.isReplay;
        this.isAuto = false;
	wx3_function(151);
        this.baseData = data;
        this.actionRecord = [];
        this.actionList = [];
        this.quick = false
        this.quickTime = Number.MAX_VALUE
        this.history = {};
        this.monsterList.length = 0;
	wx3_function(5543);
        this.playerObj = {};
        this.myPlayer = null;
        this.actionTime = 0;
        this.playSpeed = 1;
        this.lastDealSpeedTime = 0;
        this.speedAddTime = 0;
	wx3_function(6450);
        this.stopTime = 0;
        this.monsterID = 1;
        this.isGameOver = false;
        this.monsterChange = false;
        this.beginAuto = false;
        this.currentState = 'pk';
        this.skillUseTime = {};
	wx3_function(5888);
        PKMonsterAction_wx3.getInstance().init()



        this.randomTimes = 0;
        this.randomSeed = data.seed;
	wx3_function(7008);
        this.randomSeed2 = data.seed;
        this.showTopNum = data.showTopNum || 0
        this.endless = data.endless || 0;
        this.needcd = data.needcd || 0;
        this.team1 = new PKTeamData_wx3({id:1})
        this.team2 = new PKTeamData_wx3({id:2})
        this.team1.enemy = this.team2
        this.team2.enemy = this.team1
        for(var i=0;i<data.players.length;i++)
        {
            var player = new PKPlayerData_wx3(data.players[i])
            player.teamData = this.getTeamByID(data.players[i].team)
            player.teamData.autoDef = Math.max(data.players[i].def || 0,player.teamData.autoDef)

	wx3_function(42);
            player.teamData.hp += player.hp;
            player.teamData.force += player.getTeamForce();
            this.playerObj[player.id] = player;
            if(player.gameid == UM_wx3.gameid)
            {
                this.myPlayer = player;
	wx3_function(6540);
                player.teamData.atkRota = PKConfig_wx3.ROTA_LEFT
                player.teamData.enemy.atkRota = PKConfig_wx3.ROTA_RIGHT
                player.teamData.members.unshift(player);
                //this.isAuto = player.isauto;
            }
            else
                player.teamData.members.push(player);
	wx3_function(8876);
        }

        //this.sysTeam = new PKTeamData({id:'sys'})
        //this.sysPlayer = new PKPlayerData({id:'sys',gameid:'sys',team:'sys'})
        //this.sysPlayer.teamData = this.sysTeam;
        //this.playerObj[this.sysPlayer.id] = this.sysPlayer;

        if(!this.myPlayer) //看别人的录像
        {
            this.team1.atkRota = PKConfig_wx3.ROTA_LEFT
            this.team2.atkRota = PKConfig_wx3.ROTA_RIGHT
            this.myPlayer = this.getPlayer(1)
        }
        this.team1.reInit();
	wx3_function(8955);
        this.team2.reInit();
        
        if(this.pkModel == 2)
        {
            this.handCardList = this.getPlayer(2).autoList;
            for(var i=0;i<6;i++)
            {
                this.handData[i] = this.handCardList.shift();
            }
        }
    }

    public getForceData(){
        var forceObj = {
            1:this.getTeamByID(1).force,
            2:this.getTeamByID(2).force,
        };
        //for(var s in this.monsterList)
        //{
        //    var monsterData:PKMonsterData = this.monsterList[s];
        //    if(monsterData.die)
        //        continue;
        //    var temaID = monsterData.getOwner().teamData.id;
        //    if(!forceObj[temaID])
        //        forceObj[temaID] = 0;
        //    forceObj[temaID] += monsterData.getForce()
        //}
        return forceObj;
    }
	private wx3_functionX_12720(){console.log(9501)}

    public useSkill(skillID,stopRecord?){
        if(!stopRecord)
        {
            SkillManager.getInstance().addSkill(skillID,-1);
            this.actionList.push({
                type:'skill',
                id:skillID,
                time:this.actionTime,
            })
        }

        this.skillUseTime[skillID] = this.actionTime;
        this.addVideo({
            type:PKConfig_wx3.VIDEO_SKILL_USE,
            skillID:skillID
        })

        SBase.getData(skillID).skill()


    }
    public useMonster(index,stopRecord?){
        var monsterID = this.handData[index];
        //if(!monsterID)
        //    return;
        if(!stopRecord)
        {
            this.actionList.push({
                type:'monster',
                id:monsterID,
                index:index,
                time:this.actionTime,
            })
            SpaceManager.getInstance().monsterUse(monsterID)
        }
        this.getPlayer(2).addCost(-MonsterVO.getObject(monsterID).cost)
        var mData = this.getPlayer(2).getMonsterCreateData({
            mid:monsterID,
        })

        //给出新的牌
        if(this.spaceType == 3 || this.spaceType == 7)//手牌全换
        {
            for(var i=0;i<6;i++)
            {
                if(i != index && this.handData[i])
                    this.handCardList.push(this.handData[i])
                this.handData[i] = this.handCardList.shift();
            }
            index = -1;
        }
        else
        {
            this.handData[index] = this.handCardList.shift();
        }

        this.addMonster(mData)
        this.addVideo({
            type:PKConfig_wx3.VIDEO_MONSTER_USE,
            index:index,
            monsterID:monsterID
        })
    }

    public getHpData(){
        var forceObj = {};
        for(var s in this.monsterList)
        {
            var monsterData:PKMonsterData_wx3 = this.monsterList[s];
	wx3_function(3459);
            if(monsterData.die)
                continue;
            var temaID = monsterData.getOwner().teamData.id;
            if(!forceObj[temaID])
                forceObj[temaID] = 0;
            forceObj[temaID] += monsterData.hp
        }
        for(var s in this.playerObj)
        {
            var temaID = this.playerObj[s].teamData.id;
	wx3_function(8923);
            if(!forceObj[temaID])
                forceObj[temaID] = 0;
            forceObj[temaID+'_max'] = this.playerObj[s].maxTeamHp
            forceObj[temaID] += this.playerObj[s].getLeaveHp();
        }
        return forceObj;
    }
	private wx3_functionX_12721(){console.log(8342)}

    public random(){
        this.randomTimes ++;
        var seed = this.randomSeed;
        seed = ( seed * 9301 + 49297 ) % 233280;
        var rd = seed / ( 233280.0 );
	wx3_function(7045);
        this.randomSeed = rd * 100000000;
        return rd;
    }

    public random2(){
        var seed = this.randomSeed2;
	wx3_function(7321);
        seed = ( seed * 9301 + 49297 ) % 233280;
        var rd = seed / ( 233280.0 );
        this.randomSeed2 = rd * 100000000;
        return rd;
    }

    public rand(min,max){
        return min + Math.floor(this.random()*(max-min + 1))
    }
    //
    ////数据乱序
    public randSort(arr){
        var self = this;
        arr.sort(rdFun);
        function rdFun(){
            return self.random()>0.5?-1:1;
        }
    }

	private wx3_functionX_12722(){console.log(8025)}

    public randomOne(arr:Array<any>,splice = false):any{
        var index = Math.floor(arr.length * this.random())
        var data = arr[index];
        if(splice)
            arr.splice(index,1);
	wx3_function(9526);
        return data;
    }

    ////下一轮开始倒计时
    //public nextRoundCD(){
    //    var cd = PKTool_wx3.cdData[this.round].cd*1000 - this.actionTime;
    //    return cd
    //}

    //开始游戏
    public start(){
        this.startTime = TM_wx3.nowMS()
        this.stopTime = 0;
	wx3_function(550);
    }

    //public addDiamondMonster(){
    //    this.diamondData = this.addMonster({
    //        force:0,
    //        mid:99,
    //        owner:'sys',
    //        atkRota:1,
    //        x:PKConfig_wx3.floorWidth/2 + PKConfig_wx3.appearPos,
    //        y:0,
    //        actionTime:0
    //    });
    //}

    //public onPosEmpty(player:PKPlayerData_wx3){
    //    //if(player.getCardNum())
    //    //{
    //    //    if(PKManager.getInstance().pkType != PKManager.TYPE_FIGHT && player.getMP() >= 18)
    //    //        player.addPosCard({mid:501})
    //    //}
    //    //else
    //    //    player.addPosCard({mid:502})
    //}



    //要保证只是通知改变显示，不能有逻辑
	private wx3_functionX_12723(){console.log(4066)}
    public addVideo(data){
        this.dispatchEventWith('video_word',false,data)
        if(this.quick)
            return;
        this.dispatchEventWith('video',false,data)
        //this.videoList.push(data)
        //if(this.topKey.indexOf(data.type) != -1)
        //    this.topVideoList.push(data);
    }
	private wx3_functionX_12724(){console.log(2813)}

    public getTeamByID(teamID){
        //if(teamID == 'sys')
        //    return this.sysTeam;
        return this.team1.id == teamID?this.team1:this.team2
    }
    //public getTeamByRota(rota){
    //    return this.team1.atkRota == rota?this.team1:this.team2
    //}

    public getPlayer(id):PKPlayerData_wx3{
        return this.playerObj[id]
    }
	private wx3_functionX_12725(){console.log(1647)}

    public get otherPlayer(){
        return this.getPlayer(this.myPlayer.id==1?2:1)
    }

    //赢
    public isWin(){
        var team1 =  this.myPlayer.teamData
        var team2 =  this.myPlayer.teamData.enemy
        if(this.endless && this.actionTime >= this.endless)
            return true;
        if(this.needcd && this.actionTime >= this.needcd)
            return false;
        return team1.hp > 0 &&  team2.hp <= 0;
    }
    //平
	private wx3_functionX_12726(){console.log(9476)}
    public isDraw(){
        var team1 =  this.myPlayer.teamData
        var team2 =  this.myPlayer.teamData.enemy
        if(this.needcd && this.actionTime >= this.needcd)
            return false;
        return (team1.hp > 0 &&  team2.hp > 0) || (team1.hp <= 0 &&  team2.hp <= 0);
    }
    //赢输平
	private wx3_functionX_12727(){console.log(4410)}
    public getPKResult(){
        if(this.isWin())
            return 1;
        if(this.isDraw())
            return 3;
        return 2;
    }
	private wx3_functionX_12728(){console.log(4548)}

    ////找玩家对应的怪
    //public getMonsterByPlayer(playerid,type=0){
    //    var arr = [];
    //    for(var i=0;i<this.monsterList.length;i++)
    //    {
    //        var oo = this.monsterList[i];
    //         if(oo.owner == playerid)
    //         {
    //             if(type && oo.getVO().type != type)
    //                continue
    //             arr.push(oo)
    //         }
    //    }
    //    return arr;
    //}
    ////找玩家对应的怪的占位
    //public getMonsterSpaceByPlayer(playerid){
    //    var count = 0;
    //    for(var i=0;i<this.monsterList.length;i++)
    //    {
    //        var oo = this.monsterList[i];
    //         if(oo.owner == playerid)
    //         {
    //             count += oo.getVO().space;
    //         }
    //    }
    //    return count;
    //}


    //找对应的怪
    public getMonsterByID(id){
        for(var i=0;i<this.monsterList.length;i++)
        {
            var oo = this.monsterList[i];
	wx3_function(3586);
             if(oo.id == id)
             {
                 return oo;
             }
        }
        return null;
    }
    //找玩家对应的怪
	private wx3_functionX_12729(){console.log(2540)}
    public getMonsterByTeam(team,fun?,value?){
        var arr = [];
        for(var i=0;i<this.monsterList.length;i++)
        {
            var oo = this.monsterList[i];
             if(oo.getOwner().teamData == team)
             {
                 if(fun && !fun(oo,value))
                    continue;
	wx3_function(925);
                 arr.push(oo)
             }
        }
        return arr;
    }

    //找玩家对应的怪
	private wx3_functionX_12730(){console.log(4216)}
    public getMonsterByNoTeam(team,fun?,value?){
        var arr = [];
        for(var i=0;i<this.monsterList.length;i++)
        {
            var oo = this.monsterList[i];
             if(oo.getOwner().teamData != team)
             {
                 if(fun && !fun(oo,value))
                     continue;
	wx3_function(4880);
                 arr.push(oo)
             }
        }
        return arr;
    }

    //取队伍的最前的怪
	private wx3_functionX_12731(){console.log(6999)}
    public getFirstItem(taamID){
        var atkRota = PKData_wx3.getInstance().getTeamByID(taamID).atkRota;
        var chooseItem
        for(var i=0;i<this.monsterList.length;i++)
        {
            var item:PKMonsterData_wx3 = this.monsterList[i];
	wx3_function(3085);
            if(item.atkRota != atkRota)
                continue
            if(item.owner == 'sys')
                continue
            if(!chooseItem)
                chooseItem = item;
            else if(atkRota == PKConfig_wx3.ROTA_LEFT && chooseItem.x<item.x)
                chooseItem = item;
            else if(atkRota == PKConfig_wx3.ROTA_RIGHT && chooseItem.x>item.x)
                chooseItem = item;
	wx3_function(5421);
        }
        return chooseItem
    }

    //取队伍的后排的怪
    public getBackItem(taamID){
        var atkRota = PKData_wx3.getInstance().getTeamByID(taamID).atkRota;
	wx3_function(9630);
        var chooseItem
        for(var i=0;i<this.monsterList.length;i++)
        {
            var item:PKMonsterData_wx3 = this.monsterList[i];
            if(item.atkRota != atkRota)
                continue
            if(item.owner == 'sys')
                continue
            if(!chooseItem)
            {
                if(!item.getVO().isNearAtk())
                    chooseItem = item;
	wx3_function(6920);
            }
            else if(atkRota == PKConfig_wx3.ROTA_LEFT && chooseItem.x<item.x)
            {
                if(!item.getVO().isNearAtk())
                    chooseItem = item;
            }
            else if(atkRota == PKConfig_wx3.ROTA_RIGHT && chooseItem.x>item.x)
            {
                if(!item.getVO().isNearAtk())
                    chooseItem = item;
	wx3_function(4523);
            }
        }
        return chooseItem
    }

    public getFirstX(teamID){
         var item = this.getFirstItem(teamID);
        if(item)
            return item.x;
        return  this.getTeamByID(teamID).atkRota == PKConfig_wx3.ROTA_LEFT ? PKConfig_wx3.appearPos:PKConfig_wx3.floorWidth + PKConfig_wx3.appearPos;
    }

    //加入怪到场上
	private wx3_functionX_12732(){console.log(2837)}
    public addMonster(data){
        var player = this.getPlayer(data.owner)
        var toFront = player.teamData.toFront
        if(toFront > 0)
        {   var frontItem:any = this.getFirstItem(player.teamData.id);
            if(frontItem)
            {
                data.x = frontItem.x;
	wx3_function(6563);
                if(!MonsterVO.getObject(data.mid).isNearAtk())
                {
                    data.x += player.teamData.atkRota == PKConfig_wx3.ROTA_LEFT?-60:60
                }
            }
        }

        var monster = new PKMonsterData_wx3(data)
        monster.id = this.monsterID;
	wx3_function(3351);
        this.monsterID ++;
        this.monsterList.push(monster);

        this.addVideo({
            type:PKConfig_wx3.VIDEO_MONSTER_ADD,
            user:monster
        })

	wx3_function(5534);
        MBase_wx3.getData(monster.mid).onCreate_wx3(monster);

        monster.getOwner().teamData.testState(PKConfig_wx3.LISTENER_CREATE,monster);
        if(data.fromPos)
            monster.getOwner().teamData.testState(PKConfig_wx3.LISTENER_CREATE_POS,monster);
        this.monsterChange = true;
	wx3_function(3780);

        this.history[monster.id] = ({
            id:monster.id,
            mid:monster.mid,
            owner:monster.owner,
            actionTime:this.actionTime
        })
        monster['xxx'] = this.actionTime + '|' + monster.id
        this.actionRecord.push('create|' + this.actionTime + '|' + monster.id + '|' + monster.mid+ '|' + monster.owner)
        return monster;
    }
	private wx3_functionX_12733(){console.log(102)}

    //重置战场上的怪的数据
    public resetMonsterData(){
        if(!this.monsterChange)
            return;
        this.monsterChange = true;
        for(var i=0;i<this.monsterList.length;i++)
        {

        }
    }
	private wx3_functionX_12734(){console.log(4995)}

    //public changeMyPlayer(id){
    //    var player = this.getPlayer(id);
    //    if(player == this.myPlayer)
    //        return;
    //    this.myPlayer = player;
    //    this.addVideo({
    //        type:PKConfig_wx3.VIDEO_MYPLAYER_CHANGE,
    //        user:this.myPlayer
    //    })
    //}

    //public onPKInfo(data){
    //     //console.log(data);
    //    //var oo = {
    //    //    actiontime:posCard.actionTime,
    //    //    id:posCard.id,
    //    //    mid:posCard.mid,
    //    //    owner:posCard.owner
    //    //}
    //    if(data.owner != this.myPlayer.id)
    //    {
    //        var player = this.getPlayer(data.owner)
    //        if(Math.abs(data.actiontime - this.actionTime) > 3000)//偏差严重，重置游戏
    //        {
    //            MyWindow.Alert('重置')
    //            return;
    //        }
    //        //player.posCardFormServer(data)
    //    }
    //}
    //public onPKFace(data){
    //    if(data.owner != this.myPlayer.id)
    //    {
    //        PKFaceItem.createItem().show(data.id,-1);
    //    }
    //}

    //把数据发往服务器
    //private sendCardList = []
    //private sendCardListing = []
    //public sendCardToServer(posCard:PKPosCardData){
    //     this.sendCardList.push(posCard);
    //    this.testSendCard();
    //}
    //
    //private testSendCard(){
    //    if(this.sendCardListing.length == 0 && this.sendCardList.length > 0)
    //    {
    //        this.sendCardListing = this.sendCardList;
    //        this.sendCardList = [];
    //        PKManager.getInstance().sendPosToServer(this.sendCardListing,()=>{
    //            this.sendCardFinish();
    //        })
    //    }
    //}
    //private sendCardFinish(){
    //    if(this.sendCardListing.length == 0 && this.sendCardList.length > 0)
    //    {
    //        this.sendCardListing = this.sendCardList;
    //        this.sendCardList = [];
    //    }
    //}

    //移除场上怪物
    //public removeMonster(id){
    //    for(var i=0;i<this.monsterList.length;i++)
    //    {
    //        var oo = this.monsterList[i];
    //        if(oo.id == id)
    //        {
    //            this.monsterList.splice(i,1);
    //            return;
    //        }
    //    }
    //}
}