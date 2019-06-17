class SpaceMyListUI extends game.BaseWindow_wx3 {

    private static _instance: SpaceMyListUI;
    public static getInstance(): SpaceMyListUI {
        if(!this._instance)
            this._instance = new SpaceMyListUI();
        return this._instance;
    }

    private titleText: eui.Label;
    private closeBtn: eui.Image;
    private scroller: eui.Scroller;
    private list: eui.List;
    private infoBtn: eui.Button;
    private pkBtn: eui.Button;





    public constructor() {
        super();
        this.skinName = "SpaceMyListUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();

        this.scroller.viewport = this.list;
        this.list.itemRenderer = SpaceMyListItem
        this.addBtnEvent(this.closeBtn,this.hide)

        this.addBtnEvent(this.pkBtn,()=>{

        })

        this.addBtnEvent(this.infoBtn,()=>{

        })


    }

    public show(data?){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
    }

    private onTimer(){

    }

    public renew(){

    }
}