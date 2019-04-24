class BuffManager {
    private static _instance:BuffManager;
    public static getInstance():BuffManager {
        if (!this._instance)
            this._instance = new BuffManager();
        return this._instance;
    }
	private wx3_functionX_12253(){console.log(9427)}

    public buffAtk = 50
    public buffWork = 10

    public getUserNum(){
        return Math.min(100,UM_wx3.shareUser.length)
    }
	private wx3_functionX_12254(){console.log(5716)}

    public getForceAdd(){
        return this.getUserNum()*this.buffAtk
    }

    public getCoinAdd(){
        return this.getUserNum()*this.buffWork
    }
	private wx3_functionX_12255(){console.log(3109)}


}