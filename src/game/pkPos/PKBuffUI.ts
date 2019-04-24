class PKBuffUI extends game.BaseWindow {

    private static _instance: PKBuffUI;
    public static getInstance(): PKBuffUI {
        if(!this._instance)
            this._instance = new PKBuffUI();
        return this._instance;
    }
	private wx3_functionX_12692(){console.log(1422)}

    private atkBar: eui.Image;
    private atkText: eui.Label;
    private atkArrow: eui.Image;
    private lock1: eui.Image;
    private hpBar: eui.Image;
	private wx3_functionX_12693(){console.log(3677)}
    private hpText: eui.Label;
    private hpArrow: eui.Image;
    private lock2: eui.Image;
    private btnGroup: eui.Group;
    private refreshBtn: eui.Button;
    private pkBtn: eui.Button;
	private wx3_functionX_12694(){console.log(3575)}
    private desText: eui.Label;





	private wx3_functionX_12695(){console.log(1019)}



    private fun;
    private currentStep;
    private maxStep = 5;
	private wx3_functionX_12696(){console.log(6775)}


    private atkAdd = 0
    private hpAdd = 0


	private wx3_functionX_12697(){console.log(8908)}
    private isLock1 = false
    private isLock2 = false
    public constructor() {
        super();
        this.skinName = "PKBuffUISkin";
        this.canBGClose = false;
	wx3_function(5464);
    }

    public childrenCreated() {
        super.childrenCreated();


        this.addBtnEvent(this.pkBtn,this.onAtk_2277)
        this.addBtnEvent(this.refreshBtn,this.onRefresh)
        this.addBtnEvent(this.lock1,()=>{this.onLock(1)})
        this.addBtnEvent(this.lock2,()=>{this.onLock(2)})
    }
	private wx3_functionX_12698(){console.log(3919)}

    public onLock(index){
        if(BuffManager.getInstance().getUserNum()<5)
        {
            MyWindow.ShowTips('在【好友助力】中开启加成锁定功能')
            return;
        }
        if(index == 1)
        {
            this.isLock1 = !this.isLock1;
	wx3_function(9553);
            if(this.isLock1)
                this.isLock2 = false;
        }
        else if(index == 2)
        {
            this.isLock2 = !this.isLock2;
	wx3_function(6887);
            if(this.isLock2)
                this.isLock1 = false;
        }
        this.renewLock_8067();
    }

	private wx3_functionX_12699(){console.log(9261)}
    private renewLock_8067(){
        this.lock1.alpha = this.isLock1?1:0.3
        this.lock2.alpha = this.isLock2?1:0.3
    }


	private wx3_functionX_12700(){console.log(3338)}
    public onRefresh(){
        if(this.currentStep <= 0)
        {
            MyWindow.ShowTips('步数已用完，请点击【进入战斗】开始挑战')
            return;
        }
        this.currentStep --;
	wx3_function(7152);


        var hp = this.isLock2?this.hpAdd:Math.round(Math.random()*30)
        var atk = this.isLock1?this.atkAdd:Math.round(Math.random()*30)

        this.atkArrow.visible = atk != this.atkAdd;
	wx3_function(6433);
        this.atkArrow.source = atk > this.atkAdd?'arrow5_png':'arrow4_png'

        this.hpArrow.visible = hp != this.hpAdd;
        this.hpArrow.source = hp > this.hpAdd?'arrow5_png':'arrow4_png'

        this.hpAdd = hp;
	wx3_function(3045);
        this.atkAdd = atk;

        this.renewShow_9454();
    }

    private renewShow_9454(){
        this.desText.text =  '剩余刷新次数：'+this.currentStep+'次'
        this.atkText.text = '攻击 +'+this.atkAdd + '%'
        this.hpText.text = '血量 +'+this.hpAdd + '%'
        this.atkBar.scrollRect = new egret.Rectangle(0,0,204 * this.atkAdd/30,50)
        this.hpBar.scrollRect = new egret.Rectangle(0,0,204 * this.hpAdd/30,50)
        if(this.currentStep <= 0)
            MyTool.removeMC(this.refreshBtn)
        else
            this.btnGroup.addChildAt(this.refreshBtn,0)
    }
	private wx3_functionX_12701(){console.log(8558)}


    private onAtk_2277(){
        this.hide();
        this.fun(this.atkAdd,this.hpAdd)
        this.hide();
	wx3_function(8989);
    }

    public show(fun?){
        if(GuideManager.getInstance().isGuiding)
        {
            fun(0,0);
	wx3_function(7669);
            return;
        }
        this.isLock2 = false
        this.isLock2 = false
        this.fun = fun
        super.show()
    }
	private wx3_functionX_12702(){console.log(5007)}

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renewLock_8067();
	wx3_function(4356);
        this.renew();
    }


    public renew(){

        this.hpAdd = Math.round(Math.random()*30)
        this.atkAdd = Math.round(Math.random()*30)
        this.atkArrow.visible = false
        this.hpArrow.visible = false
        this.currentStep = this.maxStep;
	wx3_function(8909);

        this.renewShow_9454();
    }

}