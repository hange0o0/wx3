class GetDiamondUI extends game.BaseWindow {

    private static _instance:GetDiamondUI;

    public static getInstance():GetDiamondUI {
        if (!this._instance)
            this._instance = new GetDiamondUI();
        return this._instance;
    }
	private wx3_functionX_12386(){console.log(2552)}

    private closeBtn: eui.Button;
    private coinBtn: eui.Button;
    private taskBtn: eui.Button;
    private chapterBtn: eui.Button;
    private friendBtn: eui.Button;
	private wx3_functionX_12387(){console.log(5174)}






	private wx3_functionX_12388(){console.log(6596)}

    private tecid
    public constructor() {
        super();
        this.skinName = "GetDiamondUISkin";
    }
	private wx3_functionX_12389(){console.log(2815)}

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
	wx3_function(8610);
        })
    }


    public show(v?){
        this.tecid = v;
	wx3_function(410);
        super.show();
    }

    public onShow(){


    }
}