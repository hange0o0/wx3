class SkillShopItem extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "SkillShopItemSkin";
    }

    private img: eui.Image;
    private nameText: eui.Label;
    private coinText: eui.Label;
    private buyFinishMC: eui.Group;
    private numText: eui.Label;



    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,()=>{
            if(this.buyFinishMC.visible)
                return;
            SkillInfoUI.getInstance().show(this.data,'buy')
        })
    }

    public dataChanged(){
        var vo = SkillVO.getObject(this.data.id)
        this.img.source = vo.getImage();
        this.nameText.text = vo.name
        this.coinText.text = NumberUtil.addNumSeparator(this.data.coin);
        this.numText.text = 'x' + this.data.num;
        this.buyFinishMC.visible = this.data.isBuy;
    }


}