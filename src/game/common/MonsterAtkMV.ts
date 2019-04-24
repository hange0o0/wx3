class MonsterAtkMV extends eui.Group {
    private mc:eui.Image;

    public frameTotal = 20//播放完一轮需要的帧数

	private wx3_functionX_12291(){console.log(8720)}
    public rota = 0; //0横向，1纵向
    private index = 0;

    private mw = 480/4
    private mh = 480/4

	private wx3_functionX_12292(){console.log(3862)}

    private frameNum = 4
    constructor(){
        super();
        this.init_4010();
    }
	private wx3_functionX_12293(){console.log(6969)}

    private init_4010() {
        this.mc = new eui.Image();
        this.addChild(this.mc);
        //
        //MyTool.addTestBlock(this)

    }
	private wx3_functionX_12294(){console.log(7548)}

    public load(id,rota,w,h,num=4){

        this.rota = rota;
        this.frameNum = num;
        if(rota == 0)
        {
            this.mw = w / num
            this.mh = h
        }
        else
        {
            this.mw = w
            this.mh = h/num
        }

	wx3_function(7015);

        MyTool.setImgSource(this.mc,id);

        this.width = this.mw
        this.height = this.mh
        this.mc.scrollRect = new egret.Rectangle(0,0,this.mw,this.mh)
    }
	private wx3_functionX_12295(){console.log(632)}


    public play(){
        this.reset_1654()
        this.addEventListener(egret.Event.ENTER_FRAME,this.onE_361,this)
    }
	private wx3_functionX_12296(){console.log(6903)}

    public stop(){
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onE_361,this)
    }

    private reset_1654(){
        this.index = 0;
	wx3_function(8774);
        this.onE_361();
    }

    private onE_361(){
        var w = this.mw
        var h = this.mh
        var frameStep = Math.round(this.frameTotal*(1)/this.frameNum);
	wx3_function(6291);

        if(this.rota == 0)
        {
            var x = Math.floor(this.index/frameStep)*w
            var y = 0
        }
        else
        {
            var y = Math.floor(this.index/frameStep)*h
            var x = 0
        }
        this.mc.scrollRect = new egret.Rectangle(x,y,w,h)
        this.index ++;
	wx3_function(7634);
        if(this.index>=this.frameNum*frameStep)
        {
            this.index = 0;
            this.onEnd_94()
        }
    }
	private wx3_functionX_12297(){console.log(6636)}

    private onEnd_94(){
        this.dispatchEventWith('mv_end')
    }

}