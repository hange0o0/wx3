class ChapterManager {
    private static _instance:ChapterManager;
    public static getInstance():ChapterManager {
        if (!this._instance)
            this._instance = new ChapterManager();
        return this._instance;
    }

    public maxEarn = 0;
    public resultEarn:any;

    public pkChapter(id){
        if(id <= UM.chapterLevel + 1)
        {
            if(UM.getEnergy() < 1)
            {
                MyWindow.ShowTips('体力不足')
                return;
            }
            var chapterData = PKManager.getInstance().chapterData[id-1]
            var enemy = {
                bgid:id%7 || 7,
                list:chapterData.list1,
                seed:Math.ceil((Math.random() + 1)*10000000000),
                force:Math.floor(Math.pow(id - 1,1.25)*10)
            }
            PKPosUI.getInstance().show({
                title:'收复据点 - NO.' + id,
                autoList:true,
                isPK:true,
                isAtk:true,
                type:'chapter',
                enemy:enemy,
                maxNum:TecManager.getInstance().getTeamNum(),
                maxCost:TecManager.getInstance().getTeamCost(),
                fun:(list)=>{
                    PKBuffUI.getInstance().show((atkBuff,hpBuff)=>{
                        PKPosUI.getInstance().hide();
                        UM.addEnergy(-1);
                        var pkObj:any = {
                            chapterid:id,
                            title:'收复据点 - NO.' + id,
                            seed:enemy.seed,
                            list1:chapterData.list1,
                            force1:enemy.force,
                            mforce1:{},
                            list2:list,
                            atkBuff2:atkBuff,
                            hpBuff2:hpBuff,
                            force2:TecManager.getInstance().getAtkForce() + BuffManager.getInstance().getForceAdd(),
                            mforce2:MonsterManager.getInstance().getMonsterPKForce(list)
                        }
                        var result = PKManager.getInstance().getPKResult(pkObj);
                        if(result == 2)
                        {
                            PKData.instanceIndex = 2;
                            var hpObj = PKData.getInstance().getHpData();
                            var hpRate2 =  (hpObj[2] || 0)/(hpObj['2_max'] || 1)
                            if(hpRate2 >= 0.6)
                                this.setChapterStar(id,3);
                            else if(hpRate2 >= 0.3)
                                this.setChapterStar(id,2);
                            else
                                this.setChapterStar(id,1);
                            PKData.instanceIndex = 1;
                            UM.addCoin(this.resultEarn.coin)
                            UM.addDiamond(this.resultEarn.diamond)
                            pkObj.coin = this.resultEarn.coin
                            pkObj.diamond = this.resultEarn.diamond
                            pkObj.star = this.resultEarn.star
                            pkObj.showTaskChange = true
                        }
                        else
                        {
                            this.resultEarn = null;
                        }
                        MainPKUI.getInstance().show(pkObj);
                        EM.dispatch(GameEvent.client.CHAPTER_CHANGE)
                    })
                },
            })
        }
    }

    //取章节星星数
    public getChapterStar(id){
        if(UM.chapterLevel<id)
            return 0;
        return UM.chapterStar[id] || 3
    }

    public getTotalStar(){
        var count = 0;
        for(var i=0;i<UM.chapterLevel;i++)
        {
            count += this.getChapterStar(i+1)
        }
        return count;
    }

    public setChapterStar(id,star){
        var lastStar = this.getChapterStar(id);
        var b = false;
        if(UM.chapterLevel<id)
        {
            UM.chapterLevel = id
            b = true;
            UM.upWXChapter();

        }
        this.resultEarn = {
            star:star,
            coin:id*10*star
        }

        if(lastStar < star)  //升星
        {
            b = true;
            this.resultEarn.coin = (star - lastStar)*id*200;
            if(star == 3)
            {
                delete UM.chapterStar[id];
                this.resultEarn.diamond = Math.ceil(id/30)
            }
            else
                UM.chapterStar[id] = star;
        }
        if(b)
        {
            UM.needUpUser = true;
            this.setChapterEarn();
        }
        if(!UM.chapterResetTime)
            UM.chapterResetTime = TM.now()

    }

    //取单次收益
    public setChapterEarn(){
        var coin = 0;
        for(var i=0;i<UM.chapterLevel;i++)
        {
            coin += i+1;
        }
        this.maxEarn =coin;
        UM.resetHourEarn();
    }

    //只存12小时
    public getMaxChapterCoin(){
        return this.maxEarn*(3600*12/this.collectCD)
    }

    //取当前已收集的金币(每2分钟结算一次)
    public collectCD = 60*2;
    public getChapterCoin(){
        var collectCD = this.collectCD;
        var coin = this.maxEarn;
        var maxCoin = this.getMaxChapterCoin()//只收集一天
        var num = Math.floor((TM.now() - UM.chapterResetTime)/collectCD)
        if(num > 0)
        {
            UM.chapterResetTime += num*collectCD;
            UM.chapterCoin = Math.min( UM.chapterCoin + num*coin,maxCoin);
        }
        return UM.chapterCoin;
    }

}