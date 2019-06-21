class BuffUI extends game.BaseWindow_wx3 {

    private static _instance: BuffUI;
    public static getInstance(): BuffUI {
        if(!this._instance)
            this._instance = new BuffUI();
        return this._instance;
    }
	private wx3_functionX_12245(){console.log(5672)}

    private closeBtn: eui.Image;
    private scroller: eui.Scroller;
    private list: eui.List;
    private desText: eui.Label;
    private atkText: eui.Label;
	private wx3_functionX_12246(){console.log(9281)}
    private workText: eui.Label;
    private lock1: eui.Label;
    private lock2: eui.Label;
    private ok1: eui.Image;
    private ok2: eui.Image;
    private btnGroup: eui.Group;
	private wx3_functionX_12247(){console.log(8043)}
    private diamondBtn: eui.Button;
    private inviteBtn: eui.Button;




	private wx3_functionX_12248(){console.log(9833)}






	private wx3_functionX_12249(){console.log(3650)}



    private dataProvider:eui.ArrayCollection
    public currentChooseID = '';

	private wx3_functionX_12250(){console.log(8260)}
    public constructor() {
        super();
        this.skinName = "BuffUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
	wx3_function(4967);

        this.addBtnEvent(this.closeBtn,this.hide);


        this.scroller.viewport = this.list;
        this.list.itemRenderer = BuffItem
        var arr = [];
	wx3_function(7545);
        for(var i=0;i<100;i++)
        {
            arr.push(i)
        }
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection(arr);

        this.addBtnEvent(this.inviteBtn,this.share)
        this.addBtnEvent(this.diamondBtn,()=>{
            var num = BuffManager.getInstance().getUserNum()
            var diamond = (num - UM_wx3.buffDiamond)*10;
            UM_wx3.addDiamond(diamond)
            UM_wx3.buffDiamond = num;
            MyTool.removeMC(this.diamondBtn)
            AwardTipsUI.showTips('diamond',diamond)
            //MyWindow.ShowTips('获得钻石：+'+MyTool.createHtml(diamond,0x6ffdfd),2000)
        })

        MyTool.addLongTouch(this.desText,()=>{
            DebugUI.getInstance().debugTimer = egret.getTimer();
	wx3_function(1185);
            MyWindow.ShowTips('Tips:要邀请未加入过的好友才有效哦~')
        },this)
    }

    public onClose(){
        this.hide();
	wx3_function(8917);
    }

    public share(){
        ShareTool.share('加入我们，让我们一起进步',Config.localResRoot + "share_img_2.jpg",{type:1,from:UM_wx3.gameid},()=>{
            MyWindow.ShowTips('等待好友加入')
        },true)
    }
	private wx3_functionX_12251(){console.log(3136)}


    public show(){
        UM_wx3.renewFriendNew(()=>{
            super.show()
        })
    }
	private wx3_functionX_12252(){console.log(176)}

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
	wx3_function(1951);
        this.addPanelOpenEvent(GameEvent.client.BUFF_CHANGE,this.renew)
    }



    public renew(){
        var BM = BuffManager.getInstance();
	wx3_function(9343);
        var num = BM.getUserNum()
        this.desText.text = '当前邀请好友 '+num +'个：'
        this.dataProvider.refresh();
        this.atkText.text = '战力+'+BM.getForceAdd()+'%'
        this.workText.text = '效率+'+BM.getCoinAdd()+'%'

        this.ok1.visible = num >= 1
        this.ok2.visible = num >= 5
        this.lock1.visible = !this.ok1.visible
        this.lock2.visible = !this.ok2.visible

        if(num <= UM_wx3.buffDiamond)
        {
            MyTool.removeMC(this.diamondBtn)
        }
        else
        {
            this.btnGroup.addChildAt(this.diamondBtn,0);
	wx3_function(3526);
            this.diamondBtn.label = '领取 '+(num - UM_wx3.buffDiamond)*10+' 钻石'
        }
    }

}