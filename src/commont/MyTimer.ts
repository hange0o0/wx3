class MyTimer extends egret.EventDispatcher {
    private cd = 0;
    private timer
    private lastTime = 0;
    public constructor(v) {
        super();
	wx3_function(4345);
        this.cd = v;
        this.timer = new egret.Timer(v);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onE_5676,this)


    }
	private wx3_functionX_11832(){console.log(5771)}

    private onE_5676(){
        var total = egret.getTimer() - this.lastTime;
        var num = Math.floor(total/this.cd)
        if(total > 3000)//卡太久，跳过
        {
            this.dispatchEventWith(egret.TimerEvent.TIMER)
            this.lastTime = egret.getTimer();
	wx3_function(9488);
            return;
        }
        while(num --)
        {
            this.dispatchEventWith(egret.TimerEvent.TIMER)
            this.lastTime += this.cd;
	wx3_function(6058);
        }
    }

    public start(){
       this.timer.start();
        this.lastTime = egret.getTimer()
    }
	private wx3_functionX_11833(){console.log(5863)}

    public stop(){
        this.timer.stop();
    }


	private wx3_functionX_11834(){console.log(1757)}

}