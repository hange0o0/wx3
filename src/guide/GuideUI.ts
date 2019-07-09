class GuideUI extends game.BaseContainer_wx3{
    private topRect: eui.Group;
    private leftRect: eui.Group;
    private rightRect: eui.Group;
    private bottomRect: eui.Group;
	private wx3_functionX_11964(){console.log(5947)}
    private stopClickGroup: eui.Group;
    public tipsGroup: eui.Group;
    private tipTxt: eui.Label;
    private anyClick: eui.Label;
    private handMC: eui.Image;

	private wx3_functionX_11965(){console.log(7760)}





    private nearMC
	private wx3_functionX_11966(){console.log(5916)}
    private clickFun
    private textIn
    private textIndex
    private mc


    public mv = new MonsterMV();

	private wx3_functionX_11967(){console.log(748)}
    private static instance: GuideUI;
    public static getInstance() {
        if(!this.instance) this.instance = new GuideUI();
        return this.instance;
    }
    
	private wx3_functionX_11968(){console.log(3002)}
    public constructor() {
        super(); 
        this.skinName = "GuideSkin";

        //GameManager.stage.addEventListener(egret.Event.RESIZE,this.resizeFun,this);
    }

	private wx3_functionX_11969(){console.log(4217)}
    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick_6885);
        //this.addBtnEvent(this.soundBtn,this.onSoundClick);

        this.stopClickGroup.touchEnabled = true;
        //this.tipsBg.touchEnabled = false;

	wx3_function(9046);
        this.tipsGroup.touchChildren = this.tipsGroup.touchEnabled = false;

        this.handMC.x = this.handMC.y = 0

        this.tipsGroup.addChildAt(this.mv,0)
        this.mv.y = 30
        this.mv.x = 40
        this.mv.scaleX = -2
        this.mv.scaleY = 2;
        this.mv.load(65)
        this.mv.stand()

    }

	private wx3_functionX_11970(){console.log(1966)}
    private onClick_6885(){
        if(this.textIndex < this.textIn.length)
        {
            this.textIndex = this.textIn.length
            this.testAnyClickShow_171();

             return;
        }
        if(this.clickFun)
        {
            //this.hide();
	wx3_function(2727);
            this.clickFun();
        }
        else if(GuideManager.getInstance().guideKey2 == 'info')
        {
            MyWindow.ShowTips('请点击上方怪物进行查看')
        }

    }
	private wx3_functionX_11971(){console.log(2112)}

    private testAnyClickShow_171(){
        if(this.clickFun != null)
        {
            this.anyClick.visible = true;
            this.anyClick.alpha = 0;
	wx3_function(2971);
            var tw = egret.Tween.get(this.anyClick,{loop:true});
            tw.to({alpha:1},500).wait(500).to({alpha:0},500)
        }
    }

    public handMovePos(formMC,toMC){
         this.handStop_8754();
	wx3_function(8571);
        var rect = formMC.getBounds();
        var p1 = formMC.localToGlobal(rect.x, rect.y);
        var p2 = formMC.localToGlobal(rect.x + rect.width, rect.y + rect.height);
        var fromP = {
            x: p1.x + (p2.x - p1.x) / 2,
            y: p1.y + (p2.y - p1.y) / 2,
        }

	wx3_function(5483);
        var rect = toMC.getBounds();
        var p1 = toMC.localToGlobal(rect.x, rect.y);
        var p2 = toMC.localToGlobal(rect.x + rect.width, rect.y + rect.height);
        var toP = {
            x: p1.x + (p2.x - p1.x) / 2,
            y: p1.y + (p2.y - p1.y) / 2,
        }

	wx3_function(6458);

        var tw:egret.Tween = egret.Tween.get(this.handMC,{loop:true});
        this.handMC.x = fromP.x
        this.handMC.y = fromP.y
        tw.to(toP,1000).wait(300);
    }
	private wx3_functionX_11972(){console.log(1549)}

    private handMove_6597(){
        this.handMC.anchorOffsetX = 70
        this.handMC.anchorOffsetY = 30
        var tw:egret.Tween = egret.Tween.get(this.handMC,{loop:true});
        tw.to({anchorOffsetX:90,anchorOffsetY:-10},500).to({anchorOffsetX:70,anchorOffsetY:30},500)
    }
	private wx3_functionX_11973(){console.log(8261)}
    private handStop_8754(){
        egret.Tween.removeTweens(this.handMC)
    }

    public showText(text){
        this.textIndex = 99999//1;
	wx3_function(722);
        this.textIn = text || '';

        text = text.replace(/\[/g,'<font color="#E0A44A">').replace(/\]/g,'<\/font>')
        this.setHtml(this.tipTxt,text);

        this.mv.atk()

        this.testAnyClickShow_171();
	wx3_function(5519);

        //this.tipTxt.removeEventListener(egret.Event.ENTER_FRAME,this.onText,this)
        //if(text.length > this.textIndex)
        //{
        //    this.tipTxt.addEventListener(egret.Event.ENTER_FRAME,this.onText,this)
        //}
        //this.onText();
    }

    public onText(){
        var str =  this.textIn.substr(0,this.textIndex);
        var lastChar = str.substr(-1);
	wx3_function(6003);
        if(lastChar == '[' || lastChar == ']')
        {
            this.textIndex ++;
            str =  this.textIn.substr(0,this.textIndex);
        }
        str = str.replace(/\[/g,'<font color="#E0A44A">').replace(/\]/g,'<\/font>')
        this.setHtml(this.tipTxt,str);
	wx3_function(2834);
        this.textIndex ++;
        if(this.textIndex > this.textIn.length)
        {
            this.tipTxt.removeEventListener(egret.Event.ENTER_FRAME,this.onText,this)
            this.testAnyClickShow_171();
        }
    }
	private wx3_functionX_11974(){console.log(6616)}

    public hide(){
        MyTool.removeMC(this);
        egret.Tween.removeTweens(this.anyClick)
        this.handStop_8754();
        EM_wx3.removeEventListener(GameEvent.client.timerE,this.onE,this)
    }
	private wx3_functionX_11975(){console.log(2306)}

    public showHand(mc){
        var rect = mc.getBounds();
        var p1 = mc.localToGlobal(rect.x, rect.y);
        var p2 = mc.localToGlobal(rect.x + rect.width, rect.y + rect.height);

        this.handMC.x = p1.x + (p2.x - p1.x) / 2
        this.handMC.y = p2.y//p1.y + (p2.y - p1.y) / 2
        GameManager_wx3.container.addChild(this.handMC);
	wx3_function(7918);
        this.handMC.visible = true;
        this.handMC.rotation = 0;
        this.handMove_6597();
    }
    public hideHand(){
        this.handStop_8754();
	wx3_function(6682);
        MyTool.removeMC(this.handMC);
    }

    private onE(){
        this.mv && this.mv.onE();
    }

    public show(dataIn){

	wx3_function(4835);

        EM_wx3.addEventListener(GameEvent.client.timerE,this.onE,this)

        var mc = this.mc = dataIn.mc;
        var text = dataIn.text;
        var fun = dataIn.fun;
        var hideHand = dataIn.hideHand;
	wx3_function(7115);
        var toBottom = dataIn.toBottom;
        this.addChild(this.handMC);
        this.handStop_8754();
        this.nearMC = dataIn.nearMC;
        this.tipTxt.text = '';
        this.tipTxt.removeEventListener(egret.Event.ENTER_FRAME,this.onText,this)
        egret.callLater(function(){
            GameManager_wx3.container.addChild(this);
	wx3_function(9058);
            this.height = GameManager_wx3.stage.stageHeight;
            this.tipTxt.text = '';
            this.clickFun = fun;

            this.anyClick.visible = false;
            this.anyClick.anchorOffsetX = 0;
	wx3_function(4366);
            egret.Tween.removeTweens(this.anyClick);
            //this.anyClick.visible = fun != null;

            //if(GuideManager.getInstance().guideStep == 1)
            //{
                this.tipsGroup.alpha = 1;
                this.showText(text);
            //}
            //else
            //{
            //    this.tipsGroup.alpha = 0;
            //    var tw:egret.Tween = egret.Tween.get(this.tipsGroup);
            //    tw.wait(200).to({alpha:1},200).call(function(){
            //        this.showText(text);
            //    },this)
            //}

            if(mc)
            {
                if(mc instanceof egret.Rectangle)
                {
                    //this.setBG(mc.x,mc.y,mc.width,mc.height,fun == null);
                    var p1:any = new egret.Point(mc.x,mc.y)
                    var p2:any = new egret.Point(mc.x + mc.width,mc.y + mc.height)
                }
                else
                {
                    var rect = mc.getBounds();
	wx3_function(2362);
                    rect.x += mc.anchorOffsetX
                    rect.y += mc.anchorOffsetY
                    var p1 = mc.localToGlobal(rect.x,rect.y);
                    var p2 = mc.localToGlobal(rect.x + rect.width,rect.y + rect.height);


                }
                //console.log(p1,p2)
	wx3_function(6750);
                this.setBG(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y,fun == null);
                if(toBottom)
                    this.tipsGroup.y = GameManager_wx3.stage.stageHeight - this.tipsGroup.height - toBottom;
                //if(fun == null)
                //    mc.once(egret.TouchEvent.TOUCH_TAP,this.hide, this);


                this.handMC.visible = !hideHand;
	wx3_function(1359);
                var toX = p1.x + (p2.x-p1.x)/2;
                var toY = p2.y + 20
                var toRotation = 0
                if(this.tipsGroup.y < toY) //指针在下半屏
                {
                    toRotation = 180
                    toY = p1.y - 20
                }
                if(this.handMC.visible)
                {
                    //this.showHand(mc);
                    if(this.handMC.x == 0 && this.handMC.y == 0)
                    {
                        this.handMC.x = toX;
	wx3_function(2938);
                        this.handMC.y = toY;
                        this.handMC.rotation = toRotation;
                        this.handMove_6597();
                    }
                    else
                    {
                        if(this.handMC.rotation == toRotation && toX == this.handMC.x && toY == this.handMC.y)
                        {
                            toRotation += 360;
	wx3_function(5502);
                        }
                        var tw:egret.Tween = egret.Tween.get(this.handMC);
                        tw.to({x:toX,y:toY,rotation:toRotation},200).call(this.handMove_6597,this)
                    }
                }
            }
            else
            {
                this.setBG(320,GameManager_wx3.stage.stageHeight/2,0,0,fun == null);
	wx3_function(5958);
                this.handMC.visible = false;
            }

            dataIn.showFun && dataIn.showFun();

        },this)

    }
	private wx3_functionX_11976(){console.log(1082)}

    public setBG(x,y,width,height,itemClick?){
        var x2 = 640-x-width;
        var y2 = GameManager_wx3.stage.stageHeight - y-height
        var borderWidth = Math.max(x,y,x2,y2)

        //this.tipsBg.strokeWeight = borderWidth
        //this.tipsBg.width = borderWidth*2 + width;
        //this.tipsBg.height = borderWidth*2 + height;
        //this.tipsBg.x =  -(borderWidth - x)
        //this.tipsBg.y =  -(borderWidth - y)
	wx3_function(7307);


        this.topRect.height = Math.max(0,y);
        this.leftRect.width = Math.max(0,x);
        this.rightRect.width = Math.max(0,x2);
        this.bottomRect.height = Math.max(0,y2);
	wx3_function(8604);

        this.leftRect.height = this.rightRect.height = height
        this.leftRect.y = this.rightRect.y = y
        //this.rightRect.width = Math.max(0,x2);

        if(itemClick)
        {
            MyTool.removeMC(this.stopClickGroup)

            //this.topRect.height = Math.max(0,y);
            //this.leftRect.width = Math.max(0,x);
            //this.rightRect.width = Math.max(0,x2);
            //this.bottomRect.height = Math.max(0,y2);
	wx3_function(5145);
            this.touchEnabled = false;
        }
        else
        {
            this.addChild(this.stopClickGroup);
            this.touchEnabled = true;
	wx3_function(542);
        }


        if(height == 0)
        {
            this.tipsGroup.y = (GameManager_wx3.stage.stageHeight - this.tipsGroup.height)/5*2
        }
        else if(y2 > y)//点在上方
        {
            this.tipsGroup.y = (y2 - this.tipsGroup.height)/2 + y + height
            if(this.nearMC)
                this.tipsGroup.y = this.leftRect.height + this.leftRect.y;
	wx3_function(5967);
        }
        else
        {
            this.tipsGroup.y = (y-this.tipsGroup.height)/2 + 10;
            if(this.nearMC)
                this.tipsGroup.y = this.leftRect.y - this.tipsGroup.height - 10;
	wx3_function(4385);
        }


    }

    public setTips(str){

    }
	private wx3_functionX_11977(){console.log(7245)}



}
