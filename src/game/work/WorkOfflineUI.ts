class WorkOfflineUI extends game.BaseWindow {

    private static _instance:WorkOfflineUI;

    public static getInstance():WorkOfflineUI {
        if (!this._instance)
            this._instance = new WorkOfflineUI();
        return this._instance;
    }

    private closeBtn: eui.Button;
    private shareBtn: eui.Button;
    private videoIcon: eui.Image;
    private coinText: eui.Label;
    private desText: eui.Label;
    private btnGroup: eui.Group;




    private cd
    private coin
    public constructor() {
        super();
        this.skinName = "WorkOfflineUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.shareBtn,this.onShare)
    }

    public onShare(){
        if(this.videoIcon.visible)
        {
            this.onAddCoin()
            return
        }
        ShareTool.share('我需要你们的帮助！！',Config.localResRoot + "share_img_2.jpg",{},()=>{
            this.onAddCoin()
        })
    }

    private onAddCoin(){
        MyTool.removeMC(this.shareBtn);
        UM.addCoin(this.coin*2);

        var old = this.coin
        var pre = this.coin*2/50
        var  coin = old;
        for(var i = 0 ; i < 50 ; i++)
        {
            egret.setTimeout(()=>{
                coin += pre
                if(i==50-1)
                    this.coin.text = NumberUtil.addNumSeparator(old*3,2);
                else
                    this.coin.text = NumberUtil.addNumSeparator(Math.floor(coin),2);
            },this,20*i)
        }
    }

    public show(cd?,coin?){
        if(!coin || cd < 60)
            return;
        this.cd = cd;
        this.coin = coin;
        super.show();
    }

    public onShow(){
        this.videoIcon.visible = false;
        this.coinText.text = NumberUtil.addNumSeparator(this.coin,2);
        this.desText.text = '在你离开的 '+DateUtil.getStringBySeconds(this.cd,false,2)+' 内挖矿获得了'
        if(this.cd >= 3600 && !UM.isTest)
        {
            this.closeBtn.label = '普通领取'
            this.btnGroup.addChild(this.shareBtn)
        }
        else
        {
            this.closeBtn.label = '知道了'
            MyTool.removeMC(this.shareBtn);
        }


    }
}