
module game {

    /**
    *  界面基类
	private wx3_functionX_11789(){console.log(3898)}
    */
    export class BaseContainer extends eui.Component {
        
        
        public constructor(skinName?:string) {
            super();
	wx3_function(6386);
            
            if(skinName)
                this.skinName = skinName;
        }
                    
        public childrenCreated() {
        }
	private wx3_functionX_11790(){console.log(919)}
                    
        public partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
            instance.id = partName;

            //赋予btn图片按钮的行为
            if(instance instanceof eui.Image) {
                if(partName.toLowerCase().indexOf("btn") > -1) {
                }else{
                    instance.touchEnabled = false;
	wx3_function(6054);
                }
            }
            else if(instance instanceof eui.Label){ //label不可交互
                instance.touchEnabled = false;
            }
        }
        //
        //public getImg(name:string):eui.Image{
        //    return <eui.Image>this[name];
        //}
        //
        //public getLabel(name: string): eui.Label {
        //    return <eui.Label>this[name];
        //}
        //
        //public getText(name: string): egret.TextField {
        //    return <egret.TextField>this[name];
        //}
        //
        //public getButton(name: string): eui.Button {
        //    return <eui.Button>this[name];
        //}
        //
        //public getItem(name: string): game.BaseItem {
        //    return <game.BaseItem>this[name];
        //}
	private wx3_functionX_11791(){console.log(9030)}

                
        /*
        * 设置html  
        * this.setHtml(this.txt,"<font color=0xff0000>五23424</font>");
        */ 
	private wx3_functionX_11792(){console.log(7296)}
        public setHtml(txt:eui.Label, str:string):void{
            txt.textFlow = new egret.HtmlTextParser().parser(str);
        }  
                
        /*
        * 给按钮添加事件  
	private wx3_functionX_11793(){console.log(3760)}
        * this.addBtnEvent(this.btn, this.btnClick);
        */ 
        public addBtnEvent(btn: egret.DisplayObject, fun:any, thisObject?:any):void{
            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,fun,thisObject || this);

	wx3_function(7405);
            var btnName = (btn['id'] || '').toLocaleLowerCase();
            if(btnName.indexOf('btn')!=-1 || btnName.indexOf('button')!=-1)
                SoundManager_wx3.getInstance().addBtnClickEffect(btn);
        }

        public createHtml(str:string | number, color?:number, size?:number):string{
            return MyTool.createHtml(str,color,size);
        }
	private wx3_functionX_11794(){console.log(2092)}

        /*
        * 给按钮移除事件  
        * this.removeBtnEvent(this.btn, this.btnClick);
        */ 
        public removeBtnEvent(btn: egret.DisplayObject, fun:any, thisObject?:any):void{
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, fun, thisObject || this);
	wx3_function(2552);
        }

        public clearList(list:eui.List | Array<eui.List>){
            var lists:any = list;
            if(list instanceof eui.List){
                lists = [list];
	wx3_function(6531);
            }
            for(var key in lists){
                try{
                    lists[key].dataProvider = null;
                    //必现调用下面2句，并且 需要在hide之前调用
                    lists[key].dataProviderRefreshed();
                }
                catch(e){
                }
            }
            this.validateNow();
	wx3_function(171);
        }
        
    }
    
    
    /**
    *  界面基类
    */
    export class BaseUI extends game.BaseContainer {
	private wx3_functionX_11795(){console.log(1196)}
        
        public LoadFiles: Array<string>;//加载文件配置['party', 'js_xxxxx'];
        private isStartLoad: boolean = false;
        
        private static UIshowList: any = {};
        public BaseTypeList: Array<number> = [];//页面模块配置，主要用来控制全局调用
	private wx3_functionX_11796(){console.log(9252)}
        public isInitUI: boolean = true;//是否已经初始化完皮肤
        
        private _arguments: Array<any>;
        private sizeList: Array<any> = [];

        public isWindow: boolean = false;
	private wx3_functionX_11797(){console.log(4558)}
        public noMV: boolean = false;
        public isHideFlag:boolean = true;
        public canBGClose:boolean = false;


        public loadData = null;
	private wx3_functionX_11798(){console.log(4656)}
        public loadUI = null;

        public hideBehind = true;

        public showFinishFunList = []; //显示成功后回调的方法

	private wx3_functionX_11799(){console.log(5647)}
        private panelEvents: any = {};

        public constructor(isWindow?:boolean) {
            super();
            this.isWindow = isWindow;
            if(!this.isWindow)
                GameManager_wx3.stage.addEventListener(egret.Event.RESIZE,this.onResize,this);
	wx3_function(5830);
        }
                    
                    
        public childrenCreated() {
            this.isInitUI = true;
            
            if(!this.isWindow)
                this.onResize(null);
	wx3_function(1196);
            
//            if(this.parent){
//                this.addEventListener(egret.Event.ENTER_FRAME,this.createComplete_1611,this);
//            }
        }
        private createComplete_1611(e:egret.Event){
            this.removeEventListener(egret.Event.ENTER_FRAME,this.createComplete_1611,this);
            if(this._arguments)
                this.onShow.apply(this,this._arguments);
            else
                this.onShow();
	wx3_function(950);

            this.runShowFinish_8540();
        }

        private runShowFinish_8540(){
            while(this.showFinishFunList.length > 0)
            {
                this.showFinishFunList.shift()();
	wx3_function(7105);
            }
        }

        public addShowFinishFun(fun){
            this.showFinishFunList.push(fun);
        }
	private wx3_functionX_11800(){console.log(6369)}
                    
        public partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
        }
                    
        /*public show(){
        eui.PopUpManager.addPopUp(this,true);
	wx3_function(2619);
        this.verticalCenter = -700;
        egret.Tween.get(this).to({verticalCenter:0} , 500 , egret.Ease.backOut);
                            
        }*/

        public addPanelOpenEvent(type:string, callBack:Function){
            this.panelEvents[type] = callBack;
	wx3_function(1142);
            EM_wx3.addEvent(type, callBack, this);
        }
            
        public addListenerSizeY(list:Array<any>):void{
            while(list.length > 0){
                this.sizeList.push({ui:list.pop(), type:"y"});
	wx3_function(3980);
            }
        }
        public addListenerSizeH(list:Array<any>):void{
            while(list.length > 0){
                this.sizeList.push({ui:list.pop(), type:"h"});
            }
        }
	private wx3_functionX_11801(){console.log(5394)}

        public resizeFun(){

        }
        public onVisibleChange(){

        }
	private wx3_functionX_11802(){console.log(9334)}

        public onResize(e:Event):void{
//            console.log(GameManager.stage.stageWidth, GameManager.stage.stageHeight)
//            console.log(GameManager.stage.width, GameManager.stage.height)
            this.height = GameManager_wx3.uiHeight;
            var item: any;
            for(var i = 0;i < this.sizeList.length; i++){
                /*
                item = this.sizeList[i];
	wx3_function(696);
                if(item.type == "h"){
                    item.ui.height = GameManager.stage.stageHeight - item.ui.y;
                }
                else if(item.type == "y"){
                    item.ui.y = GameManager.stage.stageHeight - item.ui.height;
                }*/
            }

	wx3_function(9137);
            this.scrollRect = new egret.Rectangle(0,0, GameManager_wx3.uiWidth, GameManager_wx3.uiHeight);
            if(GameManager_wx3.isLiuHai())
                this.y = 50
            else
                this.y = 0;
            //this.y = (GameManager.stage.stageHeight - GameManager.uiHeight)/2

            if(this.parent)
                this.resizeFun();
	wx3_function(1685);
        }
            
        public cacheFunArguments(...argument:any[]):void{
            this._arguments = argument;
        }
                            
	private wx3_functionX_11803(){console.log(2835)}
        public onShow(...argument:any[]):any{
            return this;      
        }
                        
                        		
        public show():any{

            if(this.LoadFiles && this.LoadFiles.length > 0){
                if(this.isStartLoad) return;
                this.isStartLoad = true;
	wx3_function(5275);
                LoadingFile.getInstance().loadGroup(this.LoadFiles, this.showFun_5885, this,this.loadUI,this.loadData);
                this.LoadFiles = [];
                return;
            }
            this.showFun_5885();
            
            return this;
        }
	private wx3_functionX_11804(){console.log(4468)}

        //public showToTop(){
        //    if(this.stage)
        //        PopUpManager.addPopUp(this,this.isWindow);
        //}

        
        private showFun_5885():void{
            this.isStartLoad = false;
            
            if(this.BaseTypeList){
                for(var i=0; i<this.BaseTypeList.length; i++){
                    var _type = this.BaseTypeList[i];
	wx3_function(8724);
                    if( !BaseUI.UIshowList[ _type ]){
                        BaseUI.UIshowList[ _type ] = [];
                    }
                    if(BaseUI.UIshowList[ _type ].indexOf(this) == -1)
                        BaseUI.UIshowList[ _type ].push(this);
                }
            }
            //1102
//            this.invalidateSkinState();
//            eui.PopUpManager.addPopUp(this,true);
	wx3_function(9977);
            PopUpManager.addPopUp(this,this.isWindow,this.noMV);
            
            if(this.isInitUI){
                this.isHideFlag = false
                if(this._arguments)
                    this.onShow.apply(this,this._arguments);
                else
                    this.onShow();
	wx3_function(7791);

                this.runShowFinish_8540();
            }
            BaseUI.setStopEevent();
        }

	private wx3_functionX_11805(){console.log(6702)}
        public isHide():boolean{
            return this.isHideFlag
        }
                    
        public hide():any{
            this.beforeHide();
	wx3_function(5766);

            for(var key in this.panelEvents){
                EM_wx3.removeEvent(key, this.panelEvents[key], this);
            }

            if(this.BaseTypeList){
                for(var i=0; i<this.BaseTypeList.length; i++){
                    var _type = this.BaseTypeList[i];
	wx3_function(3361);
                    var list = BaseUI.UIshowList[ _type ];
                    if( list ){
                        for(var j=list.length - 1; j>=0; j--){
                            if(list[j] == self)
                                list.splice(j, 1);
                        }
                    }
                }
            }

	wx3_function(9670);
            this.isHideFlag = true;
            //1102
//            eui.PopUpManager.removePopUp(this);
//            this.validateSkinState();
            PopUpManager.removePopUp(this);

            TaskManager.getInstance().guideTaskVO = null
            return this;
        }
	private wx3_functionX_11806(){console.log(9136)}
        
        private onAddToStage_4177(event:egret.Event) {
            console.log(222);
        }
        
        // 批量关闭UI， 用法：this.BaseTypeList = [1, 2];
        // 1xxxx 2xxxx
        public static hideType = function(type){
            var list = BaseUI.UIshowList[type];
            if(list){
                for(var i=list.length-1; i>=0; i--){
                    list[i].hide();
                }
            }
        }
	private wx3_functionX_11807(){console.log(1045)}
        
        //用来记录和判断一个界面打开后 禁止马上响应交互事件（最常见的是触摸屏幕关闭界面）
        private static openTime: number;
        public static get isStopEevent():boolean{
            return (Date.now() - BaseUI.openTime < 400); //面板打开后500秒内不响应交互事件（触摸、单击） 
        }
        
	private wx3_functionX_11808(){console.log(7854)}
        public static setStopEevent() {
            BaseUI.openTime = Date.now();
        }
        
        public paySound(key:string, delay?:number):void{
            
        }
	private wx3_functionX_11809(){console.log(970)}



        public beforeHide(){

        }
	private wx3_functionX_11810(){console.log(2686)}
                
    }
    
    /**
    *  界面基类
    */
    export class BaseWindow extends game.BaseUI {
	private wx3_functionX_11811(){console.log(8284)}

        public constructor() {
            super(true);
            this.canBGClose = true;
        }

	private wx3_functionX_11812(){console.log(9035)}
        public setTitle(title,h?){
            var bg:any = this.getChildAt(0)
            bg.setTitle(title);
            if(h)
                bg.setBottomHeight(h);
        }
	private wx3_functionX_11813(){console.log(7169)}
    }
    
    export class BaseItem extends eui.ItemRenderer {
        public constructor() {
            super();

        }
	private wx3_functionX_11814(){console.log(8891)}

        public partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
            instance.id = partName;

            //赋予btn图片按钮的行为
            if(instance instanceof eui.Image) {
                if(partName.toLowerCase().indexOf("btn") > -1) {
                }else{
                    instance.touchEnabled = false;
	wx3_function(6369);
                }
            }
            else if(instance instanceof eui.Label){ //label不可交互
                instance.touchEnabled = false;
            }
        }
	private wx3_functionX_11815(){console.log(4811)}
        
        /*
        * 设置html  
        * this.setHtml(this.txt,"<font color=0xff0000>五23424</font>");
        */ 
        public setHtml(txt:eui.Label, str:string):void{
            txt.textFlow = new egret.HtmlTextParser().parser(str);
	wx3_function(9780);
        }
                        
        /*
        * 给按钮添加事件
        * this.addBtnEvent(this.btn, this.btnClick);
        */
	private wx3_functionX_11816(){console.log(9320)}
        public addBtnEvent(btn:eui.UIComponent, fun:any,stopSound?):void{
            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this);

            if(!stopSound)
            {
                var btnName = (btn['id'] || '').toLocaleLowerCase();
	wx3_function(145);
                if(btnName.indexOf('btn')!=-1 || btnName.indexOf('button')!=-1)
                    SoundManager_wx3.getInstance().addBtnClickEffect(btn);
            }

        }

	private wx3_functionX_11817(){console.log(8273)}
        public createHtml(str:string | number, color?:number, size?:number):string{
            return MyTool.createHtml(str,color,size);
        }
        /*
        * 给按钮移除事件
        * this.removeBtnEvent(this.btn, this.btnClick);
	private wx3_functionX_11818(){console.log(4047)}
        */
        public removeBtnEvent(btn:eui.UIComponent, fun:any, thisObject?:any):void{
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, fun, thisObject || this);
        }
                
    }

}
