class GetDiamondUI extends game.BaseWindow {

    private static _instance:GetDiamondUI;

    public static getInstance():GetDiamondUI {
        if (!this._instance)
            this._instance = new GetDiamondUI();
        return this._instance;
    }

    private closeBtn: eui.Button;
    private coinBtn: eui.Button;
    private taskBtn: eui.Button;
    private chapterBtn: eui.Button;
    private friendBtn: eui.Button;







    private tecid
    public constructor() {
        super();
        this.skinName = "GetDiamondUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.closeBtn,this.hide);

        this.addBtnEvent(this.coinBtn,()=>{
            GetCoinUI.getInstance().show()
        })

        this.addBtnEvent(this.taskBtn,()=>{
            TaskUI.getInstance().show()
        })

        this.addBtnEvent(this.friendBtn,()=>{
            BuffUI.getInstance().show()
        })

        this.addBtnEvent(this.chapterBtn,()=>{
           ChapterUI.getInstance().show();
        })
    }


    public show(v?){
        this.tecid = v;
        super.show();
    }

    public onShow(){


    }
}