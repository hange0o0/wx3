class TaskVO {
    public static dataKey = 'task_base';
    public static key = 'id';
    public static orderList = [];

    public static getObject(id):TaskVO {
        return CM.table[this.dataKey][Math.floor(id)];
    }

    public static get data() {
        return CM.table[this.dataKey]
    }

    public id: number;
    public index: number;
    public type: string;
    public key: number;
    public value: number;
    public coin: number;
    public diamond: number;

    public constructor(data?:any) {
        if (data)
            this.fill(data);

    }

    public fill(data) {
        this.id = data.id;
        this.index = data.index;
        this.type = data.type;
        this.key = data.key;
        this.value = data.value;
        this.coin = data.coin;
        this.diamond = data.diamond;
    }

    public getDes(){
        switch(this.type)
        {
            case 'fight':
                return '进行'+this.value+'次掠夺'
            case 'def':
                return '防守战力达到'+this.value+''
            case 'mlv'://指定ID
                var mvo = MonsterVO.getObject(this.key)
                return '【'+mvo.name+'】达到'+this.value+'级'
            case 'mnum': //指定ID
                var mvo = MonsterVO.getObject(this.key)
                return '【'+mvo.name+'】达到'+this.value+'星'
            case 'mlv2'://等级大于v1的数量
                return '拥有'+this.value+'个'+this.key+'级及以上怪物'
            case 'mnum2'://数量大于v1的数量
                return '拥有'+this.value+'个'+this.key+'星及以上怪物'
            case 'tlv':
                return '【'+TecManager.getInstance().tecBase[this.key].name+'】科技达到'+this.value+'级'
            case 'clv':
                return '收复'+this.value+'个据点'
            case 'cstar'://星星数量
                return '据点总星星数达到'+this.value+'个'
        }
    }

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
        }
    }
}