class PKPosAddUI extends game.BaseWindow {

    private static _instance: PKPosAddUI;
    public static getInstance(): PKPosAddUI {
        if(!this._instance)
            this._instance = new PKPosAddUI();
        return this._instance;
    }

    private tecBtn: eui.Button;
    private monsterBtn: eui.Button;
    private workBtn: eui.Button;
    private closeBtn: eui.Image;


    public constructor() {
        super();
        this.skinName = "PKPosAddUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.tecBtn,()=>{
            this.hide();
            //PKPosUI.getInstance().hide()
            TecUI.getInstance().show()
        });

        this.addBtnEvent(this.monsterBtn,()=>{
            this.hide();
            //PKPosUI.getInstance().hide()
            MonsterUI.getInstance().show()
        });

        this.addBtnEvent(this.workBtn,()=>{
            this.hide();
            //PKPosUI.getInstance().hide()
            WorkUI.getInstance().show()
        });

    }
}