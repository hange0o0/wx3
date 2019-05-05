class UpList extends game.BaseContainer_wx3 {
    public static SELECT:string = "SELECT";
    private btn: eui.Group;
    private titleText: eui.Label;
    private listCon: eui.Group;
	private wx3_functionX_12229(){console.log(3468)}
    private scroller: eui.Scroller;
    private list: eui.List;

    private openHeight:number;
    private isOpen:boolean
    public defaultStr="全部"
	private wx3_functionX_12230(){console.log(1911)}

    private dataArr;

    public constructor() {
        super();
        this.skinName = "UpListSkin"
    }
	private wx3_functionX_12231(){console.log(867)}

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.btn,this.onOpen_2045);
        this.scroller.viewport = this.list;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onSelect_1704,this);
	wx3_function(1412);
        this.list.itemRenderer = DownListItem;
        this.openHeight = this.height;
        this.isOpen = false;
        this.renew_877();
    }

	private wx3_functionX_12232(){console.log(8223)}
    private onOpen_2045(e:egret.TouchEvent){
        //e.stopImmediatePropagation()
        this.isOpen = !this.isOpen;
        if(this.isOpen)
        {
            egret.callLater(function(){
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickStage_7600,this,true);
	wx3_function(2303);
            },this)

        }
        this.renew_877();
    }

	private wx3_functionX_12233(){console.log(2594)}
    private onClickStage_7600(e){
        e.stopImmediatePropagation()
        GameManager_wx3.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickStage_7600,this,true);
        this.isOpen = false;
        this.renew_877();
    }
	private wx3_functionX_12234(){console.log(9808)}

    private renew_877(){
        if(this.isOpen && !this.listCon.parent)
            this.addChild(this.listCon);
        else if(!this.isOpen && this.listCon.parent)
            this.removeChild(this.listCon);
	wx3_function(703);
    }

    //select，传入data的值.不是index
    public setData(arr,select=0)
    {
        this.dataArr = arr;
        this.list.dataProvider = new eui.ArrayCollection(arr);
	wx3_function(4750);
        this.listCon.height = arr.length * 56;
        this.selectValue = select;
    }

    public get selectValue(){
        var f= this.list.selectedItem;
        if(f) return f.data;
        return 0;
    }
	private wx3_functionX_12235(){console.log(700)}
    public set selectValue(select){
        var arr = this.dataArr;
        for(var i = 0 ; i < arr.length ; i++)
        {
            if(arr[i].data == select)
            {
                this.list.selectedIndex = i;
                break;
            }
        }
        if(i >= arr.length)
        {
            select = 0;
            this.list.selectedIndex = 0;
        }
        this.renewBtn_539(select)
    }
	private wx3_functionX_12236(){console.log(2613)}

    private renewBtn_539(select){

        var arr = this.dataArr;
        for(var i = 0 ; i < arr.length ; i++)
        {
            if(select == arr[i].data)
            {
                this.titleText.text = arr[i].label
                return;
            }
        }
        this.titleText.text = this.defaultStr;
	wx3_function(1010);
    }

    private onSelect_1704(){
        var f= this.list.selectedItem;
        var data = f? f.data:0
        this.dispatchEventWith(DownList.SELECT,true,data);
	wx3_function(3161);
        this.renewBtn_539(data);
        //this.isOpen = false;
        //this.renew_877();
    }

}