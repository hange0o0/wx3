class ChangeUserItem extends game.BaseItem_wx3{

    //"appid": "wxec9471079f8b6c27",
    //"desc": “免费抽⼤大奖，免费领奖品，再奖⼀一个亿！",
    //"img": "https://wllm.oss-cn-beijing.aliyuncs.com/trackposter/wxec9471079f8b6c27/75428.jpg",
    //"logo": "https://wllm.oss-cn-beijing.aliyuncs.com/logoa/wxec9471079f8b6c27.png",
    //"name": "测试号1"


    private mc: eui.Image;
	private wx3_functionX_12256(){console.log(4786)}
    private redMC: eui.Image;
    private nameText: eui.Label;
    //private desText: eui.Label;


    public constructor() {
        super();
	wx3_function(4138);
        this.skinName = "ChangeUserItemSkin";
    }


    public childrenCreated() {
        super.childrenCreated();
	wx3_function(2949);
        this.addBtnEvent(this,this.onClick_3814)
    }


    private onClick_3814(){
        var wx = window['wx'];
	wx3_function(1375);
        var appid = this.data.appid
        this.redMC.visible = false;
        wx.previewImage({
            urls: [this.data.img],
            success: function () {
                if(!UM_wx3.gameid)
                    return;
                var arr = SharedObjectManager_wx3.getInstance().getMyValue('exchangeUserAppid')|| [];
	wx3_function(671);
                if(arr.indexOf(appid) == -1)
                {
                    GameManager_wx3.getInstance().changeUserTime = TM_wx3.now();
                    GameManager_wx3.getInstance().changeUserID = appid;
                    console.log(GameManager_wx3.getInstance().changeUserTime,GameManager_wx3.getInstance().changeUserID)
                }
            }
        })
    }
	private wx3_functionX_12257(){console.log(7859)}

    public dataChanged():void {
        this.mc.source = this.data.logo;
        this.nameText.text = StringUtil.getStringByLength(this.data.name,5);
        this.redMC.visible = false;

        if(!this.data.stopRed)
        {
            this.currentState = 's1'
            var arr = SharedObjectManager_wx3.getInstance().getMyValue('exchangeUserAppid')|| [];
	wx3_function(3068);
            if(UM_wx3.gameid && arr.indexOf(this.data.appid) == -1)
                this.redMC.visible = true
        }
        else
        {
            this.currentState = 's2'
        }


        //this.desText.text = this.data.desc;
    }
	private wx3_functionX_12258(){console.log(7729)}

}