var PDate=(function(){
	var PDate=function(date){
		this.baseDate=date;
	}
	PDate.fn=PDate.prototype;
	PDate.fn.Date=function(){
		return this.baseDate||new Date;
	}
	PDate.fn.year=function(){return this.Date().getFullYear();}
	PDate.fn.month=function(){return this.Date().getMonth()+1;}
	PDate.fn.date=function(){return this.Date().getDate();}
	PDate.fn.second=PDate.fn.sec=function(){return this.Date().getSeconds();}
	PDate.fn.minute=PDate.fn.min=function(){return this.Date().getMinutes();}
	PDate.fn.hour=PDate.fn.hou=function(){return this.Date().getHours();}
	PDate.fn.millisecond=PDate.fn.msec=PDate.fn.millisec=function(){return this.Date().getMilliseconds();}
	PDate.fn.minus=function(number){
		return new PTime(this.Date()-number.Date());
	}
	PDate.fn.isLeapYear=PDate.fn.leap=function(){
		return this.year()%4==0&&this.year()%100!=0||this.year()%400==0
	}
	PDate.fn.day=function(language){
		var enDay=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var jaDay=["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"];
		if(language=="en") return enDay[this.Date().getDay()];
		else if(language=="ja"||language=="jp") return jaDay[this.Date().getDay()];
		else return this.Date().getDay();
	}
	PDate.fn.get=function(key){
		switch(key){
			case "year": return this.year();
			case "month": return this.month();
			case "date": return this.date();
			case "second": case "sec": return this.sec();
			case "minute": case "min": return this.min();
			case "hour": case "hou": return this.hou();
			case "millisecond": case "msec": case "millisec": return this.msec();
		}
		return 0;
	}
	PDate.fn.deg=function(key){
		//その時刻の際のアナログ時計の角度(度)
		switch(key){
			case "hour":case "hou":return ((this.hou()*3600000+this.min()*60000+this.sec()*1000+this.msec())/120000-90)//(360/12/60/60/1000*(this.hou()*60*60*1000+this.min()*60*1000+this.sec()*1000+this.msec())-90)
			case "min":case "minute":return ((this.min()*60000+this.sec()*1000+this.msec())/10000-90)//(360/60/60/1000*(this.min()*60*1000+this.sec()*1000+this.msec())-90)
			case "sec":case "second":return ((this.sec()*1000+this.msec())*3/500-90)//(360/60/1000*(this..sec()*1000+this.msec())-90)
			case "millisecond":case "msec":case "millisec":return (this.msec()*9/25-90)//(360/1000*(this.msec())-90)
			default:return false;
		}
	}
	PDate.fn.rad=function(key){
		//その時刻の際のアナログ時計の角度(ラジアン)。どちらかといえばこちらのほうが使いやすい。三角関数にそのまま渡せるし
		switch(key){
		case "hour":case "hou":return ((this.hou()*3600000+this.min()*60000+this.sec()*1000+this.msec())/120000-90)/180*Math.PI//(360/12/60/60/1000*(this.hou()*60*60*1000+this.min()*60*1000+this.sec()*1000+this.msec())-90)/180*Math.PI
		case "min":case "minute":return ((this.min()*60000+this.sec()*1000+this.msec())/10000-90)/180*Math.PI//(360/60/60/1000*(this.min()*60*1000+this.sec()*1000+this.msec())-90)/180*Math.PI
		case "sec":case "second":return ((this.sec()*1000+this.msec())*3/500-90)/180*Math.PI//(360/60/1000*(this..sec()*1000+this.msec())-90)/180*Math.PI
		case "millisecond":case "msec":case "millisec":return (this.msec()*9/25-90)/180*Math.PI//(360/1000*(this.msec())-90)/180*Math.PI
		default:return false;
		}
	}
	PDate.fn.show=function(str){
		var that=this;
		str=str.replace(/(\\*?)\[(yyyy|yy|mm|nn|dd|d|S|DD|D|hh|HH|H|milli3|milli2|milli1|m|s|a|A)\]/g,function(a,slashes,key){
			if(slashes.length%2==0) return a;
			switch(key){
				case "yyyy": return that.year()//4桁の年
				case "yy": return that.year().toString().slice(-2);//2桁の年
				case "mm": return ("00"+that.month()).slice(-2);//ゼロフィルありの月
				case "nn": return that.month;//ゼロフィルなしの月
				case "dd": return ("00"+that.date()).slice(-2);//ゼロフィルありの日付
				case "d": return that.date();//ゼロフィルなしの日付
				case "S":
					var ordinal=["st","nd","rd","th","th","th","th","th","th","th"];
					if(that.date()%100>10&&that.date()%100<20) return "th";
					else return ordinal[that.date()%10];//曜日の序数詞。1stみたいな
				case "DD": return that.day("en");//曜日フルスペル
				case "D": return that.day("en").toString().slice(0,3);//曜日短縮版
				case "hh": return ("00"+that.hour()%12).slice(-2);//ゼロフィルありの時間(12時間単位)
				case "HH": return ("00"+that.hour()).slice(-2);//ゼロフィルありの時間(24時間単位)
				case "h": return that.hour()%12;//ゼロフィルなしの時間(12時間単位)
				case "H": return that.hour();//ゼロフィルなしの時間(24時間単位)
				case "milli3": return ("0000"+that.msec()).slice(-3);//ゼロフィルありのミリ秒
				case "milli2": return ("0000"+that.msec()).slice(-2);//ゼロフィルありのミリ秒
				case "milli1": return ("0000"+that.msec()).slice(-1);//ゼロフィルありのミリ秒
				case "m": return ("00"+that.min()).slice(-2);//ゼロフィルありの分
				case "s": return ("00"+that.sec()).slice(-2);//ゼロフィルありの秒
				case "a": return that.hour<12?"am":"pm";//午前か午後か(小文字)
				case "A": return that.hour<12?"AM":"PM";//午前か午後か(大文字)
			}
		});
		return slashes+"["+str+"]"
	}
	return PDate;
})();
var PTime=(function(){
	var PTime=function(time){
		this.time=time
	}
	PTime.fn=PTime.prototype;
	PTime.fn.date=function(){
		return (this.time/86400000|0)>0?this.time/86400000|0:(this.time/86400000|0)*-1//this.time/1000/60/60/24
	}
	PTime.fn.second=PTime.fn.sec=function(){return ((this.time/1000)%60|0)>0?(this.time/1000)%60|0:((this.time/1000)%60|0)*-1;}//1000
	PTime.fn.minute=PTime.fn.min=function(){return ((this.time/60000)%60|0)>0?(this.time/60000)%60|0:((this.time/60000)%60|0)*-1;}//1000*60
	PTime.fn.hour=PTime.fn.hou=function(){return ((this.time/3600000)%12|0)>0?(this.time/3600000)%24|0:((this.time/3600000)%24|0)*-1;}//1000*60*60
	PTime.fn.millisecond=PTime.fn.msec=PTime.fn.millisec=function(){return this.time%1000}
	PTime.fn.only=function(key){
		switch(key){
			case "sec":case "second":return this.time/1000|0;
			case "min":case "minute":return this.time/60000|0;//60*1000
			case "hou":case "hour":return this.time/3600000|0;//60*60*1000
			case "millisecond":case "msec":case "millisec":return this.time;
		}
		return 0;
	}
	PTime.fn.show=function(str1,str2){
		//まだ時間になってないとき(カウントダウンしてる時)はstr1、時間が終わってる時(カウントアップしてる時)はstr2を変換して返す
		var str="";
		if(this.time>0) str=str1;
		else str=str2;
		var that=this;
		str=str.replace(/(\\*?)\[(d|HH|H|milli3|milli2|milli1|m|s)\]/g,function(a,slashes,key){
			if(slashes.length%2==0) return a;
			switch(key){
				case "d": return that.date();//ゼロフィルなしの日付
				case "HH": return ("00"+that.hour()).slice(-2);//ゼロフィルありの時間(24時間単位)
				case "H": return that.hour();//ゼロフィルなしの時間(24時間単位)
				case "milli3": return ("0000"+that.msec()).slice(-3);//ゼロフィルありのミリ秒
				case "milli2": return ("0000"+that.msec()).slice(-2);//ゼロフィルありのミリ秒
				case "milli1": return ("0000"+that.msec()).slice(-1);//ゼロフィルありのミリ秒
				case "m": return ("00"+that.min()).slice(-2);//ゼロフィルありの分
				case "s": return ("00"+that.sec()).slice(-2);//ゼロフィルありの秒
			}
		});
		return slashes+"["+str+"]"
		
	}
	return PTime;
})();