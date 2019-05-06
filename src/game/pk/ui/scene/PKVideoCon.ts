class PKVideoCon_wx3 extends game.BaseContainer_wx3 {
    private static _instance:PKVideoCon_wx3;
    public static getInstance() {
        if(!this._instance)
            this._instance = new PKVideoCon_wx3();
        return this._instance;
    }
	private wx3_functionX_13027(){console.log(4017)}

    public constructor() {
        super();
        this.skinName = "PKVideoConSkin";
    }
    private con: eui.Group;
	private wx3_functionX_13028(){console.log(8053)}
    private bg: eui.Image;




    public itemArr = []
	private wx3_functionX_13029(){console.log(8161)}
    public totemArr = []
    public txtPool = []
    public txtArr = []


    private monsterY = 400;
	private wx3_functionX_13030(){console.log(7215)}
    private isHang

    public childrenCreated() {
        super.childrenCreated();

        this.width = PKConfig_wx3.floorWidth +  PKConfig_wx3.appearPos*2

	wx3_function(7043);
        PKData_wx3.getInstance().addEventListener('video',this.onVideoEvent,this);



    }
    private wx3_fun_asdfasdfasdf_5072(){}
	private wx3_functionX_13031(){console.log(2592)}
    private wx3_fun_ast34_9585(){}

    public init(dataIn){
        this.bg.visible = !this.isHang;

        if(this.bg.visible)
            this.bg.source = PKManager_wx3.getInstance().getPKBG(dataIn.seed);
	wx3_function(5248);

        this.remove();

    }

    public remove(){
        while(this.itemArr.length)
        {
            var item = this.itemArr.pop();
	wx3_function(9869);
            PKData_wx3.getInstance().actionRecord.push('mv_remove2|' + (item.data && item.data.id))
            PKMonsterItem_wx3.freeItem(item);
        }
        while(this.txtArr.length)
        {
            var item = this.txtArr.pop();
	wx3_function(1072);
            this.freeTxt_377(item);
        }
        //while(this.totemArr.length)
        //{
        //    var item = this.totemArr.pop();
        //    PKTotem_wx3.freeItem(item);
        //}
    }

    public resetView(){
        this.remove();
	wx3_function(8553);
        var PD = PKData_wx3.getInstance()
        for(var i=0;i<PD.monsterList.length;i++)
        {
            var item = PKMonsterItem_wx3.createItem();
            item.y =  this.monsterY + PD.monsterList[i].y;

	wx3_function(5425);
            this.con.addChildAt(item,this.getIndexByY_1750(item.y));
            item.data =PD.monsterList[i];
            this.itemArr.push(item);
            item.stand();
        }
    }
	private wx3_functionX_13032(){console.log(5577)}




    private createTxt_6626():eui.Label{
        var item:eui.Label = this.txtPool.pop();
	wx3_function(760);
        if(!item)
        {
            item = new eui.Label();
            item.size = 20;
            item.stroke = 2;
            item.width = 160;
	wx3_function(2449);
            item.textAlign="center"
            item.anchorOffsetX = 80;
        }
        item.strokeColor = 0x000000
        item.alpha = 1;
        return item;
    }
	private wx3_functionX_13033(){console.log(2522)}

    private freeTxt_377(item){
        if(!item)
            return;
        egret.Tween.removeTweens(item)
        MyTool.removeMC(item);
	wx3_function(8227);
        this.txtPool.push(item);
    }

    public getItemByID(id):PKMonsterItem_wx3{
        for(var i=0;i<this.itemArr.length;i++)
        {
            var item = this.itemArr[i];
	wx3_function(4694);
            if(item.data.id == id)
                return item;
        }
        var str = ''
        var mvo = PKData_wx3.getInstance().getMonsterByID(id);
        if(!mvo)
            str = ('can not find monster:' + id + '|' + PKData_wx3.getInstance().monsterID)
        else if(mvo.die)
            str = ('monster die and not find:' + id + '|' + PKData_wx3.getInstance().monsterID)
        else
            str = ('not die but not find:' + id + '|' + PKData_wx3.getInstance().monsterID)
        alert(str);
        //sendClientError(str+'#'+PKManager.getInstance().pkType+'#'+PKData.getInstance().isReplay+'#'+PKData.getInstance().actionTime+'#'+JSON.stringify(PKData.getInstance().actionRecord));
        return null;
    }
	private wx3_functionX_13034(){console.log(2321)}

    //取出现深度
    private getIndexByY_1750(y){
        var underItem
        for(var i=0;i<this.itemArr.length;i++)
        {
            var item = this.itemArr[i];
	wx3_function(8591);
            if(item.y > y)
                continue;
            if(!underItem || underItem.y < item.y)
                underItem = item;
        }
        if(underItem)
            return this.con.getChildIndex(underItem) + 1;
        return 1
    }
	private wx3_functionX_13035(){console.log(9110)}

    public resetAllMVSpeed(){
        for(var i=0;i<this.itemArr.length;i++)
        {
            this.itemArr[i].resetSpeed();
        }
    }
	private wx3_functionX_13036(){console.log(1687)}

    public onVideoEvent(e){
        var item:PKMonsterItem_wx3;
        var videoData = e.data;
        var data:PKMonsterData_wx3 = videoData.user;
        switch(videoData.type)//动画类型
        {
            case PKConfig_wx3.VIDEO_MONSTER_ADD:
                item = PKMonsterItem_wx3.createItem();
                //if(data.owner == 'sys')
                //    item.y = this.monsterY;
                //else
	wx3_function(6315);
                    item.y =  this.monsterY + data.y;

                this.con.addChildAt(item,this.getIndexByY_1750(item.y));
                item.data =data;
                this.itemArr.push(item);
                PKData_wx3.getInstance().actionRecord.push('mv_add|' + data.id)
                item.stand();
	wx3_function(4232);
                if(data.mid == 99)
                {

                    item.run(50)
                }

                break;
            case PKConfig_wx3.VIDEO_MONSTER_MOVE:
                item = this.getItemByID(data.id);
	wx3_function(3149);
                if(item)
                    item.run(data.addSpeed);
                break;
            case PKConfig_wx3.VIDEO_MONSTER_ATK:
                item = this.getItemByID(data.id);
                if(videoData.target)
                    item.setRota2(videoData.target.x)
                item.atk(data.addSpeed);
	wx3_function(9615);
                break;
            case PKConfig_wx3.VIDEO_MONSTER_DOUBLE:
                if(data.die)  //死了就不显示
                    break;
                item = this.getItemByID(data.id);
                this.playDoubleHit(item,videoData.value);
	wx3_function(6456);
                break;
            case PKConfig_wx3.VIDEO_MONSTER_MISS:
                item = this.getItemByID(data.id);
                this.playMiss(item);
                break;
            case PKConfig_wx3.VIDEO_MONSTER_SKILL:
                item = this.getItemByID(data.id);
                this.playSkillName(item,videoData.skillName);
                break;

            case PKConfig_wx3.VIDEO_MONSTER_HPCHANGE:
                item = this.getItemByID(data.id);
	wx3_function(7757);
                item.renewHp();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_WIN:
                item = this.getItemByID(data.id);
                item.winRemove();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_ADD_STATE:
                item = this.getItemByID(data.id);
	wx3_function(6000);
                item.showAddStateMV(videoData.keys);
                break;
            case PKConfig_wx3.VIDEO_MONSTER_DIE:
                item = this.getItemByID(data.id);
                item.die();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_STAND:
                item = this.getItemByID(data.id);
	wx3_function(2180);
                item.stand();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_STATE_CHANGE:
                item = this.getItemByID(data.id);
                item.renewState();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_NOHIT:
                item = this.getItemByID(data.id);
	wx3_function(756);
                item.showMianShang();
                break;
            case PKConfig_wx3.VIDEO_MANAHP_CHANGE:
                item = this.getItemByID(data.id);
                item.renewState();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_CHANGE_TEAM:
                item = this.getItemByID(data.id);
	wx3_function(8421);
                item.setTeam();
                break;
            //case PKConfig_wx3.VIDEO_TOTEM_ADD:
            //    var totemItem = PKTotem_wx3.createItem();
            //    totemItem.y =  this.monsterY + videoData.y;
            //    totemItem.x =  videoData.x;
            //    this.con.addChildAt(totemItem,this.getIndexByY_1750(totemItem.y));
            //    totemItem.data = videoData.totemType;
            //    totemItem.owner = videoData.user;
            //    this.totemArr.push(totemItem);
            //    break;
            //case PKConfig_wx3.VIDEO_TOTEM_REMOVE:
            //    for(var i=0;i<this.totemArr.length;i++)
            //    {
            //        var totem =  this.totemArr[i];
            //        if(totem.owner == videoData.user)
            //        {
            //            PKTotem_wx3.freeItem(totem)
            //            this.totemArr.splice(i,1);
            //            i--;
            //            break
            //        }
            //    }
            //    break;
            case PKConfig_wx3.VIDEO_MONSTER_CHANGE_SKIN:
                item = this.getItemByID(data.id);
                item.changeSkin(videoData.skin);
                break;
        }
    }
	private wx3_functionX_13037(){console.log(3211)}


    public action(){
        var item:PKMonsterItem_wx3;
        for(var i=0;i<this.itemArr.length;i++)
        {
            item = this.itemArr[i];
	wx3_function(4946);
            if(item.needRemove)//移除过期ID
            {
                PKMonsterItem_wx3.freeItem(item);
                this.itemArr.splice(i,1);
                PKData_wx3.getInstance().actionRecord.push('mv_remove|' + (item.data && item.data.id))
                i--;
	wx3_function(353);
            }
        }
        PKBulletManager_wx3.getInstance().actionAll()
    }

    //在AB之间播放动画
    public playAniBetween(a,b,mvID){
        var atker = this.getItemByID(a)
        var defender = this.getItemByID(b)
        if(!atker || !defender)
        {
            throw new Error('XXX')
            return;
        }
        var AM = AniManager_wx3.getInstance();
	wx3_function(4945);
        if(AM.preLoadMV(mvID))
        {
            var xy = MyTool.getMiddleXY(atker,defender)
            xy.y -= defender.data.getVO().height/2
            var index1 = this.con.getChildIndex(atker)
            var index2 = this.con.getChildIndex(defender)
            AM.playOnItem(mvID,index1>index2?atker:defender,xy);
	wx3_function(5258);
        }
    }

    //public addMCOn(id,mc){
    //    var atker = this.getItemByID(id)
    //    if(!atker)
    //    {
    //        throw new Error('XXX')
    //        return;
    //    }
    //
    //    atker.parent.addChildAt(mc,atker.parent.getChildIndex(atker) + 1);
    //}

    //在A上播放动画
    public playAniOn(a,mvID){
        if(PKData_wx3.getInstance().quick)
            return null;
        var atker = this.getItemByID(a)
        if(!atker)
        {
            throw new Error('XXX')
            return;
        }
        var scale = Math.max(1,(atker.data.getVO().height)/70);
	wx3_function(4950);
        var AM = AniManager_wx3.getInstance();
        var mv = AM.playOnItem(mvID,atker);
        if(mv)
            mv.scaleX = mv.scaleY = scale
        return  mv;
    }
    //在A里播放动画
	private wx3_functionX_13038(){console.log(9983)}
    public playAniIn(a,mvID){
        if(PKData_wx3.getInstance().quick)
            return null;
        var atker = this.getItemByID(a)
        if(!atker)
        {
            throw new Error('XXX')
            return;
        }
        var scale = Math.max(1,(atker.data.getVO().height)/70);
	wx3_function(3002);
        var AM = AniManager_wx3.getInstance();
        var mv = AM.playInItem(mvID,atker);
        if(mv)
            mv.scaleX = mv.scaleY = scale
        return  mv;
    }
	private wx3_functionX_13039(){console.log(9266)}

    //掉在头上
    public dropOn(a,mvID){
        if(PKData_wx3.getInstance().quick)
            return null;
        var atker = this.getItemByID(a)
        if(!atker)
        {
            throw new Error('XXX')
            return;
        }
        var AM = AniManager_wx3.getInstance();
	wx3_function(8120);
        return AM.drop(mvID,atker);
    }

    //暴击动画
    public playDoubleHit(item:PKMonsterItem_wx3,value){
         var txt = this.createTxt_6626();
        txt.textColor = 0xFF0000;
	wx3_function(7204);
        txt.text = '!' + Math.ceil(value);
        txt.x = item.x;
        txt.y = item.y - item.data.getVO().height - 30;
        this.con.addChildAt(txt,item.parent.getChildIndex(item) + 1)
        this.txtArr.push(txt);

	wx3_function(6885);
        var tw = egret.Tween.get(txt);
        tw.to({y:txt.y - 20},300).wait(200).call(function(){
            ArrayUtil.removeItem(this.txtArr,txt);
            this.freeTxt_377(txt);
        },this)


    }
	private wx3_functionX_13040(){console.log(2784)}

    //MISS动画
    public playMiss(item){
        var txt = this.createTxt_6626();
        txt.textColor = 0xFFFFFF;
        txt.text = 'miss';
        txt.x = item.x;
	wx3_function(3504);
        txt.y = item.y - item.data.getVO().height - 30;
        this.con.addChildAt(txt,item.parent.getChildIndex(item) + 1)
        this.txtArr.push(txt);

        var tw = egret.Tween.get(txt);
        tw.to({y:txt.y - 20},300).to({alpha:0},300).call(function(){
            ArrayUtil.removeItem(this.txtArr,txt);
	wx3_function(7197);
            this.freeTxt_377(txt);
        },this)
    }


    public playSkillName(item:PKMonsterItem_wx3,value){
        var txt = this.createTxt_6626();
        txt.textColor = 0xFFFFFF;
        txt.strokeColor = 0x660000
        wx3_function(7204);
        txt.text = value;
        txt.x = item.x;
        txt.y = item.y - item.data.getVO().height - 30;
        this.con.addChildAt(txt,item.parent.getChildIndex(item) + 1)
        this.txtArr.push(txt);

        wx3_function(6885);
        var tw = egret.Tween.get(txt);
        tw.wait(800).call(function(){
            ArrayUtil.removeItem(this.txtArr,txt);
            this.freeTxt_377(txt);
        },this)


    }

    //随机一人发言
    private lastTalk = {1:0,'-1':0}
    public randomTalk(){

        if(Math.random() > 0.02)
            return;
        var item = this.itemArr[Math.floor(this.itemArr.length*Math.random())];
	wx3_function(503);
        if(item && !item.talkItm)
        {
            if(egret.getTimer() < this.lastTalk[item.data.atkRota])
                return;
            item.talk();
            this.lastTalk[item.data.atkRota] = egret.getTimer() + 3000 + Math.floor(Math.random()*2000);
	wx3_function(9488);
        }

    }

}