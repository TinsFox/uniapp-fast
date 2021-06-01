### 参考资料

1. 怎样规范提交代码变更记录 [commit message](https://segmentfault.com/a/1190000009048911)
2. 语义化的说明 [语义化版本 2.0.0](https://semver.org/lang/zh-CN/)

### 使用的工具库

1. 网络请求 [luch-request](https://www.quanzhan.co/luch-request/)
2. 路由跳转 [uni-simple-router](https://hhyang.cn/v2/)

5. WebStorm小程序常用设置
#常用设置
支持wxss、wxml
将wxss和css文件类型进行关联，同样，将wxml和html文件类型进行关联

preference->editor->file types

选中Html，在下面添加*.wxml
选中Cascading Style Sheet ，在下面添加*.wxss

不识别rpx
取消css语法检查: preference->editor->inspection->invalid css property value 取消掉钩钩

解决在wxss中格式化rpx前会多出一个空格的问题
需要利用文件监听： preference->Tools->File Watchers

点击下方 + 号，新增一个文件监听

name: 自定义即可
File type: 选择 Cascading Style Sheet
Program: 写上sed
Arguments: -i "" s/"\ rpx"/rpx/g $FilePath$
Output paths to refresh: $FilePath$

Windows 上有一些不同，主要是：
Arguments: -i s/"\ rpx"/rpx/g $FilePath$

此外Windows上需要单独下载Sed软件，参考：
https://github.com/mbuilov/sed-windows

在安装后，原填入sed的地方需要填写完整的sed.exe安装路径
