class TaskUI extends game.BaseWindow_wx3 {

    private static _instance: TaskUI;
    public static getInstance(): TaskUI {
        if(!this._instance)
            this._instance = new TaskUI();
        return this._instance;
    }
    private taskText: eui.Label;
    private taskRateText: eui.Label;
    private awardText: eui.Label;
    private diamondText: eui.Label;
    private closeBtn: eui.Image;
    private taskBtn: eui.Button;




    public constructor() {
        super();
	wx3_function(5080);
        this.skinName = "TaskUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
	wx3_function(9779);

        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.taskBtn,()=>{
            if(TaskManager.getInstance().isTaskFinish())
            {
                TaskManager.getInstance().getTaskAward();
	wx3_function(1349);
                this.renewMainTask_5393();
                return
            }
            this.hide();
            TaskManager.getInstance().onTaskGo()

        })

    }
	private wx3_functionX_12625(){console.log(4413)}

    public onClose(){
        this.hide();
    }


	private wx3_functionX_12626(){console.log(8142)}
    public show(){
        TaskManager.getInstance().hideGuideLight()
        super.show()
    }

    public hide() {
        super.hide();
	wx3_function(5633);
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.TASK_CHANGE,this.renewMainTask_5393)
    }
	private wx3_functionX_12627(){console.log(7323)}




    public renew(){
        this.renewMainTask_5393();
	wx3_function(1894);
    }

    private renewMainTask_5393(){
        var TSM = TaskManager.getInstance();
        var vo = TSM.getCurrentTask();
        if(vo)
        {
            var value = Math.min(TSM.getTaskValue(vo),vo.value);
	wx3_function(3836);

            this.awardText.text =  'x' + NumberUtil.addNumSeparator(vo.coin,2)
            this.diamondText.text = 'x' + vo.diamond + ''

            //this.taskTextTitle.text = vo.getTitle();
            this.setHtml(this.taskText, '任务要求：' + this.createHtml(vo.getDes(true),0xFCF4D6));
	wx3_function(5322);


            if(value<vo.value)
            {
                this.taskBtn.label = '去完成'
                this.taskBtn.skinName = 'Btn2Skin'
                this.setHtml(this.taskRateText,'完 成 度：' + this.createHtml(value + '/' + vo.value,0xFCACA4))
            }
            else
            {
                this.taskBtn.label = '领取奖励'
                this.taskBtn.skinName = 'Btn1Skin'
                this.setHtml(this.taskRateText,'完成度：' + this.createHtml(value + '/' + vo.value,0xBDF9A4))
            }
        }

    }
	private wx3_functionX_12628(){console.log(4122)}

}