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
    private closeBtn: eui.Image;




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
        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.okBtn,()=>{
            if(this.isFree)
            {
                ShareTool.share('日常推荐一个好游戏',Config.localResRoot + "share_img_2.jpg",{},()=>{
                    var SM = SpaceManager.getInstance();
                    SM.myCurrentList = SM.myCurrentList.concat(this.data)
                    for(var i=0;i<this.data.length;i++)
                    {
                        var index = SM.myDieList.indexOf(this.data[i]);
                        SM.myDieList.splice(index,1)
                    }
                    SM.rebornTime ++;
                    UM_wx3.needUpUser = true;
                    EM_wx3.dispatch(GameEvent.client.SPACE_CHANGE)
                    MyWindow.ShowTips('解封成功')
                    this.hide();
                })
                return;
            }
            this.hide();
        })
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
        this.titleText.text = this.isFree?'解封怪物':'已解封的怪物'
        this.okBtn.label = this.isFree?'免费解封':'确定'
        this.currentState = this.isFree?'s2':'s1'
        this.closeBtn.visible = this.isFree
    }
}