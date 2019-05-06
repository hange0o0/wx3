class WorkFreeUI extends game.BaseWindow_wx3 {

    private static _instance:WorkFreeUI;

    public static getInstance():WorkFreeUI {
        if (!this._instance)
            this._instance = new WorkFreeUI();
        return this._instance;
    }
    private closeBtn: eui.Button;
    private con: eui.Group;
    private fightCon: eui.Group;
    private fightBtn: eui.Button;
    private workCon: eui.Group;
    private workBtn: eui.Button;
    private taskCon: eui.Group;
    private taskBtn: eui.Button;
    private defCon: eui.Group;
    private defBtn: eui.Button;
    private chapterCon: eui.Group;
    private chapterBtn: eui.Button;


    public constructor() {
        super();
        this.skinName = "WorkFreeUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.closeBtn,this.hide);

        this.addBtnEvent(this.fightBtn,()=>{
            this.hide();
            FightUI.getInstance().show()
        })

        this.addBtnEvent(this.workBtn,()=>{
            this.hide();

            var WM = WorkManager.getInstance();
            var len = WM.getOpenWork();
            for(var i=1;i<=len;i++)
            {
                var arr = WM.getWorkList(i);
                if(arr.length < 10)
                {
                    WorkManager.getInstance().editWork(i);
                    break;
                }
            }
        })

        this.addBtnEvent(this.taskBtn,()=>{
            this.hide();
            TaskUI2.getInstance().show()
        })

        this.addBtnEvent(this.defBtn,()=>{
            this.hide();
            MonsterManager.getInstance().editDef()
        })

        this.addBtnEvent(this.chapterBtn,()=>{
            this.hide();
            WorkUI.getInstance().hide();
            ChapterUI.getInstance().show();

        })
    }

    public show(){
        super.show();
    }

    public onShow(){
        this.con.removeChildren();
        this.con.addChild(this.fightCon)
        if(WorkManager.getInstance().workList.length < WorkManager.getInstance().getWorkNum())
        {
            this.con.addChild(this.workCon)
        }
        var ingNum = TaskManager.getInstance().getTaskingList().length
        if(MonsterManager.getInstance().getTotalMonsterNum() >= 20 && ingNum < UM_wx3.dayTask.length)
        {
            this.con.addChild(this.taskCon)
        }

        if(TecManager.getInstance().getTeamNum() > MonsterManager.getInstance().getDefArr().length)
        {
            this.con.addChild(this.defCon)
        }

        this.con.addChild(this.chapterCon)
    }
}