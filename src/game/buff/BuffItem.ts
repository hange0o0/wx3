class BuffItem extends game.BaseItem{

    private headMC: eui.Image;
    private nameText: eui.Label;




    private user;
    public constructor() {
        super();
        this.skinName = "BuffItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this,this.onClick)
    }

    private onClick(e){
        e.stopImmediatePropagation()
        var ui = BuffUI.getInstance();
        if(ui.currentChooseID)
        {
             if(this.user &&this.user.openid == ui.currentChooseID)
                return;
            //交换
            BuffManager.getInstance().addBuff(this.data.id,ui.currentChooseID)
            //ui.renew();
        }
        //else if(this.user)
        //{
        //    ui.onUserClick(this.user.openid)
        //}
        //else
        //{
        //     if(ui.getNoUseNum() > 0)
        //     {
        //         MyWindow.ShowTips('选择下方好友加成增益')
        //     }
        //    else
        //     {
        //         ui.share();
        //     }
        //}
    }
    private onDelete(e){
        e.stopImmediatePropagation()
        BuffManager.getInstance().deleteBuff(this.data.id)
        //BuffUI.getInstance().renew();
    }

    public dataChanged():void {

    }



}