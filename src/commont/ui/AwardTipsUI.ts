class AwardTipsUI extends game.BaseContainer_wx3{
    private static instancePool = [];
    private static list = [];
    private static lastShowTime = 0;
    private static baseData = {
        diamond:{icon:'icon_diamond_png',color:0x6ffdfd},
        coin:{icon:'icon_coin_png',color:0xFBB646},
    }
    public static showTips(type,value) {
        var base = this.baseData[type]
        this.list.push({
            icon:base.icon,
            txt:MyTool.createHtml('+' + NumberUtil.addNumSeparator(value,2),base.color),
        })
        this.showText();
    }

    private static textTimer;
    private static showText(){
        clearTimeout(this.textTimer)
        if(this.list.length == 0)
            return;
        if(egret.getTimer() - this.lastShowTime < 400)
        {
            this.textTimer = setTimeout(()=>{
                AwardTipsUI.showText()
            },200);
            return;
        }
        var instance = this.instancePool.pop()
        if (!instance)
            instance = new AwardTipsUI();
        instance.show(this.list.shift());
        this.lastShowTime = egret.getTimer();
        if(this.list.length)
        {
            this.textTimer = setTimeout(()=>{
                AwardTipsUI.showText()
            },200);
        }
    }

    public static freeItem(item){
        this.instancePool.push(item);
        egret.Tween.removeTweens(item)
        MyTool.removeMC(item);
    }

    private icon: eui.Image;
    private txt: eui.Label;


    public constructor() {
        super();
        this.skinName = 'AwardTipsUISkin';
        this.touchChildren = this.touchEnabled = false;
    }

    public show(data){
        GameManager_wx3.stage.addChild(this);
        this.setHtml(this.txt,data.txt)
        this.icon.source = data.icon;
        this.alpha = 1;
        this.x = GameManager_wx3.stageX-200
        this.y = GameManager_wx3.stageY-50
        egret.Tween.get(this).to({y:this.y-150,alpha:0},1500).call(()=>{
            AwardTipsUI.freeItem(this);
        })
    }



}
