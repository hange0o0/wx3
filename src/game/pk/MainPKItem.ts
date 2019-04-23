class MainPKItem_wx3 extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "MainPKItemSkin";
    }

    private bg: eui.Image;
    private mc: eui.Image;
    //private indexText: eui.Label;









    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
    }
    private wx3_fun_asdfasdfasdf(){}
    private wx3_fun_ast34(){}

    private onClick(){
        if(GuideManager.getInstance().isGuiding)
            return;
        if(this.data.otherForce == -1)
            CardInfoUI.getInstance().show(this.data.id,this.data.list,this.data.index-1)
        else
            CardInfoUI.getInstance().show(this.data.id,this.data.list,this.data.index-1,{otherForce:this.data.otherForce || 0})
    }

    public dataChanged(){
        //this.indexText.text = this.data.index;
        var vo = MonsterVO.getObject(this.data.id)
        if(this.data.isDie)
            this.bg.source = 'border_16_png'
        else
            this.bg.source = vo.getBG()
        this.mc.source = vo.getImage(this.data.isDie)
    }

    public showDie(){
        egret.Tween.removeTweens(this.mc);
        this.mc.rotation = 0;

        egret.Tween.get(this.mc).to({scaleX:0,scaleY:0},200).call(()=>{
            var vo = MonsterVO.getObject(this.data.id)
            this.mc.source = vo.getImage(true)
        },this).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1,scaleY:1},200).call(()=>{
            this.bg.source = 'border_16_png'
        },this)
    }

    public showBorn(){
        egret.Tween.removeTweens(this.mc);
        var vo = MonsterVO.getObject(this.data.id)
        this.mc.source = vo.getImage()
        this.bg.source = vo.getBG()
        egret.Tween.get(this.mc).to({rotation:5},50).to({rotation:-5},50).to({rotation:5},50).to({rotation:-5},50).to({rotation:0},50)
        egret.Tween.get(this.mc).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1,scaleY:1},200)
    }

}