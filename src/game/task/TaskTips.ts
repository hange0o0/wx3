class TaskTips extends game.BaseContainer_wx3 {

    private static instance:TaskTips;
    public static getInstance() {
        if (!this.instance) this.instance = new TaskTips();
        return this.instance;
    }

    private tipsText: eui.Label;
    private arrIn;

    public constructor() {
        super();
        this.skinName = "TaskTipsSkin";

    }

    public childrenCreated() {
        super.childrenCreated();
        this.bottom = 10 + GameManager_wx3.paddingBottom()
        this.right = 10
        this.addBtnEvent(this,this.hide)
    }

    public hide(){
        MyTool.removeMC(this)
        EM_wx3.removeEventListener(GameEvent.client.TASK_CHANGE,this.renewTask,this)
    }

    public show(arr){
        this.arrIn = arr;
        var TSM = TaskManager.getInstance();
        var vo = TSM.getCurrentTask();
        if(vo && arr.indexOf(vo.type) != -1 && !TSM.isTaskFinish())
        {
            GameManager_wx3.container.addChild(this);
            this.renewTask();
            EM_wx3.addEventListener(GameEvent.client.TASK_CHANGE,this.renewTask,this)
        }
        else
        {
            this.hide();
        }
    }

    private renewTask(){
        var TSM = TaskManager.getInstance();
        var vo = TSM.getCurrentTask();
        if(vo && this.arrIn.indexOf(vo.type) != -1 && !TSM.isTaskFinish())
        {
            var value = Math.min(TSM.getTaskValue(vo),vo.value);
            this.setHtml(this.tipsText,'任务要求：' + this.createHtml(vo.getDes(true),0xFCF4D6) + '\n' + '完 成 度：' + this.createHtml(value + '/' + vo.value,0xFCACA4));
        }
        else
        {
            this.hide();
        }
    }
}