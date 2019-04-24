class TouchTipsUI extends game.BaseContainer{
    private static instance:TouchTipsUI;
    public static getInstance() {
        if (!this.instance) this.instance = new TouchTipsUI();
        return this.instance;
    }
	private wx3_functionX_12227(){console.log(741)}

    private text: eui.Label;

    private timer;

    public constructor() {
        super();
	wx3_function(4184);
        this.skinName = 'TouchTipsSkin';
    }

    public show(e?,str?){
        if(!str)
            return;
        GameManager_wx3.container.addChild(this);
	wx3_function(2538);
        MyTool.setHtml(this.text,str);
        this.validateNow();

        //var rect = mc.getBounds();
        //var p1 = mc.localToGlobal(rect.x,rect.y);
        //var p2 = mc.localToGlobal(rect.x + rect.width,rect.y + rect.height);

        this.y =  e.stageY - this.height - 100;
        if(this.y < 0)
        {
            this.y = e.stageY + 120;
	wx3_function(6612);
        }

        this.x = e.stageX - this.width/2;
        if(this.x < 10)
        {
            this.x = 10;
	wx3_function(6928);
        }
        else if(this.x + this.width > 630)
        {
            this.x = 630 - this.width;
        }

        GameManager_wx3.stage.once(egret.TouchEvent.TOUCH_CANCEL,this.hide,this)

    }
	private wx3_functionX_12228(){console.log(342)}

    public hide(){
        MyTool.removeMC(this);
    }
}
