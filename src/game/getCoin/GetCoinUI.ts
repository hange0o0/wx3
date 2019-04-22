class GetCoinUI extends game.BaseWindow {

    private static _instance: GetCoinUI;
    public static getInstance(): GetCoinUI {
        if(!this._instance)
            this._instance = new GetCoinUI();
        return this._instance;
    }

    private list: eui.List;
    private closeBtn: eui.Image;





    private dataProvider:eui.ArrayCollection

    public constructor() {
        super();
        this.skinName = "GetCoinUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)

        this.list.itemRenderer = GetCoinItem
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();

    }

    public onClose(){
        this.hide();
    }


    public show(){
        UM.testPassDay();

        UM.renewFriendNew(()=>{
            super.show()
        })

    }

    public hide() {
        super.hide();

    }

    public onShow(){
        if(!TaskManager.getInstance().openCoinUI)
        {
            TaskManager.getInstance().openCoinUI = true;
            EM.dispatch(GameEvent.client.TASK_CHANGE)
        }
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.pass_day,this.renew)
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
    }

    private onTimer(){
        MyTool.runListFun(this.list,'onTimer')
    }


    public renew(){
        console.log(UM.isTest);
         var arr =[
            //{type:1,title:'等陆第X天'},
            //{type:2,title:'X小时后可领'},
        ]
        if(!UM.isTest && ChangeUserUI.adList.length)
        {
            arr.push({type:3,title:'体验更多小程序'})
            //arr.push({type:3,title:'告诉我的好友们'})
        }
        //arr.push({type:4,title:'邀请X位新的好友'})

        //arr.push({type:5,title:'观看广告'})
        arr.push({type:6,title:'射击游戏'})


        //arr.push({type:99,title:'DEBUG'})

            this.dataProvider.source = arr;
        this.dataProvider.refresh();
        //this.list.dataProvider = new eui.ArrayCollection(UM.history);
    }
}