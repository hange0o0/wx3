class TecItem extends game.BaseItem{

    private indexMC: eui.Rect;
    private headMC: eui.Image;
    private nameText: eui.Label;
    private desText: eui.Label;
    private upGroup: eui.Group;
    private iconMC: eui.Image;
    private valueText: eui.Label;
    private upBtn: eui.Button;



    public cost;
    private typeColor = [0xFF0000,0x00FF00,0x0000FF];
    public constructor() {
        super();
        this.skinName = "TecItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.upBtn,this.onClick)
    }

    private onClick(){
        TecManager.getInstance().tecUp(this.data.id,()=>{
            this.dataChanged();
        })
    }

    public dataChanged():void {
        var data = this.data;
        //{'name':'科技革命',des:'提升主科技等级可增加怪物的种类',type:'diamond',v1:0,v2:0,v3:0},
        this.indexMC.fillColor =  this.typeColor[Math.floor(data.id/10)-1]
        this.headMC.source = Config.localResRoot2 + 'skill/skill'+data.id+'.jpg';
        this.nameText.text = data.name + '（LV.'+TecManager.getInstance().getTecLevel(data.id)+'）';
        this.desText.text = TecManager.getInstance().getDes(data.id);

        this.iconMC.source = data.type=='diamond'?'icon_diamond_png':'icon_coin_png'
        this.cost = TecManager.getInstance().getTecCost(data.id)
        this.valueText.text = this.cost;
        this.renewCost();
    }

    public renewCost(){
         var b = (this.data.type == 'diamond' && UM.diamond>=this.cost) || (this.data.type == 'coin' && UM.coin>=this.cost)
        this.valueText.textColor = b?0xfff6db:0xFF0000;
        this.upBtn.touchEnabled = b;
        this.upBtn.skinName = b?'Btn1Skin':'Btn3Skin';
    }


}