/**
 *
 * @author
 *
 */
class DownList extends game.BaseContainer_wx3 {
	private wx3_functionX_12201(){console.log(6038)}
    public static SELECT:string = "SELECT";
    private btn: eui.Group;
    private img: eui.Image;
    private titleText: eui.Label;
    private listCon: eui.Group;
    private scroller: eui.Scroller;
	private wx3_functionX_12202(){console.log(731)}
    private list: eui.List;


    private openHeight:number;
    private isOpen:boolean
    public defaultStr="全部"
	private wx3_functionX_12203(){console.log(5154)}

    private dataArr;

    public constructor() {
        super();
        this.skinName = "DownListSkin"
    }
	private wx3_functionX_12204(){console.log(2962)}

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.btn,this.onOpen_2936);
        this.scroller.viewport = this.list;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onSelect_7196,this);
	wx3_function(4502);
        this.list.itemRenderer = DownListItem;
        this.openHeight = this.height;
        this.isOpen = false;
        this.renew_4328();
    }

	private wx3_functionX_12205(){console.log(7799)}
    private onOpen_2936(e:egret.TouchEvent){
        e.stopImmediatePropagation()
        this.isOpen = !this.isOpen;
        if(this.isOpen)
        {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickStage_7911,this);
	wx3_function(820);
        }
        this.renew_4328();
    }

    private onClickStage_7911(){
        GameManager_wx3.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickStage_7911,this);
	wx3_function(3360);
        this.isOpen = false;
        this.renew_4328();
    }

    private renew_4328(){
        if(this.isOpen && !this.listCon.parent)
            this.addChild(this.listCon);
        else if(!this.isOpen && this.listCon.parent)
            this.removeChild(this.listCon);
	wx3_function(3839);
    }

    //select，传入data的值.不是index
    public setData(arr,select=0)
    {
        this.dataArr = arr;
        this.list.dataProvider = new eui.ArrayCollection(arr);
	wx3_function(4790);
        this.height = Math.min(this.openHeight,arr.length * 56 - 6 + 60 - 1);
        this.selectValue = select;
    }

    public get selectValue(){
        var f= this.list.selectedItem;
        if(f) return f.data;
        return 0;
    }
	private wx3_functionX_12206(){console.log(5161)}
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
        this.renewBtn_1746(select)
    }
	private wx3_functionX_12207(){console.log(5878)}

    private renewBtn_1746(select){

        var arr = this.dataArr;
        for(var i = 0 ; i < arr.length ; i++)
        {
            if(select == arr[i].data)
            {
                this.titleText.text = arr[i].label
                this.img.source = arr[i].icon
                return;
            }
        }
        this.titleText.text = this.defaultStr;
	wx3_function(1927);
    }

    private onSelect_7196(){
        var f= this.list.selectedItem;
        var data = f? f.data:0
        this.dispatchEventWith(DownList.SELECT,true,data);
	wx3_function(238);
        this.renewBtn_1746(data);
        //this.isOpen = false;
        //this.renew_4328();
    }

}

class DownListItem extends game.BaseItem_wx3 {
	private wx3_functionX_12208(){console.log(1368)}
    private con: eui.Group;
    private img: eui.Image;
    private text: eui.Label;



	private wx3_functionX_12209(){console.log(764)}
    public constructor() {
        super();
        this.skinName = "DownListItemSkin"
    }

    public childrenCreated(){
        super.childrenCreated();
	wx3_function(7382);
    }

    public dataChanged(){
        if(this.data.icon)
        {
            this.img.source = this.data.icon
            this.con.addChildAt(this.img,0)
        }
        else
        {
            MyTool.removeMC(this.img)
        }
        this.text.text = this.data ? (""+this.data.label):"全部";
	wx3_function(1531);
        if(this.data.label2)
            this.text.text += this.data.label2;
    }
}