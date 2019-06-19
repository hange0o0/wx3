class PKCode_wx3 {
    private static instance:PKCode_wx3;

    public static getInstance() {
        if (!this.instance) this.instance = new PKCode_wx3();
        return this.instance;
    }
	private wx3_functionX_12501(){console.log(5058)}

    private wx3_fun_asdfasdfasdf_1963(){}
    private wx3_fun_ast34_4712(){}
    //每一步执行
    public onStep(){
        var PD = PKData_wx3.getInstance();
        if(PD.stopTime)
            return;
        if(!PD.startTime)
        {
            if(DEBUG)
                throw new Error('未开始就调用onStep')
            sendClientError('未开始就调用onStep')
            return;
        }
        var cd = PD.getPassTime() - PD.actionTime
        if(PD.actionTime == 0 && !PD.beginAuto) //在开始前上的怪
        {
            PD.beginAuto = true
            this.runActionList();
            this.autoAction();

        }

        var monsterAddCD = 2000;
        if(PD.pkModel == 2)
            monsterAddCD = 1000;
        //console.log(cd)
        var runStart = TM_wx3.nowMS();
        while(PD.quick || cd > PKConfig_wx3.stepCD)
        {
            PD.actionTime += PKConfig_wx3.stepCD;
            PD.disableKey = {};
	wx3_function(6162);
            cd -= PKConfig_wx3.stepCD;

            if(PD.actionTime%monsterAddCD == 0)
                this.autoAction();
            if(PD.actionTime%10000 == 0)
                this.autoMonsterAction();
            //this.actionPosCard();
            //this.addMonster();
            //this.actionSkill();
            this.monsterAction();
            this.monsterMove();
	wx3_function(2551);
            PKMonsterAction_wx3.getInstance().actionAtk(PD.actionTime);//攻击落实
            //this.heroAdd();

            this.actionFinish();

            //if(PD.isReplay && PD.actionTime >= PD.replayEndTime)
            //    PD.isGameOver = true;
	wx3_function(8018);

            if(PD.actionTime > PKConfig_wx3.drawTime)//5分
                PD.isGameOver = true;

            if(PD.isGameOver)
                return true


            if(PD.quick && PD.actionTime >= PD.quickTime)
            {
                PD.quick = false;
	wx3_function(6384);
                cd = 0;
                PD.startTime = TM_wx3.nowMS() - PD.actionTime + PD.speedAddTime;
                PD.startTime -= TM_wx3.nowMS() - runStart;//扣去运行时间

                PKVideoCon_wx3.getInstance().resetView();
            }
        }
        return false;
    }
	private wx3_functionX_12502(){console.log(8227)}

    ///////////////*********************************************************


    private runActionList(){
        var PD = PKData_wx3.getInstance();
        if(!PD.isReplay)
            return;
        for(var i=0;i<PD.actionList.length;i++)
        {
            if(PD.actionList[i].time == PD.actionTime)
            {
                if(PD.actionList[i].id > 200)
                    PD.useSkill(PD.actionList[i].id,true)
                else
                    PD.useMonster(PD.actionList[i].index,true)
            }
        }
    }

    ////英雄出动
    //public heroAdd(){
    //    var PD = PKData.getInstance();
    //    if(PD.preLoadHeroStep < Math.floor((PD.actionTime + 1000*10)/PKConfig.heroCD))//预加载
    //    {
    //        PD.preLoadHeroStep ++;
    //        for(var i=1;i<=PD.playerNum;i++) //暂时4个玩家
    //        {
    //            var player = PD.playerObj[i];
    //            if (!player)
    //                continue
    //            player.preloadHero(PD.preLoadHeroStep);
    //        }
    //    }
    //
    //    if(PD.heroStep < Math.floor(PD.actionTime/PKConfig.heroCD))
    //    {
    //        PD.heroStep ++;
    //        var b = false
    //        for(var i=1;i<=PD.playerNum;i++) //暂时4个玩家
    //        {
    //            var player = PD.playerObj[i];
    //            if (!player)
    //                continue
    //            b = player.addHero(PD.heroStep) || b;
    //        }
    //        if(b)
    //            PD.addVideo({
    //                type:PKConfig.VIDEO_HERO_ADD
    //            })
    //    }
    //}

    //自动出战上怪
    public autoAction(){
        var PD = PKData_wx3.getInstance();
        for(var i=1;i<=PD.playerNum;i++) //暂时4个玩家
        {
            var player = PD.playerObj[i];
	wx3_function(9679);
            if (!player)
                continue
            player.addMonster();
            //player.testAddPosCard(PD.actionTime);
        }
    }

    public autoMonsterAction(){
        var PD = PKData_wx3.getInstance();

        if(PD.pkModel == 2)//每10秒敌人会加费用
        {
            PD.getPlayer(1).addCost(Math.floor(PD.actionTime/1000/5))
        }
        if(!PD.autoMonster.length)
            return;
        var mid = PD.autoMonster.shift();
        for(var i=1;i<=PD.playerNum;i++) //暂时4个玩家
        {
            var player = PD.playerObj[i];
            if (!player)
                continue
            PKData_wx3.getInstance().addMonster(player.getMonsterCreateData({
                mid:mid,
            }))
        }
    }

    //public actionPosCard(){
    //    var PD = PKData.getInstance();
    //    var currentRound = PKTool.getRound(PD.actionTime)
    //    console.log(PD.round,currentRound);
    //    if(PD.round == currentRound)
    //    {
    //          return
    //    }
    //    for(var i=1;i<=PD.playerNum;i++)
    //    {
    //        var player = PD.playerObj[i];
    //        if(!player)
    //            continue;
    //        player.actionPosCard();
    //    }
    //    PD.round = currentRound;
    //    PD.addVideo({
    //        type:PKConfig.VIDEO_POS_REMOVE
    //    })
    //}
	private wx3_functionX_12503(){console.log(4042)}

    //怪出手
    public monsterAction(){
        var PD = PKData_wx3.getInstance();
        for(var i=0;i<PD.monsterList.length;i++)
        {
            PD.resetMonsterData();//重置技能数据，方便技能统计
            var mvo:PKMonsterData_wx3 = PD.monsterList[i];
	wx3_function(6768);
            var skillTargets = mvo.canSkill(PD.actionTime);

            if(skillTargets && skillTargets.length > 0)   //用技能
            {
                PKMonsterAction_wx3.getInstance().skill(mvo,PD.actionTime)
            }
            else
            {
                var target = mvo.getAtkTarget()
                if(target)//普攻
                {
                    PKMonsterAction_wx3.getInstance().atk(mvo,PD.actionTime);
	wx3_function(3284);
                }
            }
        }
    }

    //怪移动
    public monsterMove(){
        var PD = PKData_wx3.getInstance();
	wx3_function(8789);
        for(var i=0;i<PD.monsterList.length;i++)
        {
            var mvo:PKMonsterData_wx3 = PD.monsterList[i];
            if(mvo.canMove(PD.actionTime))
            {
                mvo.move();
	wx3_function(6029);
            }
            else if(mvo.stopTime < PD.actionTime && mvo.mid != 99)
                mvo.stand();
        }
    }

    //一轮操作结束,移队死，过线的，结算,清除BUFF
	private wx3_functionX_12504(){console.log(7843)}
    public actionFinish(){
        var PD = PKData_wx3.getInstance();
        var teamNum1 = 0
        var teamNum2 = 0
        for(var i=0;i<PD.monsterList.length;i++)
        {
            var mvo:PKMonsterData_wx3 = PD.monsterList[i];
	wx3_function(3248);
            if(mvo.die || (mvo.dieTime && mvo.dieTime <= PD.actionTime)) //死的
            {
                mvo.die = true;
                PD.monsterList.splice(i,1);
                PD.addVideo({
                    type:PKConfig_wx3.VIDEO_MONSTER_DIE,
                    user:mvo,
                })
                i--;
	wx3_function(5597);
                mvo.onDie();
                PD.monsterChange = true;
            }
            else if(mvo.x < PKConfig_wx3.appearPos || mvo.x > PKConfig_wx3.floorWidth + PKConfig_wx3.appearPos) //冲过终点
            {
                mvo.die = true;
	wx3_function(8107);
                PD.monsterList.splice(i,1);
                i--;
                mvo.passEnd = true;
                mvo.onDie();
                PD.monsterChange = true;
                if(mvo.dieTime) //召唤物不算分
                {
                    PD.addVideo({
                        type:PKConfig_wx3.VIDEO_MONSTER_DIE,
                        user:mvo,
                    })
                    continue;
	wx3_function(6042);
                }
                PD.getPlayer(mvo.owner).teamData.enemy.hp -= 1;
                if(PD.getPlayer(mvo.owner).teamData.enemy.hp <= 0)
                {
                    //console.log(PD.getPlayer(mvo.owner).teamData.enemy)
                    PD.isGameOver = true;
                }

                PD.addVideo({
                    type:PKConfig_wx3.VIDEO_MONSTER_WIN,
                    user:mvo,
                })
            }
            else { //其它
                if(mvo.hpChange && PD.actionTime - mvo.lastHpChange >= 500) //改变血量值
                {
                    mvo.addHp(Math.floor(mvo.hpChange/2))
                    mvo.lastHpChange = PD.actionTime;
	wx3_function(5406);
                    if(mvo.die || (mvo.dieTime && mvo.dieTime <= PD.actionTime)) //死的
                    {
                        mvo.die = true;
                        PD.monsterList.splice(i,1);
                        PD.addVideo({
                            type:PKConfig_wx3.VIDEO_MONSTER_DIE,
                            user:mvo,
                        })
                        i--;
	wx3_function(4569);
                        mvo.onDie();
                        PD.monsterChange = true;
                    }
                }
                mvo.cleanBuff(PD.actionTime) //清除BUFF
                if(mvo.stateChange)
                {
                    mvo.stateChange = false;
	wx3_function(9712);
                    PD.addVideo({
                        type:PKConfig_wx3.VIDEO_MONSTER_STATE_CHANGE,
                        user:mvo,
                    })
                }
            }
            if(!mvo.die)
            {
                if(mvo.getOwner().teamData.id == 1)
                    teamNum1 ++;
                else if(mvo.getOwner().teamData.id == 2)
                    teamNum2 ++;
	wx3_function(7165);
            }

        }
        PD.team1.onStateTimer();
        PD.team2.onStateTimer();



        if(!PD.isGameOver && !PD.isDef)
        {
            if(PD.pkModel == 2)
            {
                if(teamNum1 == 0 && PD.getPlayer(1).autoList.length == 0)
                {
                    PD.getPlayer(1).teamData.hp = 0;
                    PD.isGameOver = true;
                }
                if(teamNum2 == 0)
                {
                    if(PD.isReplay)
                        var b = PD.actionList[PD.actionList.length - 1].time < PD.actionTime - PKConfig_wx3.stepCD
                    else
                        var b = SpaceManager.getInstance().myCurrentList.length == 0
                    if(b)
                    {
                        PD.getPlayer(2).teamData.hp = 0;
                        PD.isGameOver = true;
                    }

                }
            }
            else
            {
                if(teamNum1 == 0 && PD.getPlayer(1).autoList.length == 0)
                {
                    PD.getPlayer(1).teamData.hp = 0;
                    PD.isGameOver = true;
                }
                if(teamNum2 == 0 && PD.getPlayer(2).autoList.length == 0)
                {
                    PD.getPlayer(2).teamData.hp = 0;
                    PD.isGameOver = true;
                }
            }

        }

        this.runActionList();
    }
	private wx3_functionX_12505(){console.log(9895)}


}