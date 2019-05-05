class GameUI extends game.BaseUI_wx3 {

    private static _instance:GameUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GameUI();
        return this._instance;
    }
	private wx3_functionX_11922(){console.log(7016)}

    public constructor() {
        super();
        this.skinName = "GameUISkin";
    }

	private wx3_functionX_11923(){console.log(4873)}
    private scroller: eui.Scroller;
    public list: eui.List;
    private bottomGroup: eui.Group;
    //private buffBtn: eui.Group;
    //private buffRed: eui.Image;
    private workBtn: eui.Group;
    public tecBtn: eui.Group;
    public monsterBtn: eui.Group;
	private wx3_functionX_11924(){console.log(4143)}
    public chapterBtn: eui.Group;
    private chapterRed: eui.Image;
    public fightBtn: eui.Group;
    private fightRed: eui.Image;
    //private coinGroup: eui.Group;
    //private shopRedMC: eui.Image;
    private coinText: eui.Label;
    private diamondGroup: eui.Group;
	private wx3_functionX_11925(){console.log(1801)}
    private diamondText: eui.Label;
    private soundBtn: eui.Image;
    private loadingGroup: eui.Group;
    private changeUser: ChangeUserUI;
    private startBtn: eui.Image;
    private loadText: eui.Label;
	private wx3_functionX_11926(){console.log(3962)}
    private barGroup: eui.Group;
    private barMC: eui.Rect;

    //private taskGroup: eui.Group;
    //private taskText: eui.Label;
    //private taskText2: eui.Label;
    //private taskBtn: eui.Group;
    //private taskBtn2: eui.Group;
    //private taskRed: eui.Image;



	private wx3_functionX_11927(){console.log(5235)}






	private wx3_functionX_11928(){console.log(3743)}

    private infoBtn:UserInfoBtn
    private haveGetInfo = false;
    private haveLoadFinish = false;
    private haveGetUser = false;
    private needShowStartBtn = false;
	private wx3_functionX_11929(){console.log(895)}

    private firstShow = true;
    private dataProvider:eui.ArrayCollection;
    public showIndex = -1;
    public showData;
    public childrenCreated() {
        super.childrenCreated();
        //this.buffRed.visible = false;
        this.addBtnEvent(this.soundBtn,this.onSetting_5735)
        this.addBtnEvent(this.chapterBtn,this.onChapter_6043)
        this.addBtnEvent(this.fightBtn,this.onFight)
        //this.addBtnEvent(this.coinGroup,this.onShop)
        this.addBtnEvent(this.workBtn,this.onRank_6057)
        this.addBtnEvent(this.monsterBtn,this.onMonster_4316)
        this.addBtnEvent(this.tecBtn,this.onTec_1910)

	wx3_function(2363);

        this.changeUser.stopRed = true;
        //this.addBtnEvent(this.taskBtn,this.onTaskBtn)
        //this.addBtnEvent(this.taskBtn2,this.onTaskBtn)

        this.scroller.viewport = this.list
        this.dataProvider = this.list.dataProvider = new eui.ArrayCollection([])
        this.list.itemRendererFunction = (data)=>{
            if(data.def)
                return DefUI;
            if(data.ad)
                return ChangeUserUI;
            return MainWorkItem;
        };
	wx3_function(2478);

        this.infoBtn = new UserInfoBtn(this.startBtn, (res)=>{
            this.renewInfo_2620(res);
        }, this, Config.localResRoot + "wx_btn_info.png");
        this.infoBtn.visible = false;
        this.startBtn.visible = false;
	wx3_function(4400);

        MyTool.addLongTouch(this.soundBtn,()=>{
            if(DEBUG)
            {
                DebugUI.getInstance().show();
                return;
            }
            if(DebugUI.getInstance().debugOpen && !SoundManager_wx3.getInstance().soundPlaying)
            {
                DebugUI.getInstance().show();
	wx3_function(1261);
            }
        },this)
        //this.addBtnEvent(this.taskGroup,this.onTask)

    }

    public scrollToWork(){
        this.scroller.viewport.scrollV = Math.max(0,(500+320+100) -this.scroller.height)
    }
	private wx3_functionX_11930(){console.log(8442)}

    //private onTaskBtn(){
    //    this.taskBtn.visible = this.taskBtn2.visible = false;
    //    egret.Tween.removeTweens(this.taskGroup)
    //    if(this.taskGroup.x == 0)
    //    {
    //        egret.Tween.get(this.taskGroup).to({x:-600},300).call(this.renewTaskRed,this);
    //    }
    //    else
    //    {
    //        egret.Tween.get(this.taskGroup).to({x:20},200).to({x:0},100).call(this.renewTaskRed,this);
    //    }
    //}

    //private renewTaskRed(){
    //    this.taskRed.visible = this.taskGroup.x == -600 && TaskManager.getInstance().isTaskFinish()
    //    this.taskBtn.visible = this.taskGroup.x == -600
    //    this.taskBtn2.visible = !this.taskBtn.visible
    //}

    //public hideTask(){
    //    this.taskGroup.x = -600;
    //    this.renewTaskRed();
    //}
    //public showTask(){
    //    this.taskGroup.x = -600;
    //    this.onTaskBtn();
    //}

    public showDefGuide(){
        this.scroller.viewport.scrollV = 0;
	wx3_function(9452);
        this.scroller.validateNow()
        MyTool.runListFun(this.list,'defGuide')

    }

    //private onTask(e){
    //    e.stopImmediatePropagation();
    //    TaskManager.getInstance().onTaskGo();
    //}
    //
    //public renewTask(){
    //    var TSM = TaskManager.getInstance();
    //    var vo = TSM.getCurrentTask();
    //    if(vo)
    //    {
    //        var value = Math.min(TSM.getTaskValue(vo),vo.value);
    //        this.setHtml(this.taskText,vo.getDes() + '  ' + this.createHtml(value + '/' + vo.value,0xFFECA5))
    //        if(value<vo.value)
    //        {
    //            this.taskText2.text = '去完成>>'
    //            this.taskText2.textColor = 0xFCB33C
    //        }
    //        else
    //        {
    //            this.taskText2.text = '【领取奖励】'
    //            this.taskText2.textColor = 0x70F45F
    //        }
    //    }
    //    else
    //    {
    //        this.taskGroup.visible = false;
    //    }
    //}

	private wx3_functionX_11931(){console.log(9142)}
    private renewInfo_2620(res?){
        var wx = window['wx'];
        if(!wx)
        {
            this.haveGetUser = true;
            this.initData_847();
	wx3_function(7575);
            return;
        }
        if(res)
        {
            if(!res.userInfo)
                return;
            this.infoBtn.visible = false;
            UM_wx3.renewInfo(res.userInfo)
            this.haveGetUser = true;
            this.initData_847();
            return;
        }
        wx.getSetting({
            success: (res) =>{
                console.log(res.authSetting)
                if(res.authSetting["scope.userInfo"])//已授权
                {
                    this.haveGetUser = true;
                    this.initData_847()
                    wx.getUserInfo({
                        success: (res) =>{
                            var userInfo = res.userInfo
                            UM_wx3.renewInfo(userInfo)
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
	private wx3_functionX_11932(){console.log(7326)}

    private onMonster_4316(){
        MonsterUI.getInstance().show();
    }
    private onTec_1910(){
        TecUI.getInstance().show();
	wx3_function(2268);
    }
    private onRank_6057(){
        WorkUI.getInstance().show();
    }


	private wx3_functionX_11933(){console.log(6589)}
    private onSetting_5735(){
        SoundManager_wx3.getInstance().soundPlaying = !SoundManager_wx3.getInstance().soundPlaying
        SoundManager_wx3.getInstance().bgPlaying = !SoundManager_wx3.getInstance().bgPlaying
        this.renewSound_1666();

    }
	private wx3_functionX_11934(){console.log(8359)}
    private onChapter_6043(){
        ChapterUI.getInstance().show();
        //CoinGameUI.getInstance().show();
    }

    private renewSound_1666(){
        this.soundBtn.source = SoundManager_wx3.getInstance().bgPlaying?'sound_btn1_png':'sound_btn2_png'
    }
	private wx3_functionX_11935(){console.log(7696)}

    public onFight(){
        FightUI.getInstance().show()
        //LogUI.getInstance().show();
        //this.mainPKUI.hide();
        //this.team1.visible = this.team2.visible = !this.mainPKUI.visible
    }

    public onShop(){
        GetCoinUI.getInstance().show();
	wx3_function(4735);
    }

    public scrollToBottom(){
        this.scroller.viewport.scrollV = this.scroller.viewport.contentHeight - this.scroller.height
        this.once(egret.Event.ENTER_FRAME,()=>{
            this.scroller.viewport.scrollV = this.scroller.viewport.contentHeight - this.scroller.height
        },this)
    }
	private wx3_functionX_11936(){console.log(8772)}

    public show(){
        super.show();
    }

    private callShow_8865(){
        this.loadText.text = '初始化中'


        //var index = PKManager.getInstance().getTodayIndex();
        //PKManager.getInstance().loadLevelData(()=>{
        //PKManager.getInstance().loadLevelData(index,(data)=>{
            //PKManager.getInstance().initData(index,data);
            if(this.needShowStartBtn)
            {
                this.haveLoadFinish = true;
	wx3_function(9924);
                this.initData_847();
                return;
            }
            setTimeout(()=>{
                this.haveLoadFinish = true;
                this.initData_847();
	wx3_function(8646);
            },1000)
        //})

    }



	private wx3_functionX_11937(){console.log(682)}

    public onShow(){
        PKManager_wx3.getInstance().loadLevel();//处理等级数据，玩家登录后有可能会用到
        PKManager_wx3.getInstance().loadNick();//处理等级数据，玩家登录后有可能会用到
        PKManager_wx3.getInstance().loadChapter(); //任务生成会用到
        var self = this;
	wx3_function(6796);
        this.bottomGroup.visible = false;
        this.coinText.text = '???'
        this.diamondText.text = '???'



	wx3_function(4572);
        ChangeUserUI.getAD();
        this.renewSound_1666();
        this.loadingGroup.visible = true;
        var w = 204;
        this.barMC.width = w;
        self.loadText.text = '正在加载素材，请耐心等候..'
        this.renewInfo_2620();
	wx3_function(396);
        UM_wx3.getUserInfo(()=>{
            this.haveGetInfo = true;
            this.initData_847();
        });
        var wx =  window["wx"];
        if(wx)
        {
            const loadTask = wx.loadSubpackage({
                name: 'assets2', // name 可以填 name 或者 root
                success(res) {
                    self.callShow_8865();
	wx3_function(4725);
                    setTimeout(()=>{
                        self.changeUser.dataChanged()
                    },5000)
                },
                fail(res) {
                }
            })

            loadTask.onProgressUpdate(res => {
                self.barMC.width = w*res.progress/100;
	wx3_function(4123);
                self.loadText.text = '正在加载素材..' + res.progress + '%'
            })
            return;
        }
        this.callShow_8865();
    }
	private wx3_functionX_11938(){console.log(4212)}


    private initData_847(){
        if(this.haveLoadFinish && this.haveGetInfo && !this.haveGetUser && this.needShowStartBtn)
        {
            this.changeUser.dataChanged()
            this.loadText.text = '点击屏幕授权进入游戏';
	wx3_function(6040);
            this.needShowStartBtn = false;
            this.infoBtn.visible = true;
            this.barGroup.visible = false;
            return;
            //this.loadText.text = '用户授权后可进入游戏'
        }
        if(!this.haveLoadFinish || !this.haveGetInfo  || !this.haveGetUser)
            return;

        //UM_wx3.isTest = true;
        if(UM_wx3.isTest)
        {
            TestUI.getInstance().show();
            return;
        }

	wx3_function(1344);
        UM_wx3.testAddInvite();
        GuideManager.getInstance().isGuiding = UM_wx3.isFirst;
        this.bottomGroup.visible = true;
        this.loadingGroup.visible = false;
        this.showIndex = -1;
        this.reInitList()
        this.onTimer();
	wx3_function(148);
        this.onCoinChange_8520();
        this.onDimaondChange_1194();

        //this.renewTask();
        //this.showTask();
        MyTool.removeMC(this.changeUser);


        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE_5715)
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.onCoinChange_8520)
        this.addPanelOpenEvent(GameEvent.client.DIAMOND_CHANGE,this.onDimaondChange_1194)
        this.addPanelOpenEvent(GameEvent.client.TEC_CHANGE,this.reInitList)
        this.addPanelOpenEvent(GameEvent.client.DEF_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.MONSTER_WORK_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.MONSTER_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.BUFF_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.FIGHT_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.TASK_CHANGE,this.onTaskChange_2584)
        //this.addPanelOpenEvent(GameEvent.client.pass_day,this.onPassDay)
	wx3_function(7175);
        this.firstShow = false;

        TaskManager.getInstance().init();
        if(GuideManager.getInstance().isGuiding)
        {
            GuideManager.getInstance().init();
	wx3_function(3295);
            GuideManager.getInstance().showGuide();
            GuideManager.getInstance().enableScrollV(this.scroller);
        }
        else
        {
            SoundManager_wx3.getInstance().playSound('bg');
	wx3_function(5817);
            WorkOfflineUI.getInstance().show(UM_wx3.offlineTime,WorkManager.getInstance().offlineEarn)
        }
    }


    //private onPassDay(){
    //    var index = PKManager.getInstance().getTodayIndex();
    //    PKManager.getInstance().loadLevelData(index,(data)=>{
    //        PKManager.getInstance().initData(index,data);
    //    })
    //}

	private wx3_functionX_11939(){console.log(9452)}

    private onTaskChange_2584(){
        MyTool.runListFun(this.list,'renewTask')
    }

    public endGuide(){
        this.scroller.viewport.scrollV = 0;
	wx3_function(9615);
        GuideManager.getInstance().enableScrollV(this.scroller);
    }

    public renewList(){
         MyTool.renewList(this.list)
    }
	private wx3_functionX_11940(){console.log(4328)}

    private getListArr_8306(){
        var arr:any =  [{def:true}]
        var max = WorkManager.getInstance().getOpenWork()+1
        for(var i=0;i<max;i++)
        {
            arr.push({id:i+1})
        }
        arr[arr.length-1].isLast = true;
	wx3_function(7109);
        arr.push({ad:true});
        return arr
    }
    public reInitList(){
        this.dataProvider.source = (this.getListArr_8306())
        this.dataProvider.refresh();
	wx3_function(1151);
    }

    private onCoinChange_8520(){
        this.coinText.text = NumberUtil.addNumSeparator(UM_wx3.coin);
    }
    private onDimaondChange_1194(){
        this.diamondText.text = UM_wx3.diamond + '';
	wx3_function(8399);
    }

    private renewCoinRed_3828(){
        var coinObj = UM_wx3.coinObj;
        //this.shopRedMC.visible = false//!coinObj.loginDayAward;

        //if(!this.shopRedMC.visible && coinObj.onLineAwardNum < 5)
        //{
        //    var coinCD = UM.onLineAwardCD
        //    var nextAwardTime = coinObj.onLineAwardTime + coinCD[coinObj.onLineAwardNum];
        //    this.shopRedMC.visible = TM.now() >=  nextAwardTime
        //}
    }
	private wx3_functionX_11941(){console.log(4911)}


    public onVisibleChange(){
        //SoundManager.getInstance().playSound('pkbg');
        if(this.visible)
        {
            this.renewList();
	wx3_function(3764);
        }
        else
        {
            SoundManager_wx3.getInstance().playSound('bg');
        }
    }
	private wx3_functionX_11942(){console.log(7820)}

    private onE_5715(){
        if(this.visible)
            MyTool.runListFun(this.list,'onE')
    }

	private wx3_functionX_11943(){console.log(4108)}
    public onTimer(){
        if(!this.visible)
            return;
        //this.renewCoinRed_3828();
        this.fightRed.visible = TM_wx3.now() - FightManager.getInstance().searchTime >= FightManager.getInstance().refreshSearchTime
        this.chapterRed.visible = ChapterManager.getInstance().getChapterCoin() > ChapterManager.getInstance().getMaxChapterCoin()*0.9
        MyTool.runListFun(this.list,'onTimer')
    }
}