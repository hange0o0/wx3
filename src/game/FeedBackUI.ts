class FeedBackUI extends game.BaseWindow_wx3 {

    private static _instance: FeedBackUI;
    public static getInstance(): FeedBackUI {
        if(!this._instance)
            this._instance = new FeedBackUI();
        return this._instance;
    }

    private closeBtn: eui.Image;
    private sendBtn: eui.Button;
    private inputText: eui.EditableText;



    public data;
    public constructor() {
        super();
        this.skinName = "FeedBackUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.sendBtn,()=>{
            if(this.inputText.text)
            {
                sendFeedBack(this.inputText.text);
                MyWindow.ShowTips('感谢你的反馈，我们会努力做得更好的！')
                this.hide();
            }

        })
    }

    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.inputText.text = ''
    }

}