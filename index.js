;(function (factory) {
    if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define([ "jquery" ],factory);
        //cmd require()
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        //Browser globals
        factory(jQuery);
    }
}(function ($) {
	var Toast = function(options){
		var opts = options,//配置
		     $document = $(document),
		     that = this;//保存this，否则所有的函数指向window
		that.filling = function() {
			       $(".toast").remove();//先把所有的弹窗清除
            	   that.element= $("<div class='toast'>");//弹窗最外层盒子
            	   var _html = "<div class='overlay'></div>"+
            	   "<div class='popBox'>"+
            	   		"<div class='titBox'>"+
            	   			"<span class='title'>"+opts.title+"</span>"+
            	   			"<a class='close'><i class='iconfont icon-lei_guanbi'></i></a>"+
            	   		"</div>"+
            	   		"<div class='tbody'></div>"+
            	   		"<div class='tfoot'>"+
            	   			"<button class='sure'>确定</button><button class='cancel'>取消</button>"+
            	   		"</div>"+
            	   "</div>";
			var $info = $("<p class='content "+opts.type+"'>"+opts.text+"</p>");
			var $input = $("<p class='content-input '>请输入<input/></p>");
			var $textarea = $("<p class='content-input '>请输入<textarea></textarea></p>");

			that.element.html(_html);
			
			$("body").append(that.element);
			if(opts.type == "input")  { that.element.find(".tbody").append($input);}
			if(opts.type == "textarea")  { that.element.find(".tbody").append($textarea); }
			if(opts.type == "info")  { that.element.find(".tbody").append($info); that.element.find(".cancel").remove() }
			that.element.show();
		};
		that.eventBind = function() {
			that.element.find(".sure").click(function(){
				//that.hide();
				opts.onOk($(this));
			});
			that.element.find(".cancel").click(function(){
				that.hide();
			});
			that.element.find(".close").click(function(){
				that.hide();
			});
		};
		//初始化
		that.init = function(){
			this.filling();
			that.eventBind();
		};
		that.hide = function(){
			that.element.hide();
		}

		that.init();
	};

	//配置参数
	var defaults = {
		title:"",
		type: "success",	
		onOk: function(){},
		onCancel: function(){}
	};

	$.extend({ 
		toast: function (parameter) { 
			var options = $.extend({},defaults,parameter);
		                   instance = new Toast(options);
		}
	});

}));