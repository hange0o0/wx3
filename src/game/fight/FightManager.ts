class FightManager {

    private static _instance:FightManager;

    public static getInstance():FightManager {
        if (!this._instance)
            this._instance = new FightManager();
        return this._instance;
    }

    public searchTime = 0;
    public log = [];//日志
    public searchRobot = [];//找到的敌人
    public lastFight = [];//会报仇的敌人
    public constructor(){
        var oo = SharedObjectManager.getInstance().getMyValue('fight')
        if(oo)
        {
            this.searchTime = oo.searchTime;
            this.log = oo.log;
            this.searchRobot = oo.searchRobot;
            this.lastFight = oo.lastFight;
            for(var i=0;i<this.searchRobot.length;i++)
            {
                this.searchRobot[i] = new RobotVO(this.searchRobot[i]);
            }
            for(var i=0;i<this.lastFight.length;i++)
            {
                this.lastFight[i] = new RobotVO(this.lastFight[i]);
            }
            for(var i=0;i<this.log.length;i++)
            {
                this.log[i].robot = new RobotVO(this.log[i].robot);
            }
            this.save();
        }
    }

    public save(){
        if(!RobotVO.change)
            return;
        RobotVO.change = true;
        SharedObjectManager.getInstance().setMyValue('fight',{
            searchTime:this.searchTime,
            log:this.log,
            searchRobot:this.searchRobot,
        })
    }

    public isRed(){
        return false;
    }
}