class ResourceLoaderUI extends game.BaseWindow {

    private static _instance:ResourceLoaderUI;

    public static getInstance():ResourceLoaderUI {
        if (!this._instance)
            this._instance = new ResourceLoaderUI();
        return this._instance;
    }
	private wx3_functionX_12307(){console.log(7617)}

    private finishFun;
    public show(arr?,fun?){
        this.LoadFiles = arr;
        this.finishFun = fun;
        super.show();
	wx3_function(3185);
    }
    public onShow(){
        this.finishFun && this.finishFun();
        egret.callLater(this.hide,this);
    }
}