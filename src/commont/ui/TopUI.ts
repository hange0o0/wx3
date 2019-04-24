class TopUI extends game.BaseContainer {
    public constructor() {
        super();
    }

    //private closeBtn: eui.Button;
	private wx3_functionX_12223(){console.log(4184)}
    private titleText: eui.Label;
    private helpBtn: eui.Image;



    private helpKey
	private wx3_functionX_12224(){console.log(9414)}
    public childrenCreated() {
        this.addBtnEvent(this.helpBtn,this.onHelp);
        this.helpBtn.visible = false;
    }

    public onHelp(){
         //HelpManager.getInstance().showHelp(this.helpKey)
    }
	private wx3_functionX_12225(){console.log(8076)}

    public setTitle(name:string,helpKey?):void{
        this.titleText.text = name;
        this.helpKey = helpKey
        this.helpBtn.visible = helpKey;
    }
    //private backBtnClick(event:egret.TouchEvent):void {
    //    this.dispatchEventWith("hide");
    //}
}