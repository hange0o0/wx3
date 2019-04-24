class EventManager_wx3 extends egret.EventDispatcher {
    
    private static _instance: EventManager_wx3;
    
    public static getInstance():EventManager_wx3{
        if(!EventManager_wx3._instance)
            EventManager_wx3._instance = new EventManager_wx3();
        return EventManager_wx3._instance;
    }
	private wx3_functionX_11981(){console.log(249)}
        
	public constructor() {
        super();
	}
	public dispatch(type:string, data?:any){
        EventManager_wx3.getInstance().dispatchEventWith(type, false, data);
	wx3_function(4019);
	}
	public addEvent(type:string, func:Function, thisObj:any){
    	  EventManager_wx3.getInstance().addEventListener(type, func, thisObj);
	}
    public removeEvent(type: string, func: Function, thisObj: any) {
        EventManager_wx3.getInstance().removeEventListener(type, func, thisObj);
	wx3_function(5708);
    }

}

