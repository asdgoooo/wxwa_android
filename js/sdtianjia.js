$(document).ready(function(){
	$("#DtPicker").click(function(){

		(function($) {
			$.init();
			var result = $('#result')[0];
			var btns = $('#DtPicker');
			btns.each(function(i, btn) {
				btn.addEventListener('tap', function() {
					var optionsJson = this.getAttribute('data-options') || '{}';
					var options = JSON.parse(optionsJson);
					var id = this.getAttribute('id');
					/*
					 * 首次显示时实例化组件
					 * 示例为了简洁，将 options 放在了按钮的 dom 上
					 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
					 */
					var picker = new $.DtPicker(options);
					picker.show(function(rs) {
						/*
						 * rs.value 拼合后的 value
						 * rs.text 拼合后的 text
						 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
						 * rs.m 月，用法同年
						 * rs.d 日，用法同年
						 * rs.h 时，用法同年
						 * rs.i 分（minutes 的第二个字母），用法同年
						 */
						result.innerText = rs.text;
						/*
						 * 返回 false 可以阻止选择框的关闭
						 * return false;
						 */
						/*
						 * 释放组件资源，释放后将将不能再操作组件
						 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
						 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
						 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
						 */
						picker.dispose();
					});
				}, false);
			});
		})(mui);

    });



    // 选择性别

    mui('body').on('shown', '.mui-popover', function(e) {
        //console.log('shown', e.detail.id);//detail为当前popover元素
    });
    mui('body').on('hidden', '.mui-popover', function(e) {
        //console.log('hidden', e.detail.id);//detail为当前popover元素
    });
    var info = document.getElementById("sex");
    mui('body').on('tap', '.mui-popover-action li>a', function() {
        var a = this,
            parent;
        //根据点击按钮，反推当前是哪个actionsheet
        for (parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
            if (parent.classList.contains('mui-popover-action')) {
                break;
            }
        }
        //关闭actionsheet
        mui('#' + parent.id).popover('toggle');
        info.innerHTML = a.innerHTML;
    });


	// 选择接种点

	$("#choicejz").click(function(){
		window.location.href="#";


	});

    // 切换到关联宝宝页面
    $("#aboutbaby").click(function(){
        window.location.href="aboutbaby.html";


    });


	// 点击添加事件

	$(".containers-btn").click(function(){

		$.ajax({
			data:{
				babyid: -1,
				name:$("#sdname").val(),
				sex:$("#sex").val(),
				birthday:$("#result").val(),
				hospitalname:$("#choicejz").val()

			},
			url:'http://appdev155.ytyfbj.com:8092/V2/Baby/BabyAPI.ASPX/RegBaby',
			dataType:"json",//服务器返回json格式数据
			type:'post',//HTTP请求类型
			async: false,
			success:function(data){
				console.log(data);
				//服务器返回响应，根据响应结果，分析是否登录成功；

				//todo
				if (data.Result == "1") {
					window.location.href="#";

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



})

