class GuessLogItem extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "GuessLogItemSkin";
    }

    private timeText: eui.Label;
    private resultGroup1: eui.Group;
    private myText1: eui.Label;
    private winMC: eui.Image;
    private resultGroup2: eui.Group;
    private myText2: eui.Label;
    private list1: eui.List;
    private list2: eui.List;










    public childrenCreated() {
        super.childrenCreated();
        this.touchChildren = false;
        this.list1.itemRenderer = WorkItem
        this.list2.itemRenderer = WorkItem
        this.addBtnEvent(this,this.onClick)
    }


    private onClick(){
        var pkObj = ObjectUtil.clone(this.data)
        pkObj.title = '限时竞猜 ' + this.timeText.text;
        pkObj.isGuess = true;
        pkObj.isReplay = true
        MainPKUI_wx3.getInstance().show(pkObj);
    }

    public dataChanged(){
        var list1 = [];
        var temp = this.data.list1.split(',')
        for(var i=0;i<temp.length && i<8;i++)
        {
            list1.push({
                id:temp[i],
                num:0
            })
        }
        this.list1.dataProvider = new eui.ArrayCollection(list1);


        var list1 = [];
        var temp = this.data.list2.split(',')
        for(var i=0;i<temp.length && i<8;i++)
        {
            list1.push({
                id:temp[i],
                num:0
            })
        }
        this.list2.dataProvider = new eui.ArrayCollection(list1);
        this.timeText.text = GuessManager.getInstance().getDayStrByKey(this.data.index)

        var green = 0x66ff66
        var white = 0xFFEDC9
        var red = 0xFF6666

        this.myText1.text = '投注：' + NumberUtil.addNumSeparator(this.data.coin1,2)
        if(this.data.coin1)
            this.myText1.textColor = this.data.result==1?green:red
        else
            this.myText1.textColor = white

        this.myText2.text = '投注：' + NumberUtil.addNumSeparator(this.data.coin2,2)
        if(this.data.coin2)
            this.myText2.textColor = this.data.result==2?green:red
        else
            this.myText2.textColor = white

        if(this.data.result==1)
            this.resultGroup1.addChild(this.winMC)
        else
            this.resultGroup2.addChild(this.winMC)



        //var showData = this.data;
        //var roundData = showData.roundData;
        //var PKM = PKManager.getInstance();
        //var addCoin = PKM.getAddCoin(showData,showData.result,roundData);
        //var finalCoin = this.finalCoin = addCoin - showData.cost1 - showData.cost2;
        //
        //var costData = PKM.getCost(roundData.seed,60*10)
        //var cost1 = costData.cost1 + showData.teamCost1
        //var cost2 = costData.cost2 + showData.teamCost2
        //var force1 = PKM.getForceAdd(cost1) + PKM.baseForce;
        //var force2 = PKM.getForceAdd(cost2) + PKM.baseForce
        //
        //this.cost1.text = NumberUtil.addNumSeparator(parseInt(cost1));
        //this.cost2.text = NumberUtil.addNumSeparator(parseInt(cost2));
        //this.myCost1.text = NumberUtil.addNumSeparator(showData.cost1);
        //this.myCost2.text = NumberUtil.addNumSeparator(showData.cost2);
        //this.force1.text = NumberUtil.addNumSeparator(force1)
        //this.force2.text = NumberUtil.addNumSeparator(force2)
        //
        //var green = 0x66ff66
        //var green2 = 0x006600
        //var white = 0xFFEDC9
        //var red = 0xcc0000
        //var red2 = 0xFF6666
        //var yellow = 0xFFCC66
        //
        //this.cost1.textColor = cost1>cost2?green:white
        //this.cost2.textColor = cost1<cost2?green:white
        //
        //this.myCost1.textColor = showData.cost1 > 0?green:white
        //this.myCost2.textColor = showData.cost2 > 0?green:white
        //this.force1.textColor = force1>force2?green:white
        //this.force2.textColor = force1<force2?green:white
        //
        //
        //if(showData.result ==1)
        //{
        //    this.resultText1.text = '胜利'
        //    this.resultText2.text = '失败'
        //    this.resultText1.textColor = green
        //    this.resultText2.textColor = red2
        //}
        //else if(showData.result ==2)
        //{
        //    this.resultText2.text = '胜利'
        //    this.resultText1.text = '失败'
        //    this.resultText2.textColor = green
        //    this.resultText1.textColor = red2
        //}
        //else
        //{
        //    this.resultText2.text = '平局'
        //    this.resultText1.text = '平局'
        //    this.resultText2.textColor = yellow
        //    this.resultText1.textColor = yellow
        //}
        //
        //this.coinText.text = finalCoin>=0?('+' + finalCoin):('' + finalCoin);
        //this.coinText.textColor = finalCoin>=0?green2:red;
        //this.timeText.text = PKM.getDayStrByKey(showData.key)
        //this.coinBtn.visible = !this.data.coinBack && this.finalCoin < -100;

        //if(showData.result == 3)
        //    this.desText.text = '双方平手，最终收益>'
        //else
        //    this.desText.text = showData.result +  '队获胜，最终收益>'
    }

}