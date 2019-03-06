class FightingItem extends game.BaseItem{

    private headMC: eui.Image;
    private nameText: eui.Label;
    private desText: eui.Label;
    private btn: eui.Button;



    public constructor() {
        super();
        this.skinName = "FightingItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.btn,this.onClick)
    }

    private onClick(){

    }

    public dataChanged():void {
        PKManager.getInstance().setHead(this.headMC,this.data.head)
        this.nameText.text = ''
        this.desText.text = ''
        this.btn.label = '撤回'
        this.btn.label = '查看'
    }


}