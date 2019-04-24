class FightItem extends game.BaseItem{

    private headMC: eui.Image;
    private nameText: eui.Label;
    private cdText: eui.Label;
	private wx3_functionX_12350(){console.log(3129)}
    private lvText: eui.Label;
    private successMC: eui.Image;



    private pkMV;
	private wx3_functionX_12351(){console.log(2913)}

    public constructor() {
        super();
        this.skinName = "FightItemSkin";
    }

	private wx3_functionX_12352(){console.log(757)}
    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this,this.onClick_5754)
    }

	private wx3_functionX_12353(){console.log(269)}
    private onClick_5754(){
        if(this.data.isAtked())
        {
            return;
        }

        PKPosUI.getInstance().show({
            title:'掠夺【'+this.data.nick+'】',
            type:'fight',
            autoList:true,
            isPK:true,
            isAtk:true,
            fightData:this.data,
            maxNum:TecManager.getInstance().getTeamNum(),
            maxCost:TecManager.getInstance().getTeamCost(),
            fun:(list)=>{
                PKPosUI.getInstance().hide();
	wx3_function(9480);
                FightManager.getInstance().addAtkList(list,this.data);
                this.dataChanged();
                EM_wx3.dispatchEventWith(GameEvent.client.FIGHT_CHANGE)
            },
        })
    }
	private wx3_functionX_12354(){console.log(3563)}

    public dataChanged():void {
        PKManager_wx3.getInstance().setHead(this.headMC,this.data.head)
         this.nameText.text = this.data.nick
        this.lvText.text = 'LV.' + this.data.level
        this.cdText.text = '路程:' +  DateUtil.getStringBySecond(this.data.distanceTime).substr(-5);
	wx3_function(7860);
        this.stopShowPKing();
        this.successMC.visible = false;
        if(this.data.isAtked())
        {
            if(this.data.isAtking()){
                this.showPKing()
            }
            else
            {
                this.successMC.visible = true;
	wx3_function(9673);
            }
        }
    }

    public onTimer(){
        if(this.pkMV && this.pkMV.visible && !this.data.isAtking())
            this.stopShowPKing();
	wx3_function(3115);
    }

    public showPKing(){
        if(!this.pkMV)
        {
            var name = 'pk_mv'
            var data:any = RES.getRes(name + "_json"); //qid
            var texture:egret.Texture = RES.getRes(name + "_png");
	wx3_function(3039);
            var mcFactory = new egret.MovieClipDataFactory(data, texture);
            this.pkMV = new egret.MovieClip();
            this.pkMV.movieClipData = mcFactory.generateMovieClipData('mv');
            this.addChild(this.pkMV);
            this.pkMV.y = 100;
            this.pkMV.x = 180/2;
	wx3_function(4290);
            this.pkMV.scaleX = this.pkMV.scaleY = 1.5
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.stopShowPKing,this)
        }
        this.pkMV.visible = true;
        this.pkMV.play(-1);
    }
	private wx3_functionX_12355(){console.log(6221)}

    public stopShowPKing(){
        if(this.pkMV)
        {
            this.pkMV.visible = false;
            this.pkMV.stop();
	wx3_function(6523);
        }
    }


}