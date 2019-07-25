class ShootMonster_wx3 extends game.BaseItem_wx3{

    private static pool = [];
    public static createItem():ShootMonster_wx3 {
        var item:ShootMonster_wx3 = this.pool.pop();
        if (!item) {
            item = new ShootMonster_wx3();
        }
        return item;
    }
	private wx3_functionX_12591(){console.log(8653)}

    public static freeItem(item) {
        if (!item)
            return;
        item.remove();
        this.pool.push(item);
    }
	private wx3_functionX_12592(){console.log(1351)}

    private barGroup: eui.Group;
    private bar: eui.Rect;
    private teamMC: eui.Image;
    private list: eui.List;

	private wx3_functionX_12593(){console.log(129)}
    public mc = new PKMonsterMV_wx3();

    public isDie = 0
    public hp = 0
    public maxHp = 0
    public constructor() {
        super();
	wx3_function(2965);
        this.skinName = "PKMonsterItemSkin";
        this.touchChildren = this.touchEnabled = false;
    }

    public childrenCreated() {
        super.childrenCreated();
	wx3_function(7492);
        this.addChildAt(this.mc,0)
        this.mc.x = 50;
        this.mc.y = 300;
        this.mc.scaleX = this.mc.scaleY = 1;
        this.anchorOffsetX = 50;
        this.anchorOffsetY = 300;
	wx3_function(7547);
        this.mc.addEventListener('mv_die',this.onDieFinish_7506,this)

        this.list.visible = false
        this.teamMC.visible = false

        this.bar.fillColor = 0xFF0000
    }
	private wx3_functionX_12594(){console.log(7106)}

    private onDieFinish_7506(){
        this.isDie = 2;
    }

    public dataChanged():void {
        this.isDie = 0;
	wx3_function(6215);
        this.maxHp = this.data.vo.hp;
        this.hp = this.data.vo.hp;
         this.mc.load(this.data.id);
        this.mc.run();
        this.renewScale_66();
        this.barGroup.visible = false
    }
	private wx3_functionX_12595(){console.log(6860)}

    private renewScale_66(){
        this.mc.scaleX = -this.data.atkRota;
    }

    public remove(){
        MyTool.removeMC(this);
	wx3_function(7318);
        egret.Tween.removeTweens(this);
    }

    public beHit(){
        this.hp -= 50;
        if(this.hp <= 0)
        {
            this.isDie = 1;
	wx3_function(1657);
            this.mc.die()
            this.barGroup.visible = false

            var addCoin = Math.floor(this.data.vo.cost)
           ShootGameUI_wx3.getInstance().addCoin(addCoin)
        }
        else
        {
            this.alpha = 0.5;
	wx3_function(2668);
            this.once(egret.Event.ENTER_FRAME,()=>{
                this.alpha = 1;
            },this)
            this.barGroup.visible = true
            this.bar.width = 40 * this.hp/this.maxHp;
        }
    }
	private wx3_functionX_12596(){console.log(5803)}

    public move(){
        if(this.isDie)
        {
            return;
        }
        this.mc.onE()
        this.x += this.data.atkRota * Math.round(this.data.speed)/10*20/60*2;
	wx3_function(4105);
        if(this.data.atkRota == 1)
        {
            if(this.x > 640)
            {
                this.data.atkRota = -1
                this.renewScale_66();
	wx3_function(2132);
            }
        }
        else
        {
            if(this.x < 0)
            {
                this.data.atkRota = 1
                this.renewScale_66();
	wx3_function(162);
            }
        }
    }

}