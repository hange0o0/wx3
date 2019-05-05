class AlertUI extends game.BaseWindow_wx3 {
    public constructor() {
        super();
        this.skinName = "AlertSkin";
    }
	private wx3_functionX_12179(){console.log(8269)}

    private cancelBtn: eui.Button;
    private okBtn: eui.Button;
    private closeBtn: eui.Button;
    public text: eui.Label;

	private wx3_functionX_12180(){console.log(7090)}
    private textIn;
    private fun;
    private btnLabel;

    public childrenCreated() {
        this.canBGClose = false;
	wx3_function(8931);
        super.childrenCreated();
        this.addBtnEvent(this.okBtn, this.onClick_1871);
        MyTool.removeMC(this.closeBtn)
        MyTool.removeMC(this.cancelBtn)
    }

	private wx3_functionX_12181(){console.log(6676)}
    public show(v?,fun?,btnLabel?){
        this.textIn = v;
        this.fun = fun;
        this.btnLabel = btnLabel;
        super.show();
    }
	private wx3_functionX_12182(){console.log(7580)}

    public onShow(){
        MyTool.setColorText(this.text, this.textIn);
        this.okBtn.label = this.btnLabel || '确认'
        if(this.text.numLines > 1)
            this.text.textAlign = 'left'

	wx3_function(250);

        var ww = GameManager_wx3.container.width;
        var hh = GameManager_wx3.container.height;
        this.x = (ww - this.width) / 2;
        this.y = (hh - this.height) / 2;
    }
	private wx3_functionX_12183(){console.log(8628)}

    private onClick_1871(){
        this.hide();
        if(this.fun)
            this.fun();
    }
}
