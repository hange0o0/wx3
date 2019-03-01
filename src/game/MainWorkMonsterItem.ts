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
    public giftTW;


    public constructor() {
        super();
        this.coinMC = new eui.Image('icon_coin_png')
        this.coinMC.scaleX = this.coinMC.scaleY = 0.6;
        this.addChild(this.coinMC)
        this.coinMC.anchorOffsetX = this.coinMC.anchorOffsetY = 46/2


    }

    public load(id){
        super.load(id);
        this.addChild(this.coinMC)
        this.coinMC.y = -this.showHeight() - 10;
        this.run();

        egret.Tween.removeTweens(this.coinMC);
        var tw = this.giftTW = egret.Tween.get(this.coinMC,{loop:true});
        var bs = 0.6
        tw.to({scaleX:1.1*bs,scaleY:0.8*bs},200).to({scaleX:1*bs,scaleY:1.1*bs,y:this.coinMC.y -15},200).
            to({scaleX:1.1*bs,scaleY:0.8*bs,y:this.coinMC.y},200).to({scaleX:1*bs,scaleY:1*bs},300).wait(200);
        this.giftTW.setPaused(true)
    }

    public showCoin(){
        this.coinMC.visible = true
        this.giftTW.setPaused(false)
    }

    public hideCoin(){
        this.coinMC.visible = false
        this.giftTW.setPaused(true)
    }
}