class PKBuffUI extends game.BaseUI {

    private static _instance: PKBuffUI;
    public static getInstance(): PKBuffUI {
        if(!this._instance)
            this._instance = new PKBuffUI();
        return this._instance;
    }

    private q0: eui.Image;
    private q1: eui.Image;
    private mc0: eui.Image;
    private mc1: eui.Image;
    private mc2: eui.Image;
    private mc3: eui.Image;
    private mc4: eui.Image;
    private mc5: eui.Image;
    private mc6: eui.Image;
    private mc7: eui.Image;
    private mc8: eui.Image;
    private rd0: eui.Image;
    private rd1: eui.Image;
    private rd2: eui.Image;
    private rd3: eui.Image;
    private rd4: eui.Image;
    private rd5: eui.Image;
    private a0: eui.Image;
    private a1: eui.Image;
    private a2: eui.Image;
    private h0: eui.Image;
    private h1: eui.Image;
    private h2: eui.Image;
    private atkBtn: eui.Button;
    private numText: eui.Label;





    private fun;

    public constructor() {
        super();
        this.skinName = "PKBuffUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();


        this.addBtnEvent(this.atkBtn,this.onAtk)
    }

    private onAtk(){
        this.hide();
        this.fun(0,0)
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

    }

}