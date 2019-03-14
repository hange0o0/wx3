class ChapterItem extends game.BaseItem{

    private numText: eui.Label;
    private con: eui.Group;
    private s0: eui.Image;
    private s1: eui.Image;
    private s2: eui.Image;
    private lockMC: eui.Image;



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
            var enemy = {
                bgid:this.data.id%7 || 7,
                list:this.data.list1,
                seed:Math.ceil((Math.random() + 1)*10000000000),
                force:Math.floor(Math.pow(this.data.id - 1,1.15))
            }
            PKPosUI.getInstance().show({
                title:'扩张版图-' + this.data.id,
                chooseList:PKManager.getInstance().getLastAtkList(),
                isPK:true,
                isAtk:true,
                enemy:enemy,
                maxNum:TecManager.getInstance().getTeamNum(),
                maxCost:TecManager.getInstance().getTeamCost(),
                fun:(list)=>{
                    PKPosUI.getInstance().hide();
                    var pkObj:any = {
                        seed:enemy.seed,
                        list1:this.data.list1,
                        force1:enemy.force,
                        mforce1:{},
                        list2:list,
                        force2:TecManager.getInstance().getAtkForce(),
                        mforce2:MonsterManager.getInstance().getMonsterPKForce(list)
                    }
                    var result = PKManager.getInstance().getPKResult(pkObj);
                    if(result == 2)
                    {
                        var hpObj = PKData.getInstance().getHpData();
                        var hpRate2 =  (hpObj[2] || 0)/(hpObj['2_max'] || 1)
                        if(hpRate2 >= 0.8)
                            PKManager.getInstance().setChapterStar(this.data.id,3);
                        else if(hpRate2 >= 0.5)
                            PKManager.getInstance().setChapterStar(this.data.id,2);
                        else
                            PKManager.getInstance().setChapterStar(this.data.id,12);
                    }
                    MainPKUI.getInstance().show(pkObj);
                    this.dataChanged();
                },
            })
        }
    }

    public dataChanged():void {
        this.lockMC.visible = UM.chapterLevel+1 < this.data.id;
        this.numText.visible = !this.lockMC.visible;
        this.numText.text = this.data.id;
        this.currentState = this.data.id >= 1000?'s2':'s1'
        this.con.removeChildren();
        var star = PKManager.getInstance().getChapterStar(this.data.id);
        for(var i=0;i<star;i++)
        {
            if(i<star)
            {
                this.con.addChild(this['s' + i]);
            }
        }
    }


}