class DebugTextList extends game.BaseUI_wx3 {

    private static _instance:DebugTextList;

    public static getInstance() {
        if (!this._instance) this._instance = new DebugTextList();
        return this._instance;
    }

    private backBtn: eui.Button;
    private txt: eui.Label;


    public constructor() {
        super();
        this.skinName = "DebugTextListSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.backBtn,this.hide)
    }

    public show(arr?){
        super.show();
        this.txt.text = arr.join('\n')
    }

}