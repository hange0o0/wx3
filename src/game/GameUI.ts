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

    private bottomGroup: eui.Group;
    private rankBtn: eui.Group;
    private buffBtn: eui.Group;
    private tecBtn: eui.Group;
    private monsterBtn: eui.Group;
    private settingBtn: eui.Group;
    private chapterRedMC: eui.Image;
    private mailBtn: eui.Group;
    private coinGroup: eui.Group;
    private shopRedMC: eui.Image;
    private coinText: eui.Label;
    private diamondGroup: eui.Group;
    private diamondText: eui.Label;
    private soundBtn: eui.Image;
    private loadingGroup: eui.Group;
    private changeUser: ChangeUserUI;
    private startBtn: eui.Image;
    private loadText: eui.Label;
    private barGroup: eui.Group;
    private barMC: eui.Rect;
    private scroller: eui.Scroller;
    private list: eui.List;








    private infoBtn:UserInfoBtn
    private haveGetInfo = false;
    private haveLoadFinish = false;
    private haveGetUser = false;
    private needShowStartBtn = false;

    private firstShow = true;
    public showIndex = -1;
    public showData;
    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.soundBtn,this.onSetting)
        this.addBtnEvent(this.settingBtn,this.onChapter)
        this.addBtnEvent(this.mailBtn,this.onMail)
        this.addBtnEvent(this.coinGroup,this.onShop)
        this.addBtnEvent(this.rankBtn,this.onRank)
        this.addBtnEvent(this.monsterBtn,this.onMonster)
        this.addBtnEvent(this.tecBtn,this.onTec)
        this.addBtnEvent(this.buffBtn,this.onBuff)

        this.scroller.viewport = this.list
        this.list.itemRendererFunction = (data)=>{
            if(data.def)
                return DefUI;
            if(data.ad)
                return ChangeUserUI;
            return MainWorkItem;
        };

        this.infoBtn = new UserInfoBtn(this.startBtn, (res)=>{
            this.renewInfo(res);
        }, this, Config.localResRoot + "wx_btn_info.png");
        this.infoBtn.visible = false;
        this.startBtn.visible = false;
    }

    private renewInfo(res?){
        var wx = window['wx'];
        if(!wx)
        {
            this.haveGetUser = true;
            this.initData();
            return;
        }
        if(res)
        {
            if(!res.userInfo)
                return;
            this.infoBtn.visible = false;
            this.haveGetUser = true;
            this.initData();
            UM.renewInfo(res.userInfo)
            return;
        }
        wx.getSetting({
            success: (res) =>{
                console.log(res.authSetting)
                if(res.authSetting["scope.userInfo"])//已授权
                {
                    this.haveGetUser = true;
                    this.initData()
                    wx.getUserInfo({
                        success: (res) =>{
                            var userInfo = res.userInfo
                            UM.renewInfo(userInfo)
                            //UM.head = userInfo.avatarUrl
                            //UM.gender = userInfo.gender || 1 //性别 0：未知、1：男、2：女
                        }
                    })
                }
                else
                {
                    this.needShowStartBtn = true;
                    //this.infoBtn.visible = true;
                }
            }
        })
    }

    private onMonster(){
        if(SharedObjectManager.getInstance().getMyValue('showWork'))
            WorkUI.getInstance().show();
        else
            MonsterUI.getInstance().show();
    }
    private onTec(){
        TecUI.getInstance().show();
    }
    private onRank(){
        RankUI.getInstance().show();
    }
    private onBuff(){
        BuffUI.getInstance().show();
    }

    private onSetting(){
        SoundManager.getInstance().soundPlaying = !SoundManager.getInstance().soundPlaying
        SoundManager.getInstance().bgPlaying = !SoundManager.getInstance().bgPlaying
        this.renewSound();

    }
    private onChapter(){
        ChapterUI.getInstance().show();
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

    public scrollToBottom(){
        this.scroller.viewport.scrollV = this.scroller.viewport.contentHeight - this.scroller.height
        this.once(egret.Event.ENTER_FRAME,()=>{
            this.scroller.viewport.scrollV = this.scroller.viewport.contentHeight - this.scroller.height
        },this)
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
            if(this.needShowStartBtn)
            {
                this.haveLoadFinish = true;
                this.initData();
                return;
            }
            setTimeout(()=>{
                this.haveLoadFinish = true;
                this.initData();
            },1000)
        //})
        PKManager.getInstance().initData();
    }




    public onShow(){
        var self = this;
        this.bottomGroup.visible = false;
        this.coinText.text = '???'
        this.diamondText.text = '???'

        ChangeUserUI.getAD();
        this.renewSound();
        this.loadingGroup.visible = true;
        self.loadText.text = '正在加载素材，请耐心等候..'
        this.renewInfo();
        UM.getUserInfo(()=>{
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
                self.loadText.text = '正在加载素材，请耐心等候..' + res.progress + '%'
            })


            return;
        }
        this.callShow();
    }


    private initData(){
        if(this.haveLoadFinish && this.haveGetInfo && !this.haveGetUser && this.needShowStartBtn)
        {
            this.changeUser.dataChanged()
            this.loadText.text = '点击屏幕受权进入游戏';
            this.needShowStartBtn = false;
            this.infoBtn.visible = true;
            this.barGroup.visible = false;
            return;
            //this.loadText.text = '用户授权后可进入游戏'
        }
        if(!this.haveLoadFinish || !this.haveGetInfo  || !this.haveGetUser)
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
        MyTool.removeMC(this.changeUser);

        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.onCoinChange)
        this.addPanelOpenEvent(GameEvent.client.DIAMOND_CHANGE,this.onDimaondChange)
        this.addPanelOpenEvent(GameEvent.client.TEC_CHANGE,this.reInitList)
        this.addPanelOpenEvent(GameEvent.client.DEF_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.MONSTER_WORK_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.BUFF_CHANGE,this.renewList)
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

    private getListArr(){
        var arr:any =  [{def:true}]
        var max = WorkManager.getInstance().getOpenWork()+1
        for(var i=0;i<max;i++)
        {
            arr.push({id:i+1})
        }
        arr[arr.length-1].isLast = true;
        arr.push({ad:true});
        return arr
    }
    public reInitList(){
        this.list.dataProvider = new eui.ArrayCollection(this.getListArr())
    }

    private onCoinChange(){
        this.coinText.text = NumberUtil.addNumSeparator(UM.coin);
    }
    private onDimaondChange(){
        this.diamondText.text = UM.diamond + '';
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