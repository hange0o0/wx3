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
    private cancelBtn: eui.Button;
    private atkBtn: eui.Button;
    private btnGroup: eui.Group;


    private enemyData
    public constructor() {
        super();
        this.skinName = "ChapterUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.cancelBtn,this.hide)
        this.addBtnEvent(this.atkBtn,this.atkBack)
    }

    public atkBack(){
        PKPosUI.getInstance().show({
            title:'进攻布阵',
            autoList:true,
            isPK:true,
            isAtk:true,
            maxNum:TecManager.getInstance().getTeamNum(),
            maxCost:TecManager.getInstance().getTeamCost(),
            fun:(list)=>{
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
        var robot = this.enemyData.robot
        PKManager.getInstance().setHead(this.headMC,robot.head)
        this.nameText.text = robot.nick
        this.lvText.text = 'LV.' + robot.level
        this.cdText.text = '路程:' +  DateUtil.getStringBySecond(robot.distanceTime).substr(-5);

        var cd = robot.distanceTime - (TM.now() - this.enemyData.time);
        this.cdText.text += '\n敌人部队在' + DateUtil.getStringBySecond(Math.max(0,cd)).substr(-5) + '后到达';
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