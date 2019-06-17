var UM_wx3:UserManager_wx3,TM_wx3:TimeManager_wx3,EM_wx3:EventManager_wx3 ,CM_wx3:CacheManager_wx3,DM:DebugManager_wx3
class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
	private wx3_functionX_11773(){console.log(1373)}
     */
    private loadingView: MainLoadingUI;
    protected createChildren(): void {
        super.createChildren();
        console.log('_10')

        //inject the custom material parser
        //注入自定义的素材解析器
	wx3_function(6825);
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //this.stage.setContentSize(640,1136);

        //this.stage.addEventListener(egret.Event.RESIZE,this.setScaleMode_2398,this);
        this.setScaleMode_2398();
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = MainLoadingUI.getInstance();
        //if(_get['debug'] != 100 && _get['debug'] != 101)
        //{
        //    this.loadingView.show(this);
        //}
	wx3_function(4425);



        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete_5606, this);
        RES.loadConfig("resource/default.res.json", "resource/");

	wx3_function(9263);


        UM_wx3 = UserManager_wx3.getInstance();
        TM_wx3 = TimeManager_wx3.getInstance();
        EM_wx3 = EventManager_wx3.getInstance();
        CM_wx3 = CacheManager_wx3.getInstance();
	wx3_function(5202);
        DM = DebugManager_wx3.getInstance();
        Config.initURLRequest();
        console.log('_1a')
    }

    private setScaleMode_2398(){
        //if(this.stage.stageWidth/this.stage.stageHeight < 640/1136)
        //{
        //    this.stage.setContentSize(640,1136)
        //    this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        //}
        //else if(this.stage.stageWidth/this.stage.stageHeight > 640/960)
        //{
        //    this.stage.setContentSize(640,960)
        //    this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        //}
        //else
        //    this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
    }
	private wx3_functionX_11774(){console.log(3525)}


    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
	private wx3_functionX_11775(){console.log(6800)}
    private onConfigComplete_5606(event:RES.ResourceEvent):void {
        console.log('_1b')
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete_5606, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete_8872, this);

	wx3_function(8072);




        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete_7240, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError_3034, this);
	wx3_function(572);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress_2119, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError_6781, this);
        RES.loadGroup("preload_png");
    }
    private isThemeLoadEnd: boolean = false;
    /**
	private wx3_functionX_11776(){console.log(9629)}
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    private onThemeLoadComplete_8872(): void {
        this.isThemeLoadEnd = true;
        console.log('_1c')
        this.createScene_5450();
	wx3_function(5901);
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
	private wx3_functionX_11777(){console.log(5549)}
    private onResourceLoadComplete_7240(event:RES.ResourceEvent):void {
        console.log('_1d')
        if (event.groupName == "preload_png") {

            this.isResourceLoadEnd = true;

	wx3_function(2851);


            this.removeLoadEvent_2862();
            this.createScene_5450();
        }
        //else if (event.groupName == "preload_png") {
        //    RES.loadGroup("preload_jpg");//预加载第一阶段
        //}
        //else if (event.groupName == "preload_png") {
        //    this.removeLoadEvent_2862();
        //    this.createScene_5450();
        //    RES.loadGroup("preload_jpg");
        //    RES.loadGroup("preload_png32")
        //
        //}
    }
	private wx3_functionX_11778(){console.log(2738)}

    private removeLoadEvent_2862(){
        this.loadingView.setFinish();
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete_7240, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError_3034, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress_2119, this);
	wx3_function(57);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError_6781, this);
    }
    private createScene_5450(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
        }
    }
	private wx3_functionX_11779(){console.log(7448)}
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError_6781(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
	wx3_function(6723);
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError_3034(event:RES.ResourceEvent):void {
        //TODO
	wx3_function(3643);
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete_7240(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
	private wx3_functionX_11780(){console.log(818)}
     */
    private onResourceProgress_2119(event:RES.ResourceEvent):void {
        if (event.groupName == "game") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
	private wx3_functionX_11781(){console.log(1357)}
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        CM_wx3.initData(RES.getRes("data_txt"),'monster_base');
	wx3_function(2602);
        CM_wx3.initData(RES.getRes("task_txt"),'task_base');
        CM_wx3.initData(RES.getRes("skill_txt"),'skill_base');
        CM_wx3.initFinish()
        GameManager_wx3.stage = this.stage;
        GameManager_wx3.container = this;
        if(App.isIOS){
            GameManager_wx3.stage.frameRate = 60;
	wx3_function(2249);
        }
        GameManager_wx3.getInstance().init();
        console.log('_11')

        if(_get['hide'])
            return;
        //GameUI.getInstance().show();
        //var wx = window['wx'];
        //if(!wx)
        //{
        //    GameUI.getInstance().show();
        //    return;
        //}
        //console.log('_12')
	wx3_function(4082);
        GameUI.getInstance().show();
        MyADManager.getInstance().getAD()
        MyADManager.getInstance().createAD()


    }
}
