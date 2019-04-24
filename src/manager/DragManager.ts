class DragManager_wx3 extends egret.EventDispatcher{
    public constructor() {
        super();
    }

	private wx3_functionX_11999(){console.log(4746)}
    private static _instance: DragManager_wx3;
    public static  start_drag = 'start_drag'
    public static  move_drag ='move_drag'
    public static  end_drag = 'end_drag'

    public static getInstance():DragManager_wx3{
        if(!this._instance)
            this._instance = new DragManager_wx3();
        return this._instance;
    }
	private wx3_functionX_12000(){console.log(9401)}

    private startPos;
    private currentDrag;
    private dragDes;
    private isDraging = false
    //设置该MC可拖动
    public setDrag(mc,lockCenter=true,drag_sp?){
        mc.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin_2397,this,true,999)
        mc.lockCenter = lockCenter;
	wx3_function(3390);
        mc.drag_sp = drag_sp;
    }

    private onBegin_2397(e:egret.TouchEvent){

         //if(GuideManager.getInstance().isGuiding && GuideManager.getInstance().guideKey != 'randomBtn' )
         //   return;
        if(e.currentTarget.stopDrag || this.isDraging)
            return;
        this.currentDrag = e.currentTarget;
	wx3_function(6669);
        this.currentDrag.dispatchEventWith('before_drag',true,{x:e.stageX,y:e.stageY});
        this.isDraging = true;

        GameManager_wx3.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_5935,this)
        GameManager_wx3.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_6318,this)


        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_5935,this)
        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_6318,this)
        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onCancel_4849,this)
        //this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL,function(){
        //    console.log('cancel')
        //},this)
        //this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEnd_6318,this)
	wx3_function(1097);

        this.startPos = {x:e.stageX,y:e.stageY};
        this.dragDes = {x:this.currentDrag.x,y:this.currentDrag.y}
        if(this.currentDrag.lockCenter)
            this.dragDes = {x:this.currentDrag.x + (e.localX -this.currentDrag.width/2),y:this.currentDrag.y + e.localY - this.currentDrag.height/2}
    }
	private wx3_functionX_12001(){console.log(1646)}

    ////设为拖动状态
    //public setDragBegin(item,stageX,stageY,noEvent?){
    //    noEvent = noEvent || {};
    //    this.currentDrag = item;
    //    this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_5935,this)
    //    this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_6318,this)
    //    if(!noEvent.cancel)
    //        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEnd_6318,this)
    //    if(!noEvent.outside)
    //        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEnd_6318,this)   //滚动区的拖不出来
    //
    //    this.startPos = {x:stageX,y:stageY,drag:true};
    //    this.dragDes = {x:this.currentDrag.x,y:this.currentDrag.y}
    //
    //
    //    //this.dragDes = {x:this.currentDrag.x + (e.localX -this.currentDrag.width/2),y:this.currentDrag.y + e.localY - this.currentDrag.height/2}
    //}

    private onMove_5935(e:egret.TouchEvent){
        if(!this.startPos.drag)
        {
            if(Math.abs(e.stageX - this.startPos.x) > 10 || Math.abs(e.stageY - this.startPos.y) > 10)
            {
                this.startPos.drag = true;
	wx3_function(8797);
                this.currentDrag.dispatchEventWith('start_drag',true,{x:e.stageX,y:e.stageY});
            }
        }
        if(this.startPos.drag)
        {
            if(!this.currentDrag.stopMove)
            {
                this.currentDrag.x = e.stageX-this.startPos.x + this.dragDes.x;
	wx3_function(3750);
                this.currentDrag.y = e.stageY-this.startPos.y + this.dragDes.y;

                if(this.currentDrag.drag_sp)   //移动范围
                {
                    var sp = this.currentDrag.drag_sp;
                    if(this.currentDrag.x < sp.x)
                        this.currentDrag.x = sp.x
                    else if(this.currentDrag.x > sp.x +  sp.width)
                        this.currentDrag.x = sp.x + sp.width

                    if(this.currentDrag.y < sp.y)
                        this.currentDrag.y = sp.y
                    else if(this.currentDrag.y > sp.y + sp.height)
                        this.currentDrag.y = sp.y +  sp.height
                }
            }
            this.currentDrag.dispatchEventWith('move_drag',true,{x:e.stageX,y:e.stageY});
	wx3_function(5767);
        }
    }

    public stopDrag(){
         this.onEnd_6318(null);
    }
	private wx3_functionX_12002(){console.log(270)}

    private onEnd_6318(e:egret.TouchEvent){
        if(this.startPos.drag && this.currentDrag)
        {
            this.currentDrag.dispatchEventWith('end_drag',true);
        }
        var currentDrag = this.currentDrag
        this.endDrag();
	wx3_function(3284);
        if(currentDrag)
        {
            currentDrag.dispatchEventWith('after_drag',true);
        }
    }

	private wx3_functionX_12003(){console.log(7624)}
    private onCancel_4849(e){
        e.preventDefault()
        console.log('cancel')
        GameManager_wx3.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_6318,this)
        GameManager_wx3.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_6318,this)
    }
	private wx3_functionX_12004(){console.log(8226)}

    public endDrag(){
        this.isDraging = false;
        GameManager_wx3.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_5935,this)
        GameManager_wx3.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_6318,this)
        GameManager_wx3.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onCancel_4849,this)
        if(this.currentDrag)
        {
            this.currentDrag = null;
	wx3_function(262);
        }
    }
}
