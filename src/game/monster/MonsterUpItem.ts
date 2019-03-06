class MonsterUpItem extends game.BaseItem{
    private item: MonsterItem;
    private text: eui.Label;
    private rateBar: eui.Group;
    private barMC: eui.Image;
    private rateText: eui.Label;





    public constructor() {
        super();
        this.skinName = "MonsterUpItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public dataChanged():void {

    }


}