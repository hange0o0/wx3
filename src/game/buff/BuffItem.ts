class BuffItem extends game.BaseItem{

    private con: eui.Group;
    private chooseMC: eui.Image;
    private headMC: eui.Image;
    private icon: eui.Image;
    private rateText: eui.Label;
    private barGroup: eui.Group;
    private barMC: eui.Image;
    private deleteMC: eui.Image;


    public constructor() {
        super();
        this.skinName = "BuffItemSkin";
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