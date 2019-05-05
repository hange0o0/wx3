class PKCardInfoItem_wx3 extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "PKCardInfoItemSkin";
    }
	private wx3_functionX_12529(){console.log(7)}

    private rect: eui.Rect;
    private barMC: eui.Rect;
    private icon: eui.Image;
    private text: eui.Label;

	private wx3_functionX_12530(){console.log(3869)}






	private wx3_functionX_12531(){console.log(1397)}
    public childrenCreated() {
        super.childrenCreated();
        //this.addBtnEvent(this,this.onClick_1899)
    }

    private onClick_1899(){

    }
	private wx3_functionX_12532(){console.log(7283)}

    public dataChanged(){
        this.barMC.visible = false
        var arr = [1,4,5,8]
        if(arr.indexOf(this.data.index) != -1)
            this.currentState = 'stat1'
        else
            this.currentState = 'stat2'
        //{index:1,icon:'icon_cost_png',iconScale:1,title:'费用',value:vo.cost,valueAdd:0},
        this.icon.source = this.data.icon
        this.icon.scaleX = this.icon.scaleY = this.data.iconScale
        if(this.data.title)
        {
            this.rect.visible = true
            this.setHtml(this.text, this.createHtml(this.data.title,0xFFB17C) + '：' +  this.data.value
                + (this.data.valueAdd ? this.createHtml(' +'+this.data.valueAdd,0xFFB17C) : ''))
        }
        else
        {
            this.rect.visible = false
            this.text.text = ''
        }

        if(this.data.rate)
        {
            this.barMC.visible = true;
	wx3_function(1565);
            this.barMC.width = this.data.rate * 205;
        }

    }

}