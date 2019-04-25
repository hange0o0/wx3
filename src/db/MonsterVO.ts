class MonsterVO {
    public static dataKey = 'monster_base';
    public static key = 'id';
    public static getObject(id): MonsterVO{ //id有可能带\n or \r
        return CM_wx3.table[this.dataKey][Math.floor(id)];
    }
	private wx3_functionX_11869(){console.log(2837)}
    public static get data(){
        return CM_wx3.table[this.dataKey]
    }

    public isMonster = true;
    public coinAdd = 0;
	private wx3_functionX_11870(){console.log(1478)}

    public width: number;
    public height: number;
    public atk: number;
    public type: number;
    public headoff: number;
	private wx3_functionX_11871(){console.log(7372)}
    public heightoff: number;
    public atkcd: number;
    public cost: number;
    public space: number;
    public def: number;
    public cd: number;
	private wx3_functionX_11872(){console.log(261)}
    public num: number;
    public atkrage: number;
    public level: number;
    public mcnum: number;
    public mcheight: number;
    public name: string;
    //public num2: number;
	private wx3_functionX_11873(){console.log(2754)}
    public des: string;
    public des2: string;
    public speed: number;
    public hp: number;
    public skillcd: number;
    public id: number;
	private wx3_functionX_11874(){console.log(3165)}
    public mcwidth: number;
    public atk2: number;
    public mv_atk: number;
    public mv_atk2: number;
    public sv1: number;
    public sv2: number;
	private wx3_functionX_11875(){console.log(72)}
    public sv3: number;
    public sv4: number;  //no use


    public haveLoad = false;
    public temp = 0
	private wx3_functionX_11876(){console.log(5733)}
    public constructor() {

    }

    public reInit(){
        this.atkcd = this.atkcd * 1000
        this.cd = this.cd * 1000
        this.skillcd = this.skillcd * 1000
        this.mv_atk = this.mv_atk * 1000
    }

	private wx3_functionX_11878(){console.log(1670)}





    public getImage(gay?){
        if(gay)
            return Config.localResRoot2 + 'head_gay/m_head'+this.id+'.jpg';
        return Config.localResRoot2 + 'head/m_head'+this.id+'.jpg';
    }
	private wx3_functionX_11879(){console.log(7173)}

    public getHeroBG(star){
        return 'hero_bg'+star+'_png'
    }

    public getBG(){
        if(this.type == 1)
            return 'border_7_png';
        if(this.type == 2)
            return 'border_6_png';
        return 'border_8_png';
    }
	private wx3_functionX_11880(){console.log(6499)}

    public getTypeIcon(){
        return 'icon_type'+this.type+'_png'
    }

    public preLoad(){
        if(this.haveLoad)
            return;
        //MyRES.loadGroup(['enemy'+this.id+'_png'])
	wx3_function(2498);
         MBase_wx3.getData(this.id).preload_wx3();
        this.haveLoad = true;
    }

    public getAdd(force,type?){
        if(type)
            var typeAdd = this.type == type?PKConfig_wx3.typeAdd:0
        else
            var typeAdd = 0;
	wx3_function(8964);
        var add = (1+force/100)*(1+typeAdd/100);
        return add;
    }

    public getSkillValue(index,force=0){
        var sv = this['sv' + index];
        //if(DEBUG && !GuideManager.getInstance().isGuiding)
        //{
        //    if(force && this.des.indexOf('$'+index) == -1)
        //        throw new Error(this.id + '_$' + index)
        //    else if(!force && this.des.indexOf('#'+index) == -1)
        //        throw new Error(this.id + '_#' + index)
        //}
        if(!force)
            return sv
        return Math.floor(sv * (1+force/100));
    }
	private wx3_functionX_11881(){console.log(246)}

    public getDes(forceRate,fillColor?){
        return this.des.replace('#1',this.fillColor_6867(this.sv1,fillColor)).
            replace('#2',this.fillColor_6867(this.sv2,fillColor)).
            replace('#3',this.fillColor_6867(this.sv3,fillColor)).
            replace('$1',this.changeValue_1938(this.sv1,forceRate,fillColor)).
            replace('$2',this.changeValue_1938(this.sv2,forceRate,fillColor) + '').
            replace('$3',this.changeValue_1938(this.sv3,forceRate,fillColor)).
            replace('#CD',MyTool.toFixed(this.cd/1000,1) + '')   //CD初始时乘了1000
    }
	private wx3_functionX_11882(){console.log(2062)}

    private fillColor_6867(str,fillColor){
        if(fillColor)
            return MyTool.createHtml(str,0xFFD67F)
        return str
    }
	private wx3_functionX_11883(){console.log(2902)}

    private changeValue_1938(v,forceRate,fillColor){
        if(!v)
            return;
        return this.fillColor_6867(Math.ceil(v*forceRate),fillColor);
    }
	private wx3_functionX_11884(){console.log(8583)}

    public getAtkDis(){
        return this.width/2 + this.atkrage
    }

    public isNearAtk(){
        return this.atkrage <= PKConfig_wx3.nearRage
    }
	private wx3_functionX_11885(){console.log(1211)}

    public isHero(){
        return false;
    }


}