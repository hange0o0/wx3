class BuffItem extends game.BaseItem_wx3{

    private headMC: eui.Image;
    private nameText: eui.Label;

	private wx3_functionX_12242(){console.log(2013)}



    private user;
    public constructor() {
        super();
	wx3_function(7610);
        this.skinName = "BuffItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,()=>{
            if(this.currentState == 'empty')
                BuffUI.getInstance().share()
        })
    }
	private wx3_functionX_12243(){console.log(9668)}


    public dataChanged():void {
        var user = UM_wx3.shareUser[this.data]
        if(user)
        {
            this.currentState = 'normal'
            this.headMC.source = user.h
            this.nameText.text = user.n
        }
        else
        {
             this.currentState = 'empty'
            this.nameText.text = '邀请新好友进入可得：'
        }
    }
	private wx3_functionX_12244(){console.log(9030)}



}