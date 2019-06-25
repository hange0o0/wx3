class GuessTeamUI extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "GuessTeamUISkin";
    }

    private con: eui.Group;
    private bg: eui.Image;
    private resultGroup: eui.Group;
    private myText: eui.Label;












    private monsterArr = []
    public teamID
    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.con,this.onMClick)
    }

    private onMClick(e){
        var x = e.stageX;
        var y = e.stageY;

        for(var i=this.monsterArr.length-1;i>=0;i--)
        {
            var mc = this.monsterArr[i];
            //if(mc.currentMV.hitTestPoint(x,y,true)) //bug 3-26,去掉true
            if(mc.clickMC.hitTestPoint(x,y)) //bug 3-26,去掉true
            {
                if(GuideManager.getInstance().isGuiding && GuideManager.getInstance().guideKey2 == 'info')
                    GuideManager.getInstance().guideKey2 = ''

                var list = [];
                for(var j=0;j<this.monsterArr.length;j++)
                {
                    list.push(this.monsterArr[j].id)
                }
                CardInfoUI.getInstance().show(mc.id,list,i,{otherForce:10000});
                break;
            }
        }
    }



    private lastTalk = 0
    public randomTalk(){
        if(Math.random() > 0.5)
            return;
        var item = this.monsterArr[Math.floor(this.monsterArr.length*Math.random())];
        if(item && !item.talkItm)
        {
            if(egret.getTimer() < this.lastTalk)
                return;
            item.talk();
            this.lastTalk = egret.getTimer() + 3000 + Math.floor(Math.random()*2000);
        }
    }

    public giftTalk(cost){
        if(Math.random() > cost/20)
            return;
        var item = this.monsterArr[Math.floor(this.monsterArr.length*Math.random())];
        if(item && !item.talkItm)
        {
            item.talk(1);
            setTimeout(()=>{
                this.giftTalk(cost*0.6)
            },100)
        }
        else if(cost > 100)
        {
            setTimeout(()=>{
                this.giftTalk(cost*0.95)
            },100)
        }

    }

    public showList(arr) {
        //var arr = [1,2,3,4,5,6,7,8,9,10,11,12]
        //ArrayUtil.random(arr,3);
        //arr.length = Math.max(2,Math.floor(Math.random()*arr.length))
        while(this.monsterArr.length > 0)
        {
            PKMonsterMV_wx3.freeItem(this.monsterArr.pop());
        }


        arr = arr.concat();
        if(this.teamID == 1)
            arr.reverse();
        var des = Math.min(440/(arr.length-1),80)
        var begin = (560-des*(arr.length-1))/2
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i]
            var vo = MonsterVO.getObject(id);
            var item = PKMonsterMV_wx3.createItem();
            this.con.addChild(item);
            item.load(id)
            item.stand();
            item.scaleX = item.scaleY = 1;
            item.currentMV.scaleX = Math.abs(item.currentMV.scaleX);
            if(this.teamID == 1)
                item.currentMV.scaleX *= -1
            item.bottom = -10+vo.height*0.5;
            item['w'] = vo.width
            item.x = begin + i*des
            this.monsterArr.push(item);
        }

        var sortList = this.monsterArr.concat();
        ArrayUtil.sortByField(sortList,['bottom','w'],[1,1]);
        for(var i=0;i<sortList.length;i++)
        {
            this.con.addChild(sortList[i]);
        }
        this.bg.source = PKManager_wx3.getInstance().getDefBG()
    }

    public renewGuessCost(){
        var myGuess = GuessManager.getInstance().myGuess;
        if(!myGuess || myGuess.result)
        {
            this.resultGroup.visible = false
            return
        }
        var coin = myGuess['coin' + this.teamID]
        this.resultGroup.visible = coin > 0
        if(this.resultGroup.visible)
        {
            var otherCoin =  myGuess['coin' + (this.teamID == 1?2:1)]
            this.setHtml(this.myText,this.createHtml('我的投注：',0xFFCC8C) +this.createHtml(NumberUtil.addNumSeparator(parseInt(coin)),coin>otherCoin?0x00ff00:0xffffff));
        }
    }

}