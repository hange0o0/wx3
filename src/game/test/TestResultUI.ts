class TestResultUI extends game.BaseWindow {

    private static _instance:TestResultUI;

    public static getInstance():TestResultUI {
        if (!this._instance)
            this._instance = new TestResultUI();
        return this._instance;
    }

    private scoreText: eui.Label;
    private retryBtn: eui.Group;
    private backBtn: eui.Group;
    private historyText: eui.Label;




    private score
    public constructor() {
        super();
        this.skinName = "TestResultUISkin";
        this.canBGClose = false;
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.backBtn,()=>{
            TestUI.getInstance().renew()
             this.hide();
        })
        this.addBtnEvent(this.retryBtn,()=>{
            TestUI.getInstance().renew()
            TestUI.getInstance().startGame()
            this.hide();
        })
    }

    public hide(){
        super.hide();
    }



    public show(score?){
        this.score = score;
        super.show();
    }

    public onShow(){
        var history = SharedObjectManager_wx3.getInstance().getMyValue('test_score') || 0;
        if(this.score > history)
        {
            SharedObjectManager_wx3.getInstance().setMyValue('test_score',this.score)
            this.historyText.text = '历史新高'
        }
        else
        {
            this.historyText.text = '历史最高：'+ history + '米';
        }
        this.scoreText.text = this.score + '米'


    }
}