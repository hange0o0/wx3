class MainPKItem_wx3 extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "MainPKItemSkin";
    }
	private wx3_functionX_12414(){console.log(8790)}

    private bg: eui.Image;
    private mc: eui.Image;
    //private indexText: eui.Label;



	private wx3_functionX_12415(){console.log(9168)}






	private wx3_functionX_12416(){console.log(9793)}
    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick_3492)
    }
    private wx3_fun_asdfasdfasdf_5220(){}
    private wx3_fun_ast34_9884(){}
	private wx3_functionX_12417(){console.log(5679)}

    private onClick_3492(){
        if(GuideManager.getInstance().isGuiding)
            return;
        if(this.data.otherForce == -1)
            CardInfoUI.getInstance().show(this.data.id,this.data.list,this.data.index-1)
        else
            CardInfoUI.getInstance().show(this.data.id,this.data.list,this.data.index-1,{otherForce:this.data.otherForce || 0})
    }
	private wx3_functionX_12418(){console.log(9072)}

    public dataChanged(){
        //this.indexText.text = this.data.index;
        var vo = MonsterVO.getObject(this.data.id)
        if(this.data.isDie)
            this.bg.source = 'border_16_png'
        else
            this.bg.source = vo.getBG()
        this.mc.source = vo.getImage(this.data.isDie)
    }
	private wx3_functionX_12419(){console.log(2442)}

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
	private wx3_functionX_12420(){console.log(6829)}

    public showBorn(){
        egret.Tween.removeTweens(this.mc);
        var vo = MonsterVO.getObject(this.data.id)
        this.mc.source = vo.getImage()
        this.bg.source = vo.getBG()
        egret.Tween.get(this.mc).to({rotation:5},50).to({rotation:-5},50).to({rotation:5},50).to({rotation:-5},50).to({rotation:0},50)
        egret.Tween.get(this.mc).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1,scaleY:1},200)
    }
	private wx3_functionX_12421(){console.log(3197)}

}