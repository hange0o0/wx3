
class UserInfoBtn {

    private sourceBtn:eui.Image | eui.Button;
    private callFun:Function;
	private wx3_functionX_12237(){console.log(804)}
    private parent:game.BaseUI_wx3;
    private okBtn;
    private isNew:string;

    public constructor(btn:eui.Image | eui.Button, fun:Function, parent:game.BaseUI_wx3, url:string) {
        //if(DEBUG){
        //    if(!(parent instanceof game.BaseUI)){
        //        console.error("不支持！");
        //        return;
        //    }
        //    if(btn.parent != parent){
        //        console.error("btn 不是在 parent的根下，不支持！");
        //        return;
        //    }
        //}
        this.sourceBtn = btn;
	wx3_function(3341);
        this.parent = parent;
        this.callFun = fun;

        //if(!window["wx"] || !window["wx"].createUserInfoButton){
        //    ObjectUtilQU.addClickEvent(btn, ()=>{
        //        WXGameUserInfoQueen.getInstance().checkUserInfo(()=>{
        //            this.callFun();
        //        })
        //    }, this);
        //}
        //else{
        //    MyToolQU.removeGUI(btn);
        //    // this.okBtn = this.initBtn_9816(btn.width, btn.height, btn.x, btn.y, url)
            this.isNew = url;
        //}
        //WXAddCode.execute();
    }

	private wx3_functionX_12238(){console.log(4529)}
    private initBtn_9816(btnw, btnh, btnx, btny, imgUrl){

        console.log(1111)
        if(!window['wx'])
            return;
        console.log(222222)
        //if(RELEASE){
            //这里存在界面坐标、尺寸换算关系 width="180" height="60" bottom="40" x="230"
            // let btnw = 244, btnh = 71, btnx = 98, btny = 381;
	wx3_function(546);
            let scalex = screen.availWidth/640;
            let scaley = screen.availHeight/GameManager_wx3.stage.stageHeight;
            // let left = scalex * ((640-this.width)/2 + btnx);
            // let top = scaley * ((GameManagerHitPeng.uiHeight-this.height)/2 + btny + (AppF.isIOS ? 52 : 0));
            let left = scalex * (btnx);
            let top = scaley * (btny);
            let width = scalex * btnw;
            let height = scalex * btnh;
	wx3_function(9254);
            var button = window["wx"].createUserInfoButton({
                type: 'image',
                image: '' + imgUrl,
                style: {
                    left: left,
                    top: top,
                    width: width,
                    height: height//,
                    // lineHeight: height,
                    // backgroundColor: '#d0e995',
                    // color: '#526830',
                    // textAlign: 'center',
                    // fontSize: 16,
                    // borderRadius: 20
                }
            })
            let self = this;
	wx3_function(3210);
            button.onTap((res) => {
                this.callFun && this.callFun(res)
            })
            return button;
        //}
    }

	private wx3_functionX_12239(){console.log(3095)}
    public set visible(v:boolean){
        console.log(v,this.isNew)
        if(v && this.isNew && !this.okBtn){
            let btn = this.sourceBtn;
            // console.log(btn.width, btn.height, btn.x, btn.y, btn.right, btn.bottom, this.parent.width, this.parent.height);
            if(!isNaN(btn.right))
                btn.x = this.parent.width - btn.right - btn.width;
            if(!isNaN(btn.horizontalCenter))
                btn.x = (this.parent.width - btn.width)/2;
            if(!isNaN(btn.bottom)){
                btn.y = this.parent.height - btn.bottom - btn.height;
                // console.log("111111111");
            }
            this.okBtn = this.initBtn_9816(btn.width, btn.height, btn.x, btn.y, this.isNew);
        }
        console.log(this.okBtn)
        if(!this.okBtn) return;


        if(v){
            this.sourceBtn.visible = false;
            this.okBtn.show();
            this.parent.once(egret.Event.REMOVED_FROM_STAGE, this.hide, this);
        }
        else{
            this.hide();
        }
    }
	private wx3_functionX_12240(){console.log(6537)}

    private checkWindow_9041(e:egret.Event){
        if(e.data == this.parent) return;

        this.parent.hide();
    }
	private wx3_functionX_12241(){console.log(5082)}

    public hide(){
        if(this.okBtn){
            this.okBtn.hide();
        }
        this.sourceBtn.visible = true;
	wx3_function(1381);
    }
}