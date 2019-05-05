class ChangeUserUI extends game.BaseItem_wx3 {



    private list: eui.List;
	private wx3_functionX_12259(){console.log(4689)}
    private dataProvider:eui.ArrayCollection
    public stopRed = false;

    public constructor() {
        super();
        this.skinName = "ChangeUserUISkin";
	wx3_function(8354);
    }

    public static adList = []
    private static lastGetADTime = 0;
    public static getAD(num=10,fun?){
        var wx = window['wx'];
        //console.log(333333)
        if(!wx) {
            var oo = {
                "appid": "",
                "desc": '',
                "img": "",
                "logo": "",
                "name": "sdfsadfsdf"
            }
            this.adList = [oo,oo,oo,oo,oo,oo,oo,oo,oo,oo]
            fun && fun();
            //MyTool.removeMC(this);
            return;
        }
        if(this.lastGetADTime)
        //if(TM.now() - this.lastGetADTime < 10*60)
        {
            fun && fun();
            return;
        }
        this.adList.length = 0;
        wx.wladGetAds(num,function (res) { //第⼀一个参数为获取⼴广告条数，第⼆二个参数为获取成功后回调⽅方法;
            //console.log(res);
            ChangeUserUI.lastGetADTime = TM_wx3.now();
            ChangeUserUI.adList = res.data;
            fun && fun();
        })
    }
	private wx3_functionX_12260(){console.log(1433)}

    public childrenCreated() {
        super.childrenCreated();
        this.list.itemRenderer = ChangeUserItem
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();
    }
	private wx3_functionX_12261(){console.log(7016)}

    private isSet = false;
    public dataChanged(){
        if(this.isSet)
            return;
        ChangeUserUI.getAD(10,()=>{
            this.renew();
	wx3_function(7635);
        });
    }

    public renew(){
        this.isSet = true;
        if(ChangeUserUI.adList.length == 0)
        {
            MyTool.removeMC(this);
	wx3_function(1906);
            return;
        }

        for(var i=0;i<ChangeUserUI.adList.length;i++)
        {
            ChangeUserUI.adList[i].stopRed = this.stopRed
        }
        this.dataProvider.source = ChangeUserUI.adList;
	wx3_function(2359);
        this.dataProvider.refresh();
    }
}