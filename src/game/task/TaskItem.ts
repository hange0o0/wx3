class TaskItem extends game.BaseItem{

    private nameText: eui.Label;
    private desText: eui.Label;
    private timeText: eui.Label;
    private taskIcon: eui.Image;
    private awardText: eui.Label;
    private goBtn: eui.Button;
    private cdGroup: eui.Group;
    private barMC: eui.Rect;
    private cdText: eui.Label;



    public constructor() {
        super();
        this.skinName = "TaskItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.goBtn,this.onClick)
    }

    private onClick(e){
         if(this.goBtn.label == '接单')
         {
             PKPosUI.getInstance().show({
                 title:'接受【'+TaskManager.getInstance().dayTaskBase[this.data.id].name+'】任务',
                 type:'task',
                 taskData:this.data,
                 maxNum:this.data.num,
                 maxCost:Number.MAX_VALUE,
                 fun:(list)=>{
                     PKPosUI.getInstance().hide();
                     this.data.list = list;
                     this.data.time = TM.now();
                     this.dataChanged();
                     UM.needUpUser = true;
                 },
             })
         }
        else
         {
             UM.addCoin(this.data.award);
             var index = UM.dayTask.indexOf(this.data);
             if(index != -1)
             {
                 UM.dayTask.split(index,1);
                 EM.dispatch(GameEvent.client.TASK_CHANGE)
             }
             UM.needUpUser = true;
         }
    }

    public dataChanged():void {
         var data = this.data;
         this.nameText.text = TaskManager.getInstance().dayTaskBase[data.id].name
         this.awardText.text = NumberUtil.addNumSeparator(data.award)
        this.taskIcon.source = 'task'+data.id+'_jpg'
        this.setHtml(this.timeText,'需要时间：'+ this.createHtml(data.cd + '小时',0xFFFFFF))
        this.setHtml(this.desText, '需要怪物：'+ this.createHtml(data.num + '个',0xFFFFFF))
        if(data.time)
        {
            this.onTimer()
        }
        else
        {
            this.goBtn.visible = true
            this.goBtn.label = '接单'
            this.goBtn.skinName = 'Btn2Skin'
            this.cdGroup.visible = false
        }
    }

    public onTimer(){
        var data = this.data;
        if(data.time)
        {
            var totalTime = data.cd*3600;
            var cd = TM.now() - data.time
            if(cd > totalTime) //完成
            {
                this.goBtn.visible = true
                this.goBtn.label = '领奖'
                this.goBtn.skinName = 'Btn1Skin'
                this.cdGroup.visible = false
            }
            else
            {
                this.goBtn.visible = false
                this.cdGroup.visible = true
                this.cdText.text = DateUtil.getStringBySecond(totalTime - cd)
                this.barMC.width = cd/totalTime*150
            }
        }
    }


}