class AddCoinItem extends game.BaseItem_wx3{

    private static pool = [];
    public static createItem():AddCoinItem {
        var item:AddCoinItem = this.pool.pop();
        if (!item) {
            item = new AddCoinItem();
        }
        return item;
    }
	private wx3_functionX_11898(){console.log(9743)}

    public static freeItem(item) {
        if (!item)
            return;
        item.remove();
        this.pool.push(item);
    }
	private wx3_functionX_11899(){console.log(434)}

    public static showMV(v,con)
    {
        var mc = this.createItem();
        mc.data = '+' + NumberUtil.addNumSeparator(v);
        mc.horizontalCenter = 0
        mc.verticalCenter = 0
        mc.alpha = 1
        con.addChild(mc);
        egret.Tween.get(mc).wait(200).to({verticalCenter:-120,alpha:0},1000).call(()=>{
            this.freeItem(mc);
        })
    }
	private wx3_functionX_11900(){console.log(683)}



    private addText: eui.Label;

    public constructor() {
        super();
	wx3_function(6042);
        this.touchChildren = this.touchEnabled = false;
        this.skinName = "AddCoinItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
	wx3_function(9911);
    }

    public dataChanged():void {
        this.addText.text = this.data;
    }

	private wx3_functionX_11901(){console.log(6839)}
    public remove(){
        MyTool.removeMC(this);
        egret.Tween.removeTweens(this);
    }

}