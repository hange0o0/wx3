class MainWorkItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "MainWorkItemSkin";
    }

    private bg: eui.Image;
    private con: eui.Group;
    private coinText: eui.Label;
    //private numText: eui.Label;
    private redMC: eui.Image;
    private lastMC: eui.Image;
    private desText: eui.Label;



    private monsterArr = []
    public teamID
    private maxCost = 10000;

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
    }

    private onClick(){
        if(this.currentState == 'normal')
            WorkManager.getInstance().editWork(this.data.id)
        else
            TecUI.getInstance().show();
    }


    public dataChanged(){
        this.lastMC.visible = this.data.isLast;
        this.bg.scaleX = this.data.id%2 == 1?1:-1
        if(WorkManager.getInstance().getOpenWork() >= this.data.id)
        {
            this.showList();
        }
        else
        {
            this.currentState = 'lock'
            this.desText.text = '【' + TecManager.getInstance().tecBase[22].name +  '】达到'+TecManager.getInstance().getUnlockValue(this.data.id)+'级后解锁'
        }
        this.bg.source = PKManager.getInstance().getWorkBG(this.data.id)
        //this.visible = false
    }

    private showList() {

        this.coinText.text =this.data.id +  '号坑产出：' + (NumberUtil.addNumSeparator(WorkManager.getInstance().getHourEarn(this.data.id),2)) + ' /小时';

        this.currentState = 'normal'

        while(this.monsterArr.length > 0)
        {
            MainWorkMonsterItem.freeItem(this.monsterArr.pop());
        }

        var WM = WorkManager.getInstance();
        var arr = WM.getWorkList(this.data.id);
        for(var i=0;i<arr.length;i++)
        {
            var oo = arr[i];
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
            item.bottom = 10+vo.height*0.4 - 2 + 4*Math.random();
            item['w'] = vo.width
            item['workState'] = 0;
            this.monsterArr.push(item);
        }

        var sortList = this.monsterArr.concat();
        ArrayUtil.sortByField(sortList,['bottom','w'],[1,1]);
        for(var i=0;i<sortList.length;i++)
        {
            this.con.addChild(sortList[i]);
        }

        this.onE()



        var max = WM.getWorkNum();
        var localMax = this.data.id*10;
        if(localMax <= max)
            localMax = 10;
        else
            localMax = max%10;

        //this.numText.text = '数量：' + arr.length + '/' +  localMax;
        this.redMC.visible = arr.length < localMax && MonsterManager.getInstance().getFreeMonster(true).length > 0
    }

    public onE(){
        if(this.currentState == 'lock')
            return
        if(!this.visible)
            return;
        var t = TM.nowMS();
        var WM = WorkManager.getInstance();
        for(var i=0;i<this.monsterArr.length;i++)
        {
            var item = this.monsterArr[i];
            var data = item.data;
            var workCD = WM.getWorkCD(data.id);
            var roadCD = (workCD-WM.workHideTime)/2;
            var current = (t - data.resetTime)%workCD;
            if(current < roadCD)//前进中
            {
                if(item.workState == 3)//交金币动画
                {
                     AddCoinItem.showMV(WM.getWorkCoin(data.id),this);
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
                item.visible = false
            }
            else //返回中
            {
                item.showCoin();
                item.currentMV.scaleX = Math.abs(item.currentMV.scaleX);
                item.workState = 3;
                item.visible = true

                current = roadCD - (current - roadCD -WM.workHideTime)
                item.x = WM.workStart + current/roadCD*WM.workLen
            }
        }
    }


}