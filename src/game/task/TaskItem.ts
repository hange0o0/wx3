class TaskItem extends game.BaseItem{

    private nameText: eui.Label;
    private desText: eui.Label;
    private timeText: eui.Label;
    private taskIcon: eui.Image;
    private awardText: eui.Label;
    private goBtn: eui.Button;
    private cdGroup: eui.Group;
    private barMC: eui.Rect;
    private cdText: eui.Label;


    public constructor() {
        super();
        this.skinName = "WorkItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
    }

    private onClick(e){
        e.stopImmediatePropagation();
        var arr = [];
        for(var i=0;i<this.data.list.length;i++)
        {
            arr.push(this.data.list[i].id)
        }
        CardInfoUI.getInstance().show(this.data.id,arr,this.data.list.indexOf(this.data))
    }

    public dataChanged():void {

    }


}