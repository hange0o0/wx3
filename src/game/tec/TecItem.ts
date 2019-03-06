class TecItem extends game.BaseItem{

    private indexMC: eui.Rect;
    private headMC: eui.Image;
    private nameText: eui.Label;
    private desText: eui.Label;
    private upGroup: eui.Group;
    private iconMC: eui.Image;
    private valueText: eui.Label;
    private upBtn: eui.Button;
    private rateBar: eui.Group;
    private barMC: eui.Image;
    private rateText: eui.Label;



    public constructor() {
        super();
        this.skinName = "TecItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public dataChanged():void {

    }


}