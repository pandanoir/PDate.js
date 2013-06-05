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
	PDate.fn.day=function(language){
		var enDay=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var jaDay=["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"];
		if(language=="en"){
		return enDay[this.Date().getDay()];
		}else if(language=="ja"||language=="jp"){
		return jaDay[this.Date().getDay()];
		}else{
		return this.Date().getDay();
		}
	}
	PDate.fn.deg=function(key){
		//その時刻の際のアナログ時計の角度(度)
		switch(key){
			case "hour":
			case "hou":
				return ((this.hou()*60*60*1000+this.min()*60*1000+this.sec()*1000+this.msec())/120000-90)//(360/12/60/60/1000*(this.hou()*60*60*1000+this.min()*60*1000+this.sec()*1000+this.msec())-90)
			case "min":
			case "minute":
				return ((this.min()*60*1000+this.sec()*1000+this.msec())/10000-90)//(360/60/60/1000*(this.min()*60*1000+this.sec()*1000+this.msec())-90)
			case "sec":
			case "second":
				return ((this.sec()*1000+this.msec())*3/500-90)//(360/60/1000*(this..sec()*1000+this.msec())-90)
			case "millisecond":
			case "msec":
			case "millisec":
				return (this.msec()*9/25-90)//(360/1000*(this.msec())-90)
			default:
				return false;
		}
	}
	PDate.fn.rad=function(key){
		//その時刻の際のアナログ時計の角度(ラジアン)。どちらかといえばこちらのほうが使いやすい。三角関数にそのまま渡せるし
		switch(key){
			case "hour":
			case "hou":
				return ((this.hou()*60*60*1000+this.min()*60*1000+this.sec()*1000+this.msec())/120000-90)/180*Math.PI//(360/12/60/60/1000*(this.hou()*60*60*1000+this.min()*60*1000+this.sec()*1000+this.msec())-90)/180*Math.PI
			case "min":
			case "minute":
				return ((this.min()*60*1000+this.sec()*1000+this.msec())/10000-90)/180*Math.PI//(360/60/60/1000*(this.min()*60*1000+this.sec()*1000+this.msec())-90)/180*Math.PI
			case "sec":
			case "second":
				return ((this.sec()*1000+this.msec())*3/500-90)/180*Math.PI//(360/60/1000*(this..sec()*1000+this.msec())-90)/180*Math.PI
			case "millisecond":
			case "msec":
			case "millisec":
				return (this.msec()*9/25-90)/180*Math.PI//(360/1000*(this.msec())-90)/180*Math.PI
			default:
				return false;
		}
	}
	PDate.fn.show=function(str){
		var result="";
		for(var i=0,j=str.length;i<j;i++){
			switch(str.charAt(i)){
			case "Y":
				result+=this.year()//4桁の年
				break;
			case "y":
				result+=this.year().toString().slice(-2)//2桁の年
				break;
			case "m":
				result+=("00"+this.month()).slice(-2)//ゼロフィルありの月
				break;
			case "n":
				result+=this.month()//ゼロフィルなしの月
				break;
			case "d":
				result+=("00"+this.date()).slice(-2)//ゼロフィルありの日付
				break;
			case "j":
				result+=this.date()//ゼロフィルなしの日付
				break;
			case "S":
				var ordinal=["st","nd","rd","th","th","th","th","th","th","th"];
				if(this.date()%100>10&&this.date()%100<20)result+="th";
				else result+=ordinal[this.date()%10];//曜日の序数詞。1stみたいな
				break;
			case "D":
				result+=this.day("en").toString().slice(0,3)//曜日短縮版
				break;
			case "l":
				result+=this.day("en")//曜日フルスペル
				break;
			case "w":
				result+=this.day()//曜日。数値
				break;
			case "g":
				result+=this.hour()%12//ゼロフィルなしの時間(12時間単位)
				break;
			case "G":
				result+=this.hour()//ゼロフィルなしの時間(24時間単位)
				break;
			case "h":
				result+=("00"+this.hour()%12).slice(-2)//ゼロフィルありの時間(12時間単位)
				break;
			case "H":
				result+=("00"+this.hour()).slice(-2)//ゼロフィルありの時間(24時間単位)
				break;
			case "i":
				result+=("00"+this.min()).slice(-2)//ゼロフィルありの分
				break;
			case "s":
				result+=("00"+this.sec()).slice(-2)//ゼロフィルありの秒
				break;
			case "a":
				result+= this.hour<12?"am":"pm";//午前か午後か(小文字)
				break;
			case "A":
				result+=this.hour<12?"AM":"PM";//午前か午後か(大文字)
				break;
			default:
				result+=str.charAt(i)
			}
		}
		return result
	}
	return PDate;
})();