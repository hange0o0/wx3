class DefItem extends game.BaseItem{

    private mc: eui.Image;
    private maskMC: eui.Image;
    private cdText: eui.Label;

    public constructor() {
        super();
        this.skinName = "DefItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.mc.mask = this.maskMC
        //this.addBtnEvent(this,this.onClick)
    }

    public dataChanged():void {
        PKManager.getInstance().setHead(this.mc,this.data.robot.head);
        this.onE();
    }

    public onE(){
        var robot = this.data.robot;
        var cd = robot.distanceTime - (TM.now() - this.data.time);
        this.cdText.text = DateUtil.getStringBySecond(Math.max(0,cd)).substr(-5);
    }
}