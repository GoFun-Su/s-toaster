# s-toaster
### 使用方法
```bash
$(".one").click(function(){
	$.toast({
		type:"warning",//类型
		text:"弹窗一是警告，内容是弹窗一 ",//提示内容
		onOk:function(v){//点击确定按钮之后的回调事件
			alert("这是弹窗一")
		}	
	  })
})
$(".two").click(function(){
	$.toast({
		type:"success",
		text:" 弹窗二是消息成功弹窗，内容是弹窗二",
		onOk:function(v){
			alert("这是弹窗二")
		}	
	})
})
```
一个页面可以多次调用插件,此插件使用的是单列模式，仅创建一次，下一次调用的时候，直接初始化，不在new以及生成html。
```bash
if(!toast){
	var toast = new Toast(options);
	toast.filling();
}
toast.init(options);
```
