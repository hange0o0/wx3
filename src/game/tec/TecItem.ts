class TecItem extends game.BaseItem_wx3{

    private headMC: eui.Image;
    private nameText: eui.Label;
    private desText: eui.Label;
	private wx3_functionX_12643(){console.log(9333)}
    private upGroup: eui.Group;
    private barMC: eui.Rect;  //150
    private iconMC: eui.Image;
    private valueText: eui.Label;
    private upBtn: eui.Button;

	private wx3_functionX_12644(){console.log(4733)}


    public cost;
    public isMax = false
    //private typeColor = [0x994400,0xFDD302,0x660000];
    public constructor() {
        super();
	wx3_function(6199);
        this.skinName = "TecItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.upBtn,this.onClick_8339)
    }
	private wx3_functionX_12645(){console.log(4057)}

    private onClick_8339(){
        if(this.data.type == 'diamond' && UM_wx3.diamond<this.cost)
            return
        if(this.data.type == 'coin' && !UM_wx3.checkCoin(this.cost))
            return
        TecManager.getInstance().tecUp(this.data.id,()=>{
            this.dataChanged();
	wx3_function(4488);
        })
    }

    public dataChanged():void {
        var data = this.data;
        //{'name':'科技革命',des:'提升主科技等级可增加怪物的种类',type:'diamond',v1:0,v2:0,v3:0},
        var lv = TecManager.getInstance().getTecLevel(data.id);
	wx3_function(5907);
        this.headMC.source = Config.localResRoot2 + 'skill/skill'+data.id+'.jpg';
        this.nameText.text = data.name + '（LV.'+lv+'）';
        this.setHtml(this.desText, TecManager.getInstance().getDes(data.id));

        this.iconMC.source = data.type=='diamond'?'icon_diamond_png':'icon_coin_png'
        this.cost = TecManager.getInstance().getTecCost(data.id)

	wx3_function(3164);
        this.isMax = TecManager.getInstance().tecBase[data.id].max <= lv;
        if(this.isMax)
        {
            this.upGroup.visible = false;
        }
        else
        {
            this.valueText.text = NumberUtil.addNumSeparator(this.cost,2);
	wx3_function(8978);
            this.upGroup.visible = true;
        }
        this.renewCost();

        var TSM = TaskManager.getInstance()
        if(TSM.guideTaskVO && TSM.guideTaskVO.type == 'tlv' && TSM.guideTaskVO.key == data.id)
        {
            TaskManager.getInstance().showGuideMC(this.upBtn);
	wx3_function(1774);
        }
    }

    public renewCost(){
        if(this.isMax)
            return;
         var b = (this.data.type == 'diamond' && UM_wx3.diamond>=this.cost) || (this.data.type == 'coin' && UM_wx3.coin>=this.cost)
        //this.valueText.textColor = b?0xfff6db:0xFF0000;
        //this.upBtn.touchEnabled = b;
	wx3_function(7957);
        this.upBtn.skinName = b?'Btn1Skin':'Btn3Skin';
        MyTool.renewBar(this.barMC,this.cost,UM_wx3.coin,150,2);
    }


}