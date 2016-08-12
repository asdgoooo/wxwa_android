$(document).ready(function () {
var rooturl="http://appdev155.ytyfbj.com:8092";
var openid=window.location.search.substring(1).split('=')[1];
var ndate=getCurDate();
$(".babyinfo-bleft").html(ndate);
var muitableview=$(".mui-table-view");
var ycbabyinfo=$(".ycbabyinfo");
// var new_json_data = JSON.parse(localStorage.getItem("json_data"));
    var hsid = 1;
    var hsname = "杭州市第一人民医院";
    var json_hs = {id:hsid,name:hsname};
    localStorage.setItem("json_hs",JSON.stringify(json_hs));
// var new_babyid = new_json_data.babyId;
var new_phone_data = JSON.parse(localStorage.getItem("json_phonenum"));
var new_phone = new_phone_data.phonenum;
ycbabyinfo.remove();
    $.ajax({
        type: "post",
        url: rooturl+"/V25/Vaccine/Index.aspx/GetAllBabyList",
        data:{"phonenum":new_phone},
        async: false,
        dataType: "json",
        success: function (data){
            l = data.Data.length -1;
            var datas=data.Data[l];
            $(".babyinfo-img>img").attr("src",datas.picpath); // 初次登录无宝宝picpath报错
            $(".babyinfo-name").html(datas.name);
            var babyid=datas.babyId;
            var hospitalid=datas.hospitalid;
            var birthday=datas.birthday;
            var name=datas.name;
            console.log(data.Data);
            console.log(babyid);
            console.log(new_phone);
            console.log(l);
            $(".babyjzhong:first").children(".babyjzhong-jzben").click(function(){
                window.location.href="jiezhongben.html?babyid="+babyid;
            });
            $("#tianjia").click(function(){
                window.location.href="../glbb/aboutbaby.html";
            });
            shuju(babyid,rooturl,hospitalid,name);
            var alldata=data.Data;
            for(var i=0;i<alldata.length;i++){
                var muitable=ycbabyinfo.clone();
                var dataid=i;
                muitable.attr("babyid",dataid);
                muitable.children(".ycbabyinfo-img").children(".ycbabyinfo-touxiang").children("img").attr("src",alldata[i].picpath);
                muitable.children(".ycbabyinfo-base").children(".ycbabyinfo-baseinfo").children("span").html(alldata[i].name);
                muitable.children(".ycbabyinfo-base").children(".ycbabyinfo-basebir").html();
                muitable.appendTo(muitableview);
            }
            muitableview.delegate(".ycbabyinfo","click",function(){
                var divbabyid=$(this).attr("babyid");
                $("#popover").css("display","none");
                $(".mui-backdrop").css("display","none");
                for(var i=0;i<alldata.length;i++){
                    if(divbabyid==i){
                        console.log(divbabyid);
                        $(".babyinfo-img>img").attr("src",alldata[i].picpath);
                        $(".babyinfo-name").html(alldata[i].name);
                        var babyid2=alldata[i].babyId;
                        var hospitalid2=alldata[i].hospitalid;
                        var birthday2=alldata[i].birthday;
                        var name2=alldata[i].name;
                        $(".babyjzhong:first").children(".babyjzhong-jzben").click(function(){
                            window.location.href="jiezhongben.html?babyid="+babyid2;
                        });
                        $("#tianjia").click(function(){
                            window.location.href="../glbb/aboutbaby.html";
                        });
                        shuju(babyid2,rooturl,hospitalid2,name2);
                    }
                }
            })

        },
        error: function () {
        }
    })
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);

    function myFun(result){
        var cityName = result.name;
        map.setCenter(cityName);
        $.ajax({
            type: "post",
            url: "http://appdev155.ytyfbj.com:8080/WeixiangHealth/weather/today",
            data:{"city":cityName.slice(0,-1)},
            async: false,
            dataType: "json",
            success: function (data){
                console.log(data);
                console.log($(".babyinfo-bright"));
                $(".babyinfo-bright").html(data.data.low.slice(3)+"/"+data.data.high.slice(3)+" "+data.data.type+data.data.fengli+data.data.fengxiang);
            }
        })

    }
    var myCity = new BMap.LocalCity();
    myCity.get(myFun);
})

function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays;
    aDate  =  sDate1.split("-");
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);    //转换为12-18-2002格式
    aDate  =  sDate2.split("-");
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数
    return  iDays;
}
function tianshu(d2){
    var oldtian;
    var d1=getNowFormatDate();
    for(var i=0;i<d2.length;i++){
        oldtian=DateDiff(d1,d2[i]);
        var  tian=DateDiff(d1,d2[i]);
        if(oldtian<tian){
            oldtian=tian;
        }
    }
    return oldtian;
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
function getCurDate(){
    var d = new Date();
    var week;
    switch (d.getDay()){
        case 1: week="周一"; break;
        case 2: week="周二"; break;
        case 3: week="周三"; break;
        case 4: week="周四"; break;
        case 5: week="周五"; break;
        case 6: week="周六"; break;
        default: week="周日";
    }
    var years = d.getFullYear();
    var month = add_zero(d.getMonth()+1);
    var days = add_zero(d.getDate());
    var hours = add_zero(d.getHours());
    var minutes = add_zero(d.getMinutes());
    var seconds=add_zero(d.getSeconds());
    var ndate = years+"年"+month+"月"+days+"日 "+" "+week;
    return ndate;
}
function add_zero(temp){
    if(temp<10){ return "0"+temp;}
    else {return temp;}
}
function shuju(babyid,rooturl,hospitalid,name){
    $.ajax({
        type: "post",
        url: rooturl+"/V25/Vaccine/Index.aspx/ShowHospitalSchedule",
        data:{"hospitalid":hospitalid,
              "babyid":babyid,
              "name":name},
        async: false,
        dataType: "json",
        success: function (data){
            var result=data.Result;
            var message=data.message;
            if(result==0){
                $(".babyjzhong:first").children(".babyjzhong-yuyue").click(function(){
                    alert("手工添加宝宝不能预约");
                })
            }else if(result==2){
                var dataes=data.Data;
                console.log(dataes[0].hname);
                $(".babyjzhong:first").children(".babyjzhong-yuyue").click(function(){
                    window.location.href="quhao.html?babyid="+babyid+"&hospitalid="+hospitalid+"&name="+name;
                })
            }else if(result==1){
                $(".babyjzhong:first").children(".babyjzhong-yuyue").click(function(){
                    window.location.href="yuyuejiez.html?babyid="+babyid+"&hospitalid="+hospitalid+"&name="+name;
                })
            }
        }
    })
    var jzlist=$(".jzjilu-list:first");
    var alljzlist=$(".jzjilu-list");
    alljzlist.remove();
    jzlist.remove();
    $.ajax({
        type: "post",
        url: rooturl+"/V25/Vaccine/Index.aspx/GetBabyWithVac",
        data:{"babyid":babyid},
        async: false,
        dataType: "json",
        success: function (data){
            var datas=data.Data;
            var datees=[];
            $("#tianshu").html(tianshu(datees));
            for(var i=0;i<datas.length;i++){
                datees.push(datas[i].etddate.slice(0,10));
                var jlist=jzlist.clone();
                jlist.children(".yimiaoname").html(datas[i].vacname);
                jlist.children(".yimiaocount").html(datas[i].chiocenum+"位宝宝选择");
                jlist.children(".ymmianfei").children("span:last-child").html(datas[i].freestr);
                jlist.children(".ymmianfei").children("span:first-child").html(datas[i].electStr);
                jlist.appendTo($(".jzjilu"))
            }
            $("#tianshu").html(tianshu(datees));
        },
        error: function () {
        }
    })
}