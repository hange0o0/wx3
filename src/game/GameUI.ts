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

    private scroller: eui.Scroller;
    private list: eui.List;
    private bottomGroup: eui.Group;
    private buffBtn: eui.Group;
    private buffRed: eui.Image;
    private workBtn: eui.Group;
    public tecBtn: eui.Group;
    public monsterBtn: eui.Group;
    public chapterBtn: eui.Group;
    private chapterRed: eui.Image;
    public fightBtn: eui.Group;
    private fightRed: eui.Image;
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

    private taskGroup: eui.Group;
    private taskText: eui.Label;
    private taskText2: eui.Label;
    private taskBtn: eui.Group;
    private taskBtn2: eui.Group;
    private taskRed: eui.Image;










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
        this.buffRed.visible = false;
        this.addBtnEvent(this.soundBtn,this.onSetting)
        this.addBtnEvent(this.chapterBtn,this.onChapter)
        this.addBtnEvent(this.fightBtn,this.onFight)
        this.addBtnEvent(this.coinGroup,this.onShop)
        this.addBtnEvent(this.workBtn,this.onRank)
        this.addBtnEvent(this.monsterBtn,this.onMonster)
        this.addBtnEvent(this.tecBtn,this.onTec)
        this.addBtnEvent(this.buffBtn,this.onBuff)
        this.addBtnEvent(this.taskBtn,this.onTaskBtn)
        this.addBtnEvent(this.taskBtn2,this.onTaskBtn)

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

        MyTool.addLongTouch(this.soundBtn,()=>{
            if(DebugUI.getInstance().debugOpen && !SoundManager.getInstance().soundPlaying)
            {
                DebugUI.getInstance().show();
            }
        },this)
        this.addBtnEvent(this.taskGroup,this.onTask)

    }

    private onTaskBtn(){
        this.taskBtn.visible = this.taskBtn2.visible = false;
        egret.Tween.removeTweens(this.taskGroup)
        if(this.taskGroup.x == 0)
        {
            egret.Tween.get(this.taskGroup).to({x:-600},300).call(this.renewTaskRed,this);
        }
        else
        {
            egret.Tween.get(this.taskGroup).to({x:20},200).to({x:0},100).call(this.renewTaskRed,this);
        }
    }

    private renewTaskRed(){
        this.taskRed.visible = this.taskGroup.x == -600 && TaskManager.getInstance().isTaskFinish()
        this.taskBtn.visible = this.taskGroup.x == -600
        this.taskBtn2.visible = !this.taskBtn.visible
    }

    public hideTask(){
        this.taskGroup.x = -600;
        this.renewTaskRed();
    }
    public showTask(){
        this.taskGroup.x = -600;
        this.onTaskBtn();
    }

    public showDefGuide(){
        this.scroller.viewport.scrollV = 0;
        this.scroller.validateNow()
        MyTool.runListFun(this.list,'defGuide')

    }

    private onTask(e){
        e.stopImmediatePropagation();
        TaskManager.getInstance().onTaskGo();
    }

    public renewTask(){
        var TSM = TaskManager.getInstance();
        var vo = TSM.getCurrentTask();
        if(vo)
        {
            var value = Math.min(TSM.getTaskValue(vo),vo.value);
            this.setHtml(this.taskText,vo.getDes() + '  ' + this.createHtml(value + '/' + vo.value,0xFFECA5))
            if(value<vo.value)
            {
                this.taskText2.text = '去完成>>'
                this.taskText2.textColor = 0xFCB33C
            }
            else
            {
                this.taskText2.text = '【领取奖励】'
                this.taskText2.textColor = 0x70F45F
            }
        }
        else
        {
            this.taskGroup.visible = false;
        }
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
        MonsterUI.getInstance().show();
    }
    private onTec(){
        TecUI.getInstance().show();
    }
    private onRank(){
        WorkUI.getInstance().show();
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

    public onFight(){
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
        PKManager.getInstance().loadLevel();//处理等级数据，玩家登录后有可能会用到
        PKManager.getInstance().loadNick();//处理等级数据，玩家登录后有可能会用到
        var self = this;
        this.bottomGroup.visible = false;
        this.coinText.text = '???'
        this.diamondText.text = '???'



        ChangeUserUI.getAD();
        this.renewSound();
        this.loadingGroup.visible = true;
        this.barMC.width = 300;
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
                this.barMC.width = 300*res.progress/100;
                self.loadText.text = '正在加载素材..' + res.progress + '%'
            })
            return;
        }
        this.callShow();
    }


    private initData(){
        if(this.haveLoadFinish && this.haveGetInfo && !this.haveGetUser && this.needShowStartBtn)
        {
            this.changeUser.dataChanged()
            this.loadText.text = '点击屏幕授权进入游戏';
            this.needShowStartBtn = false;
            this.infoBtn.visible = true;
            this.barGroup.visible = false;
            return;
            //this.loadText.text = '用户授权后可进入游戏'
        }
        if(!this.haveLoadFinish || !this.haveGetInfo  || !this.haveGetUser)
            return;
        UM.testAddInvite();
        GuideManager.getInstance().isGuiding = false//!UM.guideFinish;
        this.bottomGroup.visible = true;
        this.loadingGroup.visible = false;
        this.showIndex = -1;
        this.reInitList()
        this.onTimer();
        this.onCoinChange();
        this.onDimaondChange();
        this.renewTask();
        this.showTask();
        MyTool.removeMC(this.changeUser);

        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.onCoinChange)
        this.addPanelOpenEvent(GameEvent.client.DIAMOND_CHANGE,this.onDimaondChange)
        this.addPanelOpenEvent(GameEvent.client.TEC_CHANGE,this.reInitList)
        this.addPanelOpenEvent(GameEvent.client.DEF_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.MONSTER_WORK_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.BUFF_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.FIGHT_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.TASK_CHANGE,this.renewTask)
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
        this.shopRedMC.visible = false//!coinObj.loginDayAward;

        //if(!this.shopRedMC.visible && coinObj.onLineAwardNum < 5)
        //{
        //    var coinCD = UM.onLineAwardCD
        //    var nextAwardTime = coinObj.onLineAwardTime + coinCD[coinObj.onLineAwardNum];
        //    this.shopRedMC.visible = TM.now() >=  nextAwardTime
        //}
    }


    public onVisibleChange(){
        //SoundManager.getInstance().playSound('pkbg');
        if(this.visible)
        {
            this.renewList();
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
        this.fightRed.visible = TM.now() - FightManager.getInstance().searchTime >= FightManager.getInstance().refreshSearchTime
        this.chapterRed.visible = ChapterManager.getInstance().getChapterCoin() > ChapterManager.getInstance().getMaxChapterCoin()*0.9
    }
}