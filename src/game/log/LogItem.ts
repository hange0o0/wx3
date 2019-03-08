class LogItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "LogItemSkin";
    }

    private con: eui.Group;
    private timeText: eui.Label;
    private cost1: eui.Label;
    private force1: eui.Label;
    private myCost1: eui.Label;
    private resultText1: eui.Label;
    private cost2: eui.Label;
    private force2: eui.Label;
    private myCost2: eui.Label;
    private resultText2: eui.Label;
    private desText: eui.Label;
    private coinText: eui.Label;
    private videoBtn: eui.Button;










    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.videoBtn,this.onClick)
        //this.con.cacheAsBitmap = true;
    }


    private onClick(){
        //PKManager.getInstance().roundTotalData[this.data.key] = this.data.roundData;
        LogUI.getInstance().showHistory(this.data,this.data.roundData)
    }

    public dataChanged(){

    }

}