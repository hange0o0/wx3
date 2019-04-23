class EnemyAtkInfo extends game.BaseWindow {

    private static _instance:EnemyAtkInfo;

    public static getInstance():EnemyAtkInfo {
        if (!this._instance)
            this._instance = new EnemyAtkInfo();
        return this._instance;
    }

    private headMC: eui.Image;
    private nameText: eui.Label;
    private lvText: eui.Label;
    private cdText: eui.Label;
    private btnGroup: eui.Group;
    private cancelBtn: eui.Button;
    private atkBtn: eui.Button;
    private arriveText: eui.Label;



    private enemyData
    public constructor() {
        super();
        this.skinName = "EnemyAtkInfoSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.cancelBtn,this.hide)
        this.addBtnEvent(this.atkBtn,this.atkBack)
    }

    public atkBack(){
        PKPosUI.getInstance().show({
            title:'掠夺【'+this.enemyData.robot.nick+'】',
            autoList:true,
            type:'fight',
            isPK:true,
            isAtk:true,
            fightData:this.enemyData.robot,
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
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
    }

    private onTimer(){
        var robot = this.enemyData.robot
        var cd = robot.distanceTime - (TM.now() - this.enemyData.time);
        this.arriveText.text = '敌人部队将在 ' + DateUtil.getStringBySecond(Math.max(0,cd)).substr(-5) + ' 后到达';
        if(cd < 0)
        {
            this.hide();
        }
    }

    public onShow(){
        var robot = this.enemyData.robot
        PKManager_wx3.getInstance().setHead(this.headMC,robot.head)
        this.nameText.text = robot.nick
        this.lvText.text = 'LV.' + robot.level
        this.cdText.text = '路程:' +  DateUtil.getStringBySecond(robot.distanceTime).substr(-5);

        this.onTimer();
        if(FightManager.getInstance().isAtking(this.enemyData.robot.gameid ))
        {
            MyTool.removeMC(this.atkBtn)
        }
        else
        {
             this.btnGroup.addChild(this.atkBtn);
        }

    }
}