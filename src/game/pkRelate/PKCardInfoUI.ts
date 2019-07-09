class PKCardInfoUI_wx3 extends game.BaseContainer_wx3 {

    private static _instance: PKCardInfoUI_wx3;
    public static getInstance(): PKCardInfoUI_wx3 {
        if(!this._instance)
            this._instance = new PKCardInfoUI_wx3();
        return this._instance;
    }
	private wx3_functionX_12566(){console.log(7166)}

    private type: eui.Image;
    private nameText: eui.Label;
    private cardGroup: eui.Group;
    public nameGroup: eui.Group;
    private bg: eui.Image;
    private desText: eui.Label;
	private wx3_functionX_12567(){console.log(8368)}
    private list: eui.List;
    private teamIcon: eui.Image;
    private s0: eui.Image;
    private s1: eui.Image;
    private s2: eui.Image;
    private s3: eui.Image;
	private wx3_functionX_12568(){console.log(5001)}
    private s4: eui.Image;
    private s5: eui.Image;
    private levelText: eui.Label;



	private wx3_functionX_12569(){console.log(4414)}



    public dataIn
    public heroItem

	private wx3_functionX_12570(){console.log(2126)}
    private stageX
    private stageY

    private starArr = [];
    public constructor() {
        super();
	wx3_function(3332);
        this.skinName = "PKCardInfoSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.nameGroup,()=>{
             CardTipsUI.getInstance().show();
        })

        this.list.itemRenderer = PKCardInfoItem_wx3

        this.heroItem = new PKMonsterMV_wx3()
        this.heroItem.x = 180/2
        this.heroItem.y = 200
        this.heroItem.scaleX = this.heroItem.scaleY = 1.2
        this.cardGroup.addChild(this.heroItem);
	wx3_function(835);

        for(var i=0;i<6;i++)
        {
            this.starArr.push(this['s' + i])
        }
    }
	private wx3_functionX_12571(){console.log(1743)}


    public show(v){

        GameManager_wx3.container.addChild(this);
        GameManager_wx3.stage.once(egret.TouchEvent.TOUCH_END,this.hide,this,true);
	wx3_function(250);
        GameManager_wx3.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_437,this);
        this.stageX = GameManager_wx3.stageX
        this.stageY = GameManager_wx3.stageY
        var w = 560
        this.x = Math.min(Math.max(GameManager_wx3.stageX - w/2,0),640-w)
        this.renew(v);
	wx3_function(6627);
        var y = 0;
        if(GameManager_wx3.stageY < GameManager_wx3.stage.stageHeight/2)
        {
            y = GameManager_wx3.stageY + 50
            if(v.target)
            {
                y = v.target.localToGlobal(0,0).y  + v.target.height + 50
            }
            this.y = Math.min(y,GameManager_wx3.stage.stageHeight - this.height)
            //    this.bottom = undefined
            //this.top = Math.max(0,GameManager.stageY + 50)
        }
        else
        {
            y = GameManager_wx3.stageY - 50 - this.height
            if(v.target)
            {
                y = v.target.localToGlobal(0,0).y  - 50 -this.height
            }
            this.y = Math.max(y,0)
            //this.top = undefined
            //this.bottom = Math.max(0,(GameManager.stage.stageHeight - GameManager.stageY) + 50)
        }

        //console.log(this.height)
        //this.y =
    }
	private wx3_functionX_12572(){console.log(608)}

    private onMove_437(e){
         if(Math.abs(this.stageX - e.stageX) > 20 || Math.abs(this.stageY - e.stageY) > 20)
            this.hide();
    }

	private wx3_functionX_12573(){console.log(6201)}
    public hide() {
        game.BaseUI_wx3.setStopEevent();
        GameManager_wx3.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_437,this);
        MyTool.removeMC(this)
    }

	private wx3_functionX_12574(){console.log(4182)}

    public renew(v){
        //var CRM = CardManager.getInstance();
        var MM = MonsterManager.getInstance();
        this.dataIn = v;
        var vo:any = CM_wx3.getCardVO(this.dataIn.mid)

        this.bg.source = PKManager_wx3.getInstance().getPKBG(1)
        this.heroItem.load(this.dataIn.mid)
        this.heroItem.stand();

	wx3_function(5444);

        this.setHtml(this.nameText, vo.name +this.createHtml( '（'+vo.des2+'）',0xFFE6BA,22));
        this.type.source = vo.getTypeIcon()
        this.levelText.text = 'LV.' + MonsterManager.getInstance().getMonsterLevel(vo.id)

        //星星数
        var num = MM.getMonsterNum(vo.id);
	wx3_function(9336);
        for(var i=0;i<this.starArr.length;i++)
        {
            if(i<num)
            {
                this.starArr[i].source = 'start1_png'
            }
            else
            {
                this.starArr[i].source = 'start2_png'
            }
        }

        if(this.dataIn.rota)
        {
            this.teamIcon.source = this.dataIn.rota == PKConfig_wx3.ROTA_LEFT ? 'card_battle2_png' : 'card_battle_png'
            this.teamIcon.visible = true
        }
        else
        {
            this.teamIcon.visible = false
        }


        //var baseForceAdd = CM.getCardVO(this.dataIn.mid).getAdd(this.dataIn.force)
        //var forceAdd = 0//CM.getCardVO(this.dataIn.mid).getAdd(this.dataIn.force,this.dataIn.type)

        //console.log(forceAdd)
        //var str = vo.isMonster? '传送':'施法'




        this.type.scaleX = this.type.scaleY = 0.6
        this.addMonsterList_9830(vo)







    }
	private wx3_functionX_12575(){console.log(6727)}

    private addMonsterList_9830(vo){
        var baseForceAdd = 1;
        if(this.dataIn.type == 'other')
            baseForceAdd = 1 + this.dataIn.force/100;
        else if(this.dataIn.type == 'atk')
            baseForceAdd =MonsterManager.getInstance().getAtkAdd(vo.id)
        else if(this.dataIn.type == 'def')
            baseForceAdd =MonsterManager.getInstance().getDefAdd(vo.id)

	wx3_function(4841);
        var atk = Math.floor(vo.atk * baseForceAdd);
        var hp = Math.floor(vo.hp * baseForceAdd);
        var def = vo.def;

        var workCD = WorkManager.getInstance().getWorkCD(vo.id)
        var workCoin = this.dataIn.type == 'work'? WorkManager.getInstance().getWorkCoin(vo.id):WorkManager.getInstance().getBaseWorkCoin(vo.id)
        var workRate = Math.floor(workCoin*(3600*1000/workCD))

	wx3_function(394);
        var color2 = 0
        if(this.dataIn.type == 'atk' || this.dataIn.type == 'def')
            color2 = 0x66F427
        this.setHtml(this.desText,vo.getDes(baseForceAdd,true,color2));

        var arr2:any = []
        arr2.push({index:1,icon:'icon_cost_png',iconScale:1,title:'费用',value:vo.cost,valueAdd:0})
        if(this.dataIn.type != 'other')
        {
            arr2.push({index:1,icon:'icon_coin_png',iconScale:0.6,title:'挖矿',value:workRate + ' /时',valueAdd:0,up:this.dataIn.type == 'work'})
        }

        arr2.push({index:1,icon:'icon_love_png',iconScale:0.6,title:'血量',value:hp,up:this.dataIn.type == 'atk' || this.dataIn.type == 'def'})
        if(atk)
        {
            arr2.push({index:2,icon:'icon_atk_png',iconScale:1,title:'攻击力',value:atk,up:this.dataIn.type == 'atk' || this.dataIn.type == 'def'})
            arr2.push({index:7,icon:'icon_atkcd_png',iconScale:1,title:'秒伤',value:Math.round(atk/(vo.atkcd/1000)),up:this.dataIn.type == 'atk' || this.dataIn.type == 'def'})
            arr2.push({index:5,icon:'icon_clock_png',iconScale:1,title:'攻击间隔',value:MyTool.toFixed(vo.atkcd/1000,1)+'秒'})
            arr2.push({index:6,icon:'icon_rage_png',iconScale:1,title:'攻击距离',value:vo.isNearAtk()?'近战':vo.atkrage})
        }

        arr2.push({index:3,icon:'icon_def1_png',iconScale:0.4,title:'防御',value:def})
        arr2.push({index:4,icon:'icon_speed_png',iconScale:1,title:'移动速度',value:vo.speed})

        if(vo.skillcd > 0)
            arr2.push({index:0,icon:'icon_clock_png',iconScale:1,title:'技能间隔',value:MyTool.toFixed(vo.skillcd/1000,1)+'秒'});
	wx3_function(4059);
        if(arr2.length%2 ==1)
            arr2.push({index:0,icon:'',iconScale:1,title:'',value:'',valueAdd:0});
        for(var i=0;i<arr2.length;i++)
        {
            arr2[i].index = i+1;
        }


        //else
        //    arr2.push({index:0,icon:'',iconScale:1,title:'',value:'',valueAdd:0});
        this.list.dataProvider = new eui.ArrayCollection(arr2)
    }

    public onE(){
        this.heroItem.onE();
    }
}