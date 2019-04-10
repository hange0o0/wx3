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
    private awardText: eui.Label;
    private coinText: eui.Label;
    private indexMC: eui.Image;


    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.viewBtn,this.onViewClick)
        this.addBtnEvent(this.pkBtn,this.onPKClick)
    }


    private onViewClick(){
        var pkObject = ObjectUtil.clone(this.data.pkObj);
        pkObject.addCoin = this.data.addCoin
        pkObject.isReplay = true;
        pkObject.fight = this.data;
        pkObject.title = '与【'+this.data.robot.nick+'】的战斗回放'
        MainPKUI.getInstance().show(pkObject)
    }

    private onPKClick(){
        PKPosUI.getInstance().show({
            title:'掠夺【'+this.data.robot.nick+'】',
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
        this.nameText.text = robot.nick + '(LV.'+robot.level+')';

        var cd =  TM.now() - this.data.logTime;
        if(this.data.type == 'atk')
        {
            this.indexMC.source = 'card_battle2_png'
            if(this.data.result == 2)
            {
                this.currentState = 's1'
                this.desText.text = '战斗胜利,成功掠夺资源!';
                this.awardText.text = '收获：'
                this.coinText.text = NumberUtil.addNumSeparator(this.data.addCoin,2)
                this.coinText.textColor = 0x66FF66

            }
            else
            {
                this.currentState = 's2'
                this.desText.text = '进攻失利，空手而回！';
            }
            this.pkBtn.visible = false
        }
        else
        {
            this.indexMC.source = 'card_battle_png'
            if(this.data.result == 1)
            {
                this.currentState = 's1'
                this.desText.text = '防守失败，夺资源惨被掠!';
                this.coinText.text = '-' + NumberUtil.addNumSeparator(-this.data.addCoin,2)
                this.coinText.textColor = 0xFF0000
                this.awardText.text = '损失：'
            }
            else
            {
                this.currentState = 's2'
                this.desText.text = '防守成功，喜大普奔！';
            }
            this.pkBtn.visible = this.data.result == 1 && !this.data.atkBack
        }
        this.cdText.text = DateUtil.getStringBySeconds(cd,false,2) + '前';
    }

}