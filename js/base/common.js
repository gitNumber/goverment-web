// JavaScript Document
//设为首页和加入收藏
function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
function SetHome(obj,vrl){
        try{
                obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
        }
        catch(e){
                if(window.netscape) {
                        try {
                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                        }
                        catch (e) {
                   alert("抱歉！您的浏览器不支持直接设为首页。请在浏览器地址栏输入'about:config'并回车然后将[signed.applets.codebase_principal_support]设置为'true',点击'加入收藏'后忽略安全提示，即可设置成功。");   
                        }
                        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                        prefs.setCharPref('browser.startup.homepage',vrl);
                 }
        }
}

//设置为首页
function SetHome(obj,vrl){ 
        try{ 
                obj.style.behavior='url(#default#homepage)';
				obj.setHomePage(vrl); 
        } 
        catch(e){ 
			if(window.netscape) { 
				try { 
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");   
				}   
				catch (e){ 
					alert("抱歉！您的浏览器不支持直接设为首页。请在浏览器地址栏输入'about:config'并回车然后将[signed.applets.codebase_principal_support]设置为'true',点击'加入收藏'后忽略安全提示，即可设置成功。");   
				} 
				var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch); 
				prefs.setCharPref('browser.startup.homepage',vrl); 
			 } 
        } 
} 


//页签切换效果
//function setTab(name,cursel,n){
//	for(i=1;i<=n;i++){
//		var menu=$("#"+name+i);
//		var con=$("#con_"+name+"_"+i);		
//		if(i==cursel)
//		{
//			$(menu).addClass("hover");
//			$(con).fadeTo("slow", 1);
//		}
//		else
//		{
//			$(menu).removeClass("hover");
//			$(con).hide();
//		}
//	}
//}


function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
		var menu=$("#"+name+i);
		var con=$("#con_"+name+"_"+i);		
		if(i==cursel)
		{
			$(menu).addClass("hover");
			$(con).removeClass("hidden");
		}
		else
		{
			$(menu).removeClass("hover");
			$(con).addClass("hidden");
		}
	}
}



//内容页中的图片,以宽以基准等比缩放
//doImg 内容字段图片对像
//width页面内图片最大允许的宽度
function pic_reset(doImg,width) {    
	if($(doImg).width()>width)
	{
		var w = $(doImg).width();
		var h = $(doImg).height();
		$(doImg).width(width);
		$(doImg).height(h/(w/width));
		$(doImg).click( function () { window.open($(doImg).attr("src")); });
		$(doImg).css("cursor","pointer");
		$(doImg).attr("title","点击查看原始图片");
	}
}





//日历：2011年9月29日 星期四 农历：辛卯年 九月初三 
//用法：$("#rili").txt(RunGLNL());
function RunGLNL(){ 
	var today=new Date(); 
	var d=new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); 
	var DDDD=(today.getFullYear()<100 ? 
	today.getFullYear()+1900:today.getFullYear())+"年"+(today.getMonth()+1)+"月"+today.getDate()+"日"; 
	//alert(today.getFullYear());
	DDDD = DDDD + " " + d[today.getDay()]; 
	DDDD = DDDD+ " " + (CnDateofDateStr(today)); 
	DDDD = DDDD+ " " + SolarTerm(today); 
	//document.write(DDDD); 
	return DDDD;
	
} 
function DaysNumberofDate(DateGL){ 
	return parseInt((Date.parse(DateGL)-Date.parse(DateGL.getFullYear()+"/1/1"))/86400000)+1; 
} 
function CnDateofDate(DateGL){ 
	var CnData=new Array( 
	0x16,0x2a,0xda,0x00,0x83,0x49,0xb6,0x05,0x0e,0x64,0xbb,0x00,0x19,0xb2,0x5b,0x00, 
	0x87,0x6a,0x57,0x04,0x12,0x75,0x2b,0x00,0x1d,0xb6,0x95,0x00,0x8a,0xad,0x55,0x02, 
	0x15,0x55,0xaa,0x00,0x82,0x55,0x6c,0x07,0x0d,0xc9,0x76,0x00,0x17,0x64,0xb7,0x00, 
	0x86,0xe4,0xae,0x05,0x11,0xea,0x56,0x00,0x1b,0x6d,0x2a,0x00,0x88,0x5a,0xaa,0x04, 
	0x14,0xad,0x55,0x00,0x81,0xaa,0xd5,0x09,0x0b,0x52,0xea,0x00,0x16,0xa9,0x6d,0x00, 
	0x84,0xa9,0x5d,0x06,0x0f,0xd4,0xae,0x00,0x1a,0xea,0x4d,0x00,0x87,0xba,0x55,0x04 
	); 
	var CnMonth=new Array(); 
	var CnMonthDays=new Array(); 
	var CnBeginDay; 
	var LeapMonth; 
	var Bytes=new Array(); 
	var I; 
	var CnMonthData; 
	var DaysCount; 
	var CnDaysCount; 
	var ResultMonth; 
	var ResultDay; 
	var yyyy=DateGL.getFullYear(); 
	var mm=DateGL.getMonth()+1; 
	var dd=DateGL.getDate(); 
	if(yyyy<100) yyyy+=1900; 
	if ((yyyy < 1997) || (yyyy > 2020)){ 
	return 0; 
	} 
	Bytes[0] = CnData[(yyyy - 1997) * 4]; 
	Bytes[1] = CnData[(yyyy - 1997) * 4 + 1]; 
	Bytes[2] = CnData[(yyyy - 1997) * 4 + 2]; 
	Bytes[3] = CnData[(yyyy - 1997) * 4 + 3]; 
	if ((Bytes[0] & 0x80) != 0) {CnMonth[0] = 12;} 
	else {CnMonth[0] = 11;} 
	CnBeginDay = (Bytes[0] & 0x7f); 
	CnMonthData = Bytes[1]; 
	CnMonthData = CnMonthData << 8; 
	CnMonthData = CnMonthData | Bytes[2]; 
	LeapMonth = Bytes[3]; 
	for (I=15;I>=0;I--){ 
	CnMonthDays[15 - I] = 29; 
	if (((1 << I) & CnMonthData) != 0 ){ 
	CnMonthDays[15 - I]++;} 
	if (CnMonth[15 - I] == LeapMonth ){ 
	CnMonth[15 - I + 1] = - LeapMonth;} 
	else{ 
	if (CnMonth[15 - I] < 0 ){CnMonth[15 - I + 1] = - CnMonth[15 - I] + 1;} 
	else {CnMonth[15 - I + 1] = CnMonth[15 - I] + 1;} 
	if (CnMonth[15 - I + 1] > 12 ){ CnMonth[15 - I + 1] = 1;} 
	} 
	} 
	DaysCount = DaysNumberofDate(DateGL) - 1; 
	if (DaysCount <= (CnMonthDays[0] - CnBeginDay)){ 
	if ((yyyy > 1901) && (CnDateofDate(new Date((yyyy - 1)+"/12/31")) < 0)){ 
	ResultMonth = - CnMonth[0];} 
	else {ResultMonth = CnMonth[0];} 
	ResultDay = CnBeginDay + DaysCount; 
	} 
	else{ 
	CnDaysCount = CnMonthDays[0] - CnBeginDay; 
	I = 1; 
	while ((CnDaysCount < DaysCount) && (CnDaysCount + CnMonthDays[I] < DaysCount)){ 
	CnDaysCount+= CnMonthDays[I]; 
	I++; 
	} 
	ResultMonth = CnMonth[I]; 
	ResultDay = DaysCount - CnDaysCount; 
	} 
	if (ResultMonth > 0){ 
	return ResultMonth * 100 + ResultDay;} 
	else{return ResultMonth * 100 - ResultDay;} 
} 
function CnYearofDate(DateGL){ 
	var YYYY=DateGL.getFullYear(); 
	var MM=DateGL.getMonth()+1; 
	var CnMM=parseInt(Math.abs(CnDateofDate(DateGL))/100); 
	if(YYYY<100) YYYY+=1900; 
	if(CnMM>MM) YYYY--; 
	YYYY-=1864; 
	return CnEra(YYYY)+"年"; 
} 
function CnMonthofDate(DateGL){ 
	var CnMonthStr=new Array("零","正","二","三","四","五","六","七","八","九","十","十一","腊"); 
	var Month; 
	Month = parseInt(CnDateofDate(DateGL)/100); 
	if (Month < 0){return "闰" + CnMonthStr[-Month] + "月";} 
	else{return CnMonthStr[Month] + "月";} 
} 
function CnDayofDate(DateGL){ 
	var CnDayStr=new Array("零", 
	"初一", "初二", "初三", "初四", "初五", 
	"初六", "初七", "初八", "初九", "初十", 
	"十一", "十二", "十三", "十四", "十五", 
	"十六", "十七", "十八", "十九", "二十", 
	"廿一", "廿二", "廿三", "廿四", "廿五", 
	"廿六", "廿七", "廿八", "廿九", "三十"); 
	var Day; 
	Day = (Math.abs(CnDateofDate(DateGL)))%100; 
	return CnDayStr[Day]; 
} 
function DaysNumberofMonth(DateGL){ 
	var MM1=DateGL.getFullYear(); 
	MM1<100 ? MM1+=1900:MM1; 
	var MM2=MM1; 
	MM1+="/"+(DateGL.getMonth()+1); 
	MM2+="/"+(DateGL.getMonth()+2); 
	MM1+="/1"; 
	MM2+="/1"; 
	return parseInt((Date.parse(MM2)-Date.parse(MM1))/86400000); 
} 
function CnEra(YYYY){ 
	var Tiangan=new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸"); 
	//var Dizhi=new Array("子(鼠)","丑(牛)","寅(虎)","卯(兔)","辰(龙)","巳(蛇)", 
	//"午(马)","未(羊)","申(猴)","酉(鸡)","戌(狗)","亥(猪)"); 
	var Dizhi=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"); 
	return Tiangan[YYYY%10]+Dizhi[YYYY%12]; 
} 
function CnDateofDateStr(DateGL){ 
	if(CnMonthofDate(DateGL)=="零月") return "　请调整您的计算机日期!"; 
	else return "农历："+CnYearofDate(DateGL)+ " " + CnMonthofDate(DateGL) + CnDayofDate(DateGL); 
} 
function SolarTerm(DateGL){ 
	var SolarTermStr=new Array( 
	"小寒","大寒","立春","雨水","惊蛰","春分", 
	"清明","谷雨","立夏","小满","芒种","夏至", 
	"小暑","大暑","立秋","处暑","白露","秋分", 
	"寒露","霜降","立冬","小雪","大雪","冬至"); 
	var DifferenceInMonth=new Array( 
	1272060,1275495,1281180,1289445,1299225,1310355, 
	1321560,1333035,1342770,1350855,1356420,1359045, 
	1358580,1355055,1348695,1340040,1329630,1318455, 
	1306935,1297380,1286865,1277730,1274550,1271556); 
	var DifferenceInYear=31556926; 
	var BeginTime=new Date(1901/1/1); 
	BeginTime.setTime(947120460000); 
	for(;DateGL.getFullYear()<BeginTime.getFullYear();){ 
	BeginTime.setTime(BeginTime.getTime()-DifferenceInYear*1000); 
	} 
	for(;DateGL.getFullYear()>BeginTime.getFullYear();){ 
	BeginTime.setTime(BeginTime.getTime()+DifferenceInYear*1000); 
	} 
	for(var M=0;DateGL.getMonth()>BeginTime.getMonth();M++){ 
	BeginTime.setTime(BeginTime.getTime()+DifferenceInMonth[M]*1000); 
	} 
	if(DateGL.getDate()>BeginTime.getDate()){ 
	BeginTime.setTime(BeginTime.getTime()+DifferenceInMonth[M]*1000); 
	M++; 
	} 
	if(DateGL.getDate()>BeginTime.getDate()){ 
	BeginTime.setTime(BeginTime.getTime()+DifferenceInMonth[M]*1000); 
	M==23?M=0:M++; 
	} 
	var JQ; 
	if(DateGL.getDate()==BeginTime.getDate()){ 
	JQ="　 今天是<font color='#FF9999'><b>"+SolarTermStr[M] + "</b></font>"; 
	} 
	else if(DateGL.getDate()==BeginTime.getDate()-1){ 
	JQ="　 明天是<font color='#FF9999'><b>"+SolarTermStr[M] + "</b></font>"; 
	} 
	else if(DateGL.getDate()==BeginTime.getDate()-2){ 
	JQ="　 后天是<font color='#FF9999'><b>"+SolarTermStr[M] + "</b></font>"; 
	} 
	else{ 
	JQ=" " 
	if(DateGL.getMonth()==BeginTime.getMonth()){ 
	JQ+="　 本月"; 
	} 
	else{ 
	JQ+="　 下月"; 
	} 
	JQ+=BeginTime.getDate()+"日"+"<font color='#FF9999'><b>"+SolarTermStr[M]+"</b></font>"; 
	} 
	return JQ; 
} 



// JavaScript Document  js时间控件
t0=new Date().getTime();
now=new Date();
nhrs=now.getHours();
nmin=now.getMinutes();
nsec=now.getSeconds();
nyear=now.getFullYear();
nmonth=now.getMonth()+1;
nday=now.getUTCDate();
nwday=now.getUTCDay();

function NewTick(){noww=new Date();t1=noww.getTime();
tnext=last0+200;
if(t1<tnext){t1=tnext;}
else if((t1-tnext)>45000&last0!=t0){t1=tnext;}
last0=t1;
noww.setTime(t1+dectime);
if(noww.getDate()!=nday){
nextday=true;
nyear=noww.getFullYear();
nmonth=noww.getMonth()+1;
nwday=noww.getDay();
nday=noww.getDate();
getlday();}
nhrs=noww.getHours();nmin=noww.getMinutes();nsec=noww.getSeconds();
}
dectime=new Date(nyear,nmonth-1,nday,nhrs,nmin,nsec).getTime()-t0;
var lunarInfo=new Array(0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x05ac0,0x0ab60,0x096d5,0x092e0,//1990
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,0x14b63);
function lYearDays(y){var i,sum=348;for(i=0x8000;i>0x8;i>>=1) sum+=(lunarInfo[y-1900]&i)?1:0;return(sum+leapDays(y));}

function leapDays(y){if(leapMonth(y)) return((lunarInfo[y-1900]&0x10000)?30:29);else return(0);}function leapMonth(y)

{return(lunarInfo[y-1900]&0xf);}function monthDays(y,m){return((lunarInfo[y-1900]&(0x10000>>m))?30:29);}function Lunar

(y,m,d){var i,leap=0,temp=0;var offset=(Date.UTC(y,m,d)-Date.UTC(1900,0,31))/86400000;for(i=1900;i<2050&&offset>0;i++)

{temp=lYearDays(i);offset-=temp;}if(offset<0){offset+=temp;i--;}this.year=i;leap=leapMonth(i);this.isLeap=false;for

(i=1;i<13&&offset>0;i++){if(leap>0&&i==(leap+1)&&this.isLeap==false){--i;this.isLeap=true;temp=leapDays(this.year);}else

{temp=monthDays(this.year,i);}if(this.isLeap==true&&i==(leap+1))this.isLeap=false;offset-=temp;}if

(offset==0&&leap>0&&i==leap+1)if(this.isLeap){this.isLeap=false;}else{this.isLeap=true;--i;}if(offset<0){offset+=temp;--

i;}this.month=i;this.day=offset+1;}
var nStr1=new Array('','一','二','三','四','五','六','七','八','九','十','十一','十二');
var nStr2=new Array('初','十','廿','卅','□');
function GetcDay(d){var s;switch(d){case 10:s='初十';break;case 20:s='二十';break;case 30:s='三十';break;default:s=nStr2

[Math.floor(d/10)];s+=nStr1[d%10];break;}return(s);}
function GetcMon(m){if(m==1) return '正';else return nStr1[m];}

var hzWeek= new Array("日","一","二","三","四","五","六","日");
function cweekday(wday){return hzWeek[wday];}
nextday=false;last0=t0;lmonth=0;lday=0;
function getlday(){lObj=new Lunar(nyear,nmonth-1,nday);lmonth=GetcMon(lObj.month);lday=GetcDay(lObj.day);}
getlday();
function shape(x){
if(x<=9) return "0"+x;
else return x;
}
function writeday()
{
document.getElementById("nyear").innerHTML=nyear;           // 年
document.getElementById("nmonth").innerHTML=nmonth;         // 月
document.getElementById("nday").innerHTML=nday;             // 日
//document.getElementById("nl").innerHTML=lmonth+"月"+lday;   // 农历
document.getElementById("nwday").innerHTML=cweekday(nwday); // 星期
}
function Draw(){
NewTick();
if(nextday==true){
writeday();
}
//document.getElementById("nhrs").innerHTML=shape(nhrs); 
//document.getElementById("nmin").innerHTML=shape(nmin); 
//document.getElementById("nsec").innerHTML=shape(nsec); 
setTimeout("Draw()",200);
}


