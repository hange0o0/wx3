class SpaceInfoUI extends game.BaseWindow_wx3 {

    private static _instance: SpaceInfoUI;
    public static getInstance(): SpaceInfoUI {
        if(!this._instance)
            this._instance = new SpaceInfoUI();
        return this._instance;
    }

    private titleText: eui.Label;
    private infoBtn: eui.Button;
    private pkBtn: eui.Button;
    private desText: eui.Label;
    private closeBtn: eui.Image;
    private iconMC: eui.Image;
    private cancelBtn: eui.Button;
    private cdText: eui.Label;
    private numText: eui.Label;





    public constructor() {
        super();
        this.skinName = "SpaceInfoUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)

        this.addBtnEvent(this.pkBtn,()=>{
            if(this.pkBtn.label == '离开空间')
            {
                this.exit();
                return
            }
            SpaceManager.getInstance().startPK()
        })
        this.addBtnEvent(this.cancelBtn,()=>{
            this.exit();
        })

        this.addBtnEvent(this.infoBtn,()=>{
            SpaceMyListUI.getInstance().show();
        })


    }

    public exit(){
        MyWindow.Confirm('确定要放弃并离开这个空间吗？',(b)=>{
            if(b==1)
            {
                SpaceManager.getInstance().spaceType = 0
                this.hide();
                SpaceUI.getInstance().show();
            }
        },['取消', '离开']);
    }

    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        this.addPanelOpenEvent(GameEvent.client.SPACE_CHANGE,this.renew)
    }

    private onTimer(){
        var SM = SpaceManager.getInstance();
        var cd = SM.maxTime - (TM_wx3.now() - SM.addTime);
        if(cd < 0)
        {
            SM.spaceType = 0;
            UM_wx3.needUpUser = true;
            MyWindow.Alert('时间已到，被空间排斥出来了')
            egret.callLater(this.hide,this);
            return
        }
        this.cdText.text = '挑战剩余时间：' + DateUtil.getStringBySecond(cd);
    }

    public renew(){
        var SM = SpaceManager.getInstance();
         var data = SM.baseData[SM.spaceType];
        this.titleText.text = data.name
        this.desText.text = '　　' + data.des
        this.iconMC.source = 'space_'+SM.spaceType+'_png'
        this.cancelBtn.visible = true;
        if(SM.level)
        {
            this.numText.text = '未被封印的怪物：' + SM.myCurrentList.length + '/'  + (SM.myCurrentList.length + SM.myDieList.length)
            switch(SM.spaceType)
            {
                case 2:
                case 7:
                    this.pkBtn.label = '开始战斗';
                    break;
                default:
                    this.pkBtn.label = '第 '+SM.level+' 关';
                    break;
            }
            if(SM.myCurrentList.length  == 0)
            {
                this.pkBtn.label = '离开空间';
                this.cancelBtn.visible = false;
            }
        }
        else
        {
            this.numText.text = ''
            this.pkBtn.label = '选择怪物 ' + SM.myCurrentList.length + '/6'
        }

        this.onTimer()
    }
}