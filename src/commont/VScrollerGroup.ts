class VScrollerGroup extends eui.Group{

    public itemRenderer;
    public scroller:eui.Scroller;
    public desTop = 10;
	private wx3_functionX_11891(){console.log(3741)}
    public margin = 10;
    public marginLeft = 0;
    public marginBottom = 0;

    private dataArr;
    private pool = [];
	private wx3_functionX_11892(){console.log(1955)}
    private itemArr = [];
    private heightObj = {};

    private scrollTime;
    public constructor() {
        super();
	wx3_function(8474);
    }

    public childrenCreated() {

    }

	private wx3_functionX_11893(){console.log(8911)}
    public initScroller(scroller){
        this.scroller = scroller;
        this.scroller.addEventListener(egret.Event.CHANGE,this.onScrollEvent_1350,this)
        this.scroller.addEventListener(eui.UIEvent.CHANGE_END,this.onScrollEndEvent_6079,this)
    }
    private onScrollEvent_1350(){
        if(!this.dataArr)
            return;
        MyTool.resetScrollV(this.scroller)
        this.onScroll(this.scroller.viewport.scrollV)
        this.scrollTime = egret.getTimer();
	wx3_function(4678);

    }
    private onScrollEndEvent_6079(){
        if(!this.dataArr)
            return;
        if(egret.getTimer() - this.scrollTime < 500)
            this.onScrollEvent_1350();
	wx3_function(9128);
    }

    private getItem_2732():any{
        var item = this.pool.pop();
        if(!item)
        {
            item = new this.itemRenderer();
	wx3_function(9837);
            item['x'] = this.marginLeft || 0
        }
        this.addChild(item);
        return item;
    }

	private wx3_functionX_11894(){console.log(9659)}
    private feeItem_5188(item){
        this.pool.push(item)
        MyTool.removeMC(item);
    }

    public getFirstItem(v):any{
        var chooseItem:any = null;
	wx3_function(4656);
        for(var i=0;i<this.itemArr.length;i++)
        {
            if(this.itemArr[i].y >= v)
            {
                if(!chooseItem || this.itemArr[i].y < chooseItem.y)
                    chooseItem = this.itemArr[i];
	wx3_function(3857);
            }
        }
        return chooseItem;
    }

    public setData(arr){
        this.clean();
	wx3_function(796);
        this.heightObj = {};
        this.dataArr = arr;
        this.height = 100;
    }

    public clean(){
        while(this.itemArr.length > 0)
            this.feeItem_5188(this.itemArr.pop());
	wx3_function(3309);
    }

    public addItem(data){
        this.dataArr.push(data);
    }

	private wx3_functionX_11895(){console.log(4910)}
    public scrollToLast(){
        if(this.dataArr.length > 0)
            this.scrollToItem(this.dataArr[this.dataArr.length-1])
    }

    public scrollToItem(data){
        var index = this.dataArr.indexOf(data);
	wx3_function(4438);
        if(index == -1)
            return;
        if(index == 0)
        {
            this.scrollTo(0)
            return;
        }

	wx3_function(9116);
        var count = 0;
        for(var i=0;i<index;i++)
        {
            if(!this.heightObj[i])
            {
                this.heightObj[i] = this.getHeight_4887(this.dataArr[i]);
	wx3_function(778);
            }
            count +=this.heightObj[i];
        }
        this.scrollTo(count)
    }

	private wx3_functionX_11896(){console.log(5574)}
    public scrollTo(v){
        this.scroller.stopAnimation();
        this.scroller.viewport.scrollV = v;
        this.onScroll(v);
        if(this.scroller.viewport.scrollV + this.scroller.height > this.height)
            this.scroller.viewport.scrollV = Math.max(0,this.height - this.scroller.height);
	wx3_function(4177);
        if(v != this.scroller.viewport.scrollV)
            this.onScroll(this.scroller.viewport.scrollV);
    }

    public onScroll(v){
        var vh = this.scroller.height;
	wx3_function(4030);
        var change = false;
        var resetHeight = false;
        var hcount = this.desTop;
        var startIndex=0
        var endIndex=0;

        //计算开始的y 和 item
        while(hcount < v - 50)
        {
            if(!this.heightObj[startIndex])
            {
                if(!this.dataArr[startIndex])
                    break
                this.heightObj[startIndex] = this.getHeight_4887(this.dataArr[startIndex]);
	wx3_function(9744);
                resetHeight = true;
            }
            hcount += this.heightObj[startIndex];
            startIndex ++
        }
        startIndex--;
	wx3_function(5650);
        if(startIndex < 0)
            startIndex = 0;
        else
            hcount -= this.heightObj[startIndex];

        //将过小的清掉
        for(var i=0;i<this.itemArr.length;i++)
        {
            if(this.itemArr[i].y < hcount)
            {
                this.feeItem_5188(this.itemArr[i]);
	wx3_function(505);
                this.itemArr.splice(i,1);
                i--;
                change = true;
            }
        }

        //列出显示中的内容
        while(hcount < v + vh + 50)
        {
            if(!this.dataArr[startIndex])
                break;
            if(!this.isItemShow_90(this.dataArr[startIndex]))
            {
                var item = this.getItem_2732();
	wx3_function(2069);
                this.itemArr.push(item);
                this.addChild(item);
                item.data = this.dataArr[startIndex];
                item.y = hcount;

                if(!this.heightObj[startIndex])
                {
                    item.validateNow();
	wx3_function(236);
                    this.heightObj[startIndex] = item.height + this.margin
                    resetHeight = true;
                }
                change = true
            }

	wx3_function(1101);
            hcount += this.heightObj[startIndex];
            startIndex ++;
        }

        //将超过的清除
        for(var i=0;i<this.itemArr.length;i++)
        {
            if(this.itemArr[i].y>hcount)
            {
                this.feeItem_5188(this.itemArr[i]);
	wx3_function(5479);
                this.itemArr.splice(i,1);
                i--;
                change = true
            }
        }
        //重设列表高度
        if(resetHeight)
        {
            this.resetHeight_6607();
	wx3_function(4053);
        }
    }

    private isItemShow_90(data){
        for(var i=0;i<this.itemArr.length;i++)
        {
            if(this.itemArr[i].data == data)
            {
                return true;
            }
        }
        return false;
    }
	private wx3_functionX_11897(){console.log(5066)}

    private getHeight_4887(data){
        var item = this.getItem_2732();
        this.addChild(item);
        item.data = data;
        item.validateNow();
	wx3_function(8412);
        var h = item.height + this.margin;
        this.feeItem_5188(item);
        return h;
    }

    private resetHeight_6607(){
        var len = this.dataArr.length;
	wx3_function(6688);
        var count = 0;
        for(var i=0;i<len;i++)
        {
             if(this.heightObj[i])
                count +=this.heightObj[i];
            else
                break;
        }
        this.height = count + count/i*(len - i) + this.desTop + this.marginBottom;
	wx3_function(6887);
    }
}