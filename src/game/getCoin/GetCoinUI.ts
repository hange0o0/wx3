class GetCoinUI extends game.BaseWindow_wx3 {

    private static _instance: GetCoinUI;
    public static getInstance(): GetCoinUI {
        if(!this._instance)
            this._instance = new GetCoinUI();
        return this._instance;
    }
	private wx3_functionX_12375(){console.log(3477)}

    private list: eui.List;
    private closeBtn: eui.Image;



	private wx3_functionX_12376(){console.log(6457)}


    private dataProvider:eui.ArrayCollection

    public constructor() {
        super();
	wx3_function(7024);
        this.skinName = "GetCoinUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)

        this.list.itemRenderer = GetCoinItem
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();
	wx3_function(7362);

    }

    public onClose(){
        this.hide();
    }
	private wx3_functionX_12377(){console.log(357)}


    public show(){
        UM_wx3.testPassDay();

        //UM_wx3.renewFriendNew(()=>{
            super.show()
        //})

    }
	private wx3_functionX_12378(){console.log(231)}

    public hide() {
        super.hide();

    }

	private wx3_functionX_12379(){console.log(1304)}
    public onShow(){
        if(!TaskManager.getInstance().openCoinUI)
        {
            TaskManager.getInstance().openCoinUI = true;
            EM_wx3.dispatch(GameEvent.client.TASK_CHANGE)
        }
        this.renew();
	wx3_function(9376);
        this.addPanelOpenEvent(GameEvent.client.pass_day,this.renew)
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer_5317)
    }

    private onTimer_5317(){
        MyTool.runListFun(this.list,'onTimer')
    }
	private wx3_functionX_12380(){console.log(295)}


    public renew(){
        //console.log(UM_wx3.isTest);
         var arr =[
            //{type:1,title:'等陆第X天'},
            //{type:2,title:'X小时后可领'},
        ]
        //if(!UM_wx3.isTest && ChangeUserUI.adList.length)
        //{
        if(Config.isWX)
            arr.push({type:3,title:'体验更多小程序'})
            //arr.push({type:3,title:'告诉我的好友们'})
        //}
        //arr.push({type:4,title:'邀请X位新的好友'})

        arr.push({type:5,title:'观看广告'})
        arr.push({type:6,title:'射击游戏'})

	wx3_function(4750);

        //arr.push({type:99,title:'DEBUG'})

            this.dataProvider.source = arr;
        this.dataProvider.refresh();
        //this.list.dataProvider = new eui.ArrayCollection(UM.history);
    }
}