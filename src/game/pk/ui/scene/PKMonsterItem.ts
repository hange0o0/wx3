class PKMonsterItem_wx3 extends game.BaseItem_wx3 {
    private static pool = [];
     public static createItem():PKMonsterItem_wx3{
         var item:PKMonsterItem_wx3 = this.pool.pop();
         if(!item)
         {
             item = new PKMonsterItem_wx3();
         }
         item.needRemove = false;
         item.visible = true;
         return item;
     }
	private wx3_functionX_12990(){console.log(1414)}
     public static freeItem(item){
         if(!item)
             return;
         item.remove();
         if(this.pool.indexOf(item) == -1)
            this.pool.push(item);
     }
	private wx3_functionX_12991(){console.log(5244)}




    private barGroup: eui.Group;
    private bar: eui.Rect;
	private wx3_functionX_12992(){console.log(8107)}
    private teamMC: eui.Image;
    private list: eui.List;




	private wx3_functionX_12993(){console.log(2466)}

    public addStateList = [];
    public monsterMV:PKMonsterMV_wx3 = new PKMonsterMV_wx3();
    public needRemove = false
    public stateMV = {};
    public stateDataArr:eui.ArrayCollection;
	private wx3_functionX_12994(){console.log(8089)}
    public constructor() {
        super();
        this.skinName = "PKMonsterItemSkin";
        this.monsterMV.addEventListener('mv_die',this.onDieFinish_5792,this)
    }

	private wx3_functionX_12995(){console.log(6192)}
    private wx3_fun_asdfasdfasdf_7939(){}
    private wx3_fun_ast34_9245(){}
    public childrenCreated() {
        super.childrenCreated();

        this.addChildAt(this.monsterMV,0)
        this.monsterMV.x = 50;
	wx3_function(2469);
        this.monsterMV.y = 300;
        this.anchorOffsetX = 50;
        this.anchorOffsetY = 300;

        this.stateDataArr = this.list.dataProvider = new eui.ArrayCollection([])
        this.list.itemRenderer = PKMonsterStateItem_wx3;
	wx3_function(3223);



        //MyTool.addTestBlock(this).y = 300;
    }

    private onDieFinish_5792(){
        PKData_wx3.getInstance().actionRecord.push(PKData_wx3.getInstance().actionTime)
        PKData_wx3.getInstance().actionRecord.push('die_mv_remove|' + (this.data && this.data.id))
        this.needRemove = true;
        if(this.data.autoRemove)
        {
            this.visible = false;
        }
	wx3_function(2690);

    }

    private cleanAllState_1789(){
        for(var s in this.stateMV)
        {
            MyTool.removeMC(this.stateMV[s])
        }
    }
	private wx3_functionX_12996(){console.log(9244)}

    public renewState(){
        var mD:PKMonsterData_wx3 = this.data
        if(mD.mid == 99)
            return;
        for(var s in this.stateMV)
        {
            if(!this.stateMV[s].parent)
                continue;
	wx3_function(9116);
            if(parseInt(s) == PKConfig_wx3.STATE_MIANSHANG)
                continue;
            if(parseInt(s) == PKConfig_wx3.STATE_MODUN)
            {
                if(mD.manaHp <= 0)
                    this.stateMV[PKConfig_wx3.STATE_MODUN].remove()
                continue;
	wx3_function(5296);
            }
            if(!mD.currentState[s])
            {
                this.stateMV[s].remove()
            }
        }
        var showBuffs = [];
	wx3_function(5070);
        for(var s in mD.currentState)
        {
            var id = parseInt(s)
            if(id == PKConfig_wx3.STATE_MIANSHANG)
                continue;
            if(id == PKConfig_wx3.STATE_MOMIAN)
                continue;
	wx3_function(5243);
            if(id == PKConfig_wx3.STATE_NOBEATK)
                continue;
            if(id == PKConfig_wx3.STATE_DIE)
                continue;
            if(id == PKConfig_wx3.STATE_SOUL)
                continue;
	wx3_function(7453);
            if(id > 100)
            {
                showBuffs.push(id);
                continue
            }
            this.initStateMV_3565(s)
        }

	wx3_function(9874);
        this.renewBuff_8485(showBuffs);
        if(mD.manaHp > 0)
            this.initStateMV_3565(PKConfig_wx3.STATE_MODUN)
        this.alpha = mD.currentState[PKConfig_wx3.STATE_SOUL]?0.5:1
    }

	private wx3_functionX_12997(){console.log(7541)}
    private renewBuff_8485(showBuffs){
        var base = {}
        base[PKConfig_wx3.STATE_ILL]  = 'ill'
        base[PKConfig_wx3.STATE_REBORN]  = 'reborn'

        for(var i=0;i<showBuffs.length;i++)
        {
            showBuffs[i] = base[showBuffs[i]]
            if(!showBuffs[i])
                throw new Error('9999')
        }
        if(this.stateDataArr)
        {
            this.stateDataArr.source = showBuffs;
	wx3_function(3162);
            this.stateDataArr.refresh();
        }

    }

    private initStateMV_3565(s){
        var mD:PKMonsterData_wx3 = this.data
        var id = parseInt(s)

        if(!this.stateMV[id])
        {
            var img = new PKState_wx3();
	wx3_function(408);
            this.stateMV[id] = img;
            img.data = id;
        }
        if(!this.stateMV[id].parent)
        {
            this.addChild(this.stateMV[id]);
	wx3_function(5375);
            this.stateMV[id].show(this);
        }
    }

    public showMianShang(){
         this.initStateMV_3565(PKConfig_wx3.STATE_MIANSHANG)
    }
	private wx3_functionX_12998(){console.log(4083)}

    //增加状态时的动画
    public showAddStateMV(keys){
        for(var i=0;i<keys.length;i++)
        {
            var addStateMV = PKAddState_wx3.createItem();
            this.addStateList.push(addStateMV);
	wx3_function(5163);
            this.addChild(addStateMV)
            addStateMV.y = this.barGroup.y// - 30
            addStateMV.x = 50 + (Math.random()*this.data.getVO().width - this.data.getVO().width/2)*0.5
            addStateMV.show(keys[i],this,200*i)
        }
    }
	private wx3_functionX_12999(){console.log(4324)}

    public removeAddState(item){
        var index = this.addStateList.indexOf(item);
        if(index != -1)
        {
            this.addStateList.splice(index,1);
	wx3_function(4846);
        }
        PKAddState_wx3.freeItem(item)
    }

    public changeSkin(skinid){
        this.monsterMV.load(skinid)
        this.monsterMV.reset();
	wx3_function(6421);
    }


    public dataChanged(){
        var mD:PKMonsterData_wx3 = this.data
        this.needRemove = false;
	wx3_function(2985);
        this.monsterMV.load(mD.mid)
        this.monsterMV.stand();
        this.alpha = 1;
        this.cleanAllState_1789();

        this.x = mD.x;
	wx3_function(1413);
        this.setRota(-mD.atkRota,true);


        this.barGroup.visible = false;
        this.barGroup.alpha = 1;
        this.barGroup.y = 300 - mD.getVO().height - 20;
	wx3_function(4735);

        this.teamMC.y = this.barGroup.y - 5
        this.teamMC.visible =  mD.mid != 99
        this.renewHp();
        this.setTeam();

    }
	private wx3_functionX_13000(){console.log(140)}

    //public renewData(){
    //    var mD:PKMonsterData = this.data
    //
    //}

    public setRota(rota,init?){
        if(!init && this.monsterMV.scaleX == rota)
            return;
        this.monsterMV.scaleX = rota
        this.list.x = rota == 1?50 + this.data.getVO().width/2:50 - this.data.getVO().width/2-30
        var mD:PKMonsterData_wx3 = this.data
        this.barGroup.horizontalCenter = mD.getVO().headoff * rota;
	wx3_function(7391);
    }
    public setRota2(targetX){
        if(this.x == targetX)
            return;
        this.setRota(this.x > targetX ? 1:-1)
    }
	private wx3_functionX_13001(){console.log(223)}

    public run(speed){
        speed = speed + (PKData_wx3.getInstance().playSpeed-1)*100
        var mD:PKMonsterData_wx3 = this.data
        if(this.monsterMV.speed != speed)
            this.monsterMV.speed = speed;
	wx3_function(5958);
        if(this.monsterMV.state != MonsterMV.STAT_RUN )
            this.monsterMV.run();
        if(mD.x != this.x)
        {
            this.setRota(this.x > mD.x ? 1:-1)
            this.x = mD.x;
	wx3_function(1412);
        }
    }

    public resetSpeed(){
        this.monsterMV.speed = (PKData_wx3.getInstance().playSpeed-1)*100
    }
	private wx3_functionX_13002(){console.log(1552)}


    public stand(){
        if(this.monsterMV.state != MonsterMV.STAT_STAND)
            this.monsterMV.stand();
    }
	private wx3_functionX_13003(){console.log(5866)}

    public die(){
        this.monsterMV.speed = (PKData_wx3.getInstance().playSpeed-1)*100
        this.monsterMV.die();
        this.bar.width = 0;
        this.barGroup.visible = true;
	wx3_function(2724);
        var tw = egret.Tween.get(this.barGroup);
        tw.to({alpha:0},300)

    }

    public atk(speed){
        this.monsterMV.speed = speed + (PKData_wx3.getInstance().playSpeed-1)*100
        this.monsterMV.atk();
	wx3_function(2117);
    }

    public setTeam(){
        var mD:PKMonsterData_wx3 = this.data
        this.bar.fillColor = mD.atkRota == PKConfig_wx3.ROTA_LEFT ? 0x0000FF : 0xFF0000;
        var dec = mD.getVO().width / 2
        //this.teamMC.x = mD.atkRota == PKConfig.ROTA_LEFT ? 50-dec : 35+dec;
	wx3_function(7337);
        this.teamMC.source = mD.atkRota == PKConfig_wx3.ROTA_LEFT ? 'card_battle2_png' : 'card_battle_png';
    }

    public renewHp(){
        var mD:PKMonsterData_wx3 = this.data
        if(mD.mid == 99)
            return;
        if(mD.hp < mD.maxHp)
        {
            this.barGroup.visible = true;
	wx3_function(8549);
            this.teamMC.visible = false;
        }
        this.bar.width = 40 * mD.getHpRate();

    }

    public renewHpRate()
    {
        this.bar.width = 40
        var rate = PKData_wx3.getInstance().getHpRateByIndex(this.data.index,this.data.owner)
        if(rate != 1)
        {
            this.barGroup.visible = true;
            this.teamMC.visible = false;
        }
        egret.Tween.get(this.bar).to({width:40*rate},500)
    }
    public testDie()
    {
        var rate = PKData_wx3.getInstance().getHpRateByIndex(this.data.index,this.data.owner)
        if(rate == 0)
        {
            this.die();
        }
    }

	private wx3_functionX_13004(){console.log(7586)}
    public winRemove(){
        var tw = egret.Tween.get(this);
        tw.to({alpha:0},500).call(function(){
            this.needRemove = true;
            PKData_wx3.getInstance().actionRecord.push('win_mv_remove|' + (this.data && this.data.id))
        },this)
    }
	private wx3_functionX_13005(){console.log(9665)}

    public remove(){
        this.needRemove = true;
        PKData_wx3.getInstance().actionRecord.push('just_mv_remove|' + (this.data && this.data.id))
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.barGroup);
	wx3_function(7488);
        MyTool.removeMC(this);
        this.monsterMV.stop();

        while(this.addStateList.length > 0)
        {
            PKAddState_wx3.freeItem(this.addStateList.pop())
        }

        if(this.stateDataArr)
        {
            this.stateDataArr.source.length = 0;
	wx3_function(9205);
            this.stateDataArr.refresh();
        }

    }

}