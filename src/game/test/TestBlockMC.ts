class TestBlockMC extends game.BaseItem_wx3{
    private static pool2 = [];
    public static createItem():TestBlockMC {
        var item:TestBlockMC = this.pool2.pop();
        if (!item) {
            item = new TestBlockMC();
        }
        return item;
    }

    public static freeItem(item) {
        if (!item)
            return;
        item.remove();
        if (this.pool2.indexOf(item) == -1)
            this.pool2.push(item);
    }



    public constructor() {
        super();
        this.skinName = "TestBlockMCSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public remove(){
        MyTool.removeMC(this);
    }
}