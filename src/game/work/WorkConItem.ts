class WorkConItem extends game.BaseItem{

    private timeText: eui.Label;
    private list: eui.List;
    private redMC: eui.Image;



    public constructor() {
        super();
        this.skinName = "WorkConItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public dataChanged():void {

    }


}