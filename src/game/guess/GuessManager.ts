class GuessManager {

    private static _instance:GuessManager;
    public static getInstance():GuessManager {
        if (!this._instance)
            this._instance = new GuessManager();
        return this._instance;
    }
    public logs = [];

    public myGuess
    public currentGuess
    public lastGuess



    public get guessRed(){return this.myGuess && this.myGuess.result && this.myGuess.result < 10}
    private beginTime = 1561392000;//2019-6-25 0:0:0
    private stepCD = 300;
    public initData(data){
        this.myGuess = data.myGuess
        this.currentGuess = data.currentGuess

        this.logs = SharedObjectManager_wx3.getInstance().getMyValue('guess_logs') || []
        this.lastGuess = SharedObjectManager_wx3.getInstance().getMyValue('last_guess')

    }

    public getCurrentIndex(){
         return Math.floor((TM_wx3.now() - this.beginTime)/this.stepCD);
    }

    public resetMyGuess(){
        if(this.myGuess && this.myGuess.index == this.currentGuess.index)
            return;
        this.myGuess = ObjectUtil.clone(this.currentGuess);
        this.myGuess.coin1 = 0
        this.myGuess.coin2 = 0
    }

    public onTimer(){
        if(this.myGuess && !this.myGuess.result && this.myGuess.index != this.getCurrentIndex())
        {
            var result = PKManager_wx3.getInstance().getPKResult(this.myGuess)
            this.myGuess.result = result
            var addCoin = this.myGuess['coin' + result]*2
            if(addCoin)
            {
                UM_wx3.addCoin(addCoin)
                MyWindow.ShowTips('你在上一轮竞猜中，赢得了'+MyTool.createHtml(NumberUtil.addNumSeparator(addCoin),0x00ff00)+'金币',3000)
            }
            else
            {
                MyWindow.ShowTips('你在上一轮竞猜中输了，'+MyTool.createHtml('血本无归',0xFF0000),3000)
            }
            this.logs.unshift(ObjectUtil.clone(this.myGuess));
            if(this.logs.length > 20)
                this.logs.length = 20
            SharedObjectManager_wx3.getInstance().setMyValue('guess_logs',this.logs)
            EM_wx3.dispatch(GameEvent.client.GUESS_CHANGE)
            UM_wx3.needUpUser = true
        }
    }

    public getCurrentGuess(){
        var index = this.getCurrentIndex();
        if(!this.currentGuess || this.currentGuess.index != index)
        {
            if(this.currentGuess)
                this.lastGuess = ObjectUtil.clone(this.currentGuess)
            SharedObjectManager_wx3.getInstance().setMyValue('last_guess',this.lastGuess)
            DM.callLevel = TecManager.getInstance().getTecLevel(11);
            DM.repeatNum = 5;
            var cost = TecManager.getInstance().getTeamCost()
            this.currentGuess = {
                index:index,
                seed:Math.ceil(Math.random()*100000000000000),
                list1:'',
                force1:10000,
                mforce1:{},
                list2:'',
                force2:10000,
                mforce2:{},
            }
            var count = 20;
            var minObj;
            while(count--)
            {
                this.currentGuess.list1 = DM.randomList(cost)
                this.currentGuess.list2 = DM.randomList(cost)
                if(this.currentGuess.list1 != this.currentGuess.list2)
                {
                    var result = PKManager_wx3.getInstance().getPKResult(this.currentGuess)
                    if(result == 3)
                        continue;
                    PKData_wx3.instanceIndex = 2;
                    var forceObj = PKData_wx3.getInstance().getHpData();
                    var hpRate1 =  (forceObj[1] || 0)/(forceObj['1_max'] || 1)
                    var hpRate2 =  (forceObj[2] || 0)/(forceObj['2_max'] || 1)
                    PKData_wx3.instanceIndex = 1;
                    var rate = Math.max(hpRate1,hpRate2)
                    if(rate < 0.05)
                    {
                        minObj = null;
                        break;
                    }

                    if(!minObj || rate<minObj.rate)
                    {
                        minObj = {
                            list1:this.currentGuess.list1,
                            list2:this.currentGuess.list2,
                        }
                    }
                }
            }
            if(minObj)
            {
                this.currentGuess.list1 = minObj.list1;
                this.currentGuess.list2 = minObj.list2;
            }
            UM_wx3.needUpUser = true
        }
        return this.currentGuess;
    }

    public getLastGuess(){
        if(!this.lastGuess || this.lastGuess.index != this.currentGuess.index-1)
        {
             if(this.myGuess && this.myGuess.index == this.currentGuess.index-1)
             {
                 this.lastGuess = ObjectUtil.clone(this.myGuess)
             }
            else
             {
                 var cost = TecManager.getInstance().getTeamCost()
                 DM.callLevel = TecManager.getInstance().getTecLevel(11);
                 DM.repeatNum = 5;
                 while(true)
                 {
                     var list1 = DM.randomList(cost)
                     var list2 = DM.randomList(cost)
                     if(list1 != list2) {
                         this.lastGuess = {
                             index: this.currentGuess.index - 1,
                             seed: Math.ceil(Math.random() * 100000000000000),
                             list1: list1,
                             force1: 1000,
                             mforce1: {},
                             list2: list2,
                             force2: 1000,
                             mforce2: {},
                         }
                         var result = PKManager_wx3.getInstance().getPKResult(this.lastGuess)
                         if (result != 3)
                             break;
                     }
                 }
             }
            SharedObjectManager_wx3.getInstance().setMyValue('last_guess',this.lastGuess)
        }
        return this.lastGuess;
    }


    public getSave(){
        return {
            myGuess:this.myGuess,
            currentGuess:this.currentGuess,
        }
    }

    public getEndTime(){
        var index =  this.getCurrentIndex();
        return this.getFinishTimeByKey(index);
    }
    public getFinishTimeByKey(index){
        return this.beginTime +(index + 1)*this.stepCD;
    }

    public getDayStrByKey(index){
        var time = this.getFinishTimeByKey(index);
        return DateUtil.formatDate('MM-dd hh:mm',DateUtil.timeToChineseDate(time))
    }
}