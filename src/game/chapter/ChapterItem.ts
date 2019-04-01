class ChapterItem extends game.BaseItem{

    private numText: eui.Label;
    private con: eui.Group;
    private s0: eui.Image;
    private s1: eui.Image;
    private s2: eui.Image;
    private lockMC: eui.Image;
    private img: eui.Image;



    public constructor() {
        super();
        this.skinName = "ChapterItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
    }

    private onClick(){
        if(this.data.id <= UM.chapterLevel + 1)
        {
            if(UM.getEnergy() < 1)
            {
                MyWindow.ShowTips('体力不足')
                return;
            }
            var enemy = {
                bgid:this.data.id%7 || 7,
                list:this.data.list1,
                seed:Math.ceil((Math.random() + 1)*10000000000),
                force:Math.floor(Math.pow(this.data.id - 1,1.15))
            }
            PKPosUI.getInstance().show({
                title:'收复据点 - NO.' + this.data.id,
                autoList:true,
                isPK:true,
                isAtk:true,
                enemy:enemy,
                maxNum:TecManager.getInstance().getTeamNum(),
                maxCost:TecManager.getInstance().getTeamCost(),
                fun:(list)=>{
                    PKPosUI.getInstance().hide();
                    UM.addEnergy(-1);
                    var pkObj:any = {
                        seed:enemy.seed,
                        list1:this.data.list1,
                        force1:enemy.force,
                        mforce1:{},
                        list2:list,
                        buff2:BuffManager.getInstance().getAtkAdd(),
                        force2:TecManager.getInstance().getAtkForce(),
                        mforce2:MonsterManager.getInstance().getMonsterPKForce(list)
                    }
                    var result = PKManager.getInstance().getPKResult(pkObj);
                    if(result == 2)
                    {
                        PKData.instanceIndex = 2;
                        var hpObj = PKData.getInstance().getHpData();
                        var hpRate2 =  (hpObj[2] || 0)/(hpObj['2_max'] || 1)
                        if(hpRate2 >= 0.8)
                            ChapterManager.getInstance().setChapterStar(this.data.id,3);
                        else if(hpRate2 >= 0.5)
                            ChapterManager.getInstance().setChapterStar(this.data.id,2);
                        else
                            ChapterManager.getInstance().setChapterStar(this.data.id,1);
                        PKData.instanceIndex = 1;
                        UM.addCoin(ChapterManager.getInstance().resultEarn.coin)
                        UM.addDiamond(ChapterManager.getInstance().resultEarn.diamond)
                    }
                    else
                    {
                        ChapterManager.getInstance().resultEarn = null;
                    }
                    MainPKUI.getInstance().show(pkObj);
                    EM.dispatch(GameEvent.client.CHAPTER_CHANGE)
                },
            })
        }
    }

    public dataChanged():void {
        if(UM.chapterLevel+1 < this.data.id)
        {
            this.currentState = 'lock';
            return;
        }
        this.currentState = 'normal';
        var star = ChapterManager.getInstance().getChapterStar(this.data.id);
        this.numText.visible = !star;
        this.numText.text = 'NO.'+ this.data.id;
        this.con.removeChildren();
        var id = this.data.list1.split(',')[0]
        this.img.source = MonsterVO.getObject(id).getImage(star == 3);
        for(var i=0;i<star;i++)
        {
            if(i<star)
            {
                this.con.addChild(this['s' + i]);
            }
        }
    }


}