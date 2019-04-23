class CardInfoUI extends game.BaseWindow {

    private static _instance: CardInfoUI;
    public static getInstance(): CardInfoUI {
        if(!this._instance)
            this._instance = new CardInfoUI();
        return this._instance;
    }

    private item: PKCardInfoUI_wx3;
    public con: eui.Image;
    private leftBtn: eui.Image;
    public rightBtn: eui.Image;
    private cb0: eui.RadioButton;
    private cb1: eui.RadioButton;
    private cb2: eui.RadioButton;
    private cb3: eui.RadioButton;
    private pageText: eui.Label;
    private coinGroup: eui.Group;
    private coinBarMC: eui.Rect;
    private coinText: eui.Label;
    public upBtn: eui.Button;
    private diamonGroup: eui.Group;
    private diamondBarMC: eui.Rect;    //160
    private diamondText: eui.Label;
    public copyBtn: eui.Button;
    public closeBtn: eui.Image;















    public list
    public index
    public sp
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
            force:this.sp.otherForce,
            type:this.getSelectType()
        });
    }

    private getSelectType(){
        if('otherForce' in this.sp)
            return 'other';
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
        GuideManager.getInstance().testShowGuide()
    }

    public onCopy(){
         if(UM.diamond < this.diamondCost)
         {
             GetDiamondUI.getInstance().show();
             return;
         }
        MonsterManager.getInstance().numUpMonster(this.data)
        UM.addDiamond(-this.diamondCost)
        this.renew();
        GuideManager.getInstance().testShowGuide()
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
        GuideManager.getInstance().testShowGuide()
    }



    public show(v?,list?,index=-1,sp?){
        this.data = v;
        this.list = list
        this.index = index;
        this.sp = sp || {};
        if(list && index==-1)
        {
            this.index = list.indexOf(this.data)
        }
        super.show()


    }

    public hide() {
        super.hide();
        if(GuideManager.getInstance().isGuiding)
        {
            MonsterUI.getInstance().hide();
            GuideManager.getInstance().testShowGuide()
        }

    }

    public onShow(){

        this.renew();
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.renewCoin)
        this.addPanelOpenEvent(GameEvent.client.DIAMOND_CHANGE,this.renewDiamond)

    }

    public showFinish(){
         GuideManager.getInstance().testShowGuide()
        var TSM = TaskManager.getInstance()
        if(TSM.guideTaskVO && (TSM.guideTaskVO.type == 'mnum' || TSM.guideTaskVO.type == 'mlv')  && TSM.guideTaskVO.key == this.data)
        {
            if(TSM.guideTaskVO.type == 'mnum')
                TaskManager.getInstance().showGuideMC(this.copyBtn);
            else
                TaskManager.getInstance().showGuideMC(this.upBtn);
        }
    }

    public renewCoin(){
        //this.coinText.textColor = UM.coin >= this.coinCost?0xFCE4B5:0xFF0000
        MyTool.renewBar(this.coinBarMC,this.coinCost,UM.coin,160,15);
        this.upBtn.skinName = UM.coin >= this.coinCost?'Btn1Skin':'Btn3Skin';
    }

    public renewDiamond(){
        MyTool.renewBar(this.diamondBarMC,this.diamondCost,UM.diamond,160,15);
        this.copyBtn.skinName = UM.diamond >= this.diamondCost?'Btn1Skin':'Btn3Skin';
    }




    public renew(){
        this.coinCost = MonsterManager.getInstance().getLevelCost(this.data)
        this.diamondCost = MonsterManager.getInstance().getNumCost(this.data)
        this.coinText.text = NumberUtil.addNumSeparator(this.coinCost)
        this.renewCoin();
        this.diamondText.text = this.diamondCost + ''
        this.renewDiamond();



        //var force = 100;
        this.item.renew({
            mid:this.data,
            force:this.sp.otherForce,
            type:this.getSelectType()
        });

        this.currentState = this.getSelectType() == 'other'?'s2':'s1'

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

        if(MonsterManager.getInstance().getMonsterNum(this.data) >= 6)
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