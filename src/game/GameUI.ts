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


    private scroller: eui.Scroller;
    public list: eui.List;
    private bottomGroup: eui.Group;
    private workBtn: eui.Group;
    public monsterBtn: eui.Group;
    public chapterBtn: eui.Group;
    private chapterRed: eui.Image;
    public fightBtn: eui.Group;
    private fightRed: eui.Image;
    public tecBtn: eui.Group;
    public skillBtn: eui.Group;
    private coinGroup: eui.Group;
    private coinText: eui.Label;
    private diamondGroup: eui.Group;
    private diamondText: eui.Label;
    private soundBtn: eui.Image;




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
        this.addBtnEvent(this.skillBtn,()=>{
            SkillUI.getInstance().show();
        })


        this.scroller.viewport = this.list
        this.dataProvider = this.list.dataProvider = new eui.ArrayCollection([])
        this.list.itemRendererFunction = (data)=>{
            if(data.def)
                return DefUI;
            //if(data.ad)
            //    return ChangeUserUI;
            return MainWorkItem;
        };


        MyTool.addLongTouch(this.soundBtn,()=>{
            if(DEBUG)
            {
                DebugUI.getInstance().show();
                return;
            }
            if(DebugUI.getInstance().debugOpen && !SoundManager_wx3.getInstance().soundPlaying)
            {
                DebugUI.getInstance().show();
            }
        },this)
        //this.addBtnEvent(this.taskGroup,this.onTask)

        if(Config.isZJ)
        {
            new ZijieScreenBtn();
        }

    }

    public scrollToWork(){
        this.scroller.viewport.scrollV = Math.max(0,(500+320+100) -this.scroller.height)
    }

    public showDefGuide(){
        this.scroller.viewport.scrollV = 0;
        this.scroller.validateNow()
        MyTool.runListFun(this.list,'defGuide')

    }




    private onMonster_4316(){
        MonsterUI.getInstance().show();
    }
    private onTec_1910(){
        TecUI.getInstance().show();
    }
    private onRank_6057(){
        WorkUI.getInstance().show();
    }

    private onSetting_5735(){
        SoundManager_wx3.getInstance().soundPlaying = !SoundManager_wx3.getInstance().soundPlaying
        SoundManager_wx3.getInstance().bgPlaying = !SoundManager_wx3.getInstance().bgPlaying
        this.renewSound_1666();

    }
    private onChapter_6043(){
        ChapterUI.getInstance().show();
        //CoinGameUI.getInstance().show();
    }

    private renewSound_1666(){
        this.soundBtn.source = SoundManager_wx3.getInstance().bgPlaying?'sound_btn1_png':'sound_btn2_png'
    }

    public onFight(){
        FightUI.getInstance().show()
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


    public onShow(){



        this.bottomGroup.visible = false;
        this.coinText.text = '???'
        this.diamondText.text = '???'


        this.renewSound_1666();


        GuideManager.getInstance().isGuiding = UM_wx3.isFirst;
        this.bottomGroup.visible = true;
        this.showIndex = -1;
        this.reInitList()
        this.onTimer();
        this.onCoinChange_8520();
        this.onDimaondChange_1194();



        AniManager_wx3.getInstance().preLoadMV(8)
        AniManager_wx3.getInstance().preLoadMV(103)
        AniManager_wx3.getInstance().preLoadMV(112)
        AniManager_wx3.getInstance().preLoadMV(128)
        AniManager_wx3.getInstance().preLoadMV(200)

        RES.createGroup('door_mv', ["door_mv_json","door_mv_png"], true);
        RES.loadGroup('door_mv');

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

        this.firstShow = false;

        TaskManager.getInstance().init();
        if(GuideManager.getInstance().isGuiding)
        {
            GuideManager.getInstance().init();
            GuideManager.getInstance().showGuide();
            GuideManager.getInstance().enableScrollV(this.scroller);
        }
        else
        {
            SoundManager_wx3.getInstance().playSound('bg');
            MyADManager.getInstance().testWX5Back();
            WorkOfflineUI.getInstance().show(UM_wx3.offlineTime,WorkManager.getInstance().offlineEarn)

        }
    }

    private onTaskChange_2584(){
        MyTool.runListFun(this.list,'renewTask')
    }

    public endGuide(){
        this.scroller.viewport.scrollV = 0;
        GuideManager.getInstance().enableScrollV(this.scroller);
    }

    public renewList(){
         MyTool.renewList(this.list)
    }

    private getListArr_8306(){
        var arr:any =  [{def:true}]
        var max = WorkManager.getInstance().getOpenWork()+1
        for(var i=0;i<max;i++)
        {
            arr.push({id:i+1})
        }
        arr[arr.length-1].isLast = true;
	wx3_function(7109);
        //arr.push({ad:true});
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
            MyTool.runListFun(this.list,'onMainHide')
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