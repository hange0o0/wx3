class CardImg extends game.BaseItem_wx3{
    public constructor() {
        super();
        this.skinName = "CardImgSkin";
    }
	private wx3_functionX_12288(){console.log(4675)}

    private img: eui.Image;
    private typeMC: eui.Image;



	private wx3_functionX_12289(){console.log(8138)}


    public hideType = false
    public lastSource;
    public childrenCreated() {
        super.childrenCreated();
	wx3_function(7326);
    }

    public dataChanged(){
        this.changeGay(false)
    }

	private wx3_functionX_12290(){console.log(2)}
    public changeGay(b){
        var vo =  CM_wx3.getCardVO(this.data);
        var source = vo.getImage(b);
        if(source != this.lastSource)
        {
            this.img.source = source
            this.lastSource = source;
	wx3_function(5288);
            this.typeMC.visible = this.data > PKConfig_wx3.skillBeginID && !this.hideType;
            this.typeMC.source = vo.getTypeIcon();
        }
    }

}