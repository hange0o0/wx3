class FightItem extends game.BaseItem{

    private headMC: eui.Image;
    private nameText: eui.Label;
    private cdText: eui.Label;
    private lvText: eui.Label;




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
        //if(UM.getEnergy()<1)
        //{
        //    MyWindow.ShowTips('体力不足')
        //    return;
        //}

        PKPosUI.getInstance().show({
            title:'进攻布阵',
            autoList:true,
            isPK:true,
            isAtk:true,
            maxNum:10,//TecManager.getInstance().getTeamNum(),
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

    }


}