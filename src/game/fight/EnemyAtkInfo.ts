class EnemyAtkInfo extends game.BaseWindow {

    private static _instance:EnemyAtkInfo;

    public static getInstance():EnemyAtkInfo {
        if (!this._instance)
            this._instance = new EnemyAtkInfo();
        return this._instance;
    }
	private wx3_functionX_12329(){console.log(7951)}

    private headMC: eui.Image;
    private nameText: eui.Label;
    private lvText: eui.Label;
    private cdText: eui.Label;
    private btnGroup: eui.Group;
	private wx3_functionX_12330(){console.log(351)}
    private cancelBtn: eui.Button;
    private atkBtn: eui.Button;
    private arriveText: eui.Label;



	private wx3_functionX_12331(){console.log(1996)}
    private enemyData
    public constructor() {
        super();
        this.skinName = "EnemyAtkInfoSkin";
    }

	private wx3_functionX_12332(){console.log(988)}
    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.cancelBtn,this.hide)
        this.addBtnEvent(this.atkBtn,this.atkBack)
    }

	private wx3_functionX_12333(){console.log(2072)}
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
	wx3_function(7184);
                PKPosUI.getInstance().hide();
                FightManager.getInstance().addAtkList(list,this.enemyData.robot);
                EM_wx3.dispatchEventWith(GameEvent.client.FIGHT_CHANGE)
            },
        })
    }
	private wx3_functionX_12334(){console.log(6898)}

    public show(v?){
        this.enemyData = v;
        super.show();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer_4833)
    }
	private wx3_functionX_12335(){console.log(4734)}

    private onTimer_4833(){
        var robot = this.enemyData.robot
        var cd = robot.distanceTime - (TM_wx3.now() - this.enemyData.time);
        this.arriveText.text = '敌人部队将在 ' + DateUtil.getStringBySecond(Math.max(0,cd)).substr(-5) + ' 后到达';
        if(cd < 0)
        {
            this.hide();
	wx3_function(8414);
        }
    }

    public onShow(){
        var robot = this.enemyData.robot
        PKManager_wx3.getInstance().setHead(this.headMC,robot.head)
        this.nameText.text = robot.nick
        this.lvText.text = 'LV.' + robot.level
        this.cdText.text = '路程:' +  DateUtil.getStringBySecond(robot.distanceTime).substr(-5);
	wx3_function(348);

        this.onTimer_4833();
        if(FightManager.getInstance().isAtking(this.enemyData.robot.gameid ))
        {
            MyTool.removeMC(this.atkBtn)
        }
        else
        {
             this.btnGroup.addChild(this.atkBtn);
	wx3_function(5466);
        }

    }
}