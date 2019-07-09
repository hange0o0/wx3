class CardInfoUI extends game.BaseWindow_wx3 {

    private static _instance: CardInfoUI;
    public static getInstance(): CardInfoUI {
        if(!this._instance)
            this._instance = new CardInfoUI();
        return this._instance;
    }
	private wx3_functionX_12360(){console.log(6839)}

    public item: PKCardInfoUI_wx3;
    public con: eui.Image;
    private leftBtn: eui.Image;
    public rightBtn: eui.Image;
    private cb0: eui.RadioButton;
	private wx3_functionX_12361(){console.log(8705)}
    private cb1: eui.RadioButton;
    private cb2: eui.RadioButton;
    private cb3: eui.RadioButton;
    private pageText: eui.Label;
    private coinGroup: eui.Group;
    private coinBarMC: eui.Rect;
	private wx3_functionX_12362(){console.log(6612)}
    private coinText: eui.Label;
    public upBtn: eui.Button;
    private diamonGroup: eui.Group;
    private diamondBarMC: eui.Rect;    //160
    private diamondText: eui.Label;
    public copyBtn: eui.Button;
	private wx3_functionX_12363(){console.log(4855)}
    public closeBtn: eui.Image;
    public bottomCloseBtn: eui.Image;





	private wx3_functionX_12364(){console.log(8011)}






	private wx3_functionX_12365(){console.log(5832)}




    public list
    public index
	private wx3_functionX_12366(){console.log(5259)}
    public sp
    public data;
    public coinCost;
    public diamondCost;

    public constructor() {
        super();
	wx3_function(5955);
        this.skinName = "CardInfoUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.bottomCloseBtn,this.hide)
        this.addBtnEvent(this.leftBtn,this.onLeft_2960)
        this.addBtnEvent(this.rightBtn,this.onRight_3286)
        this.addBtnEvent(this.upBtn,this.onUp)
        this.addBtnEvent(this.copyBtn,this.onCopy)


        this.cb0.group.addEventListener(eui.UIEvent.CHANGE,this.onCBChange,this)
        //this.touchEnabled = false;
    }
	private wx3_functionX_12367(){console.log(9614)}

    public onCBChange(){
        this.item.renew({
            mid:this.data,
            force:this.sp.otherForce,
            type:this.getSelectType_5654()
        });
	wx3_function(2824);
    }

    private getSelectType_5654(){
        if('otherForce' in this.sp)
            return 'other';
       if(this.cb0.selected)return ''
       if(this.cb1.selected)return 'work'
       if(this.cb2.selected)return 'atk'
       if(this.cb3.selected)return 'def'
    }
	private wx3_functionX_12368(){console.log(3686)}

    public onUp(){
        if(!UM_wx3.checkCoin(this.coinCost))
            return
        MonsterManager.getInstance().levelUpMonster(this.data)
        UM_wx3.addCoin(-this.coinCost)
        this.renew();
	wx3_function(3672);
        GuideManager.getInstance().testShowGuide()
    }

    public onCopy(){
         if(UM_wx3.diamond < this.diamondCost)
         {
             GetDiamondUI.getInstance().show();
	wx3_function(167);
             return;
         }
        MonsterManager.getInstance().numUpMonster(this.data)
        UM_wx3.addDiamond(-this.diamondCost)
        this.renew();
        GuideManager.getInstance().testShowGuide()
    }
	private wx3_functionX_12369(){console.log(1585)}

    private onLeft_2960(){
        this.index--;
        this.data = this.list[this.index];
        this.renew();
    }
	private wx3_functionX_12370(){console.log(1922)}

    private onRight_3286(){
        this.index++;
        this.data = this.list[this.index];
        this.renew();
        GuideManager.getInstance().testShowGuide()
    }
	private wx3_functionX_12371(){console.log(3503)}



    public show(v?,list?,index=-1,sp?){
        this.data = v;
        this.list = list
        this.index = index;
	wx3_function(1826);
        this.sp = sp || {};
        if(list && index==-1)
        {
            this.index = list.indexOf(this.data)
        }
        super.show()


    }
	private wx3_functionX_12372(){console.log(8370)}

    public hide() {
        super.hide();
        if(GuideManager.getInstance().isGuiding)
        {
            MonsterUI.getInstance().hide();
	wx3_function(1570);
            GuideManager.getInstance().testShowGuide()
        }

    }

    public onShow(){

        this.nextAtkTime = TM_wx3.now() + 3 + 7*Math.random();;
	wx3_function(2896);
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.renewCoin)
        this.addPanelOpenEvent(GameEvent.client.DIAMOND_CHANGE,this.renewDiamond)
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)

    }

    public onE(){
        this.item.onE();
    }

    private nextAtkTime
    private onTimer(){
        if(TM_wx3.now() > this.nextAtkTime)
        {
            this.item.heroItem.atk();
            this.nextAtkTime = TM_wx3.now() + 3 + 7*Math.random();
        }
    }

	private wx3_functionX_12373(){console.log(884)}
    public showFinish(){
         GuideManager.getInstance().testShowGuide()
        var TSM = TaskManager.getInstance()
        if(TSM.guideTaskVO && (TSM.guideTaskVO.type == 'mnum' || TSM.guideTaskVO.type == 'mlv')  && TSM.guideTaskVO.key == this.data)
        {
            if(TSM.guideTaskVO.type == 'mnum')
                TaskManager.getInstance().showGuideMC(this.copyBtn);
            else
                TaskManager.getInstance().showGuideMC(this.upBtn);

	wx3_function(6213);
        }
    }

    public renewCoin(){
        //this.coinText.textColor = UM.coin >= this.coinCost?0xFCE4B5:0xFF0000
        MyTool.renewBar(this.coinBarMC,this.coinCost,UM_wx3.coin,160,15);
        this.upBtn.skinName = UM_wx3.coin >= this.coinCost?'Btn1Skin':'Btn3Skin';
	wx3_function(3198);
    }

    public renewDiamond(){
        MyTool.renewBar(this.diamondBarMC,this.diamondCost,UM_wx3.diamond,160,15);
        this.copyBtn.skinName = UM_wx3.diamond >= this.diamondCost?'Btn1Skin':'Btn3Skin';
    }
	private wx3_functionX_12374(){console.log(852)}




    public renew(){
        this.coinCost = MonsterManager.getInstance().getLevelCost(this.data)
        this.diamondCost = MonsterManager.getInstance().getNumCost(this.data)
        this.coinText.text = NumberUtil.addNumSeparator(this.coinCost)
        this.renewCoin();
	wx3_function(8411);
        this.diamondText.text = this.diamondCost + ''
        this.renewDiamond();


        //var force = 100;
        this.item.renew({
            mid:this.data,
            force:this.sp.otherForce,
            type:this.getSelectType_5654()
        });
	wx3_function(3414);

        this.currentState = this.getSelectType_5654() == 'other'?'s2':'s1'

        if(this.list && this.list.length > 1)
        {
            this.leftBtn.visible = true
            this.rightBtn.visible = true
            MyTool.changeGray(this.leftBtn,this.index == 0,true)
            MyTool.changeGray(this.rightBtn,this.index == this.list.length-1,true)


            var total = this.list.length
            var index = this.index+1;
	wx3_function(2483);
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
	wx3_function(3351);
            this.coinGroup.horizontalCenter = 0;
        }
        else
        {
            this.diamonGroup.visible = true;
            this.coinGroup.horizontalCenter = -120;
	wx3_function(3737);
        }
    }


}