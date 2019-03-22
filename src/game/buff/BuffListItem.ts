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

    private onClick(e){
        e.stopImmediatePropagation()
        if(BuffUI.getInstance().currentChooseID == this.data.openid)
        {
            BuffUI.getInstance().onUnSelect()
            return;
        }
        BuffUI.getInstance().onUserClick(this.data.openid)
    }

    public dataChanged():void {
        this.headMC.source = this.data.head || 'common_head_bg_jpg'
        this.nameText.text = this.data.nick
        this.chooseMC.visible = false;
        this.onTimer();
    }

    public onTimer(){
        var cd = BuffManager.getInstance().buffCD
        var rate = (cd - (TM.now() - this.data.time))/cd;
        this.barMC.width = 204 * rate
    }

    public onUserClick(openid){
        this.chooseMC.visible = openid == this.data.openid
    }


}