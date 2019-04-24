class LogItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "LogItemSkin";
    }
	private wx3_functionX_12381(){console.log(571)}

    private headMC: eui.Image;
    private desText: eui.Label;
    private nameText: eui.Label;
    private cdText: eui.Label;
    private pkBtn: eui.Button;
	private wx3_functionX_12382(){console.log(5056)}
    private viewBtn: eui.Button;
    private awardGroup: eui.Group;
    private awardText: eui.Label;
    private coinText: eui.Label;
    private indexMC: eui.Image;

	private wx3_functionX_12383(){console.log(2815)}

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.viewBtn,this.onViewClick_5658)
        this.addBtnEvent(this.pkBtn,this.onPKClick_7944)
    }
	private wx3_functionX_12384(){console.log(6882)}


    private onViewClick_5658(){
        var pkObject = ObjectUtil.clone(this.data.pkObj);
        pkObject.addCoin = this.data.addCoin
        pkObject.isReplay = true;
	wx3_function(3126);
        pkObject.fight = this.data;
        pkObject.title = '与【'+this.data.robot.nick+'】的战斗回放'
        MainPKUI_wx3.getInstance().show(pkObject)
    }

    private onPKClick_7944(){
        PKPosUI.getInstance().show({
            title:'掠夺【'+this.data.robot.nick+'】',
            autoList:true,
            type:'fight',
            isPK:true,
            isAtk:true,
            fightData:this.data.robot,
            maxNum:TecManager.getInstance().getTeamNum(),
            maxCost:TecManager.getInstance().getTeamCost(),
            fun:(list)=>{
                this.data.atkBack = true;
	wx3_function(1954);
                PKPosUI.getInstance().hide();
                FightManager.getInstance().addAtkList(list,this.data.robot).atkBack = this.data.time;
                this.dataChanged();
                EM_wx3.dispatchEventWith(GameEvent.client.FIGHT_CHANGE)
            },
        })
    }
	private wx3_functionX_12385(){console.log(640)}

    public dataChanged(){
        var robot = this.data.robot;
        PKManager_wx3.getInstance().setHead(this.headMC,robot.head)
        this.nameText.text = robot.nick + '(LV.'+robot.level+')';

	wx3_function(2520);
        var cd =  TM_wx3.now() - this.data.logTime;
        if(this.data.type == 'atk')
        {
            this.indexMC.source = 'card_battle2_png'
            if(this.data.result == 2)
            {
                this.currentState = 's1'
                this.desText.text = '战斗胜利,成功掠夺资源!';
	wx3_function(2754);
                this.awardText.text = '收获：'
                this.coinText.text = NumberUtil.addNumSeparator(this.data.addCoin,2)
                this.coinText.textColor = 0x66FF66

            }
            else
            {
                this.currentState = 's2'
                this.desText.text = '进攻失利，空手而回！';
	wx3_function(1740);
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
	wx3_function(8110);
                this.coinText.text = '-' + NumberUtil.addNumSeparator(-this.data.addCoin,2)
                this.coinText.textColor = 0xFF0000
                this.awardText.text = '损失：'
            }
            else
            {
                this.currentState = 's2'
                this.desText.text = '防守成功，喜大普奔！';
	wx3_function(2835);
            }
            this.pkBtn.visible = this.data.result == 1 && !this.data.atkBack
        }
        this.cdText.text = DateUtil.getStringBySeconds(cd,false,2) + '前';
    }

}