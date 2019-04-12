class TaskUI2 extends game.BaseWindow {

    private static _instance: TaskUI2;
    public static getInstance(): TaskUI2 {
        if(!this._instance)
            this._instance = new TaskUI2();
        return this._instance;
    }

    private closeBtn: eui.Image;
    private scroller: eui.Scroller;
    private list: eui.List;







    private dataProvider:eui.ArrayCollection

    public constructor() {
        super();
        this.skinName = "TaskUI2Skin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)

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
        this.renewFeederTask();
    }


    private renewFeederTask(){
        this.dataProvider.source = UM.dayTask;
        this.dataProvider.refresh();

    }
}