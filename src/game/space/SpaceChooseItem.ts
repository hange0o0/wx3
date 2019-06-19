class SpaceChooseItem extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "SpaceChooseItemSkin";
    }

    private bg: eui.Image;
    private mc: eui.Image;
    private costGroup: eui.Group;
    private costText: eui.Label;
    private lvText: eui.Label;





    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,()=>{
            SpaceChooseCardUI.getInstance().chooseCard(this.data)
        })
        MyTool.addLongTouch(this,()=>{
            CardInfoUI.getInstance().show(this.data)
        },this)
    }

    public dataChanged(){
        var vo = MonsterVO.getObject(this.data)
        this.bg.source = vo.getBG()
        this.mc.source = vo.getImage();
        this.costText.text = vo.cost + ''
        this.lvText.text = 'LV.' + MonsterManager.getInstance().getMonsterLevel(this.data);
    }


}