class PKMonsterStateItem_wx3 extends game.BaseItem {

    private mc: eui.Image;




    public index;
    public constructor() {
        super();

        this.skinName = "PKMonsterStateItemSkin";
    }
    private wx3_fun_asdfasdfasdf(){}
    private wx3_fun_ast34(){}

    public childrenCreated() {
        super.childrenCreated();
    }


    public dataChanged(){
        PKAddState_wx3.fillStateMC(this.mc,this.data);
    }

}