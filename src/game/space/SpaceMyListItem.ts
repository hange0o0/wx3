class SpaceMyListItem extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "SpaceMyListItemSkin";
    }

    private bg: eui.Image;
    private mc: eui.Image;
    private numText: eui.Label;



    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,()=>{
            if(!this.data.id)
                return;
            var arr = [];
            for(var i=0;i<this.data.list.length;i++)
            {
                if(this.data.list[i].id)
                    arr.push(this.data.list[i].id)
            }
            CardInfoUI.getInstance().show(this.data.id,arr,this.data.list.indexOf(this.data))
        })
    }

    public dataChanged(){
        if(!this.data.id)
        {
            this.bg.source = 'border_16_png'
            this.mc.source = '';
            this.numText.text = '';
            return;
        }
        var vo = MonsterVO.getObject(this.data.id)
        this.bg.source = vo.getBG()
        this.mc.source = vo.getImage();
        this.numText.text = this.data.num?('x' + this.data.num):''
    }


}