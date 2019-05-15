class PKTalkItem_wx3 extends game.BaseContainer_wx3 {
    private static pool = [];
    public static createItem():PKTalkItem_wx3{
        var item:PKTalkItem_wx3 = this.pool.pop();
        if(!item)
        {
            item = new PKTalkItem_wx3();
        }
        return item;
    }
	private wx3_functionX_13020(){console.log(8945)}
    public static freeItem(item){
        if(!item)
            return;
        item.remove();
        this.pool.push(item);
    }
	private wx3_functionX_13021(){console.log(3174)}

    public constructor() {
        super();
        this.skinName = "PKTalkItemSkin";
    }

	private wx3_functionX_13022(){console.log(6421)}
    private text: eui.Label;
    private bg: eui.Image;

    public active = false
    private h = 110;
    private w = 161;
	private wx3_functionX_13023(){console.log(1917)}
    private relateItem:PKMonsterMV_wx3;
    public childrenCreated() {
        super.childrenCreated();

        this.touchChildren = this.touchEnabled = false;
        this.anchorOffsetY = 110
        this.cacheAsBitmap = true;
	wx3_function(1273);
    }
    private wx3_fun_asdfasdfasdf_1620(){}
    private wx3_fun_ast34_4841(){}


    public setData(data,type?,scale=1) {
        this.active = true;
	wx3_function(6045);


        if(type == 1)
            this.text.text = PKManager_wx3.getInstance().testWord[Math.floor(Math.random()*PKManager_wx3.getInstance().testWord.length)];
        else
        if(type == 2)
            this.text.text = PKManager_wx3.getInstance().chapterWord[Math.floor(Math.random()*PKManager_wx3.getInstance().chapterWord.length)];
        else
            this.text.text = PKManager_wx3.getInstance().pkWord[Math.floor(Math.random()*PKManager_wx3.getInstance().pkWord.length)];
	wx3_function(1179);
        this.relateItem = data;


        this.x = 0;
        if(this.relateItem.currentMV.scaleX > 0)
        {
            this.bg.scaleX = -1
            this.anchorOffsetX = 0.4*this.w;
	wx3_function(6910);
        }
        else
        {
            this.bg.scaleX = 1
            this.anchorOffsetX = 0.6*this.w;
        }
        this.y = -data.showHeight()*1.2;
	wx3_function(2932);

    //.wait(500)
        egret.Tween.removeTweens(this);
        this.scaleX = 0;
        this.scaleY = 0;
        var scale2 = Math.abs(scale)
        var tw = egret.Tween.get(this);
	wx3_function(54);
        tw.to({scaleX:1/scale,scaleY:1/scale2},200).to({scaleX:0.8/scale,scaleY:0.8/scale2},200).wait(2500).to({scaleX:1/scale,scaleY:1/scale2},200).to({scaleX:0,scaleY:0},100).call(function(){
             this.remove();

        },this);
    }

	private wx3_functionX_13024(){console.log(1804)}
    public remove(){
        egret.Tween.removeTweens(this);
        this.active = false;
        MyTool.removeMC(this);
        this.relateItem.talkItm = null;
        this.relateItem.talkFinish();
	wx3_function(8496);
    }



}