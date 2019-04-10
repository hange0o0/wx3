class MonsterItem extends game.BaseItem{
    private bg2: eui.Image;
    private cardGroup: eui.Group;
    private bg: eui.Image;
    private text: eui.Label;
    private costText: eui.Label;
    private numBar: eui.Image;
    private redMC: eui.Image;
    private levelText: eui.Label;

    public heroItem


    public constructor() {
        super();
        this.skinName = "MonsterItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)

        this.heroItem = new PKMonsterMV()
        this.heroItem.x = 150/2-5
        this.heroItem.y = 170
        this.heroItem.scaleX = this.heroItem.scaleY = 1.2
        this.cardGroup.addChild(this.heroItem);
    }

    private onClick(){
        var list = [];
        for(var j=0;j<this.data.list.length;j++)
        {
            list.push(this.data.list[j].vo.id)
        }
        CardInfoUI.getInstance().show(this.data.vo.id,list,this.data.list.indexOf(this.data))
    }

    public dataChanged():void {
        var vo = this.data.vo
        var num = MonsterManager.getInstance().getMonsterNum(vo.id)
        this.bg2.source = vo.getBG()
        this.bg.source = PKManager.getInstance().getDefBG();
        //this.costText.text = '费用：' + 12 +'';
        this.costText.text = '费用：' + vo.cost +'';
        this.numBar.width =  num*8;
        this.levelText.text = 'lv.' + MonsterManager.getInstance().getMonsterLevel(vo.id) + ''
        this.text.text = vo.name //+ '('+vo.cost+')';

        this.redMC.visible = UM.diamond >=  MonsterManager.getInstance().getNumCost(vo.id) ||
            UM.coin >= MonsterManager.getInstance().getLevelCost(vo.id);

        if(this.heroItem)
        {
            this.heroItem.load(vo.id)
            this.heroItem.stand();
            this.heroItem.stop();
            var TSM = TaskManager.getInstance()
            if(TSM.guideTaskVO && (TSM.guideTaskVO.type == 'mnum' || TSM.guideTaskVO.type == 'mlv'))
                TaskManager.getInstance().showGuideMC(this);

        }
    }


}