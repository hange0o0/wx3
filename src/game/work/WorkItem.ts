class WorkItem extends game.BaseItem{

    private bg: eui.Image;
    private mc: eui.Image;
    private numText: eui.Label;



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
        var vo = MonsterVO.getObject(this.data.id)
        this.bg.source = vo.getBG()
        this.mc.source = vo.getImage()
        this.numText.text = this.data.num>1?'x'+this.data.num:''
        console.log(this.data.id,this.data.num)
    }


}