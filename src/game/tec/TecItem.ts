class TecItem extends game.BaseItem{

    private headMC: eui.Image;
    private nameText: eui.Label;
    private desText: eui.Label;
    private upGroup: eui.Group;
    private barMC: eui.Rect;  //150
    private iconMC: eui.Image;
    private valueText: eui.Label;
    private upBtn: eui.Button;



    public cost;
    public isMax = false
    //private typeColor = [0x994400,0xFDD302,0x660000];
    public constructor() {
        super();
        this.skinName = "TecItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.upBtn,this.onClick)
    }

    private onClick(){
        if(this.data.type == 'diamond' && UM.diamond<this.cost)
            return
        if(this.data.type == 'coin' && !UM.checkCoin(this.cost))
            return
        TecManager.getInstance().tecUp(this.data.id,()=>{
            this.dataChanged();
        })
    }

    public dataChanged():void {
        var data = this.data;
        //{'name':'科技革命',des:'提升主科技等级可增加怪物的种类',type:'diamond',v1:0,v2:0,v3:0},
        var lv = TecManager.getInstance().getTecLevel(data.id);
        this.headMC.source = Config.localResRoot2 + 'skill/skill'+data.id+'.jpg';
        this.nameText.text = data.name + '（LV.'+lv+'）';
        this.setHtml(this.desText, TecManager.getInstance().getDes(data.id));

        this.iconMC.source = data.type=='diamond'?'icon_diamond_png':'icon_coin_png'
        this.cost = TecManager.getInstance().getTecCost(data.id)

        this.isMax = TecManager.getInstance().tecBase[data.id].max <= lv;
        if(this.isMax)
        {
            this.upGroup.visible = false;
        }
        else
        {
            this.valueText.text = NumberUtil.addNumSeparator(this.cost,2);
            this.upGroup.visible = true;
        }
        this.renewCost();

        var TSM = TaskManager.getInstance()
        console.log(TSM.guideTaskVO)
        if(TSM.guideTaskVO && TSM.guideTaskVO.type == 'tlv' && TSM.guideTaskVO.key == data.id)
        {
            TaskManager.getInstance().showGuideMC(this.upBtn);
        }
    }

    public renewCost(){
        if(this.isMax)
            return;
         var b = (this.data.type == 'diamond' && UM.diamond>=this.cost) || (this.data.type == 'coin' && UM.coin>=this.cost)
        //this.valueText.textColor = b?0xfff6db:0xFF0000;
        //this.upBtn.touchEnabled = b;
        this.upBtn.skinName = b?'Btn1Skin':'Btn3Skin';
        MyTool.renewBar(this.barMC,this.cost,UM.coin,150,2);
    }


}