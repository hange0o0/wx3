class TaskUI extends game.BaseWindow {

    private static _instance: TaskUI;
    public static getInstance(): TaskUI {
        if(!this._instance)
            this._instance = new TaskUI();
        return this._instance;
    }

    private iconMC: eui.Image;
    private awardText: eui.Label;
    private taskTextTitle: eui.Label;
    private taskText: eui.Label;
    private taskRateText: eui.Label;
    private taskBtn: eui.Button;
    private closeBtn: eui.Image;
    private scroller: eui.Scroller;
    private list: eui.List;






    private dataProvider:eui.ArrayCollection

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

        this.list.itemRenderer = TaskItem
        this.scroller.viewport = this.list;
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();

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
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
    }

    private onTimer(){
        MyTool.runListFun(this.list,'onTimer')
    }


    public renew(){
        this.renewMainTask();
        this.renewFeederTask();
    }

    private renewMainTask(){
        var TSM = TaskManager.getInstance();
        var vo = TSM.getCurrentTask();
        if(vo)
        {
            var value = Math.min(TSM.getTaskValue(vo),vo.value);
            this.currentState = 's1';

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
            this.taskRateText.text = '完成度：' + value + '/' + vo.value;

            if(value<vo.value)
            {
                this.taskBtn.label = '去完成'
                this.taskBtn.skinName = 'Btn2Skin'
            }
            else
            {
                this.taskBtn.label = '领取奖励'
                this.taskBtn.skinName = 'Btn1Skin'
            }
        }
        else
        {
            this.currentState = 's2';
        }
    }

    private renewFeederTask(){

    }
}