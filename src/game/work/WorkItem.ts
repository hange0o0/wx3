class WorkItem extends game.BaseItem_wx3{

    private bg: eui.Image;
    private mc: eui.Image;
    private numText: eui.Label;
	private wx3_functionX_12658(){console.log(2204)}



    public constructor() {
        super();
        this.skinName = "WorkItemSkin";
	wx3_function(1677);
    }

    public childrenCreated() {
        super.childrenCreated();
        //this.addBtnEvent(this,this.onClick_1390)
    }
	private wx3_functionX_12659(){console.log(6300)}

    private onClick_1390(e){
         e.stopImmediatePropagation();
        var arr = [];
        for(var i=0;i<this.data.list.length;i++)
        {
            arr.push(this.data.list[i].id)
        }
        CardInfoUI.getInstance().show(this.data.id,arr,this.data.list.indexOf(this.data))
    }
	private wx3_functionX_12660(){console.log(9306)}

    public dataChanged():void {
        var vo = MonsterVO.getObject(this.data.id)
        this.bg.source = vo.getBG()
        this.mc.source = vo.getImage()
        this.numText.text = this.data.num>1?'x'+this.data.num:''
    }
	private wx3_functionX_12661(){console.log(4574)}


}