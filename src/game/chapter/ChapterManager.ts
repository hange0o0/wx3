class ChapterManager {
    private static _instance:ChapterManager;
    public static getInstance():ChapterManager {
        if (!this._instance)
            this._instance = new ChapterManager();
        return this._instance;
    }

    public maxEarn = 0;
    public resultEarn:any;

    //取章节星星数
    public getChapterStar(id){
        if(UM.chapterLevel<id)
            return 0;
        return UM.chapterStar[id] || 3
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
            coin:id*50*star
        }

        if(lastStar < star)  //升星
        {
            b = true;
            if(star == 3)
            {
                delete UM.chapterStar[id];
                this.resultEarn.diamond = Math.ceil(id/50)
            }
            else
                UM.chapterStar[id] = star;
        }
        if(b)
            UM.needUpUser = true;
        if(!UM.chapterResetTime)
            UM.chapterResetTime = TM.now()
        this.setChapterEarn();
    }

    //取单次收益
    public setChapterEarn(){
        var coin = 0;
        for(var i=0;i<UM.chapterLevel;i++)
        {
            coin += i+1;
        }
        this.maxEarn =coin;
    }

    //取当前已收集的金币(每5分钟结算一次)
    public getChapterCoin(){
        var collectCD = 60*5;
        var coin = this.maxEarn;
        var maxCoin = coin*(3600*24/collectCD)//只收集一天
        var num = Math.floor((TM.now() - UM.chapterResetTime)/collectCD)
        if(num > 0)
        {
            UM.chapterResetTime += num*collectCD;
            UM.chapterCoin = Math.min( UM.chapterCoin + num*coin,maxCoin);
        }
        return UM.chapterCoin;
    }

}