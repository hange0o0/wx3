class ChangeUserUI extends game.BaseContainer_wx3 {
    private list: eui.List;
    private dataProvider:eui.ArrayCollection

    public constructor() {
        super();
        this.skinName = "ChangeUserUISkin";
    }


    public childrenCreated() {
        super.childrenCreated();
        this.list.itemRenderer = ChangeUserItem
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();
    }

    private timer
    public renew(){
        if(!this.stage)
            return
        var list = MyADManager.getInstance().getListByNum(10)
        if(list.length < 10)
        {
            clearTimeout(this.timer)
            this.timer = setTimeout(()=>{
                this.renew();
            },1000);
            return;
        }
        this.dataProvider.source = list;
        this.dataProvider.refresh();
    }
}