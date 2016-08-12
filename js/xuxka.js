(function(){
	window.mTabs = function(opts){
	  if(typeof opts === undefined) return;
	  //取得tabs外围容器、标题容器、内容容器
	  this.mtab = document.querySelector(opts.mtab);
	  this.mhead = document.querySelector(opts.mhead);
	  this.mcontent = document.querySelector(opts.mcontent);
	  //取得标题容器内选项集合、内容容器内容集合
	  this.mheads = this.mhead.children;
	  this.mcontents = this.mcontent.children;
	  this.length = this.mheads.length;
	  if(this.length < 1) return;
	  if(opts.index > this.length-1) opts.index = this.length-1;
	  this.index = this.oIndex = opts.index || 0;
	  this.current = opts.current || 'current'; //当前活动选项类名
	  this.touch = {};//自定义一个对象 用来保存手指触摸相关信息
	  this.init();
	}
	mTabs.prototype = {
	  init: function(opts){
	    this.set();
	    this.initset();
	    this.bind();
	  },
	  initset: function(){
	    for(var i = 0; i < this.length; i++){
	      this.mheads[i].index = i;//设置了一个属性 方便点击时判断是点了哪一项
	      this.mheads[i].className = this.mheads[i].className.replace(this.current,'');
	      this.mcontents[i].className = this.mcontents[i].className.replace(this.current,'');
	    }//初始化设置、先清空手动加在标题或内容HTML标签的当前类名（this.current）、再设置哪一项为当前选项并设置类名
	    this.mheads[this.index].className += ' '+this.current;
	    this.mcontents[this.index].className += ' '+this.current;
	    //对应的内容要显示在可视区域
	    //this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translateX(" + (-this.index * this.width) + "px)";
	    //this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translate3d(" + (-this.index * this.width) + "px,0,0)";
	  },
	  set: function(){//获取浏览器的视口宽度、并设置内容容器的宽度、每一项内容区域的宽度，屏幕旋转，浏览器窗口变换会再次设置这些值
	    this.width =  document.documentElement.clientWidth || document.body.clientWidth;
	    this.mcontent.style.width = this.length * this.width + 'px';		
	    for(var i = 0; i < this.length; i++) this.mcontents[i].style.width = this.width + 'px';//调整在可视区域显示的内容项
	    //this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translateX(" + (-this.index * this.width) + "px)";
	    this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translate3d(" + (-this.index * this.width) + "px,0,0)";
	  },
	  bind: function(){
	      //绑定各种事件
	    var _this = this;
	    this.mtab.addEventListener("touchstart",function(e){
	      _this.touchStart(e);
	    }, false);
	    this.mtab.addEventListener("touchmove",function(e){
	      _this.touchMove(e);
	    }, false);
	    this.mtab.addEventListener("touchend",function(e){
	      _this.touchEnd(e);
	    }, false);
	    this.mtab.addEventListener("touchcancel",function(e){
	      _this.touchEnd(e);
	    }, false);
	    this.mhead.addEventListener("click",function(e){
	      _this.touchClick(e);
	    }, false);
	    this.mcontent.addEventListener('webkitTransitionEnd',function(){
	      _this.transitionEnd();
	    }, false);
	    window.addEventListener("resize", function(){
	      setTimeout(function(){
	        _this.set();
	      },100);
	    }, false);
	    window.addEventListener("orientationchange",function(){
	      setTimeout(function(){
	        _this.set();
	      },100);
	    }, false);
	  },
	  touchStart: function(e){
	    this.touch.x = e.touches[0].pageX;
	    this.touch.y = e.touches[0].pageY;
	    this.touch.time = Date.now();
	    this.touch.disX = 0;
	    this.touch.disY = 0;
	    this.touch.fixed = ''; //重要 这里采用了判断是滚动页面行为、还是切换选项行为 如果是滚动页面就在滑动时只滚动页面 相应的切换选项就切换不会滚动页面 
	  },
	  touchMove: function(e){
	    if(this.touch.fixed === 'up') return;
	    e.stopPropagation();
	    if(e.touches.length > 1 || e.scale && e.scale !== 1) return;
	    this.touch.disX = e.touches[0].pageX - this.touch.x;
	    this.touch.disY = e.touches[0].pageY - this.touch.y;
	    if(this.touch.fixed === ''){//行为判断 采用这种方式 主要解决手指按下移动(左上、右上)时滑动切换和滚动页面同时执行的问题  
	      if( Math.abs(this.touch.disY) > Math.abs(this.touch.disX) ){
	        this.touch.fixed = 'up';
	      }else{
	        this.touch.fixed = 'left';
	      }
	    }
	    if(this.touch.fixed === 'left'){
	      e.preventDefault();
	      if( (this.index === 0 && this.touch.disX > 0) || (this.index === this.length-1 && this.touch.disX < 0) ) this.touch.disX /= 4; //在 第一项向右滑动、最后一项向左滑动 时
	      //this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translateX(" + ( this.touch.disX - this.index * this.width ) + "px)";
	      this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translate3d(" + ( this.touch.disX - this.index * this.width ) + "px,0,0)";
	    } 
	  },
	  touchEnd: function(e){	
	    if(this.touch.fixed === 'left'){
	      var _this = this, X = Math.abs(this.touch.disX);
	      this.mcontent.style.webkitTransition = this.mcontent.style.transition = 'all 100ms';
	      if( (Date.now() - this.touch.time > 100 && X > 10) || X > this.width/2 ){
	        this.touch.time = Date.now();
	        this.touch.disX > 0 ? this.index-- : this.index++;
	        this.index < 0 && (this.index = 0);
	        this.index > this.length - 1 && (this.index = this.length - 1);
	        if(this.index === this.oIndex) this.mcontent.style.webkitTransition = this.mcontent.style.transition = 'all 300ms';
	        if(this.index !== this.oIndex) this.replace();
	      }
	      //this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translateX(" + (-this.index * this.width) + "px)";
	      this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translate3d(" + (-this.index * this.width) + "px,0,0)";
	    }	
	  },
	  transitionEnd: function(){
	    this.mcontent.style.webkitTransition = this.mcontent.style.transition = 'all 0ms';
	  },
	  touchClick: function(e){
	    var target = e.target;
	    if(target.nodeType === 1 && target.index !== undefined){
	      if(target.index === this.index) return;
	      e.preventDefault();
	      e.stopPropagation();
	      this.index = target.index;
	      this.mcontent.style.webkitTransition = this.mcontent.style.transition = 'all 100ms';
	      //this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translateX(" + (-this.index * this.width) + "px)";
	      this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translate3d(" + (-this.index * this.width) + "px,0,0)";
	      this.replace();
	    }
	  },
	  replace: function(){
	    this.mheads[this.index].className += ' '+this.current;
	    this.mheads[this.oIndex].className = this.mheads[this.oIndex].className.replace(this.current,'').trim();
	    this.mcontents[this.index].className += ' '+this.current;
	    this.mcontents[this.oIndex].className = this.mcontents[this.oIndex].className.replace(this.current,'').trim();
	    this.oIndex = this.index;
	  }
	}
}());