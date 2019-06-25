class SkillUI extends game.BaseUI_wx3 {

    private static _instance: SkillUI;
    public static getInstance(): SkillUI {
        if(!this._instance)
            this._instance = new SkillUI();
        return this._instance;
    }

    private myList: eui.List;
    private scroller: eui.Scroller;
    private list: eui.List;
    private topUI: TopUI;
    private bottomUI: BottomUI;
    private freeBtn: eui.Button;
    private videoBtn: eui.Button;






    public dataProvider = new eui.ArrayCollection()
    public constructor() {
        super();
        this.skinName = "SkillUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.bottomUI.setHide(this.hide,this);
        this.topUI.setTitle('我的技能')

        this.list.itemRenderer = SkillShopItem
        this.scroller.viewport = this.list

        this.myList.itemRenderer = MySkillItem

        this.addBtnEvent(this.freeBtn,()=>{
            var SM = SkillManager.getInstance();
            if(TM_wx3.now() - SM.freeTime < SM.freeCD)
                return;
            this.refresh(true);
        })

        this.addBtnEvent(this.videoBtn,()=>{
            ShareTool.openGDTV(()=>{
                this.refresh(false);
            })
        })
    }

    private refresh(isFree){
        SkillManager.getInstance().renewShop(isFree);
        this.renew()
        this.onTimer();
    }






    public show(){
        super.show()
    }


    public hide() {
        //MainPKUI.instance.hide();
        super.hide();
        //TaskManager.getInstance().guideTaskVO = null;
        //GameUI.getInstance().onTimer();
    }

    public onShow(){
        this.renew()
        this.renewSelf()
        this.onTimer()
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        this.addPanelOpenEvent(GameEvent.client.SKILL_CHANGE,this.renewList)


        var TSM = TaskManager.getInstance()
        if(TSM.guideTaskVO && TSM.guideTaskVO.type == 'skill')
        {
            this.list.validateNow();
            for(var i=0;i<this.list.numChildren;i++)
            {
                var mc = this.list.getChildAt(i)
                var data = mc['data']
                if(!data.isBuy)
                {
                    TaskManager.getInstance().showGuideMC(mc);
                    break;
                }
            }
        }
    }

    public onTimer(){
        var SM = SkillManager.getInstance();
        var cd = SM.freeCD - (TM_wx3.now() - SM.freeTime)
        if(cd <= 0)
        {
            this.freeBtn.label = '免费刷新'
            this.freeBtn.skinName = 'Btn2Skin'
        }
        else
        {
            this.freeBtn.label = DateUtil.getStringBySecond(cd)
            this.freeBtn.skinName = 'Btn3Skin'
        }
    }

    private renewList(){
        MyTool.renewList(this.list);
        this.renewSelf();
    }

    public renew(){
       this.list.dataProvider = new eui.ArrayCollection(SkillManager.getInstance().shopList)
    }


    public renewSelf(){
        var arr = []
        for(var s in UM_wx3.skills)
        {
            arr.push({
                id:s,
                num:UM_wx3.skills[s]
            })
        }
        while(arr.length < 5)
        {
            arr.push(null);
        }
        this.myList.dataProvider = new eui.ArrayCollection(arr)
    }
}