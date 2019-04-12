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


    private base = {
        1:{name:'1',des:'1'},
        2:{name:'2',des:'1'},
        3:{name:'3',des:'1'},
        4:{name:'41',des:'1'},
        5:{name:'51',des:'1'},
        6:{name:'16',des:'1'},
        7:{name:'7',des:'1'},
        8:{name:'8',des:'1'},
    }
    public constructor() {
        super();
        this.skinName = "TaskItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.goBtn,this.onClick)
    }

    private onClick(e){

    }

    public dataChanged():void {
         var data = this.data;
         this.nameText.text = this.base[data.id].name
         this.awardText.text = NumberUtil.addNumSeparator(data.award)
        this.taskIcon.source = ''
        this.timeText.text = '需要时间：'+ data.cd + '小时'
        this.desText.text = '需要怪物：'+ data.num + '个'
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