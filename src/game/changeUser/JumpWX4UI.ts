class JumpWX4UI extends game.BaseWindow_wx3 {

    private static _instance: JumpWX4UI;
    public static getInstance(): JumpWX4UI {
        if(!this._instance)
            this._instance = new JumpWX4UI();
        return this._instance;
    }

    private cancelBtn: eui.Button;
    private taskBtn: eui.Button;
    private nameText: eui.Label;


    public constructor() {
        super();
        this.skinName = "JumpWX4Skin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.cancelBtn,()=>{
            this.hide();
            var wx = window['wx'];
            if(wx)
            {
                wx.aldSendEvent("拒绝跳往wx4")
            }

        })
        this.addBtnEvent(this.taskBtn,()=>{
            var wx = window['wx'];
            if(!wx)
            {
                MyWindow.ShowTips('只在公网生效')
                return;
            }
            wx.aldSendEvent("弹出跳往wx4窗口")
            wx.navigateToMiniProgram({
                appId: 'wx2f66e2c8de744d53',
                success(res) {
                    wx.aldSendEvent("跳往wx4")
                }
            })
        })
    }

    public onClose(){
        this.hide();
    }


    public show(){
        super.show()
    }

    public hide() {
        super.hide();

    }

    public onShow(){
        this.renew();
    }

    public renew(){
        this.nameText.text = (UM_wx3.nick || '将军') + '：'
    }

}