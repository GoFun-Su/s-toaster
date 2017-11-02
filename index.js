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
	var toastType = {
		success: {
			title: "成功"
		},
		error: {
			title: "错误"
		},
		warning: {
			title: "警告"
		}
	};
	
	

	var Toast = function(options){
		var opts = options,//配置
		     $document = $(document);
		this.filling = function() {
			 var that = this;
            		       this.element= $("<div class='toast'>");//弹窗最外层盒子
			var $overlay = $("<div class='overlay'>");//遮罩层
			var $popBox = $("<div class='popBox'>")//弹窗盒子
			var $title = $("<div class='titBox'><span class='title'>"+opts.title+"</span><a class='close'><i class='iconfont icon-lei_guanbi'></i></a></div>")
			var $tbody = $("<div class='tbody'><p class='content "+opts.type+"'>"+opts.text+"</p></div>");
			var $tfooter = $("<div class='tfoot'><button class='sure'>确定</button><button class='cancel'>取消</button></div>");
			
			this.element.append($overlay);
			this.element.append($popBox);
			$popBox .append($title);
			$popBox.append($tbody);
			$popBox.append($tfooter);
			$("body").append(this.element);
			this.element.show();
		};
		this.eventBind = function() {
			var that = this;
			this.element.find(".sure").click(function(){
				that.element.hide();
				opts.onOk($(this));
			});
		}

		//初始化
		this.init = function(options){
			opts = options;
			this.eventBind();
		};
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
			type = toastType[parameter.type] ;
			var options = $.extend({},defaults,parameter,type);
			if(!toast){
				var toast = new Toast(options);
				toast.filling();
			}
			toast.init(options);
		}
	});

}));