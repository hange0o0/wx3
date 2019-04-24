
class LoadingQueue {

    /**
     * 加载进度界面
	private wx3_functionX_12111(){console.log(9858)}
     * loading process interface
     */
    //private loadingView:LoadingUI;
    private loadFiles:Array<string>;
    private callBack: any;
    private callBackTarget: any;
    private loadCount: number = 0;
	private wx3_functionX_12112(){console.log(8499)}
    
    private loaderList: Array<any> = [];
    private loadReuslt: Object = new Object();

    public constructor() {
    }
	private wx3_functionX_12113(){console.log(4934)}

    /*
     * array ['party', 'js_xxxxx'];
     */ 
    public load(array:Array<string>, callBack:any, callBackTarget:any):void {
        
	wx3_function(9313);
        this.loadFiles = array;
        this.callBack = callBack;
        this.callBack = callBack;
        this.callBackTarget = callBackTarget;
        
        //设置加载进度界面
//        this.loadingView = new LoadingUI();
//        GameManager.stage.addChild(this.loadingView);
        this.startLoad_3889();
	wx3_function(9048);
    }
    
    private startLoad_3889(){

        while(this.loaderList.length < 3 && this.loadCount <this.loadFiles.length) {

	wx3_function(6421);
            this.loaderList.push( this.createLoader_9037(this.loadFiles[this.loadCount]) );
            this.loadCount++;
        }
    }
    
    private createLoader_9037(url:string):egret.URLLoader{
        var loader: egret.URLLoader = new egret.URLLoader();
	wx3_function(2910);
        var type: string = url.substring(url.lastIndexOf(".")+1, url.length);
        var format: string;
        switch(type){
            case "json": 
                format = egret.URLLoaderDataFormat.TEXT;
                break;
            default:
                format = egret.URLLoaderDataFormat.TEXTURE;
	wx3_function(9884);
        }
        loader.dataFormat = format;
        loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete_2156,this);
        var request: egret.URLRequest = new egret.URLRequest(url);
        loader.load(request);
        
        return loader;
    }
	private wx3_functionX_12114(){console.log(2917)}
    
    private onLoadComplete_2156(e: egret.Event){
        var loader = <egret.URLLoader>e.currentTarget; 
        var url: string = loader._request.url;
        
        var type: string = url.substring(url.lastIndexOf(".") + 1,url.length);
	wx3_function(6439);
        var format: string;
        switch(type) {
            case "json":
                this.loadReuslt[url] = JSON.parse(loader.data);
                break;
            default:
                this.loadReuslt[url] = loader.data;
	wx3_function(7807);
        }
        
        for(var key in this.loaderList){
            if(this.loaderList[key] == e.currentTarget){
                this.loaderList[key].removeEventListener(egret.Event.COMPLETE,this.onLoadComplete_2156,this);
            }
        }
        var num = ObjectUtil.objLength(this.loadReuslt);
	wx3_function(413);
        if(num == this.loadFiles.length){
            this.callBack.apply(this.callBackTarget,[this.loadReuslt]);
        }
        else
            this.startLoad_3889();
    }
	private wx3_functionX_12115(){console.log(5142)}

}


