class UserManager_wx3 {
    public constructor() {

    }

	private wx3_functionX_12052(){console.log(6326)}
    private static _instance: UserManager_wx3;

    public static getInstance():UserManager_wx3{
        if(!UserManager_wx3._instance)
            UserManager_wx3._instance = new UserManager_wx3();
        return UserManager_wx3._instance;
    }
	private wx3_functionX_12053(){console.log(1779)}

    private _needUpUser = false;
    public get needUpUser(){return this._needUpUser}
    public set needUpUser(v){this._needUpUser = v;v && egret.callLater(this.localSave_3476,this)}
    public maxEnergy = 20;
    public onLineAwardCD = [5*60,30*60,3600,2*3600,3*3600]
	private wx3_functionX_12054(){console.log(8001)}

    public nick
    public head
    public gender


	private wx3_functionX_12055(){console.log(5490)}
    public isTest;
    public testVersion = 1//与服务器相同则为测试版本
    public shareFail;

    public gameid: string;
    public dbid: string;
	private wx3_functionX_12056(){console.log(5942)}

    public coin: number = 999;
    public diamond: number = 0;
    public energy: any;
    public chapterLevel: number = 0;  //已完成关卡，默认为0
    public chapterStar: any = {};
	private wx3_functionX_12057(){console.log(3183)}
    public task: any;
    public dayTask: any;
    public chapterResetTime = 0;
    public chapterCoin = 0;
    public buffDiamond = 0;

	private wx3_functionX_12058(){console.log(539)}
    public shareUser = [];//buff玩家的数据   openid:{head,nick,time}

    public coinObj:{
        loginTime,
        //loginDays,
        //loginDayAward,
        //onLineAwardTime,
        //onLineAwardNum,
        shareNum,
        //newAward,
        videoNum,
        videoAwardNum,
        gameNum,
        shareAward
    }
    //public guideFinish: boolean = false;
	private wx3_functionX_12059(){console.log(2865)}

    public initDataTime;
    public loginTime = 0
    public maxForce = 0


	private wx3_functionX_12060(){console.log(9076)}
    public isFirst = false
    public hourEarn = 0;
    public offlineTime
    public fill(data:any):void{
        //this.isFirst = true;     //debug

        //console.log(data)

        var localData = SharedObjectManager_wx3.getInstance().getMyValue('localSave')
        if(localData && localData.saveTime && localData.saveTime - data.saveTime > 10) //本地的数据更新
        {
            //console.log('overwrite')
            for(var s in localData)
            {
                data[s] = localData[s];
	wx3_function(8472);
            }
        }
        var saveTime = data.saveTime;

        this.dbid = data._id;
        this.loginTime = data.loginTime || TM_wx3.now();
	wx3_function(4489);
        this.coin = data.coin || 0;
        this.diamond = data.diamond || 0;
        this.energy = data.energy;
        //this.guideFinish = data.guideFinish;
        this.chapterStar = data.chapterStar;
        this.chapterLevel = data.chapterLevel || 0;
        this.chapterResetTime = data.chapterResetTime;
	wx3_function(6461);
        this.chapterCoin = data.chapterCoin;
        this.maxForce = data.maxForce;
        this.shareUser = data.shareUser;
        this.buffDiamond = data.buffDiamond || 0;
        this.task = data.task || 0;
        this.dayTask = data.dayTask || [];
	wx3_function(1717);
        this.coinObj = data.coinObj || {
                loginTime:TM_wx3.now(),   //登陆时间
                shareNum:0,   //分享金币次数
                shareAward:0,   //分享金币次数
                videoNum:0,
                videoAwardNum:0,
                gameNum:0,
            };
	wx3_function(5500);

        //if(!window['wx'])
        //{
        //    this.shareUser = [
        //        {h:'',n:'1'},
        //        {h:'',n:'2'},
        //        {h:'',n:'3'},
        //        {h:'',n:'4'},
        //        {h:'',n:'5'},
        //        {h:'',n:'6'},
        //        {h:'',n:'7'},
        //    ]
        //}

        this.initDataTime = TM_wx3.now();
        WorkManager.getInstance().initWork(data.work)
        TecManager.getInstance().initTec(data.tec)
        MonsterManager.getInstance().initMonster(data.monster,data.def)
        FightManager.getInstance().initFight(data.fight)

	wx3_function(5880);


        //统一计算一下数据
        FightManager.getInstance().onTimer();
        WorkManager.getInstance().onTimer();
        this.testPassDay();

        //this.lastForce = this.getForce();
	wx3_function(2616);

        DM.addTime = SharedObjectManager_wx3.getInstance().getMyValue('addTime') || 0;


        ChapterManager.getInstance().setChapterEarn();//里面有resetHourEarn
        this.offlineTime = TM_wx3.now() - saveTime;
	wx3_function(4886);


        this.localSave_3476();
    }

    //重置时产
    public resetHourEarn(){
        this.hourEarn = Math.max(this.hourEarn,WorkManager.getInstance().getTotalHourEarn() + ChapterManager.getInstance().maxEarn*(3600/ChapterManager.getInstance().collectCD))
    }
	private wx3_functionX_12061(){console.log(6126)}

    public renewInfo(userInfo){
        if(!userInfo)
            return;
        this.nick = userInfo.nickName
        this.head = userInfo.avatarUrl
        this.gender = userInfo.gender || 1 //性别 0：未知、1：男、2：女
    }
	private wx3_functionX_12062(){console.log(8888)}

    ////降低时间数据的位数
    //public now(){
    //    return TM.now() - UM.loginTime
    //}
    //
    //public nowMS(){
    //    return TM.nowMS() - UM.loginTime*1000;
    //}

    //public getForce(){
    //    var force = 0;
    //    var mForce = 0;
    //    var MM = MonsterManager.getInstance();
    //    var TEM = TecManager.getInstance();
    //    var monsterList = MM.getOpenMonster();
    //    for(var i=0;i<monsterList.length;i++)
    //    {
    //         var vo = monsterList[i];
    //        mForce += (Math.pow(vo.cost,0.5)*(1+MM.getMonsterLevel(vo.id)/10)*MM.getMonsterNum(vo.id));
    //    }
    //    force += mForce;
    //    force += (TEM.getTecLevel(31) + TEM.getTecLevel(31))*0.05*mForce;
    //    force += (TEM.getTecLevel(33)*0.02 + TEM.getTecLevel(34)*0.06)*mForce;
    //    return Math.floor(force)
    //}



    public get coinText(){
        return NumberUtil.addNumSeparator(this.coin,2)
    }
	private wx3_functionX_12063(){console.log(6330)}

    public addCoin(v,stopSave?){
        if(!v)
            return;
        this.coin += v;
        if(this.coin < 0)
            this.coin = 0;
	wx3_function(4548);
        if(!stopSave)
            UM_wx3.needUpUser = true;
        EM_wx3.dispatch(GameEvent.client.COIN_CHANGE)
    }
    public addDiamond(v){
        if(!v)
            return;
        this.diamond += v;
	wx3_function(4445);
        if(this.diamond < 0)
            this.diamond = 0;
        UM_wx3.needUpUser = true;
        EM_wx3.dispatch(GameEvent.client.DIAMOND_CHANGE)
    }

	private wx3_functionX_12064(){console.log(5482)}

    public getUserInfo(fun){
        var wx = window['wx'];
        if(!wx)
        {
            setTimeout(()=>{
                this.gameid = _get['openid'];
	wx3_function(4054);
                this.isFirst = !SharedObjectManager_wx3.getInstance().getMyValue('localSave')
                this.fill(this.orginUserData_4330());
                fun && fun();
            },1000)
            return;
        }
        //wx.login({
        //    success:()=>{
                wx.cloud.callFunction({      //取玩家openID,
                    name: 'getInfo',
                    complete: (res) => {
                        if(!res.result)
                        {
                            MyWindow.Alert('请求用户数据失败，请重新启动',()=>{
                                wx.exitMiniProgram({});
	wx3_function(5245);
                            })
                            return;
                        }
                        //console.log(res)
                        this.gameid = res.result.openid
                        this.isTest = res.result.testVersion == this.testVersion;
                        this.shareFail = res.result.shareFail;
                        //console.log(11)
                        TimeManager_wx3.getInstance().initlogin(res.result.time)
                        //console.log(res.result.time)
                        this.loginUser(fun)
                    },
                    fail:()=>{
                       MyWindow.Alert('请求用户数据超时，请重新启动',()=>{
                           wx.exitMiniProgram({});
	wx3_function(873);
                       })
                    }
                })
        //    }
        //})
    }

    public loginUser(fun?){
        var wx = window['wx'];
	wx3_function(8793);
        const db = wx.cloud.database();
        db.collection('user').where({     //取玩家数据
            _openid: this.gameid,
        }).get({
            success: (res)=>{
                //console.log(res,res.data.length == 0);
                if(res.data.length == 0)//新用户
                {
                    this.onNewUser_8595(fun)
                    return;
                }
                this.fill(res.data[0]);
	wx3_function(3790);
                fun && fun();
            }
        })
    }

    public renewFriendNew(fun)
    {
        if(TM_wx3.now() - this.initDataTime < 5*60)
        {
            fun && fun();
	wx3_function(8739);
            return;
        }
        this.initDataTime = TM_wx3.now();
        var wx = window['wx'];
        if(!wx)
        {
            fun && fun();
	wx3_function(6674);
            return;
        }
        const db = wx.cloud.database();
        db.collection('user').where({     //取玩家数据
            _openid: this.gameid,
        }).get({
            success: (res)=>{
                var data = res.data[0];
	wx3_function(5230);
                this.shareUser = data.shareUser;
                fun && fun();
            }
        })
    }

	private wx3_functionX_12065(){console.log(2795)}
    public testAddInvite(){
        //console.log('testAddInvite')
        if(!this.isFirst)
            return;
        var wx = window['wx'];
        if(!wx)
            return;
        var query = wx.getLaunchOptionsSync().query;
        //console.log(query)
        if(query.type == '1')
        {
            wx.cloud.callFunction({      //取玩家openID,
                name: 'onShareIn',
                data:{
                    other:query.from,
                    nick:UM_wx3.nick,
                    head:UM_wx3.head,
                },
                complete: (res) => {
                     console.log(res)
                }
            })
        }
    }
	private wx3_functionX_12066(){console.log(4873)}

    //新用户注册
    private onNewUser_8595(fun?){
        //console.log('newUser')
        this.isFirst = true;
        var wx = window['wx'];
        const db = wx.cloud.database();
        var initData:any = this.orginUserData_4330();
	wx3_function(9568);
        db.collection('user').add({
            data:initData,
            success: (res)=>{
                initData._id = res._id;
                this.fill(initData);
                fun && fun();
	wx3_function(1780);
            }
        })
        //
        //this.needUpUser = true;
    }

    private orginUserData_4330(){
         return {
             loginTime:TM_wx3.now(),   //$
             coin:10000,   //$
             diamond:50,   //$
             guideFinish:true,
             chapterLevel:0,
             chapterStar:{},
             chapterResetTime:0,
             chapterCoin:0,
             task:0,
             dayTask:[],
             fight:{},
             saveTime:0,
             buffDiamond:0,
             energy:{v:0,t:0},
             shareUser:[],
             def:'',
             work:'65#0#1', //初始1个在工作
             coinObj:{
                 loginTime:TM_wx3.now(),   //登陆时间
                 //loginDays:1,   //登陆天数
                 //loginDayAward:0,   //领取登陆礼包
                 //onLineAwardTime:TM.now(),   //在线礼包领取时间
                 //onLineAwardNum:0,   //在线礼包领取数量
                 shareNum:0,   //分享金币次数
                 shareAward:0,   //分享金币次数
                 //newAward:0,   //拉新领奖次数
                 videoNum:0,
                 videoAwardNum:0,
                 gameNum:0,
             },
         };
	wx3_function(4254);
    }

    //跨天处理
    public testPassDay(){
        if(!this.coinObj)
            return false;
        if(DateUtil.isSameDay(this.coinObj.loginTime))
            return false;
        this.coinObj.loginTime = TM_wx3.now();
        //this.coinObj.loginDays ++;
        //this.coinObj.loginDayAward = 0;
        //this.coinObj.onLineAwardTime = this.coinObj.loginTime;
        //this.coinObj.onLineAwardNum = 0;
	wx3_function(3804);
        this.coinObj.shareNum = 0;
        this.coinObj.shareAward = 0;
        this.coinObj.videoNum = 0;
        this.coinObj.videoAwardNum = 0;
        this.coinObj.gameNum = 0;
        UM_wx3.needUpUser = true;
	wx3_function(9805);
        return true;
    }

    private getUpdataData_5960(){
        return {
            loginTime:UM_wx3.loginTime,
            coin:UM_wx3.coin,
            diamond:UM_wx3.diamond,
            buffDiamond:UM_wx3.buffDiamond,
            energy:UM_wx3.energy,
            work:WorkManager.getInstance().getWorkSave(),
            def:MonsterManager.getInstance().defList,
            fight:FightManager.getInstance().getFightSave(),
            monster:MonsterManager.getInstance().monsterData,
            tec:TecManager.getInstance().tecData,
            chapterLevel:UM_wx3.chapterLevel,
            chapterStar:UM_wx3.chapterStar,
            chapterResetTime:UM_wx3.chapterResetTime,
            chapterCoin:UM_wx3.chapterCoin,
            maxForce:UM_wx3.maxForce,
            coinObj:UM_wx3.coinObj,
            task:UM_wx3.task,
            dayTask:UM_wx3.dayTask,
            //guideFinish:UM.guideFinish,
            saveTime:TM_wx3.now(),
        };
	wx3_function(6899);
    }

    public upDateUserData(){
        if(!this.needUpUser)
            return;
        var wx = window['wx'];
	wx3_function(3623);
        if(wx)
        {
            var updateData:any = this.getUpdataData_5960();;
            WXDB.updata('user',updateData)
        }
        this.needUpUser = false;
	wx3_function(2721);
        FightManager.getInstance().save();
        this.localSave_3476();
        //this.upWXData();
    }

    private localSave_3476(){
        FightManager.getInstance().save();
	wx3_function(8901);
        SharedObjectManager_wx3.getInstance().setMyValue('localSave',this.getUpdataData_5960())
    }
    //
    ////如果战力不同则上传数据
    //public upWXData(){
    //    var wx = window['wx'];
    //    if(!wx)
    //        return;
    //    var currentForce =  UM.getForce()
    //    if(currentForce == UM.lastForce)
    //        return;
    //    UM.lastForce = currentForce;
    //    var score = JSON.stringify({"wxgame":{"score":currentForce,"update_time": TM.now()}})
    //    var upList = [{ key: 'force', value: score}];
    //    wx.setUserCloudStorage({
    //        KVDataList: upList,
    //        success: res => {
    //            console.log(res);
    //        },
    //        fail: res => {
    //            console.log(res);
    //        }
    //    });
    //}

    public upWXChapter(){
        var wx = window['wx'];
        if(!wx)
            return;
        var score = JSON.stringify({"wxgame":{"score":UM_wx3.chapterLevel,"update_time": TM_wx3.now()}})
        var upList = [{ key: 'chapter', value: score}]; //{ key: 'level', value: UM.chapterLevel + ',' + TM.now()},
        wx.setUserCloudStorage({
            KVDataList: upList,
            success: res => {
                console.log(res);
	wx3_function(611);
            },
            fail: res => {
                console.log(res);
            }
        });
    }
	private wx3_functionX_12067(){console.log(2837)}

    public addEnergy(v){
         if(!v)
            return;
        this.resetEnergy_8069();
        if(this.energy.v >= this.maxEnergy)
            this.energy.t = TM_wx3.now();
	wx3_function(3303);
        this.energy.v += v;

        UM_wx3.needUpUser = true;
    }

    private resetEnergy_8069(){
        var v = this.getEnergyStep();
	wx3_function(2851);
        var t = TM_wx3.now();
        var add =  Math.floor((t - this.energy.t)/v)
        if(add > 0)
        {
            this.energy.v = Math.min(this.maxEnergy,this.energy.v + add);
            this.energy.t = this.energy.t + add*v;
	wx3_function(8365);
            EM_wx3.dispatchEventWith(GameEvent.client.energy_change)
        }
    }

    public getEnergy(){
        this.resetEnergy_8069();
	wx3_function(9641);
        return this.energy.v;
    }

    public getEnergyStep(){
        return 30*60;
    }
	private wx3_functionX_12068(){console.log(8352)}

    public getNextEnergyCD(){
        var v = this.getEnergyStep();
        this.getEnergy();
        //if(this.energy.t == TM.now())
        //    return 0;
        return  this.energy.t + v -  TM_wx3.now();
    }
	private wx3_functionX_12069(){console.log(178)}

    public checkCoin(value){
        if(UM_wx3.coin < value)
        {
            GetCoinUI.getInstance().show();
            return false
        }
        return true
    }
	private wx3_functionX_12070(){console.log(7697)}



}
