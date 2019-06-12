/**
 *
 * @author 
 *
 */
class Config {
	private wx3_functionX_11819(){console.log(5141)}
	public constructor() {
	}

    public static isDebug: boolean = true;
    public static userHost: string = 'hangegame.com';
    public static host: string = 'hangegame.com';
	private wx3_functionX_11820(){console.log(3542)}
    public static pkServerHost: string = '172.17.196.195';
    public static pkServerPose = 9029;
    public static serverID: number = 1;
    //public static host: string = '172.17.196.195:90';
    public static user_version: number = 1;
    public static version: number = 1;
    public static displayVersion = '1.0.0';
	private wx3_functionX_11821(){console.log(9169)}
    public static pk_version: number = 1;
    public static cdn: string = "";
    public static localResRoot:string = "resource/game_assets/";
    public static localResRoot2:string = "resource/game_assets2/";

    public static adHeight = 0
	private wx3_functionX_11822(){console.log(492)}

    public static openRate = 10;


    public static wx_ad = 'adunit-ee0cef82e0740714';
    public static wx_video = 'adunit-68ddf5112545aa53';


    //public static friendLevel = 3;
    //public static gambleLevel = 20;
    //
    //
    //public static mapLevel = 5;
    //public static dayLevel = 15;
    //public static serverLevel = 25;//卡士二阶
    //public static serverEqualLevel = 45;  //卡士五阶
    //public static leaderLevel = 95;  //
    //public static leaderSkillLevel = 145;  //


	private wx3_functionX_11823(){console.log(4841)}
    public static platform = '';
    public static platformGameidAdd = '';
    public static equalValue = 1000;


    public static init(){

    }
	private wx3_functionX_11824(){console.log(8401)}

    private static createImg(name,path=''){
        return {
           "name":name.replace('.','_'),
           "type":"image",
           "url": path + name
       }
    }
	private wx3_functionX_11825(){console.log(1319)}
    private static createJSON(name,path=''){
        return {
           "name":name.replace('.','_'),
           "type":"json",
           "url": path + name
       }
    }
	private wx3_functionX_11826(){console.log(389)}

    public static initURLRequest() {
        //if(AppQU.isApp) return;

        var url = location.hash || location.search || "";
        var splitStr = location.hash ? '#' : '?';
        //        var obj = new Object();
        if(url.indexOf(splitStr) != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for(var i = 0;i < strs.length;i++) {
                _get[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }

        //if(ConfigQU.other){
        //    if(_get["iscloseSocket"]){
        //        ConfigQU.other.iscloseSocket = _get["iscloseSocket"];
        //        console.warn("设置了iscloseSocket：", _get["iscloseSocket"]);
        //    }
        //}
    }
	private wx3_functionX_11827(){console.log(3120)}

}

class _get {
    public constructor() {
    }
}

