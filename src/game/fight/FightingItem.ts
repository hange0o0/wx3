class FightingItem extends game.BaseItem{

    private headMC: eui.Image;
    private nameText: eui.Label;
    private desText: eui.Label;
    private btn: eui.Button;



    public constructor() {
        super();
        this.skinName = "FightingItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.btn,this.onClick)
    }

    private onClick(){
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
             MainPKUI.getInstance().show(this.data.pkObj)
        }
    }

    public dataChanged():void {
        var robot = this.data.robot;
        PKManager.getInstance().setHead(this.headMC,robot.head)
        this.nameText.text = robot.nick;
        if(this.data.result)
        {
            this.btn.label = '查看'
        }
        else
        {
            this.btn.label = '撤回'
        }

        this.onTimer();
    }

    public onTimer(){
        var cd =  TM.now() - this.data.time;
        var robot = this.data.robot;
        if(this.data.result)
        {
            cd = robot.distanceTime*2 - cd;
            if(this.data.result == 2)
                this.desText.text = '战斗胜利，正在返回(' + DateUtil.getStringBySecond(cd).substr(-5)+')';
            else
                this.desText.text = '进攻失利，正在返回(' + DateUtil.getStringBySecond(cd).substr(-5)+')';
        }
        else
        {
            cd = robot.distanceTime - cd;
            this.desText.text = '正在前往目的地(' + DateUtil.getStringBySecond(cd).substr(-5)+')'
        }
    }


}