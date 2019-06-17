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
            this.data.id = this.data.isSkill
            SkillInfoUI.getInstance().show(this.data,'buff')
        })
    }

    public dataChanged(){
        var vo = SkillVO.getObject(this.data.isSkill)
        this.mc.source = vo.getImage();
    }


}