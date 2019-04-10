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

    public question=[1,2]
    public questionItemArr = []

    public result=[1,2,3,4,5,6]
    public resultItemArr = []

    public buffItemArr = []
    public randomItemArr = []

    public maxStep = 5
    public currentStep = 5

    public typeNum = {1:0,2:0,3:0}

    private indexPos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
    ]

    public constructor() {
        super();
        this.skinName = "PKBuffUISkin";
        this.hideBehind = false;
    }

    public childrenCreated() {
        super.childrenCreated();


        this.addBtnEvent(this.atkBtn,this.onAtk)
        this.addBtnEvent(this.rd0,()=>{this.randomList(0)})
        this.addBtnEvent(this.rd1,()=>{this.randomList(1)})
        this.addBtnEvent(this.rd2,()=>{this.randomList(2)})
        this.addBtnEvent(this.rd3,()=>{this.randomList(3)})
        this.addBtnEvent(this.rd4,()=>{this.randomList(4)})
        this.addBtnEvent(this.rd5,()=>{this.randomList(5)})
        for(var i=0;i<6;i++)
        {
            this.randomItemArr.push(this['rd'+i])
        }


        this.questionItemArr = [this.q0,this.q1]
        for(var i=0;i<9;i++)
        {
            this.resultItemArr.push(this['mc' + i])
        }
        for(var i=0;i<3;i++)
        {
            this.buffItemArr.push(this['a' + i])
        }
        for(var i=0;i<3;i++)
        {
            this.buffItemArr.push(this['h' + i])
        }


    }

    public randomList(index){
        if(this.currentStep <= 0)
        {
            MyWindow.ShowTips('步数已用完，请点击【进入战斗】开始挑战')
            return;
        }
        this.currentStep --;
        this.numText.text = this.currentStep + ''
        var arr = this.indexPos[index]
        for(var i=0;i<arr.length;i++)
        {
            this.result[arr[i]] = this.getType();
        }
        this.renewShow();
    }

    private getType(){
        return Math.ceil(Math.random()*3)
    }

    private renewShow(){
        for(var i=0;i<this.result.length;i++)
        {
            this.resultItemArr[i].source = this.getSource(this.result[i])
        }
        for(var i=0;i<this.buffItemArr.length;i++)
        {
            this.buffItemArr[i].alpha = this.isBuffOK(i)?1:0.3;
        }
        for(var i=0;i<this.randomItemArr.length;i++)
        {
            this.randomItemArr[i].alpha = this.currentStep > 0?1:0.3;
        }
    }

    private getSource(id){
        return 'icon_type'+id+'_png'
    }

    private isBuffOK(index){
        var obj = {1:0,2:0,3:0}
        var arr = this.indexPos[index]
        for(var i=0;i<arr.length;i++)
        {
            obj[this.result[arr[i]]] ++;
        }
        for(var s in obj)
        {
            if(obj[s] < this.typeNum[s])
                return false;
        }
        return true;
    }

    private onAtk(){
        this.hide();
        var atk = 0;
        var hp = 0;
        for(var i=0;i<3;i++)
        {
            this.isBuffOK(i) && atk++
        }
        for(var i=3;i<6;i++)
        {
            this.isBuffOK(i) && hp++
        }
        console.log(atk*10,hp*10)
        this.fun(atk*10,hp*10)
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
        this.question = [];
        this.typeNum = {1:0,2:0,3:0}
        for(var i=0;i<this.questionItemArr.length;i++)
        {
              var type = this.getType();
            this.typeNum[type] ++
            this.question.push(type);
            this.questionItemArr[i].source = this.getSource(type)
        }

        this.result = [];
        for(var i=0;i<this.resultItemArr.length;i++)
        {
            this.result.push(this.getType());
        }

        this.currentStep = this.maxStep;
        this.numText.text = this.currentStep + ''

        this.renewShow();
    }

}