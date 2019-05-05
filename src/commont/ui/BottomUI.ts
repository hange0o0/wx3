class BottomUI extends game.BaseContainer_wx3 {
    public constructor() {
        super();
    }

	private wx3_functionX_12226(){console.log(2792)}
    public closeBtn: eui.Button;

    private hideFun;
    private thisObj;
    public childrenCreated() {
        this.addBtnEvent(this.closeBtn,this.backBtnClick_4898);
	wx3_function(5541);
    }
    public setHide(fun,thisObj):void{
        this.hideFun = fun;
        this.thisObj = thisObj;
    }
    private backBtnClick_4898(event:egret.TouchEvent):void {
        this.hideFun && this.hideFun.apply(this.thisObj);
	wx3_function(8787);
    }
}