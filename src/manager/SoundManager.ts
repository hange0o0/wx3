/**
 *
 * @author 
 *
 */
class SoundManager_wx3 {
	private wx3_functionX_12009(){console.log(3773)}
    private static instance: SoundManager_wx3;

    public constructor() {
        this.init_3390();
    }

	private wx3_functionX_12010(){console.log(3503)}
    public static getInstance(): SoundManager_wx3 {
        if(!this.instance)
            this.instance = new SoundManager_wx3();
        return this.instance;
    }
    //默认关闭音乐
    private _soundPlaying: boolean = false;
	private wx3_functionX_12011(){console.log(2042)}
    private _bgPlaying: boolean = false;
    private _openShake: boolean = true;
    private _isPlayMovie: boolean = true;
    private _isMessage: boolean = true;

    private currentChannel:egret.SoundChannel;
	private wx3_functionX_12012(){console.log(5154)}
    private currentKey :string;
    private bgKey :string;
    private lastBGKey :string;
    private isLoad:boolean=false;

    private bgTimer;
	private wx3_functionX_12013(){console.log(2974)}
    public pkKey = [];
    public effectKey = [];
    // private tween:egret.Tween
    
    private init_3390(){
        //if(!App.isMobile){//pc上默认开音乐
        //    this._soundPlaying = true;
        //    this._bgPlaying = true;
        //}
        //
        //if(Config.isDebug)
        //{
            this._soundPlaying = true;
            this._bgPlaying = true;
        //}
	wx3_function(3503);

        var som = SharedObjectManager_wx3.getInstance();
        if(som.getValue("sound") != undefined)
            this._soundPlaying = som.getValue("sound");
        if(som.getValue("bgsound") != undefined)
            this._bgPlaying = som.getValue("bgsound");
	wx3_function(4385);

        if(som.getValue("openShake") != undefined)
            this._openShake = som.getValue("openShake");
        if(som.getValue("playMovie") != undefined)
            this._isPlayMovie = som.getValue("playMovie");
        if(som.getValue("showMessage") != undefined)
            this._isMessage = som.getValue("showMessage");
	wx3_function(4444);

        this.isLoad=this._soundPlaying;
    }

    public get soundPlaying(){
        // if(!Config.isDebug && !Config.testSound) return false;
        return this._soundPlaying
    }
	private wx3_functionX_12014(){console.log(2524)}
    public get bgPlaying(){
        // if(!Config.isDebug && !Config.testSound) return false;
        return this._bgPlaying
    }
    public get openShake(){
        return this._openShake
    }
	private wx3_functionX_12015(){console.log(4440)}
    public get isPlayMovie(){
        return this._isPlayMovie
    }
    public get isMessage(){
        return this._isMessage
    }
	private wx3_functionX_12016(){console.log(1342)}

    public set soundPlaying(v){
        if(this._soundPlaying!=v)
            SharedObjectManager_wx3.getInstance().setValue("sound",v)
        this._soundPlaying = v;
        //this.loadEffectSound();
    }
	private wx3_functionX_12017(){console.log(217)}
    public set bgPlaying(v){
        if(this._bgPlaying!=v){
            SharedObjectManager_wx3.getInstance().setValue("bgsound",v);
        }
        this._bgPlaying= v;

        if(!v ){
            this.stopBgSound();
        }
        else{
            if(MainPKUI_wx3.getInstance().stage && MainPKUI_wx3.getInstance().visible && !PKData_wx3.getInstance().isGameOver)
                this.playSound('pkbg');
            else
                this.playSound('bg');
        }
    }
	private wx3_functionX_12018(){console.log(6422)}
    public set openShake(v){
        if(this._openShake!=v)
            SharedObjectManager_wx3.getInstance().setValue("openShake",v)
        this._openShake= v;
    }
    public set isPlayMovie(v){
        if(this._isPlayMovie!=v)
            SharedObjectManager_wx3.getInstance().setValue("playMovie",v)
        this._isPlayMovie= v;
    }
	private wx3_functionX_12019(){console.log(8484)}
    public set isMessage(v){
        if(this._isMessage!=v)
            SharedObjectManager_wx3.getInstance().setValue("showMessage",v)
        this._isMessage= v;
    }

	private wx3_functionX_12020(){console.log(5345)}
    public addBtnClickEffect(btn:egret.DisplayObject){
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            this.playBtn();
        },this)
    }

	private wx3_functionX_12021(){console.log(2436)}
    public playBtn(){
        this.playEffect('btn');
    }

    public stopBgSound(){
        this.lastBGKey = this.bgKey;
	wx3_function(2922);
        this.bgKey = null;
        try{
            // if(this.tween){
            //     this.tween.pause();
            //     this.tween = null;
            // }

            egret.clearTimeout(this.playTime);
            if(this.currentChannel){
                egret.Tween.removeTweens(this.currentChannel);
	wx3_function(280);
                this.currentChannel.stop();
            }
            this.onSoundComplete_3104();
        }catch(e){}
    }

	private wx3_functionX_12022(){console.log(1556)}
    public playEffect(v:string, fun?,thisObj?){
        if(GuideManager.getInstance().isGuiding)
            return;
        if(!this.soundPlaying) return;
        //console.log('call:',v)
        var url = "resource/sound/" + v +".mp3"
        var loader: egret.URLLoader = new egret.URLLoader();
	wx3_function(7037);
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        loader.once(egret.Event.COMPLETE,()=>{
            var sound: egret.Sound = <egret.Sound>loader.data;
            var channel = sound.play(0,1);
            //console.log(v)
            if(fun)
                channel.once(egret.Event.SOUND_COMPLETE,fun,thisObj)
        },this);
	wx3_function(1805);
        loader.load(new egret.URLRequest(url));
    }

    public resumeSound(){
        if(this.lastBGKey)
            this.playSound(this.lastBGKey);
	wx3_function(4065);
    }

    private tempLoop:number;
    public playSound(key:string, loop:number = 9999){

        if(GuideManager.getInstance().isGuiding)
            return;
        //console.log(key)
        if(!this.bgPlaying) return;
        if(this.bgKey == key) return;

	wx3_function(5545);
        this.bgKey = key;

        var url = "resource/sound/" + key +".mp3"
        if(this.currentKey == url) return;
        this.currentKey=url;


        
        try{

	wx3_function(3423);
            this.tempLoop = loop;
            /*if(this.currentChannel && this.currentKey == url){
                return;
            }

            this.currentKey=url*/

	wx3_function(33);
            var loader: egret.URLLoader = new egret.URLLoader();
            loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
            loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete_1005,this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onLoadError_8249,this);
            loader.load(new egret.URLRequest(url));
        }
        catch(e){
        }
    }
	private wx3_functionX_12023(){console.log(847)}

    /************************************************************************************************** */
    
    private playTime:number;
    private onLoadComplete_1005(event: egret.Event): void {
        egret.clearTimeout(this.playTime);
	wx3_function(6485);

        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        var self = this;
        try{
            this.onLoadError_8249(event);
            if((this.currentKey && loader.data.url != this.currentKey) || !this._bgPlaying)
                return;
            if(this.currentChannel){
                // if(self.tween){//正在开始播
                //     egret.Tween.removeTweens(self.currentChannel);
                //     self.currentChannel.stop();
                //     self.tween = null;
                // }
                // self.tween = egret.Tween.get(this.currentChannel).to({volume:0},500).call(()=>{
                //     try{
                //         self.tween = null;
                //         if(self.currentChannel)
	wx3_function(2992);
                            self.currentChannel.stop();
                            self.currentChannel=null;
                            //self.currentChannel.volume = 0.3 + Math.random()*0.7

                            if(!self._bgPlaying)return;
                            //this.playTime = setTimeout(()=>{
                            //
                            //}, 150);
                             fun();
                    // }
                    // catch(e){
                    // }
                // })
            }
            else
                fun();
	wx3_function(3478);
        }
        catch(e){
        }

        function fun(){
            var sound: egret.Sound = <egret.Sound>loader.data;
	wx3_function(7707);
            var channel: egret.SoundChannel = sound.play(0,self.tempLoop);
            // channel.volume =0;
            self.currentChannel = channel;
            //self.currentChannel.volume = 0.3 + Math.random()*0.7
            // self.tween = egret.Tween.get(channel).to({volume:1},500).call(
            //     ()=>{
            //         self.tween = null;
            //     }
            // )
            channel.addEventListener(egret.Event.SOUND_COMPLETE, self.onSoundComplete_3104, self);
        }

    }
	private wx3_functionX_12024(){console.log(8920)}

    private onSoundComplete_3104(event?:egret.Event):void {
        this.currentChannel = null;
        this.currentKey = null;

        //this.playTime = setTimeout(()=>{
        //    this.bgKey = null;
        //    this.playSound('road')
        //},Math.random()*3*1000)

    }
	private wx3_functionX_12025(){console.log(6317)}

    private onLoadError_8249(event: egret.Event): void {
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        loader.removeEventListener(egret.Event.COMPLETE,this.onLoadComplete_1005,this);
        loader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onLoadError_8249,this);
    }
	private wx3_functionX_12026(){console.log(5535)}
    
    //public fillData(d:Array<any>):void{
    //    if(d) {
    //        for(var i:number = 0;i < d.length;i++) {
    //            switch(d[i]["id"]) {
    //                case 1:
    //                    this.soundPlaying = d[i]["num"] == 1;
    //                    break;
    //                case 2:
    //                    this.bgPlaying = d[i]["num"] == 1;
    //                    break;
    //                case 3:
    //                    this.openShake = d[i]["num"] == 1;
    //                    break;
    //                case 4:
    //                    this.isPlayMovie = d[i]["num"] == 1;
    //                    break;
    //                case 5:
    //                    this.isMessage = d[i]["num"] == 1;
    //                    break;
    //            }
    //        }
    //    }
    //}
    /*public updateSetting(ids: Array<any>){
        var o:Array<any> =[];
        if(ids){
            for(var i = 0 ; i < ids.length;i++){
                switch(ids[i]){
                    case 1:
                        o.push({id:1,num:this.soundPlaying?1:0});
	wx3_function(7374);
                        break;
                    case 2:
                        o.push({id:2,num:this.bgPlaying?1:0});
                        break;
                    case 3:
                        o.push({id:3,num:this.openShake?1:0});
	wx3_function(8886);
                        break;
                    case 4:
                        o.push({id:4,num:this.isPlayMovie?1:0});
                        break;
                    case 5:
                        o.push({id:5,num:this.isMessage?1:0});
	wx3_function(6624);
                        break;
                }
            }
        }
        else{
            o.push({id:1,num:this.soundPlaying?1:0});
	wx3_function(9056);
            o.push({id:2,num:this.bgPlaying?1:0});
            o.push({id:3,num:this.openShake?1:0});
            o.push({id:4,num:this.isPlayMovie?1:0});
//            o.push({id:6,num:this.isLover?1:0});
            o.push({id:5,num:this.isMessage?1:0});
        }
        Net.instance.sendData(ServerEvent.sys.setting,{ data: o },null,false);
	wx3_function(6493);
    }*/
}
//
//class SoundConfig {
//    public static bg: string = "bg";
//    public static bg_pk: string = "bg_pk";
//    public static bg_pk_view: string = "bg_pk_view";
//    public static effect_buy: string = "effect_buy";
//    public static effect_button: string = "effect_button";
//    public static effect_join: string = "effect_join";
//    public static effect_m_up: string = "effect_m_up";
//    public static effect_u_up: string = "effect_u_up";
//    public static pk_win: string = "pk_win";
//    public static pk_loss: string = "pk_loss";
//    public static pk_effect1: string = "pk_effect1";
//    public static pk_effect2: string = "pk_effect2";
//    public static pk_effect3: string = "pk_effect3";
//    public static pk_effect4: string = "pk_effect4";
//    public static pk_effect5: string = "pk_effect5";
//    //public static pk_effect6: string = "pk_effect6";
//    public static pk_effect7: string = "pk_effect7";
//    public static pk_effect8: string = "pk_effect8";
//    //public static pk_effect9: string = "pk_effect9";
//    //public static pk_effect10: string = "pk_effect10";
//    //public static pk_effect11: string = "pk_effect11";
//    public static pk_effect12: string = "pk_effect12";
//    //public static pk_effect13: string = "pk_effect13";
//    public static pk_effect14: string = "pk_effect14";
//    public static pk_effect15: string = "pk_effect15";
//    public static pk_effect16: string = "pk_effect16";
//    public static pk_jump: string = "pk_jump";
//    public static pk_jump2: string = "pk_jump2";
//    public static pk_run: string = "pk_run";
//}
