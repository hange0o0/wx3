class FightItem extends game.BaseItem{

    private headMC: eui.Image;
    private nameText: eui.Label;
    private cdText: eui.Label;
    private lvText: eui.Label;
    private successMC: eui.Image;



    private pkMV;

    public constructor() {
        super();
        this.skinName = "FightItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this,this.onClick)
    }

    private onClick(){
        if(this.data.isAtked())
        {
            return;
        }

        PKPosUI.getInstance().show({
            title:'进攻布阵',
            autoList:true,
            isPK:true,
            isAtk:true,
            maxNum:TecManager.getInstance().getTeamNum(),
            maxCost:TecManager.getInstance().getTeamCost(),
            fun:(list)=>{
                PKPosUI.getInstance().hide();
                FightManager.getInstance().addAtkList(list,this.data);
                this.dataChanged();
                EM.dispatchEventWith(GameEvent.client.FIGHT_CHANGE)
            },
        })
    }

    public dataChanged():void {
        PKManager.getInstance().setHead(this.headMC,this.data.head)
         this.nameText.text = this.data.nick
        this.lvText.text = 'LV.' + this.data.level
        this.cdText.text = '路程:' +  DateUtil.getStringBySecond(this.data.distanceTime).substr(-5);
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
            }
        }
    }

    public onTimer(){
        if(this.pkMV && this.pkMV.visible && !this.data.isAtking())
            this.stopShowPKing();
    }

    public showPKing(){
        if(!this.pkMV)
        {
            var name = 'pk_mv'
            var data:any = RES.getRes(name + "_json"); //qid
            var texture:egret.Texture = RES.getRes(name + "_png");
            var mcFactory = new egret.MovieClipDataFactory(data, texture);
            this.pkMV = new egret.MovieClip();
            this.pkMV.movieClipData = mcFactory.generateMovieClipData('mv');
            this.addChild(this.pkMV);
            this.pkMV.y = 100;
            this.pkMV.x = 180/2;
            this.pkMV.scaleX = this.pkMV.scaleY = 1.5
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.stopShowPKing,this)
        }
        this.pkMV.visible = true;
        this.pkMV.play(-1);
    }

    public stopShowPKing(){
        if(this.pkMV)
        {
            this.pkMV.visible = false;
            this.pkMV.stop();
        }
    }


}