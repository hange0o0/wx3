class ChapterItem extends game.BaseItem{

    private numText: eui.Label;
    private con: eui.Group;
    private s0: eui.Image;
    private s1: eui.Image;
    private s2: eui.Image;


    public constructor() {
        super();
        this.skinName = "ChapterItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public dataChanged():void {

    }


}