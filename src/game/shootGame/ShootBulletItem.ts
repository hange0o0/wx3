class ShootBulletItem_wx3 extends game.BaseItem{

    private static pool = [];
    public static createItem():ShootBulletItem_wx3 {
        var item:ShootBulletItem_wx3 = this.pool.pop();
        if (!item) {
            item = new ShootBulletItem_wx3();
        }
        return item;
    }
	private wx3_functionX_12588(){console.log(890)}

    public static freeItem(item) {
        if (!item)
            return;
        item.remove();
        this.pool.push(item);
    }
	private wx3_functionX_12589(){console.log(9783)}


    public mc;
    public constructor() {
        super();
        this.touchChildren = this.touchEnabled = false;
	wx3_function(6058);
    }

    public childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = this.anchorOffsetY = 9;
        this.mc = new eui.Image('bullet9_png')
        this.addChild(this.mc);
	wx3_function(8195);
    }

    public dataChanged():void {

    }

	private wx3_functionX_12590(){console.log(6015)}
    public remove(){
        MyTool.removeMC(this);
        egret.Tween.removeTweens(this);
        console.log('remove')
    }

}