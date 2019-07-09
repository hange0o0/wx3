class PKManager_wx3 {
    //录像里也要调
    //public static TYPE_HANG = 1;
    //public static TYPE_SLAVE = 2;
    //public static TYPE_PVP_OFFLINE = 3;
    //public static TYPE_PVP_ONLINE = 4;
    //
    //
    //public static TYPE_FIGHT = 51;
    //public static TYPE_ANSWER = 52;
    //public static TYPE_RANDOM = 53;
    //public static TYPE_CHOOSECARD= 54;
    //public static TYPE_ENDLESS = 55;
    //
    //
    //
    //
    public static TYPE_TEST = 101;
    //public static TYPE_MAIN_HANG = 102; //挂机动画用

    private static instance:PKManager_wx3;
    public static getInstance() {
        if (!this.instance) this.instance = new PKManager_wx3();
        return this.instance;
    }
	private wx3_functionX_12469(){console.log(3585)}


    //public baseForce = 10000;
    //public cost1 = 0
    //public cost2 = 0;
    //public costChange = false

    //public pkResult = {}//所有PK结果的集合
    public levelData//关卡数据的集合
    public chapterData = []//关卡数据的集合
    public nickData = []//昵称
	private wx3_functionX_12470(){console.log(7360)}
    public headData = {}//昵称
    //public roundTotalData = {}//关卡数据的集合

    //private beginTime = 1550073600;//2019-2-14 0:0:0

    public isPKing = false;

    constructor(){
        //var todayData = SharedObjectManager.getInstance().getMyValue('today_data_1') || {};
        //if(todayData.key)
        //    this.levelData[todayData.key] = todayData.value
        //
        //var todayData = SharedObjectManager.getInstance().getMyValue('chapter_data_1') || {};
        //if(todayData.key)
        //    this.chapterData[todayData.key] = todayData.value
    }
	private wx3_functionX_12471(){console.log(3324)}

    public pkWord = ['投降，或者死亡','来战个痛快','小心你的背后','这招看你怎么躲','我要认真了','你就只会这几招吗','我要出大招了','我会赐予你死亡','你究竟想怎样...','我的魔法会撕碎你','我已饥渴难耐','你会记住我的名字的',
        '品尝我的愤怒吧','你死期将至！','我要粉碎你！','你是我的猎物','尝尝我的厉害吧', '你会后悔对上我的' ,'希望你能多坚持一会吧','不要输得太难看哦','对面上来的是什么啊','我允许你认输','唯有一战了','胜利属于我们的',
        '我们来做个了结吧','你的身体有破绽','你空门大开啊','尝尝这个吧','接下...\n这一招吧','用这招....\n来决胜负吧', '马上将你解决掉', '就用你的死来结束吧','别罗嗦了...来吧','来啊!\n互相相害啊','求一败','抬走，下一个',
        '来个强点的','对面没人了吗','来让我战个痛快吧','哈哈哈','我的目标是要3杀','胜利是属于我的','你睡着了吗','你分心了','别小看我!','游戏结束了','满足了吗','到现在才来求饶吗',
        '浪费时间!!','想逃吗!真无聊!','你可别小看我啊!','你还未够资格','别惹我....!','任务保证完成','赢的人，\n是我','你太脆弱了','哦，是的！\n我要胜利了','抱歉','打得不错','发生这种事我很抱歉','对此我很抱歉','你敢盯着我看',
        '对面太弱了','威武','有希望了','想输都难','距离胜利又近一步了','看来我不用再出手了','燃烧吧！\n小宇宙！','我会让你后悔来到世上','严肃点，\n这是比赛','啦啦啦啦~',
        '我的魔法会撕碎你','我已饥渴难耐','你会记住我的名字的','祈祷别对上我吧','我的怒火\n会毁灭一切','噢，亲爱的\n要坚持住','你死定了','你们这是自寻死路','品尝我的愤怒吧','你死期将至！','我要粉碎你！','你是我的猎物','你对力量一无所知',
        '这就是王者之气啊','刚才你们说什么来着','看到我们有多强了吧','等会去哪庆功好呢','留几个给我杀啊','放轻点，别把对面吓跑了','蠢材！','让我来干掉你....',
        '我要打呵欠了','让我好好抱抱你！','我准备好了','我已经等不及了','→_→','@_@','( ¯ □ ¯ )','（╯＾╰）','>_<','(╯▔▽▔)╯','(╬▔皿▔)凸', '到此为止了','别烦我!','还没有结束的～', '有点本事啊', '我绝不认输',
        '我只是变的更坚强了','我和你没完','不胜利毋宁死','死亡，没什么好怕的','为胜利献身','哈哈!','呀！！！','过来好好打一架','胆小鬼','品尝我的愤怒吧','这是个秘密','训练又开始了！','你不能通过这里','清算时间','嘿！伙计！','加入战斗',
        '勇敢战斗','准备作战','来吧','接受挑战','接..招','目标已经标记出来了','我渴望胜利','是时候了！','是时候流点血了','你要让谁流血','啊，感觉真棒','你要我干啥？','杀啊！','休想逃走','尝尝我的利刃','给我个任务吧','接受任务',
        '尝尝厉害吧，笨猪','狗崽子！！！','使劲打用力抽','我的眼睛洞察一切','愿祖先保佑你','放马过来','瞄准你啦','向前推进','你是谁！','痛苦降临','我预见了你的末日','不从者。。死','轮到你，流血啦','你马上就会人间蒸发','你死定了',
        '你死期将至','无人能够阻拦我','没人可以通过','不留活口','为了荣耀','时间不多了，我们上吧','全体注意','下一个，轮到谁啦','冲锋陷阵','额，付出代价','把这个敌人留给我','我们该干什么','撕碎，扯烂','我们来干什么','要我攻击哪里？',
        '我来给他点颜色瞧瞧','好疼啊','活着就要战斗','要打架了','所有人，都过来','死亡没什么好怕的','我，会让你安息','我可没时间陪你玩','死亡之神在召唤','待宰羔羊！','医生，我流血了','啊！医生！','我闻到血的味道','是吗？那就去死吧！',
        '祝你好运！','赐予我力量！','你们这是自寻死路！','我快没有时间了！','哈，那家伙死定了！','你想玩个游戏吗','灵魂，躁动不安','恐惧，如影随形','不可饶恕','都是你的错','恐惧吧，哀嚎吧','放纵你内心的恐惧吧','死期将至','戳死你！','残酷的命运',
        '$%&*&$@','@#$%&','( T___T ) ','( 3__3 ) ','zzz ZZZ','╭∩╮','...']
    public costWord = ['老铁666','感谢老铁的支持','非常感谢','老铁真土豪','谢谢！','我们不会让你失望的','明智的选择','圈粉了','谢谢同志们','欢呼','高兴','万分感谢','太高兴了','无法用言语表达的感谢',
        '果然是真爱','感谢大哥','要理性消费哦','关注走一波啊','关注可抽奖','输了会发红包的','实锤土壕','感谢感谢','鞠躬感谢','谢谢老铁','谢谢大哥','这波不亏','疯狂打call','你们都是老板','老板大气',
        '谢谢老板','666','礼物走一走','谢谢你的礼物','老板长命百岁','老板万寿无疆','老板千秋万代','祝老板发财','出门遇贵人了','老板我爱你','老板我要和你生小孩','老板公司还缺人吗','￥￥￥￥￥','$$$$$',
    '老板一统江湖','老板好眼光','比心','老板真土豪','老板真豪气','双击关注666']
	private wx3_functionX_12472(){console.log(7769)}

    public chapterWord = ['点击可以上下怪','已上阵怪物可拖动换位','要注意怪物间属性相克','长按头像可查看详情','要善用怪物技能','低费怪物也有春天','加入低费怪物调整节奏','战力是影响胜负的关键',
        '费用越大，强度越大','冲破出生点也能获胜','属性相克影响极大','熟悉怪物才能更易取胜']


    //public testWord = ['冲啊','天下近在眼前','过了这里，天下是我的','冲出这里，争霸天下','这里是困不住我的','我要争霸天下','我要出去','离开这里','这只是一次历练','越跑越快',
    //    '为了争霸天下的理想','在前进中收集伙伴','前面有我的伙伴','我的伙伴在前面等我','伙伴们，我来了','壮大我的实力','前去招兵买马','我不会是一个怪']

    //public roundData;
    private wx3_fun_asdfasdfasdf_3754(){}
    private wx3_fun_ast34_6545(){}
	private wx3_functionX_12473(){console.log(7136)}

    public randomNick(){
        var name = ArrayUtil.randomOne(this.nickData);
        name = name.replace('\n','')
        name = name.replace('\r','')
        return Base64.decode(name);
    }
	private wx3_functionX_12474(){console.log(3619)}

    public randomHead(){
        var head = Math.ceil(Math.random()*1189);
        var useHead = SharedObjectManager_wx3.getInstance().getValue('useHead') || [];
        while(useHead.indexOf(head) != -1)
        {
            head = Math.ceil(Math.random()*1189);
	wx3_function(7539);
        }
        useHead.unshift(head);
        if(useHead.length > 300)
            useHead.length = 300;
        SharedObjectManager_wx3.getInstance().setValue('useHead',useHead);
        return head
    }
	private wx3_functionX_12475(){console.log(2306)}
    public setHead(img,head){
        if(this.headData[head])
        {
            img.source = this.headData[head];
            return;
        }
        var wx = window['wx'];
	wx3_function(7272);
        if(!wx)
        {
            img.source = 'common_head_bg_jpg'
            return
        }
        var self = this;
	wx3_function(9928);
        img.source = 'common_head_bg_jpg'
        wx.cloud.downloadFile({
            //fileID: 'cloud://hange0o0-2-57ae87.6861-hange0o0-2-57ae87/level/level_'+head+'.txt',
            fileID: 'cloud://server1-3f4fd3.7365-server1-3f4fd3/head/'+head+'.jpg',
            success: res => {
                console.log(res);
                img.source = res.tempFilePath;
	wx3_function(8757);
                self.headData[head] = res.tempFilePath;
            },
            fail: err => {
                console.log(err)
            }
        })
    }
	private wx3_functionX_12476(){console.log(2222)}

    public getRobotList(lv){
        return ArrayUtil.randomOne(this.levelData[lv])
    }


	private wx3_functionX_12477(){console.log(7798)}

    public getPKBG(seed){
        var mapNum = 7
        var index = Math.ceil(this.random(seed)*mapNum)
        return 'map'+index+'_jpg'
    }
	private wx3_functionX_12478(){console.log(7469)}

    public getWorkBG(index){
        //var mapNum = 7
        //index = index%mapNum || mapNum;
        return 'map'+6+'_jpg'
    }

    private getDefBGID_9663(lv?){
        if(!lv)
            lv = TecManager.getInstance().getTecLevel(11)
        var arr = [3,4,5,2,1,7]
        return arr[lv % arr.length];
    }
	private wx3_functionX_12479(){console.log(1765)}
    public getDefBG(lv?){
        return 'map'+this.getDefBGID_9663(lv)+'_jpg'
    }
    public getDefBGFront(lv?){
        return 'map'+this.getDefBGID_9663(lv)+'__png'
    }
	private wx3_functionX_12480(){console.log(9232)}

    //public getLastAtkList(){
    //    return '';
    //}

    //public initData(){
    //     this.loadChapter();
    //
    //}

    public loadChapter(){
        //var url = 'resource/game_data/chapter.txt';
        //var loader: egret.URLLoader = new egret.URLLoader();
        //loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //loader.once(egret.Event.COMPLETE,()=>{
        //    loader.data = loader.data.replace(/\r/g,'');
        //    this.chapterData = loader.data.split('\n')
        //    for(var i=0;i<this.chapterData.length;i++)
        //    {
        //        this.chapterData[i] = {
        //            id:i+1,
        //            list1:this.chapterData[i]
        //        }
        //    }
        //},this);
        //loader.load(new egret.URLRequest(url));

        var data = RES.getRes('chapter_txt').replace(/\r/g,'');
	wx3_function(8745);
        this.chapterData = data.split('\n')
        for(var i=0;i<this.chapterData.length;i++)
        {
            this.chapterData[i] = {
                id:i+1,
                list1:this.chapterData[i]
            }
        }
    }
	private wx3_functionX_12481(){console.log(3975)}

    public loadNick(){
        //var url = 'resource/game_data/nick.txt';
        //var loader: egret.URLLoader = new egret.URLLoader();
        //loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //loader.once(egret.Event.COMPLETE,()=>{
        //    loader.data = loader.data.replace(/\r/g,'');
        //    this.nickData = loader.data.split('\n')
        //},this);
        //loader.load(new egret.URLRequest(url));

        var data = RES.getRes('nick_txt').replace(/\r/g,'');
        this.nickData = data.split('\n')
    }
	private wx3_functionX_12482(){console.log(3077)}

    public loadLevel(){
        this.levelData = {};
        for(var i=1;i<=20;i++)
        {
            this._loadLevel_5076(i);
	wx3_function(2975);
        }
    }
    private _loadLevel_5076(lv){
        //var url = 'resource/game_data/level'+lv+'.txt';
        //var loader: egret.URLLoader = new egret.URLLoader();
        //loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //loader.once(egret.Event.COMPLETE,()=>{
        //    loader.data = loader.data.replace(/\r/g,'');
        //    var temp = loader.data.split('\n')
        //    while(!temp[temp.length-1])//去掉后面的空数据
        //    {
        //        temp.pop();
        //    }
        //    this.levelData[lv] = temp
        //},this);
        //loader.load(new egret.URLRequest(url));

        var data = RES.getRes('level'+lv+'_txt').replace(/\r/g,'');
        var temp = data.split('\n')
        while(!temp[temp.length-1])//去掉后面的空数据
        {
            temp.pop();
	wx3_function(4350);
        }
        this.levelData[lv] = temp
    }



	private wx3_functionX_12483(){console.log(2910)}
    public randomSeed;
    public random(seedIn?){
        var seed = seedIn || this.randomSeed;
        seed = ( seed * 9301 + 49297 ) % 233280;
        var rd = seed / ( 233280.0 );
        if(!seedIn)
            this.randomSeed = rd * 100000000;
	wx3_function(1524);
        return rd;
    }


    //取PK结果
    public getPKResult(data){
        PKData_wx3.instanceIndex = 2;
	wx3_function(8475);
        var PD = PKData_wx3.getInstance();
        PD.init({
            seed:data.seed,
            players:[
                {id:1,gameid:'team1',team:1,force:data.force1,hp:1,autolist:data.list1,mforce:data.mforce1,atkBuff:data.atkBuff1,hpBuff:data.hpBuff1},
                {id:2,gameid:'team2',team:2,force:data.force2,hp:1,autolist:data.list2,mforce:data.mforce2,atkBuff:data.atkBuff2,hpBuff:data.hpBuff2}
            ]
        });
	wx3_function(2757);
        PD.quick = true;
        PD.start();
        PKCode_wx3.getInstance().onStep()
        //this.pkResult[data.key] = PD.getPKResult();
        var result = PD.getPKResult();
        PKData_wx3.instanceIndex = 1;
        return result;
    }
	private wx3_functionX_12484(){console.log(4106)}

}