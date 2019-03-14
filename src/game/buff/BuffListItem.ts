class BuffListItem extends game.BaseItem{

    private headMC: eui.Image;
    private barMC: eui.Image;
    private nameText: eui.Label;
    private chooseMC: eui.Image;





    public constructor() {
        super();
        this.skinName = "BuffListItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this,this.onClick)
    }

    private onClick(){
        if(this.data.isAtked())
        {
            return;
        }


    }

    public dataChanged():void {

    }


}