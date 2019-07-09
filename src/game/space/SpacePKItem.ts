class SpacePKItem extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "SpacePKItemSkin";
    }

    private con: eui.Group;
    private bg: eui.Image;
    private mc: eui.Image;
    private rateMC: eui.Image;
    private costGroup: eui.Group;
    private costText: eui.Label;



    private index = -1;

    private _stopDrag = false;
    private isCDing = false;
    public get stopDrag(){
        return this._stopDrag || this.isCDing;
    }
    public childrenCreated() {
        super.childrenCreated();
        DragManager_wx3.getInstance().setDrag(this,true);
        this.addBtnEvent(this,()=>{
            CardInfoUI.getInstance().show(this.data,null,null,{otherForce:PKData_wx3.getInstance().getPlayer(2).getMonsterForce(this.data)})

            //if(otherForce == -1)
            //    list[i]  = {id:list[i],isDie:true,index:i+1,list:orginList,otherForce:PKData_wx3.getInstance().getPlayer(2).getMonsterForce(list[i])}
            //else
        })
    }

    public dataChanged(){
        var vo = MonsterVO.getObject(this.data)
        if(this.data)
        {
            this.mc.source = vo.getImage();
            this.costText.text = vo.cost + ''
            this.costGroup.visible = true
            this.bg.source = vo.getBG();
            this.isCDing = PKConfig_wx3.baseCost < vo.cost
        }
        else
        {
            this.mc.source = '';
            this.costGroup.visible = false
            this.bg.source = 'border_16_png'
        }
        this._stopDrag = !this.data || SpacePKUI.getInstance().dataIn.isReplay;

        this.rateMC.height = 0;
    }

    public showMV(data){
        if(!data && !this.data)
        {
            return;
        }
        this._stopDrag = true;
        egret.Tween.removeTweens(this.mc);
        egret.Tween.get(this.con).to({scaleX:0,scaleY:0},100).call(()=>{
           this.data = data;
        },this).to({scaleX:1.2,scaleY:1.2},100).to({scaleX:1,scaleY:1},100).call(()=>{
            this._stopDrag = !this.data || SpacePKUI.getInstance().dataIn.isReplay;
            this.onE();
        },this)
    }

    public onE() {
        if(this._stopDrag)
            return;
        if(!this.data)
            return;
        var PD = PKData_wx3.getInstance();

        var cost = PD.getPlayer(2).cost;
        var vo = MonsterVO.getObject(this.data)
        this.isCDing = cost < vo.cost
        if(this.isCDing)
        {
            var costCD = PKData_wx3.getInstance().getCostCD()
            var cd = (vo.cost - cost)*costCD - (PD.actionTime - PD.getPlayer(2).costTime)
            this.rateMC.height = cd/(vo.cost*costCD)*80;
            this.bg.source = 'border_16_png'
        }
        else
        {
            this.rateMC.height = 0;
            this.bg.source = vo.getBG();
        }
    }

    public getDragSource(){
        return MonsterVO.getObject(this.data).getImage();
    }

    public getDragData(){
        if(this.index == -1)
        {
            this.index = SpacePKUI.getInstance().getMItemIndex(this);
        }
        return this.index;
    }

}