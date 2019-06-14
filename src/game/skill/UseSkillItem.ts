class UseSkillItem extends game.BaseItem_wx3 {
    private static pool = [];
    public static createItem():UseSkillItem {
        var item:UseSkillItem = this.pool.pop();
        if (!item) {
            item = new UseSkillItem();
        }
        return item;
    }

    public static freeItem(item) {
        if (!item)
            return;
        item.remove();
        this.pool.push(item);
    }

    public static showMV(data,con)
    {
        var mc = this.createItem();
        mc.data = data
        mc.x = 320
        mc.y = 200
        mc.scaleX = mc.scaleY = 0.2
        mc.alpha = 1
        con.addChild(mc);
        egret.Tween.get(mc).to({scaleX:1.2,scaleY:1.2},100).to({scaleX:1,scaleY:1},100).wait(800).to({y:100,alpha:0},500).call(()=>{
            this.freeItem(mc);
        })
    }


    public constructor() {
        super();
        this.skinName = "UseSkillItemSkin";
    }

    private skillText: eui.Label;
    private skillMC: eui.Image;


    public childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = 100
        this.anchorOffsetY = 30
    }

    public dataChanged(){
        var vo = SkillVO.getObject(this.data)
        this.skillMC.source = vo.getImage();
        this.skillText.text = vo.name
    }

    public remove(){
        MyTool.removeMC(this);
    }


}