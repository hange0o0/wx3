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



    private data
    private isFree
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

    public show(data?,isFree?){
        this.data = data;
        this.isFree = isFree;
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
    }

    public renew(){
        var list = [];
        for(var s in this.data)
        {
            list.push({
                id:this.data[s],
                list:list,
                num:0
            })
        }
        this.list.dataProvider = new eui.ArrayCollection(list);
        this.titleText.text = this.isFree?'已为你免费解封以下怪物':'已解封的怪物'
    }
}