class TaskInfoUI extends game.BaseWindow_wx3 {

    private static _instance: TaskInfoUI;
    public static getInstance(): TaskInfoUI {
        if(!this._instance)
            this._instance = new TaskInfoUI();
        return this._instance;
    }

    private cancelBtn: eui.Button;
    private taskBtn: eui.Button;
    private item: TaskItem;


    public data;
    public constructor() {
        super();
        this.skinName = "TaskInfoUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.cancelBtn,this.hide)
        this.addBtnEvent(this.taskBtn,()=>{
            PKPosUI.getInstance().show({
                title:'接受【'+TaskManager.getInstance().dayTaskBase[this.data.id].name+'】任务',
                type:'task',
                taskData:this.data,
                maxNum:this.data.num,
                maxCost:Number.MAX_VALUE,
                fun:(list)=>{
                    this.data.list = list;
                    this.data.time = TM_wx3.now();
                    UM_wx3.dayTask.push(this.data)
                    PKPosUI.getInstance().hide();
                    this.hide();
                    UM_wx3.needUpUser = true;
                    EM_wx3.dispatch(GameEvent.client.TASK_CHANGE)
                },
            })
        })
    }

    public show(data?){
        this.data = data;
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
    }

    public renew(){
        this.item.data = this.data;
    }
}