class LeftList extends game.BaseContainer_wx3 {
    public static SELECT:string = "SELECT";
    private btn: eui.Group;
    private img: eui.Image;
    private listCon: eui.Group;
	private wx3_functionX_12210(){console.log(7484)}
    private scroller: eui.Scroller;
    private list: eui.List;


    private openHeight:number;
    private isOpen:boolean
	private wx3_functionX_12211(){console.log(3130)}
    public defaultStr="全部"

    private dataArr;

    public constructor() {
        super();
	wx3_function(2630);
        this.skinName = "LeftListSkin"
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.btn,this.onOpen_8598);
	wx3_function(5820);
        this.scroller.viewport = this.list;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onSelect_3337,this);
        this.list.itemRenderer = DownListItem;
        this.openHeight = this.height;
        this.isOpen = false;
        this.renew_1834();
	wx3_function(8507);
    }

    private onOpen_8598(e:egret.TouchEvent){
        //e.stopImmediatePropagation()
        this.isOpen = !this.isOpen;
        if(this.isOpen)
        {
            egret.callLater(function(){
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickStage_3316,this,true);
	wx3_function(694);
            },this)

        }
        this.renew_1834();
    }

	private wx3_functionX_12212(){console.log(5357)}
    private onClickStage_3316(e){
        e.stopImmediatePropagation()
        GameManager_wx3.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickStage_3316,this,true);
        this.isOpen = false;
        this.renew_1834();
    }
	private wx3_functionX_12213(){console.log(8917)}

    private renew_1834(){
        if(this.isOpen && !this.listCon.parent)
            this.addChild(this.listCon);
        else if(!this.isOpen && this.listCon.parent)
            this.removeChild(this.listCon);
	wx3_function(1348);
    }

    //select，传入data的值.不是index
    public setData(arr,select=0)
    {
        this.dataArr = arr;
        this.list.dataProvider = new eui.ArrayCollection(arr);
	wx3_function(1661);
        this.listCon.height = arr.length * 56;
        this.selectValue = select;
    }

    public get selectValue(){
        var f= this.list.selectedItem;
        if(f) return f.data;
        return 0;
    }
	private wx3_functionX_12214(){console.log(6215)}
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
        this.renewBtn_369(select)
    }
	private wx3_functionX_12215(){console.log(5762)}

    private renewBtn_369(select){

        var arr = this.dataArr;
        for(var i = 0 ; i < arr.length ; i++)
        {
            if(select == arr[i].data)
            {
                //this.titleText.text = arr[i].label
                this.img.source = arr[i].icon
                return;
            }
        }
        //this.titleText.text = this.defaultStr;
    }
	private wx3_functionX_12216(){console.log(6839)}

    private onSelect_3337(){
        var f= this.list.selectedItem;
        var data = f? f.data:0
        this.dispatchEventWith(DownList.SELECT,true,data);
        this.renewBtn_369(data);
        //this.isOpen = false;
        //this.renew_1834();
    }
	private wx3_functionX_12217(){console.log(9448)}

}