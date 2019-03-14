class TecUI extends game.BaseUI {

    private static _instance: TecUI;
    public static getInstance(): TecUI {
        if(!this._instance)
            this._instance = new TecUI();
        return this._instance;
    }

    private topUI: TopUI;
    private bottomUI: BottomUI;
    private scroller: eui.Scroller;
    private list: eui.List;
    private coinGroup: eui.Group;
    private coinText: eui.Label;
    private addCoinBtn: eui.Image;
    private tecForceText: eui.Label;
    private addSkillBtn: eui.Image;




    public constructor() {
        super();
        this.skinName = "TecUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.hide,this);
        this.topUI.setTitle('科技升级')

        this.addBtnEvent(this.addSkillBtn,this.onAddSkill)
        this.addBtnEvent(this.coinGroup,this.onAddCoin)

        this.list.itemRenderer = TecItem;
        this.scroller.viewport = this.list;

        this.addSkillBtn.visible = !UM.isTest
    }

    private onAddSkill(){
        ShareTool.share('日常推荐一个好游戏',Config.localResRoot + "share_img_2.jpg",{},()=>{
             TecManager.getInstance().addSkill(5);
        })
    }

    private onAddCoin(){
        GetCoinUI.getInstance().show();
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
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.onCoinChange)
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
    }

    private onCoinChange(){
        this.coinText.text = UM.coinText
    }

    private onTimer(){
        this.renewSkillNum();
    }

    private renewSkillNum(){
        var TCM = TecManager.getInstance();
        var energy = TCM.getSkill();
        if(energy > 0)
        {
            this.tecForceText.text = energy + '/' + TCM.maxSkillNum + (energy<TCM.maxSkillNum?'（'+DateUtil.getStringBySecond(UM.getNextEnergyCD())+'后恢复1点）':'')
            this.tecForceText.textColor = 0xFFE3B7
            this.addSkillBtn.visible = false
        }
        else
        {
            this.tecForceText.text = DateUtil.getStringBySecond(UM.getNextEnergyCD());
            this.tecForceText.textColor = 0xFF0000
            this.addSkillBtn.visible = !UM.isTest
        }
    }

    public renew(){
         this.list.dataProvider = new eui.ArrayCollection(TecManager.getInstance().tecList);
        this.onCoinChange();
        this.renewSkillNum();
    }

}