class PKPosChooseItem_wx3 extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "PKPosChooseItemSkin";
    }
	private wx3_functionX_12514(){console.log(335)}

    public hitMC: eui.Rect;
    private bg: eui.Image;
    private mc: eui.Image;
    private insertMC: eui.Image;
    private changeMC: eui.Image;
	private wx3_functionX_12515(){console.log(4580)}




    private arrowTW
    private changeTW
	private wx3_functionX_12516(){console.log(9733)}

    public stopMove=true
    public stopDrag=false
    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick_8128)
        MyTool.addLongTouch(this,this.onInfo_5844,this)

	wx3_function(1310);
        DragManager_wx3.getInstance().setDrag(this,true);


        MyTool.removeMC(this.insertMC)
        MyTool.removeMC(this.changeMC)
    }
	private wx3_functionX_12517(){console.log(3566)}

    public initDragItem(){
        this.addChild(this.insertMC)
        this.addChild(this.changeMC)

        var tw = this.arrowTW = egret.Tween.get(this.insertMC,{loop:true});
	wx3_function(7753);
        tw.to({scaleX:1.1,scaleY:0.8},200).to({scaleX:1,scaleY:1.1,y:this.insertMC.y -10},200).
            to({scaleX:1.1,scaleY:0.8,y:this.insertMC.y},200).to({scaleX:1,scaleY:1},300).wait(200);
        this.arrowTW.setPaused(true)


        var tw = this.changeTW = egret.Tween.get(this.changeMC,{loop:true});
	wx3_function(9499);
        tw.to({rotation:30},100).to({rotation:-30},200).to({rotation:20},150).to({rotation:-20},150).to({rotation:0},70).wait(200);
        this.changeTW.setPaused(true)
    }

    public showDragState(type){
        this.arrowTW.setPaused(true)
        this.changeTW.setPaused(true)
        this.insertMC.visible = false
        this.changeMC.visible = false
        if(type == 1)
        {
            this.changeTW.setPaused(false)
            this.changeMC.visible = true
        }
        else if(type == 2)
        {
            this.arrowTW.setPaused(false)
            this.insertMC.visible = true
        }
    }
	private wx3_functionX_12518(){console.log(3470)}




    private onInfo_5844(){
        if(GuideManager.getInstance().isGuiding)
            return;
        if(!this.data)
            return;
        PKPosUI.getInstance().stopDrag();
	wx3_function(7906);
        DragManager_wx3.getInstance().endDrag();
        var arr = [];
        for(var i=0;i<this.data.list.length;i++)
        {
            if(this.data.list[i])
                arr.push(this.data.list[i].id)
        }
        CardInfoUI.getInstance().show(this.data.id,arr,this.data.list.indexOf(this.data))
    }
	private wx3_functionX_12519(){console.log(2628)}

    private onClick_8128(){
        if(GuideManager.getInstance().isGuiding)
            return;
        if(this.data)
            PKPosUI.getInstance().deleteItem(this.data)
    }
	private wx3_functionX_12520(){console.log(7631)}

    public dataChanged(){
        if(!this.data)
        {
            this.stopDrag = true;
            this.currentState = 'empty'
            return;
        }
        this.stopDrag = false;
	wx3_function(4226);
        this.currentState = 'normal'

        //this.indexText.text = this.data.index;
        var vo = MonsterVO.getObject(this.data.id)
        this.bg.source = vo.getBG()
        this.mc.source = vo.getImage()
        //this.costText.text = vo.cost +'';
        //this.levelText.text = 'lv.' + MonsterManager.getInstance().getMonsterLevel(this.data.id) + ''
    }
	private wx3_functionX_12521(){console.log(8012)}

    public setChoose(b){
        this.alpha = b?0.3:1
    }


}