class DebugTextList extends game.BaseUI_wx3 {

    private static _instance:DebugTextList;

    public static getInstance() {
        if (!this._instance) this._instance = new DebugTextList();
        return this._instance;
    }

    private backBtn: eui.Button;
    private txt: eui.Label;


    public otherArr;
    public constructor() {
        super();
        this.skinName = "DebugTextListSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.backBtn,this.hide)
        this.txt.touchEnabled = true;
        this.txt.addEventListener( egret.TextEvent.LINK, ( evt:egret.TextEvent )=>{
            var index = evt.text;
            this.otherArr[index].saveTime = TM_wx3.now();
            UM_wx3.isOther = true;
            UM_wx3.fill(this.otherArr[index]);
            GameUI.getInstance().reInitList()
            MyWindow.ShowTips('已更换用户')
        }, this )
    }

    public show(arr?,arr2?){
        super.show();
        this.otherArr = arr2;
        this.setHtml(this.txt, arr.join('\n'))
    }

}