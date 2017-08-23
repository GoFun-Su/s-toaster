# s-toaster
最初思想是单例模式
``` bash
var instance;
$.extend({ 
	confirm: function (message,ok,cancel,i) { 
		if (instance === undefined) {
	           	instance = new confirm(message,ok,cancel);
		}           	
		return instance.init(i); 
	} 
	});
```
如果弹窗内容不变，并且不可定制，单例模式是 可以的，但是对于弹窗，不同的操作可以定制不同的消息，并且也可以实现不同的事件，单例模式只存在一个实例，所以在这种情况下使用单例模式是不对的
未完待续...