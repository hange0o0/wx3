class PKPosAddUI extends game.BaseWindow {

    private static _instance: PKPosAddUI;
    public static getInstance(): PKPosAddUI {
        if(!this._instance)
            this._instance = new PKPosAddUI();
        return this._instance;
    }
	private wx3_functionX_12511(){console.log(5498)}

    private tecBtn: eui.Button;
    private monsterBtn: eui.Button;
    private workBtn: eui.Button;
    private closeBtn: eui.Image;

	private wx3_functionX_12512(){console.log(4155)}

    public constructor() {
        super();
        this.skinName = "PKPosAddUISkin";
    }

	private wx3_functionX_12513(){console.log(1577)}
    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.tecBtn,()=>{
            this.hide();
            //PKPosUI.getInstance().hide()
            TecUI.getInstance().show()
        });
	wx3_function(9123);

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
	wx3_function(9270);

    }
}