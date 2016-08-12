$(document).ready(function(){
	var rooturl="http://appdev155.ytyfbj.com:8092";
	var opendata=window.location.search.substring(1).split("&");
    var new_hs = JSON.parse(localStorage.getItem("json_hs"));
    var new_hsid = new_hs.id;
    var new_hsname = new_hs.name;
	var opdatas=[];
		for(var i=0;i<opendata.length;i++){
			var allopen=opendata[i].split("=");
			opdatas.push(allopen[1]);
		}
		var babyid=parseInt(opdatas[0]);
		var hospitalid=new_hsid;
	    var name=decodeURI(opdatas[2]);
    console.log(babyid,hospitalid,name);
    console.log(opdatas[2]);

    $(".jiezdanwei span:last").on("click",function(){
    	window.location.href="jiezhongdanwei.html?"
    });

	var yysjbox=$(".yysj-box-item"); // 预约日期
	var yysjcontent=$(".yysj-boxcontent"); // 预约时间段
	yysjbox.remove();
	yysjcontent.remove();

	// 获取医院预约排班数据

	$.ajax({
		type: "post",
		url: rooturl+"/V25/Vaccine/Index.aspx/ShowHospitalSchedule",
		data:{"hospitalid":hospitalid, "babyid":babyid},
		async: false,
		dataType: "json",
		success: function (data){
		   $("#yyname").html(name);
           $("#yuyuehs").html(new_hsname);
    	   if(data.Result==1){
		   	 var datas=data.Data;
		   	 for(var i=0;i<datas.length;i++){
		   	 	var yysjboxs=yysjbox.clone();
		   	 	var yysjcontents=yysjcontent.clone();
		   	 	var schedule=datas[i].schedule;            // 当前排班信息
		   	 	yysjboxs.html(datas[i].weekday);		   // 预约日期替换为当前日期
				yysjboxs.data("yyrq",datas[i]);			   // 获取当前的数据
		   	 	yysjcontents.attr("id","item"+(i+1)+"mobile");
		   	 	yysjboxs.attr("href","#item"+(i+1)+"mobile");



		   	 	if(i==0){
		   	 		yysjboxs.addClass("mui-active");
		   	 		yysjcontents.addClass("mui-active");
		   	 	}
		   	 	var muiradio=yysjcontents.find(".mui-radio");
		   	 	muiradio.remove();

		   	 	for(var j=0;j<schedule.length;j++){
		   	 		var muiradios=muiradio.clone();
					muiradios.data("yysj",schedule[j]);    // 获取当前时间段
		   	 		muiradios.children(".yutime-all").children("span:first").html(schedule[j].beginTime+"~"+schedule[j].endTime);
		   	 		muiradios.children(".yutime-all").children("span:last").html("剩余号数："+schedule[j].leftInjectNum);
		   	 		muiradios.appendTo(yysjcontents.find(".mui-table-view"))
		   	 	}
		   	 	yysjboxs.appendTo(".yysj-box");
		   	 	yysjcontents.appendTo(".nuss-content");
		   	 }
		   }
		}
	});



    $(".yysj-box").on("click, tap",".yysj-box-item",function(){
		// 存储dat到本地
		var new_date = $(this).data("yyrq");
		var dat = new_date.dat;
		var json_dat = {dat:dat};
		localStorage.setItem("json_dat",JSON.stringify(json_dat));
        console.log(dat)
		// var indexs=$(this).index();
		// $(".nuss-content").children(".yysj-boxcontent").removeClass(".mui-active");
		// $("#item"+(indexs+1)+"mobile").addClass("mui-active");

	});

	// 点击选择时间段 (pmam、sTime、eTime)
	$(".yysj-boxcontent").on("click",".mui-radio",function(){
		var new_time = $(this).data("yysj");
		console.log(new_time);
        var pmam = new_time.pMaM;
        var sTime = new_time.beginTime;
        var eTime = new_time.endTime;
        var json_time = {pmam:pmam,sTime:sTime,eTime:eTime};
        localStorage.setItem("json_time", JSON.stringify(json_time))

	});

	// 提交预约

	$(".tijiaoyuyue-btn").on("click",function(){
		var new_dat = JSON.parse(localStorage.getItem("json_dat"));
		var dat = new_dat.dat;
        var new_time = JSON.parse(localStorage.getItem("json_time"));
        var pmam = new_time.pmam;
        var sTime = new_time.sTime;
        var eTime = new_time.eTime;

		$.ajax({
			type: "post",
			crossDomain: true,
			url: rooturl+"/V25/Vaccine/Index.aspx/submitAppointInQueue",
			data: {
				"hospitalid": hospitalid,
				"babyid":babyid,
				"dat": dat,
				"pmam":pmam,
				"sTime":sTime,
				"eTime":eTime
			},
			async: false,
			dataType: "json",
			success: function (data) {
				console.log(data);
				if (data.Result == "1") {
					var appointid = data.Data[0].appointid
					var json_appointid = {appointid:appointid};
					localStorage.setItem("json_appointid",JSON.stringify(json_appointid));
					console.log(JSON.stringify(json_appointid));
					console.log(data);
					window.location.href="quhao.html?babyid="+babyid+"&hospitalid="+hospitalid+"&name="+name;
				}
			}
		})
	})

})
