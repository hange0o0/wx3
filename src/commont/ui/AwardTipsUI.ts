class AwardTipsUI extends game.BaseContainer_wx3{
    private static instancePool = [];
    private static list = [];
    private static lastShowTime = 0;
    public static showTips(icon,text,color) {
        this.list.push({
            icon:icon,
            txt:MyTool.createHtml(text,color),
        })
        this.showText();
    }

    private static textTimer;
    private static showText(){
        clearTimeout(this.textTimer)
        if(this.list.length == 0)
            return;
        if(egret.getTimer() - this.lastShowTime < 500)
        {
            this.textTimer = setTimeout(()=>{
                AwardTipsUI.showText()
            },200);
            return;
        }
        var instance = this.instancePool.pop()
        if (!instance)
            instance = new TipsUI();
        instance.show(this.list.shift());
        if(this.list.length)
        {
            this.textTimer = setTimeout(()=>{
                AwardTipsUI.showText()
            },200);
        }
    }

    public static freeItem(item){
        this.list.push(item);
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
        egret.Tween.get(this).to({y:})
        for(var i=0;i<TipsUI.showTips.length;i++)
        {
            var item =  TipsUI.showTips[i];
            item.toY -= 70
            egret.Tween.removeTweens(item);
            wx3_function(8689);
            var tw = egret.Tween.get(item);
            tw.to({y:item.toY},Math.abs(item.toY - item.y)*2);
        }
        TipsUI.showTips.push(this)
        egret.clearTimeout(this.timer);

        wx3_function(5587);

        //this.verticalCenter = 0;
        GameManager_wx3.stage.addChild(this);
        MyTool.setColorText(this.text,v);
        if(this.text.numLines > 1)
            this.text.textAlign = 'left'
        else
            this.text.textAlign = 'center'
        this.visible = false
        this.timer = egret.setTimeout(this.onTimer_8978,this,cd + (TipsUI.showTips.length-1)*100);
        wx3_function(6573);
        egret.setTimeout(function(){
            this.visible = true
        },this,(TipsUI.showTips.length-1)*100);

        this.validateNow();
        this.x =  (GameManager_wx3.stage.stageWidth -this.width)/2
        this.y =  GameManager_wx3.stage.stageHeight * 0.2;
        wx3_function(797);
        this.toY =  this.y;
    }

    private onTimer_8978(){
        this.hide();
    }
    private wx3_functionX_12221(){console.log(7575)}

    public hide(){
        egret.clearTimeout(this.timer);
        MyTool.removeMC(this);
        PopUpManager.testShape();
        TipsUI.instancePool.push(this)
        var index = TipsUI.showTips.indexOf(this)
        if(index != -1)
            TipsUI.showTips.splice(index,1)
    }
    private wx3_functionX_12222(){console.log(6105)}


}
