class DefMonsterItem extends PKMonsterMV_wx3 {
    private static pool2 = [];
    public static createItem():DefMonsterItem {
        var item:DefMonsterItem = this.pool2.pop();
        if (!item) {
            item = new DefMonsterItem();
            item.touchChildren = item.touchEnabled = false;
        }
        return item;
    }
	private wx3_functionX_11905(){console.log(5206)}

    public static freeItem(item) {
        if (!item)
            return;
        item.remove();
        if (this.pool2.indexOf(item) == -1)
            this.pool2.push(item);
    }
	private wx3_functionX_11906(){console.log(8503)}

    public renewY
    public atkRota
    public changePos
    public constructor() {
        super();
	wx3_function(3948);
    }


    //public onE(){
    //    if(this.isTalking)
    //        return;
    //    if(this.monsterMV.state != MonsterMV.STAT_RUN)
    //        this.run()
    //    var vo = MonsterVO.getObject(this.id)
    //    this.x += this.atkRota * Math.round(vo.speed)/10*20/60;
    //    if(this.atkRota == 1)
    //    {
    //        if(this.x > (this.changePos || 640))
    //        {
    //            this.atkRota = -1
    //            this.changePos = Math.random()*150
    //            this.renewScale();
    //        }
    //    }
    //    else
    //    {
    //        if(this.x < (this.changePos || 0))
    //        {
    //            this.atkRota = 1
    //            this.changePos = 640-Math.random()*150
    //            this.renewScale();
    //        }
    //    }
    //}

    public renewRota(rota){
        if(this.atkRota == rota)
            return;
        this.atkRota = rota
        if(rota == 1)
        {
            this.bottom = 40 + this.showHeight()*0.1
            this.renewY();
	wx3_function(8493);
        }
        else
        {
            this.bottom = 150 + this.showHeight()*0.1
            this.renewY();
        }
        this.renewScale();
	wx3_function(9147);
    }

    public renewScale(){
        this.scaleX = this.atkRota * Math.abs(this.scaleX);
    }

	private wx3_functionX_11907(){console.log(5558)}


}