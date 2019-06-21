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
        this.txt.addEventListener( egret.TextEvent.LINK, ( evt:egret.TextEvent )=>{
            console.log( evt.text );
            for(var i=0;i<this.otherArr.length;i++)
            {
                 if(this.otherArr[i].openid == evt.text)
                 {
                     console.log(this.otherArr[i])
                 }
            }
        }, this )
    }

    public show(arr?,arr2?){
        super.show();
        this.setHtml(this.txt, arr.join('\n'))
    }

}