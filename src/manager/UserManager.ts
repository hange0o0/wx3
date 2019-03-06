class UserManager {
    public constructor() {

    }

    private static _instance: UserManager;

    public static getInstance():UserManager{
        if(!UserManager._instance)
            UserManager._instance = new UserManager();
        return UserManager._instance;
    }

    public maxEnergy = 20;
    public onLineAwardCD = [5*60,30*60,3600,2*3600,3*3600]


    public isTest;
    public gameid: string;
    public dbid: string;

    public coin: number = 999;
    public diamond: number = 0;
    public energy: any;
    public chapterLevel: number = 0;
    public friendNew: any = {};
    public coinObj:{
        loginTime,
        loginDays,
        loginDayAward,
        onLineAwardTime,
        onLineAwardNum,
        shareNum,
        newAward,
        shareAward
    }
    public guideFinish: boolean = false;

    public history = [];
    public initDataTime;
    public loginTime = 0


    public lastForce
    public fill(data:any):void{
        this.dbid = data._id;
        this.loginTime = data.loginTime || TM.now();
        this.coin = data.coin || 0;
        this.chapterLevel = data.tipsLevel || 0;
        this.diamond = data.diamond;
        this.energy = data.energy;
        this.guideFinish = data.guideFinish;
        this.coinObj = data.coinObj || {
                loginTime:TM.now(),   //登陆时间
                loginDays:1,   //登陆天数
                loginDayAward:0,   //领取登陆礼包
                onLineAwardTime:TM.now(),   //在线礼包领取时间
                onLineAwardNum:0,   //在线礼包领取数量
                shareNum:0,   //分享金币次数
                shareAward:0,   //分享金币次数
                newAward:0,   //分享金币次数
            };
        this.friendNew = data.friendNew;
        //this.writeKey = data.writeKey;

        this.initDataTime = TM.now();
        WorkManager.getInstance().initWork(data.work)
        TecManager.getInstance().initTec(data.tec)
        MonsterManager.getInstance().initMonster(data.monster,data.def)
        FightManager.getInstance().initFight(data.fight)

        this.history = SharedObjectManager.getInstance().getMyValue('history') || [];
        if(this.history.length > 20)
            this.history.length = 20;

        //统一计算一下数据
        FightManager.getInstance().onTimer();
        WorkManager.getInstance().onTimer();
        this.testPassDay();

        this.lastForce = this.getForce();
    }

    ////降低时间数据的位数
    //public now(){
    //    return TM.now() - UM.loginTime
    //}
    //
    //public nowMS(){
    //    return TM.nowMS() - UM.loginTime*1000;
    //}

    public getForce(){
        var force = 0;
        var mForce = 0;
        var MM = MonsterManager.getInstance();
        var TEM = TecManager.getInstance();
        var monsterList = MM.getOpenMonster();
        for(var i=0;i<monsterList.length;i++)
        {
             var vo = monsterList[i];
            mForce += (Math.pow(vo.cost,0.5)*(1+MM.getMonsterLevel(vo.id)/10)*MM.getMonsterNum(vo.id));
        }
        force += mForce;
        force += (TEM.getTecLevel(31) + TEM.getTecLevel(31))*0.05*mForce;
        force += (TEM.getTecLevel(33)*0.02 + TEM.getTecLevel(34)*0.06)*mForce;
        return Math.floor(force)
    }


    public saveHistory(){
        SharedObjectManager.getInstance().setMyValue('history',this.history)
        EM.dispatch(GameEvent.client.HISTORY_CHANGE)
    }

    public addCoin(v,stopSave?){
        if(!v)
            return;
        this.coin += v;
        if(this.coin < 0)
            this.coin = 0;
        if(!stopSave)
            PKManager.getInstance().needUpUser = true
        EM.dispatch(GameEvent.client.COIN_CHANGE)
    }


    public getUserInfo(fun){
        var wx = window['wx'];
        if(!wx)
        {
            this.fill(this.orginUserData());
            this.guideFinish = true;   //本地不进新手了
            fun && fun();
            return;
        }
        //wx.login({
        //    success:()=>{
                wx.cloud.callFunction({      //取玩家openID,
                    name: 'getInfo',
                    complete: (res) => {
                        console.log(res)
                        this.gameid = res.result.openid
                        this.isTest = res.result.isTest;
                        //console.log(11)
                        TimeManager.getInstance().initlogin(res.result.time)
                        //console.log(res.result.time)
                        this.loginUser(fun)
                    },
                    fail:()=>{
                       MyWindow.Alert('请求用户数据超时，请重新启动',()=>{
                           wx.exitMiniProgram({});
                       })
                    }
                })
        //    }
        //})
    }

    public loginUser(fun?){
        var wx = window['wx'];
        const db = wx.cloud.database();
        db.collection('user').where({     //取玩家数据
            _openid: this.gameid,
        }).get({
            success: (res)=>{
                if(res.data.length == 0)//新用户
                {
                    this.onNewUser(fun)
                    return;
                }
                this.fill(res.data[0]);
                //this.testAddInvite();
                fun && fun();
            }
        })
    }

    public renewFriendNew(fun)
    {
        if(TM.now() - this.initDataTime < 10*60)
        {
            fun && fun();
            return;
        }
        this.initDataTime = TM.now();
        var wx = window['wx'];
        if(!wx)
        {
            fun && fun();
            return;
        }
        const db = wx.cloud.database();
        db.collection('user').where({     //取玩家数据
            _openid: this.gameid,
        }).get({
            success: (res)=>{
                var data = res.data[0];
                this.friendNew = data.friendNew;
                fun && fun();
            }
        })
    }

    private testAddInvite(){
        var wx = window['wx'];
        var query = wx.getLaunchOptionsSync().query;
        if(query.type == '1')
        {
            wx.cloud.callFunction({      //取玩家openID,
                name: 'onShareIn',
                data:{
                    other:query.from,
                    skinid:query.skinid,
                },
                complete: (res) => {
                     //console.log(res)
                }
            })
        }
    }

    //新用户注册
    private onNewUser(fun?){
        var wx = window['wx'];
        const db = wx.cloud.database();
        var initData:any = this.orginUserData();
        db.collection('user').add({
            data:initData,
            success: (res)=>{
                initData._id = res._id;
                this.fill(initData);
                fun && fun();
            }
        })

        this.testAddInvite();
    }

    private orginUserData(){
         return {
             loginTime:TM.now(),   //$
             coin:300,   //$
             coinwin:0,   //$
             win:0,   //$
             total:0,   //$
             guideFinish:false,
             chapterLevel:1,
             tipsLevel:0,
             fight:{},
             energy:{v:0,t:0},
             def:'1,48,2,3,4,5,6,7,9,10',
             work:['1#0#0#1','2#0#0#1','3#0#0#1','4#0#0#1','70#0#0#1','48#0#0#1'], //初始1个在工作
             coinObj:{
                 loginTime:TM.now(),   //登陆时间
                 loginDays:1,   //登陆天数
                 loginDayAward:0,   //领取登陆礼包
                 onLineAwardTime:TM.now(),   //在线礼包领取时间
                 onLineAwardNum:0,   //在线礼包领取数量
                 shareNum:0,   //分享金币次数
                 shareAward:0,   //分享金币次数
                 newAward:0,   //拉新领奖次数
             },
             friendNew:{}//拉新
         };
    }

    //跨天处理
    public testPassDay(){
        if(!this.coinObj)
            return false;
        if(DateUtil.isSameDay(this.coinObj.loginTime))
            return false;
        this.coinObj.loginTime = TM.now();
        this.coinObj.loginDays ++;
        this.coinObj.loginDayAward = 0;
        this.coinObj.onLineAwardTime = this.coinObj.loginTime;
        this.coinObj.onLineAwardNum = 0;
        this.coinObj.shareNum = 0;
        this.coinObj.shareAward = 0;
        PKManager.getInstance().needUpUser = true;
        return true;
    }



    public addEnergy(v){
         if(!v)
            return;
        this.resetEnergy();
        this.energy.v += v;
    }

    private resetEnergy(){
        var v = this.getEnergyStep();
        var t = TM.now();
        var add =  Math.floor((t - this.energy.t)/v)
        if(add > 0)
        {
            this.energy.v = Math.min(this.maxEnergy,this.energy.v + add);
            this.energy.t = this.energy.t + add*v;
            EM.dispatchEventWith(GameEvent.client.energy_change)
        }
    }

    public getEnergy(){
        this.resetEnergy();
        return this.energy.v;
    }

    public getEnergyStep(){
        return 30*60;
    }

    public getNextEnergyCD(){
        var v = this.getEnergyStep();
        this.getEnergy();
        //if(this.energy.t == TM.now())
        //    return 0;
        return  this.energy.t + v -  TM.now();
    }



}
