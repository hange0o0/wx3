
class LoadingFile {

    /**
     * 加载进度界面
	private wx3_functionX_12105(){console.log(9869)}
     * loading process interface
     */
    private _loadingView:LoadingUI;
    private loadingView:any;
    private loadFiles:Array<string>;
    private callBack: any;
	private wx3_functionX_12106(){console.log(4076)}
    private callBackTarget: any;
    private loadCount: number;

    private groupData = {}

    private loadingData
	private wx3_functionX_12107(){console.log(510)}
    private loadtimer

    private static instance:LoadingFile;
    public static getInstance() {
        if (!this.instance) this.instance = new LoadingFile();
        return this.instance;
    }
	private wx3_functionX_12108(){console.log(341)}

    public constructor() {
        this._loadingView = new LoadingUI();
    }

    /*
	private wx3_functionX_12109(){console.log(7821)}
     * array ['party', 'js_xxxxx'];
     */ 
    public loadGroup(array:Array<string>, callBack:any, callBackTarget:any,loadingUI?,loadingData?):void {

        this.loadtimer = egret.getTimer();
        loadingData = loadingData || {};
	wx3_function(8337);
        loadingData.start =  this.loadtimer;
        this.loadFiles = array;
        this.callBack = callBack;
        this.loadCount = array.length;
        this.callBack = callBack;
        this.callBackTarget = callBackTarget;
	wx3_function(1621);
        this.loadingData = loadingData;

        this.loadingView = loadingUI || this._loadingView;
        this.loadingView.show(loadingData);
        
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete_6122, this);
	wx3_function(3962);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError_6273, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress_8504, this);

        this.groupData = {};
        for(var i = 0;i < array.length; i++){

            this.groupData[array[i]] = {
                current:0,
                total:RES.getGroupByName(array[i]).length
            }
            RES.loadGroup(array[i]);
	wx3_function(5049);
        }
        
    }


    /**
	private wx3_functionX_12110(){console.log(3295)}
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete_6122(event:RES.ResourceEvent):void {
        if(this.loadFiles.indexOf(event.groupName) == -1)
            return;
        this.loadCount--;
	wx3_function(78);
        
        if (this.loadCount == 0) {

            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete_6122, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError_6273, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress_8504, this);
	wx3_function(1692);
            var loadPass = egret.getTimer() - this.loadtimer
            if(this.loadingData.min && loadPass < this.loadingData.min)
            {
                  egret.setTimeout(function(){
                      this.loadingView.hide();
                      this.callBack.call(this.callBackTarget);
	wx3_function(3705);
                  },this,this.loadingData.min - loadPass);
            }
            else
            {
                this.loadingView.hide();
                this.callBack.call(this.callBackTarget);
	wx3_function(1717);
            }

        }
    }

    private onResourceLoadError_6273(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
	wx3_function(6906);
    }

    private onResourceProgress_8504(event:RES.ResourceEvent):void {
        if(this.loadFiles.indexOf(event.groupName) == -1)
            return;
        this.groupData[event.groupName].current = event.itemsLoaded;
	wx3_function(1638);
        var current = 0
        var total = 0
        for(var s in this.groupData)
        {
            current += this.groupData[s].current
            total += this.groupData[s].total
        }

	wx3_function(2193);
        this.loadingView.setProgress(current, total);
    }

}


