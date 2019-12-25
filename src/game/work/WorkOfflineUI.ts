class WorkOfflineUI extends game.BaseWindow_wx3 {

    private static _instance:WorkOfflineUI;

    public static getInstance():WorkOfflineUI {
        if (!this._instance)
            this._instance = new WorkOfflineUI();
        return this._instance;
    }
	private wx3_functionX_12679(){console.log(5976)}

    private closeBtn: eui.Button;
    private shareBtn: eui.Button;
    private videoIcon: eui.Image;
    private coinText: eui.Label;
    private desText: eui.Label;
	private wx3_functionX_12680(){console.log(7068)}
    private btnGroup: eui.Group;




    private cd
	private wx3_functionX_12681(){console.log(508)}
    private coin
    public constructor() {
        super();
        this.canBGClose = false;
        this.skinName = "WorkOfflineUISkin";
    }

	private wx3_functionX_12682(){console.log(143)}
    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.shareBtn,this.onShare)
    }

	private wx3_functionX_12683(){console.log(9883)}
    public hide(){
        super.hide();
        TaskUI.getInstance().show();
    }

    public onShare(){
        if(this.videoIcon.visible)
        {
            ShareTool.openGDTV(()=>{
                this.onAddCoin_5742()
            })
            return
        }
        ShareTool.share('我需要你们的帮助！！',Config.localResRoot + "share_img_2.jpg",{},()=>{
            this.onAddCoin_5742()
        })
    }
	private wx3_functionX_12684(){console.log(1650)}

    private onAddCoin_5742(){
        MyTool.removeMC(this.shareBtn);
        UM_wx3.addCoin(this.coin*2);
        this.closeBtn.label = '关闭'

        var old = this.coin
        var pre = this.coin*2/50
        var coin = old;
	wx3_function(8354);
        for(var i = 0 ; i < 50 ; i++)
        {
            egret.setTimeout(()=>{
                coin += pre
                this.coinText.text = NumberUtil.addNumSeparator(Math.round(coin),2);
            },this,20*i)
        }
    }
	private wx3_functionX_12685(){console.log(6352)}

    public show(cd?,coin?){
        if(!coin || cd < 5*60)
        {
            TaskUI.getInstance().show();
            return;
        }
        this.cd = cd;
	wx3_function(1442);
        this.coin = coin;
        super.show();
    }

    public onShow(){
        this.videoIcon.visible = true;
	wx3_function(901);
        this.coinText.text = NumberUtil.addNumSeparator(this.coin,2);
        if(this.cd > 7*24*3600)
            this.desText.text = '在你离开的漫长时间里，怪物们挖矿获得了'
        else
            this.desText.text = '在你离开的 '+DateUtil.getStringBySeconds(this.cd,false,2)+' 内挖矿获得了'
        if(this.cd >= 3600 && !UM_wx3.isTest)
        //if(true)
        {
            this.closeBtn.label = '普通领取'
            this.btnGroup.addChild(this.shareBtn)
        }
        else
        {
            this.closeBtn.label = '知道了'
            MyTool.removeMC(this.shareBtn);
	wx3_function(4352);
        }


    }
}