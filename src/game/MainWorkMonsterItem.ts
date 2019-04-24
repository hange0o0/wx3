class MainWorkMonsterItem extends PKMonsterMV_wx3 {
    private static pool2 = [];
    public static createItem():MainWorkMonsterItem {
        var item:MainWorkMonsterItem = this.pool2.pop();
        if (!item) {
            item = new MainWorkMonsterItem();
            item.touchChildren = item.touchEnabled = false;
        }
        return item;
    }
	private wx3_functionX_11950(){console.log(2641)}

    public static freeItem(item) {
        if (!item)
            return;
        item.remove();
        if (this.pool2.indexOf(item) == -1)
            this.pool2.push(item);
    }
	private wx3_functionX_11951(){console.log(2314)}

    public coinMC
    public data;
    public giftTW;


	private wx3_functionX_11952(){console.log(6187)}
    public constructor() {
        super();
        this.coinMC = new eui.Image('icon_coin_png')
        this.coinMC.scaleX = this.coinMC.scaleY = 0.6;
        this.addChild(this.coinMC)
        this.coinMC.anchorOffsetX = this.coinMC.anchorOffsetY = 46/2
    }
	private wx3_functionX_11953(){console.log(2182)}

    public load(id){
        super.load(id);
        this.addChild(this.coinMC)
        this.coinMC.y = -this.showHeight() - 10;
        this.run();
	wx3_function(923);

        egret.Tween.removeTweens(this.coinMC);
        var tw = this.giftTW = egret.Tween.get(this.coinMC,{loop:true});
        var bs = 0.6
        tw.to({scaleX:1.1*bs,scaleY:0.8*bs},200).to({scaleX:1*bs,scaleY:1.1*bs,y:this.coinMC.y -15},200).
            to({scaleX:1.1*bs,scaleY:0.8*bs,y:this.coinMC.y},200).to({scaleX:1*bs,scaleY:1*bs},300).wait(200);
	wx3_function(6989);
        this.giftTW.setPaused(true)
    }

    public showCoin(){
        this.coinMC.visible = true
        this.giftTW.setPaused(false)
    }
	private wx3_functionX_11954(){console.log(706)}

    public hideCoin(){
        this.coinMC.visible = false
        this.giftTW.setPaused(true)
    }
}