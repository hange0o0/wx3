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
    private inviteBtn: eui.Group;









    private dataProvider:eui.ArrayCollection
    private topDataProvider:eui.ArrayCollection
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
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();

        this.addBtnEvent(this.inviteBtn,this.share)

        MyTool.addLongTouch(this.desText,()=>{
            DebugUI.getInstance().debugTimer = egret.getTimer();
            MyWindow.ShowTips('Tips:这是整个游戏加成最厉害的功能！')
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

    }

}