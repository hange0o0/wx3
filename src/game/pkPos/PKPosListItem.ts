class PKPosListItem_wx3 extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "PKPosListItemSkin";
    }
	private wx3_functionX_12522(){console.log(9674)}

    private bg: eui.Image;
    private mc: eui.Image;
    private numBar: eui.Image;
    private levelText: eui.Label;
    private costText: eui.Label;
	private wx3_functionX_12523(){console.log(4589)}






	private wx3_functionX_12524(){console.log(4286)}



    private stopClick


	private wx3_functionX_12525(){console.log(2301)}

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick_6715)
        MyTool.addLongTouch(this,this.onInfo_5284,this)
    }
	private wx3_functionX_12526(){console.log(496)}


    private onInfo_5284(){

        if(GuideManager.getInstance().isGuiding)
            return;
        if(this.data.add)
            return;
        var arr = [];
	wx3_function(5001);
        for(var i=0;i<this.data.list.length;i++)
        {
            if(this.data.list[i].id)
                arr.push(this.data.list[i].id)
        }
        if(PKPosUI.getInstance().dataIn.type == 'ask')
            CardInfoUI.getInstance().show(this.data.id,arr,this.data.list.indexOf(this.data),{otherForce:10000})
        else
            CardInfoUI.getInstance().show(this.data.id,arr,this.data.list.indexOf(this.data))
    }
	private wx3_functionX_12527(){console.log(7196)}

    private onClick_6715(){
        if(this.data.add)
        {
            PKPosAddUI.getInstance().show();
            return;
        }
        if(this.stopClick)
            return;
          PKPosUI.getInstance().addChoose(this.data.id)
    }
	private wx3_functionX_12528(){console.log(5429)}

    public dataChanged(){
        if(this.data.add)
        {
            this.currentState = 'add'
            return;
        }
        this.currentState = 'normal'
        //this.indexText.text = this.data.index;
	wx3_function(8473);
        var ui = PKPosUI.getInstance();
        var vo = MonsterVO.getObject(this.data.id)
        var num = ui.getFreeMonsterNum(this.data.id)
        this.bg.source = vo.getBG()
        this.stopClick = num <= 0 || (ui.maxCost - ui.currentCost < vo.cost) ||( ui.getChooseNum() >= ui.maxNum);
        this.mc.source = vo.getImage(this.stopClick)
        this.costText.text = vo.cost +'';
	wx3_function(9924);
        this.numBar.width =  num*8
        this.levelText.text = 'lv.' + MonsterManager.getInstance().getMonsterLevel(this.data.id) + ''

        if(ui.dataIn.type == 'ask')
            this.levelText.text = ''
    }

}