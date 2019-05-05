class ConfirmUI extends game.BaseWindow_wx3 {
    public constructor() {
        super();
        this.skinName = "AlertSkin";
    }
	private wx3_functionX_12194(){console.log(4956)}

    private cancelBtn: eui.Button;
    private okBtn: eui.Button;
    public closeBtn: eui.Button;
    private text: eui.Label;

	private wx3_functionX_12195(){console.log(6878)}
    private textIn;
    private fun;
    private btnWord;
    private sp;

    public childrenCreated() {
        super.childrenCreated();
	wx3_function(7186);
        this.canBGClose = false;
        this.addBtnEvent(this.okBtn, this.onClick_5624);
        this.addBtnEvent(this.cancelBtn, this.onCancelClick_7198);
        this.addBtnEvent(this.closeBtn, this.onCloseClick_9046);
    }

	private wx3_functionX_12196(){console.log(319)}
    public show(v?,fun?,btnWord?,sp?){
        this.textIn = v;
        this.fun = fun;
        this.btnWord = btnWord;
        this.sp = sp || {};
        super.show();
	wx3_function(7839);
    }

    public onShow(){
        MyTool.setColorText(this.text,this.textIn);
        this.text.validateNow()
        if(this.text.numLines > 1 && !this.sp.middle)
            this.text.textAlign = 'left'
        if(this.btnWord)
        {
            this.cancelBtn.label = this.btnWord[0];
	wx3_function(5179);
            this.okBtn.label = this.btnWord[1];
        }


        var ww = GameManager_wx3.container.width;
        var hh = GameManager_wx3.container.height;
	wx3_function(7713);
        this.x = (ww - this.width) / 2;
        this.y = (hh - this.height) / 2;
        this.closeBtn.visible = false;
    }

    private onClick_5624(){
        this.hide();
	wx3_function(6189);
        if(this.fun)
            this.fun(1);
    }
    private onCancelClick_7198(){
        this.hide();
        if(this.fun)
            this.fun(2);
	wx3_function(9438);
    }
    private onCloseClick_9046(){
        this.hide();
        if(this.fun)
            this.fun(3);
    }
}
