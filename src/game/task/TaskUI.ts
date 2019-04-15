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
    private iconMC: eui.Image;
    private awardText: eui.Label;
    private closeBtn: eui.Image;
    private taskBtn: eui.Button;



    public constructor() {
        super();
        this.skinName = "TaskUISkin";
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

            if(vo.coin)
            {
                this.awardText.text = NumberUtil.addNumSeparator(vo.coin,2)
                this.iconMC.source = 'icon_coin_png'
            }
            else
            {
                this.awardText.text = vo.diamond + ''
                this.iconMC.source = 'icon_diamond_png'
            }

            this.taskTextTitle.text = vo.getTitle();
            this.taskText.text = '要求：' + vo.getDes();


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