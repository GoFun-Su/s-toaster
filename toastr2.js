+function ($) {
"use strict";
        var confirm = function () {

        }
        confirm.prototype = {
      
         }
        function Plugin() {
                var instance = new confirm();
                return  instance.init()
}
$.fn.confirm = Plugin; 
//$.fn.confirm 等同于 jQuery.prototype.pluginName
//调用$("p").confirm()
$.extend({ confirm: function () { return new confirm(); } });
//就是将confirm方法合并到jquery的全局对象中。
//调用$.confirm()
}(jQuery);
