class PKTool_wx3 {
    //取攻击属性的相克
    public static getAtkRate(atkType,defType){
        if(defType == 0 || atkType == 0)
            return 1;
        var des = Math.abs(atkType - defType)
        if(des == 0)
            return 1;
        if(des == 1)
        {
            if(atkType< defType)
                return 1.5;
            return 0.8;
        }
        if(atkType > defType)
            return 1.5;
        return 0.8;
    }
}