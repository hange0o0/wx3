class GameUI extends game.BaseUI {

    private static _instance:GameUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GameUI();
        return this._instance;
    }

    public constructor() {
        super();
        this.skinName = "GameUISkin";
    }

    private coinGroup: eui.Group;
    private coinText: eui.Label;
    private diamondGroup: eui.Group;
    private diamondText: eui.Label;
    private bottomGroup: eui.Group;
    private rankBtn: eui.Group;
    private shopBtn: eui.Group;
    private shopRedMC: eui.Image;
    private wordGroup: eui.Group;
    private b1: eui.BitmapLabel;
    private b2: eui.BitmapLabel;
    private b3: eui.BitmapLabel;
    private cdText: eui.Label;
    private settingBtn: eui.Group;
    private chapterRedMC: eui.Image;
    private mailBtn: eui.Group;
    private soundBtn: eui.Image;
    private loadingGroup: eui.Group;
    private loadText: eui.Label;
    private barMC: eui.Rect;
    private scroller: eui.Scroller;
    private list: eui.List;




    private haveGetInfo = false;
    private haveLoadFinish = false;

    private firstShow = true;
    public showIndex = -1;
    public showData;
    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.soundBtn,this.onSetting)
        this.addBtnEvent(this.settingBtn,this.onChapter)
        this.addBtnEvent(this.mailBtn,this.onMail)
        this.addBtnEvent(this.shopBtn,this.onShop)
        this.addBtnEvent(this.rankBtn,this.onRank)

        this.scroller.viewport = this.list
        this.list.itemRendererFunction = (data)=>{
            if(data.def)
                return DefUI;
            return MainWorkItem;
        };


    }

    private onRank(){
        RankUI.getInstance().show();
    }

    private onSetting(){
        SoundManager.getInstance().soundPlaying = !SoundManager.getInstance().soundPlaying
        SoundManager.getInstance().bgPlaying = !SoundManager.getInstance().bgPlaying
        this.renewSound();

    }
    private onChapter(){
        //CoinGameUI.getInstance().show();
    }

    private renewSound(){
        this.soundBtn.source = SoundManager.getInstance().bgPlaying?'sound_btn1_png':'sound_btn2_png'
    }

    public onMail(){
        FightUI.getInstance().show()
        //LogUI.getInstance().show();
        //this.mainPKUI.hide();
        //this.team1.visible = this.team2.visible = !this.mainPKUI.visible
    }

    public onShop(){
        GetCoinUI.getInstance().show();
    }

    public show(){
        super.show();
    }

    private callShow(){
        this.loadText.text = '初始化中'
        //var index = PKManager.getInstance().getTodayIndex();
        //PKManager.getInstance().loadLevelData(()=>{
        //PKManager.getInstance().loadLevelData(index,(data)=>{
            //PKManager.getInstance().initData(index,data);
            setTimeout(()=>{
                this.haveLoadFinish = true;
                this.initData();
            },1000)
        //})
    }




    public onShow(){
        var self = this;
        this.bottomGroup.visible = false;
        this.coinText.text = '???'
        this.diamondText.text = '???'

        this.renewSound();
        this.loadingGroup.visible = true;
        self.loadText.text = '正在加载素材，请耐心等候..'
        UserManager.getInstance().getUserInfo(()=>{
            this.haveGetInfo = true;
            this.initData();
        });
        var wx =  window["wx"];
        if(wx)
        {
            const loadTask = wx.loadSubpackage({
                name: 'assets2', // name 可以填 name 或者 root
                success(res) {
                    self.callShow();
                },
                fail(res) {
                }
            })

            loadTask.onProgressUpdate(res => {
                self.loadText.text = '正在加载素材，请耐心等候..\n' + res.progress + '%'
            })
            return;
        }

        this.callShow();
    }

    private initData(){
        if(!this.haveLoadFinish || !this.haveGetInfo)
            return;
        GuideManager.getInstance().isGuiding = !UM.guideFinish;
        this.bottomGroup.visible = true;
        this.loadingGroup.visible = false;
        this.showIndex = -1;
        this.reInitList()
        this.onTimer();
        this.onCoinChange();
        this.onDimaondChange();
        this.renewChapterRed();

        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.onCoinChange)
        //this.addPanelOpenEvent(GameEvent.client.pass_day,this.onPassDay)
        this.firstShow = false;

        if(GuideManager.getInstance().isGuiding)
        {
            GuideManager.getInstance().showGuide();
        }
        else
        {
            SoundManager.getInstance().playSound('bg');
        }
    }

    //private onPassDay(){
    //    var index = PKManager.getInstance().getTodayIndex();
    //    PKManager.getInstance().loadLevelData(index,(data)=>{
    //        PKManager.getInstance().initData(index,data);
    //    })
    //}



    public endGuide(){

    }

    public renewList(){
         MyTool.renewList(this.list)
    }
    public reInitList(){
        var arr:any =  [{def:true}]
        var max = WorkManager.getInstance().getOpenWork()+1
        for(var i=0;i<max;i++)
        {
            arr.push({id:i+1})
        }
        this.list.dataProvider = new eui.ArrayCollection(arr)
    }

    private onCoinChange(){
        this.coinText.text = NumberUtil.addNumSeparator(UM.coin);
    }
    private onDimaondChange(){
        this.diamondText.text = NumberUtil.addNumSeparator(UM.coin);
    }

    private renewCoinRed(){
        var coinObj = UM.coinObj;
        this.shopRedMC.visible = !coinObj.loginDayAward;

        if(!this.shopRedMC.visible && coinObj.onLineAwardNum < 5)
        {
            var coinCD = UM.onLineAwardCD
            var nextAwardTime = coinObj.onLineAwardTime + coinCD[coinObj.onLineAwardNum];
            this.shopRedMC.visible = TM.now() >=  nextAwardTime
        }
    }

    private renewChapterRed(){
        this.chapterRedMC.visible = UM.chapterLevel < 2;
    }

    public onVisibleChange(){
        //SoundManager.getInstance().playSound('pkbg');
        if(this.visible)
        {
            this.onTimer();
            this.renewChapterRed()
        }
        else
        {
            SoundManager.getInstance().playSound('bg');
        }
    }

    private onE(){
        MyTool.runListFun(this.list,'onE')
    }

    public onTimer(){
        if(!this.visible)
            return;
         this.renewCoinRed();

    }
}