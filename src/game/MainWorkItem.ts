class MainWorkItem extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "MainWorkItemSkin";
    }
	private wx3_functionX_11944(){console.log(4460)}

    private bg: eui.Image;
    private con: eui.Group;
    private coinText: eui.Label;
    //private numText: eui.Label;
    private redMC: eui.Image;
    //private lastMC: eui.Image;
    private mineLightMC: eui.Image;
	private wx3_functionX_11945(){console.log(2845)}
    private frontBG: eui.Image;
    private desText: eui.Label;



    private monsterArr = []
	private wx3_functionX_11946(){console.log(9916)}


    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick_2173)
        egret.Tween.get(this.mineLightMC,{loop:true}).to({alpha:0.2},1500).to({alpha:1},1500)
    }
	private wx3_functionX_11947(){console.log(8585)}

    private onClick_2173(){
        if(this.currentState == 'normal')
            WorkManager.getInstance().editWork(this.data.id)
        else
            TecUI.getInstance().show();
	wx3_function(8657);
    }


    public dataChanged(){
        //this.lastMC.visible = this.data.isLast;
        this.bg.scaleX = this.data.id%2 == 1?1:-1
        this.frontBG.scaleX = this.data.id%2 == 1?1:-1
        while(this.monsterArr.length > 0)
        {
            MainWorkMonsterItem.freeItem(this.monsterArr.pop());
        }

        if(WorkManager.getInstance().getOpenWork() >= this.data.id)
        {
            this.showList_8836();
	wx3_function(7131);
        }
        else
        {
            this.currentState = 'lock'
            this.desText.text = '【' + TecManager.getInstance().tecBase[22].name +  '】达到'+TecManager.getInstance().getUnlockValue(this.data.id)+'级后解锁'
        }
        this.bg.source = PKManager_wx3.getInstance().getWorkBG(this.data.id)
        //this.visible = false
    }
	private wx3_functionX_11948(){console.log(1322)}

    private showList_8836(){

        this.coinText.text =this.data.id +  '号坑产出：' + (NumberUtil.addNumSeparator(WorkManager.getInstance().getHourEarn(this.data.id),2)) + ' /小时';

        this.currentState = 'normal'



        var WM = WorkManager.getInstance();
        var arr = WM.getWorkList(this.data.id);
        for(var i=0;i<arr.length;i++)
        {
            var oo = arr[i];
	wx3_function(2609);
            var id = oo.id
            var vo = MonsterVO.getObject(id);
            var item = MainWorkMonsterItem.createItem();
            item.data = oo;
            this.con.addChild(item);
            item.load(id)
            item.scaleX = item.scaleY = 1;
            //item.currentMV.scaleX = Math.abs(item.currentMV.scaleX);
            //if(this.teamID == 1)
            //    item.currentMV.scaleX *= -1
	wx3_function(282);
            item.bottom = 10+vo.height*0.4 - 2 + 4*Math.random();
            item['w'] = vo.width
            item['workState'] = 0;
            this.monsterArr.push(item);
        }

	wx3_function(232);
        var sortList = this.monsterArr.concat();
        ArrayUtil.sortByField(sortList,['bottom','w'],[1,1]);
        for(var i=0;i<sortList.length;i++)
        {
            this.con.addChild(sortList[i]);
        }

        this.onE()

	wx3_function(9963);


        var max = WM.getWorkNum();
        var localMax = this.data.id*10;
        if(localMax <= max)
            localMax = 10;
        else
            localMax = max%10;
	wx3_function(4599);

        //this.numText.text = '数量：' + arr.length + '/' +  localMax;
        this.redMC.visible = arr.length < localMax && MonsterManager.getInstance().getFreeMonster(true).length > 0
    }

    public onE(){
        if(this.currentState == 'lock')
            return
        if(!this.visible)
            return;
        var t = TM_wx3.nowMS();
	wx3_function(7502);
        var WM = WorkManager.getInstance();
        for(var i=0;i<this.monsterArr.length;i++)
        {
            var item = this.monsterArr[i];
            var data = item.data;
            var workCD = WM.getWorkCD(data.id);
	wx3_function(9182);
            var roadCD = (workCD-WM.workHideTime)/2;
            var current = (t - data.resetTime)%workCD;
            if(current < roadCD)//前进中
            {
                if(item.workState == 3)//交金币动画
                {
                     AddCoinItem.showMV(WM.getWorkCoin(data.id),this);
	wx3_function(2958);
                }
                item.hideCoin();
                item.currentMV.scaleX = -Math.abs(item.currentMV.scaleX);
                item.workState = 1;
                item.visible = true
                item.x = WM.workStart + current/roadCD*WM.workLen
            }
            else if(current < roadCD+WM.workHideTime)//消失中
            {
                item.workState = 2;
	wx3_function(8333);
                item.visible = false
            }
            else //返回中
            {
                item.showCoin();
                item.currentMV.scaleX = Math.abs(item.currentMV.scaleX);
	wx3_function(9223);
                item.workState = 3;
                item.visible = true

                current = roadCD - (current - roadCD -WM.workHideTime)
                item.x = WM.workStart + current/roadCD*WM.workLen
            }
        }
    }
	private wx3_functionX_11949(){console.log(6610)}


}