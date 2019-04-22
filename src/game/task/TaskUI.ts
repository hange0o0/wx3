class TaskUI extends game.BaseWindow {

    private static _instance: TaskUI;
    public static getInstance(): TaskUI {
        if(!this._instance)
            this._instance = new TaskUI();
        return this._instance;
    }
    private taskTextTitle: eui.Label;
    private taskText: eui.Label;
    private taskRateText: eui.Label;
    private awardText: eui.Label;
    private diamondText: eui.Label;
    private closeBtn: eui.Image;
    private taskBtn: eui.Button;




    public constructor() {
        super();
        this.skinName = "TaskUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.taskBtn,()=>{
            if(TaskManager.getInstance().isTaskFinish())
            {
                TaskManager.getInstance().getTaskAward();
                this.renewMainTask();
                return
            }
            this.hide();
            TaskManager.getInstance().onTaskGo()

        })

    }

    public onClose(){
        this.hide();
    }


    public show(){
        TaskManager.getInstance().hideGuideLight()
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.TASK_CHANGE,this.renewMainTask)
    }




    public renew(){
        this.renewMainTask();
    }

    private renewMainTask(){
        var TSM = TaskManager.getInstance();
        var vo = TSM.getCurrentTask();
        if(vo)
        {
            var value = Math.min(TSM.getTaskValue(vo),vo.value);

            this.awardText.text =  'x' + NumberUtil.addNumSeparator(vo.coin,2)
            this.diamondText.text = 'x' + vo.diamond + ''

            this.taskTextTitle.text = vo.getTitle();
            this.setHtml(this.taskText, '要求：' + this.createHtml(vo.getDes(),0xFFFFFF));


            if(value<vo.value)
            {
                this.taskBtn.label = '去完成'
                this.taskBtn.skinName = 'Btn2Skin'
                this.setHtml(this.taskRateText,'完成度：' + this.createHtml(value + '/' + vo.value,0xFF0000))
            }
            else
            {
                this.taskBtn.label = '领取奖励'
                this.taskBtn.skinName = 'Btn1Skin'
                this.setHtml(this.taskRateText,'完成度：' + this.createHtml(value + '/' + vo.value,0x00ff00))
            }
        }

    }

}