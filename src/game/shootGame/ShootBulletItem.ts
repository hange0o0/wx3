class ShootBulletItem_wx3 extends game.BaseItem{

    private static pool = [];
    public static createItem():ShootBulletItem_wx3 {
        var item:ShootBulletItem_wx3 = this.pool.pop();
        if (!item) {
            item = new ShootBulletItem_wx3();
        }
        return item;
    }

    public static freeItem(item) {
        if (!item)
            return;
        item.remove();
        this.pool.push(item);
    }


    public mc;
    public constructor() {
        super();
        this.touchChildren = this.touchEnabled = false;
    }

    public childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = this.anchorOffsetY = 9;
        this.mc = new eui.Image('bullet9_png')
        this.addChild(this.mc);
    }

    public dataChanged():void {

    }

    public remove(){
        MyTool.removeMC(this);
        egret.Tween.removeTweens(this);
        console.log('remove')
    }

}