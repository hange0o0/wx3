class FightingItem extends game.BaseItem_wx3{

    private headMC: eui.Image;
    private nameText: eui.Label;
    private desText: eui.Label;
	private wx3_functionX_12308(){console.log(98)}
    private cdText: eui.Label;
    private btn: eui.Button;
    private awardGroup: eui.Group;
    private coinText: eui.Label;


	private wx3_functionX_12309(){console.log(7955)}


    public constructor() {
        super();
        this.skinName = "FightingItemSkin";
    }
	private wx3_functionX_12310(){console.log(7334)}

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.btn,this.onClick_5535)
        this.addBtnEvent(this,this.onVideo_9687)
    }
	private wx3_functionX_12311(){console.log(6877)}

    private onVideo_9687(){
        if(!this.data.pkObj)
            return;
        var pkObject = ObjectUtil.clone(this.data.pkObj);
        pkObject.addCoin = this.data.addCoin
        pkObject.isReplay = true;
	wx3_function(3993);
        pkObject.fight = this.data;
        pkObject.title = '与【'+this.data.robot.nick+'】的战斗回放'
        MainPKUI_wx3.getInstance().show(pkObject)
    }

    private onClick_5535(e){
        e.stopImmediatePropagation();
	wx3_function(1225);
        if(this.btn.label == '撤回')
        {
            MyWindow.Confirm('确定撒回已出发的队伍吗？',(b)=>{
                if(b==1)
                {
                    if(this.data.result)
                    {
                        MyWindow.Alert('战斗已发生，无法撤回！');
	wx3_function(9350);
                    }
                    else
                    {
                        var cd =  TM_wx3.now() - this.data.time;
                        this.data.backTime = TM_wx3.now() + cd;
                    }

                }
            },['继续进进','撤回队伍']);
	wx3_function(5756);
        }
        else
        {
            ShareTool.share('日常推荐一个好游戏',Config.localResRoot + "share_img_2.jpg",{},()=>{
                this.data.time = 1;
                this.data.backTime = 1;
	wx3_function(3970);
            })
        }
    }

    public dataChanged():void {
        var robot = this.data.robot;
	wx3_function(973);
        PKManager_wx3.getInstance().setHead(this.headMC,robot.head)
        this.nameText.text = robot.nick + ' (LV.'+robot.level+')';
        this.onTimer();
    }

    public onTimer(){
        var cd =  TM_wx3.now() - this.data.time;
	wx3_function(4871);
        var robot = this.data.robot;
        this.awardGroup.visible = false;
        if(this.data.result)
        {
            cd = robot.distanceTime*2 - cd;
            if(this.data.result == 2)
            {
                this.desText.text = '战斗胜利，正在返回';
	wx3_function(5098);
                this.awardGroup.visible = true;
                this.coinText.text = '+' + NumberUtil.addNumSeparator(this.data.addCoin,2)
                this.coinText.textColor = 0x66FF66
            }
            else
                this.desText.text = '进攻失利，正在返回';
            if(UM_wx3.isTest)
            {
                this.currentState = 's2'
            }
            else
            {
                this.btn.label = '传送'
                this.currentState = 's1'
            }
        }
        else if(this.data.backTime)
        {
            cd = this.data.backTime - TM_wx3.now();
	wx3_function(8745);
            this.desText.text = '正在撤回中'
            if(UM_wx3.isTest)
            {
                this.currentState = 's2'
            }
            else
            {
                this.btn.label = '传送'
                this.currentState = 's1'
            }

        }
        else
        {
            cd = robot.distanceTime - cd;
	wx3_function(7565);
            this.desText.text = '正在前往目的地'
            this.btn.label = '撤回'
            this.currentState = 's1'
        }
        this.cdText.text = DateUtil.getStringBySecond(cd).substr(-5);
    }
	private wx3_functionX_12312(){console.log(2638)}


}