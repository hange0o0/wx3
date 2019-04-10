class DefMonsterItem extends PKMonsterMV {
    private static pool2 = [];
    public static createItem():DefMonsterItem {
        var item:DefMonsterItem = this.pool2.pop();
        if (!item) {
            item = new DefMonsterItem();
            item.touchChildren = item.touchEnabled = false;
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

    public atkRota
    public changePos
    public constructor() {
        super();
    }


    public onE(){
        if(this.isTalking)
            return;
        if(this.monsterMV.state != MonsterMV.STAT_RUN)
            this.run()
        var vo = MonsterVO.getObject(this.id)
        this.x += this.atkRota * Math.round(vo.speed)/10*20/60;
        if(this.atkRota == 1)
        {
            if(this.x > (this.changePos || 640))
            {
                this.atkRota = -1
                this.changePos = Math.random()*150
                this.renewScale();
            }
        }
        else
        {
            if(this.x < (this.changePos || 0))
            {
                this.atkRota = 1
                this.changePos = 640-Math.random()*150
                this.renewScale();
            }
        }
    }

    public renewScale(){
        this.scaleX = -this.atkRota * Math.abs(this.scaleX);
    }



}