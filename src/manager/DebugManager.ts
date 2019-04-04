class DebugManager {
    private static _instance:DebugManager;
    private static cd = 0
    public static getInstance():DebugManager {
        if (!this._instance)
            this._instance = new DebugManager();
        return this._instance;
    }

    public stop = 0;
    public winCardArr = [];
    public finishFun = function(winArr){return false}


    public constructor() {

    }


    public printDetail = false;  //打印胜出怪物
    public winMonster = {}
    public winUseCard = []

    public outPut = []

    public callCost = 0
    public callLevel = 0
    public callNum = 0
    public repeatNum = 0

    public addTime = 0;
    public addTimeCD(t){
        this.addTime += t;
        SharedObjectManager.getInstance().setMyValue('addTime',this.addTime)


    }

    private ccccccc(){
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

    public randomList(cost){
        var costIn = cost;
        var arr = []
        for(var s in MonsterVO.data)
        {
            var mvo = MonsterVO.data[s]
            if(this.callLevel && mvo.level>this.callLevel)
                continue;
            for(var i=0;i<this.repeatNum;i++)
                arr.push(mvo)
        }

        var orginArr = arr.concat();

        var num = 0;
        var newList = [];
        while(num < 100 && cost > 0 && arr.length>0)
        {
            var vo = ArrayUtil.randomOne(arr,true);
            if(vo.cost <= cost)
            {
                cost -= vo.cost;
                newList.push(vo.id)
                if(this.callNum && this.callNum < newList.length) //超过数量,重来
                {
                    cost = costIn;
                    arr = orginArr.concat();
                    newList.length = 0;
                    num = 0;
                    continue;
                }
            }
            num ++;
        }
        ArrayUtil.random(newList);
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
    //        this.testOne(team1,team2)
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
    //            this.outPut[i] = this.format(this.outPut[i])
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
    private drawNum = 0;
    public test(){
        this.testNum = 0;
        this.drawNum = 0;
        this.stop = 0;
        this.winMonster = {};
        this.winUseCard = [];
        this.outPut = [];
        setTimeout(()=>{
            this.testRound();
        },1);

    }

    private printResult(type){
        var arr = [];
        for(var s in MonsterVO.data)
        {
            arr.push({id:s,num:this.winMonster[s] || 0})
        }

        ArrayUtil.sortByField(arr,['num'],[1]);
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
            arr[i].rate =arr[i].num*Math.pow(CM.getCardVO(id).cost,0.8)
            console.log((i + 1) + '\tid:' +id +  '\t\tnum:' +  arr[i].num + '\t\tcost:' +  CM.getCardVO(id).cost + '\t\tname:' +  CM.getCardVO(id).name  + '\t\ttype:' +  CM.getCardVO(id).type  + '\t\tlevel:' +  CM.getCardVO(id).level)
        }

        console.log("\n\n======================================================================\n\n")
        ArrayUtil.sortByField(arr,['rate'],[1]);
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
            console.log((i + 1) + '\tid:' +id +  '\t\trate:' + arr[i].rate + '\t\tcost:' +  CM.getCardVO(id).cost + '\t\tname:' +  CM.getCardVO(id).name + '\t\ttype:' +  CM.getCardVO(id).type + '\t\tnum:' +  arr[i].num  + '\t\tlevel:' +  CM.getCardVO(id).level)
        }

    }

    //N选1;
    private testRound(){
        this.testNum ++;
        var arr = []
        var n = 2048;

        var cost = this.callCost || (30 + Math.floor(Math.random()*30))
        for(var i=0;i<n;i++)
        {
            arr.push(this.randomList(cost))
        }
        this.testArr(arr,0,n,egret.getTimer())
    }

    private testArr(arr,num,total,t,type?){
        if(arr.length >2)
        {
            arr = arr.concat(this.testOne(arr.shift(),arr.shift()))
            num ++;
            if(num< total+2)
            {
                if(num %50 == 0)
                {
                    egret.callLater(()=>{
                        console.log('runing')
                        this.testArr(arr,num,total,t,type)
                    },this)
                }
                else
                    this.testArr(arr,num,total,t,type)
                return
            }
        }

        var xxx = {list1:arr[0],list2:arr[1]};
        arr = this.testOne(arr.shift(),arr.shift())

        if(PKData.getInstance().isDraw())////平手局数不超过1/30
        {
            if(this.drawNum/this.outPut.length < 1/30)
            {
                this.outPut.push(xxx);
                this.drawNum ++;
            }
        }
        else
        {
            this.outPut.push(xxx);
        }


        for(var i=0;i<arr.length;i++)
        {
            var temp = arr[i].split(',');
            for(var j=0;j<temp.length;j++)
            {
                var id = temp[j];
                if(this.winMonster[id])
                    this.winMonster[id] ++;
                else
                    this.winMonster[id] = 1;
            }
            this.winCardArr.push(arr[i]);
        }

        console.log(this.testNum + ':' + (egret.getTimer()-t))

        if(this.finishFun(arr))
            return;
        if(this.stop)
        {
            this.printResult(type);

            if(this.stop == 2)
            {
                //for(var i=0;i<this.outPut.length;i++)
                //{
                //    this.outPut[i] = this.format(this.outPut[i])
                //}
                egret.localStorage.setItem('chapterData_' + DateUtil.formatDate('MM-dd hh:mm:ss',new Date()), this.chapterArr.join('\n'));
            }
            if(this.stop == 3)
            {
                //for(var i=0;i<this.levelArr.length;i++)
                //{
                //    this.levelArr[i] = JSON.stringify(this.levelArr[i])
                //}
                egret.localStorage.setItem('levelData_' +this.callLevel + '_'+ DateUtil.formatDate('MM-dd hh:mm:ss',new Date()), this.levelArr.join('\n'));
            }
            return;
        }

        egret.callLater(this.testRound,this)
    }

    private format(data){
        var rd = Math.floor(Math.random() * 100000000000);
        data.seed = rd;
        return JSON.stringify(data);
    }

    private testOne(list1,list2,seed?){
        var PD = PKData.getInstance()
        var data = {
            seed:seed ||TM.now() + Math.floor(100000000*Math.random()),
            players:[
                {id:1,gameid:'test1',team:1,autolist:list1,force:10000,type:0,hp:1},
                {id:2,gameid:'test2',team:2,autolist:list2,force:10000,type:0,hp:1}
            ]
        };
        PD.init(data);
        PD.quick = true;
        PD.start();
        PKCode.getInstance().onStep()

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

    public getCost(list){
        var arr = list.split(',')
        var cost = 0;
        for(var i=0;i<arr.length;i++)
        {
            cost += MonsterVO.getObject(arr[i]).cost;
        }
        console.log(cost);
    }


    //创建关卡数据，输入花费比例
    public levelArr = []
    //等级，费用小-》大，数量小-》大
    public createLevel(lv){
        this.levelArr = [];
        this.callLevel = lv;

        var maxCost = Math.floor(16 +lv*3.2)

        this.repeatNum = 1+Math.max(1,Math.floor(lv*0.5));
        this.callNum = 4 + Math.ceil(lv/2);


        this.callCost = Math.round(maxCost*(0.9+Math.random()*0.2))
        this.finishFun = (winArr)=>{
            var list1 = winArr[0]
            if(this.levelArr.indexOf(list1) == -1)
            {
                this.levelArr.push(list1);
                console.log(this.levelArr.length + ' -create')
            }
            this.callCost = Math.round(maxCost*(0.9+Math.random()*0.2))
            return false;
        }
        this.testRound();
        console.log('DM.stop=3')
    }

    //创建章节
    private getClevel(index){
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
    public chapterArr = []
    public createChapter(begin){
        this.chapterArr = [];
        this.repeatNum = 5;
        this.callNum = 14;
        this.callLevel = this.getClevel(begin)
        this.callCost = 16 + Math.floor(begin/20)
        this.finishFun = (winArr)=>{
            var list1 = winArr[0]
            if(this.chapterArr.indexOf(list1) == -1)
            {
                console.log(begin + ' -create')
                begin++;
                this.callLevel = this.getClevel(begin)
                this.callCost = 16 + Math.floor(begin/20)
                this.chapterArr.push(list1);

            }
            return false;
        }
        this.testRound();
        console.log('DM.stop=2')
    }

    private resetCost(){
        var num = Math.floor((this.levelArr.length + 2110)/10)
        for(var cost=0;cost < 31;cost++)
        {
            num-=cost;
            if(num <= 0)
                break;
        }
        if(cost > 20)
        {
            cost =20 + Math.floor(Math.min(cost-20,11)*Math.random())
        }
        this.callCost = cost + 30
    }

    private loadArr = []
    private resultArr = []
    public m(){
        for(var i=1;i<=61;i++)
        {
             this.loadArr.push('resource/levelX/chapter/chapter_'+i+'.txt')
        }
        this.m1();
    }

    private m1(){
        var url = this.loadArr.shift();
        if(!url)
        {
            console.log(this.resultArr.length);
            console.log('finish');
            egret.localStorage.setItem('result' + DateUtil.formatDate('MM-dd hh:mm:ss',new Date()), this.resultArr.join('\n'));
            return;
        }
        console.log(this.resultArr.length)
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.once(egret.Event.COMPLETE,()=>{
            var arr = loader.data.split('\n');
            for(var i=0;i<arr.length;i++)
            {
                if(arr[i])
                {
                    var oo = JSON.parse(arr[i]);
                    this.resultArr.push(oo.list1+'|'+oo.list2+'|' +oo.seed)
                }
            }
            this.m1();
        },this);
        loader.load(new egret.URLRequest(url));
    }

}

//DM.testCard('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16','1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16')
//DM.testMV('mv2',10,[30,31])
//javascript:DM.showAllMV();
//Net.send('clean_server')
//DM.test();
//DM.createHang(0,5);
//DM.stop = 1;