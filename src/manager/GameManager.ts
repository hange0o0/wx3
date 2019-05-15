class GameManager_wx3 {
    private static _instance:GameManager_wx3;
    public static getInstance():GameManager_wx3 {
        if (!this._instance)
            this._instance = new GameManager_wx3();
        return this._instance;
    }
	private wx3_functionX_12027(){console.log(1909)}

    private timeID: egret.Timer;
    private timeE = new MyTimer(1000/60);
    private lastTime: number;
    public lastTouchTime: number;
    public lastTouchMC;
	private wx3_functionX_12028(){console.log(5312)}
    public changeUserTime = 0
    public changeUserID = 0

    public onShowFun
    public shareFailTime = 0;
	public constructor() {
        this.timeID = new egret.Timer(1000);
	wx3_function(9713);
        this.timeID.addEventListener(egret.TimerEvent.TIMER,this.timerun_4261,this);
        this.timeID.start();

        this.timeE.addEventListener(egret.TimerEvent.TIMER,this.onTimeE_3339,this);
        this.timeE.start();
	}
	private wx3_functionX_12029(){console.log(499)}
	
    public static stage:egret.Stage;
    public static stageX;
    public static stageY;
    public static container:egret.DisplayObjectContainer;
    public static loadStep
	private wx3_functionX_12030(){console.log(2729)}


    public static isLiuHai(){
        return this.stage.stageHeight > 1250;
    }
    public static paddingTop(){
        return GameManager_wx3.isLiuHai()?50:0
    }
	private wx3_functionX_12031(){console.log(9326)}

    public static get uiHeight(){
        var h = this.stage.stageHeight - Config.adHeight;

        if(this.isLiuHai())
        {
            if(App.isIphoneX)
                return h-this.paddingTop()-30;
            return h-this.paddingTop();
        }
        return h//Math.min(1136,this.stage.stageHeight);
        //return this.stage.stageHeight;
    }
	private wx3_functionX_12032(){console.log(5948)}
    public static get uiWidth(){
        return this.stage.stageWidth;
    }

    public isWebGL(){
        return egret.Capabilities.renderMode == 'webgl';
    }
	private wx3_functionX_12033(){console.log(640)}

    public init(){
        GameManager_wx3.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove_8881,this);
        GameManager_wx3.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin_2672,this);
        //this.createAD_3105();
    }

	private wx3_functionX_12034(){console.log(1664)}
    private createAD_3105(){
        //Config.adHeight = 200;
        if(!window['wx'])
            return;
        if(GameManager_wx3.stage.stageHeight < 1080)
            return;


        var btnw = Math.min(Math.pow(GameManager_wx3.stage.stageHeight/1330,1.6)*640,640)

	wx3_function(3816);
        let scalex = screen.availWidth/640;
        let scaley = screen.availHeight/GameManager_wx3.stage.stageHeight;
        if(btnw * scalex < 300){ //微信限制广告宽度不能小于300
            btnw = 300 / scalex;
        }
        Config.adHeight =  btnw/640 * 224;
	wx3_function(776);
        var  btny = GameManager_wx3.uiHeight;//给广告留的高度
        var  paddingTop = GameManager_wx3.paddingTop();
        var btnx =  (640-btnw)/2;

        let left = scalex * (btnx);
        let top = scaley * (btny + paddingTop);
	wx3_function(7899);
        let width = scalex * btnw;

        let bannerAd = wx.createBannerAd({
            adUnitId: 'adunit-d406f443acb5f7d2',
            style: {
                left: left,
                top: top,
                width: width
            }
        })
        bannerAd.onError(()=>{
            Config.adHeight = 0
            GameManager_wx3.stage.dispatchEventWith(egret.Event.RESIZE);
	wx3_function(7938);
        })
        bannerAd.onLoad(()=>{

        })
        bannerAd.onResize((res)=>{
            var hh = res.height/scalex*(640/btnw);
	wx3_function(612);
            if(Math.abs(hh - 224)/224 > 0.02)
            {
                Config.adHeight =  btnw/640 * hh;
                GameManager_wx3.stage.dispatchEventWith(egret.Event.RESIZE);
                bannerAd.style.top = scaley * (GameManager_wx3.uiHeight + paddingTop);
            }
            //console.log(res,scalex,scaley,GameManager.stage.stageHeight)
        })
        bannerAd.show()
    }
	private wx3_functionX_12035(){console.log(8759)}

    public stopTimer(){
        this.timeID.stop();
        this.timeE.stop();
    }

	private wx3_functionX_12036(){console.log(7149)}

    private onTimeE_3339(){
        EM_wx3.dispatch(GameEvent.client.timerE);
    }


	private wx3_functionX_12037(){console.log(8931)}
    private onTouchMove_8881(e){
        GameManager_wx3.stageX = e.stageX;
        GameManager_wx3.stageY = e.stageY;
    }
    private onTouchBegin_2672(e){
        this.lastTouchMC = e.target;
	wx3_function(5030);
        GameManager_wx3.stageX = e.stageX;
        GameManager_wx3.stageY = e.stageY;
        this.lastTouchTime = egret.getTimer();
    }


	private wx3_functionX_12038(){console.log(76)}
    private timerun_4261(): void {
        if(!UM_wx3.gameid)
            return;
        var now = TM_wx3.now();
        if(!this.lastTime) {
            this.lastTime = now;
	wx3_function(9936);
            return;
        }
        if(!DateUtil.isSameDay(this.lastTime,now))//跨0点
        {
            //TeamPVEManager.getInstance().passDay();
            //DayGameManager.getInstance().passDay();
            //GuessManager.getInstance().passDay();

            UserManager_wx3.getInstance().testPassDay();
	wx3_function(737);
            EM_wx3.dispatch(GameEvent.client.pass_day);
        }

        WorkManager.getInstance().onTimer();
        FightManager.getInstance().onTimer();
        TaskManager.getInstance().onTimer();
	wx3_function(6941);
        EM_wx3.dispatch(GameEvent.client.timer);

        //if(UM.friendtime == 0){  //拿过日志了
        //    if(now%30 == 0) //5分钟请求一次
        //    {
        //        FriendManager.getInstance().getLog(null,null,false);
        //    }
        //}
        this.lastTime = now
        //if(SyncDataManager.getInstance().lastConnectTime && now - SyncDataManager.getInstance().lastConnectTime > 3600) //超过1小时要重新登录
        //{
        //    MyWindow.AlertRelogin('已经离开很长时间了，请重新登陆吧')
        //}
    }

    //取现在到晚上12点还差的时间
    public getZeroCD(){
        return this.getZeroTime() - TM_wx3.now();
    }
	private wx3_functionX_12039(){console.log(7360)}
    public getZeroTime(){
        var d= DateUtil.timeToChineseDate(TM_wx3.now());
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        d.setHours(24);
	wx3_function(7161);

        return Math.floor(d.getTime()/1000);
    }

}


class App {
	private wx3_functionX_12040(){console.log(6268)}
    public static touchEvent: string = egret.TouchEvent.TOUCH_TAP;
    
    public constructor() {
    }

    public static get isIphoneX():boolean{
        let hh = screen.height, ww = screen.width;
        if(window['wx']){
            hh = screen.availHeight, ww = screen.availWidth;
        }
        let _iphoneX = /iphone/gi.test(navigator.userAgent) && (hh == 812 && ww == 375);
        let _iphoneXR = /iphone/gi.test(navigator.userAgent) && (hh == 896 && ww == 414);
        return _iphoneX || _iphoneXR;
    }
	private wx3_functionX_12041(){console.log(8241)}
    	
    public static get isMobile():boolean{
        return egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE;
    }
    public static get isAndroid():boolean{
        //var Agents:string[] = ["Android", "iPhone",  "SymbianOS", "Windows Phone",  "iPad", "iPod"];
        var ua:string = navigator.userAgent.toLowerCase();
        return ua.indexOf('android') != -1;
    }
	private wx3_functionX_12042(){console.log(9677)}
    public static get isIOS():boolean{
        //var Agents:string[] = ["Android", "iPhone",  "SymbianOS", "Windows Phone",  "iPad", "iPod"];
        var ua:string = navigator.userAgent.toLowerCase();
        return /ip(ad|hone|od)/.test(ua);
    }
}
//#stop_wx_change#//
function wx3_function(v){}
function sendClientError(str){
    var url =  'https://www.hangegame.com/error_wx3/log_error.php'
    Net.getInstance().send(url,{str:str});
}


if(window["wx"])
{
    //window["TeamUI"] = TeamUI;
    window["MainPKUI"] = MainPKUI_wx3;
    window["PKCardInfoUI_wx3"] = PKCardInfoUI_wx3;
    window["BottomUI"] = BottomUI;
    window["TopUI"] = TopUI
    window["ChangeUserUI"] = ChangeUserUI
    window["TaskItem"] = TaskItem
    window["wxRandomFunction"] = function(b){}
    window["sendClientError"] = sendClientError


    var wx =  window["wx"];

    wx.onError(function(res){
        UM_wx3.upDateUserData();
        try{
            var str = "onError:" + ("openid:" + UM_wx3.gameid + "--") + res.message + "--" + res.stack;
            sendClientError(str);
        }catch(e){}
    });

    wx.onHide(function(res){
        if(!GameManager_wx3.stage)
            return;
        UM_wx3.upDateUserData();
        SoundManager_wx3.getInstance().stopBgSound();
        GameManager_wx3.stage.dispatchEventWith(egret.Event.DEACTIVATE);
        console.log('hide')
        //GameUI.getInstance().cleanTouch();
    });

    wx.onShow(function(res){
        if(!GameManager_wx3.stage)
            return;
        if(PKManager_wx3.getInstance().isPKing && !MainPKUI_wx3.getInstance().finish)
            SoundManager_wx3.getInstance().playSound('pkbg');
        else
            SoundManager_wx3.getInstance().playSound('bg');
        GameManager_wx3.stage.dispatchEventWith(egret.Event.ACTIVATE);
        GameManager_wx3.getInstance().onShowFun && GameManager_wx3.getInstance().onShowFun();
        GameManager_wx3.getInstance().onShowFun = null;
        //GameUI.getInstance().cleanTouch();
        console.log('show')


        if(GameManager_wx3.getInstance().changeUserTime)
        {
            console.log(TM_wx3.now() - GameManager_wx3.getInstance().changeUserTime)
            if(TM_wx3.now() - GameManager_wx3.getInstance().changeUserTime > 30) //停留超过30秒
            {
                UM_wx3.coinObj.shareNum ++;
                UM_wx3.needUpUser = true;
                var arr = SharedObjectManager_wx3.getInstance().getMyValue('exchangeUserAppid')|| [];
                arr.unshift(GameManager_wx3.getInstance().changeUserID)
                if(arr.length > 5)
                    arr.length = 5;
                if(UM_wx3.coinObj.shareNum <= 3)
                    MyWindow.ShowTips('体验完成，可领取奖励！')
            }
        }
        GameManager_wx3.getInstance().changeUserTime = 0;
    });
    //wx.exitMiniProgram(function(res){
    //    if(!GameManager.stage)
    //        return;
    //    PKManager.getInstance().upDateUserData();
    //});

    wx.onShareAppMessage(() => ({
        title: '这个游戏很好玩，推荐一下',
        imageUrl: Config.localResRoot + "share_img_2.jpg"
    }))

    if(wx.getUpdateManager){ //1.9.90以上版本支持
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            //console.log(res.hasUpdate)
            if(res.hasUpdate){
                wx.showToast({icon:"none", title:"有新版本，正在下载中..", duration: 600000});//10分钟
                window["clearTempCache"] && window["clearTempCache"]();
            }
        })
        updateManager.onUpdateReady(function () {
            wx.hideToast();
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，请点击确定重启应用',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })

        })
        updateManager.onUpdateFailed(function () {
            wx.hideToast();
            wx.showModal({
                title: '更新提示',
                content: '新版本下载失败，点击确定重试哦',
                showCancel: false,
                success: function (res) {
                    updateManager.applyUpdate()
                }
            })
        })
    }


    window["wx"].setKeepScreenOn && window["wx"].setKeepScreenOn({keepScreenOn:true});//屏幕常亮

    Config.isDebug = false;
}
