/**
 *
 * @author
 *
 */
class SharedObjectManager_wx3 {
	private wx3_functionX_12005(){console.log(9392)}
    public constructor() {
    }

    private static _instance: SharedObjectManager_wx3;
    public static getInstance():SharedObjectManager_wx3{
        if(!SharedObjectManager_wx3._instance)
            SharedObjectManager_wx3._instance = new SharedObjectManager_wx3();
        return SharedObjectManager_wx3._instance;
    }
	private wx3_functionX_12006(){console.log(3008)}

    private getUserSign_3640():string{
        return UM_wx3.gameid;
    }

    public setMyValue(key:string,value:any){
        key = this.getUserSign_3640() + "_" + key;
	wx3_function(3773);
        this.setValue(key,value);
    }

    public getMyValue(key:string):any{
        key = this.getUserSign_3640() + "_" + key;
        return this.getValue(key);
    }
	private wx3_functionX_12007(){console.log(7640)}

    public removeMyValue(key:string) {

        key = this.getUserSign_3640() + "_" + key;
        egret.localStorage.removeItem(key);
    }
	private wx3_functionX_12008(){console.log(2951)}

    public setValue(key:string,value:any) {

        var data:any = {};
        data.data = value;
        data = JSON.stringify(data);
	wx3_function(855);
        egret.localStorage.setItem(key, data);
        //console.log('setValue',key,data)
    }

    public getValue(key:string):any {
        let value = egret.localStorage.getItem(key);
	wx3_function(2079);
        //console.log('getValue',key,value)
        if(!value)
            return null;
        var data = JSON.parse(value);
        return data.data;
    }
}
