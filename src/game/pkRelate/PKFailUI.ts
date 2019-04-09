class PKFailUI extends game.BaseWindow {

    private static _instance:PKFailUI;

    public static getInstance():PKFailUI {
        if (!this._instance)
            this._instance = new PKFailUI();
        return this._instance;
    }

    private closeBtn: eui.Button;
    private monsterBtn: eui.Button;
    private tecText: eui.Label;
    private tecBtn: eui.Button;
    private friendBtn: eui.Button;
    private goBtn: eui.Button;






    private enemyData
    public constructor() {
        super();
        this.skinName = "PKFailUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.closeBtn,this.onShare)
    }

    public onShare(){
        PKPosUI.getInstance().show({
            title:'进攻布阵',
            autoList:true,
            isPK:true,
            isAtk:true,
            maxNum:TecManager.getInstance().getTeamNum(),
            maxCost:TecManager.getInstance().getTeamCost(),
            fun:(list)=>{
                this.hide();
                PKPosUI.getInstance().hide();
                FightManager.getInstance().addAtkList(list,this.enemyData.robot);
                EM.dispatchEventWith(GameEvent.client.FIGHT_CHANGE)
            },
        })
    }

    public show(v?){
        this.enemyData = v;
        super.show();
    }

    public onShow(){


    }
}