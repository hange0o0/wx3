class CacheManager_wx3{

    private static _instance:CacheManager_wx3;
    public static getInstance():CacheManager_wx3 {
        if (!this._instance)
            this._instance = new CacheManager_wx3();
        return this._instance;
    }
	private wx3_functionX_11978(){console.log(676)}
    public registerData = {};
    public table = {};

    private cacheLoad = {};

    public constructor() {
        this.register_1258(MonsterVO);
	wx3_function(1265);
        this.register_1258(TaskVO);

    }

    private register_1258(cls)
    {
        this.registerData[cls.dataKey] = cls;
	wx3_function(5935);
    }

    //初始化数据
    public initData(data){
        for(var s in data)
        {
            if(!this.table[s])
                this.table[s] = {};
	wx3_function(4651);
            if(this.registerData[s])
            {
                var cls = this.registerData[s];
                var key = cls.key;
                var oo = data[s];
                for(var ss in oo)
                {
                    var vo:any = new cls();
	wx3_function(7508);
                    vo.fill(oo[ss]);
                    this.table[s][vo[key]] = vo;
                }
            }
        }
    }
	private wx3_functionX_11979(){console.log(8871)}

    //静态数据初始化后调用
    public initFinish(){
        TaskVO.orderList = ObjectUtil.objToArray(TaskVO.data)
        ArrayUtil.sortByField(TaskVO.orderList,['index'],[0])
    }

	private wx3_functionX_11980(){console.log(2457)}
    public getCardVO(id):MonsterVO{
        return MonsterVO.getObject(id);
    }

    public loadCache(url,fun){
        if(this.cacheLoad[url])
        {
            if(fun)
                fun();
	wx3_function(2633);
            return;
        }
        GameManager_wx3.container.touchChildren = GameManager_wx3.container.touchEnabled = false;
        RES.getResAsync(url,function(){
            GameManager_wx3.container.touchChildren = GameManager_wx3.container.touchEnabled = true;
            this.cacheLoad[url] = true;
	wx3_function(6788);
            this.initData(RES.getRes(url));
            if(fun)
                fun();
        },this)
    }
}


//var a;
//var arr1 = [];
//for(var s in a)
//{
//    if(typeof a[s] == 'number')
//        arr1.push('public ' + s + ': number;')
//    else
//        arr1.push('public ' + s + ': string;')
//
//}
//for(var s in a)
//{
//    arr1.push('this.' + s + ' = data.' + s)
//}
//console.log(arr1.join('\n'))
