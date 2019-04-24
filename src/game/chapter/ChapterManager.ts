class ChapterManager {
    private static _instance:ChapterManager;
    public static getInstance():ChapterManager {
        if (!this._instance)
            this._instance = new ChapterManager();
        return this._instance;
    }
	private wx3_functionX_12265(){console.log(511)}

    public maxEarn = 0;
    public resultEarn:any;

    public addEnergyFull(){
        ShareTool.share('日常推荐一个好游戏',Config.localResRoot + "share_img_2.jpg",{},()=>{
            UM_wx3.addEnergy(UM_wx3.maxEnergy);
	wx3_function(4736);
        })
    }

    public pkChapter(id){
        if(id <= UM_wx3.chapterLevel + 1)
        {
            if(UM_wx3.getEnergy() < 1)
            {

                MyWindow.Confirm('体力不足,是否需要免费补满？',(b)=>{
                    if(b==1)
                    {
                        this.addEnergyFull();
	wx3_function(3343);
                    }
                },['取消', '补满']);
                return;
            }
            var chapterData = PKManager_wx3.getInstance().chapterData[id-1]
            var enemy = {
                bgid:id%7 || 7,
                list:chapterData.list1,
                seed:Math.ceil((Math.random() + 1)*10000000000),
                force:Math.floor(Math.pow(id - 1,1.2)*10)
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
	wx3_function(3980);
                        UM_wx3.addEnergy(-1);
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
                        var result = PKManager_wx3.getInstance().getPKResult(pkObj);
	wx3_function(7785);
                        if(result == 2)
                        {
                            PKData_wx3.instanceIndex = 2;
                            var hpObj = PKData_wx3.getInstance().getHpData();
                            var hpRate2 =  (hpObj[2] || 0)/(hpObj['2_max'] || 1)
                            if(hpRate2 >= 0.6)
                                this.setChapterStar(id,3);
                            else if(hpRate2 >= 0.3)
                                this.setChapterStar(id,2);
                            else
                                this.setChapterStar(id,1);
	wx3_function(6763);
                            PKData_wx3.instanceIndex = 1;
                            UM_wx3.addCoin(this.resultEarn.coin)
                            UM_wx3.addDiamond(this.resultEarn.diamond)
                            pkObj.coin = this.resultEarn.coin
                            pkObj.diamond = this.resultEarn.diamond
                            pkObj.star = this.resultEarn.star
                            pkObj.showTaskChange = true
                        }
                        else
                        {
                            this.resultEarn = null;
	wx3_function(1765);
                        }
                        MainPKUI_wx3.getInstance().show(pkObj);
                        EM_wx3.dispatch(GameEvent.client.CHAPTER_CHANGE)
                    })
                },
            })
        }
    }
	private wx3_functionX_12266(){console.log(4945)}

    //取章节星星数
    public getChapterStar(id){
        if(UM_wx3.chapterLevel<id)
            return 0;
        return UM_wx3.chapterStar[id] || 3
    }
	private wx3_functionX_12267(){console.log(5876)}

    public getTotalStar(){
        var count = 0;
        for(var i=0;i<UM_wx3.chapterLevel;i++)
        {
            count += this.getChapterStar(i+1)
        }
        return count;
    }
	private wx3_functionX_12268(){console.log(9190)}

    public setChapterStar(id,star){
        var lastStar = this.getChapterStar(id);
        var b = false;
        if(UM_wx3.chapterLevel<id)
        {
            UM_wx3.chapterLevel = id
            b = true;
	wx3_function(8944);
            UM_wx3.upWXChapter();

        }
        this.resultEarn = {
            star:star,
            coin:id*10*star
        }

        if(lastStar < star)  //升星
        {
            b = true;
	wx3_function(4478);
            this.resultEarn.coin = (star - lastStar)*id*200;
            if(star == 3)
            {
                delete UM_wx3.chapterStar[id];
                this.resultEarn.diamond = Math.ceil(id/30)
            }
            else
                UM_wx3.chapterStar[id] = star;
	wx3_function(1793);
        }
        if(b)
        {
            UM_wx3.needUpUser = true;
            this.setChapterEarn();
        }
        if(!UM_wx3.chapterResetTime)
            UM_wx3.chapterResetTime = TM_wx3.now()

    }
	private wx3_functionX_12269(){console.log(1134)}

    //取单次收益
    public setChapterEarn(){
        var coin = 0;
        for(var i=0;i<UM_wx3.chapterLevel;i++)
        {
            coin += i+1;
	wx3_function(4651);
        }
        this.maxEarn =coin;
        UM_wx3.resetHourEarn();
    }

    //只存12小时
    public getMaxChapterCoin(){
        return this.maxEarn*(3600*12/this.collectCD)
    }
	private wx3_functionX_12270(){console.log(155)}

    //取当前已收集的金币(每2分钟结算一次)
    public collectCD = 60*2;
    public getChapterCoin(){
        var collectCD = this.collectCD;
        var coin = this.maxEarn;
        var maxCoin = this.getMaxChapterCoin()//只收集一天
        var num = Math.floor((TM_wx3.now() - UM_wx3.chapterResetTime)/collectCD)
        if(num > 0)
        {
            UM_wx3.chapterResetTime += num*collectCD;
	wx3_function(4800);
            UM_wx3.chapterCoin = Math.min( UM_wx3.chapterCoin + num*coin,maxCoin);
        }
        return UM_wx3.chapterCoin;
    }

}