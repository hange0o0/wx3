class PKPosListItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "PKPosListItemSkin";
    }

    private bg: eui.Image;
    private mc: eui.Image;
    private numBar: eui.Image;
    private levelText: eui.Label;
    private costText: eui.Label;









    private stopClick



    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
        MyTool.addLongTouch(this,this.onInfo,this)
    }


    private onInfo(){
        if(GuideManager.getInstance().isGuiding)
            return;
        var arr = [];
        for(var i=0;i<this.data.list.length;i++)
        {
            arr.push(this.data.list[i].id)
        }
        CardInfoUI.getInstance().show(this.data.id,arr,this.data.list.indexOf(this.data))
    }

    private onClick(){
        if(this.data.add)
        {
            PKPosAddUI.getInstance().show();
            return;
        }
        if(this.stopClick)
            return;
          PKPosUI.getInstance().addChoose(this.data.id)
    }

    public dataChanged(){
        if(this.data.add)
        {
            this.currentState = 'add'
            return;
        }
        this.currentState = 'normal'
        //this.indexText.text = this.data.index;
        var ui = PKPosUI.getInstance();
        var vo = MonsterVO.getObject(this.data.id)
        var num = ui.getFreeMonsterNum(this.data.id)
        this.bg.source = vo.getBG()
        this.stopClick = num <= 0 || (ui.maxCost - ui.currentCost < vo.cost) ||( ui.getChooseNum() >= ui.maxNum);
        this.mc.source = vo.getImage(this.stopClick)
        this.costText.text = vo.cost +'';
        this.numBar.width =  num*8
        this.levelText.text = 'lv.' + MonsterManager.getInstance().getMonsterLevel(this.data.id) + ''
    }

}