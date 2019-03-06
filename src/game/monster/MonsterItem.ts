class MonsterItem extends game.BaseItem{
    private bg2: eui.Image;
    private cardGroup: eui.Group;
    private bg: eui.Image;
    private text: eui.Label;
    private lvText: eui.Label;
    private numText: eui.Label;




    public constructor() {
        super();
        this.skinName = "MonsterItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public dataChanged():void {

    }


}