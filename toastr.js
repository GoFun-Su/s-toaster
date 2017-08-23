//一元操作符+和函数表达式:目的是告诉解析器在这些特定操作符附近的是一个表达式,
//通过在表达式末尾加()运行
+function ($) {
"use strict";
	var confirm = function(message,ok,cancel) {
		this.instance = null;
		this.element = null;
		this.message = message;
		this.ok = ok;
		this.cancel = cancel;
	}
	
	confirm.prototype = {
		init: function(ins) {
			this.instance = this.instance || ins || this;
			this.show();	
		},
		show: function() {
			var that = this;
            		this.element = $(".confirm");
            		if (that.element.length == 0) {
                			that.element = $('<div class="confirm"><div class="header"><p>提示</p></div><div class="content"><p class="context"></p></div><div class="footer"><button class="sure">确认</button><button class="cancel">取消</button></div></div>').appendTo("body");
            		} else {
                			that.dispose();
            		}
            		that.element.find(".content").html(that.message);
            		that.element.find(".sure").on("click", function () { 
            			//typeof that.ok == "function" && that.ok.call(that.instance, that); 
            			typeof that.ok == "function" && that.ok(); 
            			that.element.hide(function () { 
            				that.destroy(); 
            			}); 
            		});
            		that.element.find(".cancel").on("click", function () { 
            			//typeof that.cancel == "function" && that.cancel.call(that.instance, that); 
            			typeof that.cancel == "function" && that.cancel();
            			that.element.hide(function () { 
            				that.destroy(); 
            			}); 
            		});
            		that.element.show();

		},
		dispose: function () {
            		return this.element && this.element.find(".content").off("click");
        		},
       		destroy: function () {
            		this.element && this.element.remove && this.element.remove();
       		}
       	}

	//$.fn.confirm 等同于 jQuery.prototype.pluginName
	//调用$("p").confirm()
	//用代理实现单例模式
	 function Plugin(message,ok,cancel) {
                	instance = new confirm(message,ok,cancel);
                	return  instance.init(this)
	}
	$.fn.confirm = Plugin; 
	//就是将confirm方法合并到jquery的全局对象中。
	//调用$.confirm()
	$.extend({ 
		confirm: function (message,ok,cancel,i) { 
	                	instance = new confirm(message,ok,cancel);
			return instance.init(i); 
		} 
	});

}(jQuery)