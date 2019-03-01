class CoinGameListItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "CoinGameListItemSkin";
    }

    private bg: eui.Image;
    private mc: eui.Image;
    private costText: eui.Label;







    private stopClick



    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
        MyTool.addLongTouch(this,this.onInfo,this)
    }


    private onInfo(){
        var arr = [];
        for(var i=0;i<this.data.list.length;i++)
        {
            arr.push(this.data.list[i].id)
        }
        CardInfoUI.getInstance().show(this.data.id,arr,this.data.list.indexOf(this.data))
    }

    private onClick(){
        if(this.stopClick)
            return;
          CoinGameUI.getInstance().addChoose(this.data.id)
    }

    public dataChanged(){
        //this.indexText.text = this.data.index;
        var vo = MonsterVO.getObject(this.data.id)
        this.bg.source = vo.getBG()
        this.stopClick = CoinGameUI.getInstance().leaveCost < vo.cost || CoinGameUI.getInstance().getChooseNum() >= 10;
        this.mc.source = vo.getImage(this.stopClick)
        this.costText.text = vo.cost +'';
    }

}