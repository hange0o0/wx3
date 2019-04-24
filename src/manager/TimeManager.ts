class TimeManager_wx3 {

	public constructor() {
	}
	
	private wx3_functionX_12043(){console.log(4745)}
    private static _instance: TimeManager_wx3;
    
    public static getInstance():TimeManager_wx3{
        if(!TimeManager_wx3._instance)
            TimeManager_wx3._instance = new TimeManager_wx3();
        return TimeManager_wx3._instance;
    }
	private wx3_functionX_12044(){console.log(5262)}
    
    private _timeDiff: number = 0;
    public get timeDiff():number {
        return this._timeDiff - DM.addTime;
    }

	private wx3_functionX_12045(){console.log(6097)}
    public loginTime: number = 0;//等陆时的服务器时间

    private loginWXTime = 0;
    public init(time:number):void{
        //本地和服务器的时间差
        this._timeDiff = Math.floor(Date.now() / 1000 - time);
    }
	private wx3_functionX_12046(){console.log(8290)}

    public getTimer(){
        var wx = window['wx'];
        if(wx)
            return  Math.floor((wx.getPerformance().now() -  this.loginWXTime)/1000)
        return egret.getTimer();
    }
	private wx3_functionX_12047(){console.log(8388)}

    public initlogin(t){
        var wx = window['wx'];
        this.loginWXTime = wx.getPerformance().now()
        this.loginTime = Math.floor(t/1000)//Math.floor((t - wx.getPerformance().now())/1000);
    }
	private wx3_functionX_12048(){console.log(5166)}
    
    public now():number{
        if(this.loginTime)
        {
            var wx = window['wx'];
            return this.loginTime + Math.floor(this.getTimer()/1000)
        }
        return Math.floor(Date.now() / 1000) - this.timeDiff //+ 24*3600 *7;
    }
	private wx3_functionX_12049(){console.log(5344)}
    public nowMS():number{
        if(this.loginTime)
        {
            var wx = window['wx'];
            return this.loginTime*1000 + this.getTimer();
        }
        return Date.now() - this.timeDiff*1000
    }
	private wx3_functionX_12050(){console.log(8596)}

    public getLastDayOfWeekDate(time:number, endDay:any):Date{
        endDay = endDay || 5;
        //得到今天是周几
        var d = new Date(time * 1000);
            var curDay = d.getDay();
            var add = endDay > curDay
            ? endDay - curDay
            : 7 - (curDay - endDay);
	wx3_function(8680);
            
            return new Date(d.getTime() + add * 24 * 3600 * 1000);
    }
    
    public offsetDate():Date{
        var offsetTime = -21600;
	wx3_function(4295);
        var time = this.now();
        time += offsetTime;
        return DateUtil.timeToChineseDate(time);
    }
    
    public chineseDate():Date{
        return DateUtil.timeToChineseDate(this.now());
    }
	private wx3_functionX_12051(){console.log(3453)}
    
    public getNextDateTime():number{
        return DateUtil.getNextDateTimeByHours(6);
    }
    
}
