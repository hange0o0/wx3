class ADIconManager {
    private static instance:ADIconManager;

    public static getInstance() {
        if (!this.instance) this.instance = new ADIconManager();
        return this.instance;
    }


    private list = [
        'PBgAAF1iShcT5I0A',
        'PBgAAF1iShcewBQA',
        'PBgAAF1iShcbrqws',
        'PBgAAF1iShcGRhI0',
        'PBgAAF1iShcBq9EU'
    ];

    public iconObj = {};
    public showingList = [];

    private isHideAll = false

    public isHaveIcon(key){
        return  this.iconObj[key]
    }

    public init(){
        if(!Config.isWX)
            return
        var wx = window['wx'];
        if (wx.createGameIcon) {

            /////////////////////////////////////////
            var addY = 130;
            this.iconObj['result'] = wx.createGameIcon({
                adUnitId: this.list.pop(),
                count:4,
                style:[this.getStyle(10,addY),this.getStyle(10,addY + 150),this.getStyle(510,addY),this.getStyle(510,addY + 150)]
            })


            /////////////////////////////////////////
            var styleArr = [];
            var startY = (GameManager_wx3.uiHeight - 660)/2 + 85 - 20
            var startX = (640 - 400)/2 - 20
            for(var i=0;i<3;i++)
            {
                for(var j=0;j<3;j++)
                {
                    styleArr.push(this.getStyle(startX+i*150,startY+j*150))
                }
            }
            this.iconObj['changeJump'] = wx.createGameIcon({
                adUnitId: this.list.pop(),
                count:9,
                style:styleArr
            })


            /////////////////////////////////////////
            var styleArr = [];
            var startY = GameManager_wx3.uiHeight - 420
            var startX = (640 - 550)/2 - 20
            for(var i=0;i<4;i++)
            {
                for(var j=0;j<2;j++)
                {
                    var style = this.getStyle(startX+i*150,startY+j*150)
                    style.color = '#000000'
                    styleArr.push(style)
                }
            }
            this.iconObj['loading'] = wx.createGameIcon({
                adUnitId: this.list.pop(),
                count:8,
                style:styleArr
            })
        }
    }

    private getStyle(x,y){
        let scalex = screen.availWidth/640;
        return {
            appNameHidden:false,
            color:'#FFFFFF',
            size:100*scalex,
            borderWidth:0,
            borderColor:0,
            left:x*scalex,
            top:(y+GameManager_wx3.paddingTop())*scalex,
        }
    }


    public showIcon(name){
        this.hideAll();
        var iconAd = this.iconObj[name]
        if(iconAd)
        {
            this.isHideAll = false;
            iconAd.load().then(() => {
                if(this.isHideAll)
                    return;
                iconAd.show();
                this.showingList.push(iconAd);
            }).catch((err) => {
                console.error(err)
            })
            return true;
        }
        return false;
    }

    public hideAll(){
        this.isHideAll = true;
        for(var s in this.showingList)
        {
            var icon = this.showingList[s];
            icon.hide();
        }
        this.showingList.length = 0;
    }
}
