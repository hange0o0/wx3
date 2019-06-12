class ShootGameUI_wx3 extends game.BaseUI_wx3 {

    private static _instance: ShootGameUI_wx3;
    public static getInstance(): ShootGameUI_wx3 {
        if(!this._instance)
            this._instance = new ShootGameUI_wx3();
        return this._instance;
    }
	private wx3_functionX_12597(){console.log(2442)}

    private con: eui.Group;
    private cannonGroup: eui.Group;
    private c0: eui.Image;
    private c1: eui.Image;
    private c2: eui.Image;
	private wx3_functionX_12598(){console.log(6934)}
    private c3: eui.Image;
    private c4: eui.Image;
    private numText: eui.Label;
    private coinGroup: eui.Group;
    private coinText: eui.Label;
    private diamondGroup: eui.Group;
	private wx3_functionX_12599(){console.log(6358)}
    private diamondText: eui.Label;
    private cdGroup: eui.Group;
    private timeText: eui.Label;
    private resultGroup: eui.Group;
    private resultCoinText: eui.Label;
    private resultDiamondGroup: eui.Group;
	private wx3_functionX_12600(){console.log(9395)}
    private closeBtn: eui.Button;
    private tipText: eui.Label;




	private wx3_functionX_12601(){console.log(2772)}



    private monsterArr = []
    private bulletArr = []
    private monsterDataList = []
	private wx3_functionX_12602(){console.log(7268)}

    private lastShootTime = {};
    private bulletSpeed = 10;

    private gameStart = 0
    private lastCreate = 0
	private wx3_functionX_12603(){console.log(901)}

    private gameStep = 0
    private coin = 0
    private kill = 0
    private maxKill = 80
    private maxCoin = 80
	private wx3_functionX_12604(){console.log(432)}
    public constructor() {
        super();
        this.skinName = "ShootGameUISkin";
        this.isShowAD = true
    }

    public childrenCreated() {
        super.childrenCreated();
	wx3_function(2032);
        this.monsterDataList =  ObjectUtil.objToArray(MonsterVO.data)
        this.addBtnEvent(this.c0,this.onShoot0_4084)
        this.addBtnEvent(this.c1,this.onShoot1_1903)
        this.addBtnEvent(this.c2,this.onShoot2_5097)
        this.addBtnEvent(this.c3,this.onShoot3_9172)
        this.addBtnEvent(this.c4,this.onShoot4_5063)

        this.addBtnEvent(this.closeBtn,this.hide)
    }
	private wx3_functionX_12605(){console.log(3321)}

    private onShoot0_4084(){
        this.shoot_wx3_8608(0);
    }
    private onShoot1_1903(){
        this.shoot_wx3_8608(1);
	wx3_function(7235);
    }
    private onShoot2_5097(){
        this.shoot_wx3_8608(2);
    }
    private onShoot3_9172(){
        this.shoot_wx3_8608(3);
	wx3_function(5622);
    }
    private onShoot4_5063(){
        this.shoot_wx3_8608(4);
    }


	private wx3_functionX_12606(){console.log(5907)}
    private shoot_wx3_8608(index){
        if(this.gameStep == 2)
            return;
         if(this.lastShootTime[index] && egret.getTimer() - this.lastShootTime[index] < 150)
            return;
        this.lastShootTime[index] = egret.getTimer();
	wx3_function(1302);


        if(this.tipText.visible)
            egret.Tween.removeTweens(this.tipText)
        this.tipText.visible = false

	wx3_function(6572);
        var mc = this['c'+index];
        var p = mc.localToGlobal(mc.width/2,0)
        p = this.globalToLocal(p.x,p.y,p)
        var bullet = ShootBulletItem_wx3.createItem()
        bullet.y = p.y;
        bullet.x = p.x;
	wx3_function(9549);
        this.con.addChild(bullet);
        this.bulletArr.push(bullet)
        mc.y = 15;
        egret.Tween.get(mc).to({y:0},100)
    }

	private wx3_functionX_12607(){console.log(4333)}
    public addCoin(cost){
        var addCoin = Math.floor(cost*this.maxCoin/300);
        this.coin += addCoin;
        this.kill ++;
        UM_wx3.addCoin(addCoin);
        if(this.kill == this.maxKill)
        {
            this.resultDiamondGroup.visible = true;
	wx3_function(8677);
            UM_wx3.addDiamond(1)
        }
        AddCoinItem.showMV(addCoin,this)
        this.coinText.text = NumberUtil.addNumSeparator(this.coin,2)
        this.diamondText.text = '消灭：' + this.kill + '/' + this.maxKill
    }
	private wx3_functionX_12608(){console.log(1177)}

    public show(maxCoin?){
        this.maxCoin = maxCoin
        super.show()
    }

	private wx3_functionX_12609(){console.log(3777)}
    public hide() {
        super.hide();
        GetCoinUI.getInstance().renew();
    }

    public onShow(){
        while(this.monsterArr.length)
        {
             ShootMonster_wx3.freeItem(this.monsterArr.pop())
        }
        while(this.bulletArr.length)
        {
             ShootBulletItem_wx3.freeItem(this.bulletArr.pop())
        }

        this.cannonGroup.bottom = Config.adHeight
        this.cdGroup.visible = false
        this.cannonGroup.visible = false
        this.coinGroup.visible = false
        this.diamondGroup.visible = false
        this.resultGroup.visible = false
        this.resultDiamondGroup.visible = false;
	wx3_function(1528);
        this.tipText.visible = false
        this.gameStep = 0;
        this.coin = 0;
        this.kill = 0;
        this.coinText.text = this.coin + ''
        this.diamondText.text = '消灭：' + this.kill + '/' + this.maxKill
        this.lastCreate = 0;
	wx3_function(4674);
        this.gameStart = egret.getTimer();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE_2454)
    }

    private onE_2454(){
        if(this.gameStep == 2)
            return;
        if(this.gameStep == 0)
        {
            var scd =  3-Math.floor((egret.getTimer() - this.gameStart)/1000)
            this.numText.text = scd + '';
	wx3_function(5148);
            if(scd <=0)
            {
                this.gameStep = 1;
                this.gameStart = egret.getTimer();
                this.numText.text = '';
                this.cdGroup.visible = true
                this.cannonGroup.visible = true
                this.coinGroup.visible = true
                this.tipText.visible = true
                this.tipText.alpha = 1;
	wx3_function(3688);
                egret.Tween.get(this.tipText,{loop:true}).to({alpha:0},500).to({alpha:1},500)
                SoundManager_wx3.getInstance().playSound('pkbg')
            }
            return;
        }
        //create monster
        var timeCD = Math.floor((egret.getTimer() - this.gameStart)/1000)
        if(timeCD >= 100)
        {
            this.gameStep = 2;
	wx3_function(3769);
            this.showResult_wx3_6933();
            return;
        }
        this.timeText.text = (99 - timeCD) + ''

        var cd = egret.getTimer() - this.lastCreate;
	wx3_function(94);
        var createCD = 1*1000;
        var maxNum = 20
        if(cd > createCD && maxNum > this.monsterArr.length)
        {
            this.lastCreate = egret.getTimer();
            this.createMonster_wx3_3535();
	wx3_function(9089);
        }

        for(var i=0;i<this.monsterArr.length;i++)
        {
            this.monsterArr[i].move()
            if(this.monsterArr[i].isDie == 2)
            {
                ShootMonster_wx3.freeItem(this.monsterArr[i]);
	wx3_function(6079);
                this.monsterArr.splice(i,1);
                i--;
            }
        }

         for(var i=0;i<this.bulletArr.length;i++)
         {
             var bullet = this.bulletArr[i];
	wx3_function(2773);
             bullet.y -= this.bulletSpeed;
             if(bullet.y < -50 || this.testBullet_4611(bullet))
             {
                 ShootBulletItem_wx3.freeItem(bullet);
                 this.bulletArr.splice(i,1);
                 i--;
	wx3_function(8843);
             }
         }
    }

    private showResult_wx3_6933(){
        this.resultCoinText.text = 'x'+NumberUtil.addNumSeparator(this.coin,2) + ''
        this.resultGroup.visible = true;
	wx3_function(6588);
        SoundManager_wx3.getInstance().playSound('bg');
    }

    private testBullet_4611(bullet){
        for(var i=this.monsterArr.length-1;i>=0;i--)
        {
            var monster = this.monsterArr[i];
	wx3_function(3421);
            if(monster.isDie)
                continue;
            var w = monster.data.vo.width
            var h = monster.data.vo.height
            if(
                bullet.x > monster.x - w/2 &&
                bullet.x < monster.x + w/2 &&
                bullet.y < monster.y &&
                bullet.y > monster.y - h*0.8
            )
            {
                monster.beHit();
	wx3_function(4821);
                return true;
            }
        }
        return false;
    }

	private wx3_functionX_12610(){console.log(7831)}
    private createMonster_wx3_3535(){
        //console.log('create');
        var mvo = ArrayUtil.randomOne(this.monsterDataList);
        var monster = ShootMonster_wx3.createItem();
        this.con.addChild(monster);
        var atkRota = Math.random() > 0.5?1:-1;
        monster.data = {
            vo:mvo,
            id:mvo.id,
            atkRota:1,
            speed:mvo.speed,
        };
	wx3_function(2960);
        monster.x = atkRota==1?-100:640+100;
        monster.y = 180 + Math.random()*(GameManager_wx3.uiHeight - 500);
        this.monsterArr.push(monster)

        ArrayUtil.sortByField(this.monsterArr,['y'],[0]);
        for(var i=0;i<this.monsterArr.length;i++)
        {
            this.con.addChild(this.monsterArr[i]);
	wx3_function(2496);
        }

    }


}