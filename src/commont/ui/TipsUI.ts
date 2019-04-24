class TipsUI extends game.BaseContainer{
	private static instancePool = [];
	private static showTips = [];
	public static getInstance() {
		var instance = this.instancePool.pop()
		if (!instance)
			instance = new TipsUI();
		return instance;
	}
	private wx3_functionX_12218(){console.log(2551)}

    private text: eui.Label;

	private timer;
	public toY

	private wx3_functionX_12219(){console.log(2075)}
	public constructor() {
		super();
		this.skinName = 'TipsUISkin';
		this.touchChildren = this.touchEnabled = false;
	}

	private wx3_functionX_12220(){console.log(4543)}
	public show(v?,cd?){
		for(var i=0;i<TipsUI.showTips.length;i++)
		{
			var item =  TipsUI.showTips[i];
			item.toY -= 70
			egret.Tween.removeTweens(item);
	wx3_function(8689);
			var tw = egret.Tween.get(item);
			tw.to({y:item.toY},Math.abs(item.toY - item.y)*2);
		}
		TipsUI.showTips.push(this)
		egret.clearTimeout(this.timer);

	wx3_function(5587);

		//this.verticalCenter = 0;
		GameManager_wx3.stage.addChild(this);
		MyTool.setColorText(this.text,v);
		if(this.text.numLines > 1)
			this.text.textAlign = 'left'
		else
			this.text.textAlign = 'center'
		this.visible = false
		this.timer = egret.setTimeout(this.onTimer_8978,this,cd + (TipsUI.showTips.length-1)*100);
	wx3_function(6573);
		egret.setTimeout(function(){
			this.visible = true
		},this,(TipsUI.showTips.length-1)*100);

		this.validateNow();
		this.x =  (GameManager_wx3.stage.stageWidth -this.width)/2
		this.y =  GameManager_wx3.stage.stageHeight * 0.2;
	wx3_function(797);
		this.toY =  this.y;
	}

	private onTimer_8978(){
		this.hide();
	}
	private wx3_functionX_12221(){console.log(7575)}

	public hide(){
		egret.clearTimeout(this.timer);
		MyTool.removeMC(this);
		PopUpManager.testShape();
		TipsUI.instancePool.push(this)
		var index = TipsUI.showTips.indexOf(this)
		if(index != -1)
			TipsUI.showTips.splice(index,1)
	}
	private wx3_functionX_12222(){console.log(6105)}


}
