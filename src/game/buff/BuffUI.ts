class BuffUI extends game.BaseUI {

    private static _instance: BuffUI;
    public static getInstance(): BuffUI {
        if(!this._instance)
            this._instance = new BuffUI();
        return this._instance;
    }

    private topUI: TopUI;
    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    private list: eui.List;
    private desText: eui.Label;
    private atkText: eui.Label;
    private workText: eui.Label;
    private inviteBtn: eui.Group;









    private dataProvider:eui.ArrayCollection
    public currentChooseID = '';

    public constructor() {
        super();
        this.skinName = "BuffUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.onClose,this);
        this.topUI.setTitle('好友助力')


        this.scroller.viewport = this.list;
        this.list.itemRenderer = BuffItem
        var arr = [];
        for(var i=0;i<100;i++)
        {
            arr.push(i)
        }
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection(arr);

        this.addBtnEvent(this.inviteBtn,this.share)

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
        this.desText.text = '当前新邀请好友 '+BM.getUserNum()+'个:'
        this.dataProvider.refresh();
        this.atkText.text = '战力+'+BM.getForceAdd()+'%'
        this.workText.text = '效率+'+BM.getCoinAdd()+'%'
    }

}