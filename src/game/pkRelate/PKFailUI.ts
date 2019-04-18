class PKFailUI extends game.BaseWindow {

    private static _instance:PKFailUI;

    public static getInstance():PKFailUI {
        if (!this._instance)
            this._instance = new PKFailUI();
        return this._instance;
    }

    private closeBtn: eui.Button;
    private monsterBtn: eui.Button;
    private tecText: eui.Label;
    private tecBtn: eui.Button;
    private friendBtn: eui.Button;
    private goBtn: eui.Button;






    private tecid
    public constructor() {
        super();
        this.skinName = "PKFailUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.closeBtn,this.hide);

        this.addBtnEvent(this.monsterBtn,()=>{
            MonsterUI.getInstance().show()
        })

        this.addBtnEvent(this.tecBtn,()=>{
            TecUI.getInstance().show()
        })

        this.addBtnEvent(this.friendBtn,()=>{
            BuffUI.getInstance().show()
        })

        this.addBtnEvent(this.goBtn,()=>{
            var wx = window['wx'];
            if(!wx)
            {
                MyWindow.ShowTips('只在公网生效')
                return;
            }
            wx.navigateToMiniProgram({
                appId: 'wxf9c8e218c23e2eb7',
                success(res) {
                    // 打开成功
                }
            })
        })
    }


    public show(v?){
        this.tecid = v;
        super.show();
    }

    public onShow(){
         this.tecText.text = '提升与战斗相关的科技等级'

    }
}