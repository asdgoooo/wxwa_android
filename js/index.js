$(function(){
	var addressname="http://appdev155.ytyfbj.com:8080";
	var username=$(".username>input");
	var clearbtn=$(".username>img");
	var yanzhengma=$(".yanzhengma>input:first");
    username.focus(function(){
		if(username.val()=="手机号码"){
			username.val("");
		}
	});
	username.blur(function(){
		if(username.val()==""){
		    username.val("手机号码");
		}
	});
	yanzhengma.focus(function(){
		if(yanzhengma.val()=="验证码"){
			yanzhengma.val("");
		}
	});
	yanzhengma.blur(function(){
		var uyanzhen=yanzhengma.val();
		if(yanzhengma.val()==""){
		    yanzhengma.val("验证码");
		}
	});
	clearbtn.click(function(){
		username.val("");
		username.focus();
	});

	$("#submits").click(function(){
		var unames=username.val();
		var uyanzhens=yanzhengma.val();
		$.ajax({
			type: "post",
			crossDomain:true,
			url: addressname+"/WeixiangHealth/launcher/login",
			data:{
				"phonenum":unames,
				"smscode":uyanzhens
			},
			async: false,
			dataType: "json",
			crossDomain:true,
			success: function (data){
				console.log(data.data);
				var openid=data.data.phonenum;
				$.ajax({
					type: "post",
					url: "http://appdev155.ytyfbj.com:8092/V25/Vaccine/Index.aspx/GetAllBabyList",
					data:{"phonenum":openid},
					async: false,
					dataType: "json",
					success: function (data){
						var datas=data.Data;
						console.log(datas.length);
						if(datas.length){
							var phoneNm = unames;
							var json_phonenum = {phonenum:phoneNm};
							localStorage.setItem("json_phonenum",JSON.stringify(json_phonenum));
							window.location.href="ymgl/yimiaoguanli.html?opendata="+openid;
						}else{
							var phoneNm = unames;
							var json_phonenum = {phonenum:phoneNm};
							localStorage.setItem("json_phonenum",JSON.stringify(json_phonenum));
							window.location.href = "glbb/aboutbaby.html";
						}
					},
					error: function () {
//
					}
				})

			},
			error: function () {
			}
		})
	});
	
	$("#button").click(function(){
		var uname=username.val();
		var reg=/^((\(\d{3}\))|(\d{3}\-))?13\d{9}|15\d{9}|17\d{9}|18\d{9}$/;
			var start=reg.test(uname);	
			if(start){
				$.ajax({
			          type: "post",
				      url: addressname+"/WeixiangHealth/launcher/getSmsCode",
				      data:{
				      	"phonenum":uname,
				      	"utype":"1"
				      },
				      async: true,
				      dataType: "json",
				      success: function (data) {
				      	console.log(data);
				        if(data.status==1){
// 				        	$("#submits").click(function(){
// 							    var unames=username.val();
// 						        var uyanzhens=yanzhengma.val();
// 							    $.ajax({
// 							          type: "post",
// 							          crossDomain:true,
// 								      url: addressname+"/WeixiangHealth/launcher/login",
// 								      data:{
// 								      	"phonenum":unames,
// 								      	"smscode":uyanzhens
// 								      },
// 								      async: false,
// 								      dataType: "json",
// 								      crossDomain:true,
// 								      success: function (data){
// 								      	console.log(data.data);
// 								      	var openid=data.data.phonenum;
// 								      	$.ajax({
// 											  type: "post",
// 											  url: "https://121.40.180.155:8082/V25/Vaccine/Index.aspx/GetAllBabyList",
// 											  data:{"phonenum":openid},
// 											  async: false,
// 											  dataType: "json",
// 											  success: function (data){
// 											      var datas=data.Data;
// 												  console.log(datas.length);
// 											      if(datas.length){
//                                                       var phoneNm = uname;
//                                                       var json_phonenum = {phonenum:phoneNm};
//                                                       localStorage.setItem("json_phonenum",JSON.stringify(json_phonenum));
//                                                       console.log(uname);
// 													  window.location.href="ymgl/yimiaoguanli.html?opendata="+openid;
// 											      }else{
//                                                       var phoneNm = uname;
//                                                       var json_phonenum = {phonenum:phoneNm};
//                                                       localStorage.setItem("json_phonenum",JSON.stringify(json_phonenum));
//                                                       console.log(uname);
// 													  window.location.href = "glbb/aboutbaby.html";
// 											      }
// 											  },
// 											  error: function () {
// //
// 											 }
// 										})
//
// 								      },
// 								      error: function () {
// 						              }
// 						        })
// 						    })
				        } 
				      },
				      error: function () {
//		                 alert("请求数据失败!");
		              }
		        })
			}	
	})	
})