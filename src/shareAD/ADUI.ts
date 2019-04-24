
//界面显示 Banner广告
class DebugWXGameAD {

    private con:eui.Rect = new eui.Rect();

	private wx3_functionX_12161(){console.log(221)}
    public createBannerAd(btnx,btny,btnw){
        this.con.x = btnx;
        this.con.y = btny;
        this.con.width = btnw;
        this.con.height = btnw * 0.35;
    }
	private wx3_functionX_12162(){console.log(3823)}

    public hide(){
        MyTool.removeMC(this.con);
    }

    public show():void{
        GameManager_wx3.stage.addChild(this.con);
	wx3_function(9931);
	}

    public destroy(){
        this.hide();
    }

	private wx3_functionX_12163(){console.log(3512)}
    public offLoad(){}
    public offError(){}

    public setY(btny:number){
        this.con.y = btny;
        //WXAddCode.execute();
    }
	private wx3_functionX_12164(){console.log(1362)}

}

//界面显示 Banner广告
class ADUI {

    private static adids = {
                    // 1:"adunit-1ea5e028c0953495", //"其他"
                    // 4:"adunit-02a48e435f3739fb",//"任务界面"
                    // 5:"adunit-9651e554bc7c5941",//"设置界面"
                    // 6:"adunit-e4180f0c0e87bf55",//"商店界面"
                    // 7:"adunit-147b5a961ae6325c",//排行榜界面
                    // 8:"adunit-608b7a67aa1e5869",//离线界面
                    // 9:"adunit-d88047b52446f4cb",//"等级礼包界面"
                    // 10:"",//"雇佣好友"
                };
	private wx3_functionX_12165(){console.log(7261)}
    public static getADID(adindex):string{
        return this.adids[adindex];
    }

    public static wx_banner_openids
    public static wx_bannerCode
	private wx3_functionX_12166(){console.log(7735)}
    public static wx_refushAD_time

    private parentUI:any;//广告父界面，不一定是this.parent 而是包广告对象的 BaseUI界面，用于判断当其他界面显示隐藏时影响 当前广告的显示状态
    private style:any;
    private adid:string;
    private initTime:number;
	private wx3_functionX_12167(){console.log(328)}
    private adindex:number;

    private static bannerAd:any;
    private bannerAdBg:DebugWXGameAD;
    private autoChange:boolean;
    //private changeTimer:number;

	private wx3_functionX_12168(){console.log(487)}
    private isUI:boolean;

    public static get isEnabled(){
        if(DEBUG)
            return _get["showAD"];

        if(!window["wx"] || !window["wx"].createBannerAd){
            DEBUG && console.log("当前版本不支持广告");
            return false;
        }
        return true; 
    }
	private wx3_functionX_12169(){console.log(1242)}

    public get isEnabled(){
        if(!ADUI.isEnabled) return false;
        try{
            let list = ADUI.wx_banner_openids;
            if(list && this.adindex){
                return list.indexOf(this.adindex) >= 0;
            }
        }catch(e){
        }
        return true; 
    }
	private wx3_functionX_12170(){console.log(4957)}

    private get availWidth(){
        return screen.availWidth;
    }
    private get availHeight(){
        return screen.availHeight;
    }
	private wx3_functionX_12171(){console.log(5541)}

    public getDefault(adindex:number, btnw:number = 540):any{
        this.adindex = adindex;
        var adid = this.adid = ADUI.adids[adindex] || ADUI.wx_bannerCode;
        let scalex = this.availWidth/640;
        if(btnw * scalex < 300){ //微信限制广告宽度不能小于300
            btnw = 300 / scalex;
	wx3_function(8306);
        }
        let btny = GameManager_wx3.uiHeight - (btnw/640 * 224);//给广告留的高度
        return {id:adid, btnw:btnw, btnx:(640-btnw)/2, btny:btny};
    }

    public addBannerBg(){
        this.bannerAdBg = new DebugWXGameAD();
	wx3_function(392);
    }

    public initSameAD(adindex:number, parentUI:any, btny?:number){
        this.adindex = adindex;
        this.parentUI = parentUI;

        //弹窗界面，广告位于弹窗下方
        if(ADUI.bannerAd && btny != undefined){
            if(DEBUG){
                ADUI.bannerAd.setY(btny);
	wx3_function(4782);
                return;
            }
            let scaley = screen.availHeight/GameManager_wx3.stage.stageHeight;
            ADUI.bannerAd.style.top = scaley * btny;
        }
    }
	private wx3_functionX_12172(){console.log(5707)}

    //初始广告id、坐标位置 （特别注意 btny 需要兼容 普通手机和 iphoneX手机）
    public init(parentUI:any, arg:{id:string, btnw:number, btnx:number, btny:number, autoChange?:boolean, isUI?:boolean}){

        if(!this.isEnabled) return;

        this.parentUI = parentUI;
	wx3_function(675);

        //这里存在界面坐标、尺寸换算关系 width="180" height="60" bottom="40" x="230"
        // let btnw = 640, btnh = 60, btnx = 0, btny = 276;
        let btnw = arg.btnw, btnx = arg.btnx, btny = arg.btny;
        let scalex = this.availWidth/640;
        let scaley = this.availHeight/GameManager_wx3.stage.stageHeight;
        let left = scalex * (btnx);
        let top = scaley * (btny);// + (AppQU.isIphoneX ? 52 : 0));
	wx3_function(2078);
        let width = scalex * btnw;
        // let height = scalex * btnh;

        this.style = {
                    left: Math.floor(left),
                    top: Math.floor(top),
                    width: Math.floor(width)
                }
        if(!ADUI.bannerAd){
            this.createAD_7314(arg.id, left, top, width);
	wx3_function(8312);
        }
        this.autoChange = arg.autoChange;
        this.isUI = arg.isUI;
    }
    
    private startChange_8495(){
        //if(this.autoChange){ //是否在当前页面开启定时自动刷新的机制
        //    egret.clearTimeout(this.changeTimer);
        //    this.changeTimer = egret.setTimeout(()=>{
        //        EventManagerQU.removeEvent(ServerQueenEvent.Client.SHOWWINDOW,this.checkShow_2724,this);
        //        EventManagerQU.removeEvent(ServerQueenEvent.Client.HIDEWINDOW,this.checkHide_5673,this);
        //        this.show(true);
        //    }, this, (ConfigQU.appData && ConfigQU.appData.wx_refushAD_time || 30) * 1000);
        //}
        //WXAddCode.execute();
    }
	private wx3_functionX_12173(){console.log(8456)}

    public hide(){
        //EventManagerQU.removeEvent(ServerQueenEvent.Client.SHOWWINDOW,this.checkShow_2724,this);
        //EventManagerQU.removeEvent(ServerQueenEvent.Client.HIDEWINDOW,this.checkHide_5673,this);
        //egret.clearTimeout(this.changeTimer);

        // console.log("隐藏广告");
        if(!ADUI.bannerAd) return;

        this.bannerAdBg && this.bannerAdBg.hide();
	wx3_function(5692);
        if(ADUI.bannerAd.now != this.parentUI) return;
        try{
            ADUI.bannerAd.hide();
        }catch(e){
            console.log("error:",e);
        }
    }
	private wx3_functionX_12174(){console.log(9469)}

    private createAD_7314(id, left, top, width){
        let scalex = this.availWidth/640;
        let scaley = this.availHeight/GameManager_wx3.stage.stageHeight;
        if(DEBUG){
            ADUI.bannerAd = new DebugWXGameAD();
	wx3_function(2858);
            ADUI.bannerAd.createBannerAd(left/scalex, top/scaley, width/scalex);
            return;
        }
        if(this.bannerAdBg){
            this.bannerAdBg.createBannerAd(left/scalex, top/scaley, width/scalex);
        }
        ADUI.bannerAd = window["wx"].createBannerAd({
            adUnitId: id,
                style: {
                    left: Math.floor(left),
                    top: Math.floor(top),
                    width: Math.ceil(width)
                }
            })
        this.initTime = Date.now();
	wx3_function(1410);
    }

	public show(refush:boolean=false):void{
        if(!this.isEnabled) return;

        //EventManagerQU.addEvent(ServerQueenEvent.Client.SHOWWINDOW,this.checkShow_2724,this);
        //EventManagerQU.addEvent(ServerQueenEvent.Client.HIDEWINDOW,this.checkHide_5673,this);

        if(refush || (this.initTime && Date.now() - this.initTime > (ADUI.wx_refushAD_time || 30) * 1000)){
            this.destroy();
	wx3_function(5406);
            this.createAD_7314(this.adid, this.style.left, this.style.top, this.style.width);
        }

        // console.log("显示广告");
        if(!ADUI.bannerAd) return;

        ADUI.bannerAd.show();
	wx3_function(3990);
        this.bannerAdBg && this.bannerAdBg.show();
        this.startChange_8495();

        ADUI.bannerAd.now = this.parentUI;
        if(this.isUI){
            if(DEBUG){
                let scaley = screen.availHeight/GameManager_wx3.stage.stageHeight;
	wx3_function(3753);
            this.bannerAdBg && this.bannerAdBg.setY(this.style.top/scaley);
                ADUI.bannerAd.setY(this.style.top/scaley);
                return;
            }
            ADUI.bannerAd.style.top = this.style.top;
        }
	}
	private wx3_functionX_12175(){console.log(6124)}

    public destroy(){
        // console.log("销毁广告");
        if(!ADUI.bannerAd) return;
        try{//会报没有destroy方法，故加try catch
            ADUI.bannerAd.destroy();
        }catch(e){
            console.log("error2:",e);
            //WXAddCode.execute();
        }
        ADUI.bannerAd = null;
	wx3_function(7585);
        this.bannerAdBg && this.bannerAdBg.destroy();
    }

	private checkShow_2724(e:egret.Event):void{
        let current = e.data;
        if(current === true || current != this.parentUI){
            // console.log("临时隐藏广告");
            //egret.clearTimeout(this.changeTimer);
            if(!ADUI.bannerAd) return;
            if(ADUI.bannerAd.now != this.parentUI) return;
            try{
            ADUI.bannerAd.hide();
	wx3_function(6110);
            }catch(e){}
            this.bannerAdBg && this.bannerAdBg.hide();
        }
	}

	private checkHide_5673(e:egret.Event):void{
        if(!this.parentUI) return;
        let parent = <egret.DisplayObjectContainer>this.parentUI.parent;
	wx3_function(2965);
        if(this.parentUI.stage && parent.getChildIndex(this.parentUI) == parent.numChildren - 1){
            // console.log("临时显示广告");
            if(!ADUI.bannerAd) return;
            ADUI.bannerAd.show();
            this.bannerAdBg && this.bannerAdBg.show();
            if(ADUI.bannerAd.now != this.parentUI){
                ADUI.bannerAd.now = this.parentUI;
	wx3_function(6396);
            }

            if(this.isUI){
                this.show();
            }
        }
	}
	private wx3_functionX_12176(){console.log(7191)}

}