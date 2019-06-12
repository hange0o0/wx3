class AtkMVCtrl_wx3 {
    private static instance:AtkMVCtrl_wx3;

    public static getInstance() {
        if (!this.instance) this.instance = new AtkMVCtrl_wx3();
        return this.instance;
    }
	private wx3_functionX_12783(){console.log(2772)}

    public preLoadMV(id){
        AniManager_wx3.getInstance().preLoadMV(id)
    }
    public preLoadPNG(url){
        //RES.loadGroup([Config.localResRoot +url])
    }
	private wx3_functionX_12784(){console.log(2085)}
    public preLoadPNGLocal(url){
        //RES.loadGroup([url])
    }
    public playAniOn(id,mvid){
        if(!PKVideoCon_wx3.getInstance().stage)
            return;
        return PKVideoCon_wx3.getInstance().playAniOn(id,mvid)
    }
	private wx3_functionX_12785(){console.log(8321)}

    public mAtkMV(mid,user,target,actionTime,endTime){
        if(!PKVideoCon_wx3.getInstance().stage)
            return;
        if(this['atkMV' + mid + '_wx3'])
            this['atkMV' + mid + '_wx3'](user,target,actionTime,endTime)
    }
	private wx3_functionX_12786(){console.log(2921)}
    public mSkillMV(mid,user,target,actionTime,endTime){
        if(!PKVideoCon_wx3.getInstance().stage)
            return;
        if(this['skillMV' + mid + '_wx3'])
            this['skillMV' + mid + '_wx3'](user,target,actionTime,endTime)
    }
	private wx3_functionX_12787(){console.log(8343)}

    public sSkillMV(mid,target:PKMonsterData_wx3){
        if(!PKVideoCon_wx3.getInstance().stage)
            return;
        if(this['skillMV' + mid])
            this['skillMV' + mid](target)
    }




    ////////////////////////////////////////////////////////////////
    private atkMV1_wx3(user,target,actionTime,endTime){
        var mBase = MBase_wx3.getData(1)
       this.playAniOn(target.id,mBase.mvID1)
    }
	private wx3_functionX_12788(){console.log(9102)}


    private atkMV3_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        var item = PKBulletManager_wx3.getInstance().createBullet(userItem,targetItem,actionTime,endTime)
        var mc = item.mc;
	wx3_function(1629);
        mc.source = 'enemy3_attack_png'
        mc.anchorOffsetX = 55/2
        mc.anchorOffsetY = 30/2
        var tw = egret.Tween.get(mc,{loop:true});
        tw.to({rotation:360},300)
    }
	private wx3_functionX_12789(){console.log(1178)}

    //private atkMV10(user,target,actionTime,endTime){
    //    var mBase = MBase.getData(10)
    //    var mv = this.playAniOn(target.id,mBase.mvID1)
    //    if(mv)
    //    {
    //        mv.scaleX = mv.scaleY = 1;
    //        mv.x -= 10
    //        mv.y -= 30
    //        console.log( mv.scaleX)
    //    }
    //}

    private atkMV31_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        PKBulletManager_wx3.getInstance().createBullet(userItem,targetItem,actionTime,endTime,5)
    }
	private wx3_functionX_12790(){console.log(7587)}

    private atkMV32_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        PKBulletManager_wx3.getInstance().createBullet(userItem,targetItem,actionTime,endTime,7)
    }
	private wx3_functionX_12791(){console.log(1531)}

    private atkMV33_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        PKBulletManager_wx3.getInstance().createBullet(userItem,targetItem,actionTime,endTime,1)
    }
	private wx3_functionX_12792(){console.log(4973)}

    private atkMV34_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        PKBulletManager_wx3.getInstance().createBullet(userItem,targetItem,actionTime,endTime,3)
    }
	private wx3_functionX_12793(){console.log(2720)}

    private atkMV35_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        PKBulletManager_wx3.getInstance().createBullet(userItem,targetItem,actionTime,endTime,2)
    }
	private wx3_functionX_12794(){console.log(3125)}

    private atkMV38_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        PKBulletManager_wx3.getInstance().createBullet(userItem,targetItem,actionTime,endTime,9)
    }
	private wx3_functionX_12795(){console.log(5213)}
    private atkMV43_wx3(user,target,actionTime,endTime){
        var mBase = MBase_wx3.getData(43)
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        var mc:BulletAniMC_wx3 = <BulletAniMC_wx3>(PKBulletManager_wx3.getInstance().createBulletAni(userItem,targetItem,actionTime,endTime,mBase.mvID2))
        mc.needRota = false
        mc.targetOffsetY = target.getVO().height/2
        mc.mc.scaleX = mc.mc.scaleY = 0.6          //@ani scale
    }
	private wx3_functionX_12796(){console.log(3102)}

    private atkMV44_wx3(user,target,actionTime,endTime){
        var mBase = MBase_wx3.getData(44)
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        var mc:BulletAniMC_wx3 = <BulletAniMC_wx3>(PKBulletManager_wx3.getInstance().createBulletAni(userItem,targetItem,actionTime,endTime,mBase.mvID2))
        mc.needRota = false
        mc.targetOffsetY = target.getVO().height/2
        mc.mc.scaleX = mc.mc.scaleY = 0.6          //@ani scale
    }
	private wx3_functionX_12797(){console.log(2177)}

    private atkMV45_wx3(user,target,actionTime,endTime){
        var mBase = MBase_wx3.getData(45)
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        var mc:BulletAniMC_wx3 = <BulletAniMC_wx3>(PKBulletManager_wx3.getInstance().createBulletAni(userItem,targetItem,actionTime,endTime,mBase.mvID2))
        mc.needRota = false
        mc.targetOffsetY = target.getVO().height/2
        mc.mc.scaleX = mc.mc.scaleY = 0.6          //@ani scale
    }
	private wx3_functionX_12798(){console.log(644)}

    private atkMV46_wx3(user,target,actionTime,endTime){
        var mBase = MBase_wx3.getData(46)
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        var mc:BulletAniMC_wx3 = <BulletAniMC_wx3>(PKBulletManager_wx3.getInstance().createBulletAni(userItem,targetItem,actionTime,endTime,mBase.mvID2))
        mc.needRota = false
        mc.targetOffsetY = target.getVO().height/2
        mc.mc.scaleX = mc.mc.scaleY = 0.6          //@ani scale
    }
	private wx3_functionX_12799(){console.log(6607)}

    private atkMV47_wx3(user,target,actionTime,endTime){
        var mBase = MBase_wx3.getData(47)
        this.playAniOn(target.id,mBase.mvID1)
    }

	private wx3_functionX_12800(){console.log(8026)}
    private atkMV48_wx3(user,target,actionTime,endTime){
        var mBase = MBase_wx3.getData(48)
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        var mc = this.playAniOn(user.id,mBase.mvID1)
        if(mc)
        {
            mc.scaleY = 1;
	wx3_function(4141);
            if(userItem.x > targetItem.x)
            {
                mc.scaleX = -1
                mc.x -= 30
            }
            else
            {
                mc.scaleX = 1
                mc.x += 30
            }
            mc.y -= 70
        }
    }
	private wx3_functionX_12801(){console.log(924)}

    public atkMV61_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        egret.Tween.get(userItem).to({x:userItem.x + user.atkRota*50},300)
    }

	private wx3_functionX_12802(){console.log(1360)}
    public atkMV62_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        egret.Tween.get(userItem).to({x:userItem.x + user.atkRota*50},300)
    }

    public atkMV63_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
	wx3_function(6486);
        egret.Tween.get(userItem).to({x:userItem.x + user.atkRota*50},300)
    }

    public atkMV64_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
	wx3_function(8904);
        PKBulletManager_wx3.getInstance().createArrow(userItem,targetItem,actionTime,endTime)
    }

    public atkMV68_wx3(user,target,actionTime,endTime){
        var AM = AniManager_wx3.getInstance();
        var mc = AM.getImg( 'enemy68_attack_png');
	wx3_function(5718);
        mc.anchorOffsetX = 65/2
        mc.anchorOffsetY = 60/2
        var tw = egret.Tween.get(mc);
        tw.to({rotation:720},200).set({rotation:0}).to({rotation:720,scaleX:0.1,scaleY:0.1},100).call(()=>{
            AM.removeImg(mc);
        })
        var atker = PKVideoCon_wx3.getInstance().getItemByID(user.id)
        mc.x = atker.x + user.atkRota * 20
        mc.y = atker.y - 40
        atker.parent.addChildAt(mc,atker.parent.getChildIndex(atker) + 1);
        //PKVideoCon.getInstance().addMCOn(user.id,mc)
    }
	private wx3_functionX_12803(){console.log(8878)}

    public atkMV70_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        egret.Tween.get(userItem).to({x:userItem.x + user.atkRota*50},300)
    }

	private wx3_functionX_12804(){console.log(7262)}
    public atkMV72_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        var mc:BulletAniMC2_wx3 = <BulletAniMC2_wx3>(PKBulletManager_wx3.getInstance().createBulletAni2(userItem,targetItem,actionTime,endTime))
        mc.mc.anchorOffsetX = 560/4/2
        mc.mc.anchorOffsetY = 90
        mc.targetOffsetY = target.getVO().height/2
        if(userItem.x > targetItem.x)
            mc.mc.scaleX = 1
        else
            mc.mc.scaleX = -1
        mc.mc.load('enemy72_attack_png',0,560,90)
        mc.mc.play()
    }
	private wx3_functionX_12805(){console.log(5767)}

    public atkMV74_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        var mc:BulletAniMC2_wx3 = <BulletAniMC2_wx3>(PKBulletManager_wx3.getInstance().createBulletAni2(userItem,targetItem,actionTime,endTime))
        mc.mc.anchorOffsetX = 560/4/2
        mc.mc.anchorOffsetY = 90
        mc.targetOffsetY = target.getVO().height/2
        if(userItem.x > targetItem.x)
            mc.mc.scaleX = 1
        else
            mc.mc.scaleX = -1
        mc.mc.load('enemy72_attack_png',0,560,90)
        mc.mc.play()
    }
	private wx3_functionX_12806(){console.log(1502)}

    public atkMV75_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = {
            x: user.x + user.atkRota * user.getSkillValue(1),
            y:user.y
        }
        PKBulletManager_wx3.getInstance().createBulletLine(userItem,targetItem,actionTime,endTime,'pk_arrow_1_png')
    }
	private wx3_functionX_12807(){console.log(3751)}

    public atkMV76_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        egret.Tween.get(userItem).to({x:userItem.x + user.atkRota*50},300)
    }

	private wx3_functionX_12808(){console.log(7968)}
    public atkMV111_wx3(user,target,actionTime,endTime){
        var mBase = MBase_wx3.getData(111)
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        var mc = this.playAniOn(user.id,mBase.mvID1)
        if(mc)
        {
            mc.scaleY = 1;
	wx3_function(911);
            if(userItem.x > targetItem.x)
            {
                mc.scaleX = -1
                mc.x -= user.atkX
            }
            else
            {
                mc.scaleX = 1
                mc.x += user.atkX
            }
            mc.y -= 90
        }
    }
	private wx3_functionX_12809(){console.log(2867)}
    public atkMV112_wx3(user,target,actionTime,endTime){
        var mBase = MBase_wx3.getData(112)
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        var mc = this.playAniOn(user.id,mBase.mvID1)
        if(mc)
        {
            mc.scaleY = 1;
	wx3_function(6126);
            if(userItem.x > targetItem.x)
            {
                mc.scaleX = -1
                mc.x -= user.atkX
            }
            else
            {
                mc.scaleX = 1
                mc.x += user.atkX
            }
            mc.y -= 90
        }
    }
	private wx3_functionX_12810(){console.log(4190)}


    ////////////////////////////////////////////////////////////////
    public skillMV1_wx3(user,target,actionTime,endTime){
        this.atkMV1_wx3(user,target,actionTime,endTime)
    }

	private wx3_functionX_12811(){console.log(8215)}
    public skillMV3_wx3(user,target,actionTime,endTime){
        this.atkMV3_wx3(user,target,actionTime,endTime)
    }

    public skillMV8_wx3(user,target,actionTime,endTime){
        var mBase = MBase_wx3.getData(8)
        this.playAniOn(target.id,mBase.mvID1)
    }
	private wx3_functionX_12812(){console.log(9678)}

    //技能动画
    public skillMV10_wx3(user,target,actionTime,endTime){
        var mBase = MBase_wx3.getData(10)
        var mv = this.playAniOn(target.id,mBase.mvID1)
        if(mv)
        {
            //mv.scaleX = mv.scaleY = 0.8;
            //mv.x -= 10
            mv.y -= 40
        }

    }
	private wx3_functionX_12813(){console.log(5692)}

    private skillMV38_wx3(user,target,actionTime,endTime){
        var userItem = PKVideoCon_wx3.getInstance().getItemByID(user.id);
        var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
        PKBulletManager_wx3.getInstance().createBullet(userItem,targetItem,actionTime,endTime,10)
    }
	private wx3_functionX_12814(){console.log(5704)}






	private wx3_functionX_12815(){console.log(3556)}

    ////////////////////////////////////////////////////////////////
    //public skillMV101(user,target,actionTime,endTime){
    //    var mBase = MBase_wx3.getData(101)
    //    if(user.useingHeroSkill == 4)
    //        this.playAniOn(target.id,mBase.mvID1)
    //}
    //public skillMV102(user,target,actionTime,endTime){
    //    //var userItem = PKVideoCon.getInstance().getItemByID(user.id);
    //    //var targetItem = PKVideoCon.getInstance().getItemByID(target.id);
    //    //PKBulletManager.getInstance().createArrow(userItem,targetItem,actionTime,endTime)
    //
    //    //var userItem = PKVideoCon.getInstance().getItemByID(user.id);
    //    var targetItem = PKVideoCon_wx3.getInstance().getItemByID(target.id);
    //    var id = [1,6,3,2,5][Math.min(4,user.level)]
    //    PKBulletManager_wx3.getInstance().createBullet(null,targetItem,actionTime,endTime,id)
    //}
    //
    //public skillMV108(user,target,actionTime,endTime){
    //    var mBase = MBase_wx3.getData(108)
    //    if(user.useingHeroSkill == 3 || user.useingHeroSkill == 2)
    //        this.playAniOn(target.id,mBase.mvID1)
    //}
    //
    ////技能动画
    //public skillMV116(user,target,actionTime,endTime){
    //    var mBase = MBase_wx3.getData(116)
    //    if(user.useingHeroSkill == 3 || user.useingHeroSkill == 4)
    //    {
    //        var mv = this.playAniOn(target.id,mBase.mvID1)
    //        mv && (mv.y -= 40);
    //    }
    //}
    //
    //public skillMV114(user,target,actionTime,endTime){
    //    var mBase = MBase_wx3.getData(114)
    //    var mvMC = this.playAniOn(target.id,mBase.mvID1)
    //    mvMC.y -= target.getVO().height/2
    //}

}