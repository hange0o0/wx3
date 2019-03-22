class BuffUI extends game.BaseUI {

    private static _instance: BuffUI;
    public static getInstance(): BuffUI {
        if(!this._instance)
            this._instance = new BuffUI();
        return this._instance;
    }

    private topList: eui.List;
    private topUI: TopUI;
    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    private list: eui.List;
    private desText: eui.Label;






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

        this.topList.itemRenderer = BuffItem;
        this.topList.dataProvider = this.topDataProvider = new eui.ArrayCollection();

        this.scroller.viewport = this.list;
        this.list.itemRenderer = BuffListItem
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();


    }

    public onClose(){
        this.hide();
    }

    public share(){
        ShareTool.share('我需要你们的帮助！！',Config.localResRoot + "share_img_1.jpg",{type:1,from:UM.gameid},()=>{
            MyWindow.ShowTips('等待好友加入')
        })
    }


    public show(){
        UM.renewFriendNew(()=>{
            super.show()
        })
    }

    public hide() {
        super.hide();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onUnSelect,this)
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        this.addPanelOpenEvent(GameEvent.client.BUFF_CHANGE,this.renew)
    }

    private onTimer(){
        MyTool.runListFun(this.topList,'onTimer')
        MyTool.runListFun(this.list,'onTimer')
    }

    public onUserClick(openid){
        this.currentChooseID = openid;
        MyTool.runListFun(this.topList,'onUserClick',openid)
        MyTool.runListFun(this.list,'onUserClick',openid)

        if(this.currentChooseID)
        {
            egret.callLater(()=>{
                this.once(egret.TouchEvent.TOUCH_TAP,this.onUnSelect,this)
            },this)
        }
    }

    public onUnSelect(){
        if(this.currentChooseID)
            this.onUserClick(null);
    }



    public getNoUseNum(){
        return this.dataProvider.source.length
    }

    public renew(){
        var BM = BuffManager.getInstance();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onUnSelect,this)
        this.currentChooseID = null;
        var topArr = ObjectUtil.objToArray(BM.buffBase);
        //this.topList.dataProvider = new eui.ArrayCollection(topArr);
        //this.topDataProvider.refresh();
        this.topDataProvider.source = topArr;
        this.topDataProvider.refresh();

        var t = TM.now();
        var cd = BM.buffCD
        var arr = [];
        for(var s in UM.shareUser)
        {
             if(t - UM.shareUser[s].time < cd && !BM.getUserBuff(s))
             {
                 UM.shareUser[s].openid = s;
                 arr.push(UM.shareUser[s])
             }
        }

        this.dataProvider.source = arr;
        this.dataProvider.refresh();
    }

}