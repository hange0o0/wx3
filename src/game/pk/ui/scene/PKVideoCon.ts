class PKVideoCon_wx3 extends game.BaseContainer {
    private static _instance:PKVideoCon_wx3;
    public static getInstance() {
        if(!this._instance)
            this._instance = new PKVideoCon_wx3();
        return this._instance;
    }

    public constructor() {
        super();
        this.skinName = "PKVideoConSkin";
    }
    private con: eui.Group;
    private bg: eui.Image;




    public itemArr = []
    public totemArr = []
    public txtPool = []
    public txtArr = []


    private monsterY = 400;
    private isHang

    public childrenCreated() {
        super.childrenCreated();

        this.width = PKConfig_wx3.floorWidth +  PKConfig_wx3.appearPos*2

        PKData_wx3.getInstance().addEventListener('video',this.onVideoEvent,this);



    }
    private wx3_fun_asdfasdfasdf(){}
    private wx3_fun_ast34(){}

    public init(dataIn){
        this.bg.visible = !this.isHang;

        if(this.bg.visible)
            this.bg.source = PKManager_wx3.getInstance().getPKBG(dataIn.seed);

        this.remove();

    }

    public remove(){
        while(this.itemArr.length)
        {
            var item = this.itemArr.pop();
            PKData_wx3.getInstance().actionRecord.push('mv_remove2|' + (item.data && item.data.id))
            PKMonsterItem_wx3.freeItem(item);
        }
        while(this.txtArr.length)
        {
            var item = this.txtArr.pop();
            this.freeTxt(item);
        }
        //while(this.totemArr.length)
        //{
        //    var item = this.totemArr.pop();
        //    PKTotem_wx3.freeItem(item);
        //}
    }

    public resetView(){
        this.remove();
        var PD = PKData_wx3.getInstance()
        for(var i=0;i<PD.monsterList.length;i++)
        {
            var item = PKMonsterItem_wx3.createItem();
            item.y =  this.monsterY + PD.monsterList[i].y;

            this.con.addChildAt(item,this.getIndexByY(item.y));
            item.data =PD.monsterList[i];
            this.itemArr.push(item);
            item.stand();
        }
    }




    private createTxt():eui.Label{
        var item:eui.Label = this.txtPool.pop();
        if(!item)
        {
            item = new eui.Label();
            item.size = 20;
            item.stroke = 2;
            item.width = 160;
            item.textAlign="center"
            item.anchorOffsetX = 80;
        }
        item.alpha = 1;
        return item;
    }

    private freeTxt(item){
        if(!item)
            return;
        egret.Tween.removeTweens(item)
        MyTool.removeMC(item);
        this.txtPool.push(item);
    }

    public getItemByID(id):PKMonsterItem_wx3{
        for(var i=0;i<this.itemArr.length;i++)
        {
            var item = this.itemArr[i];
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

    //取出现深度
    private getIndexByY(y){
        var underItem
        for(var i=0;i<this.itemArr.length;i++)
        {
            var item = this.itemArr[i];
            if(item.y > y)
                continue;
            if(!underItem || underItem.y < item.y)
                underItem = item;
        }
        if(underItem)
            return this.con.getChildIndex(underItem) + 1;
        return 1
    }

    public resetAllMVSpeed(){
        for(var i=0;i<this.itemArr.length;i++)
        {
            this.itemArr[i].resetSpeed();
        }
    }

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
                    item.y =  this.monsterY + data.y;

                this.con.addChildAt(item,this.getIndexByY(item.y));
                item.data =data;
                this.itemArr.push(item);
                PKData_wx3.getInstance().actionRecord.push('mv_add|' + data.id)
                item.stand();
                if(data.mid == 99)
                {

                    item.run(50)
                }

                break;
            case PKConfig_wx3.VIDEO_MONSTER_MOVE:
                item = this.getItemByID(data.id);
                if(item)
                    item.run(data.addSpeed);
                break;
            case PKConfig_wx3.VIDEO_MONSTER_ATK:
                item = this.getItemByID(data.id);
                if(videoData.target)
                    item.setRota2(videoData.target.x)
                item.atk(data.addSpeed);
                break;
            case PKConfig_wx3.VIDEO_MONSTER_DOUBLE:
                if(data.die)  //死了就不显示
                    break;
                item = this.getItemByID(data.id);
                this.playDoubleHit(item,videoData.value);
                break;
            case PKConfig_wx3.VIDEO_MONSTER_MISS:
                item = this.getItemByID(data.id);
                this.playMiss(item);
                break;

            case PKConfig_wx3.VIDEO_MONSTER_HPCHANGE:
                item = this.getItemByID(data.id);
                item.renewHp();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_WIN:
                item = this.getItemByID(data.id);
                item.winRemove();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_ADD_STATE:
                item = this.getItemByID(data.id);
                item.showAddStateMV(videoData.keys);
                break;
            case PKConfig_wx3.VIDEO_MONSTER_DIE:
                item = this.getItemByID(data.id);
                item.die();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_STAND:
                item = this.getItemByID(data.id);
                item.stand();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_STATE_CHANGE:
                item = this.getItemByID(data.id);
                item.renewState();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_NOHIT:
                item = this.getItemByID(data.id);
                item.showMianShang();
                break;
            case PKConfig_wx3.VIDEO_MANAHP_CHANGE:
                item = this.getItemByID(data.id);
                item.renewState();
                break;
            case PKConfig_wx3.VIDEO_MONSTER_CHANGE_TEAM:
                item = this.getItemByID(data.id);
                item.setTeam();
                break;
            //case PKConfig_wx3.VIDEO_TOTEM_ADD:
            //    var totemItem = PKTotem_wx3.createItem();
            //    totemItem.y =  this.monsterY + videoData.y;
            //    totemItem.x =  videoData.x;
            //    this.con.addChildAt(totemItem,this.getIndexByY(totemItem.y));
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


    public action(){
        var item:PKMonsterItem_wx3;
        for(var i=0;i<this.itemArr.length;i++)
        {
            item = this.itemArr[i];
            if(item.needRemove)//移除过期ID
            {
                PKMonsterItem_wx3.freeItem(item);
                this.itemArr.splice(i,1);
                PKData_wx3.getInstance().actionRecord.push('mv_remove|' + (item.data && item.data.id))
                i--;
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
        if(AM.preLoadMV(mvID))
        {
            var xy = MyTool.getMiddleXY(atker,defender)
            xy.y -= defender.data.getVO().height/2
            var index1 = this.con.getChildIndex(atker)
            var index2 = this.con.getChildIndex(defender)
            AM.playOnItem(mvID,index1>index2?atker:defender,xy);
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
        var AM = AniManager_wx3.getInstance();
        var mv = AM.playOnItem(mvID,atker);
        if(mv)
            mv.scaleX = mv.scaleY = scale
        return  mv;
    }
    //在A里播放动画
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
        var AM = AniManager_wx3.getInstance();
        var mv = AM.playInItem(mvID,atker);
        if(mv)
            mv.scaleX = mv.scaleY = scale
        return  mv;
    }

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
        return AM.drop(mvID,atker);
    }

    //暴击动画
    public playDoubleHit(item:PKMonsterItem_wx3,value){
         var txt = this.createTxt();
        txt.textColor = 0xFF0000;
        txt.text = '!' + Math.ceil(value);
        txt.x = item.x;
        txt.y = item.y - item.data.getVO().height - 30;
        this.con.addChildAt(txt,item.parent.getChildIndex(item) + 1)
        this.txtArr.push(txt);

        var tw = egret.Tween.get(txt);
        tw.to({y:txt.y - 20},300).wait(200).call(function(){
            ArrayUtil.removeItem(this.txtArr,txt);
            this.freeTxt(txt);
        },this)


    }

    //MISS动画
    public playMiss(item){
        var txt = this.createTxt();
        txt.textColor = 0xFFFFFF;
        txt.text = 'miss';
        txt.x = item.x;
        txt.y = item.y - item.data.getVO().height - 30;
        this.con.addChildAt(txt,item.parent.getChildIndex(item) + 1)
        this.txtArr.push(txt);

        var tw = egret.Tween.get(txt);
        tw.to({y:txt.y - 20},300).to({alpha:0},300).call(function(){
            ArrayUtil.removeItem(this.txtArr,txt);
            this.freeTxt(txt);
        },this)
    }

    //随机一人发言
    private lastTalk = {1:0,'-1':0}
    public randomTalk(){

        if(Math.random() > 0.02)
            return;
        var item = this.itemArr[Math.floor(this.itemArr.length*Math.random())];
        if(item && !item.talkItm)
        {
            if(egret.getTimer() < this.lastTalk[item.data.atkRota])
                return;
            item.talk();
            this.lastTalk[item.data.atkRota] = egret.getTimer() + 3000 + Math.floor(Math.random()*2000);
        }

    }

}