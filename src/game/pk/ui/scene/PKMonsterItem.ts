class PKMonsterItem_wx3 extends game.BaseItem {
    private static pool = [];
     public static createItem():PKMonsterItem_wx3{
         var item:PKMonsterItem_wx3 = this.pool.pop();
         if(!item)
         {
             item = new PKMonsterItem_wx3();
         }
         item.needRemove = false;
         return item;
     }
     public static freeItem(item){
         if(!item)
             return;
         item.remove();
         if(this.pool.indexOf(item) == -1)
            this.pool.push(item);
     }




    private barGroup: eui.Group;
    private bar: eui.Rect;
    private teamMC: eui.Image;
    private list: eui.List;





    public addStateList = [];
    public monsterMV:PKMonsterMV_wx3 = new PKMonsterMV_wx3();
    public needRemove = false
    public stateMV = {};
    public stateDataArr:eui.ArrayCollection;
    public constructor() {
        super();
        this.skinName = "PKMonsterItemSkin";
        this.monsterMV.addEventListener('mv_die',this.onDieFinish,this)
    }

    private wx3_fun_asdfasdfasdf(){}
    private wx3_fun_ast34(){}
    public childrenCreated() {
        super.childrenCreated();

        this.addChildAt(this.monsterMV,0)
        this.monsterMV.x = 50;
        this.monsterMV.y = 300;
        this.anchorOffsetX = 50;
        this.anchorOffsetY = 300;

        this.stateDataArr = this.list.dataProvider = new eui.ArrayCollection([])
        this.list.itemRenderer = PKMonsterStateItem_wx3;



        //MyTool.addTestBlock(this).y = 300;
    }

    private onDieFinish(){
        PKData_wx3.getInstance().actionRecord.push(PKData_wx3.getInstance().actionTime)
        PKData_wx3.getInstance().actionRecord.push('die_mv_remove|' + (this.data && this.data.id))
        this.needRemove = true;

    }

    private cleanAllState(){
        for(var s in this.stateMV)
        {
            MyTool.removeMC(this.stateMV[s])
        }
    }

    public renewState(){
        var mD:PKMonsterData_wx3 = this.data
        if(mD.mid == 99)
            return;
        for(var s in this.stateMV)
        {
            if(!this.stateMV[s].parent)
                continue;
            if(parseInt(s) == PKConfig_wx3.STATE_MIANSHANG)
                continue;
            if(parseInt(s) == PKConfig_wx3.STATE_MODUN)
            {
                if(mD.manaHp <= 0)
                    this.stateMV[PKConfig_wx3.STATE_MODUN].remove()
                continue;
            }
            if(!mD.currentState[s])
            {
                this.stateMV[s].remove()
            }
        }
        var showBuffs = [];
        for(var s in mD.currentState)
        {
            var id = parseInt(s)
            if(id == PKConfig_wx3.STATE_MIANSHANG)
                continue;
            if(id == PKConfig_wx3.STATE_MOMIAN)
                continue;
            if(id == PKConfig_wx3.STATE_NOBEATK)
                continue;
            if(id == PKConfig_wx3.STATE_DIE)
                continue;
            if(id == PKConfig_wx3.STATE_SOUL)
                continue;
            if(id > 100)
            {
                showBuffs.push(id);
                continue
            }
            this.initStateMV(s)
        }

        this.renewBuff(showBuffs);
        if(mD.manaHp > 0)
            this.initStateMV(PKConfig_wx3.STATE_MODUN)
        this.alpha = mD.currentState[PKConfig_wx3.STATE_SOUL]?0.5:1
    }

    private renewBuff(showBuffs){
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
            this.stateDataArr.refresh();
        }

    }

    private initStateMV(s){
        var mD:PKMonsterData_wx3 = this.data
        var id = parseInt(s)

        if(!this.stateMV[id])
        {
            var img = new PKState_wx3();
            this.stateMV[id] = img;
            img.data = id;
        }
        if(!this.stateMV[id].parent)
        {
            this.addChild(this.stateMV[id]);
            this.stateMV[id].show(this);
        }
    }

    public showMianShang(){
         this.initStateMV(PKConfig_wx3.STATE_MIANSHANG)
    }

    //增加状态时的动画
    public showAddStateMV(keys){
        for(var i=0;i<keys.length;i++)
        {
            var addStateMV = PKAddState_wx3.createItem();
            this.addStateList.push(addStateMV);
            this.addChild(addStateMV)
            addStateMV.y = this.barGroup.y// - 30
            addStateMV.x = 50 + (Math.random()*this.data.getVO().width - this.data.getVO().width/2)*0.5
            addStateMV.show(keys[i],this,200*i)
        }
    }

    public removeAddState(item){
        var index = this.addStateList.indexOf(item);
        if(index != -1)
        {
            this.addStateList.splice(index,1);
        }
        PKAddState_wx3.freeItem(item)
    }

    public changeSkin(skinid){
        this.monsterMV.load(skinid)
        this.monsterMV.reset();
    }


    public dataChanged(){
        var mD:PKMonsterData_wx3 = this.data
        this.needRemove = false;
        this.monsterMV.load(mD.mid)
        this.monsterMV.stand();
        this.alpha = 1;
        this.cleanAllState();

        this.x = mD.x;
        this.setRota(-mD.atkRota,true);


        this.barGroup.visible = false;
        this.barGroup.alpha = 1;
        this.barGroup.y = 300 - mD.getVO().height - 20;

        this.teamMC.y = this.barGroup.y - 5
        this.teamMC.visible =  mD.mid != 99
        this.renewHp();
        this.setTeam();

    }

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
    }
    public setRota2(targetX){
        if(this.x == targetX)
            return;
        this.setRota(this.x > targetX ? 1:-1)
    }

    public run(speed){
        speed = speed + (PKData_wx3.getInstance().playSpeed-1)*100
        var mD:PKMonsterData_wx3 = this.data
        if(this.monsterMV.speed != speed)
            this.monsterMV.speed = speed;
        if(this.monsterMV.state != MonsterMV.STAT_RUN )
            this.monsterMV.run();
        if(mD.x != this.x)
        {
            this.setRota(this.x > mD.x ? 1:-1)
            this.x = mD.x;
        }
    }

    public resetSpeed(){
        this.monsterMV.speed = (PKData_wx3.getInstance().playSpeed-1)*100
    }


    public stand(){
        if(this.monsterMV.state != MonsterMV.STAT_STAND)
            this.monsterMV.stand();
    }

    public die(){
        this.monsterMV.speed = (PKData_wx3.getInstance().playSpeed-1)*100
        this.monsterMV.die();
        this.bar.width = 0;
        this.barGroup.visible = true;
        var tw = egret.Tween.get(this.barGroup);
        tw.to({alpha:0},300)

    }

    public atk(speed){
        this.monsterMV.speed = speed + (PKData_wx3.getInstance().playSpeed-1)*100
        this.monsterMV.atk();
    }

    public setTeam(){
        var mD:PKMonsterData_wx3 = this.data
        this.bar.fillColor = mD.atkRota == PKConfig_wx3.ROTA_LEFT ? 0x0000FF : 0xFF0000;
        var dec = mD.getVO().width / 2
        //this.teamMC.x = mD.atkRota == PKConfig.ROTA_LEFT ? 50-dec : 35+dec;
        this.teamMC.source = mD.atkRota == PKConfig_wx3.ROTA_LEFT ? 'card_battle2_png' : 'card_battle_png';
    }

    public renewHp(){
        var mD:PKMonsterData_wx3 = this.data
        if(mD.mid == 99)
            return;
        if(mD.hp < mD.maxHp)
        {
            this.barGroup.visible = true;
            this.teamMC.visible = false;
        }
        this.bar.width = 40 * mD.getHpRate();

    }

    public winRemove(){
        var tw = egret.Tween.get(this);
        tw.to({alpha:0},500).call(function(){
            this.needRemove = true;
            PKData_wx3.getInstance().actionRecord.push('win_mv_remove|' + (this.data && this.data.id))
        },this)
    }

    public remove(){
        this.needRemove = true;
        PKData_wx3.getInstance().actionRecord.push('just_mv_remove|' + (this.data && this.data.id))
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.barGroup);
        MyTool.removeMC(this);
        this.monsterMV.stop();

        while(this.addStateList.length > 0)
        {
            PKAddState_wx3.freeItem(this.addStateList.pop())
        }

        if(this.stateDataArr)
        {
            this.stateDataArr.source.length = 0;
            this.stateDataArr.refresh();
        }

    }

}