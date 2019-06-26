class GuessUI extends game.BaseWindow_wx3 {

    private static _instance: GuessUI;
    public static getInstance(): GuessUI {
        if(!this._instance)
            this._instance = new GuessUI();
        return this._instance;
    }

    private cdText: eui.Label;
    private closeBtn: eui.Image;
    private barGroup: eui.Group;
    private barMC: eui.Image;
    private arrowGroup: eui.Group;
    private costText: eui.Label;
    private logBtn: eui.Button;
    private okBtn: eui.Button;
    private lastBtn: eui.Button;
    private myCostText: eui.Label;
    private team1: GuessTeamUI;
    private team2: GuessTeamUI;
    private cb1: eui.RadioButton;
    private cb2: eui.RadioButton;










    public chooseCoin = 0;
    public openIndex = 0;
    public constructor() {
        super();
        this.skinName = "GuessUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.logBtn,()=>{
            GuessLogUI.getInstance().show();
        })
        this.addBtnEvent(this.lastBtn,()=>{
            var pkObj = GuessManager.getInstance().getLastGuess()
            pkObj.title = '限时竞猜 ' +  GuessManager.getInstance().getDayStrByKey(pkObj.index)
            pkObj.isGuess = true;
            pkObj.isReplay = true
            MainPKUI_wx3.getInstance().show(pkObj);
        })
        this.addBtnEvent(this.okBtn,()=>{
            if(!this.chooseCoin)
            {
                MyWindow.ShowTips('请拖动进度条设置投注金额！')
                return;
            }
            var GM = GuessManager.getInstance()
            GM.resetMyGuess()
            if(this.cb1.selected)
            {
                GM.myGuess.coin1 += this.chooseCoin;
                this.team1.renewGuessCost()
            }
            else
            {
                GM.myGuess.coin2 += this.chooseCoin;
                this.team2.renewGuessCost()
            }
            UM_wx3.addCoin(-this.chooseCoin)
            this.resetChooseCoin()
        })

        this.cb1.selected = true;
        this.cb1.group.addEventListener(egret.Event.CHANGE,this.onCBChange,this)
        this.team1.teamID = 1
        this.team2.teamID = 2

        this.barGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMove,this)
        this.barGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this)

    }

    private onMove(e){
        var w = 500;
        var p = this.barGroup.globalToLocal(e.stageX,e.stageY);
        if(p.x < 10)
            p.x = 10
        else if(p.x >w)
            p.x = w
        this.arrowGroup.x = p.x
        this.barMC.width = p.x
        this.chooseCoin  = Math.floor((p.x-10)/(w-10)*UM_wx3.coin);
        this.costText.text = NumberUtil.addNumSeparator(this.chooseCoin,2)
    }

    private onCBChange(e){
        //console.log(e);
        this.okBtn.label = '投注队伍' + (this.cb1.selected?1:2)
    }

    public onClose(){
        this.hide();
    }


    public show(){
        super.show()
    }

    public hide() {
        //MainPKUI.instance.hide();
        super.hide();
        //GameUI.getInstance().onTimer();
    }

    public onShow(){
        this.resetChooseCoin();
        this.renew();
        this.onCoinChange();
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.onCoinChange)
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)

        if(GuessManager.getInstance().guessRed)
        {
            GuessManager.getInstance().myGuess.result = 100;
            GuessLogUI.getInstance().show();
        }
    }

    private onTimer(){
        var GM = GuessManager.getInstance();
        if(this.openIndex != GM.getCurrentGuess().index)
        {
            MyWindow.ShowTips('上一轮投注已结束，现在开始新一轮投注')
            this.renew();
            if(GuessManager.getInstance().guessRed)
            {
                GuessManager.getInstance().myGuess.result = 100;
                GuessLogUI.getInstance().show();
            }
        }
        this.cdText.text = '离本轮投注结束还有：' + DateUtil.getStringBySecond(GM.getEndTime() - TM_wx3.now()).substr(-5)
    }

    private resetChooseCoin(){
        this.chooseCoin = 0;
        this.arrowGroup.x = 10
        this.barMC.width = 10
        this.costText.text = '0'
    }

    private onCoinChange(){
        this.setHtml(this.myCostText,'我的金币：' + this.createHtml(NumberUtil.addNumSeparator(UM_wx3.coin),0xFFCC44))
    }

    public renew(){
        var guess = GuessManager.getInstance().getCurrentGuess();
        this.openIndex = guess.index;
        this.team1.showList(guess.list1.split(','))
        this.team2.showList(guess.list2.split(','))
        this.team1.renewGuessCost()
        this.team2.renewGuessCost()
        this.okBtn.label = '投注队伍' + (this.cb1.selected?1:2)
    }



}