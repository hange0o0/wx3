class Net extends egret.EventDispatcher{
    private static instance: Net;
    public static getInstance() {
        if(!this.instance) this.instance = new Net();
        return this.instance;
    }
	private wx3_functionX_11867(){console.log(9712)}

    public constructor() {
        super();
    }

    public send(url,msg){
        var loader = new egret.URLLoader();
	wx3_function(1040);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader['msg'] = msg;
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        var variables = new egret.URLVariables('a=1');
        var oo:any = {};
	wx3_function(2650);
        oo.msg = JSON.stringify(msg);
        variables.variables = oo;
        request.data = variables;
        if(Config.isDebug )
        {
            console.log('send===>      '+JSON.stringify(msg) +'   '+TM_wx3.now());
	wx3_function(9047);
        }
        loader.load(request);
    }


    private refresh_1339(){
        location.reload();
	wx3_function(9400);
    }

    private addLoading_5901(){
        MsgingUI.getInstance().show();
    }

	private wx3_functionX_11868(){console.log(8325)}
    private removeLoading_2736(){
        MsgingUI.getInstance().hide();
    }
}