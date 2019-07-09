class AskManager {
    private static _instance:AskManager;
    public static getInstance():AskManager {
        if (!this._instance)
            this._instance = new AskManager();
        return this._instance;
    }
    public askData;

   public init(){
       if(this.askData)
           return;
       var data = RES.getRes('ask_txt').replace(/\r/g,'');
       this.askData = data.split('\n')
       for(var i=0;i<this.askData.length;i++)
       {
           var temp = this.askData[i].split('|')
           this.askData[i] = {
               id:i+1,
               list1:temp[0],
               list2:temp[1],
               cost:parseInt(temp[2]),
               seed:parseInt(temp[3]),
               level:parseInt(temp[4]),
           }
       }
   }

    public getGuessData(){
        this.init();
        return this.askData[UM_wx3.askLevel-1];
    }

    public showPK(){
        var data = this.getGuessData();
        if(!data)
        {
            MyWindow.Alert('新的关卡即将上线')
            return;
        }
        var enemy = {
            bgid:UM_wx3.askLevel%7 || 7,
            list:data.list1,
            seed:data.seed,
            force:10000
        }
        PKPosUI.getInstance().show({
            title:'关卡解迷 - NO.' + UM_wx3.askLevel,
            type:'ask',
            isPK:true,
            isAtk:true,
            enemy:enemy,
            list2:this.getAskChooseList(data),
            maxNum:data.list2.split(',').length,
            maxCost:data.cost,
            fun:(list)=>{
                PKPosUI.getInstance().hide();
                var pkObj:any = {
                    isAsk:true,
                    isReplay:true,
                    title:'关卡解迷 - NO.' + UM_wx3.askLevel,
                    seed:data.seed,
                    list1:data.list1,
                    force1:10000,
                    mforce1:{},
                    list2:list,
                    force2:10000,
                    mforce2:{}
                }
                MainPKUI_wx3.getInstance().show(pkObj);
            },
        })
    }

    public getAskChooseList(question) {
        var arr = [];
        var arr2 = [];
        var answer = question.list2.split(',')
        var data = MonsterManager.getInstance().getOpenMonster(question.level);
        var maxMonster = Math.max(Math.min(18,Math.floor(data.length*0.6)),5)
        for (var s in data) {
            if (answer.indexOf(data[s].id + '') == -1) {
                arr2.push(data[s])
            }
            else {
                arr.push(data[s].id)
            }
        }
        ArrayUtil.sortByField(arr2,['id'],[0])
        var PKM = PKManager_wx3.getInstance();
        PKM.randomSeed = (question.seed * 1.66);
        while (arr.length < maxMonster && arr2.length > 0)
        {
            var index = Math.floor(PKM.random()*arr2.length)
            arr.push(arr2[index].id)
            arr2.splice(index,1);
        }

        return arr;
    }


}