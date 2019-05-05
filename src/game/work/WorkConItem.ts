class WorkConItem extends game.BaseItem_wx3{

    private timeText: eui.Label;
    private list: eui.List;
    private redMC: eui.Image;
	private wx3_functionX_12654(){console.log(4974)}



    public constructor() {
        super();
        this.skinName = "WorkConItemSkin";
	wx3_function(1938);
    }

    public childrenCreated() {
        super.childrenCreated();
        this.list.itemRenderer = WorkItem;
        this.addBtnEvent(this,this.onClick_2202)
    }
	private wx3_functionX_12655(){console.log(2709)}

    private onClick_2202(){
        switch(this.data.type)
        {
            case 'def':
                MonsterManager.getInstance().editDef();
	wx3_function(9505);
                break;
            case 'work':
                WorkManager.getInstance().editWork(this.data.index)
                break;
            case 'task':
                TaskUI2.getInstance().show()
                break;
            case 'free':
                WorkFreeUI.getInstance().show()
                break;
            case 'atk':
                FightUI.getInstance().show()
                break;
        }
    }
	private wx3_functionX_12656(){console.log(533)}

    public dataChanged():void {
        this.redMC.visible = this.data.red;
        this.list.dataProvider = new eui.ArrayCollection(this.data.list);
        switch(this.data.type)
        {
            case 'atk':
                this.onTimer();
	wx3_function(5077);
                break;
            case 'def':
                this.timeText.text = '防守中（'+this.data.list.length+' / '+this.data.maxNum+'）';
                break;
            case 'work':
                this.timeText.text = this.data.index + '号坑-采矿中（'+this.data.list.length+' / '+this.data.maxNum+'）';
	wx3_function(1186);
                break;
            case 'free':
                this.timeText.text = '空闲中（'+this.data.maxNum+'）';
                break;
            case 'task':
                this.onTimer();
	wx3_function(2008);
                break;
        }

    }

    public onTimer(){
        if(this.data.type == 'atk')
        {
            var data = this.data.data;
	wx3_function(4682);
            var cd =  TM_wx3.now() - data.time;
            var robot = data.robot;
            var str = ''
            if(data.result)
            {
                cd = robot.distanceTime*2 - cd;
	wx3_function(4429);
                if(data.result == 2)
                {
                    str = '攻打【'+robot.nick+'】胜利，正在返回';
                }
                else
                    str = '攻打【'+robot.nick+'】失利，正在返回';
	wx3_function(4232);
            }
            else if(data.backTime)
            {
                cd = data.backTime - TM_wx3.now();
                str = '正在从【'+robot.nick+'】撤回中'
            }
            else
            {
                cd = robot.distanceTime - cd;
	wx3_function(8193);
                str = '正在前往攻打【'+robot.nick+'】'
            }
            this.timeText.text = str + ' （' + DateUtil.getStringBySecond(cd).substr(-5) + '）';
        }
        else if(this.data.type == 'task')
        {
            var data = this.data.data
            var str =  '任务【'+TaskManager.getInstance().dayTaskBase[data.id].name+'】中';
	wx3_function(1381);
            var totalTime = data.cd*3600;
            var cd = TM_wx3.now() - data.time
            if(cd > totalTime) //完成
            {
                this.redMC.visible = true;
                this.timeText.text = str + ' （已完成）';
	wx3_function(6328);
            }
            else
            {
                this.redMC.visible = false;
                this.timeText.text = str + ' （'+DateUtil.getStringBySecond(totalTime-cd)+'）';
            }
        }
    }
	private wx3_functionX_12657(){console.log(9465)}


}