class MainWorkMonsterItem extends PKMonsterMV {
    private static pool2 = [];
    public static createItem():MainWorkMonsterItem {
        var item:MainWorkMonsterItem = this.pool2.pop();
        if (!item) {
            item = new MainWorkMonsterItem();
            item.touchChildren = item.touchEnabled = false;
        }
        return item;
    }

    public static freeItem(item) {
        if (!item)
            return;
        item.remove();
        if (this.pool2.indexOf(item) == -1)
            this.pool2.push(item);
    }

    public coinMC
    public data;
    public constructor() {
        super();
        this.coinMC = new eui.Image('icon_coin_png')
        this.coinMC.scaleX = this.coinMC.scaleY = 0.6;
        this.addChild(this.coinMC)
        this.coinMC.x = -46/2 * this.coinMC.scaleX
    }

    public load(id){
        super.load(id);
        this.addChild(this.coinMC)
        this.coinMC.y = -this.showHeight() - 46/2 * this.coinMC.scaleX - 10;
        this.run();
    }

    public showCoin(){
        this.coinMC.visible = true
    }

    public hideCoin(){
        this.coinMC.visible = false
    }
}