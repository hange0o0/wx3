class MyADManager {
    private static instance:MyADManager;

    public static getInstance() {
        if (!this.instance) this.instance = new MyADManager();
        return this.instance;
    }
	private wx3_functionX_57294(){console.log(4510)}

    public changeUserTime = 0
    public changeUserID = 0
    public changeUserFun;

    public extraData
	private wx3_functionX_57295(){console.log(3757)}
    public finishExtraUin = -1;

    public cloudPath = 'cloud://server1-3f4fd3.7365-server1-3f4fd3/'

    public adList;
    public isCallADHide = false

	private wx3_functionX_57296(){console.log(4394)}
    public onShow(res){
        if(this.changeUserTime)
        {
            if(TM_wx3.now() - this.changeUserTime > 30) //停留超过30秒
            {
                this.addJoinAppid(this.changeUserID);
	wx3_function(3176);
                if(this.changeUserFun)
                    this.changeUserFun();

                ChangeJumpUI.getInstance().hide();
            }
            this.changeUserTime = 0;
	wx3_function(7670);
            this.changeUserFun = null
        }
        this.initExtra(res)
        this.testWX5Back();
    }

	private wx3_functionX_57297(){console.log(610)}
    public navigateToMiniProgram(data){
        var wx = window['wx'];

        if(!wx)
        {
            console.log('click AD')

            return;
        }
        var self = this;
	wx3_function(6619);
        wx.navigateToMiniProgram({
            appId:data.appid,
            success(res) {
                self.addJoinAppid(data.appid);
                data.fun && data.fun('changeUser');
            }
        })
    }
	private wx3_functionX_57298(){console.log(1120)}

    public addJoinAppid(appid){
        var arr = SharedObjectManager_wx3.getInstance().getMyValue('exchangeUserAppid')|| [];
        var index = arr.indexOf(appid)
        if(index != -1)
            arr.splice(index,1);
	wx3_function(6554);
        arr.push(appid)
        while(arr.length > 30)
            arr.shift()
        SharedObjectManager_wx3.getInstance().setMyValue('exchangeUserAppid',arr)
    }

	private wx3_functionX_57299(){console.log(7064)}
    public getAD(fun?){
        if(this.adList)
        {
            fun && fun();
            return;
        }
        if(Config.isZJ || Config.isQQ)
        {
            fun && fun();
            return;
        }

	wx3_function(1984);
        var self = this;
        //var splitList = ['wxd5d9d807682d46bb',"wxf9c8e218c23e2eb7","wxe066524f2972cb1a","wx2f66e2c8de744d53"]
        this.adList = []
        var num = 20
        var wx = window['wx'];
        //console.log(333333)
        if(!wx) {
            var temp = {
                isSelf:true,
                "appid": "wxd5d9d807682d46bb",
                "logo": "icon_coin_png",
                img:'icon_coin_png',
                "desc": "右手油门，左手刹车，做一个平民车神！",
                name:'前方有测速监控'
            }
            this.adList.push(temp)
            this.adList.push(temp)
            this.adList.push(temp)
            this.adList.push(temp)

	wx3_function(6503);

            fun && fun();
            return;
        }

        wx.wladGetAds(num,function (res) { //第⼀一个参数为获取⼴广告条数，第⼆二个参数为获取成功后回调⽅方法;
	wx3_function(3949);
            self.adList = self.adList.concat(res.data);
            self.resetAdList_2610();
            fun && fun();
        })

        wx.cloud.downloadFile({
            fileID: self.cloudPath + 'adList.txt',
            success: res => {
                var url =  res.tempFilePath;
	wx3_function(5670);
                var loader: egret.URLLoader = new egret.URLLoader();
                loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                loader.once(egret.Event.COMPLETE,()=>{
                    var str = loader.data.replace(/\r\n/g,'')
                    var arr = JSON.parse(str);
                    self.resetPath_7967(arr)

	wx3_function(2480);
                },this);
                loader.load(new egret.URLRequest(url));
            },
            fail: err => {
                console.log(err)
            }
        })
    }
	private wx3_functionX_57300(){console.log(9011)}

    //把非自己的去掉
    private resetAdList_2610(){
        var myObj = {};
        for(var i=0;i<this.adList.length;i++)
        {
            if(this.adList[i].isSelf)
            {
                myObj[this.adList[i].appid] = true;
	wx3_function(730);
            }
        }
        for(var i=0;i<this.adList.length;i++)
        {
            if(!this.adList[i].isSelf &&  myObj[this.adList[i].appid])
            {
                this.adList.splice(i,1);
	wx3_function(8696);
                i--;
            }
        }
    }

    //重置路径
    private resetPath_7967(arr){

        for(var i=0;i<arr.length;i++)
        {
            var oo = arr[i];
	wx3_function(4039);
            if(oo.appid == Config.myAppID)
            {
                arr.splice(i,1);
                i--;
                continue;
            }
            this.resetOne_9106(oo);
	wx3_function(4984);
        }
    }

    private resetOne_9106(oo){
        var wx = window['wx'];
        var self = this;
	wx3_function(178);
        oo.isSelf = true;
        oo.step = 2;
        wx.cloud.downloadFile({
            fileID: this.cloudPath + oo.logo,
            success: res => {
                oo.logo =  res.tempFilePath;
	wx3_function(9838);
                self.pushADData_7865(oo);
            }
        })

        wx.cloud.downloadFile({
            fileID: this.cloudPath + oo.img,
            success: res => {
                oo.img =  res.tempFilePath;
	wx3_function(4556);
                self.pushADData_7865(oo);
            }
        })
    }

    private pushADData_7865(oo){
        oo.step --;
	wx3_function(2639);
        if(!oo.step)
        {
            this.adList.push(oo)
            this.resetAdList_2610();
        }
    }
	private wx3_functionX_57301(){console.log(9506)}

    public showAD(data){
        var wx = window['wx'];

        if(!wx)
        {
            console.log('click AD')

            return;
        }

	wx3_function(7721);
        var self = this;
        wx.previewImage({
            urls: [data.img],
            success: function () {
                self.changeUserFun = data.fun;
                self.changeUserTime = TM_wx3.now();
	wx3_function(8586);
                self.changeUserID = data.appid;
            }
        })
    }

    public getListByNum(num,fun?){
        if(!this.adList)
            return [];
        var arr = SharedObjectManager_wx3.getInstance().getMyValue('exchangeUserAppid')|| [];
	wx3_function(4533);
        for(var i=0;i<this.adList.length;i++)
        {
            this.adList[i].temp = arr.indexOf(this.adList[i].appid)

            if(this.adList[i].isSelf)
                this.adList[i].temp2 = 1
            else if(this.adList[i].isXiaoHu)
                this.adList[i].temp2 = 2
            else
                this.adList[i].temp2 = 3
            this.adList[i].fun = fun;
	wx3_function(4972);
        }
        ArrayUtil.sortByField(this.adList,['temp','temp2'],[0,0]);
        return this.adList.slice(0,num);
    }


    ////////////////////////////////banner///////////////////
    public bannerAD
    public bannerBG
    public insertAD
    public callADBottom
    public createAD(){
        //Config.adHeight = 200;
        if(!window['wx'])
            return;
        if(!Config.wx_ad)
            return;
        if(GameManager_wx3.stage.stageHeight < 1080)
            return;
        var wx = window['wx']

        if(!wx.createBannerAd)
            return;


        var btnw = Math.min(Math.pow(GameManager_wx3.stage.stageHeight/1330,1.6)*640,640)

        let scalex = screen.availWidth/640;
        let scaley = screen.availHeight/GameManager_wx3.stage.stageHeight;
        if(btnw * scalex < 300){ //微信限制广告宽度不能小于300
            btnw = 300 / scalex;
        }
        var  btny = GameManager_wx3.uiHeight;//给广告留的高度

        if(Config.isZJ){//字节广告限制了宽度为 128-208
            if(btnw * scalex > 208) btnw = 208 / scalex;
            else if(btnw * scalex < 128) btnw = 128 / scalex;
            //btny = GameManager_wx4.uiHeight - Math.min(btnw * 9/16, 224);//给广告留的高度(因为界面留空是按微信224留的空，不是取的实际广告高度，故这里要取最大224避免广告遮住上方的内容)
        }

        Config.adHeight =  btnw/640 * 224;

        var  paddingTop = GameManager_wx3.paddingTop();
        var btnx =  (640-btnw)/2;

        let left = scalex * (btnx);
        let top = scaley * (btny + paddingTop);
        let width = scalex * btnw;

        let bannerAd = this.bannerAD = wx.createBannerAd({
            adUnitId: Config.wx_ad,
            style: {
                left: left,
                top: top,
                width: width
            }
        })
        bannerAd.onError(()=>{
            Config.adHeight = 0
            GameManager_wx3.stage.dispatchEventWith(egret.Event.RESIZE);
        })
        bannerAd.onLoad(()=>{
            if(this.isCallADHide)
            {
                bannerAd.hide();
                this.isCallADHide = false;
            }
        })
        bannerAd.onResize((res)=>{
            var btnw = res.width/scalex;
            var btnx =  (640-btnw)/2;
            bannerAd.style.left = scalex * (btnx);


            var hh = res.height/scalex*(640/btnw);
            //if(Math.abs(hh - 224)/224 > 0.02)
            //{
            Config.adHeight =  btnw/640 * hh;
            console.log(res,btnw,Config.adHeight )
            GameManager_wx3.stage.dispatchEventWith(egret.Event.RESIZE);
            //bannerAd.style.top = scaley * (GameManager_wx4.uiHeight + paddingTop);

            this.bannerAD.style.top = scaley * (GameManager_wx3.uiHeight + paddingTop - (this.callADBottom || 0) - GameManager_wx3.paddingBottom() - Config.adHeight);
            //}

            if(this.isCallADHide)
            {
                bannerAd.hide();
                this.isCallADHide = false;
            }
            //

            //console.log(res,scalex,scaley,GameManager.stage.stageHeight)
        })
        this.isCallADHide = true;
        bannerAd.show()



        if (wx.createInterstitialAd && Config.wx_insert){
            this.insertAD = wx.createInterstitialAd({
                adUnitId: Config.wx_insert
            })
        }
    }
    //显示插屏广告
    public showInsert(){
        if(!this.insertAD)
            return;

        this.insertAD.show().catch((err) => {
            console.error(err)
        })
    }


    public showBanner(bottom){
        if(this.bannerAD)
        {
            this.isCallADHide = false;
            if(!this.bannerBG)
            {
                this.bannerBG = new eui.Image('blace_bg_jpg')
                this.bannerBG.width = 640;
                this.bannerBG.height = Config.adHeight;
            }
            GameManager_wx3.container.addChild(this.bannerBG)
            this.bannerBG.bottom = bottom;
            this.bannerAD.show()
            var scaley = screen.availHeight/GameManager_wx3.stage.stageHeight;
            var  paddingTop = GameManager_wx3.paddingTop();
            this.bannerAD.style.top = scaley * (GameManager_wx3.uiHeight + paddingTop - bottom - GameManager_wx3.paddingBottom() - Config.adHeight);
            this.callADBottom = bottom
        }
    }


    public hideBanner(){
        if(this.bannerAD)
            this.bannerAD.hide();
	wx3_function(9443);
        MyTool.removeMC(this.bannerBG)
    }


    public initExtra(data){
        this.extraData = null;
	wx3_function(5953);
        if(!data || !data.referrerInfo || !data.referrerInfo.extraData || !data.referrerInfo.extraData.appid)
        {
            return;
        }
        if(this.finishExtraUin != data.referrerInfo.extraData.uin)
            this.extraData = data.referrerInfo.extraData
    }
	private wx3_functionX_57303(){console.log(5087)}

    //前往WX5
    public openWX5(data){
        var wx = window['wx'];
        data.appid = 'wxe066524f2972cb1a'//我的APPID
        data.uin = Math.floor(Math.random()*1000000000000000);//唯一Key
        if(!wx || DebugUI.getInstance().debugOpen)
        {
            this.extraData = data
            this.testWX5Back()
            return;
        }

        wx.navigateToMiniProgram({
            appId: 'wxe2875716299fa092',//别点小广告
            envVersion:'trial',
            extraData:data,
            complete(res) {
                var SM = SpaceManager.getInstance();
	wx3_function(1004);
                if(!SM.isDelete)
                {
                    SM.isDelete = true;
                    if(SM.adLevel > 0)
                        SM.adLevel --
                }
            }
        })
    }
	private wx3_functionX_57304(){console.log(9153)}

    //WX5回调
    public testWX5Back(){
        if(!this.extraData)
            return
        this.finishExtraUin = this.extraData.uin;
        switch(this.extraData.callBack)
        {
            case 'openSpace':
                if(SpaceUI.getInstance().stage)
                    SpaceUI.getInstance().hide();
	wx3_function(8577);
                SpaceManager.getInstance().adLevel += 2;
                SpaceManager.getInstance().isDelete = false;
                SpaceManager.getInstance().randomSpace();
                SpaceInfoUI.getInstance().show();
                break;
        }
    }
}