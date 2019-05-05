class DefItem extends game.BaseItem_wx3{

    private mc: eui.Image;
    private maskMC: eui.Image;
    private cdText: eui.Label;
	private wx3_functionX_11902(){console.log(1017)}

    public constructor() {
        super();
        this.skinName = "DefItemSkin";
    }

	private wx3_functionX_11903(){console.log(1830)}
    public childrenCreated() {
        super.childrenCreated();
        this.mc.mask = this.maskMC
        this.addBtnEvent(this,this.onClick)
    }

	private wx3_functionX_11904(){console.log(5541)}
    public onClick(e){
        e.stopImmediatePropagation()
        EnemyAtkInfo.getInstance().show(this.data);
    }

    public dataChanged():void {
        PKManager_wx3.getInstance().setHead(this.mc,this.data.robot.head);
	wx3_function(9397);
        this.onE();
    }

    public onE(){
        var robot = this.data.robot;
        var cd = robot.distanceTime - (TM_wx3.now() - this.data.time);
	wx3_function(2046);
        this.cdText.text = DateUtil.getStringBySecond(Math.max(0,cd)).substr(-5);
    }
}