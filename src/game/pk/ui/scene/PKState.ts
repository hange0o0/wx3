class PKState_wx3 extends game.BaseItem_wx3 {

    private stateMC:eui.Image;
    private atkMV:MonsterAtkMV

	private wx3_functionX_13016(){console.log(5695)}
    private timer;
    public constructor() {
        super();
    }

    public childrenCreated() {
        super.childrenCreated();
	wx3_function(5605);
    }
    private wx3_fun_asdfasdfasdf_4688(){}
    private wx3_fun_ast34_1205(){}

    public dataChanged() {
        //if(!this.atkMV)
        //    this.atkMV = new MonsterAtkMV();
        if(this.data == PKConfig_wx3.STATE_YUN)
        {
            this.initAtkMV_1736();
	wx3_function(2771);
            this.atkMV.load('effect2_png',0,154,39,2)
        }
        else if(this.data == PKConfig_wx3.STATE_DIE)
        {
            this.initImg_677();
            this.stateMC.source = 'effect5_png'
            this.stateMC.anchorOffsetX = 30/2
        }
        //else if(this.data == PKConfig.STATE_MOMIAN)
        //{
        //    this.initImg_677();
        //    this.stateMC.source = 'icon_def2_png'
        //    this.stateMC.anchorOffsetX = 52/2
        //}
        else if(this.data == PKConfig_wx3.STATE_MODUN)
        {
            this.initImg_677();
            this.stateMC.source = 'border_9_png'
            this.stateMC.anchorOffsetX = 64/2
            this.stateMC.anchorOffsetY = 64
        }
        else if(this.data == PKConfig_wx3.STATE_MIANSHANG)
        {
             this.initImg_677();
            this.stateMC.source = 'effect3_png'
            this.stateMC.anchorOffsetX = 52/2
        }
    }
	private wx3_functionX_13017(){console.log(4182)}

    private initImg_677(){
        if(!this.stateMC)
        {
            this.stateMC = new eui.Image()
            this.addChild(this.stateMC)
        }
    }
	private wx3_functionX_13018(){console.log(8775)}
    private initAtkMV_1736() {
        if (!this.atkMV) {
            this.atkMV = new MonsterAtkMV();
            this.addChild(this.atkMV);
            this.atkMV.visible = true;
            this.atkMV.addEventListener('mv_end', this.onAtkMVEnd_7307, this)
        }
    }
	private wx3_functionX_13019(){console.log(8179)}

    private onAtkMVEnd_7307(){
        //if()
        //this.atkMV.stop();
    }

    public remove(){
        clearTimeout(this.timer)
        MyTool.removeMC(this);
	wx3_function(2755);
        if (this.atkMV)
            this.atkMV.stop()
    }

    public show(item){
        var mD:PKMonsterData_wx3 = item.data
        clearTimeout(this.timer);
	wx3_function(3574);
        switch (parseInt(this.data)){
            case PKConfig_wx3.STATE_YUN:
                this.atkMV.play()
                this.x = 50 -  154/4
                this.y = 300 - mD.getVO().height - 35
                break;
            case PKConfig_wx3.STATE_DIE:
                this.x = 50
                this.y = 300 - mD.getVO().height -50
                break;
            case PKConfig_wx3.STATE_MODUN:
                //this.atkMV.play()
                //var scale = (mD.getVO().height + 20)/128
                //this.x = 50 -  110/2*scale
                //this.y = 300 - mD.getVO().height-20
                //this.atkMV.scaleX = this.atkMV.scaleY = scale

                this.stateMC.scaleX = mD.getVO().width/64
                this.stateMC.scaleY = mD.getVO().height/64*1.3
                this.x = 50// -  154/4
                this.y = 300 + this.stateMC.scaleY*2// - mD.getVO().height - 35
                break;
            case PKConfig_wx3.STATE_MIANSHANG:
                this.scaleX = item.monsterMV.scaleX
                if(item.monsterMV.scaleX == 1)
                    this.x = 50 -  mD.getVO().width/2 +10
                else
                    this.x = 50 +  mD.getVO().width/2 -10
                this.y = 300 - mD.getVO().height - 30
                this.timer = setTimeout(()=>{this.remove()},100)
                break;
        }

    }
}