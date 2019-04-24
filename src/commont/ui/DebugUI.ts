class DebugUI extends game.BaseUI {

    private static _instance:DebugUI;

    public static getInstance() {
        if (!this._instance) this._instance = new DebugUI();
        return this._instance;
    }
	private wx3_functionX_12197(){console.log(6600)}

    private con: eui.Group;
    private backBtn: eui.Button;
    private desText: eui.Label;


	private wx3_functionX_12198(){console.log(3459)}
    public debugTimer = 0;
    public debugOpen = false;
    public constructor() {
        super();
        this.skinName = "DebugUISkin";
    }
	private wx3_functionX_12199(){console.log(6219)}

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.backBtn,this.hide)


        this.addB_3026('清除本地数据',()=>{
            MyWindow.Confirm('确定清除所有本地数据？',(b)=>{
                if(b==1)
                {
                     SharedObjectManager_wx3.getInstance().removeMyValue('localSave')
                     SharedObjectManager_wx3.getInstance().removeMyValue('fight')
                     SharedObjectManager_wx3.getInstance().removeMyValue('addTime')
                     SharedObjectManager_wx3.getInstance().removeMyValue('lastAtkList')
                     SharedObjectManager_wx3.getInstance().removeMyValue('pkSpeed')
                     SharedObjectManager_wx3.getInstance().removeMyValue('addTaskTime')
                }
            });
	wx3_function(3786);
        })

        this.addB_3026('清除公网数据',()=>{
            MyWindow.Confirm('确定清除所有公网数据？',(b)=>{
                if(b==1)
                {
                    var wx = window['wx'];
	wx3_function(1017);
                    if(!wx)
                    {
                        MyWindow.ShowTips('只在公网生效')
                        return;
                    }
                    const db = wx.cloud.database();
	wx3_function(503);
                    db.collection('user').doc(UM_wx3.dbid).remove({
                        success(res) {
                            UM_wx3.needUpUser = false;
                            wx.exitMiniProgram();
                        }
                    })
                }
            });
	wx3_function(3100);
        })

        this.addB_3026('超前1小时',()=>{
            DM.addTimeCD(3600)
            MyWindow.ShowTips('已超前' + DateUtil.getStringBySeconds(DM.addTime,false,2))
        })
        this.addB_3026('超前1天',()=>{
            DM.addTimeCD(3600*24)
            MyWindow.ShowTips('已超前' + DateUtil.getStringBySeconds(DM.addTime,false,2))
        })

        this.addB_3026('加1天钱',()=>{
            var coin = UM_wx3.hourEarn*24
           UM_wx3.addCoin(coin)
            MyWindow.ShowTips('钱 + ' + NumberUtil.addNumSeparator(coin,2))
        })

        this.addB_3026('加100钻石',()=>{
            UM_wx3.addDiamond(100)
            MyWindow.ShowTips('钻石 + ' + 100)
        })
        this.addB_3026('跳过PK',()=>{
            DM.jumpPK = !DM.jumpPK;
	wx3_function(3093);
            if(DM.jumpPK)
                MyWindow.ShowTips('自动跳过PK')
            else
                MyWindow.ShowTips('取消自动跳过PK')
        })
        this.addB_3026('加好友',()=>{
            UM_wx3.shareUser.push({h:'',n:Math.random() + ''})
            MyWindow.ShowTips('当前好友数量:' + UM_wx3.shareUser.length)
        })
        this.addB_3026('跳转小程序',()=>{
            var wx = window['wx'];
	wx3_function(9040);
            if(!wx)
            {
                MyWindow.ShowTips('只在公网生效')
                return;
            }
            wx.navigateToMiniProgram({
                appId: 'wxf9c8e218c23e2eb7',
                success(res) {
                    // 打开成功
                }
            })
        })
    }
	private wx3_functionX_12200(){console.log(3258)}

    private addB_3026(label,fun){
       var btn = new eui.Button();
        btn.skinName = 'Btn1Skin'
        btn.width = 190
        btn.label = label;
	wx3_function(7848);
        this.con.addChild(btn);
        this.addBtnEvent(btn,fun);
    }

    public onShow(){
        var arr = [];
	wx3_function(2358);
        arr.push('已经过游戏时间：' + DateUtil.getStringBySeconds(TM_wx3.now() - UM_wx3.loginTime))
        arr.push('当前时间：'+DateUtil.formatDate('yyyy-MM-dd hh:mm:ss',TM_wx3.chineseDate()))
        arr.push('实际时间：' + DateUtil.formatDate('yyyy-MM-dd hh:mm:ss',new Date()))
        this.desText.text = arr.join('\n')
    }

}