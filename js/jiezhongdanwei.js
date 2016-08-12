(function(mui, doc) {
	var rooturl="http://appdev155.ytyfbj.com:8092";
    var openid=window.location.search.substring(1).split('=')[1];
    var yiyuaninfo=$(".yiyuaninfo");
    yiyuaninfo.remove(); 
	mui.init();
	mui.ready(function() {
		var cityPicker3 = new mui.PopPicker({
			layer: 3
		});
		cityPicker3.setData(cityData3);
		var showCityPickerButton = doc.getElementById('showCityPicker3');
		var cityResult3 = doc.getElementById('cityResult3');
		showCityPickerButton.addEventListener('tap', function(event) {
			cityPicker3.show(function(items) {
				cityResult3.innerText =(items[0] || {}).text + "-" + (items[1] || {}).text + "-" + (items[2] || {}).text;
				$.ajax({
					type: "post",
					url: "http://appdev155.ytyfbj.com:8092/V2/User/GetHospitalApi.aspx/GetHospital",
					data:{"provincename":(items[0] || {}).text,
	                      "cityname":(items[1] || {}).text ,
	                      "districtname":(items[2] || {}).text
	                 },
					async: true,
					dataType: "json",
					success: function (data){
						var yiyuaninfoall=$(".yiyuaninfo");
//						var yiyuaninfo=$(".yiyuaninfo:first");
						yiyuaninfoall.remove();
						if(data.Result==1){
							var datas=data.Data;
							console.log(datas);
							for (var i = 0; i < datas.length; i++) {
								console.log(yiyuaninfo);
								var yiyuaninfos=yiyuaninfo.clone();
                                yiyuaninfos.data("hsinfo",datas[i]);
							    yiyuaninfos.children(".yiyuaninfo-name").children("span").html(datas[i].name);
							    yiyuaninfos.children(".yiyuaninfo-dizhi").children("span:last").html(datas[i].address);	
							    yiyuaninfos.appendTo(".jiezdanweiall");
							};
						}
					}	
				})
			});
		}, false);
	});
})(mui, document);
$(".jiezdanweiall").on("click",".yiyuaninfo",function(){
    var new_data = $(this).data("hsinfo");
    console.log(new_data);
    var hsid = new_data.id;
    var hsname = new_data.name;
    var json_hs = {id:hsid,name:hsname};
    localStorage.setItem("json_hs",JSON.stringify(json_hs));
    console.log(hsid,hsname);
    console.log(JSON.stringify(json_hs));
    $("#hospital-name").html(new_data.name);
    // if (hsid != 0){
    //     window.location.href="yuyuejiez.html"
    // }

})
