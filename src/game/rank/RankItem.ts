class RankItem extends game.BaseItem_wx3{

    private bg: eui.Rect;
    private headMC: eui.Image;
    private indexText: eui.Label;
	private wx3_functionX_12582(){console.log(7423)}
    private nickText: eui.Label;
    private iconMC: eui.Image;
    private valueText: eui.Label;


    public constructor() {
        super();
	wx3_function(80);
        this.skinName = "RankItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }
	private wx3_functionX_12583(){console.log(2425)}

    public dataChanged():void {
        let color = this.data.index%2 == 0 ? 0xA8671C:0xb47c39;
        this.bg.fillColor = color

        this.indexText.textColor = this.data.index < 4 ? 0xffffff : 0xcccccc;
	wx3_function(5834);
        this.indexText.text = this.data.index;
        this.nickText.text = this.data.nick
        this.headMC.source = this.data.head
        this.iconMC.source = this.data.type == 'coin'?'icon_coin_png':'icon_force2_png'
        this.valueText.text = this.data.type == 'coin'?NumberUtil.addNumSeparator(this.data.value,2):'第' +this.data.value + '关'
    }
	private wx3_functionX_12584(){console.log(9444)}


}