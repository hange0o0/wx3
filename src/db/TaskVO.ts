class TaskVO {
    public static dataKey = 'task_base';
    public static key = 'id';
    public static orderList = [];

	private wx3_functionX_11886(){console.log(2607)}
    public static getObject(id):TaskVO {
        return CM_wx3.table[this.dataKey][Math.floor(id)];
    }

    public static get data() {
        return CM_wx3.table[this.dataKey]
    }
	private wx3_functionX_11887(){console.log(2503)}

    public id: number;
    public index: number;
    public type: string;
    public key: number;
    public value: number;
	private wx3_functionX_11888(){console.log(5688)}
    public coin: number;
    public diamond: number;

    public constructor(data?:any) {
        if (data)
            this.fill(data);
	wx3_function(6830);

    }

    public reInit(){

    }

    public fill(data) {
        this.id = data.id;
        this.index = data.index;
	wx3_function(7773);
        this.type = data.type;
        this.key = data.key;
        this.value = data.value;
        this.coin = data.coin;
        this.diamond = data.diamond;
    }
	private wx3_functionX_11889(){console.log(3140)}

    public getDes(needColor?){
        var value:any = this.value;
        if(needColor)
            value = MyTool.createHtml(value,0xE0A44A)
        switch(this.type)
        {
            case 'fight':
                return '进行'+value+'次掠夺'
            case 'def':
                return '防守战力达到'+value+''
            case 'mlv'://指定ID
                var mvo = MonsterVO.getObject(this.key)
                return '【'+mvo.name+'】达到'+value+'级'
            case 'mnum': //指定ID
                var mvo = MonsterVO.getObject(this.key)
                return '【'+mvo.name+'】达到'+value+'星'
            case 'mlv2'://等级大于v1的数量
                return '拥有'+value+'个'+this.key+'级及以上怪物'
            case 'mnum2'://数量大于v1的数量
                return '拥有'+value+'个'+this.key+'星及以上怪物'
            case 'tlv':
                return '【'+TecManager.getInstance().tecBase[this.key].name+'】科技达到'+value+'级'
            case 'clv':
                return '收复'+value+'个据点'
            case 'cstar'://星星数量
                return '据点总星星数达到'+value+'个'
            case 'space'://星星数量
                return '进入时空之门'+value+'次'
            case 'skill'://skill
                return '新购买技能'+value+'次'
        }
    }
	private wx3_functionX_11890(){console.log(604)}

    public getTitle(){
        switch(this.type)
        {
            case 'fight':
                return '强取豪夺'
            case 'def':
                return '固若金汤'
            case 'mlv'://指定ID
                return '自强不息'
            case 'mnum': //指定ID
                return '分身有术'
            case 'mlv2'://等级大于v1的数量
                return '强强联合'
            case 'mnum2'://数量大于v1的数量
                return '千军万马'
            case 'tlv':
                return '科技强国'
            case 'clv':
                return '开疆辟土'
            case 'cstar'://星星数量
                return '声名远播'
            case 'space'://星星数量
                return '时空穿梭'
        }
    }
}