
$(document).ready(function(){
	$(".shdtianj").click(function(){
		window.location.href="sdtianjia.html"+openid;
	});
	
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.331398,39.897445);
	map.centerAndZoom(point,12);
	var geoc = new BMap.Geocoder();  
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			geoc.getLocation(r.point, function(rs){
			  var addComp = rs.addressComponents;
			   $("#address").val(addComp.province + "- " + addComp.city) ;
		   });
		}
		else {
			
		}        
	},{enableHighAccuracy: true});


    // 获取local phonenum　

    var new_phone_data = JSON.parse(localStorage.getItem("json_phonenum"));
    var new_phone = new_phone_data.phonenum;

    // 验证信息

	var Dom = {marksucc :$('.marksucc')};
	var Dam = {mark :$('.mark')};
	var Dcm = {
		markcontent :$('.mark-content'),
		markall :$('.markall')	
	};

	function ErrorBabyInfo(){
		//todo 提示宝宝信息输入错误
		if (Dom.marksucc.css('display') == 'none') {
			Dom.marksucc.show();
		}
		else{
			Dom.marksucc.hide();
		}
	}

	function ErrorBabyNotfound() {
		//todo 提示未找到宝宝信息
		if (Dam.mark.css('display') == 'none') {
			Dam.mark.show();
		}
		else{
			Dam.mark.hide();
		}
	}

	function ShowBabyInfo(){
		if (Dcm.markall.css('display') == 'none') {
			Dcm.markall.show();
			Dcm.markcontent.show();
		}
		else{
			Dcm.markall.hide();
			Dcm.markcontent.hide();
		}
	}

    // 点击下一步事件

	$("#button").click(function(){
		console.log($("#shengri").html());
        console.log($("#shaoma").val());
		
        $.ajax({
		data:{
			// 生日
			// 条形码
			birthday:$("#shengri").html(),
			imuno:$("#shaoma").val()
			},
		url:'http://appdev155.ytyfbj.com:8092/V25/Vaccine/Index.aspx/ShowEPIChildInfo',
		dataType:"json",//服务器返回json格式数据
		type:'post',//HTTP请求类型
		async: false,
		success:function(data){
			console.log(data);
		//服务器返回响应，根据响应结果，分析是否登录成功；
		
			//todo
			if (data.Result == "1") {
				$("#child_code").html(data.Data[0].childno);
				$("#bar_code").html(data.Data[0].imuno);
				$("#name_code").html(data.Data[0].name);
				$("#date_code").html(data.Data[0].birth);
				$("#sex_code").html(data.Data[0].sex);
				$("#address_code").html(data.Data[0].dwelladdr);
				$("#allergy_code").html(data.Data[0].allergy);
				$("#birthid_code").html(data.Data[0].birthno);
				$("#unit_code").html(data.Data[0].createdept);
				ShowBabyInfo();

			}else{
				ErrorBabyNotfound();
			}

		
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
			console.log(type);
		}
	});
	});

    // 点击宝宝信息展示页面确认事件

    $(".content-btn").click(function(){
        console.log($("#date_code").html());
        console.log($("#bar_code").html());
        $.ajax({
            data:{
                // 生日
                // 条形码
                birthday:$("#date_code").html(),
                imuno:$("#bar_code").html()
            },
            url:'http://appdev155.ytyfbj.com:8092/V25/Vaccine/Index.aspx/FetchEPIChildInfo',
            beforeSend: function(request) {
                request.setRequestHeader("phonenum",new_phone);
            },
            dataType:"json",//服务器返回json格式数据
            type:'post',//HTTP请求类型
            async: true,
            success:function(data){
                console.log(data);
                //服务器返回响应，根据响应结果，分析是否登录成功；

                //todo
                if (data.Result == "1") {
                    var bid = data.Data[0].babyId
                    var json_data = {babyId:bid};
                    localStorage.setItem("json_data",JSON.stringify(json_data));
                    window.location.href="../ymgl/yimiaoguanli.html";
                    console.log(data.Data[0].babyId)




                }else{
                    ErrorBabyNotfound();
                    
                }


            },
            error:function(xhr,type,errorThrown){
                //异常处理；
                console.log(type);
            }
        });
    });




    // 点击宝宝信息展示页面关闭事件

	$(".close-btn").click(function(){
		Dcm.markall.hide();
		Dcm.markcontent.hide();
		
	});

    // 切换到手动添加

    $("#shdtianj").click(function(){
        window.location.href="sdtianjia.html";

    });

	// 调用条形码扫描器

    $("#barscan").click(function(){

        var Quagga = window.Quagga;
        var App = {
            _scanner: null,
            init: function() {
                this.attachListeners();
            },
            activateScanner: function() {
                var scanner = this.configureScanner('.overlay__content'),
                    onDetected = function (result) {
                        document.querySelector('input.isbn').value = result.codeResult.code;
                        stop();
                    }.bind(this),
                    stop = function() {
                        scanner.stop();  // should also clear all event-listeners?
                        scanner.removeEventListener('detected', onDetected);
                        this.hideOverlay();
                        this.attachListeners();
                    }.bind(this);

                this.showOverlay(stop);
                scanner.addEventListener('detected', onDetected).start();
            },
            attachListeners: function() {
                var self = this,
                    button = document.querySelector('.shaoma input + button.scan');

                button.addEventListener("click", function onClick(e) {
                    e.preventDefault();
                    button.removeEventListener("click", onClick);
                    self.activateScanner();
                });
            },
            showOverlay: function(cancelCb) {
                if (!this._overlay) {
                    var content = document.createElement('div'),
                        closeButton = document.createElement('div');

                    closeButton.appendChild(document.createTextNode('X'));
                    content.className = 'overlay__content';
                    closeButton.className = 'overlay__close';
                    this._overlay = document.createElement('div');
                    this._overlay.className = 'overlay';
                    this._overlay.appendChild(content);
                    content.appendChild(closeButton);
                    closeButton.addEventListener('click', function closeClick() {
                        closeButton.removeEventListener('click', closeClick);
                        cancelCb();
                    });
                    document.body.appendChild(this._overlay);
                } else {
                    var closeButton = document.querySelector('.overlay__close');
                    closeButton.addEventListener('click', function closeClick() {
                        closeButton.removeEventListener('click', closeClick);
                        cancelCb();
                    });
                }
                this._overlay.style.display = "block";
            },
            hideOverlay: function() {
                if (this._overlay) {
                    this._overlay.style.display = "none";
                }
            },
            configureScanner: function(selector) {
                if (!this._scanner) {
                    this._scanner = Quagga
                        .decoder({readers: ['ean_reader']})
                        .locator({patchSize: 'medium'})
                        .fromVideo({
                            target: selector,
                            constraints: {
                                width: 800,
                                height: 600,
                                facingMode: "environment"
                            }
                        });
                }
                return this._scanner;
            }
        };
        App.init();
    });


})

























