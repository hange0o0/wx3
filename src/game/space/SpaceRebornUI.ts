class SpaceRebornUI extends game.BaseWindow_wx3 {

    private static _instance: SpaceRebornUI;
    public static getInstance(): SpaceRebornUI {
        if(!this._instance)
            this._instance = new SpaceRebornUI();
        return this._instance;
    }

    private titleText: eui.Label;
    private list: eui.List;
    private okBtn: eui.Button;



    public constructor() {
        super();
        this.skinName = "SpaceRebornUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();

        this.list.itemRenderer = SpaceMyListItem
        this.addBtnEvent(this.okBtn,this.hide)
    }

    public show(data?){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
    }

    public renew(){

    }
}