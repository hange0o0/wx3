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
        this.register_1258(SkillVO);

    }

    private register_1258(cls)
    {
        this.registerData[cls.dataKey] = cls;
	wx3_function(5935);
    }

    //初始化数据
    public initData(data,key){
        if(!this.table[key])
            this.table[key] = {};
        data = data.replace(/\r/g,'')
        var rows = data.split('\n')
        var fieldDelim = '\t';
        var fields: Array<string> = String(rows[0]).split(fieldDelim);
        for(var i: number = 1;i < rows.length;i++) {
            var s: string = rows[i];
            if(s != null && s != "") {
                var cols: Array<any> = s.split(fieldDelim);
                var cls = this.registerData[key];
                var vo:any = new cls();
                for(var j: number = 0;j < fields.length;j++) {
                    var value = cols[j];
                    if(!fields[j])
                        continue;
                    vo[fields[j]] = value && !isNaN(value) ? Number(value) : value;
                }
                vo.reInit();
                if(vo[cls.key])
                    this.table[key][vo[cls.key]] = vo;
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
