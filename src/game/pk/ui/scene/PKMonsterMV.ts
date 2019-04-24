class PKMonsterMV_wx3 extends eui.Group {
    private static pool = [];
    public static createItem():PKMonsterMV_wx3{
        var item:PKMonsterMV_wx3 = this.pool.pop();
        if(!item)
        {
            item = new PKMonsterMV_wx3();
            item.touchChildren = item.touchEnabled =false;
        }
        return item;
    }
	private wx3_functionX_13006(){console.log(7392)}
    public static freeItem(item){
        if(!item)
            return;
        item.remove();
        if(this.pool.indexOf(item) == -1)
            this.pool.push(item);
    }
	private wx3_functionX_13007(){console.log(9832)}

    public monsterMV:MonsterMV
    //public heroMV:HeroMVItem
    public currentMV;
    public talkItm:PKTalkItem_wx3;
    public clickMC = new eui.Rect()

	private wx3_functionX_13008(){console.log(457)}
    public id;
    public set speed(v){
        this.currentMV.speed = v;
    }

    public get speed(){
        return this.currentMV.speed;
    }
	private wx3_functionX_13009(){console.log(8544)}

    public get state(){
        return this.currentMV.state;
    }

    public remove(){
        this.stop()
        MyTool.removeMC(this);
	wx3_function(1104);

        if(this.talkItm)
        {
            PKTalkItem_wx3.freeItem(this.talkItm)
            this.talkItm = null;
        }
    }
	private wx3_functionX_13010(){console.log(3009)}

    public showHeight(){
        return MonsterVO.getObject(this.id).height
    }
    public showWidth(){
        return MonsterVO.getObject(this.id).width
    }
	private wx3_functionX_13011(){console.log(1244)}
    private wx3_fun_asdfasdfasdf_3453(){}
    private wx3_fun_ast34_8450(){}

     public load(id){
         this.id = id;
         //if(id == 1)
         //    id = 101
         var vo = MonsterVO.getObject(id)
         if(this.currentMV)
             this.currentMV.stop();
	wx3_function(1062);
         MyTool.removeMC(this.currentMV)
         if(!this.monsterMV)
         {
             this.addChild(this.clickMC);
             this.clickMC.visible = false;
             this.monsterMV = new MonsterMV()
             this.monsterMV.addEventListener('mv_die',this.fireDie_7572,this)
         }
         this.clickMC.width = vo.width
         this.clickMC.height = vo.height
         this.clickMC.x = -vo.width/2
         this.clickMC.y = -vo.height
         this.currentMV = this.monsterMV;
	wx3_function(3150);
         this.addChild(this.monsterMV)
         this.monsterMV.load(id)
     }

    private fireDie_7572(){
        this.dispatchEventWith('mv_die')
    }
	private wx3_functionX_13012(){console.log(4446)}

     public reset(){
         this.currentMV.reset();
     }

     public play(){
         this.currentMV.play();
	wx3_function(4579);
     }

     public stop(){
         if(this.currentMV)
            this.currentMV.stop();
     }
	private wx3_functionX_13013(){console.log(1079)}

     public run(){
         this.currentMV.run();
     }

     public stand(){
         this.currentMV.stand();
	wx3_function(354);
     }

     public atk(){
         this.currentMV.atk();
     }

	private wx3_functionX_13014(){console.log(7633)}
     public die(){
         this.currentMV.die();
     }


    //public isTalking = 0
    public talk(gift?){
        if(this.talkItm)
        {
            PKTalkItem_wx3.freeItem(this.talkItm)
            this.talkItm = null;
	wx3_function(8570);
        }
        //this.isTalking = this.monsterMV.state
        //if([61,62,63,70,76].indexOf(this.id) == -1)
        //    this.atk();
        this.talkItm = PKTalkItem_wx3.createItem();
        this.talkItm.setData(this,gift,this.scaleX);
        this.addChild(this.talkItm);
        SoundManager_wx3.getInstance().playEffect('talk');
    }
	private wx3_functionX_13015(){console.log(3672)}

    public talkFinish(){
        //this.monsterMV.state = this.isTalking;
        //this.monsterMV.reset();
        //this.isTalking = 0;
    }
}