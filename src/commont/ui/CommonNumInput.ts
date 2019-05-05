/**
 *
 * @author 
 * 事件用法：this.numCon.addEventListener(CommonNumInput.RENEW,this.renewCoin_6127,this);
 */
class CommonNumInput extends game.BaseItem_wx3{
	private wx3_functionX_12184(){console.log(9592)}
    public static RENEW:string = "renew";
	public constructor() {
    	super();
        this.skinName = "CommonNumInputSkin";
	}
	private reduceBtn: eui.Image;
	private wx3_functionX_12185(){console.log(2238)}
	private addBtn: eui.Image;
	private input: eui.EditableText;
    private _maxNum:number = 999;
    public minNum:number=1;
    public stepNum:number = 1;//点击一次增加的数值;

	private wx3_functionX_12186(){console.log(5754)}
    public addStr = ''

    public childrenCreated() {
        super.childrenCreated();
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onStart_1818,this);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_4353,this);
	wx3_function(5505);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEnd_4353,this)
        this.reduceBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEnd_4353,this)
        this.reduceBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onStart_1818,this);
        this.reduceBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_4353,this);
        this.input.addEventListener(egret.TextEvent.FOCUS_OUT,this.onOut_9127,this);
        this.input.addEventListener(egret.TextEvent.FOCUS_IN,this.onIn_7614,this);
	wx3_function(5334);
        this.input.addEventListener(egret.TextEvent.CHANGE,this.onChange_8201,this);
    }

    public set maxNum(v){
        this._maxNum = v;
        this.input.maxChars = String(v).length+1
    }
	private wx3_functionX_12187(){console.log(5026)}

    public get maxNum(){
        return this._maxNum;
    }

    private startTime:number
	private wx3_functionX_12188(){console.log(8869)}
    private timer:any;
    private addNum:number
    private _nowNum:number;
    private onStart_1818(e:egret.Event) {
        e.preventDefault();
        this.startTime = TM_wx3.now();
	wx3_function(5740);
        this.timer = egret.setInterval(this.onTimer_8669,this,500);
        this.addNum = (e.currentTarget == this.addBtn ? 1 : -1) * this.stepNum;
        MyTool.changeGray(this.addBtn,false,true);
        MyTool.changeGray(this.reduceBtn,false,true);
        this.onTimer_8669(true);
    }
	private wx3_functionX_12189(){console.log(6755)}

    private onTimer_8669(bool) {
        this._nowNum += this.addNum;
        if(this._nowNum >= this._maxNum) {
            this._nowNum = this._maxNum;
            this.addNum = 0;
	wx3_function(8465);
            MyTool.changeGray(this.addBtn,true,true);
        }
        else if(this._nowNum <= this.minNum ) {
            this._nowNum =this.minNum;
            this.addNum = 0;
            MyTool.changeGray(this.reduceBtn,true,true);
	wx3_function(6106);
        }
        //else if(this.minNum == 1 && this._nowNum < 0 ) {
        //    this._nowNum = this.addNum = 0;
        //}
        //else if(this.minNum>1 && this._nowNum <this.minNum)
        //{
        //    this._nowNum = this.minNum;
        //    this.addNum = 0;
        //}
        if(!bool && this.addNum != 0)
            this.timer = egret.setInterval(this.onTimer_8669,this,30);
        this.input.text = this._nowNum + this.addStr;
        this.renewCoin_6127();
    }
	private wx3_functionX_12190(){console.log(3981)}

    private onEnd_4353(e) {
        egret.clearInterval(this.timer);
    }
    private onIn_7614() {
        this.input.text = parseInt(this.input.text) + '';
	wx3_function(9216);
    }

    private onOut_9127() {
        var num = parseInt(this.input.text);
        this.input.text = num + this.addStr;
        //如果不是 stepNum 的整数倍 需要修正
        if(num%this.stepNum != 0){
            this.nowNum = Math.ceil(num/this.stepNum) * this.stepNum;
	wx3_function(6763);
        }
        MyTool.changeGray(this.addBtn,false,true);
        MyTool.changeGray(this.reduceBtn,false,true);
        if(num >= this._maxNum)
        {
            this.nowNum = this._maxNum;
	wx3_function(7765);
            MyTool.changeGray(this.addBtn,true,true);
        }
        else if(num <= this.minNum) {
            this.nowNum = this.minNum;
            MyTool.changeGray(this.reduceBtn,true,true);
        }
        else
        {
            this._nowNum = num;
	wx3_function(5925);
        }
        this.renewCoin_6127();
    }

    private onChange_8201(){
        if(this.input.text == "")
        {
            this._nowNum = 0;
	wx3_function(6641);
            this.renewCoin_6127();
            return;
        }
        var num = parseInt(this.input.text);
        //如果不是 stepNum 的整数倍 需要修正
        if(num%this.stepNum != 0){
            this.nowNum = Math.ceil(num/this.stepNum) * this.stepNum;
	wx3_function(6515);
        }
        if(num > this._maxNum)
        {
            this.nowNum = this._maxNum;
        }
        //else if(num < this.minNum) {
        //    this.nowNum = this.minNum;
        //}
        else
            this._nowNum = num;
	wx3_function(9771);
        this.renewCoin_6127();
    }

    private renewCoin_6127(){
        this.dispatchEventWith(CommonNumInput.RENEW);
    }
	private wx3_functionX_12191(){console.log(1453)}

    public set nowNum(v:number){
        this._nowNum = v;
        this.input.text = v+this.addStr;

        var num = parseInt(this.input.text);
        MyTool.changeGray(this.addBtn,num >= this._maxNum,true);
        MyTool.changeGray(this.reduceBtn,num <= this.minNum,true);
    }
	private wx3_functionX_12192(){console.log(9084)}

    public get nowNum(){
        //if(this.input.text == "")
        //    this.nowNum = 0;
        if(this._nowNum < this.minNum) {
            this.nowNum = this.minNum;
        }
        return this._nowNum;
    }
	private wx3_functionX_12193(){console.log(3487)}

    public init(min:number, max:number, step:number, value?:any){
        this.minNum = min;
        this.maxNum = max;
        this.stepNum = step || 1;

        this.input.maxChars = String(max).length+1

        if(this.addBtn){
            MyTool.changeGray(this.addBtn, false, true);
	wx3_function(8015);
            MyTool.changeGray(this.reduceBtn, false, true);
        }
        if(value !=undefined){
            this.nowNum = value;
            MyTool.changeGray(this.addBtn, this.nowNum >= this._maxNum, true);
            MyTool.changeGray(this.reduceBtn, this.nowNum <= this.minNum, true);
	wx3_function(6630);
        }
    }

    public setEnabled(v:boolean){
        this.addBtn.visible = this.reduceBtn.visible = v;
        this.input.touchEnabled = v;
	wx3_function(8816);
    }
}
