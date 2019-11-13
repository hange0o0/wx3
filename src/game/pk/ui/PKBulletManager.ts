class PKBulletManager_wx3 {
    private static instance:PKBulletManager_wx3;
    public static getInstance() {
        if (!this.instance) this.instance = new PKBulletManager_wx3();
        return this.instance;
    }
	private wx3_functionX_12816(){console.log(7404)}

    private arrowPool = [];
    private bulletPool = [];
    private bulletAniPool = [];
    private bulletAniPool2 = [];
    private bulletLinePool = [];
	private wx3_functionX_12817(){console.log(3222)}
    private useItem = [];

    private wx3_fun_asdfasdfasdf_2778(){}
    private wx3_fun_ast34_2630(){}
    //有抛物线
    public createArrow(fromMC,toMC,beginTime,endTime,id?):ArrowMC_wx3{
        var item:ArrowMC_wx3 = this.arrowPool.pop();
	wx3_function(1816);
        if(!item)
        {
            item = new ArrowMC_wx3();
        }
        item.init(fromMC,toMC,beginTime,endTime,id);
        var con = fromMC.parent;
	wx3_function(5685);
        con.addChildAt(item,con.getChildIndex(fromMC) + 1);
        this.useItem.push(item);
        return item;
    }


    //直线
	private wx3_functionX_12818(){console.log(9469)}
    public createBullet(fromMC,toMC,beginTime,endTime,id?):BulletMC_wx3{
        var item:BulletMC_wx3 = this.bulletPool.pop();
        if(!item)
        {
            item = new BulletMC_wx3();
        }
        item.init(fromMC,toMC,beginTime,endTime,id);
	wx3_function(169);
        if(!fromMC)
            fromMC = toMC;
        var con = fromMC.parent;
        con.addChildAt(item,con.getChildIndex(fromMC) + 1);
        this.useItem.push(item);
        return item;
    }
	private wx3_functionX_12819(){console.log(6653)}

    //直线2
    public createBulletAni(fromMC,toMC,beginTime,endTime,id?):BulletAniMC_wx3{
        var item:BulletAniMC_wx3 = this.bulletAniPool.pop();
        if(!item)
        {
            item = new BulletAniMC_wx3();
	wx3_function(4656);
        }
        item.init(fromMC,toMC,beginTime,endTime,id);
        var con = fromMC.parent;
        con.addChildAt(item,con.getChildIndex(fromMC) + 1);
        this.useItem.push(item);
        return item;
    }
	private wx3_functionX_12820(){console.log(9345)}

    //直线3   fun:每次移动触发的方法
    public createBulletLine(fromMC,toMC,beginTime,endTime,id?,fun?):BulletMCLine_wx3{
        var item:BulletMCLine_wx3 = this.bulletLinePool.pop();
        if(!item)
        {
            item = new BulletMCLine_wx3();
	wx3_function(6935);
        }
        item.init(fromMC,toMC,beginTime,endTime,id,fun);
        var con = fromMC.parent;
        con.addChildAt(item,con.getChildIndex(fromMC) + 1);
        this.useItem.push(item);
        return item;
    }
	private wx3_functionX_12821(){console.log(5716)}

    //直线4
    public createBulletAni2(fromMC,toMC,beginTime,endTime):BulletAniMC2_wx3{
        var item:BulletAniMC2_wx3 = this.bulletAniPool2.pop();
        if(!item)
        {
            item = new BulletAniMC2_wx3();
	wx3_function(8317);
        }
        item.init(fromMC,toMC,beginTime,endTime);
        var con = toMC.parent;
        con.addChildAt(item,con.getChildIndex(toMC) + 1);
        this.useItem.push(item);
        return item;
    }
	private wx3_functionX_12822(){console.log(5414)}

    public freeItem(item){
        if(!item)
            return;
        item.remove();
        if(item.type == 'arrow')
            this.arrowPool.push(item);
        else if(item.type == 'bullet')
            this.bulletPool.push(item);
        else if(item.type == 'bullet_ani')
            this.bulletAniPool.push(item);
        else if(item.type == 'bullet_ani2')
            this.bulletAniPool2.push(item);
        else if(item.type == 'bullet_line')
            this.bulletLinePool.push(item);
	wx3_function(5504);
        ArrayUtil.removeItem(this.useItem,item)
    }

    public actionAll(){
        var PD = PKData_wx3.getInstance();
        var removeArr = [];
	wx3_function(8024);
        for(var i=0;i<this.useItem.length;i++)
        {
             var item = this.useItem[i];
            if(!item.onAction(PD.actionTime))
            {
                removeArr.push(item);
	wx3_function(9526);
            }
        }
        for(var i=0;i<removeArr.length;i++)
        {
            this.freeItem(removeArr[i]);
        }
    }
	private wx3_functionX_12823(){console.log(7462)}

    public freeAll(){
        while(this.useItem.length)
        {
            this.freeItem(this.useItem[0]);
        }
    }
}

class ArrowMC_wx3 extends egret.DisplayObjectContainer{
	private wx3_functionX_12824(){console.log(2174)}
    public type = 'arrow'

    public mc = new eui.Image()
    public fromMC:PKMonsterItem_wx3
    public toMC:PKMonsterItem_wx3
    public beginTime
	private wx3_functionX_12825(){console.log(2906)}
    public endTime
    constructor() {
        super();
        this.mc.source = 'pk_arrow_png'
        this.mc.anchorOffsetX = 30
        this.mc.anchorOffsetY = 25
        this.addChild(this.mc)
    }
	private wx3_functionX_12826(){console.log(6964)}
    private wx3_fun_asdfasdfasdf_8651(){}
    private wx3_fun_ast34_8650(){}

    public init(fromMC,toMC,beginTime,endTime,id){
        this.fromMC = fromMC;
        this.toMC = toMC;
	wx3_function(7852);
        this.beginTime = beginTime;
        this.endTime = endTime;

    }

    public onAction(t){
        if(t > this.endTime)
            return false;
        var rate = (t - this.beginTime)/(this.endTime - this.beginTime);
	wx3_function(2021);
        var dis = Math.abs(this.toMC.x - this.fromMC.x);
        var fromY = this.fromMC.y - this.fromMC.data.getVO().height/2;
        var toY = this.toMC.y - this.toMC.data.getVO().height/2;
        if(rate<=0.5)
        {
            var addY = dis*rate;
	wx3_function(5746);
        }
        else
        {
            var addY = dis*(1-rate);
        }
        addY = Math.pow(addY,0.6);
	wx3_function(9334);
        var maxAddY =  Math.pow(dis*0.5,0.6);

        if(rate<=0.5)
            var rotation = maxAddY - addY
        else
            var rotation = -(maxAddY - addY)

        this.x = this.fromMC.x + (this.toMC.x - this.fromMC.x)*rate
        this.y =  fromY + (toY - fromY)*rate - addY
        this.rotation = this.fromMC.x < this.toMC.x ? -rotation:rotation
        this.mc.scaleX = this.fromMC.x < this.toMC.x ? 1:-1
        return true;

    }
	private wx3_functionX_12827(){console.log(9833)}

    public remove(){
        MyTool.removeMC(this);
    }
}
//图片字弹直线有角度
class BulletMC_wx3 extends egret.DisplayObjectContainer{
	private wx3_functionX_12828(){console.log(3440)}
    public type = 'bullet'

    public mc = new eui.Image()
    public fromMC:PKMonsterItem_wx3
    public toMC:PKMonsterItem_wx3
    public beginTime
	private wx3_functionX_12829(){console.log(5748)}
    public endTime
    public id

    public rota = 0;
    private config = {
        1:{w:25,h:75,rota:90},
        2:{w:25,h:120,rota:90},
        3:{w:25,h:120,rota:90},
        4:{w:25,h:80,rota:90},
        5:{w:25,h:120,rota:90},
        6:{w:25,h:120,rota:90},
        7:{w:25,h:120,rota:90},
        8:{w:20,h:57,rota:90},
        9:{w:18,h:18},
        10:{w:18,h:18},
    }
	private wx3_functionX_12830(){console.log(5375)}
    constructor() {
        super();
        this.mc.source = 'pk_arrow_png'
        this.mc.anchorOffsetX = 30
        this.mc.anchorOffsetY = 25
        this.addChild(this.mc)
    }
	private wx3_functionX_12831(){console.log(6189)}
    private wx3_fun_asdfasdfasdf_5420(){}
    private wx3_fun_ast34_9498(){}

    public init(fromMC,toMC,beginTime,endTime,id){
        this.id = id;
        this.fromMC = fromMC;
	wx3_function(4248);
        this.toMC = toMC;
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.rota = 0;
        this.mc.rotation = 0;//有技能会旋转这个MC
        this.scaleY = 1;
	wx3_function(6697);
        if(id)
        {
            this.mc.source = 'bullet'+id+'_png'
            this.mc.anchorOffsetX = this.config[id].w/2
            this.mc.anchorOffsetY = 20
            if(this.config[id].rota)
            {
                this.rota = this.config[id].rota;
	wx3_function(1406);
            }
        }


    }

	private wx3_functionX_12832(){console.log(1641)}
    public onAction(t){
        if(t > this.endTime)
            return false;
        var rate = (t - this.beginTime)/(this.endTime - this.beginTime);
        var toY = this.toMC.y - this.toMC.data.getVO().height/2
        if(this.fromMC)
        {
            var fromY = this.fromMC.y - this.fromMC.data.getVO().height/2 + this.fromMC.data.atkY
            var addX = (this.fromMC.data.atkX * (this.toMC.x > this.fromMC.x?1:-1));
	wx3_function(1448);
            this.x = this.fromMC.x + (this.toMC.x - this.fromMC.x - addX)*rate + addX
            this.y =  fromY + (toY - fromY)*rate
            this.rotation = this.getRota(
                {x:this.fromMC.x,y:fromY},
                {x:this.toMC.x,y:toY}
            );
	wx3_function(6896);
            if(this.id && this.config[this.id].rota)
            {
                var base = 1
                if(this.id && Math.abs(this.toMC.x - this.fromMC.x) <this.config[this.id].h)
                {
                    base =  Math.abs(this.toMC.x - this.fromMC.x)/this.config[this.id].h
                }

                if(rate < 0.5)
                    this.scaleY = rate*2*base
                else
                    this.scaleY = (1-rate)*2*base
            }
        }
        else
        {
            this.x = this.toMC.x
            this.y = toY - 300*(1-rate);
	wx3_function(6819);
            this.rotation = this.rota + 90;
        }



        return true;

    }
	private wx3_functionX_12833(){console.log(6160)}

    public getRota(begin,end){

        return Math.atan2(end.y - begin.y,end.x - begin.x)* 180/3.14 + this.rota
    }

	private wx3_functionX_12834(){console.log(5812)}
    public remove(){
        MyTool.removeMC(this);
        egret.Tween.removeTweens(this.mc);
    }
}

//图片字弹直线有回调，无角度
class BulletMCLine_wx3 extends egret.DisplayObjectContainer{
	private wx3_functionX_12835(){console.log(2132)}
    public type = 'bullet_line'

    public mc = new eui.Image()
    public fromMC:PKMonsterItem_wx3
    public toMC:any
    public beginTime
	private wx3_functionX_12836(){console.log(5571)}
    public endTime
    public id
    public fun
    constructor() {
        super();
        this.mc.source = ''
        this.mc.anchorOffsetX = 30
        this.mc.anchorOffsetY = 25
        this.addChild(this.mc)
    }
	private wx3_functionX_12837(){console.log(4007)}
    private wx3_fun_asdfasdfasdf_3427(){}
    private wx3_fun_ast34_8554(){}

    public init(fromMC,toMC,beginTime,endTime,id,fun?){
        this.id = id;
        this.fromMC = fromMC;
	wx3_function(2834);
        this.toMC = toMC;
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.fun = fun;
        this.mc.source = id//

        //if(id)
        //{
        //    this.mc.source = 'bullet'+id+'_png'
        //    this.mc.anchorOffsetX = this.config[id].w/2
        //    this.mc.anchorOffsetY = 20
        //
        //
        //}


    }
	private wx3_functionX_12838(){console.log(7491)}

    public onAction(t){
        if(t > this.endTime)
            return false;
        var rate = (t - this.beginTime)/(this.endTime - this.beginTime);
        var fromY = this.fromMC.y - this.fromMC.data.getVO().height/2 + this.fromMC.data.atkY
        var toY = this.toMC.y
        var addX = (this.fromMC.data.atkX * (this.toMC.x > this.fromMC.x?1:-1));
	wx3_function(9768);
        this.x = this.fromMC.x + (this.toMC.x - this.fromMC.x - addX)*rate + addX
        this.y =  fromY// + (toY - fromY)*rate
        this.fun && this.fun();
        return true;

    }
	private wx3_functionX_12839(){console.log(9565)}

    public remove(){
        MyTool.removeMC(this);
        egret.Tween.removeTweens(this.mc);
    }
}

//旧素材子弹动画
class BulletAniMC_wx3 extends egret.DisplayObjectContainer{
	private wx3_functionX_12840(){console.log(6803)}
    public type = 'bullet_ani'

    public mc;
    public fromMC:PKMonsterItem_wx3
    public toMC:PKMonsterItem_wx3
    public beginTime
	private wx3_functionX_12841(){console.log(3750)}
    public endTime

    public needRota = true
    public targetOffsetY = 0

    constructor() {
        super();
	wx3_function(7648);
    }
    private wx3_fun_asdfasdfasdf_6685(){}
    private wx3_fun_ast34_7821(){}

    public init(fromMC,toMC,beginTime,endTime,id){
        this.fromMC = fromMC;
	wx3_function(8080);
        this.toMC = toMC;
        this.beginTime = beginTime;
        this.endTime = endTime;

        var AM = AniManager_wx3.getInstance();
        if(this.mc)
            AM.removeMV(this.mc);
	wx3_function(8691);
        this.mc = AM.getAni(id);
        this.mc.scaleX = this.mc.scaleY = 0.3   //@ani scale
        this.mc.x = 0
        this.mc.y = 0
        this.addChild(this.mc)
        this.needRota = true;
	wx3_function(6284);
        this.targetOffsetY = 0
    }

    public onAction(t){
        if(t > this.endTime)
            return false;
        var rate = egret.Ease.sineIn((t - this.beginTime)/(this.endTime - this.beginTime));
	wx3_function(4119);
        var fromY = this.fromMC.y - this.fromMC.data.getVO().height/2 + this.fromMC.data.atkY
        var toY = this.toMC.y - this.toMC.data.getVO().height/2 + this.targetOffsetY
        var addX = (this.fromMC.data.atkX * (this.toMC.x > this.fromMC.x?1:-1));
        this.x = this.fromMC.x + (this.toMC.x - this.fromMC.x - addX)*rate + addX
        this.y =  fromY + (toY - fromY)*rate
        this.rotation = this.getRota(
            {x:this.fromMC.x,y:fromY},
            {x:this.toMC.x,y:toY}
        );
	wx3_function(8137);

        return true;

    }

    public getRota(begin,end){
        if(!this.needRota)
            return 0;
        return Math.atan2(end.y - begin.y,end.x - begin.x)* 180/3.14 + 90
    }
	private wx3_functionX_12842(){console.log(2208)}

    public remove(){
        MyTool.removeMC(this);
        AniManager_wx3.getInstance().removeMV(this.mc);
        this.mc = null;
    }
}

//用新素材直线
class BulletAniMC2_wx3 extends egret.DisplayObjectContainer{
	private wx3_functionX_12843(){console.log(1501)}
    public type = 'bullet_ani2'

    public mc:any = new MonsterAtkMV()
    public fromMC:PKMonsterItem_wx3
    public toMC:PKMonsterItem_wx3
    public beginTime
	private wx3_functionX_12844(){console.log(4658)}
    public endTime

    public targetOffsetY = 0

    private wx3_fun_asdfasdfasdf_1454(){}
    private wx3_fun_ast34_4634(){}
	private wx3_functionX_12845(){console.log(5262)}

    constructor() {
        super();
        this.addChild(this.mc)
    }

	private wx3_functionX_12846(){console.log(7433)}
    public init(fromMC,toMC,beginTime,endTime){
        this.fromMC = fromMC;
        this.toMC = toMC;
        this.beginTime = beginTime;
        this.endTime = endTime;

        this.mc.x = 0
        this.mc.y = 0
        this.targetOffsetY = 0

        //this.mc.load()

    }
	private wx3_functionX_12847(){console.log(6546)}

    public onAction(t){
        if(t > this.endTime)
            return false;
        var rate = (t - this.beginTime)/(this.endTime - this.beginTime);
        var fromY = this.fromMC.y - this.fromMC.data.getVO().height/2 + this.fromMC.data.atkY
        var toY = this.toMC.y - this.toMC.data.getVO().height/2 + this.targetOffsetY
        var addX = (this.fromMC.data.atkX * (this.toMC.x > this.fromMC.x?1:-1));
	wx3_function(3771);
        this.x = this.fromMC.x + (this.toMC.x - this.fromMC.x - addX)*rate + addX
        this.y =  fromY + (toY - fromY)*rate
        return true;

    }

	private wx3_functionX_12848(){console.log(9925)}

    public remove(){
        MyTool.removeMC(this);
        this.mc.stop();
    }
}
