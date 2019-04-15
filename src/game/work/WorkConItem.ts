class WorkConItem extends game.BaseItem{

    private timeText: eui.Label;
    private list: eui.List;
    private redMC: eui.Image;



    public constructor() {
        super();
        this.skinName = "WorkConItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.list.itemRenderer = WorkItem;
        this.addBtnEvent(this,this.onClick)
    }

    private onClick(){
        switch(this.data.type)
        {
            case 'def':
                MonsterManager.getInstance().editDef();
                break;
            case 'work':
                WorkManager.getInstance().editWork(this.data.index)
                break;
            case 'task':
                TaskUI2.getInstance().show()
                break;
        }
    }

    public dataChanged():void {
        this.redMC.visible = this.data.red;
        this.list.dataProvider = new eui.ArrayCollection(this.data.list);
        switch(this.data.type)
        {
            case 'atk':
                this.onTimer();
                break;
            case 'def':
                this.timeText.text = '防守中（'+this.data.list.length+' / '+this.data.maxNum+'）';
                break;
            case 'work':
                this.timeText.text = this.data.index + '号坑-采矿中（'+this.data.list.length+' / '+this.data.maxNum+'）';
                break;
            case 'free':
                this.timeText.text = '空闲中（'+this.data.maxNum+'）';
                break;
            case 'task':
                this.onTimer();
                break;
        }

    }

    public onTimer(){
        if(this.data.type == 'atk')
        {
            var data = this.data.data;
            var cd =  TM.now() - data.time;
            var robot = data.robot;
            var str = ''
            if(data.result)
            {
                cd = robot.distanceTime*2 - cd;
                if(data.result == 2)
                {
                    str = '攻打【'+robot.nick+'】胜利，正在返回';
                }
                else
                    str = '攻打【'+robot.nick+'】失利，正在返回';
            }
            else if(data.backTime)
            {
                cd = data.backTime - TM.now();
                str = '正在从【'+robot.nick+'】撤回中'
            }
            else
            {
                cd = robot.distanceTime - cd;
                str = '正在前往攻打【'+robot.nick+'】'
            }
            this.timeText.text = str + ' （' + DateUtil.getStringBySecond(cd).substr(-5) + '）';
        }
        else if(this.data.type == 'task')
        {
            var data = this.data.data
            var str =  '任务【'+TaskManager.getInstance().dayTaskBase[data.id].name+'】中';
            var totalTime = data.cd*3600;
            var cd = TM.now() - data.time
            if(cd > totalTime) //完成
            {
                this.redMC.visible = true;
                this.timeText.text = str + ' （已完成）';
            }
            else
            {
                this.redMC.visible = false;
                this.timeText.text = str + ' （'+DateUtil.getStringBySecond(totalTime-cd)+'）';
            }
        }
    }


}