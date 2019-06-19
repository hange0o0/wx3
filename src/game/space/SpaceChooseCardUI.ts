class SpaceChooseCardUI extends game.BaseWindow_wx3 {

    private static _instance: SpaceChooseCardUI;
    public static getInstance(): SpaceChooseCardUI {
        if(!this._instance)
            this._instance = new SpaceChooseCardUI();
        return this._instance;
    }

    private list: eui.List;
    private chooseList: eui.List;
    private closeBtn: eui.Image;


    public constructor() {
        super();
        this.skinName = "SpaceChooseCardUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.list.itemRenderer = SpaceMyListItem
        this.chooseList.itemRenderer = SpaceChooseItem
        this.addBtnEvent(this.closeBtn,this.hide)
    }

    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
    }

    public chooseCard(cardID){
        var SM = SpaceManager.getInstance();
        SM.myCurrentList.push(cardID);
        SM.myDieList.length = 0;
        if(SM.myCurrentList.length >= 6)
        {
            SM.resetType4();
            this.hide();
        }
        else
        {
            this.renew();
            EM_wx3.dispatch(GameEvent.client.SPACE_CHANGE)
        }
    }

    public renew(){
        var SM = SpaceManager.getInstance();
        var list = [];
        for(var i=0;i<6;i++)
        {
            list.push({
                id:SM.myCurrentList[i],
                list:list,
                num:0
            })
        }
        this.list.dataProvider = new eui.ArrayCollection(list);


        if(!SM.myDieList.length)
        {
            var myOpenCard = MonsterManager.getInstance().getOpenMonster();
            for(var i=0;i<3;i++)
            {
                SM.myDieList.push(ArrayUtil.randomOne(myOpenCard,true).id)
            }
            UM_wx3.needUpUser = true;
        }
        this.chooseList.dataProvider = new eui.ArrayCollection(SM.myDieList);
    }
}