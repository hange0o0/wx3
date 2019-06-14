class PKSkillBuffItem extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "PKSkillBuffItemSkin";
    }

    private mc: eui.Image;

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