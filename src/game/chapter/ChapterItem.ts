class ChapterItem extends game.BaseItem{

    private numText: eui.Label;
    private con: eui.Group;
    private s0: eui.Image;
    private s1: eui.Image;
    private s2: eui.Image;
    private lockMC: eui.Image;
    private img: eui.Image;
    private diamondMC: eui.Image;




    public constructor() {
        super();
        this.skinName = "ChapterItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
    }

    private onClick(){
        ChapterManager.getInstance().pkChapter(this.data.id)
        TaskManager.getInstance().guideTaskVO = null;
        //GuideManager.getInstance().testShowGuide()
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
        this.diamondMC.visible = star != 3
        for(var i=0;i<star;i++)
        {
            if(i<star)
            {
                this.con.addChild(this['s' + i]);
            }
        }

        var TSM = TaskManager.getInstance()
        if(TSM.guideTaskVO && TSM.guideTaskVO.type == 'clv' && UM.chapterLevel+1 == this.data.id)
        {
            TaskManager.getInstance().showGuideMC(this);
        }
    }


}