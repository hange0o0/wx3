class SkillManager {
    private static _instance:SkillManager;
    public static getInstance():SkillManager {
        if (!this._instance)
            this._instance = new SkillManager();
        return this._instance;
    }

    public freeCD = 8*3600
    public freeTime = 0;
    public shopList;
    public initSkill(){
        var oo = this.shopList = SharedObjectManager_wx3.getInstance().getMyValue('skill_shop_list')
        this.freeTime = SharedObjectManager_wx3.getInstance().getMyValue('skill_shop_time') || 0
        if(!oo)
        {
             this.renewShop();
        }
    }

    public renewShop(isFree=false){
        var list = [];
        var data = SkillVO.data;
        var lv = TecManager.getInstance().getTecLevel(11)
        for(var s in data)
        {
            if(data[s].level <= lv)
            {
                list.push(data[s]);
            }
        }
        ArrayUtil.random(list);
        list.length = 9;
        var coinRate = Math.max(1,UM_wx3.hourEarn/50000)
        for(var i=0;i<list.length;i++)
        {
            var vo = list[i];
            list[i] = {
                id:vo.id,
                coin:Math.floor(vo.coin*coinRate),
                num:5,
            }
        }
        this.shopList = list;
        if(isFree)
        {
            this.freeTime = TM_wx3.now();
            SharedObjectManager_wx3.getInstance().setMyValue('skill_shop_time',this.freeTime)
        }
        this.saveShop();
    }

    public saveShop(){
        SharedObjectManager_wx3.getInstance().setMyValue('skill_shop_list',this.shopList)
    }

    public addSkill(id,num){
        if(UM_wx3.skills[id])
        {
            UM_wx3.skills[id] += num
            if(UM_wx3.skills[id] <= 0)
                delete UM_wx3.skills[id];
        }
        else if(num > 0)
        {
            UM_wx3.skills[id] = num;
        }
        EM_wx3.dispatch(GameEvent.client.SKILL_CHANGE)
        UM_wx3.needUpUser = true;
    }

    public getSkillNum(id){
        return UM_wx3.skills[id] || 0
    }
}