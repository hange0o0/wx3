class MySkillItem extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "PKSkillItemSkin";
    }

    private mc: eui.Image;
    private rateMC: eui.Image;
    private numText: eui.Label;


    public childrenCreated() {
        super.childrenCreated();
        this.rateMC.visible = false
        this.addBtnEvent(this,()=>{
            if(this.data)
                SkillInfoUI.getInstance().show(this.data,'info')
        })
    }

    public dataChanged(){
        if(!this.data)
        {
            this.mc.source = 'black_bg_alpha_png';
            this.numText.text = '';
            return;
        }
        var vo = SkillVO.getObject(this.data.id)
        this.mc.source = vo.getImage();
        this.numText.text = 'x' + this.data.num
    }


}

class PKSkillItem extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "PKSkillItemSkin";
    }

    private mc: eui.Image;
    private rateMC: eui.Image;
    private numText: eui.Label;

    public stopDrag = false

    public childrenCreated() {
        super.childrenCreated();

        DragManager_wx3.getInstance().setDrag(this,true);

        this.addBtnEvent(this,()=>{
            if(this.data)
                SkillInfoUI.getInstance().show(this.data,'use')
            DragManager_wx3.getInstance().endDrag();
        })
    }

    public dataChanged(){
        if(!this.data)
        {
            this.stopDrag = true;
            this.mc.source = 'black_bg_alpha_png';
            this.numText.text = '';
            return;
        }
        this.stopDrag = false;
        var vo = SkillVO.getObject(this.data.id)
        this.mc.source = vo.getImage();
        this.numText.text = 'x' + this.data.num
    }

    public getDragSource(){
        return SkillVO.getObject(this.data.id).getImage();
    }
    public getDragData(){
        return this.data.id;
    }

    public onE(){
        this.rateMC.height = 0;
    }




}