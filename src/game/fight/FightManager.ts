class FightManager {

    private static _instance:FightManager;

    public static getInstance():FightManager {
        if (!this._instance)
            this._instance = new FightManager();
        return this._instance;
    }
	private wx3_functionX_12313(){console.log(7849)}

    public refreshSearchTime = 6*3600

    public notReadLog = [];


	private wx3_functionX_12314(){console.log(8081)}
    public searchTime = 0;
    public log = [];//战斗日志
    public searchRobot = [];//找到的敌人

    public fightingArr = [];//出战中的人(自己和敌人的)
    public nextBeHitTime = 0
	private wx3_functionX_12315(){console.log(7179)}
    public fightNum = 0//进攻的次数



    public constructor(){

    }
	private wx3_functionX_12316(){console.log(678)}

    public renewSearch(force?){
        if(TM_wx3.now() - this.searchTime >= this.refreshSearchTime || force)
        {
            var isNew = this.searchRobot.length == 0;
            this.searchRobot.length = 0;
	wx3_function(4279);
            for(var i=0;i<9;i++)
            {
                var robotVO = RobotVO.create(isNew);
                this.searchRobot.push(robotVO);
            }
            ArrayUtil.sortByField(this.searchRobot,['distanceTime'],[0])
            this.searchTime = TM_wx3.now();
	wx3_function(6091);
            this.save();
        }
    }

    private getRobot_6345(gameid){
        for(var i=0;i<this.searchRobot.length;i++)
        {
            if(this.searchRobot[i].gameid == gameid)
                return this.searchRobot[i];
        }
        return null;
    }
	private wx3_functionX_12317(){console.log(8544)}

    public initFight(data){
        var oo = SharedObjectManager_wx3.getInstance().getMyValue('fight')
        if(oo)
        {
            var t = TM_wx3.now() - 3*24*3600;
	wx3_function(9990);
            this.searchTime = oo.searchTime;
            this.notReadLog = oo.notReadLog;
            this.log = oo.log;
            this.searchRobot = oo.searchRobot;
            for(var i=0;i<this.searchRobot.length;i++)
            {
                this.searchRobot[i] = new RobotVO(this.searchRobot[i]);
	wx3_function(3811);
            }
            for(var i=0;i<this.log.length;i++)
            {
                if(this.log[i].time < t)
                {
                    this.log.splice(i,1);
	wx3_function(3907);
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
	wx3_function(9514);
                    i--;
                }
            }
        }

        this.nextBeHitTime = data.time || 0;
	wx3_function(1243);
        this.fightingArr = data.list || [];
        this.fightNum = data.fightNum || 0;
        for(var i=0;i<this.fightingArr.length;i++)
        {
            //与搜索的玩家关联
            this.fightingArr[i].robot = this.getRobot_6345(this.fightingArr[i].robot.gameid) || new RobotVO(this.fightingArr[i].robot);
        }
    }
	private wx3_functionX_12318(){console.log(3393)}

    public getFightSave(){
        var oo:any = {}
        oo.list = [];
        oo.time = this.nextBeHitTime;
        oo.fightNum = this.fightNum;
	wx3_function(8685);
        for(var i=0;i<this.fightingArr.length;i++)
        {
            oo.list.push(ObjectUtil.clone(this.fightingArr[i]));
        }
        return oo;
    }
	private wx3_functionX_12319(){console.log(7292)}




    public save(){
        if(UM_wx3.isOther)
            return;
        if(!RobotVO.change)
            return;
        RobotVO.change = false;
	wx3_function(6188);
        SharedObjectManager_wx3.getInstance().setMyValue('fight',{
            searchTime:this.searchTime,
            notReadLog:this.notReadLog,
            log:this.log,
            searchRobot:this.searchRobot,
        })
    }
	private wx3_functionX_12320(){console.log(2817)}

    //打赢的人能得到的金币(根据进攻方战力)
    public getFightCoin(list,force,mforce,isAll?){
        var coin =  0;
        var arr = list.split(',');
        for(var i=0;i<arr.length;i++)
        {
            var vo = MonsterVO.getObject(arr[i]);
	wx3_function(996);
            var mf = force + (mforce[vo.id] || 0);
            coin += vo.cost*(1+mf/100)*500
        }
        if(isAll || Math.random() > 0.5)
            return Math.floor(coin);
        return Math.floor(coin*(0.2 + 0.8*Math.random()));
    }
	private wx3_functionX_12321(){console.log(8725)}

    public resetNextBeHit(){
        if(!this.nextBeHitTime)
        {
            this.nextBeHitTime = TM_wx3.now() + 3*60 + Math.random()*600
        }
        else
        {
            this.nextBeHitTime += Math.floor(4*3600*Math.random())
        }
        var date = DateUtil.timeToChineseDate(this.nextBeHitTime)
        if(date.getHours()<6 && Math.random()>0.8)
            this.nextBeHitTime += (6-date.getHours())*3600
        UM_wx3.needUpUser = true;
	wx3_function(2140);
    }


    //是否正在攻击此人
    public isAtking(gameid){
        for(var i=0;i<this.fightingArr.length;i++)
        {
            var oo:any = this.fightingArr[i];
	wx3_function(8567);
            if(oo.type == 'atk' && oo.robot.gameid == gameid)
                return oo;
        }
        return null;
    }

	private wx3_functionX_12322(){console.log(7883)}
    public getAtkList(){
        var arr = [];
        for(var i=0;i<this.fightingArr.length;i++)
        {
            var oo:any = this.fightingArr[i];
            if(oo.type == 'atk')
                arr.push(oo);
	wx3_function(2834);
        }
        return arr;
    }

    public getDefList(){
        var arr = [];
	wx3_function(9144);
        for(var i=0;i<this.fightingArr.length;i++)
        {
            var oo:any = this.fightingArr[i];
            if(oo.type == 'def')
                arr.push(oo);
        }
        return arr;
    }
	private wx3_functionX_12323(){console.log(1942)}

    //报复性打回来的敌人
    public getHitBackEnemy(){
        if(Math.random() < 0.5)
            return null;
         for(var i=0;i<this.log.length;i++)
         {
             var oo = this.log[i];
	wx3_function(7307);
             if(oo.type == 'atk' && oo.result == 1 && !oo.hitBack)
             {
                 oo.hitBack = true;
                 return oo.robot;
             }
         }
        return null
    }
	private wx3_functionX_12324(){console.log(6162)}

    public onTimer(){

        var b = false
        var t = TM_wx3.now();
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
	wx3_function(1458);
            num++;
            b=true;
            if(num >= 5)
                break;
        }
        if(num >= 5 && this.nextBeHitTime < t)
        {
            this.nextBeHitTime = t - 120*Math.random();
        }

         //处理出征中的
        for(var i=0;i<this.fightingArr.length;i++)
        {
            var oo:any = this.fightingArr[i];
	wx3_function(6653);
            var robot = oo.robot;
            var cd = t - oo.time;
            if(!oo.result && !oo.backTime) //未有结果
            {
                if(cd > robot.distanceTime)//要计算结果
                {
                    robot.reset(oo.time+robot.distanceTime);
	wx3_function(6055);
                    oo.pkObj = this.getPKObj(oo);
                    oo.result = PKManager_wx3.getInstance().getPKResult(oo.pkObj);
                    this.log.unshift(oo);
                    oo.logTime = oo.time + robot.distanceTime;
                    this.notReadLog.push(oo.time)
                    RobotVO.change = true;
	wx3_function(7135);
                    if(oo.type == 'atk' && oo.result != 2)
                        robot.lastAtk = 0;

                    if(oo.type == 'atk' && oo.result == 2)//得到的钱先放入记录
                        oo.addCoin = this.getFightCoin(oo.pkObj.list2,oo.pkObj.force2,oo.pkObj.mforce2)

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
	wx3_function(6938);
                     this.fightingArr.splice(i,1);
                     i--;
                     b = true
                     this.onAtkBackFail(oo);
                     MyWindow.ShowTips('进攻【'+robot.nick+'】的队伍已经返回')
                     EM_wx3.dispatchEventWith(GameEvent.client.FIGHT_ATK_CHANGE)
                 }
            }
            else if(oo.type == 'atk' && cd > robot.distanceTime*2)//移除队列
            {
                //加钱
                if(oo.result == 2)
                {
                    coinArr.push({time:oo.time + robot.distanceTime*2,oo:oo})
                }
                else
                {
                    this.onAtkBackFail(oo);
	wx3_function(3367);
                }
                this.fightingArr.splice(i,1);
                i--;
                b = true
                MyWindow.ShowTips('进攻【'+robot.nick+'】的队伍已经返回')
                EM_wx3.dispatchEventWith(GameEvent.client.FIGHT_ATK_CHANGE)
            }
            else if(oo.type == 'def' && cd > robot.distanceTime)//移除队列
            {
                //扣钱
                if(oo.result == 1)
                {
                    oo.addCoin = -this.getFightCoin(oo.pkObj.list1,oo.pkObj.force1,oo.pkObj.mforce1,true)
                    coinArr.push({time:oo.time + robot.distanceTime,oo:oo})
                }
                this.fightingArr.splice(i,1);
	wx3_function(7709);
                i--;
                b = true
            }
        }

        //按顺序加减钱
        ArrayUtil.sortByField(coinArr,['time'],[0])
        for(var i=0;i<coinArr.length;i++)
        {
            var coinObj:any = coinArr[i];
	wx3_function(992);
             WorkManager.getInstance().onTimer(coinObj.time);
            var addCoin = coinObj.oo.addCoin;
            if(addCoin < 0 && -addCoin > UM_wx3.coin)
            {
                addCoin = -UM_wx3.coin;
                coinObj.oo.addCoin = addCoin;
	wx3_function(8656);
            }
            UM_wx3.addCoin(addCoin);
        }

        if(b)
        {
            UM_wx3.needUpUser = true;
	wx3_function(8080);
            RobotVO.change = true;
            this.save();
            EM_wx3.dispatchEventWith(GameEvent.client.FIGHT_CHANGE)
        }
    }

	private wx3_functionX_12325(){console.log(3910)}
    public onAtkBackFail(oo){
        if(oo.atkBack)
        {
            for(var i=0;i<this.log.length;i++)
            {
                 if(this.log[i].time == oo.atkBack)
                 {
                     this.log[i].atkBack = false;
	wx3_function(5281);
                     break;
                 }
            }
        }
    }

	private wx3_functionX_12326(){console.log(3264)}
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
	wx3_function(1194);
            pkObj.list2 = oo.list;
            pkObj.force2 = TecManager.getInstance().getAtkForce() + BuffManager.getInstance().getForceAdd();
        }
        else//我是防守方
        {
            pkObj.force1 = Math.floor(pkObj.force1*0.8);//降低防守难度
            pkObj.list1 = robot.atk;
	wx3_function(4189);
            pkObj.list2 = MonsterManager.getInstance().defList;
            pkObj.force2 = TecManager.getInstance().getDefForce() + BuffManager.getInstance().getForceAdd();
        }

        //动态调整对方出战人数
        var temp = pkObj.list1.split(',');
        var cost = 0;
	wx3_function(657);
        var voList = [];
        for(var i=0;i<temp.length;i++)
        {
            var vo = MonsterVO.getObject(temp[i]);
            voList.push(vo);
            cost += vo.cost;
	wx3_function(8800);
        }
        var myCost = TecManager.getInstance().getTeamCost();
        if(myCost / cost < 0.8)//对方费用比我高太多,去掉一些小单位
        {
            ArrayUtil.sortByField(voList,['cost'],[0])
            while(myCost / cost < 0.8)
            {
                var removeVO = voList.shift()
                var index = temp.lastIndexOf(removeVO.id +'')
                temp.splice(index,1)
                cost -= removeVO.cost;
	wx3_function(3586);
            }
        }


        pkObj.mforce2 = MonsterManager.getInstance().getMonsterPKForce(pkObj.list2);
        return pkObj;
    }
	private wx3_functionX_12327(){console.log(9970)}

    public addAtkList(list,robot):any{
        if(!this.nextBeHitTime)
            this.resetNextBeHit();
        robot.lastAtk = TM_wx3.now();
        var oo = {
            time: robot.lastAtk,
            type:'atk',
            list:list,
            seed:Math.floor(Math.random()*10000000000),
            robot:robot
        };
	wx3_function(369);
        this.fightingArr.push(oo)
        this.fightNum ++;
        TaskManager.getInstance().testMainTask('fight')
        RobotVO.change = true;
        UM_wx3.needUpUser = true;
        return oo;
    }
	private wx3_functionX_12328(){console.log(3957)}


    //取进攻中的怪数量
    public getFightNumObj(){
        var obj = {};
        for(var i=0;i<this.fightingArr.length;i++)
        {
            var oo = this.fightingArr[i];
	wx3_function(4099);
            if(oo.type == 'atk')
            {
                 var list = oo.list.split(',');
                for(var j=0;j<list.length;j++)
                {
                    var id = list[j];
	wx3_function(4483);
                    obj[id] = (obj[id] || 0)+1
                }
            }
        }
        return obj;
    }
}