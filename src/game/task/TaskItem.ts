class TaskItem extends game.BaseItem_wx3{

    private nameText: eui.Label;
    private desText: eui.Label;
    private timeText: eui.Label;
	private wx3_functionX_12629(){console.log(3235)}
    private taskIcon: eui.Image;
    private awardText: eui.Label;
    private goBtn: eui.Button;
    private cdGroup: eui.Group;
    private barMC: eui.Rect;
    private cdText: eui.Label;
	private wx3_functionX_12630(){console.log(5578)}



    public constructor() {
        super();
        this.skinName = "TaskItemSkin";
	wx3_function(1899);
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.goBtn,this.onClick_5335)
    }
	private wx3_functionX_12631(){console.log(7791)}

    private onClick_5335(e){
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
	wx3_function(5947);
                     this.data.list = list;
                     this.data.time = TM_wx3.now();
                     this.dataChanged();
                     UM_wx3.needUpUser = true;
                     EM_wx3.dispatch(GameEvent.client.TASK_CHANGE)
                 },
             })
         }
        else
         {
             TaskManager.getInstance().addTaskTime = TM_wx3.now()
             SharedObjectManager_wx3.getInstance().setMyValue('addTaskTime',TaskManager.getInstance().addTaskTime)
             UM_wx3.addCoin(this.data.award);
	wx3_function(3067);
             AwardTipsUI.showTips('coin',this.data.award)
             var index = UM_wx3.dayTask.indexOf(this.data);
             if(index != -1)
             {
                 UM_wx3.dayTask.splice(index,1);
                 EM_wx3.dispatch(GameEvent.client.TASK_CHANGE)
             }
             UM_wx3.needUpUser = true;
	wx3_function(7953);
         }
    }

    public dataChanged():void {
         var data = this.data;
         this.nameText.text = TaskManager.getInstance().dayTaskBase[data.id].name
         this.awardText.text = NumberUtil.addNumSeparator(data.award,2)
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
	private wx3_functionX_12632(){console.log(4259)}

    public onTimer(){
        var data = this.data;
        if(data.time)
        {
            var totalTime = data.cd*3600;
	wx3_function(8281);
            var cd = TM_wx3.now() - data.time
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
	private wx3_functionX_12633(){console.log(5719)}


}