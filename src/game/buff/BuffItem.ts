class BuffItem extends game.BaseItem{

    private con: eui.Group;
    private chooseMC: eui.Image;
    private headMC: eui.Image;
    private icon: eui.Image;
    private rateText: eui.Label;
    private barGroup: eui.Group;
    private barMC: eui.Image;
    private deleteMC: eui.Image;


    private user;
    public constructor() {
        super();
        this.skinName = "BuffItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this,this.onClick)
        this.addBtnEvent(this.deleteMC,this.onDelete)
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
        else if(this.user)
        {
            ui.onUserClick(this.user.openid)
        }
        else
        {
             if(ui.getNoUseNum() > 0)
             {
                 MyWindow.ShowTips('选择下方好友加成增益')
             }
            else
             {
                 ui.share();
             }
        }
    }
    private onDelete(e){
        e.stopImmediatePropagation()
        BuffManager.getInstance().deleteBuff(this.data.id)
        //BuffUI.getInstance().renew();
    }

    public dataChanged():void {
        egret.Tween.removeTweens(this.con)
        this.con.rotation = 0;
        this.deleteMC.visible = false;
        this.chooseMC.visible = false

        this.user = BuffManager.getInstance().getBuffUser(this.data.id)
        switch(this.data.type)
        {
            case 'atk':
                this.icon.source = 'icon_force2_png'
                break;
            case 'def':
                this.icon.source = 'icon_def2_png'
                break;
            case 'work':
                this.icon.source = 'icon_coin_png'
                break;
        }
        this.rateText.text = '+'+this.data.value+'%'
        if(this.user)
        {
            this.barGroup.visible = true;
            this.onTimer();
            this.headMC.source = this.user.head || 'common_head_bg_jpg';
        }
        else
        {
            this.barGroup.visible = false;
            this.headMC.source = ''
        }
        this.onTimer();
    }

    public onTimer(){
        if(this.user)
        {
            var cd = BuffManager.getInstance().buffCD
            this.barMC.width = 204 *(cd - (TM.now() - this.user.time))/cd
        }
    }

    public onUserClick(openid){
        egret.Tween.removeTweens(this.con)
        this.con.rotation = 0
        this.chooseMC.visible = false
        this.deleteMC.visible = false
         if(openid)//有选中
         {
              if(this.user&&this.user.openid == openid)
              {
                  this.deleteMC.visible = true
                  this.chooseMC.visible = true
              }
             else
              {
                  this.con.rotation = 2
                  egret.Tween.get(this.con,{loop:true}).to({rotation:-2},100).to({rotation:2},100)
              }
         }
    }


}