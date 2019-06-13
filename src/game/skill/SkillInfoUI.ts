class SkillInfoUI extends game.BaseWindow_wx3 {

    private static _instance: SkillInfoUI;
    public static getInstance(): SkillInfoUI {
        if(!this._instance)
            this._instance = new SkillInfoUI();
        return this._instance;
    }
    private skillMC: eui.Image;
    private skillNameText: eui.Label;
    private desText: eui.Label;
    private closeBtn: eui.Image;
    private coinGroup: eui.Group;
    private coinText: eui.Label;
    private btn: eui.Button;
    private numText: eui.Label;
    private item: PKCardInfoItem_wx3;






    public data
    public showType
    public constructor() {
        super();
        this.skinName = "SkillInfoUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        var SM = SkillManager.getInstance();
        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.btn,()=>{
            if(this.showType == 'info')//丢弃
            {
                MyWindow.Confirm('确定丢弃技能卷轴【'+SkillVO.getObject(this.data.id).name+'】？',(b)=>{
                    if(b==1)
                    {
                        SM.addSkill(this.data.id,-SM.getSkillNum(this.data.id))
                        this.hide();
                    }
                });
            }
            else if(this.showType == 'buy')//
            {
                 if(ObjectUtil.objLength(UM_wx3.skills) >= 5 && SM.getSkillNum(this.data.id)==0)
                 {
                     MyWindow.Alert('技能格子已满，无法购买该技能\n你可先丢弃不需要的技能腾出空位')
                     return;
                 }
                if(!UM_wx3.checkCoin(this.data.coin))
                    return;
                this.data.isBuy = true;
                UM_wx3.addCoin(-this.data.coin)
                SM.addSkill(this.data.id,this.data.num)
                SM.saveShop();
                this.hide();
            }
        })
    }

    public onClose(){
        this.hide();
    }



    public show(data?,showType?){
       this.data = data;
       this.showType = showType;
        if(this.showType == 'buff')
            this.currentState = 'use';
        else
            this.currentState = showType;
        super.show()
    }

    public hide() {
        super.hide();

    }

    public onShow(){
        this.renew();

        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.renewCoin)
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
    }

    private onTimer(){
        if(this.showType == 'buff')
        {
            this.desText.text = ''
        }
    }

    private renewCoin(){
        if(this.showType == 'buy')
        {
            this.coinText.text = NumberUtil.addNumSeparator(UM_wx3.coin) + ' / ' + NumberUtil.addNumSeparator(this.data.coin)
        }
    }


    public renew(){
        var vo = SkillVO.getObject(this.data.id)
        this.item.data = {index:5,icon:'icon_clock_png',iconScale:1,title:'使用间隔',value:MyTool.toFixed(vo.cd/1000,1)+'秒'}
       this.renewCoin();
        this.skillMC.source = vo.getImage();
        this.skillNameText.text = vo.name
        this.numText.text = 'x' + (this.data.num || SkillManager.getInstance().getSkillNum(this.data.id));
        this.setHtml(this.desText,vo.getDes(TecManager.getInstance().getTecLevel(41),true))

        if(this.showType == 'use')
        {
            this.desText.text = '拖进战场中即可使用'
        }

        this.onTimer();
    }


}