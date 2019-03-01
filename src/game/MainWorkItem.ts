class MainWorkItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "MainWorkItemSkin";
    }

    private con: eui.Group;
    private bg: eui.Image;
    private numText: eui.Label;
    private desText: eui.Label;
    private setBtn: eui.Image;
    private redMC: eui.Image;
    private lockText: eui.Label;












    private monsterArr = []
    public teamID
    private maxCost = 10000;

    public childrenCreated() {
        super.childrenCreated();

    }

    public dataChanged(){
        if(WorkManager.getInstance().getOpenWork() >= this.data.id)
        {
            this.showList();
        }
        else
        {
            this.currentState = 'lock'
            this.lockText.text = '1111'
        }
    }

    private showList() {

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
            item.bottom = 50+vo.height*0.1 - 2 + 4*Math.random();
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
        this.bg.source = PKManager.getInstance().getWorkBG(this.data.id)


        var max = WM.getWorkNum();
        var localMax = this.data.id*10;
        if(localMax >= max)
            localMax = 10;
        else
            localMax = localMax%10;

        this.numText.text = arr.length + '/' + localMax;
        this.desText.text = '矿坑' + this.data.id;
        this.redMC.visible = arr.length < localMax && MonsterManager.getInstance().getFreeMonster().length > 0
    }

    public onE(){
        if(this.currentState == 'lock')
            return
        var t = UM.nowMS();
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