class MonsterItem extends game.BaseItem_wx3{
    private bg2: eui.Image;
    private cardGroup: eui.Group;
    private posGroup: eui.Group;
    private bg: eui.Image;
	private wx3_functionX_12411(){console.log(2482)}
    private text: eui.Label;
    private costText: eui.Label;
    private numBar: eui.Image;
    private redMC: eui.Image;
    private levelText: eui.Label;

	private wx3_functionX_12412(){console.log(1986)}
    public heroItem


    public constructor() {
        super();
        this.skinName = "MonsterItemSkin";
	wx3_function(2885);
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick_320)

        this.heroItem = new PKMonsterMV_wx3()
        this.heroItem.x = 150/2-5
        this.heroItem.y = 170
        this.heroItem.scaleX = this.heroItem.scaleY = 1.2
        this.cardGroup.addChild(this.heroItem);
	wx3_function(2810);
    }

    private onClick_320(){
        var list = [];
        for(var j=0;j<this.data.list.length;j++)
        {
            list.push(this.data.list[j].vo.id)
        }
        CardInfoUI.getInstance().show(this.data.vo.id,list,this.data.list.indexOf(this.data))
    }
	private wx3_functionX_12413(){console.log(3085)}

    public dataChanged():void {
        var vo = this.data.vo
        var num = MonsterManager.getInstance().getMonsterNum(vo.id)
        this.bg2.source = vo.getBG()
        this.bg.source = PKManager_wx3.getInstance().getDefBG();
        //this.costText.text = '费用：' + 12 +'';
	wx3_function(1725);
        this.setHtml(this.costText, '费用：' + this.createHtml(vo.cost,0xFFFF00));
        this.numBar.width =  num*8;
        this.levelText.text = 'lv.' + MonsterManager.getInstance().getMonsterLevel(vo.id) + ''
        this.text.text = vo.name //+ '('+vo.cost+')';

        this.renewRed();
	wx3_function(9297);


        if(this.heroItem)
        {
            this.heroItem.load(vo.id)
            this.heroItem.stand();
	wx3_function(2628);
            this.heroItem.stop();
            var TSM = TaskManager.getInstance()
            if(TSM.guideTaskVO && (TSM.guideTaskVO.type == 'mnum' || TSM.guideTaskVO.type == 'mlv') && TSM.guideTaskVO.key == vo.id)
            {
                if(!CardInfoUI.getInstance().stage)
                    TaskManager.getInstance().showGuideMC(this.posGroup);
	wx3_function(152);
            }

        }
    }

    public renewRed(){
        var vo = this.data.vo
        this.redMC.visible = UM_wx3.diamond >=  MonsterManager.getInstance().getNumCost(vo.id) ||
            UM_wx3.coin >= MonsterManager.getInstance().getLevelCost(vo.id);
	wx3_function(5843);
    }


}