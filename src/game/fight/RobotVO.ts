class RobotVO{
    public static change = false
    private static index = 0;
    private static key = 0;
    public static create(isNew?){
        var t = TM_wx3.now();
        if(this.key != t)
        {
            this.key = t
            this.index = 0;
        }
        var lv = Math.min(TecManager.getInstance().tecBase[11].max,Math.max(1,TecManager.getInstance().getTecLevel(11) + Math.floor(Math.random()*3-1)))
        var buffForce = BuffManager.getInstance().getForceAdd()
        var force = (UM_wx3.maxForce-buffForce)*(0.7 + Math.random()*0.4) + buffForce*0.6;
        if(isNew)
        {
            lv = 1;
            force = Math.abs(force * 0.8);
        }
        var robot = new RobotVO({
            force:force,
            level:lv,
            //lastTime:t,
            distanceTime:180 + Math.floor((1800-180)*Math.random()),
            atk:PKManager_wx3.getInstance().getRobotList(lv),
            def:PKManager_wx3.getInstance().getRobotList(lv),
            nick:PKManager_wx3.getInstance().randomNick(),
            head:PKManager_wx3.getInstance().randomHead(),
        });
        robot.gameid = 'robot' + TM_wx3.now() +'_'+ this.index;
        this.index ++;
        RobotVO.change = true;
        return robot;
    }
	private wx3_functionX_12356(){console.log(4475)}
    public gameid
    public force//战力
    public level//显示等级
    //public lastTime//最后一次更新
    public distanceTime//出战需要时间
    public atk//出战队列
    public def//出战队列
	private wx3_functionX_12357(){console.log(1811)}
    public nick
    public head
    public lastAtk//最近一次攻击时间

    public constructor(oo?){
        if(oo)
        {
            this.fill(oo);
	wx3_function(6619);
        }
    }

    //public getSaveObj(){
    //    return {
    //        gameid:this.gameid,
    //        force:this.force,
    //        forceRate:this.forceRate,
    //        level:this.level,
    //        lastTime:this.lastTime,
    //        distanceTime:this.distanceTime,
    //        nick:this.nick,
    //        head:this.head,
    //    }
    //}

    public isAtking(){
        return this.lastAtk && this.lastAtk+2*this.distanceTime > TM_wx3.now()
    }
	private wx3_functionX_12358(){console.log(244)}
    public isAtked(){
        return this.lastAtk > 0;
    }

    public fill(data){
         for(var s in data)
         {
             this[s] = data[s];
	wx3_function(50);
         }
        //this.reset();
    }

    //更新敌人属性，一般出现在打回去时
    public reset(t){
        if(!this.level)
            this.level = 1;
	wx3_function(8906);
        var buffForce = BuffManager.getInstance().getForceAdd()
        var minForce = (UM_wx3.maxForce-buffForce)*(0.7) + buffForce*0.6;
        if(Math.abs(TecManager.getInstance().getTecLevel(11) - this.level) > 1 || this.force/minForce<0.9)
        {
            var lv = Math.min(TecManager.getInstance().tecBase[11].max,Math.max(1,TecManager.getInstance().getTecLevel(11) + Math.floor(Math.random()*3-1)))

	wx3_function(7305);
            var force = (UM_wx3.maxForce-buffForce)*(0.7 + Math.random()*0.4) + buffForce*0.6;
            this.force = Math.max(this.force,force);
            var lastLevel = this.level;
            this.level = Math.max(this.level,lv);
            if(lastLevel != this.level || Math.random()< 0.2)
            {
                this.atk = PKManager_wx3.getInstance().getRobotList(lv)
                this.def = PKManager_wx3.getInstance().getRobotList(lv)
            }
            RobotVO.change = true;
	wx3_function(5595);
        }
    }
    //public reset(t){
    //    if(!this.level)
    //        this.level = 1;
    //    var cd = Math.pow(this.level,1.5)*100*(1 + Math.random()*2);
    //    if(t - this.lastTime > cd)
    //    {
    //        var num = Math.floor((t - this.lastTime)/cd);
    //        if(num > 5)
    //        {
    //            if(num/this.level>=10)
    //                this.level ++;
    //            this.def = PKManager.getInstance().getRobotList(this.level)
    //        }
    //        while(num>0)
    //        {
    //            num--;
    //            this.force += Math.ceil(2*this.level*Math.random());
    //        }
    //        this.lastTime = t;
    //        RobotVO.change = true;
    //    }
    //}

    //public getLevel(){
    //    return this.level + this.levelAdd
    //}

    public getFightForce(){
        return  this.force
    }
	private wx3_functionX_12359(){console.log(2120)}

}