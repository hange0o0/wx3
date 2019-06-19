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
    private btnGroup: eui.Group;
    private infoBtn: eui.Button;
    private pkBtn: eui.Group;






    public type = 0;

    public constructor() {
        super();
        this.skinName = "SpaceMyListUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.scroller.viewport = this.list;
        this.list.itemRenderer = SpaceMyListItem
        this.addBtnEvent(this.closeBtn,this.hide)

        this.addBtnEvent(this.pkBtn,()=>{
            ShareTool.openGDTV(()=>{
                SpaceManager.getInstance().reborn();
                this.renew();
            })
        })

        this.addBtnEvent(this.infoBtn,()=>{
             this.type = this.type==0?1:0
            this.renew()
        })


    }

    public show(data?){
        this.type = SpaceManager.getInstance().myCurrentList.length?0:1;
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
        //this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
    }

    //private onTimer(){
    //
    //}

    public renew(){
        var SM = SpaceManager.getInstance();
        var obj = {};
        var arr = this.type == 0?SM.myCurrentList:SM.myDieList
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i];
            obj[id] = (obj[id] || 0) + 1
        }
        var list = [];
        for(var s in obj)
        {
            list.push({
                id:s,
                list:list,
                num:obj[s]
            })
        }
        this.list.dataProvider = new eui.ArrayCollection(list);
        this.titleText.text = this.type == 0?'可上阵的怪物':'被封印的怪物'
        this.infoBtn.label = this.type == 0?'被封印的怪物':'可上阵的怪物'
        this.btnGroup.visible = SM.myDieList.length > 0
    }
}