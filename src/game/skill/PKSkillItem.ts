class MySkillItem extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "PKSkillItemSkin";
    }

    private mc: eui.Image;
    private rateMC: eui.Image;
    private numGroup: eui.Group;
    private numText: eui.Label;
    private lockMC: eui.Image;




    public childrenCreated() {
        super.childrenCreated();
        this.rateMC.visible = false
        this.lockMC.visible = false
        this.addBtnEvent(this,()=>{
            if(this.data)
                SkillInfoUI.getInstance().show(this.data,'info')
        })
    }

    public dataChanged(){
        if(!this.data)
        {
            this.mc.source = 'black_bg_alpha_png';
            this.numGroup.visible = false
            return;
        }
        var vo = SkillVO.getObject(this.data.id)
        this.mc.source = vo.getImage();
        this.numText.text = 'x' + this.data.num
        this.numGroup.visible = true
    }


}

class PKSkillItem extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "PKSkillItemSkin";
    }

    private bg: eui.Image;
    private mc: eui.Image;
    private rateMC: eui.Image;
    private numGroup: eui.Group;
    private numText: eui.Label;
    private lockMC: eui.Image;



    private _stopDrag = false;
    private isCDing = false;
    public get stopDrag(){
        return this._stopDrag || this.isCDing;
    }

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
        if(!this.data || this.data.disable)
        {
            this._stopDrag = true;
            this.mc.source = 'black_bg_alpha_png';
            this.numGroup.visible = false;
            this.lockMC.visible = this.data
            this.rateMC.height = 0;
            return;
        }
        this.lockMC.visible = false
        this._stopDrag = false;
        var vo = SkillVO.getObject(this.data.id)
        this.mc.source = vo.getImage();
        this.numText.text = 'x' + this.data.num
        this.numGroup.visible = true;
        this.isCDing = false;
    }

    public getDragSource(){
        return SkillVO.getObject(this.data.id).getImage();
    }
    public getDragData(){
        return this.data.id;
    }

    public onE() {
        if(!this.data || this.data.disable)
            return;
        var PD = PKData_wx3.getInstance();
        var lastTime = PD.skillUseTime[this.data.id] || 0
        var vo = SkillVO.getObject(this.data.id)
        this.isCDing = lastTime &&  PD.actionTime - lastTime < vo.cd
        if(this.isCDing)
        {
            this.rateMC.height = (vo.cd - (PD.actionTime - lastTime))/vo.cd*80;
            this.bg.source = 'border_16_png'
        }
        else
        {
            this.rateMC.height = 0;
            this.bg.source = 'border_14_png'
        }
    }




}