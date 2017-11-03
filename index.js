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
            		       that.element= $("<div class='toast'>");//弹窗最外层盒子
			var $overlay = $("<div class='overlay'>");//遮罩层
			var $popBox = $("<div class='popBox'>")//弹窗盒子
			var $title = $("<div class='titBox'><span class='title'>"+opts.title+"</span><a class='close'><i class='iconfont icon-lei_guanbi'></i></a></div>")
			var $tbody = $("<div class='tbody'></div>");
			var $tfooter = $("<div class='tfoot'><button class='sure'>确定</button><button class='cancel'>取消</button></div>");
			var $info = $("<p class='content "+opts.type+"'>"+opts.text+"</p>");
			var $input = $("<p class='content-input '>请输入<input/></p>");

			that.element.append($overlay);
			that.element.append($popBox);
			$popBox .append($title);
			$popBox.append($tbody);
			$popBox.append($tfooter);
			$("body").append(that.element);
			opts.type == "input"? $tbody.append($input):$tbody.append($info);
			if(opts.type == "info")  { that.element.find(".cancel").remove() }
			that.element.show();
		};
		that.eventBind = function() {
			that.element.find(".sure").click(function(){
				that.hide();
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
		that.init = function(options){
			opts = options;
			that.eventBind();
		};
		that.hide = function(){
			that.element.hide();
		}

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
			if(!toast){
				var toast = new Toast(options);
				toast.filling();
			}
			toast.init(options);
		}
	});

}));