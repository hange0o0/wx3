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
}