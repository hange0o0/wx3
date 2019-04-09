class FightManager {

    private static _instance:FightManager;

    public static getInstance():FightManager {
        if (!this._instance)
            this._instance = new FightManager();
        return this._instance;
    }

    public refreshSearchTime = 6*3600

    public notReadLog = [];


    public searchTime = 0;
    public log = [];//战斗日志
    public searchRobot = [];//找到的敌人

    public fightingArr = [];//出战中的人(自己和敌人的)
    public nextBeHitTime = 0
    public fightNum = 0//进攻的次数



    public constructor(){
        var oo = SharedObjectManager.getInstance().getMyValue('fight')
        if(oo)
        {
            var t = TM.now() - 3*24*3600;
            this.searchTime = oo.searchTime;
            this.notReadLog = oo.notReadLog;
            this.log = oo.log;
            this.searchRobot = oo.searchRobot;
            for(var i=0;i<this.searchRobot.length;i++)
            {
                this.searchRobot[i] = new RobotVO(this.searchRobot[i]);
            }
            for(var i=0;i<this.log.length;i++)
            {
                if(this.log[i].time < t)
                {
                    this.log.splice(i,1);
                    i--;
                    continue;
                }
                this.log[i].robot = new RobotVO(this.log[i].robot);
            }

            for(var i=0;i<this.notReadLog.length;i++)
            {
                if(this.notReadLog[i] < t)
                {
                    this.notReadLog.splice(i,1);
                    i--;
                }
            }
        }
    }

    public renewSearch(force?){
        if(TM.now() - this.searchTime >= this.refreshSearchTime || force)
        {
            this.searchRobot.length = 0;
            for(var i=0;i<9;i++)
            {
                this.searchRobot.push(RobotVO.create());
            }
            ArrayUtil.sortByField(this.searchRobot,['distanceTime'],[0])
            this.searchTime = TM.now();
            this.save();
        }
    }

    private getRobot(gameid){
        for(var i=0;i<this.searchRobot.length;i++)
        {
            if(this.searchRobot[i].gameid == gameid)
                return this.searchRobot[i];
        }
        return null;
    }

    public initFight(data){
        this.nextBeHitTime = data.time || 0;
        this.fightingArr = data.list || [];
        this.fightNum = data.fightNum || 0;
        for(var i=0;i<this.fightingArr.length;i++)
        {
            //与搜索的玩家关联
            this.fightingArr[i].robot = this.getRobot(this.fightingArr[i].robot.gameid) || new RobotVO(this.fightingArr[i].robot);
        }
    }

    public getFightSave(){
        var oo:any = {}
        oo.list = [];
        oo.time = this.nextBeHitTime;
        oo.fightNum = this.fightNum;
        for(var i=0;i<this.fightingArr.length;i++)
        {
            oo.list.push(ObjectUtil.clone(this.fightingArr[i]));
        }
        return oo;
    }




    public save(){
        if(!RobotVO.change)
            return;
        RobotVO.change = false;
        SharedObjectManager.getInstance().setMyValue('fight',{
            searchTime:this.searchTime,
            notReadLog:this.notReadLog,
            log:this.log,
            searchRobot:this.searchRobot,
        })
    }

    //打赢的人能得到的金币(根据进攻方战力)
    public getFightCoin(list,force,mforce,buff,isAll?){
        var coin =  0;
        var arr = list.split(',');
        for(var i=0;i<arr.length;i++)
        {
            var vo = MonsterVO.getObject(arr[i]);
            var mf = force + (mforce[vo.id] || 0);
            coin += vo.cost*(1+mf/100)*(1+(buff || 0)/100)*500
        }
        if(isAll || Math.random() > 0.5)
            return Math.floor(coin);
        return Math.floor(coin*(0.2 + 0.8*Math.random()));
    }

    public resetNextBeHit(){
        if(!this.nextBeHitTime)
            this.nextBeHitTime = TM.now()
        this.nextBeHitTime += Math.floor(6*3600*Math.random())
        var date = DateUtil.timeToChineseDate(this.nextBeHitTime)
        if(date.getHours()<6 && Math.random()>0.8)
            this.nextBeHitTime += (6-date.getHours())*3600
        UM.needUpUser = true;
    }


    //是否正在攻击此人
    public isAtking(gameid){
        for(var i=0;i<this.fightingArr.length;i++)
        {
            var oo:any = this.fightingArr[i];
            if(oo.type == 'atk' && oo.robot.gameid == gameid)
                return oo;
        }
        return null;
    }

    public getAtkList(){
        var arr = [];
        for(var i=0;i<this.fightingArr.length;i++)
        {
            var oo:any = this.fightingArr[i];
            if(oo.type == 'atk')
                arr.push(oo);
        }
        return arr;
    }

    public getDefList(){
        var arr = [];
        for(var i=0;i<this.fightingArr.length;i++)
        {
            var oo:any = this.fightingArr[i];
            if(oo.type == 'def')
                arr.push(oo);
        }
        return arr;
    }

    //报复性打回来的敌人
    public getHitBackEnemy(){
        if(Math.random() < 0.5)
            return null;
         for(var i=0;i<this.log.length;i++)
         {
             var oo = this.log[i];
             if(oo.type == 'atk' && oo.result == 1 && !oo.hitBack)
             {
                 oo.hitBack = true;
                 return oo.robot;
             }
         }
        return null
    }

    public onTimer(){

        var b = false
        var t = TM.now();
        var coinArr = [];
        //处理准备打我的
        var num = 0
        while(this.nextBeHitTime && this.nextBeHitTime < t)//加入我被打的
        {
            this.fightingArr.push({
                time:this.nextBeHitTime,
                type:'def',
                seed:Math.floor(Math.random()*10000000000),
                robot:this.getHitBackEnemy() || RobotVO.create()
            })
            this.resetNextBeHit();
            num++;
            b=true;
            if(num >= 3)
                break;
        }
        if(num >= 3 && this.nextBeHitTime < t)
        {
            this.nextBeHitTime = t;
            this.resetNextBeHit();
        }

         //处理出征中的
        for(var i=0;i<this.fightingArr.length;i++)
        {
            var oo:any = this.fightingArr[i];
            var robot = oo.robot;
            var cd = t - oo.time;
            if(!oo.result && !oo.backTime) //未有结果
            {
                if(cd > robot.distanceTime)//要计算结果
                {
                    robot.reset(oo.time+robot.distanceTime);
                    oo.pkObj = this.getPKObj(oo);
                    oo.result = PKManager.getInstance().getPKResult(oo.pkObj);
                    this.log.unshift(oo);
                    oo.logTime = oo.time + robot.distanceTime;
                    this.notReadLog.push(oo.time)
                    RobotVO.change = true;
                    if(oo.type == 'atk' && oo.result != 2)
                        robot.lastAtk = 0;

                    if(cd - robot.distanceTime < 5)
                    {
                        if(oo.type == 'atk')
                        {
                            MyWindow.ShowTips('进攻【'+robot.nick+'】' + (oo.result==2?'成功':'失败') + ',队伍正在返回')
                        }
                        else if(oo.type == 'def')
                        {
                            if(oo.result==1)
                                MyWindow.ShowTips('【'+robot.nick+'】攻破了我方防御')
                            else
                                MyWindow.ShowTips('我方守下了【'+robot.nick+'】的进攻')
                        }
                    }


                }
            }
            if(oo.backTime)
            {
                 if(oo.backTime <= t)
                 {
                     robot.lastAtk = 0;
                     this.fightingArr.splice(i,1);
                     i--;
                     b = true
                     this.onAtkBackFail(oo);
                     MyWindow.ShowTips('进攻【'+robot.nick+'】的队伍已经返回')
                     EM.dispatchEventWith(GameEvent.client.FIGHT_ATK_CHANGE)
                 }
            }
            else if(oo.type == 'atk' && cd > robot.distanceTime*2)//移除队列
            {
                //加钱
                if(oo.result == 2)
                {
                    oo.addCoin = this.getFightCoin(oo.pkObj.list2,oo.pkObj.force2,oo.pkObj.mforce2,oo.pkObj.buff2)
                    coinArr.push({time:oo.time + robot.distanceTime*2,oo:oo})
                }
                else
                {
                    this.onAtkBackFail(oo);
                }
                this.fightingArr.splice(i,1);
                i--;
                b = true
                MyWindow.ShowTips('进攻【'+robot.nick+'】的队伍已经返回')
                EM.dispatchEventWith(GameEvent.client.FIGHT_ATK_CHANGE)
            }
            else if(oo.type == 'def' && cd > robot.distanceTime)//移除队列
            {
                //扣钱
                if(oo.result == 1)
                {
                    oo.addCoin = -this.getFightCoin(oo.pkObj.list1,oo.pkObj.force1,oo.pkObj.mforce1,0,true)
                    coinArr.push({time:oo.time + robot.distanceTime,oo:oo})
                }
                this.fightingArr.splice(i,1);
                i--;
                b = true
            }
        }

        //按顺序加减钱
        ArrayUtil.sortByField(coinArr,['time'],[0])
        for(var i=0;i<coinArr.length;i++)
        {
            var coinObj:any = coinArr[i];
             WorkManager.getInstance().onTimer(coinObj.time);
            var addCoin = coinObj.oo.addCoin;
            if(addCoin < 0 && -addCoin > UM.coin)
            {
                addCoin = -UM.coin;
                coinObj.oo.addCoin = addCoin;
            }
            UM.addCoin(addCoin);
        }

        if(b)
        {
            UM.needUpUser = true;
            RobotVO.change = true;
            this.save();
            EM.dispatchEventWith(GameEvent.client.FIGHT_CHANGE)
        }
    }

    public onAtkBackFail(oo){
        if(oo.atkBack)
        {
            for(var i=0;i<this.log.length;i++)
            {
                 if(this.log[i].time == oo.atkBack)
                 {
                     this.log[i].atkBack = false;
                     break;
                 }
            }
        }
    }

    public getPKObj(oo){
        var robot = oo.robot;
        var pkObj:any = {
            seed:oo.seed,
            force1:robot.getFightForce(),
            mforce1:{}
        }
        if(oo.type == 'atk')//我是进攻方
        {
            pkObj.list1 = robot.def;
            pkObj.list2 = oo.list;
            pkObj.force2 = TecManager.getInstance().getAtkForce() + BuffManager.getInstance().getForceAdd();
        }
        else//我是防守方
        {
            pkObj.list1 = robot.atk;
            pkObj.list2 = MonsterManager.getInstance().defList;
            pkObj.force2 = TecManager.getInstance().getDefForce() + BuffManager.getInstance().getForceAdd();
        }
        pkObj.mforce2 = MonsterManager.getInstance().getMonsterPKForce(pkObj.list2);
        return pkObj;
    }

    public addAtkList(list,robot):any{
        if(!this.nextBeHitTime)
            this.resetNextBeHit();
        robot.lastAtk = TM.now();
        var oo = {
            time: robot.lastAtk,
            type:'atk',
            list:list,
            seed:Math.floor(Math.random()*10000000000),
            robot:robot
        };
        this.fightingArr.push(oo)
        this.fightNum ++;
        EM.dispatch(GameEvent.client.TASK_CHANGE)
        RobotVO.change = true;
        UM.needUpUser = true;
        return oo;
    }


    //取进攻中的怪数量
    public getFightNumObj(){
        var obj = {};
        for(var i=0;i<this.fightingArr.length;i++)
        {
            var oo = this.fightingArr[i];
            if(oo.type == 'atk')
            {
                 var list = oo.list.split(',');
                for(var j=0;j<list.length;j++)
                {
                    var id = list[j];
                    obj[id] = (obj[id] || 0)+1
                }
            }
        }
        return obj;
    }
}