class SBase {
    private static baseData = {};

    //ID是由200开始，所以要
    public static getData(id):SBase {
        if (!this.baseData[id]) {
            var myClass = this.getClass(id)
            this.baseData[id] = new myClass();
            this.baseData[id].id = id
        }
        return this.baseData[id];
    }

    public static getClass(id){
        switch (Math.floor(id)){
            case 201:return S201;
            case 202:return S202;
            case 203:return S203;
            case 204:return S204;
            case 205:return S205;
            case 206:return S206;
            case 210:return S210;
            case 211:return S211;
            case 216:return S216;
            case 219:return S219;
            case 220:return S220;
            case 221:return S221;
            case 222:return S222;
            case 223:return S223;
            case 224:return S224;
            case 226:return S226;
            case 235:return S235;
            case 236:return S236;
            case 237:return S237;
            case 241:return S241;
            case 242:return S242;
            case 243:return S243;
            case 244:return S244;
            case 245:return S245;
            case 248:return S248;
            case 252:return S252;
            case 256:return S256;
            case 259:return S259;
            case 262:return S262;
            case 264:return S264;
            case 276:return S276;
            case 277:return S277;
            case 278:return S278;
            case 313:return S313;
            case 315:return S315;
            case 316:return S316;
            case 317:return S317;
            case 319:return S319;
            case 320:return S320;
            case 322:return S322;
            case 323:return S323;
            case 324:return S324;
            case 401:return S401;
            case 402:return S402;
            case 403:return S403;
            case 404:return S404;
            case 405:return S405;
            case 406:return S406;
            case 407:return S407;

        }
    }


    public skillTimes = 1;//技能

    public mvID1
    public mvID2

    public type = 'skill'
    public id

    constructor() {
    }




    //技能动画
    public skillMV(target:PKMonsterData_wx3){
        AtkMVCtrl_wx3.getInstance().sSkillMV(this.id,target)
    }

    //生效时的逻辑
    public onSkill(player){
         return [];
    }



    //////////////////////////////////////////////////上面的为要设的内容

    public getSkillValue(skillID,index,needForce=false){
        var PD = PKData_wx3.getInstance();
        return SkillVO.getObject(skillID).getSkillValue(index,needForce?TecManager.getInstance().getTecLevel(41):0)
    }

    //通用的召唤方法
    public addMonsterSkill(player,skillID,mid,type=0,noSkill?){
        var PD = PKData_wx3.getInstance();
        var owner = player
        var atkRota = owner.teamData.atkRota;
        var item = null;
        if(type == 1)//我方前线
            item = PKData_wx3.getInstance().getFirstItem(owner.teamData.id);
        else if(type == 2)//敌人后方
            item = PKData_wx3.getInstance().getBackItem(owner.teamData.enemy.id);
        var x:any;
        if(item)
        {
            x = item.x + PD.rand(-10,10);
        }
        else
        {
            x = atkRota == PKConfig_wx3.ROTA_LEFT ? PKConfig_wx3.appearPos:PKConfig_wx3.floorWidth + PKConfig_wx3.appearPos;
        }
        var num = this.getSkillValue(skillID,1);
        var cd = this.getSkillValue(skillID,2)*1000;
        for(var i=0;i<num;i++)
        {
            var mData = owner.getMonsterCreateData({
                mid:mid,
                x:x,
                lastSkill:Number.MAX_VALUE,
                dieTime:PD.actionTime + cd
            })

            if(noSkill)
                mData.lastSkill = Number.MAX_VALUE
            PD.addMonster(mData);
        }
        return [];
    }

    //实现技能
    public skill(){
        //var svo = SkillVO.getObject(user.mid);

        var targets = this.onSkill(PKData_wx3.getInstance().getPlayer(2));//玩家默认是2号位
        if(targets)
        {
            for(var i=0;i<targets.length;i++)
            {
                this.skillMV(targets[i]);//技能动画
            }
        }
    }



}