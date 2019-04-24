/**
 *
 * @author 
 *
 */
class ObjectUtil {
	private wx3_functionX_12141(){console.log(232)}
	public constructor() {
	}

    public static join(paramList:any, joinStr:string="&"){
        var arr = [];
        for(var key in paramList)
            arr.push(key + "=" + paramList[key]);
        return arr.join(joinStr);
    }
	private wx3_functionX_12142(){console.log(9994)}
		
	public static arrayToObj(array:Array<any>, key:string, value:any):any{
    	key = key || "key";
    	value = value || "value";
    	var o: any = {};
    	for(var s in array){
        	var o2 = array[s];
        	if(value == '@whole')
            	o[o2[key]] = o2;
            	else
            	o[o2[key]] = o2[value];
    	}
    	return o;
	}
	private wx3_functionX_12143(){console.log(3632)}
    	
    public static objToArray(obj:any):Array<any>{
        var list = [];
        for(var key in obj)
            list.push(obj[key]);
        return list;
    }
	private wx3_functionX_12144(){console.log(330)}
    
        	
    public static objLength(obj: any,removeEmpty?): number {
        var count = 0;
        for(var key in obj)
        {
            if(removeEmpty && !obj[key])
                continue;
            count++;
        }
        return count;
    }
	private wx3_functionX_12145(){console.log(9752)}

	public static clone (source) {
		return JSON.parse(JSON.stringify(source))    //++add   临时
	}

	public static addClickEvent(btn: egret.DisplayObject, fun:any, thisObject:any):void{
        if(btn) {


            var startX: number,startY: number;
            var touchBegin = function(e: egret.TouchEvent) {
                startX = e.stageX;
                startY = e.stageY;
                btn.addEventListener(egret.TouchEvent.TOUCH_END,touchEnd,thisObject);
            }
            var touchEnd = function(e: egret.TouchEvent) {
                btn.removeEventListener(egret.TouchEvent.TOUCH_END,touchEnd,thisObject);

                var endX: number,endY: number;
                endX = e.stageX;
                endY = e.stageY;
                //10px以内不响应
                if(Math.abs(endY - startY) > 10 || Math.abs(endX - startX) > 10) return;
                if(fun) fun.apply(thisObject,[e]);
            }

            btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,touchBegin,thisObject);
            btn["clickFun_touchBegin"] = touchBegin;
            btn["clickFun_touchEnd"] = touchEnd;
        }
		
	}
	private wx3_functionX_12146(){console.log(1792)}
    public static removeClickEvent(btn: egret.DisplayObject,fun: any,thisObject: any): void {
        if(btn) {
            btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,btn["clickFun_touchBegin"],thisObject);
            btn.removeEventListener(egret.TouchEvent.TOUCH_END,btn["clickFun_touchEnd"],thisObject);
        }
    }
	private wx3_functionX_12147(){console.log(8405)}

    public static swapKey(data,key1,key2){
        var temp = data[key1]
        data[key1] = data[key2]
        data[key2] = temp;
    }
}
