class PKTalkItem extends game.BaseContainer {
    private static pool = [];
    public static createItem():PKTalkItem{
        var item:PKTalkItem = this.pool.pop();
        if(!item)
        {
            item = new PKTalkItem();
        }
        return item;
    }
    public static freeItem(item){
        if(!item)
            return;
        item.remove();
        this.pool.push(item);
    }

    public constructor() {
        super();
        this.skinName = "PKTalkItemSkin";
    }

    private text: eui.Label;
    private bg: eui.Image;

    public active = false
    private h = 110;
    private w = 161;
    private relateItem:PKMonsterMV;
    public childrenCreated() {
        super.childrenCreated();

        this.touchChildren = this.touchEnabled = false;
        this.anchorOffsetY = 110
        this.cacheAsBitmap = true;
    }


    public setData(data,gift?) {
        this.active = true;


        if(gift)
            this.text.text = PKManager.getInstance().costWord[Math.floor(Math.random()*PKManager.getInstance().costWord.length)];
        else
            this.text.text = PKManager.getInstance().pkWord[Math.floor(Math.random()*PKManager.getInstance().pkWord.length)];
        this.relateItem = data;


        this.x = 0;
        if(this.relateItem.currentMV.scaleX > 0)
        {
            this.bg.scaleX = -1
            this.anchorOffsetX = 0.4*this.w;
        }
        else
        {
            this.bg.scaleX = 1
            this.anchorOffsetX = 0.6*this.w;
        }
        this.y = -data.showHeight();


        egret.Tween.removeTweens(this);
        this.scaleX = 0;
        this.scaleY = 0;
        var tw = egret.Tween.get(this);
        tw.to({scaleX:1,scaleY:1},200).to({scaleX:0.8,scaleY:0.8},200).wait(2500).to({scaleX:1,scaleY:1},200).to({scaleX:0,scaleY:0},100).call(function(){
             this.remove();
        },this);
    }

    public remove(){
        egret.Tween.removeTweens(this);
        this.active = false;
        MyTool.removeMC(this);
        this.relateItem.talkItm = null;
    }



}