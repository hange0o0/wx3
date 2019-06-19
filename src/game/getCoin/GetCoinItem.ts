class GetCoinItem extends game.BaseItem_wx3 {
    public constructor() {
        super();
        this.skinName = "GetCoinItemSkin";
    }
	private wx3_functionX_12343(){console.log(2857)}

    private bg: eui.Image;
    private titleText: eui.Label;
    private awardGroup: eui.Group;
    private addCoinText: eui.Label;
    private diamondGroup: eui.Group;
	private wx3_functionX_12344(){console.log(7123)}
    private addDiamondText: eui.Label;
    private goBtn: eui.Button;
    private rateText: eui.Label;
    private desText: eui.Label;
    //private diamondMC: eui.Image;
    private awardMC: eui.Image;
    private adGroup: eui.Group;
	private wx3_functionX_12345(){console.log(8081)}
    private ad1: eui.Image;
    private ad2: eui.Image;
    private ad3: eui.Image;
    private ad4: eui.Image;


	private wx3_functionX_12346(){console.log(8594)}






	private wx3_functionX_12347(){console.log(8559)}
    public addCoin = 0;
    public addDiamond = 0;
    public canAward = false
    public goWork = false
    public childrenCreated() {
        super.childrenCreated();
	wx3_function(1238);
        this.addBtnEvent(this.goBtn,this.onClick_8294)
    }

    private onClick_8294(){
        if(this.goWork)
        {
            if(this.data.type == 3)
            {
                ChangeJumpUI.getInstance().show('体验以上小程序'+MyTool.createHtml(30,0xFFFF00)+'秒即可获得奖励',()=>{
                    UM_wx3.coinObj.shareNum ++;
                    this.dataChanged();
                })
            }
            else  if(this.data.type == 4)
            {
                ShareTool.share('我需要你们的帮助！！',Config.localResRoot + "share_img_2.jpg",{type:1,from:UM_wx3.gameid},()=>{
                    this.desText.text = '等待好友加入'
                    this.goBtn.visible = false;
	wx3_function(7552);
                })
            }
            else if(this.data.type == 5)
            {
                ShareTool.openGDTV(()=>{
                    UM_wx3.coinObj.videoNum ++;
	wx3_function(3037);
                    this.dataChanged();
                })
            }
            else if(this.data.type == 6)
            {
                UM_wx3.coinObj.gameNum ++;
	wx3_function(8323);
                this.dataChanged();
                ShootGameUI_wx3.getInstance().show(this.getCoin_9848(0.25));
            }
            return;
        }
        if(!this.canAward)
        {
            return;
        }
        UM_wx3.addCoin(this.addCoin);
	wx3_function(6059);

        MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil.addNumSeparator(this.addCoin,2),0xFFFF00),2000)
        if(this.addDiamond)
        {
            UM_wx3.addDiamond(this.addDiamond);
            MyWindow.ShowTips('获得钻石：'+MyTool.createHtml('+' + this.addDiamond,0x6ffdfd),2000)
        }
        UM_wx3.needUpUser = true;
	wx3_function(2100);
        SoundManager_wx3.getInstance().playEffect('coin');

        switch(this.data.type)
        {
            //case 1:  //{type:1,title:'等陆第X天'},
            //    UM.coinObj.loginDayAward =1;
            //    break;
            //case 2:   //{type:2,title:'X小时后可领'},
            //    UM.coinObj.onLineAwardNum ++;
            //    UM.coinObj.onLineAwardTime = TM.now();
            //    break;
            case 3:   //{type:3,title:'告诉我的好友们'},
                UM_wx3.coinObj.shareAward ++;
	wx3_function(7156);
                break;
            //case 4: // {type:4,title:'邀请X位新的好友'},
            //    UM.coinObj.newAward ++;
            //    break;
            case 5: //
                UM_wx3.coinObj.videoAwardNum ++;
                break;
        }
        this.dataChanged();
	wx3_function(6429);
    }

    public dataChanged(){
        this.adGroup.visible = false;
        this.canAward = false;
        this.goWork = false;
	wx3_function(5730);
        this.desText.text = '';
        var coinObj = UM_wx3.coinObj
        var min=1
        var max=1
        this.goBtn.visible = true;
        this.goBtn.skinName = 'Btn1Skin'

	wx3_function(8462);
        this.addDiamond = 0;
        this.awardMC.visible = false;

        switch(this.data.type)
        {
            //case 1:  //{type:1,title:'等陆第X天'},
            //    min = coinObj.loginDays
            //    max = coinObj.loginDays
            //    if(coinObj.loginDayAward)
            //    {
            //         //min = coinObj.loginDays
            //         //max = coinObj.loginDays + 1
            //        this.goBtn.skinName = 'Btn3Skin'
            //        this.goBtn.label = '今日已领'
            //
            //    }
            //    else
            //    {
            //
            //        this.goBtn.label = '领取'
            //        this.canAward = true;
            //    }
            //    this.titleText.text = '每日登陆奖励'
            //    this.addCoin = 1000;
            //    break;
            //case 2:   //{type:2,title:'X小时后可领'},
            //    if(coinObj.onLineAwardNum >= 5)
            //    {
            //        this.goBtn.skinName = 'Btn3Skin'
            //        this.goBtn.label = '今日已领'
            //    }
            //    //else
            //    //{
            //    //   this.onTimer()
            //    //}
            //    this.titleText.text = '在线金币礼包'
            //    this.addCoin = 100*Math.min(coinObj.onLineAwardNum + 1,5);
            //    break;
            case 3:   //{type:3,title:'告诉我的好友们'},
                if(coinObj.shareAward >= 3)
                {
                    this.awardMC.visible = true;
	wx3_function(6197);
                    this.goBtn.visible = false
                    //this.diamondMC.visible = false;
                }
                else
                {
                    if(coinObj.shareNum > coinObj.shareAward)
                    {
                        this.goBtn.label = '领取'
                        this.canAward = true;
	wx3_function(1442);
                    }
                    else
                    {
                        this.goBtn.skinName = 'Btn2Skin'
                        this.goBtn.label = '前往'
                        this.goWork = true
                    }
                }
                this.adGroup.visible = true;
	wx3_function(6780);
                for(var i=0;i<4;i++)
                {
                    this['ad'+(i+1)].source = MyADManager.getInstance().adList[i] ? MyADManager.getInstance().adList[i].logo:''
                }

                this.bg.source = 'coin_bg1_jpg'
                this.titleText.text = '体验任意小程序30秒（'+coinObj.shareNum+'/3）'
                //this.diamondMC.visible = coinObj.shareAward < 3;
                this.addDiamond = 1
                this.addCoin = this.getCoin_9848(0.3);
	wx3_function(8444);
                break;
            //case 4: // {type:4,title:'邀请X位新的好友'},
            //    min = ObjectUtil.objLength(UM.friendNew),
            //        max = coinObj.newAward + 1
            //    if(min >= max)
            //    {
            //        this.goBtn.label = '领取'
            //        this.canAward = true;
            //    }
            //    else
            //    {
            //        this.goBtn.skinName = 'Btn2Skin'
            //        this.goBtn.label = '邀请'
            //        this.goWork = true
            //    }
            //    this.titleText.text = '邀请'+max+'位新的好友'
            //    this.addCoin = 500*max;
            //    break;
            case 5: // 观看广告
                if(coinObj.videoAwardNum >= 3)
                {
                    this.awardMC.visible = true;
                    this.goBtn.visible = false
                    //this.diamondMC.visible = false;
                }
                else
                {
                    if(coinObj.videoAwardNum < coinObj.videoNum)
                    {
                        this.goBtn.label = '领取'
                        this.canAward = true;
	wx3_function(3777);
                    }
                    else
                    {
                        this.goBtn.skinName = 'Btn2Skin'
                        this.goBtn.label = '观看广告'
                        this.goWork = true
                    }
                }
                this.bg.source = 'coin_bg2_jpg'
                this.titleText.text = '观看广告（'+coinObj.videoAwardNum+'/3）'
                //this.diamondMC.visible = coinObj.videoAwardNum < 3;
                this.addDiamond = 1
                this.addCoin = this.getCoin_9848(0.3);
	wx3_function(500);
                break;
            case 6: // 射击游戏
                if(coinObj.gameNum >= 3)
                {
                    this.awardMC.visible = true;
                    this.goBtn.visible = false
                }
                else
                {
                    this.goBtn.skinName = 'Btn2Skin'
                    this.goBtn.label = '开始游戏'
                    this.goWork = true
                }
                this.bg.source = 'coin_bg3_jpg'
                this.addDiamond = 1;
	wx3_function(7415);
                this.titleText.text = '炮击怪物（'+coinObj.gameNum+'/3）'
                break;
            case 99: // debug
                this.titleText.text = '临时加钱'
                this.addCoin = 1000;
                this.goBtn.label = '领取'
                this.canAward = true;
	wx3_function(9354);

                break;

        }

        if(this.addDiamond)
        {
             this.awardGroup.addChild(this.diamondGroup);
	wx3_function(5093);
        }
        else
        {
            MyTool.removeMC(this.diamondGroup);
        }

        if(min > max)
            min = max;
	wx3_function(3885);
        this.addCoinText.text = 'x' + NumberUtil.addNumSeparator(this.addCoin,2);
        if(this.data.type == 6)
        {
            this.addCoinText.text = '无上限';
        }
        //this.rateText.text = min+'/'+max;
        this.rateText.text = ''
        //if(this.data.type == 2 && coinObj.onLineAwardNum >= 5)
        //    this.rateText.text = '明天继续'
        //else if(this.data.type == 2 && coinObj.onLineAwardNum >= 5)
        //    this.rateText.text = '明天继续'
        //this.onTimer();
    }
	private wx3_functionX_12348(){console.log(5683)}

    //public onTimer(){
    //    if(this.data.type == 2)
    //    {
    //        var coinObj = UM.coinObj
    //        if(coinObj.onLineAwardNum >= 5)
    //            return;
    //
    //        var coinCD = UM.onLineAwardCD
    //        var nextAwardTime = coinObj.onLineAwardTime + coinCD[coinObj.onLineAwardNum];
    //        var min = TM.now() - coinObj.onLineAwardTime
    //        var max = nextAwardTime - coinObj.onLineAwardTime
    //        if(min >= max)
    //        {
    //            min = max;
    //            this.goBtn.label = '领取'
    //            this.goBtn.visible = true;
    //            this.canAward = true;
    //            this.rateText.text = ''
    //        }
    //        else
    //        {
    //            this.goBtn.visible = false;
    //            this.canAward = false;
    //            this.rateText.text = DateUtil.getStringBySecond(max - min);
    //        }
    //
    //    }
    //
    //}

    private getCoin_9848(lv){
        return Math.floor(Math.max(20000,UM_wx3.hourEarn)*lv)
    }

	private wx3_functionX_12349(){console.log(6480)}


}