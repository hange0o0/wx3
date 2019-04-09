class RobotVO{
    public static change = false
    private static index = 0;
    private static key = 0;
    public static create(){
        var t = TM.now();
        if(this.key != t)
        {
            this.key = t
            this.index = 0;
        }
        var lv = Math.min(TecManager.getInstance().tecBase[11].max,Math.max(1,TecManager.getInstance().getTecLevel(11) + Math.floor(Math.random()*3-1)))
        var buffForce = BuffManager.getInstance().getForceAdd()
        var force = (UM.maxForce-buffForce)*(0.8 + Math.random()*0.4) + buffForce*0.5;
        var robot = new RobotVO({
            force:force,
            level:lv,
            lastTime:t,
            distanceTime:180 + Math.floor((1800-180)*Math.random()),
            atk:PKManager.getInstance().getRobotList(lv),
            def:PKManager.getInstance().getRobotList(lv),
            nick:PKManager.getInstance().randomNick(),
            head:PKManager.getInstance().randomHead(),
        });
        robot.gameid = 'robot' + TM.now() +'_'+ this.index;
        RobotVO.change = true;
        return robot;
    }

    public gameid
    public force//战力
    public level//显示等级
    public lastTime//最后一次更新
    public distanceTime//出战需要时间
    public atk//出战队列
    public def//出战队列
    public nick
    public head
    public lastAtk//最近一次攻击时间

    public constructor(oo?){
        if(oo)
        {
            this.fill(oo);
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
        return this.lastAtk && this.lastAtk+2*this.distanceTime > TM.now()
    }
    public isAtked(){
        return this.lastAtk > 0;
    }

    public fill(data){
         for(var s in data)
         {
             this[s] = data[s];
         }
        //this.reset();
    }

    //更新敌人属性，一般出现在打回去时
    public reset(t){
        if(!this.level)
            this.level = 1;
        var cd = Math.pow(this.level,1.5)*100*(1 + Math.random()*2);
        if(t - this.lastTime > cd)
        {
            var num = Math.floor((t - this.lastTime)/cd);
            if(num > 5)
            {
                if(num/this.level>=10)
                    this.level ++;
                this.def = PKManager.getInstance().getRobotList(this.level)
            }
            while(num>0)
            {
                num--;
                this.force += Math.ceil(2*this.level*Math.random());
            }
            this.lastTime = t;
            RobotVO.change = true;
        }
    }

    //public getLevel(){
    //    return this.level + this.levelAdd
    //}

    public getFightForce(){
        return  this.force
    }

}