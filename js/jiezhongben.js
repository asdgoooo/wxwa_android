$(document).ready(function(){
	var rooturl="http://appdev155.ytyfbj.com:8092";
	var babyid=window.location.search.substring(1).split('=')[1];
	var mcontent=$(".mcontent>ul");
	var firstli=mcontent.first().children("li");
	var lastli=mcontent.last().children("li");
	var yijizym=firstli.children(".yijizym");
	var jzjihua=lastli.children(".jiezhongjihua");
	jzjihua.remove();
	yijizym.remove();
    // var new_json_data = JSON.parse(localStorage.getItem("json_data"));
    // var new_babyid = new_json_data.babyId;
	$.ajax({
	    type: "post",
	    url: rooturl+"/V25/Vaccine/Index.aspx/GetVaccincePlanBook",
	    data:{"babyid":babyid},
	    async: false,
	    dataType: "json",
	    success: function (data){
	      console.log(babyid);
	      var datas=data.Data;
	      for(var i=0;i<datas.length;i++){
	      	  var jiezjh=jzjihua.clone();
	      	  var jztitle=jiezjh.children(".jiezhjh-title");
	      	  jztitle.children("span:first-child").html(datas[i].AgeName);
	      	  jztitle.children("span:last-child").html(datas[i].DatePeriod);
	      	  var datalist=datas[i].DateList;
	      	  var jztime=jiezjh.children(".jiezhjh-time");
	      	  var jzyimiao=jiezjh.children(".jiezhjh-name");
	      	  jztime.remove();
	      	  jzyimiao.remove()
	      	  for(var j=0;j<datalist.length;j++){
	      	  	  var jztimes=jztime.clone();
	      	  	  jztimes.children("span:first-child").html(datalist[j].ExpectedInjectDate);
	      	  	  jztimes.children("span:last-child");
	      	  	  var vaclist=datalist[j].VacList;
	      	  	  jiezjh.append(jztimes);
	      	  	  for(var k=0;k<vaclist.length;k++){
	      	  	  	  var jzyimiaos=jzyimiao.clone();
	      	  	  	  jzyimiaos.children("div:first-child").children("span").html(vaclist[k].vacname);
	      	  	  	  jzyimiaos.children("div:last-child").children("span:first-child").html(vaclist[k].vacname);
	      	  	  	  jzyimiaos.children("div:last-child").children("span:last-child").html(vaclist[k].vacname);
	      	  	  	  jiezjh.append(jzyimiaos)
	      	  	  }
	      	  }
	      	lastli.append(jiezjh);
	      };
	    },
	    error: function () {
	   }
	})
	$.ajax({
		type: "post",
	    url: rooturl+"/V25/Vaccine/Index.aspx/GetVaccineInjectRecords",
	    data:{"babyid":babyid},
	    async: false,
	    dataType: "json",
	    success: function (data){
	      console.log(data);
	      var datas=data.Data;
	      for(var i=0;i<datas.length;i++){
	      	  var yijizymss=yijizym.clone();
	      	  var datesj=datas[i].days+wd(datas[i].wd);
	      	  yijizymss.children(".yijizym-name").html(datas[i].vacname);
	      	  yijizymss.children(".yijizym-time").html(datesj);
	      	  yijizymss.children(".yijizym-addresss").children("span").html(datas[i].fstationname);
	      	  firstli.append(yijizymss);
	      }
	    },
	    error: function () {
	   }
	})
})
function wd(wd){
	switch(wd){
		case 1:return "周一";
		case 2:return "周二";
		case 3:return "周三";
		case 4:return "周四";
		case 5:return "周五";
		case 6:return "周六";
		case 3:return "周日";
	}
}





