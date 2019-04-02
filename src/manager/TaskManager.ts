class TaskManager {
    private static _instance:TaskManager;
    public static getInstance():TaskManager {
        if (!this._instance)
            this._instance = new TaskManager();
        return this._instance;
    }

    public constructor() {

    }

    //在MC上显示一次光效
    private guideLight;
    private guideTimer;
    public showGuideMC(mc) {
        if (!this.guideLight) {
            var data:any = RES.getRes('guide_mv' + "_json"); //qid
            var texture:egret.Texture = RES.getRes('guide_mv' + "_png");
            if (data == null || texture == null) {
                return
            }
            var mcFactory = new egret.MovieClipDataFactory(data, texture);

            this.guideLight = new egret.MovieClip();
            this.guideLight.movieClipData = mcFactory.generateMovieClipData('click_guide');
            this.guideLight.addEventListener(egret.MovieClipEvent.COMPLETE, ()=>{
                this.guideLight.stop();
                MyTool.removeMC(this.guideLight);
            }, this)
            this.guideLight.frameRate = 12//技能动画变慢
            this.guideLight.touchEnabled = false;
        }

        egret.clearTimeout(this.guideTimer);
        this.guideTimer = egret.setTimeout(function(){
            var rect = mc.getBounds();
            rect.x += mc.anchorOffsetX
            rect.y += mc.anchorOffsetY
            var p1 = mc.localToGlobal(rect.x, rect.y);
            var p2 = mc.localToGlobal(rect.x + rect.width, rect.y + rect.height);

            this.guideLight.x = p1.x + (p2.x - p1.x) / 2
            this.guideLight.y = p1.y + (p2.y - p1.y) / 2
            GameManager.container.addChild(this.guideLight);
            this.guideLight.gotoAndPlay(1, 1);
        },this,200);

    }


    //任务是否完成
    public isTaskFinish(vo){
        return this.getTaskValue(vo) >= vo.value
    }

    //取正在进行的任务(未领奖)
    public getCurrentTask():TaskVO{
        if(!UM.task)
            return TaskVO.orderList[0];
        var index = TaskVO.orderList.indexOf(TaskVO.getObject(UM.task))
        if(index == -1)
            return null;
        return TaskVO.orderList[index+1];
    }

    public getTaskValue(vo:TaskVO){
        var type = vo.type
        switch(type)
        {
            case 'fight':
                return FightManager.getInstance().fightNum;
            case 'mlv'://指定ID
                return MonsterManager.getInstance().getMonsterLevel(vo.key)
            case 'mnum': //指定ID
                return MonsterManager.getInstance().getMonsterNum(vo.key)
            case 'mlv2'://等级大于v1的数量
                return MonsterManager.getInstance().getLevelOver(vo.key)
            case 'mnum2'://数量大于v1的数量
                return MonsterManager.getInstance().getNumOver(vo.key)
            case 'tlv':
                return TecManager.getInstance().getTecLevel(vo.key)
            case 'clv':
                return UM.chapterLevel
            case 'cstar'://星星数量
                return ChapterManager.getInstance().getTotalStar()
        }
    }


    public getTaskAward(fun?){
        var vo = this.getCurrentTask();
        if(!vo)
            return;
        if(!this.isTaskFinish(vo))
            return
        if(vo.coin)
            UM.addCoin(vo.coin)
        if(vo.diamond)
            UM.addDiamond(vo.diamond)
        UM.task = vo.id;
    }

    //未完成任务前往
    public guideTaskVO:TaskVO;
    public onTaskGo(){
        var vo = this.guideTaskVO = this.getCurrentTask();
        var type = vo.type
        switch(type)
        {
            case 'fight':
                this.showGuideMC(GameUI.getInstance().fightBtn)
                break;
            case 'mlv'://指定ID
                this.showGuideMC(GameUI.getInstance().monsterBtn)
                break;
            case 'mnum': //指定ID
                this.showGuideMC(GameUI.getInstance().monsterBtn)
                break;
            case 'mlv2'://等级大于v1的数量
                this.showGuideMC(GameUI.getInstance().monsterBtn)
                break;
            case 'mnum2'://数量大于v1的数量
                this.showGuideMC(GameUI.getInstance().monsterBtn)
                break;
            case 'tlv':
                this.showGuideMC(GameUI.getInstance().tecBtn)
                break;
            case 'clv':
                this.showGuideMC(GameUI.getInstance().chapterBtn)
                break;
            case 'cstar'://星星数量
                this.showGuideMC(GameUI.getInstance().chapterBtn)
                break;
        }
    }
}