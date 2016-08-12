$(document).ready(function(){
	var rooturl="http://appdev155.ytyfbj.com:8092";
	var new_hs = JSON.parse(localStorage.getItem("json_hs"));
	var hospitalid = new_hs;
	var new_appointid = JSON.parse(localStorage.getItem("json_appointid"));
	var appointid = new_appointid.appointid;
    var new_phone_data = JSON.parse(localStorage.getItem("json_phonenum"));
    var new_phone = new_phone_data.phonenum;
    var opendata=window.location.search.substring(1).split("&");
    var opdatas=[];
	for(var i=0;i<opendata.length;i++){
		var allopen=opendata[i].split("=");
		opdatas.push(allopen[1]);	
	}
	var babyid=parseInt(opdatas[0]);
	var name=decodeURI(opdatas[2]);
	$.ajax({
    	type: "post",
	    url:rooturl+"/V25/Vaccine/Index.aspx/ShowHospitalSchedule",
	    data:{"babyid":babyid,
	          "hospitalid":hospitalid
	    },
	    async: false,
	    dataType: "json",
	    success: function (data){
			$(".quhaoinfo-name").html(name);
	    	console.log(data);
	        var result=data.Result;       
	        if(result==2){
	        	var datas=data.Data[0];
	        	console.log(datas.imuno)
	        	createBarcode('div128',datas.imuno,'B');
	        	$(".jzwsy>span:last-child").html(datas.hname);
	        	$(".jzrqsj>span:nth-child(2)").html(datas.dat);
	        }	
	    }
    })
    $.ajax({
    	type: "post",
	    url:rooturl+"/V25/Vaccine/Index.aspx/ShowHospitalSchedule",
	    data:{"babyid":babyid,
	          "hospitalid":hospitalid
	    },
	    async: false,
	    dataType: "json",
	    success: function (data){
	    	console.log(data);
	        var result=data.Result;       
	        if(result==2){
	        	var datas=data.Data[0];
	        	createBarcode('div128',datas.imuno,'B');
	        	$(".jzwsy>span:last-child").html(datas.hname);
	        	$(".jzrqsj>span:nth-child(2)").html(datas.dat);
	        }	
	    }
    });
    $(".header-right").on("click",function(){
    	console.log(appointid,babyid);
    	$.ajax({
    		type: "post",
		    url:rooturl+"/V25/Vaccine/Index.aspx/CancelAppointInject",
		    data:{
		          "appointid":appointid,
				  "babyid":babyid
		    },
		    async: false,
		    dataType: "json",
		    success: function (data){
		    	console.log(data);
                window.location.href="yimiaoguanli.html?opendata="+new_phone;
		    }
	    });
    })
});
function nianling(birthday){
	var birthStr = birthday.replace(/-/g,'/');
	var birthDay = new Date(birthStr).getTime();
	var now = new Date().getTime();

	var hours = (now - birthDay)/1000/60/60;
	var year =  Math.floor(hours / (24 * 30 * 12));
	hours = hours % (24 * 30 * 12);
	var months = Math.floor(hours / (24 * 30 ));
	hours = hours % (24 * 30 );
	var days = Math.floor(hours / (24));
	return year+ '岁'+ months +'月'+days +"天"
}
