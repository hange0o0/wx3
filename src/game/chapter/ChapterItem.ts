class ChapterItem extends game.BaseItem{

    private numText: eui.Label;
    private con: eui.Group;
    private s0: eui.Image;
	private wx3_functionX_12262(){console.log(1945)}
    private s1: eui.Image;
    private s2: eui.Image;
    private lockMC: eui.Image;
    private img: eui.Image;
    private diamondMC: eui.Image;

	private wx3_functionX_12263(){console.log(8382)}



    public constructor() {
        super();
        this.skinName = "ChapterItemSkin";
	wx3_function(497);
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick_4581)
    }
	private wx3_functionX_12264(){console.log(5926)}

    private onClick_4581(){
        ChapterManager.getInstance().pkChapter(this.data.id)
        //TaskManager.getInstance().guideTaskVO = null;
        //GuideManager.getInstance().testShowGuide()
    }

    public dataChanged():void {
        if(UM_wx3.chapterLevel+1 < this.data.id)
        {
            this.currentState = 'lock';
	wx3_function(8921);
            return;
        }
        this.currentState = 'normal';
        var star = ChapterManager.getInstance().getChapterStar(this.data.id);
        this.numText.visible = !star;
        this.numText.text = 'NO.'+ this.data.id;
	wx3_function(1202);
        this.con.removeChildren();
        var id = this.data.list1.split(',')[0]
        this.img.source = MonsterVO.getObject(id).getImage(star == 3);
        this.diamondMC.visible = star != 3
        for(var i=0;i<star;i++)
        {
            if(i<star)
            {
                this.con.addChild(this['s' + i]);
	wx3_function(1556);
            }
        }

        var TSM = TaskManager.getInstance()
        if(TSM.guideTaskVO && TSM.guideTaskVO.type == 'clv' && UM_wx3.chapterLevel+1 == this.data.id)
        {
            TaskManager.getInstance().showGuideMC(this);
	wx3_function(8059);
        }
    }


}