class LogItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "LogItemSkin";
    }

    private headMC: eui.Image;
    private desText: eui.Label;
    private nameText: eui.Label;
    private cdText: eui.Label;
    private pkBtn: eui.Button;
    private viewBtn: eui.Button;
    private awardGroup: eui.Group;
    private coinText: eui.Label;
    private awardText: eui.Label;
    private indexMC: eui.Rect;

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.viewBtn,this.onViewClick)
        this.addBtnEvent(this.pkBtn,this.onPKClick)
    }


    private onViewClick(){
        this.data.pkObj.isReplay = true;
        MainPKUI.getInstance().show(this.data.pkObj)
    }

    private onPKClick(){
        PKPosUI.getInstance().show({
            title:'进攻布阵',
            autoList:true,
            isPK:true,
            isAtk:true,
            maxNum:TecManager.getInstance().getTeamNum(),
            maxCost:TecManager.getInstance().getTeamCost(),
            fun:(list)=>{
                this.data.atkBack = true;
                PKPosUI.getInstance().hide();
                FightManager.getInstance().addAtkList(list,this.data.robot).atkBack = this.data.time;
                this.dataChanged();
                EM.dispatchEventWith(GameEvent.client.FIGHT_CHANGE)
            },
        })
    }

    public dataChanged(){
        var robot = this.data.robot;
        PKManager.getInstance().setHead(this.headMC,robot.head)
        this.nameText.text = robot.nick;

        var cd =  TM.now() - this.data.logTime;
        if(this.data.type == 'atk')
        {
            if(this.data.result == 2)
            {
                this.currentState = 's1'
                this.desText.text = '战斗胜利,成功掠夺资源!';
                this.awardText.text = '收获：'
                this.coinText.text = this.data.addCoin
                this.coinText.textColor = 0x66FF66
                this.indexMC.fillColor = 0x0000FF
            }
            else
            {
                this.currentState = 's2'
                this.desText.text = '进攻失利，空手而回！';
                this.indexMC.fillColor = 0x000099
            }
            this.pkBtn.visible = false
        }
        else
        {
            if(this.data.result == 1)
            {
                this.currentState = 's1'
                this.desText.text = '防守失败，夺资源惨被掠!';
                this.coinText.text = this.data.addCoin
                this.coinText.textColor = 0xFF6666
                this.indexMC.fillColor = 0xFF0000
                this.awardText.text = '损失：'
            }
            else
            {
                this.currentState = 's2'
                this.desText.text = '防守成功，喜大普奔！';
                this.indexMC.fillColor = 0x990000
            }
            this.pkBtn.visible = !this.data.atkBack
        }
        this.cdText.text = DateUtil.getStringBySeconds(cd,false,2) + '前';
    }

}