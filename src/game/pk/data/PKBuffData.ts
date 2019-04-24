class PKBuffData_wx3 {
    public user; //发起者,对象
    public owner;        //拥有者
    public isDebuff = false;
    public removeAble = true;
	private wx3_functionX_12703(){console.log(6346)}

    public endTime = 0;//到期时间  为0则为图腾类效果
    public add = {};  //改变的值
    public state = {};  //改变的状态
    public tempValue = {};
    public haveState = false
	private wx3_functionX_12704(){console.log(7556)}
    public haveValue = false


    //以下为唯一技能才用到
    public id;//唯一ID
    public ing//这BUFF是否有起作用
    public value;//技能等级数值,用于比较相同ID下哪个BUFF强
	private wx3_functionX_12705(){console.log(8952)}


    public endFun

    constructor(obj?) {
        //if (obj)
        //    this.fill(obj);
        //
        //if (this.nick)
        //    this.nick = Base64.decode(this.nick);
        //else
        //    this.nick = '守卫者' + this.id;
    }
	private wx3_functionX_12706(){console.log(9629)}
    private wx3_fun_asdfasdfasdf_1944(){}
    private wx3_fun_ast34_8625(){}

    //def,atk,addSpeed,hpChange
    public addValue(key,value){
        this.add[key] = value
        this.haveValue = true
    }
	private wx3_functionX_12707(){console.log(5206)}

    public addState(key){
        this.state[key] = true
        this.haveState = true
    }

    //使技能生效
	private wx3_functionX_12708(){console.log(8536)}
    public enable(){
        if(this.ing)
            return;
        this.ing = true;
        for(var s in this.add)
            this.owner[s] += this.add[s];
	wx3_function(1260);
    }

    //使技能无效
    public disable(){
        if(!this.ing)
            return;
        this.ing = false;
	wx3_function(6625);
        for(var s in this.add)
            this.owner[s] -= this.add[s];
    }

    public remove(){
        this.disable();
	wx3_function(4195);
        this.endFun && this.endFun(this);
    }
}