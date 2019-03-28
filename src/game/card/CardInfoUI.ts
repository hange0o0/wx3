class CardInfoUI extends game.BaseWindow {

    private static _instance: CardInfoUI;
    public static getInstance(): CardInfoUI {
        if(!this._instance)
            this._instance = new CardInfoUI();
        return this._instance;
    }

    private item: PKCardInfoUI;
    private con: eui.Image;
    private leftBtn: eui.Image;
    private rightBtn: eui.Image;
    private cb0: eui.RadioButton;
    private cb1: eui.RadioButton;
    private cb2: eui.RadioButton;
    private cb3: eui.RadioButton;
    private pageText: eui.Label;
    private coinGroup: eui.Group;
    private coinText: eui.Label;
    private upBtn: eui.Button;
    private diamonGroup: eui.Group;
    private diamondText: eui.Label;
    private copyBtn: eui.Button;
    private closeBtn: eui.Image;














    public list
    public index
    public data;
    public coinCost;
    public diamondCost;

    public constructor() {
        super();
        this.skinName = "CardInfoUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.leftBtn,this.onLeft)
        this.addBtnEvent(this.rightBtn,this.onRight)
        this.addBtnEvent(this.upBtn,this.onUp)
        this.addBtnEvent(this.copyBtn,this.onCopy)


        this.cb0.group.addEventListener(eui.UIEvent.CHANGE,this.onCBChange,this)
        //this.touchEnabled = false;
    }

    public onCBChange(){
        this.item.renew({
            mid:this.data,
            force:100,
            type:this.getSelectType()
        });
    }

    private getSelectType(){
       if(this.cb0.selected)return ''
       if(this.cb1.selected)return 'work'
       if(this.cb2.selected)return 'atk'
       if(this.cb3.selected)return 'def'
    }

    public onUp(){
        if(!UM.checkCoin(this.coinCost))
            return
        MonsterManager.getInstance().levelUpMonster(this.data)
        UM.addCoin(-this.coinCost)
        this.renew();
    }

    public onCopy(){
         if(UM.diamond < this.diamondCost)
            return;
        MonsterManager.getInstance().numUpMonster(this.data)
        UM.addDiamond(-this.diamondCost)
        this.renew();
    }

    private onLeft(){
        this.index--;
        this.data = this.list[this.index];
        this.renew();
    }

    private onRight(){
        this.index++;
        this.data = this.list[this.index];
        this.renew();
    }



    public show(v?,list?,index=-1){
        this.data = v;
        this.list = list
        this.index = index;
        if(list && index==-1)
        {
            this.index = list.indexOf(this.data)
        }
        super.show()
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.renewCoin)
    }

    public hide() {
        super.hide();
    }

    public onShow(){

        this.renew();


    }

    public showFinish(){
         GuideManager.getInstance().testShowGuide()
    }

    public renewCoin(){
        this.coinText.textColor = UM.coin >= this.coinCost?0xFCE4B5:0xFF0000
    }




    public renew(){
        this.coinCost = MonsterManager.getInstance().getLevelCost(this.data)
        this.diamondCost = MonsterManager.getInstance().getNumCost(this.data)
        this.coinText.text = NumberUtil.addNumSeparator(this.coinCost)
        this.renewCoin();
        this.diamondText.text = this.diamondCost + ''
        this.diamondText.textColor = UM.diamond >= this.diamondCost?0xFCE4B5:0xFF0000


        this.item.renew({
            mid:this.data,
            force:100,
            type:this.getSelectType()
        });

        if(this.list && this.list.length > 1)
        {
            this.leftBtn.visible = true
            this.rightBtn.visible = true
            MyTool.changeGray(this.leftBtn,this.index == 0,true)
            MyTool.changeGray(this.rightBtn,this.index == this.list.length-1,true)


            var total = this.list.length
            var index = this.index+1;
            this.pageText.text = index + ' / ' + total;
        }
        else
        {
            this.leftBtn.visible = false
            this.rightBtn.visible = false
            this.pageText.text = ''
        }

        if(MonsterManager.getInstance().getMonsterNum(this.data) == 10)
        {
            this.diamonGroup.visible = false;
            this.coinGroup.horizontalCenter = 0;
        }
        else
        {
            this.diamonGroup.visible = true;
            this.coinGroup.horizontalCenter = -120;
        }
    }


}