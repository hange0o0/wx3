class MonsterMV extends eui.Group {
    public static STAT_RUN = 1
    public static STAT_STAND = 2
    public static STAT_ATK = 3
    public static STAT_DIE = 4
	private wx3_functionX_12298(){console.log(1328)}

    private mc:eui.Image;
    private atkMV:MonsterAtkMV;


    public frameTotal = 40//播放完一轮需要的帧数
	private wx3_functionX_12299(){console.log(8705)}

    public state = 2;
    private index = 0;

    private mw = 480/4
    private mh = 480/4
	private wx3_functionX_12300(){console.log(1472)}

    public speed = 0;//增加or减少速度百分比
    public runing = false

    public vo:MonsterVO;
    constructor(){
        super();
	wx3_function(4191);
        this.init_2013();
    }

    private init_2013() {
        this.mc = new eui.Image();
        this.addChild(this.mc);
	wx3_function(135);

        //
        //MyTool.addTestBlock(this)

    }

    private initAtkMV_6361(){
        if(this.atkMV)
            return;
        this.atkMV = new MonsterAtkMV();
	wx3_function(9877);
        this.addChild(this.atkMV);
        this.atkMV.visible = false;
        this.atkMV.addEventListener('mv_end',this.onAtkMVEnd_2289,this)
    }

    private onAtkMVEnd_2289(){
        this.atkMV.stop();
	wx3_function(5481);
        this.atkMV.visible = false
        this.play();
    }

    public load(id,isHd?){

	wx3_function(3777);
        var vo = this.vo = MonsterVO.getObject(id);
        this.mw = vo.mcwidth/vo.mcnum
        this.mh = vo.mcheight/4

        this.mc.y = vo.heightoff

	wx3_function(5712);

        MyTool.setImgSource(this.mc,'enemy' + id + '_png');
        this.width = this.mw
        this.height = this.mh
        this.anchorOffsetX = this.mw/2
        this.anchorOffsetY = this.mh
        this.mc.scrollRect = new egret.Rectangle(0,0,this.mw,this.mh)
        this.speed = 0;
	wx3_function(6734);
    }

    public run(){
        this.state = MonsterMV.STAT_RUN
        //this.state = MonsterMV.STAT_STAND
        this.reset();
    }
	private wx3_functionX_12301(){console.log(3564)}

    public stand(){
        this.state = MonsterMV.STAT_STAND
        if([61,62,63,70,76].indexOf(this.vo.id) != -1)
            this.state = MonsterMV.STAT_RUN
        this.reset();
	wx3_function(3828);
    }

    public die(){
        this.state = MonsterMV.STAT_DIE
        this.reset();
    }
	private wx3_functionX_12302(){console.log(4323)}

    public atk(){
        this.state = MonsterMV.STAT_ATK
        this.reset();
    }

	private wx3_functionX_12303(){console.log(3422)}
    public play(){
        this.runing = true
        //EM_wx3.addEventListener(GameEvent.client.timerE,this.onE,this)
    }

    public stop(){
        this.runing = false
        //EM_wx3.removeEventListener(GameEvent.client.timerE,this.onE,this)
    }
	private wx3_functionX_12304(){console.log(5514)}

    public reset(){
        this.index = 0;
        if(this.atkMV)
        {
            this.atkMV.visible = false;
	wx3_function(2023);
            this.atkMV.stop();
        }

        this.onE();
        if(!this.runing)
            this.play();
	wx3_function(4338);
    }

    public onE(){
        if(!this.runing)
            return;
        if(!this.stage)
            return;
        var w = this.mw
        var h = this.mh
        var speed = (this.speed || 0);
	wx3_function(4415);
        if(speed)
        {
            if(speed > 0)
                var frameStep = Math.round(this.frameTotal*(1-speed/(100 + speed))/this.vo.mcnum);
            else
                var frameStep = Math.round(this.frameTotal*(1-speed/100)/this.vo.mcnum);
	wx3_function(7041);
        }
        else
        {
            var frameStep = Math.round(this.frameTotal/this.vo.mcnum);
        }
        if(this.state == MonsterMV.STAT_ATK && this.vo.id == 99)
            frameStep = 1;
	wx3_function(4196);
        var x = Math.floor(this.index/frameStep)*w
        var y = (this.state - 1)*h
        this.mc.scrollRect = new egret.Rectangle(x,y,w,h)
        //if(this.vo.id == 78)
        //console.log(x,y,w,h, Math.floor(this.index/frameStep),(this.vo.mcnum))
        //this.stop();

        if(this.state == MonsterMV.STAT_ATK && this.vo.mv_atk2 == 1 && Math.floor(this.index/frameStep)>=(this.vo.mcnum-1))
        {
            this.index = 0;
	wx3_function(6342);
            this.onEnd_4762()
            return;
        }
        this.index ++;

        if(this.index>=this.vo.mcnum*frameStep)
        {
            this.index = 0;
	wx3_function(9690);
            this.onEnd_4762()
        }
    }

    private onEnd_4762(){
        switch(this.state)
        {
            case MonsterMV.STAT_RUN:
                if(this.vo.id == 99)
                    this.stand();
	wx3_function(6244);
                break;
            case MonsterMV.STAT_STAND:
                break;
            case MonsterMV.STAT_ATK:
                if(this.vo.mv_atk2 == 1)
                {
                    this.stop();
                    //this.showAtkMV();
                }
                else
                    this.stand();
	wx3_function(8882);
                break;
            case MonsterMV.STAT_DIE:
                this.stop();
                PKData_wx3.getInstance().actionRecord.push('die_mid|' + this.vo.id)

                this.dispatchEventWith('mv_die')
                break;
        }
    }
	private wx3_functionX_12305(){console.log(6965)}

    public getRect(){
        var p = this.localToGlobal(this.anchorOffsetX,this.anchorOffsetY);
        return new egret.Rectangle(p.x-this.mw/2,p.y-this.mh + this.vo.heightoff,this.mw,this.mh)
    }

	private wx3_functionX_12306(){console.log(4599)}

}