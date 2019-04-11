class PKBuffUI extends game.BaseWindow {

    private static _instance: PKBuffUI;
    public static getInstance(): PKBuffUI {
        if(!this._instance)
            this._instance = new PKBuffUI();
        return this._instance;
    }

    private atkBar: eui.Image;
    private atkText: eui.Label;
    private atkArrow: eui.Image;
    private hpBar: eui.Image;
    private hpText: eui.Label;
    private hpArrow: eui.Image;
    private btnGroup: eui.Group;
    private refreshBtn: eui.Button;
    private pkBtn: eui.Button;
    private desText: eui.Label;







    private fun;
    private currentStep;
    private maxStep = 5;


    private atkAdd = 0
    private hpAdd = 0

    public constructor() {
        super();
        this.skinName = "PKBuffUISkin";
        this.canBGClose = false;
    }

    public childrenCreated() {
        super.childrenCreated();


        this.addBtnEvent(this.pkBtn,this.onAtk)
        this.addBtnEvent(this.refreshBtn,this.onRefresh)



    }

    public onRefresh(){
        if(this.currentStep <= 0)
        {
            MyWindow.ShowTips('步数已用完，请点击【进入战斗】开始挑战')
            return;
        }
        this.currentStep --;


        var hp = Math.round(Math.random()*30)
        var atk = Math.round(Math.random()*30)

        this.atkArrow.visible = atk != this.atkAdd;
        this.atkArrow.source = atk > this.atkAdd?'arrow5_png':'arrow4_png'

        this.hpArrow.visible = hp != this.hpAdd;
        this.hpArrow.source = hp > this.hpAdd?'arrow5_png':'arrow4_png'

        this.hpAdd = hp;
        this.atkAdd = atk;

        this.renewShow();
    }

    private renewShow(){
        this.desText.text =  '剩余刷新次数：'+this.currentStep+'次'
        this.atkText.text = '攻击 +'+this.atkAdd + '%'
        this.hpText.text = '血量 +'+this.hpAdd + '%'
        this.atkBar.width = 204 * this.atkAdd/30
        this.hpBar.width = 204 * this.hpAdd/30
        if(this.currentStep <= 0)
            MyTool.removeMC(this.refreshBtn)
        else
            this.btnGroup.addChildAt(this.refreshBtn,0)
    }


    private onAtk(){
        this.hide();
        this.fun(this.atkAdd,this.hpAdd)
        this.hide();
    }

    public show(fun?){
        this.fun = fun
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
    }


    public renew(){

        this.hpAdd = Math.round(Math.random()*30)
        this.atkAdd = Math.round(Math.random()*30)
        this.atkArrow.visible = false
        this.hpArrow.visible = false
        this.currentStep = this.maxStep;

        this.renewShow();
    }

}