class Net extends egret.EventDispatcher{
    private static instance: Net;
    public static getInstance() {
        if(!this.instance) this.instance = new Net();
        return this.instance;
    }

    public constructor() {
        super();
    }

    public send(url,msg,fun?){
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader['msg'] = msg;
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        var variables = new egret.URLVariables('a=1');
        var oo:any = {};
        oo.msg = JSON.stringify(msg);
        variables.variables = oo;
        request.data = variables;
        if(Config.isDebug )
        {
            console.log('send===>      '+JSON.stringify(msg) +'   '+TM_wx3.now());
        }
        loader.load(request);
        if(fun)
        {
            this.addLoading();
            loader.once(egret.Event.COMPLETE,(e)=>{
                var data = JSON.parse(loader.data);
                fun(data);
                this.removeLoading();
            },this)
        }
    }


    private refresh(){
        location.reload();
    }

    public addLoading(){
        MsgingUI.getInstance().show();
    }

    public removeLoading(){
        MsgingUI.getInstance().hide();
    }


    public getServerData(fun){
        var url =  Config.serverPath + 'getGameData.php'
        this.send(url,{gameid:UM_wx3.gameid,gameid2:UM_wx3.gameid2},fun);
    }
    public getShareData(fun){
        var url =  Config.serverPath + 'getShareData.php'
        this.send(url,{gameid:UM_wx3.gameid,gameid2:UM_wx3.gameid2},fun);
    }
    public saveServerData(isNewUser?){
        var url =  Config.serverPath + 'saveGameData.php'
        if(isNewUser)
            var url =  Config.serverPath + 'newGameData.php'
        this.send(url,{gameid:UM_wx3.gameid,gameid2:UM_wx3.gameid2,data:Base64.encode(JSON.stringify(UM_wx3.getUpdataData()))});
    }


    public onShareIn(obj,fun){
        var url =  Config.serverPath + 'onShareIn.php'
        this.send(url,obj,fun);
    }
}