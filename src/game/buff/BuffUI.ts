class BuffUI extends game.BaseWindow {

    private static _instance: BuffUI;
    public static getInstance(): BuffUI {
        if(!this._instance)
            this._instance = new BuffUI();
        return this._instance;
    }

    private closeBtn: eui.Image;
    private scroller: eui.Scroller;
    private list: eui.List;
    private desText: eui.Label;
    private atkText: eui.Label;
    private workText: eui.Label;
    private lock1: eui.Label;
    private lock2: eui.Label;
    private ok1: eui.Image;
    private ok2: eui.Image;
    private btnGroup: eui.Group;
    private diamondBtn: eui.Button;
    private inviteBtn: eui.Button;













    private dataProvider:eui.ArrayCollection
    public currentChooseID = '';

    public constructor() {
        super();
        this.skinName = "BuffUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide);


        this.scroller.viewport = this.list;
        this.list.itemRenderer = BuffItem
        var arr = [];
        for(var i=0;i<100;i++)
        {
            arr.push(i)
        }
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection(arr);

        this.addBtnEvent(this.inviteBtn,this.share)
        this.addBtnEvent(this.diamondBtn,()=>{
            var num = BuffManager.getInstance().getUserNum()
            var diamond = (num - UM.buffDiamond)*10;
            UM.addDiamond(diamond)
            UM.buffDiamond = num;
            MyTool.removeMC(this.diamondBtn)
            MyWindow.ShowTips('获得钻石：+'+MyTool.createHtml(diamond,0x6ffdfd),2000)
        })

        MyTool.addLongTouch(this.desText,()=>{
            DebugUI.getInstance().debugTimer = egret.getTimer();
            MyWindow.ShowTips('Tips:要邀请未加入过的好友才有效哦~')
        },this)
    }

    public onClose(){
        this.hide();
    }

    public share(){
        ShareTool.share('我需要你们的帮助！！',Config.localResRoot + "share_img_1.jpg",{type:1,from:UM.gameid},()=>{
            MyWindow.ShowTips('等待好友加入')
        },true)
    }


    public show(){
        UM.renewFriendNew(()=>{
            super.show()
        })
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.BUFF_CHANGE,this.renew)
    }



    public renew(){
        var BM = BuffManager.getInstance();
        var num = BM.getUserNum()
        this.desText.text = '当前新邀请好友 '+num +'个：'
        this.dataProvider.refresh();
        this.atkText.text = '战力+'+BM.getForceAdd()+'%'
        this.workText.text = '效率+'+BM.getCoinAdd()+'%'

        this.ok1.visible = num >= 1
        this.ok2.visible = num >= 5
        this.lock1.visible = !this.ok1.visible
        this.lock2.visible = !this.ok2.visible

        if(num <= UM.buffDiamond)
        {
            MyTool.removeMC(this.diamondBtn)
        }
        else
        {
            this.btnGroup.addChildAt(this.diamondBtn,0);
            this.diamondBtn.label = '领取 '+(num - UM.buffDiamond)*10+' 钻石'
        }
    }

}