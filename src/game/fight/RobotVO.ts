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
        var robot = new RobotVO({
            force:100,
            forceRate:0.5,
            level:1,
            lastTime:t,
            distanceTime:10,//180 + Math.floor(1000*Math.random()),
            list:'1,2,3,4,5',
            nick:PKManager.getInstance().randomNick(),
            head:Math.ceil(Math.random()*1000),
        })
        robot.gameid = 'robot' + TM.now() +'_'+ this.index;
        RobotVO.change = true;
        return robot;
    }

    public gameid
    public force//战力
    public forceRate //实际战力比例
    public level//显示等级
    public lastTime//最后一次更新
    public distanceTime//出战需要时间
    public list//出战队列
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

    public fill(data){
         for(var s in data)
         {
             this[s] = data[s];
         }
        this.reset();
    }

    public reset(){
        var cd = this.level*120*(1 + Math.random()*2);
        if(TM.now() - this.lastTime > cd)
        {
            var num = Math.floor((TM.now() - this.lastTime)/cd);
            while(num>0)
            {
                num--;
                this.force += Math.ceil(2*this.level*Math.random());
            }
            this.lastTime = TM.now();
            RobotVO.change = true;
        }
        //var num = Math.floor((TM.now() - this.setDataTime)/(this.growSpeed*this.level));
        //if(num > 0)
        //{
        //    this.force += Math.ceil(num*2*this.level*Math.random());
        //    this.setDataTime += num*this.growSpeed;
        //
        //    var t = TM.now() - this.lastTime;
        //    while(t - Math.pow(this.level+this.levelAdd,2.8)*15*60 > 0)
        //    {
        //        this.levelAdd ++
        //    }
        //}
    }

    //public getLevel(){
    //    return this.level + this.levelAdd
    //}

    public getFightForce(){
        return  Math.floor(this.force*this.forceRate)
    }

}