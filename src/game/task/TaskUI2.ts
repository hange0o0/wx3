class TaskUI2 extends game.BaseWindow {

    private static _instance: TaskUI2;
    public static getInstance(): TaskUI2 {
        if(!this._instance)
            this._instance = new TaskUI2();
        return this._instance;
    }
	private wx3_functionX_12634(){console.log(5880)}

    private closeBtn: eui.Image;
    private scroller: eui.Scroller;
    private list: eui.List;


	private wx3_functionX_12635(){console.log(4255)}





    private dataProvider:eui.ArrayCollection
	private wx3_functionX_12636(){console.log(9774)}

    public constructor() {
        super();
        this.skinName = "TaskUI2Skin";
    }

	private wx3_functionX_12637(){console.log(8300)}
    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)

        this.list.itemRenderer = TaskItem
        this.scroller.viewport = this.list;
	wx3_function(1809);
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();

    }

    public onClose(){
        this.hide();
	wx3_function(8435);
    }


    public show(){
        super.show()
    }
	private wx3_functionX_12638(){console.log(7483)}

    public hide() {
        super.hide();
        TaskManager.getInstance().taskFinish = TaskManager.getInstance().testTaskFinish();
        TaskManager.getInstance().newRed = false;
        EM_wx3.dispatch(GameEvent.client.TASK_CHANGE)
    }
	private wx3_functionX_12639(){console.log(5431)}

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer_8524)
        this.addPanelOpenEvent(GameEvent.client.TASK_CHANGE,this.renewFeederTask_1556)
    }
	private wx3_functionX_12640(){console.log(6866)}

    private onTimer_8524(){
        MyTool.runListFun(this.list,'onTimer')
    }


	private wx3_functionX_12641(){console.log(5868)}
    public renew(){
        this.renewFeederTask_1556();
        this.scroller.viewport.scrollV = 0;
    }


	private wx3_functionX_12642(){console.log(2763)}
    private renewFeederTask_1556(){
        this.dataProvider.source = UM_wx3.dayTask;
        this.dataProvider.refresh();

    }
}