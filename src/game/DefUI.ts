class DefUI extends game.BaseItem{

    private con: eui.Group;
    private bg: eui.Image;
    private numText: eui.Label;
    private desText: eui.Label;
    private setBtn: eui.Image;
    private redMC: eui.Image;



    public constructor() {
        super();
        this.skinName = "DefUISkin";
    }

    public monsterArr = [];

    public childrenCreated() {
        super.childrenCreated();
        this.desText.text = '防守阵容'
        this.addBtnEvent(this.setBtn,this.onSet)
    }

    private onSet(){

    }


    public dataChanged():void {
        while(this.monsterArr.length > 0)
        {
            PKMonsterMV.freeItem(this.monsterArr.pop());
        }
        var teamCost = TecManager.getInstance().getTeamCost();
        var teamNum = TecManager.getInstance().getTeamNum();

        var arr = MonsterManager.getInstance().defList;
        var cost = 0;

        var des = Math.min(500/(arr.length-1),80)
        var begin = (640-des*(arr.length-1))/2
        for(var i=0;i<arr.length;i++)
        {
            var id = arr[i].id;
            var vo = MonsterVO.getObject(id);
            cost += vo.cost;
            var item = PKMonsterMV.createItem();
            this.con.addChild(item);
            item.load(id)
            item.stand();
            item.scaleX = item.scaleY = 1;
            item.bottom = 30+vo.height*0.5 - 3 + 6*Math.random()// + Math.random()*80
            item['w'] = vo.width
            item.x = begin + i*des
            this.monsterArr.push(item);
        }

        var sortList = this.monsterArr.concat();
        ArrayUtil.sortByField(sortList,['bottom','w'],[1,1]);
        for(var i=0;i<sortList.length;i++)
        {
            this.con.addChild(sortList[i]);
        }

        this.bg.source = PKManager.getInstance().getDefBG()

        this.numText.text = 'num:' + arr.length + '/'+ teamNum  + '  cost: ' + cost + '/' + teamCost

        this.redMC.visible = arr.length < teamNum || cost < teamCost;
    }

    public onE(){

    }


}