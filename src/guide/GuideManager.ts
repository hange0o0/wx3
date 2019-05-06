/**
 *
 * @author 
 *
 */
class GuideManager {
    //work*2->def*2->mlv,cnum->clv->tec->fight
	private wx3_functionX_11955(){console.log(6309)}
    private static _instance: GuideManager;
    public currentStepId: Number;
    public isGuiding:boolean = true;

    public temp;

	private wx3_functionX_11956(){console.log(789)}

    public guideKey;
    public guideKey2;
    public guideStep = 0;

    public guideRandom = 0;
	private wx3_functionX_11957(){console.log(5008)}
    public guidePK = 0;


    private guideArr = [];
    public constructor() {

    }
	private wx3_functionX_11958(){console.log(2361)}

    public static getInstance(): GuideManager {
        if(!this._instance)
            this._instance = new GuideManager();
        return this._instance;
    }
	private wx3_functionX_11959(){console.log(5784)}

    public testShowGuide(){
        if(this.isGuiding)
        {
           this.showGuide()
        }
    }
	private wx3_functionX_11960(){console.log(5907)}

    public enableScrollV(scroller){
        scroller.scrollPolicyV = this.isGuiding? eui.ScrollPolicy.OFF:eui.ScrollPolicy.AUTO
    }

    public showGuide(){
        if(!this.isGuiding)
            return;
        //this.guideKey = ''
	wx3_function(6169);
        MyTool.stopClick(300);
        egret.setTimeout(this.guideFun_8765,this,200);
    }

    //public reInit(){
    //    this.guideRandom = 0;
    //    this.guidePK = 0;
    //    this.guideArr[0].text = '(代号)['+UM.nick+']您好，欢迎来到[【冲破防线】]！我是你的引路人[铁牛]。'
    //}

    public init(){
        var self = this;
        //            hideHand:false,
        this.addGuideObj_96({
            fun:function(){
                self.showGuide();
	wx3_function(746);
            },
            text:'[' + (UM_wx3.nick || '')+']你好，欢迎来到怪物争霸的世界。',
        })

        this.addGuideObj_96({
            mc:function(){return GameUI.getInstance().list.getChildAt(0)['addDefBtn']},
            text:'我们要先守好自己的家园再图发展，马上去配置你的防守阵容吧。',
        })

        this.addGuideObj_96({
            mc:function(){return PKPosUI.getInstance().list.getChildAt(0)},
            text:'上阵一个怪物',
        })

        this.addGuideObj_96({
            mc:function(){return PKPosUI.getInstance().list.getChildAt(1)},
            text:'上阵第二个怪物',
        })

        this.addGuideObj_96({
            mc:function(){return PKPosUI.getInstance().list.getChildAt(2)},
            text:'上阵第三个怪物',
        })

        this.addGuideObj_96({
            mc:function(){return PKPosUI.getInstance().chooseList.getChildAt(2)['hitMC']},
            text:'[拖动]第三位的怪物[到第一位]，把肉盾顶到前面',
            showFun:()=>{
                GuideUI.getInstance().handMovePos(PKPosUI.getInstance().chooseList.getChildAt(2)['hitMC'],PKPosUI.getInstance().chooseList.getChildAt(0)['hitMC']);
            }
        })

        this.addGuideObj_96({
            mc:function(){return PKPosUI.getInstance().okBtn},
            text:'保存防守阵容，这下家园就暂时安全了吧',
        })

        this.addGuideObj_96({
            mc:function(){return GameUI.getInstance().list.getChildAt(1)['frontBG']},
            text:'然后我们要赶快回复生产，让更多的怪物开始[挖矿]吧。',
            beforeFun:function(){
                GameUI.getInstance().scrollToWork()
            }
        })

        this.addGuideObj_96({
            mc:function(){return PKPosUI.getInstance().list.getChildAt(3)},
            text:'上阵第二个怪物',
        })

        this.addGuideObj_96({
            mc:function(){return PKPosUI.getInstance().okBtn},
            text:'暂时就这样吧，我们还要留着空闲的怪物去开疆辟土呢',
        })

        this.addGuideObj_96({
            mc:function(){return GameUI.getInstance().monsterBtn},
            text:'一个怪物不够用，我们多招点怪物吧',
        })

        this.addGuideObj_96({
            mc:function(){return MonsterUI.getInstance().list.getChildAt(0)['posGroup']},
            text:'选择其中一个怪物开始强化',
        })

        this.addGuideObj_96({
            mc:function(){return CardInfoUI.getInstance().con},
            text:'这里显示的是怪物间属性相克关系',
            hideHand:true,
            fun:function(){
                self.showGuide();
	wx3_function(2206);
            },
        })

        this.addGuideObj_96({
            mc:function(){return CardInfoUI.getInstance().upBtn},
            text:'升级怪物可强化该怪物的[战斗属性]及[挖矿效率]',
        })

        this.addGuideObj_96({
            mc:function(){return CardInfoUI.getInstance().copyBtn},
            text:'每升一星可使怪物[多一个分身]供你调遣',
        })

        //this.addGuideObj_96({
        //    mc:function(){return CardInfoUI.getInstance().rightBtn},
        //    text:'继续下一个怪物',
        //})
        //
        //this.addGuideObj_96({
        //    mc:function(){return CardInfoUI.getInstance().upBtn},
        //    text:'你要拿这个怪物去[战斗]？升级怪物就能增加其[战力]了',
        //})
        //
        //this.addGuideObj_96({
        //    mc:function(){return CardInfoUI.getInstance().copyBtn},
        //    text:'怪物多多益善啊',
        //})
        //
        //this.addGuideObj_96({
        //    mc:function(){return CardInfoUI.getInstance().rightBtn},
        //    text:'无论什么工作，[都要]怪物来完成的，所以能升就升吧',
        //})
        //
        //this.addGuideObj_96({
        //    mc:function(){return CardInfoUI.getInstance().upBtn},
        //    text:'你要拿这个怪物去[挖矿]？升级怪物就能提升[挖矿效率]了',
        //})
        //
        //this.addGuideObj_96({
        //    mc:function(){return CardInfoUI.getInstance().copyBtn},
        //    text:'多分一个，应该暂时够用了',
        //})

        this.addGuideObj_96({
            mc:function(){return CardInfoUI.getInstance().closeBtn},
            text:'现在要去攻打据点了',
        })

        this.addGuideObj_96({
            mc:function(){return GameUI.getInstance().chapterBtn},
            text:'开始收复第一个据点吧',
        })

        this.addGuideObj_96({
            mc:function(){return ChapterUI.getInstance().list.getChildAt(0)},
            text:'每个收复的据点会为[你源源不断地产出金币]，首次达[3星]还可获得[钻石]奖励，',
        })

        this.addGuideObj_96({
            mc:function(){return PKPosUI.getInstance().list.getChildAt(0)},
            text:'上阵个怪物',
        })

        this.addGuideObj_96({
            mc:function(){return PKPosUI.getInstance().list.getChildAt(3)},
            text:'上阵下一个怪物,会直接去到队伍第一个空位',
        })



        this.addGuideObj_96({
            mc:function(){return PKPosUI.getInstance().list.getChildAt(1)},
            text:'上阵第三个怪物',
        })

        this.addGuideObj_96({
            mc:function(){return PKPosUI.getInstance().list.getChildAt(2)},
            text:'上阵第四个怪物',
        })

        this.addGuideObj_96({
            mc:function(){return PKPosUI.getInstance().pkBtn},
            text:'开始战斗',
        })

        this.addGuideObj_96({
            fun:function(){
                self.showGuide();
	wx3_function(5388);
            },
            text:'战斗开始后，怪物就会按你刚才[布阵的顺序依次出战]。',
        })

        this.addGuideObj_96({
            fun:function(){
                self.showGuide();
	wx3_function(9920);
            },
            text:'[消灭对方所有怪物]或[冲破对方出生点]都会获得胜利。',
        })

        this.addGuideObj_96({
            fun:function(){
                GuideUI.getInstance().hide();
	wx3_function(6457);
                MainPKUI_wx3.getInstance().startGame()
            },
            text:'[要赢取胜利，关键有两点：[战力压制] 和 [阵容克制]！',
        })

        this.addGuideObj_96({
            fun:function(){
                self.endGuide_3532();
	wx3_function(2111);
            },
            text:'恭喜你取得了来到怪物世界的首利。下面就请跟着[主线任务]继续前进吧！',
        })





        //this.addGuideObj_96({
        //    mc:function(){return GameUI.getInstance().loadingGroup},
        //    text:'这里是参战双方的队伍，他们会按箭头所指方向顺序加入战场',
        //    fun:function(){
        //        self.showGuide()
        //        GameUI.getInstance().hideGuideArrow();
        //        self.guideKey2 = 'info';
        //    },
        //    showFun:()=>{
        //        GameUI.getInstance().showGuideArrow();
        //        var tipsGroup = GuideUI.getInstance().tipsGroup;
        //        tipsGroup.validateNow();
        //        tipsGroup.y = (GameManager.uiHeight-tipsGroup.height)/2 - 10;
        //    }
        //})
        //
        //this.addGuideObj_96({
        //    mc:function(){return GameUI.getInstance().team1.guideCon},
        //    text:'可选中其中一个单位查看详细数据',
        //
        //    //fun:()=>{
        //    //    CardInfoUI.getInstance().show(GameUI.getInstance().team1.getMiddleMoster().id)
        //    //}
        //})
        //
        //this.addGuideObj_96({
        //    mc:function(){return CardInfoUI.getInstance().con},
        //    text:'要注意单位间的属性相克关系',
        //    toBottom:true,
        //    fun:function(){
        //        CardInfoUI.getInstance().hide();
        //        self.showGuide()
        //    }
        //})
        //
        //this.addGuideObj_96({
        //    mc:function(){return GameUI.getInstance().team1.bottomBG},
        //    text:'了解队伍情况后，可选择你感兴趣的队伍进行打赏',
        //    fun:function(){
        //        self.showGuide()
        //    }
        //})
        //
        //this.addGuideObj_96({
        //    mc:function(){return GameUI.getInstance().team1.forceGroup},
        //    text:'越多人打赏的队伍实力会越强，但回报率也会相应降低，而少人打赏的队伍回报率就会比较高',
        //    fun:function(){
        //        self.showGuide()
        //    }
        //})
        //
        //this.addGuideObj_96({
        //    mc:function(){return GameUI.getInstance().cdText},
        //    text:'你只能在备战阶段进行打赏，备战会有时间限制，备战结束后就会进入对战阶段',
        //    fun:function(){
        //        self.guideKey = 'pk';
        //        self.temp = TM.now();
        //        GameUI.getInstance().onTimer();
        //        self.showGuide()
        //    },
        //})
        //
        //this.addGuideObj_96({
        //    text:'进入对战阶段后，双方按顺序进入战场进行对决，直到消灭所有敌人或其中一方冲破对方出生点',
        //    toBottom:true,
        //    fun:function(){
        //        self.showGuide()
        //    }
        //})
        //this.addGuideObj_96({
        //    mc:function(){return MainPKUI.instance.cdGroup},
        //    text:'对战会时间限制，如果在'+Math.round(PKConfig.drawTime/1000)+'秒内未能决出胜负，则算双方平手，庄家通杀^_^',
        //    fun:function(){
        //        self.showGuide()
        //    }
        //})
        //
        //this.addGuideObj_96({
        //    mc:function(){return MainPKUI.instance.list1.getChildAt(0)},
        //    text:'你可以点击下方头像查看单位的详细信息',
        //    toBottom:true,
        //    fun:function(){
        //        self.showGuide()
        //    }
        //})
        //
        //this.addGuideObj_96({
        //    mc:function(){return GameUI.getInstance().settingBtn},
        //    text:'如果在等待下一环节时，可尝试挑战一下里面的关卡，胜利后可获得金币哦',
        //    fun:function(){
        //        self.showGuide()
        //    }
        //})
        //
        //
        //this.addGuideObj_96({
        //    text:'介绍到此结束，下面正式进入游戏',
        //    fun:function(){
        //        self.endGuide_3532()
        //        GameUI.getInstance().endGuide();
        //    }
        //})
    }
	private wx3_functionX_11961(){console.log(8294)}

    private endGuide_3532(){
        this.isGuiding = false;
        GuideUI.getInstance().hide()
        PopUpManager.hideAll();
        GameUI.getInstance().endGuide();
	wx3_function(7414);
        TaskUI.getInstance().show();
    }

    private addGuideObj_96(obj){
        this.guideArr.push(obj);
    }
	private wx3_functionX_11962(){console.log(3487)}

    private guideFun_8765(ui){
        var self = this;
        var data = this.guideArr[this.guideStep];
        var guideData:any = {};
        guideData.mc = data.mc;
        //if(guideData.mc && typeof guideData.mc == 'string')
        //    guideData.mc = eval(guideData.mc);
        if(guideData.mc && typeof guideData.mc == 'function')
            guideData.mc = guideData.mc();
	wx3_function(1238);
        guideData.fun = data.fun;
        guideData.text = data.text;
        guideData.toBottom = data.toBottom;
        guideData.nearMC = data.nearMC;
        guideData.hideHand = data.hideHand || false;
        guideData.showFun = data.showFun//data.hideHand || false;
	wx3_function(3821);

        if(data.guideKey)
            this.guideKey = data.guideKey

        this.guideStep ++;

	wx3_function(1189);
        data.beforeFun &&  data.beforeFun();

        GuideUI.getInstance().show(guideData)
    }

    private getMainRect_8621(){
        var h = GameManager_wx3.stage.stageHeight - 140 -260//Math.min(580,GameManager.stage.stageHeight - 180 -130)
        var top = 140//(GameManager.stage.stageHeight - 180 -130 - h)/2 + 180
        return new egret.Rectangle(80,top,480,h);
    }
	private wx3_functionX_11963(){console.log(6953)}



}
