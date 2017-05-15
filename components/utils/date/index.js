module.exports = {
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // dateToStr(date,"yyyy-MM-dd hh:mm:ss.S") ==> 2016-07-02 08:09:04.423
    // dateToStr(date,"yyyy-M-d h:m:s.S")      ==> 2016-7-2 8:9:4.18
    dateToStr: function (date,fmt) {
        if(!(date instanceof Date)){
            return date||'';
        }

        var o = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;

    },

     //  yyyy/MM/dd hh:mm:ss兼容所有浏览器，yyyy-MM-dd hh:mm:ss有些浏览器不支持
     // zeroHour表示小时后面取 00：00：00
    //dataType  0 表示数字 1表示字符串
    dateStrToUnix:function(str,zeroHour,dataType){
        if(!str){
            return '';
        }
        str = str.replace(/-/g,'/');
        var date = new Date(str);
        if(zeroHour){
            var zeroDateStr = str.split(' ')[0] + ' 00:00:00';
            return new Date(zeroDateStr) * 1;
        }else{
            return new Date(str) * 1;
        }
    },

    dateToZeroUnix:function(date){
        if(!(date instanceof Date)){
            return date||'';
        }
        return this.dateStrToUnix(this.dateUnixToStr(date * 1,0),true)
    },

    //unix要为数字
    dateUnixToStr:function(unix,typeOrFmt){
        if(!unix){
            return '';
        }
        if(typeof unix == 'string'){
            return unix;
        }
        var date = new Date(unix),fmt = '';
        if(typeOrFmt != undefined){
            if(typeof typeOrFmt == 'number'){
                switch (typeOrFmt){
                    case 0:
                        fmt = 'yyyy-MM-dd';
                        break;
                    case 1:
                        fmt = 'yyyy-MM-dd hh:mm';
                        break;
                    case 2:
                        fmt = 'yyyy-MM-dd hh:mm';
                        break;
                    case 3:
                        fmt = 'yyyy-MM-dd hh:mm:ss';
                        break;
                    case 4:
                        fmt = 'yyyy/MM/dd';
                        break;
                    case 5:
                        fmt = 'yyyy/MM/dd hh:mm';
                        break;
                    case 6:
                        fmt = 'yyyy/MM/dd hh:mm';
                        break;
                    case 7:
                        fmt = 'yyyy/MM/dd hh:mm:ss';
                        break;
                    case 8:
                        fmt = 'yyyy年MM月dd';
                        break;
                    case 9:
                        fmt = 'yyyy年MM月dd hh:mm';
                        break;
                    case 10:
                        fmt = 'yyyy年MM月dd hh:mm';
                        break;
                    case 11:
                        fmt = 'yyyy年MM月dd hh:mm:ss';
                        break;
                    default :
                        fmt = 'yyyy-MM-dd hh:mm:ss';
                        break;
                }
            }else if(typeof typeOrFmt == 'string'){
                fmt = typeOrFmt;
            }
        }else{
            return unix;
        }

        return this.dateToStr(date,fmt)
    },

    //日期加减法
    //notZero 不转零时零分零秒
    dayDiff:function(date,dayDiff,notZero){
        var dateUnix = notZero?date * 1:this.dateToZeroUnix(date),
            newUnix = dateUnix + 86400000 * dayDiff;
        return new Date(newUnix);
    },

    //1 minute  60000
    //1 hour  3600000
    //1 day  86400000
    //1 year(365)  31536000000
    //1 year(366)  31622400000
    getNextDayStr:function(date){
        if(!(date instanceof Date)){
            return date||'';
        }
        var dateUnix = date * 1,
            newUnix = dateUnix + 86400000;
        return this.dateUnixToStr(newUnix,0);
    },

    getTheFirstDayOfMonth:function(date){
        if(!(date instanceof Date)){
            return date||'';
        }

        return new Date(date.getFullYear(),date.getMonth(),1);

    },

    getTheLastDayOfMonth:function(date){
        if(!(date instanceof Date)){
            return date||'';
        }

        return new Date(date.getFullYear(),date.getMonth(),0).getDate();
    },

    getTheDayOfNextYearStr:function(date){
        var dateUnix = date * 1,
            newUnix = dateUnix + 31536000000;
        return this.dateUnixToStr(newUnix,0);
    },

    getTheNextDayOfNextYearStr:function(date){
        if(!(date instanceof Date)){
            return date||'';
        }
        var dateUnix = date * 1,
            newUnix = dateUnix + 31536000000 + 86400000;
        return this.dateUnixToStr(newUnix,0);
    }


};