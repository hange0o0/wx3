class FightItem extends game.BaseItem{

    private headMC: eui.Image;
    private nameText: eui.Label;



    public constructor() {
        super();
        this.skinName = "FightItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public dataChanged():void {
        PKManager.getInstance().setHead(this.headMC,this.data.head)
         this.nameText.text = this.data.nick
    }


}