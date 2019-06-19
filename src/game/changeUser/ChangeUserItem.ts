class ChangeUserItem extends game.BaseItem_wx3{

    private mc: eui.Image;
    private nameText: eui.Label;

    public constructor() {
        super();
        this.skinName = "ChangeUserItemSkin";
    }


    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
    }


    private onClick(){
        MyADManager.getInstance().showAD(this.data)
    }

    public dataChanged():void {
        this.mc.source = this.data.logo;
        this.nameText.text = StringUtil.getStringByLength(this.data.name,5);
    }

}

class ChangeUserItem2 extends ChangeUserItem {
    public constructor() {
        super();
        this.currentState = 's2'
    }
}