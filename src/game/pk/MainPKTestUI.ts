class MainPKTestUI extends game.BaseUI_wx3 {
    private static _instance:MainPKTestUI;
    public static getInstance() {
        if (!this._instance) this._instance = new MainPKTestUI();
        return this._instance;
    }

    public constructor() {
        super();
        this.skinName = "MainPKTestUISkin";
    }

    private g1: eui.Group;
    private g2: eui.Group;
    private topUI: TopUI;
    private winGroup: eui.Group;
    private winText: eui.Label;
    private starGroup: eui.Group;
    private s0: eui.Image;
    private s1: eui.Image;
    private s2: eui.Image;
    private desGroup: eui.Group;
    private resourceGroup: eui.Group;
    private coinGroup: eui.Group;
    private des1: eui.Label;
    private diamondGroup: eui.Group;
    private des2: eui.Label;
    private failGroup: eui.Group;
    private failText: eui.Label;
    private bottomUI: BottomUI;
    private btnGroup: eui.Group;
    private backBtn: eui.Button;
    private doubleBtn: eui.Button;
    private replayBtn: eui.Button;
    private strongBtn: eui.Button;






    public dataIn;
    public finish = false
    public gameStart = false
    public resultTimer

    public monsterArr = [];



    private shareStr
    public showCD

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.hide,this);

        this.addBtnEvent(this.replayBtn,this.onReplay)
        this.addBtnEvent(this.backBtn,this.onBack)
        this.addBtnEvent(this.doubleBtn,this.onDouble)
        this.addBtnEvent(this.strongBtn,this.onStrong)


    }

    private onStrong(){
        var tecid = 32;
        if(this.dataIn.fight && this.dataIn.fight.type == 'def')
            tecid = 31
        PKFailUI.getInstance().show(tecid)
    }

    private onDouble(){
        ShareTool.share(this.shareStr,Config.localResRoot + "share_img_2.jpg",{},()=>{

        },true)
    }

    private onBack(){
        this.hide();
        if(this.dataIn.chapterid)
        {
            if(this.backBtn.label == '重试')
            {
                ChapterManager.getInstance().pkChapter(this.dataIn.chapterid)
            }
            else if(this.backBtn.label == '下一关')
            {
                ChapterManager.getInstance().pkChapter(this.dataIn.chapterid + 1)
            }
        }
    }

    public show(data?){
        PKManager_wx3.getInstance().isPKing = true
        this.dataIn = data,
            super.show();
    }

    public onShow(){
        if(this.dataIn.isMain)
        {
            MyTool.removeMC(this.backBtn)
        }
        else
        {
            this.btnGroup.addChildAt(this.backBtn,0)
            this.backBtn.label = '关闭'
        }
        this.reset();
    }

    public hide(){
        PKManager_wx3.getInstance().isPKing = false
        SoundManager_wx3.getInstance().playSound('bg');
        super.hide();
    }

    public onReplay(){
        this.dataIn.passTime = 0;
        this.dataIn.isReplay = true;
        this.reset();
    }



    public reset(){
        this.gameStart = false;
        if(this.dataIn.isReplay)
        {
            this.currentState = 's2'
            this.topUI.setTitle(this.dataIn.title || '回放')
        }
        else
        {
            this.currentState = 's1'
            this.topUI.setTitle(this.dataIn.title || '战斗进行中...')
        }

        this.winGroup.visible = false;
        this.failGroup.visible = false;
        this.btnGroup.visible = false;
        this.finish = false;
        egret.Tween.removeTweens(this.failGroup)
        egret.Tween.removeTweens(this.winGroup)






        var data = {
            seed:this.dataIn.seed,
            players:[
                {id:1,gameid:'team1',team:1,force:this.dataIn.force1,hp:1,autolist:this.dataIn.list1,mforce:this.dataIn.mforce1,atkBuff:this.dataIn.atkBuff1,hpBuff:this.dataIn.hpBuff1},
                {id:2,gameid:'team2',team:2,force:this.dataIn.force2,hp:1,autolist:this.dataIn.list2,mforce:this.dataIn.mforce2,atkBuff:this.dataIn.atkBuff2,hpBuff:this.dataIn.hpBuff2}
            ]
        };
        var PD = PKData_wx3.getInstance();
        PD.init(data);
        PD.quick = true;
        PD.quickTime = Number.MAX_VALUE;


        var list1 = this.dataIn.list1?this.dataIn.list1.split(','):[]
        var list2 = this.dataIn.list2?this.dataIn.list2.split(','):[]
        this.showCD = Math.max(list1.length,list2.length)

        while(this.monsterArr.length)
        {
            PKMonsterItem_wx3.freeItem(this.monsterArr.pop())
        }

        for(var i=0;i<list1.length;i++)
        {
             this.getMonster(list1[i],i+1,1,this.g1)
        }

        for(var i=0;i<list2.length;i++)
        {
            this.getMonster(list2[i],i+1,2,this.g2)
        }


        if(!GuideManager.getInstance().isGuiding)
            this.startGame();
        else
        {
            GuideManager.getInstance().testShowGuide();
        }
    }

    private getMonster(mid,index,team,con){
        var data =  {
            mid:mid,
            atkRota:team==1?1:-1,
            owner:team,
            index:index,
        }
        var mData =  new PKMonsterData_wx3(data)
        var item = PKMonsterItem_wx3.createItem();
        mData.autoRemove = true;
        item.data =mData;
        con.addChild(item)
        item.y = index*60
        item.x = 50
        this.monsterArr.push(item);
        item.stand();
        item.scaleX = item.scaleY = 0;
    }

    public startGame(){
         this.showMV();
    }

    public showMV(){
        this.gameStart = true;
        var PD = PKData_wx3.getInstance();
        PD.start();
        PKCode_wx3.getInstance().onStep();
        this.g1.horizontalCenter = -160
        this.g2.horizontalCenter = 160

        for(var i=0;i<this.monsterArr.length;i++)
        {
            this.showMonster(this.monsterArr[i])
        }

        egret.Tween.get(this.g1).wait(200*this.showCD+1000).to({horizontalCenter:-180},300).to({horizontalCenter:-30},300).to({horizontalCenter:-180},300).to({horizontalCenter:-160},300)
        egret.Tween.get(this.g2).wait(200*this.showCD+1000).call(()=>{
            //显示移动
            for(var i=0;i<this.monsterArr.length;i++)
            {
                this.monsterArr[i].monsterMV.run()
            }
        }).to({horizontalCenter:180},300).to({horizontalCenter:30},300).to({horizontalCenter:180},300).to({horizontalCenter:160},300).call(()=>{
            //显示最终血量
            for(var i=0;i<this.monsterArr.length;i++)
            {
                this.monsterArr[i].renewHpRate()
            }
        }).wait(1000).call(()=>{
            //显示死了的单位
            for(var i=0;i<this.monsterArr.length;i++)
            {
                this.monsterArr[i].testDie()
            }
        }).wait(1000).call(this.onStep,this)
    }

    private showMonster(item){
        egret.Tween.get(item).wait(item.data.index*200).to({scaleX:1.2,scaleY:1.2},300).to({scaleX:1,scaleY:1},300)
    }

    public onStep(){
        if(!this.gameStart)
            return;
        this.shareStr = ''
        this.finish = true;
        this.desGroup.visible = false;
        this.desGroup['callVisible'] = false
        var result = PKManager_wx3.getInstance().getPKResult(this.dataIn);
        if(result == 1)
        {
            this.delayShowResult(this.failGroup);
            this.failText.text = this.dataIn.chapterid?'挑战失败':'失败'
            this.backBtn.label = this.dataIn.chapterid?'重试':'关闭'
        }
        else if(result == 2)
        {
            this.starGroup.removeChildren();
            this.resourceGroup.removeChildren()
            this.delayShowResult(this.winGroup);
            this.winText.text = this.dataIn.chapterid?'挑战成功':'胜利'
            if(this.dataIn.coin)
            {
                this.desGroup['callVisible'] = true
                this.resourceGroup.addChild(this.coinGroup)
                this.des1.text = 'x' + NumberUtil.addNumSeparator(this.dataIn.coin,2)
            }
            if(this.dataIn.diamond)
            {
                this.desGroup['callVisible'] = true
                this.resourceGroup.addChild(this.diamondGroup)
                this.des2.text = 'x' + this.dataIn.diamond;
            }
            if(this.dataIn.chapterid)
            {
                this.shareStr = '已成功通过第'+this.dataIn.chapterid+'关，需要向我取经吗？'
                this.backBtn.label = this.dataIn.chapterid == UM_wx3.chapterLevel?'下一关':'关闭'
                if(this.dataIn.star)
                {
                    this.winText.text = ''
                    for(var i=0;i<this.dataIn.star;i++)
                    {
                        this.starGroup.addChild(this['s' + i])
                    }
                }
            }
            else
            {
                if(this.dataIn.fight)
                {
                    if(this.dataIn.fight.type == 'atk')
                        this.shareStr = '我成功突破了【'+this.dataIn.fight.robot.nick+'】的防守，获得了'+NumberUtil.addNumSeparator(this.dataIn.coin,1)+'金币'
                    else
                        this.shareStr = '我成功防守住了【'+this.dataIn.fight.robot.nick+'】来势汹汹的进攻，牛得不要不要的~'
                }
                this.backBtn.label = '关闭'
            }

        }
        else
        {
            this.delayShowResult(this.failGroup);
            this.failText.text = '双方平手'
            this.backBtn.label = this.dataIn.chapterid?'重试':'关闭'
        }
        if(this.shareStr)
        {
            this.btnGroup.addChild(this.doubleBtn)
            MyTool.removeMC(this.strongBtn)
        }
        else
        {
            MyTool.removeMC(this.doubleBtn)
            this.btnGroup.addChild(this.strongBtn)
        }
        if(this.backBtn.label == '关闭')
            MyTool.removeMC(this.backBtn)

    }


    public delayShowResult(mc)
    {
        clearTimeout(this.resultTimer);

        this.resultTimer = setTimeout(()=>{
            PKVideoCon_wx3.getInstance().resetAllMVSpeed();
            if(mc == this.winGroup)
                SoundManager_wx3.getInstance().playEffect('win');
            else
                SoundManager_wx3.getInstance().playEffect('fail');
            mc.visible = true;
            mc.scaleX = mc.scaleY = 0;
            var tw = egret.Tween.get(mc).to({scaleX:1.2,scaleY:1.2},300).to({scaleX:1,scaleY:1},300)
            tw.call(()=>{
                SoundManager_wx3.getInstance().playSound('bg');
                this.desGroup.visible = this.desGroup['callVisible'];
            })

            tw.call(()=>{
                this.btnGroup.visible = true
                this.currentState = 's2'
                if(this.dataIn.showTaskChange)
                    TaskManager.getInstance().testMainTask('chapter');

                GuideManager.getInstance().testShowGuide();
            })

        },1000)
    }
}