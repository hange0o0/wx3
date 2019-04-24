class PKAddState_wx3 extends game.BaseItem {
    private static pool = [];
    public static createItem():PKAddState_wx3{
        var item:PKAddState_wx3 = this.pool.pop();
        if(!item)
        {
            item = new PKAddState_wx3();
        }
        return item;
    }
	private wx3_functionX_12986(){console.log(1963)}
    public static freeItem(item){
        if(!item)
            return;
        item.remove();
        if(this.pool.indexOf(item) == -1)
            this.pool.push(item);
    }
	private wx3_functionX_12987(){console.log(7165)}

    public static fillStateMC(mc,type){
        switch(type)
        {
            case 'atk+':
                mc.source = 'buff_1_png';
                break;
            case 'atk-':
                mc.source = 'buff_11_png';
                break;

            case 'speed+':
                mc.source = 'buff_2_png';
                break;
            case 'speed-':
                mc.source = 'buff_12_png';
                break;

            case 'def+':
                mc.source = 'buff_3_png';
                break;
            case 'def-':
                mc.source = 'buff_13_png';
                break;

            case 'hp+':
                mc.source = 'buff_5_png';
                break;
            case 'hp-':
                mc.source = 'buff_15_png';
                break;


            case 'momian':
                mc.source = 'buff_31_png';
                break;
            case 'ill':
                mc.source = 'buff_25_png';
                break;
            case 'reborn':
                mc.source = 'buff_41_png';
                break;
            default:
                throw new Error('1111')
        }
    }
	private wx3_functionX_12988(){console.log(9643)}

    private stateMC: eui.Image;
    public constructor() {
        super();

        this.skinName = "PKAddStateSkin";
	wx3_function(4188);
    }

    private wx3_fun_asdfasdfasdf_8067(){}
    private wx3_fun_ast34_9203(){}
    public childrenCreated() {
        super.childrenCreated();
	wx3_function(3962);
        this.anchorOffsetX = 16
    }

    public dataChanged(){
    }

	private wx3_functionX_12989(){console.log(2602)}
    public remove(){
        egret.Tween.removeTweens(this)
        MyTool.removeMC(this);
    }

    public show(type,parent:PKMonsterItem_wx3,delay){
        this.alpha = 0;
	wx3_function(5791);
        PKAddState_wx3.fillStateMC(this.stateMC,type);
        egret.Tween.get(this).wait(delay).to({y:this.y - 40},800)
        egret.Tween.get(this).wait(delay).to({alpha:1}).wait(500).to({alpha:0},300).call(()=>{
            parent.removeAddState(this);
        })
    }
}