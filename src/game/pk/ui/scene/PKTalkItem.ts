class PKTalkItem_wx3 extends game.BaseContainer {
    private static pool = [];
    public static createItem():PKTalkItem_wx3{
        var item:PKTalkItem_wx3 = this.pool.pop();
        if(!item)
        {
            item = new PKTalkItem_wx3();
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
    private relateItem:PKMonsterMV_wx3;
    public childrenCreated() {
        super.childrenCreated();

        this.touchChildren = this.touchEnabled = false;
        this.anchorOffsetY = 110
        this.cacheAsBitmap = true;
    }
    private wx3_fun_asdfasdfasdf(){}
    private wx3_fun_ast34(){}


    public setData(data,type?,scale=1) {
        this.active = true;


        //if(type == 1)
        //    this.text.text = PKManager_wx3.getInstance().costWord[Math.floor(Math.random()*PKManager_wx3.getInstance().costWord.length)];
        //else
        if(type == 2)
            this.text.text = PKManager_wx3.getInstance().chapterWord[Math.floor(Math.random()*PKManager_wx3.getInstance().chapterWord.length)];
        else
            this.text.text = PKManager_wx3.getInstance().pkWord[Math.floor(Math.random()*PKManager_wx3.getInstance().pkWord.length)];
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

    //.wait(500)
        egret.Tween.removeTweens(this);
        this.scaleX = 0;
        this.scaleY = 0;
        var scale2 = Math.abs(scale)
        var tw = egret.Tween.get(this);
        tw.to({scaleX:1/scale,scaleY:1/scale2},200).to({scaleX:0.8/scale,scaleY:0.8/scale2},200).wait(2500).to({scaleX:1/scale,scaleY:1/scale2},200).to({scaleX:0,scaleY:0},100).call(function(){
             this.remove();

        },this);
    }

    public remove(){
        egret.Tween.removeTweens(this);
        this.active = false;
        MyTool.removeMC(this);
        this.relateItem.talkItm = null;
        this.relateItem.talkFinish();
    }



}