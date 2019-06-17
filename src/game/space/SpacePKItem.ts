class SpacePKItem extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "SpacePKItemSkin";
    }

    private bg: eui.Image;
    private mc: eui.Image;
    private rateMC: eui.Image;
    private costText: eui.Label;


    private _stopDrag = false;
    private isCDing = false;
    public get stopDrag(){
        return this._stopDrag || this.isCDing;
    }
    public childrenCreated() {
        super.childrenCreated();
        DragManager_wx3.getInstance().setDrag(this,true);
        this.addBtnEvent(this,()=>{
            CardInfoUI.getInstance().show(this.data.id,this.data.list,this.data.index-1)
        })
    }

    public dataChanged(){
        var vo = SkillVO.getObject(this.data.isSkill)
        this.mc.source = vo.getImage();
    }

    public showMV(){
        this._stopDrag = true;
        egret.Tween.removeTweens(this.mc);
        egret.Tween.get(this.mc).to({scaleX:0,scaleY:0},100).call(()=>{
            var vo = MonsterVO.getObject(this.data.id)
            this.mc.source = vo.getImage(true)
        },this).to({scaleX:1.2,scaleY:1.2},100).to({scaleX:1,scaleY:1},100).call(()=>{
            this.bg.source = 'border_16_png'
            this._stopDrag = false;
            this.onE();
        },this)
    }

    public onE() {
        if(this._stopDrag)
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