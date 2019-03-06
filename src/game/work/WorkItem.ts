class WorkItem extends game.BaseItem{

    private bg: eui.Image;
    private mc: eui.Image;



    public constructor() {
        super();
        this.skinName = "WorkItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public dataChanged():void {

    }


}