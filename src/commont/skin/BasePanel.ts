class BasePanel extends game.BaseContainer {
    public constructor() {
        super();
        this.skinName = "BasePanelSkin";
    }
	private wx3_functionX_12177(){console.log(372)}

    private bottomGroup: eui.Group;
    private nameText: eui.Label;


    public setTitle(title){
       this.nameText.text = title
    }
	private wx3_functionX_12178(){console.log(30)}

    public setBottomHeight(v){
       this.bottomGroup.height = v
    }
}