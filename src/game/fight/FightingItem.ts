class FightingItem extends game.BaseItem{

    private headMC: eui.Image;
    private nameText: eui.Label;
    private desText: eui.Label;
    private cdText: eui.Label;
    private btn: eui.Button;
    private awardGroup: eui.Group;
    private coinText: eui.Label;




    public constructor() {
        super();
        this.skinName = "FightingItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.btn,this.onClick)
        this.addBtnEvent(this,this.onVideo)
    }

    private onVideo(){
        if(!this.data.pkObj)
            return;
        var pkObject = ObjectUtil.clone(this.data.pkObj);
        pkObject.addCoin = this.data.addCoin
        pkObject.isReplay = true;
        pkObject.fight = this.data;
        pkObject.title = '与【'+this.data.robot.nick+'】的战斗回放'
        MainPKUI_wx3.getInstance().show(pkObject)
    }

    private onClick(e){
        e.stopImmediatePropagation();
        if(this.btn.label == '撤回')
        {
            MyWindow.Confirm('确定撒回已出发的队伍吗？',(b)=>{
                if(b==1)
                {
                    if(this.data.result)
                    {
                        MyWindow.Alert('战斗已发生，无法撤回！');
                    }
                    else
                    {
                        var cd =  TM.now() - this.data.time;
                        this.data.backTime = TM.now() + cd;
                    }

                }
            },['继续进进','撤回队伍']);
        }
        else
        {
            ShareTool.share('日常推荐一个好游戏',Config.localResRoot + "share_img_2.jpg",{},()=>{
                this.data.time = 1;
                this.data.backTime = 1;
            })
        }
    }

    public dataChanged():void {
        var robot = this.data.robot;
        PKManager_wx3.getInstance().setHead(this.headMC,robot.head)
        this.nameText.text = robot.nick + ' (LV.'+robot.level+')';
        this.onTimer();
    }

    public onTimer(){
        var cd =  TM.now() - this.data.time;
        var robot = this.data.robot;
        this.awardGroup.visible = false;
        if(this.data.result)
        {
            cd = robot.distanceTime*2 - cd;
            if(this.data.result == 2)
            {
                this.desText.text = '战斗胜利，正在返回';
                this.awardGroup.visible = true;
                this.coinText.text = NumberUtil.addNumSeparator(this.data.addCoin,2)
            }
            else
                this.desText.text = '进攻失利，正在返回';
            if(UM.isTest)
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
            cd = this.data.backTime - TM.now();
            this.desText.text = '正在撤回中'
            if(UM.isTest)
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
            this.desText.text = '正在前往目的地'
            this.btn.label = '撤回'
            this.currentState = 's1'
        }
        this.cdText.text = DateUtil.getStringBySecond(cd).substr(-5);
    }


}