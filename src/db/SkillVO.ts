class SkillVO {
    public static dataKey = 'skill_base';
    public static key = 'id';
    public static getObject(id): SkillVO{ //id有可能带\n or \r
        return CM_wx3.table[this.dataKey][Math.floor(id)];
    }
    public static get data(){
        return CM_wx3.table[this.dataKey]
    }

    public id: number;
    public name: string;
    public des: string;
    public level: number;
    public cd: number;
    public coin: number;
    public v1: number;
    public v2: number;
    public v3: number;

    public constructor() {

    }

    public reInit(){
        this.cd = this.cd * 1000
    }

    public getImage(){
        return Config.localResRoot2 + 'mskill/'+this.id+'.jpg';
    }


    public getAdd(lv){
        var add = (1+lv*0.5)
        return add;
    }

    public getSkillValue(index,lv=0){
        var sv = this['v' + index];
        if(!lv)
            return sv
        return Math.floor(sv * (1+lv*0.5));
    }

    public getDes(forceRate,fillColor?,color2?){
        return this.des.replace('#1',this.fillColor_6867(this.v1,fillColor)).
            replace('#2',this.fillColor_6867(this.v2,fillColor)).
            replace('#3',this.fillColor_6867(this.v3,fillColor)).
            replace('$1',this.changeValue_1938(this.v1,forceRate,fillColor,color2)).
            replace('$2',this.changeValue_1938(this.v2,forceRate,fillColor,color2) + '').
            replace('$3',this.changeValue_1938(this.v3,forceRate,fillColor,color2))
    }

    private fillColor_6867(str,fillColor,color?){
        if(fillColor)
            return MyTool.createHtml(str,color || 0xFFD67F)
        return str
    }

    private changeValue_1938(v,forceRate,fillColor,color?){
        if(!v)
            return;
        return this.fillColor_6867(Math.ceil(v*(1+forceRate*0.5)),fillColor,color);
    }
}