class TestUI extends game.BaseUI_wx3 {

    private static _instance: TestUI;
    public static getInstance(): TestUI {
        if(!this._instance)
            this._instance = new TestUI();
        return this._instance;
    }

    private blockGroup: eui.Group;
    private titleText: eui.Label;
    private scoreText: eui.Label;
    private historyText: eui.Label;
    private tipsGroup: eui.Group;
    private tipsText: eui.Label;





    private monsterMV = new PKMonsterMV_wx3();


    public isPlaying = false
    public isStoping = false
    public isGuiding = false
    public blockArr = [];

    public history
    public speed = 5;
    public upSpeed = 0
    public upAdd = 0.3
    public currentMeter = 0

    public blockHeight;
    public blockNextPos = 0;
    public constructor() {
        super();
        this.skinName = "TestUISkin";
    }

    private wx3_functionX_12665(){console.log(8595)}
    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onStageClick)

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onJump, this);
        this.addBtnEvent(this,this.onStageClick)


        this.blockHeight = GameManager_wx3.uiHeight/2 - 100;
        this.addChild(this.monsterMV)
        this.monsterMV.load(65);
        this.monsterMV.currentMV.scaleX = -1
        this.monsterMV.scaleX = this.monsterMV.scaleY = 1.2
        this.monsterMV.x = 150
        this.monsterMV.bottom = this.blockHeight;
    }

    private onJump(){
        if(!this.isPlaying)
        {
            return;
        }
        if(this.isGuiding)
        {
            return;
        }
        if(this.isStoping)
        {
            this.isStoping = false;
            this.tipsGroup.visible = false;
        }

        //console.log(Math.abs(this.monsterMV.bottom - this.blockHeight),this.isSafe())
        if(Math.abs(this.monsterMV.bottom - this.blockHeight) < 6 && this.isSafe())
            this.upSpeed = -10

    }

    private onStageClick(){
        if(!this.isPlaying)
        {
            this.startGame();
            console.log(1111)
        }
    }

    public startGame(){
        this.isPlaying = true;
        this.titleText.visible = false
        this.tipsGroup.visible = false
        this.historyText.text = ''
        this.renewMeter();
        this.monsterMV.run();
    }

    public show(){

        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
    }

    public onE(){
        if(this.isStoping)
            return;
        if(this.isPlaying)
        {
            if(this.monsterMV.bottom > this.blockHeight - 10)
                this.blockGroup.x -= this.speed;
            this.speed += 0.001;
            this.monsterMV.currentMV.speed = (this.speed-5)*20;

            var isSafe = this.isSafe()
            this.upSpeed += this.upAdd
            this.monsterMV.bottom -= this.upSpeed;
            if(this.monsterMV.bottom < this.blockHeight && isSafe && this.upSpeed>0)
            {
                this.upSpeed = 0;
                this.monsterMV.bottom = this.blockHeight;
            }


            if(this.monsterMV.bottom < 0)
            {
                this.isPlaying = false;
                TestResultUI.getInstance().show(Math.floor((-this.blockGroup.x)/100))
                this.monsterMV.die();
            }

            this.renewMeter();
            if(this.isGuiding)
            {
                if(this.blockGroup.x < -(620 - 150))
                {
                    this.isStoping = true;
                    this.tipsGroup.visible = true;
                    this.isGuiding = false;
                    this.tipsText.text = '点击屏幕使怪物起跳'
                }
            }

            //移除过屏的
            for(var i=0;i<this.blockArr.length;i++)
            {
                var mc = this.blockArr[i];
                if(mc.width + mc.x < -this.blockGroup.x)
                {
                    TestBlockMC.freeItem(mc);
                    this.blockArr.splice(i,1) ;
                    i--;
                }
            }

            while(this.blockArr.length < 5)
                this.createBlock();
        }
        else
        {
              this.randomTalk();
        }
    }

    private isSafe(){
        var xx = -this.blockGroup.x + this.monsterMV.x
        for(var i=0;i<this.blockArr.length;i++)
        {
            var mc = this.blockArr[i];
            if(xx > mc.x && xx < mc.x + mc.width)
                return true;

        }
        return false
    }

    private renewMeter(){
        this.scoreText.text = Math.floor((-this.blockGroup.x)/100) + ' 米'
    }

    public renew(){
        while(this.blockArr.length)
        {
            TestBlockMC.freeItem(this.blockArr.pop())
        }

        this.history = SharedObjectManager_wx3.getInstance().getMyValue('test_score') || 0
        this.isGuiding = this.history == 0;
        if(this.history)
            this.historyText.text = '历史最高：' + this.history + '米'
        else
            this.historyText.text = ''

        this.tipsGroup.visible = true
        this.tipsText.text = '点击屏幕开始游戏'
        this.scoreText.text = ''
        this.titleText.visible = true;
        this.isStoping = false;

        this.upSpeed = 0;
        this.speed = 5;
        this.blockNextPos = 0;
        this.currentMeter = 0;
        this.blockGroup.x = -10;
        this.createBlock(660);
        while(this.blockArr.length < 5)
            this.createBlock();

        this.monsterMV.bottom = this.blockHeight
        this.monsterMV.stand();
    }

    private createBlock(len?){
        if(!len)
            len = Math.max(70,200 - (-this.blockGroup.x)/50) + Math.random()*Math.max(30,300 - (-this.blockGroup.x)/50)
         var block = TestBlockMC.createItem();
        this.blockArr.push(block)
        this.blockGroup.addChild(block)
        block.x = this.blockNextPos
        block.height = this.blockHeight
        block.width = len
        this.blockNextPos += len + (this.speed*20+50)*(1+Math.random()*0.5);
    }


    private lastTalk = 0
    public randomTalk(){
        if(egret.getTimer() < this.lastTalk)
            return;
        var item = this.monsterMV
        if(item && !item.talkItm)
        {
            item.talk(1);
            this.lastTalk = egret.getTimer() + 3000 + Math.floor(Math.random()*5000)
        }
    }

}