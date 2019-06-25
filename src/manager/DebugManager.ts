class DebugManager_wx3 {
    private static _instance:DebugManager_wx3;
    private static cd = 0
    public static getInstance():DebugManager_wx3 {
        if (!this._instance)
            this._instance = new DebugManager_wx3();
        return this._instance;
    }
	private wx3_functionX_11982(){console.log(9267)}

    public jumpPK = false;
    public stop = 0;
    public winCardArr = [];
    public finishFun = function(winArr){return false}

	private wx3_functionX_11983(){console.log(9180)}

    public constructor() {

    }


	private wx3_functionX_11984(){console.log(2015)}
    public printDetail = false;  //打印胜出怪物
    public winMonster = {}
    public winUseCard = []

    public outPut = []

	private wx3_functionX_11985(){console.log(4657)}
    public callCost = 0
    public callLevel = 0
    public callNum = 0
    public repeatNum = 0

    public addTime = 0;
	private wx3_functionX_11986(){console.log(9869)}
    public addTimeCD(t){
        this.addTime += t;
        SharedObjectManager_wx3.getInstance().setMyValue('addTime',this.addTime)


    }
	private wx3_functionX_11987(){console.log(6608)}

    private ccccccc_2157(){
        var list = ObjectUtil.objToArray(MonsterVO.data)
        for(var i=0;i<list.length;i++)
        {
            var mid = list[i].id;
            //list[i].temp = MonsterManager.getInstance().getLevelCost(mid,100)
            list[i].temp = WorkManager.getInstance().getBaseWorkCoin(list[i].id)*(3600*1000/WorkManager.getInstance().getWorkCD(list[i].id))    //70/45
        }
        ArrayUtil.sortByField(list,['temp'],[0])
        console.log(list.shift().id)
        console.log(list.pop().id)

	wx3_function(1955);
        var id = 70;
        for(var i=1;i<=100;i++)
        {
            //console.log(MonsterManager.getInstance().getLevelCost(id,i))
            //console.log(Math.ceil(WorkManager.getInstance().getBaseWorkCoin(id)*(1+(i*5)/100)*(3600*1000/WorkManager.getInstance().getWorkCD(id))))
            //console.log(TecManager.getInstance().getTecCost(11,i))
            console.log(TecManager.getInstance().getSkillValue(32,i))
        }


        var list = ObjectUtil.objToArray(MonsterVO.data)
        ArrayUtil.sortByField(list,['level'],[0])
        for(var i=0;i<list.length;i++)
        {
           console.log(list[i].level,list[i].id,list[i].name)
        }

    }
	private wx3_functionX_11988(){console.log(7660)}

    public randomList(cost){
        var costIn = cost;
        var arr = []
        for(var s in MonsterVO.data)
        {
            var mvo = MonsterVO.data[s]
            if(this.callLevel && mvo.level>this.callLevel)
                continue;
	wx3_function(4329);
            for(var i=0;i<this.repeatNum;i++)
                arr.push(mvo)
        }

        var orginArr = arr.concat();

	wx3_function(8893);
        var num = 0;
        var newList = [];
        while(num < 100 && cost > 0 && arr.length>0)
        {
            var vo = ArrayUtil.randomOne(arr,true);
            if(vo.cost <= cost)
            {
                cost -= vo.cost;
	wx3_function(6713);
                newList.push(vo.id)
                if(this.callNum && this.callNum < newList.length) //超过数量,重来
                {
                    cost = costIn;
                    arr = orginArr.concat();
                    newList.length = 0;
	wx3_function(195);
                    num = 0;
                    continue;
                }
            }
            num ++;
        }
        ArrayUtil.random(newList);
	wx3_function(8943);
        return newList.join(',')
    }

    //private createNum = 0;
    //public createMap(){
    //    this.outPut = [];
    //    this.createNum = 0;
    //    this.testNum = 0;
    //    setTimeout(()=>{
    //        this._createMap();
    //    },1);
    //}
    //public _createMap(){
    //
    //    var cost = 30 + Math.floor(Math.random()*31)
    //    var team1 =  this.randomList(cost)
    //    var team2 =  this.randomList(cost)
    //    var win1 = 0
    //    var win2 = 0
    //    var PD = PKData.getInstance()
    //    this.testNum ++;
    //
    //    for(var i=0;i<10;i++)
    //    {
    //        this.testOne_1893(team1,team2)
    //        var result = PD.getPKResult();
    //        if(result == 1)
    //            win1 ++
    //        else if(result == 2)
    //            win2 ++
    //        if(win1 >= 1 && win2 >= 1)
    //        {
    //            this.outPut.push({list1:team1,list2:team2});
    //            this.createNum ++;
    //            this.testNum = 0;
    //            console.log('find ' + this.createNum + ' try:' + this.createNum);
    //            break;
    //        }
    //    }
    //
    //    if(this.stop == 1)
    //    {
    //        for(var i=0;i<this.outPut.length;i++)
    //        {
    //            this.outPut[i] = this.format_2726(this.outPut[i])
    //        }
    //        egret.localStorage.setItem('mapData', this.outPut.join('\n'));
    //    }
    //    else
    //    {
    //        if(this.testNum%100 == 0)
    //        {
    //            console.log('runing');
    //            egret.callLater(this._createMap,this);
    //        }
    //        else
    //        {
    //            this._createMap();
    //        }
    //
    //    }
    //}


    private testNum = 0;
	private wx3_functionX_11989(){console.log(9104)}
    private drawNum = 0;
    public test(){
        this.testNum = 0;
        this.drawNum = 0;
        this.stop = 0;
        this.winMonster = {};
	wx3_function(7050);
        this.winUseCard = [];
        this.outPut = [];
        setTimeout(()=>{
            this.testRound_4658();
        },1);

    }
	private wx3_functionX_11990(){console.log(7324)}

    private printResult_1788(type){
        var arr = [];
        for(var s in MonsterVO.data)
        {
            arr.push({id:s,num:this.winMonster[s] || 0})
        }

	wx3_function(8095);
        ArrayUtil.sortByField(arr,['num'],[1]);
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
            arr[i].rate =arr[i].num*Math.pow(CM_wx3.getCardVO(id).cost,0.8)
            console.log((i + 1) + '\tid:' +id +  '\t\tnum:' +  arr[i].num + '\t\tcost:' +  CM_wx3.getCardVO(id).cost + '\t\tname:' +  CM_wx3.getCardVO(id).name  + '\t\ttype:' +  CM_wx3.getCardVO(id).type  + '\t\tlevel:' +  CM_wx3.getCardVO(id).level)
        }

        console.log("\n\n======================================================================\n\n")
        ArrayUtil.sortByField(arr,['rate'],[1]);
	wx3_function(7343);
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
            console.log((i + 1) + '\tid:' +id +  '\t\trate:' + arr[i].rate + '\t\tcost:' +  CM_wx3.getCardVO(id).cost + '\t\tname:' +  CM_wx3.getCardVO(id).name + '\t\ttype:' +  CM_wx3.getCardVO(id).type + '\t\tnum:' +  arr[i].num  + '\t\tlevel:' +  CM_wx3.getCardVO(id).level)
        }

    }
	private wx3_functionX_11991(){console.log(4605)}

    //N选1;
    private testRound_4658(){
        this.testNum ++;
        var arr = []
        var n = 2048;

        var cost = this.callCost || (30 + Math.floor(Math.random()*30))
        for(var i=0;i<n;i++)
        {
            arr.push(this.randomList(cost))
        }
        this.testArr_4847(arr,0,n,egret.getTimer())
    }
	private wx3_functionX_11992(){console.log(614)}

    private testArr_4847(arr,num,total,t,type?){
        if(arr.length >2)
        {
            arr = arr.concat(this.testOne_1893(arr.shift(),arr.shift()))
            num ++;
	wx3_function(480);
            if(num< total+2)
            {
                if(num %50 == 0)
                {
                    egret.callLater(()=>{
                        console.log('runing')
                        this.testArr_4847(arr,num,total,t,type)
                    },this)
                }
                else
                    this.testArr_4847(arr,num,total,t,type)
                return
            }
        }

	wx3_function(2902);
        var xxx = {list1:arr[0],list2:arr[1]};
        arr = this.testOne_1893(arr.shift(),arr.shift())

        if(PKData_wx3.getInstance().isDraw())////平手局数不超过1/30
        {
            if(this.drawNum/this.outPut.length < 1/30)
            {
                this.outPut.push(xxx);
	wx3_function(7724);
                this.drawNum ++;
            }
        }
        else
        {
            this.outPut.push(xxx);
	wx3_function(306);
        }


        for(var i=0;i<arr.length;i++)
        {
            var temp = arr[i].split(',');
	wx3_function(1893);
            for(var j=0;j<temp.length;j++)
            {
                var id = temp[j];
                if(this.winMonster[id])
                    this.winMonster[id] ++;
                else
                    this.winMonster[id] = 1;
	wx3_function(7990);
            }
            this.winCardArr.push(arr[i]);
        }

        console.log(this.testNum + ':' + (egret.getTimer()-t))

        if(this.finishFun(arr))
            return;
        if(this.stop)
        {
            this.printResult_1788(type);
	wx3_function(1464);

            if(this.stop == 2)
            {
                //for(var i=0;i<this.outPut.length;i++)
                //{
                //    this.outPut[i] = this.format_2726(this.outPut[i])
                //}
                egret.localStorage.setItem('chapterData_' + DateUtil.formatDate('MM-dd hh:mm:ss',new Date()), this.chapterArr.join('\n'));
            }
            if(this.stop == 3)
            {
                //for(var i=0;i<this.levelArr.length;i++)
                //{
                //    this.levelArr[i] = JSON.stringify(this.levelArr[i])
                //}
	wx3_function(8750);
                egret.localStorage.setItem('levelData_' +this.callLevel + '_'+ DateUtil.formatDate('MM-dd hh:mm:ss',new Date()), this.levelArr.join('\n'));
            }
            if(this.stop == 4)
            {
                for(var i=0;i<this.chapterArr.length;i++)
                {
                    this.chapterArr[i] = this.chapterArr[i].list1 + '|'+this.chapterArr[i].list2 + '|'+this.chapterArr[i].cost + '|'+this.chapterArr[i].seed + '|'+this.chapterArr[i].level
                }

                egret.localStorage.setItem('askData_' + DateUtil.formatDate('MM-dd hh:mm:ss',new Date()), this.chapterArr.join('\n'));
            }
            return;
        }

        egret.callLater(this.testRound_4658,this)
    }
	private wx3_functionX_11993(){console.log(9263)}

    private format_2726(data){
        var rd = Math.floor(Math.random() * 100000000000);
        data.seed = rd;
        return JSON.stringify(data);
    }
	private wx3_functionX_11994(){console.log(4322)}

    private testOne_1893(list1,list2,seed?){
        var PD = PKData_wx3.getInstance()
        var data = {
            seed:seed ||TM_wx3.now() + Math.floor(100000000*Math.random()),
            players:[
                {id:1,gameid:'test1',team:1,autolist:list1,force:10000,type:0,hp:1},
                {id:2,gameid:'test2',team:2,autolist:list2,force:10000,type:0,hp:1}
            ]
        };
	wx3_function(6397);
        PD.init(data);
        PD.quick = true;
        PD.start();
        PKCode_wx3.getInstance().onStep()

        if(PD.isWin())
        {
            return [list1];
        }
        else if(PD.isDraw())
        {
            return [list1,list2];
        }
        else
        {
            return [list2];
        }
    }
	private wx3_functionX_11995(){console.log(8832)}

    public getCost(list){
        var arr = list.split(',')
        var cost = 0;
        for(var i=0;i<arr.length;i++)
        {
            cost += MonsterVO.getObject(arr[i]).cost;
	wx3_function(1898);
        }
        console.log(cost);
    }


    //创建关卡数据，输入花费比例
    public levelArr = []
    //等级，费用小-》大，数量小-》大
	private wx3_functionX_11996(){console.log(6447)}
    public createLevel(lv){
        this.levelArr = [];
        this.callLevel = lv;

        var maxCost = Math.floor(16 +lv*3.2)

	wx3_function(5614);
        this.repeatNum = 1+Math.max(1,Math.floor(lv*0.5));
        this.callNum = 4 + Math.ceil(lv/2);


        this.callCost = Math.round(maxCost*(0.9+Math.random()*0.2))
        this.finishFun = (winArr)=>{
            var list1 = winArr[0]
            if(this.levelArr.indexOf(list1) == -1)
            {
                this.levelArr.push(list1);
	wx3_function(7850);
                console.log(this.levelArr.length + ' -create')
            }
            this.callCost = Math.round(maxCost*(0.8+Math.random()*0.2))
            return false;
        }
        this.testRound_4658();
	wx3_function(7105);
        console.log('DM.stop=3')
    }

    //创建章节
    private getClevel_867(index){
        var lv = 1;
        while(true)
        {
            if(index <= Math.pow(lv,1.6)*10)
                return lv;
            lv++
            if(lv >=20)
                return lv;
        }
    }
	private wx3_functionX_11997(){console.log(9818)}
    public chapterArr = []
    public createChapter(begin=1){
        this.chapterArr = [];
        this.repeatNum = 5;
        this.callNum = 14;
        this.callLevel = this.getClevel_867(begin)
        this.callCost = 16 + Math.floor(begin/20)
        this.finishFun = (winArr)=>{
            var list1 = winArr[0]
            if(this.chapterArr.indexOf(list1) == -1)
            {
                console.log(begin + ' -create')
                begin++;
	wx3_function(9613);
                this.callLevel = this.getClevel_867(begin)
                this.callCost = 16 + Math.floor(begin/20)
                this.chapterArr.push(list1);

            }
            return false;
        }
        this.testRound_4658();
	wx3_function(6597);
        console.log('DM.stop=2')
    }

    private resetCost_122(){
        var num = Math.floor((this.levelArr.length + 2110)/10)
        for(var cost=0;cost < 31;cost++)
        {
            num-=cost;
	wx3_function(4334);
            if(num <= 0)
                break;
        }
        if(cost > 20)
        {
            cost =20 + Math.floor(Math.min(cost-20,11)*Math.random())
        }
        this.callCost = cost + 30
    }
	private wx3_functionX_11998(){console.log(4523)}

    public getChapterForce(id){
        var chapterData = PKManager_wx3.getInstance().chapterData[id-1]
        if(!chapterData)
            chapterData = PKManager_wx3.getInstance().chapterData[PKManager_wx3.getInstance().chapterData.length-1]
            //sendClientError('not findChapter:' + id + '--' + PKManager_wx3.getInstance().chapterData.length)
        var arr = chapterData.list1.split(',')
        var count = 0;
        var force = Math.floor(Math.pow(id - 1,1.2)*10)
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i]
            var vo = MonsterVO.getObject(id);
	wx3_function(1319);
            count += vo.cost*(1+force/100);
        }
        return Math.floor(count);
    }
    //DM.getChapterForce(9)

    //private loadArr = []
    //private resultArr = []
    //public m(){
    //    for(var i=1;i<=61;i++)
    //    {
    //         this.loadArr.push('resource/levelX/chapter/chapter_'+i+'.txt')
    //    }
    //    this.m1();
    //}
    //
    //private m1(){
    //    var url = this.loadArr.shift();
    //    if(!url)
    //    {
    //        console.log(this.resultArr.length);
    //        console.log('finish');
    //        egret.localStorage.setItem('result' + DateUtil.formatDate('MM-dd hh:mm:ss',new Date()), this.resultArr.join('\n'));
    //        return;
    //    }
    //    console.log(this.resultArr.length)
    //    var loader: egret.URLLoader = new egret.URLLoader();
    //    loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
    //    loader.once(egret.Event.COMPLETE,()=>{
    //        var arr = loader.data.split('\n');
    //        for(var i=0;i<arr.length;i++)
    //        {
    //            if(arr[i])
    //            {
    //                var oo = JSON.parse(arr[i]);
    //                this.resultArr.push(oo.list1+'|'+oo.list2+'|' +oo.seed)
    //            }
    //        }
    //        this.m1();
    //    },this);
    //    loader.load(new egret.URLRequest(url));
    //}

    private getAskLevel(index){
        var lv = 1;
        while(true)
        {
            if(index <= Math.pow(lv,1.3)*10)
                return lv;
            lv++
            if(lv >=20)
                return lv;
        }
    }

    public createAsk(begin=1){
        this.chapterArr = [];
        this.repeatNum = 5;
        this.callNum = 14;
        this.callLevel = this.getAskLevel(begin)
        this.callCost = 16 + Math.floor(begin/20)
        this.finishFun = (winArr)=>{
            var list1 = winArr[0]
            var myCost = this.callCost;
            var otherCost = Math.round(this.callCost*(1.1 + begin/1300));

            var oo:any = {
                level:this.callLevel,
                list1:list1,
                cost:myCost,
                seed:Math.floor(Math.random() * 100000000000),
            }
            var num = 0;
            do{
                oo.list2 = this.randomList(otherCost);
                this.testOne_1893(oo.list1,oo.list2,oo.seed);
                if(PKData_wx3.getInstance().getPKResult() == 2)
                {
                    this.chapterArr.push(oo);
                    begin++;
                    this.callLevel = this.getAskLevel(begin)
                    this.callCost = 16 + Math.floor(begin/20)
                    break;
                }
                num ++
                if(num >1000)
                {
                    this.testNum --;
                    break;
                }
            }while(true);
            return false;

            //if(this.chapterArr.indexOf(list1) == -1)
            //{
            //    console.log(begin + ' -create')
            //    begin++;
            //    this.callLevel = this.getClevel_867(begin)
            //    this.callCost = 16 + Math.floor(begin/20)
            //    this.chapterArr.push(list1);
            //
            //}
            //return false;
        }
        this.testRound_4658();
        console.log('DM.stop=4')
    }

}

//DM.testCard('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16','1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16')
//DM.testMV('mv2',10,[30,31])
//javascript:DM.showAllMV();
//Net.send('clean_server')
//DM.test();
//DM.createHang(0,5);
//DM.stop = 1;