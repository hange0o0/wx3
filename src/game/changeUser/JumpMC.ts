class JumpMC extends game.BaseItem{

    public static adList = []
    public static getAD(fun?){
        var wx = window['wx'];
        if(!wx)
            return;
        this.adList.length = 0;
        wx.wladGetAds(10,function (res) { //第⼀一个参数为获取⼴广告条数，第⼆二个参数为获取成功后回调⽅方法;
            JumpMC.adList = res.data;
            fun && fun();
        })
    }
	private wx3_functionX_12282(){console.log(3659)}

    //"appid": "wxec9471079f8b6c27",
    //"desc": “免费抽⼤大奖，免费领奖品，再奖⼀一个亿！",
    //"img": "https://wllm.oss-cn-beijing.aliyuncs.com/trackposter/wxec9471079f8b6c27/75428.jpg",
    //"logo": "https://wllm.oss-cn-beijing.aliyuncs.com/logoa/wxec9471079f8b6c27.png",
    //"name": "测试号1"


    private mc: eui.Image;
    private redMC: eui.Image;

	private wx3_functionX_12283(){console.log(9538)}
    public constructor() {
        super();
        this.skinName = "JumpMCSkin";
    }


	private wx3_functionX_12284(){console.log(9127)}
    public childrenCreated() {
        super.childrenCreated();
        this.visible = false;
        this.addBtnEvent(this,this.onClick_1758)
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.show,this);
    }
	private wx3_functionX_12285(){console.log(5454)}


    private onClick_1758(){
        this.redMC.visible = false;
        //ChangeUserUI.getInstance().show();
    }

	private wx3_functionX_12286(){console.log(2081)}
    public dataChanged():void {
        this.mc.source = this.data.logo;
        this.redMC.visible = true;
    }

    public show(){
        if(UM_wx3.isTest || JumpMC.adList.length == 0)
        {
            MyTool.removeMC(this);
	wx3_function(2491);
            return;
        }
        this.visible = true;
        this.data = ArrayUtil.randomOne(JumpMC.adList)
    }

	private wx3_functionX_12287(){console.log(6732)}

}