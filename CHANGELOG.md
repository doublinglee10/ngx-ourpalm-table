# 更新日志

## master (开发中)


<!-- ## v1.0.4 -->

<!-- ### 新特性 -->
<!-- * 增加对windows汇编器的支持 -->
<!-- * 为xmake create增加一些新的工程模板，支持tbox版本 -->
<!-- * 支持swift代码 -->
<!-- * 针对-v参数，增加错误输出信息 -->
<!-- * 增加apple编译平台：watchos, watchsimulator的编译支持 -->
<!-- * 增加对windows: x64, amd64, x86_amd64架构的编译支持 -->
<!-- * 实现动态库和静态库的快速切换 -->
<!-- * 添加-j/--jobs参数，手动指定是否多任务编译，默认改为单任务编译 -->

<!-- ### 改进 -->
<!-- * 增强`add_files`接口，支持直接添加`*.o/obj/a/lib`文件，并且支持静态库的合并 -->
<!-- * 裁剪xmake的安装过程，移除一些预编译的二进制程序 -->

<!-- ### Bugs修复 -->
<!-- * [#1](https://github.com/waruqi/xmake/issues/4): 修复win7上安装失败问题 -->
<!-- * 修复和增强工具链检测 -->
<!-- * 修复一些安装脚本的bug, 改成外置sudo进行安装 -->
<!-- * 修复linux x86_64下安装失败问题 -->


## v0.1.25

### 新特性
 * 增加方法 openSetting
 * 增加表属性 showRefreshBtn
 * 增加表属性 showSettingBtn
 * 增加表属性 fixTop
 * 增加表属性 distanceTop


## v0.1.21

### 新特性
 * 增加方法checkAll
 * 增加方法uncheckAll
 * 增加方法checkRow
 * 增加方法uncheckRow
 * 增加事件onHeaderCheckBoxChange
 * 增加事件onRowCheckBoxChange



## v0.1.16

### Bugs修复
 * 修改getDisplayedColumns的bug


## v0.1.9

### Bugs修复
 * 修改css



## v0.1.8

### Bugs修复
 * 修复增加列拖拽排序导致的bug




## v0.1.7

### Bugs修复
 * 修改不支持文档中getSortColumns的bug

### 新特性
 * 自定义列表项修改，支持查询过滤
 * 自定义列表项修改，支持列拖拽排序，并可以保存在localStorage中



## v0.1.6

### Bugs修复
 * 修改不支持文档中排序的bug

### 新特性
 * 增加列属性sorter

### 改进
 * sortOrder属性取值由['asc', 'desc']改为['asc', 'desc', null]



## v0.1.5

### Bugs修复
 * 修复默认事件为undefined导致的bug



## v0.1.4

### 新特性
 * 增加autoLoadData属性



## v0.1.3

### Bugs修复
 * 修复分页显示错误bug



## v0.1.2

### 新特性
 * 增加onClickRow事件
 * 增加onDblClickRow事件
 * 增加onClickCell事件
 * 增加onDblClickCell事件
 * 增加setOptions方法
 * 增加setPageData方法



## v0.1.1

### Bugs修复
 * 修复不支持文档中cacheKey，cachePageSize，cacheColumns的bug



## v0.1.0

### 新特性
* 确定table控件使用风格
* 支持代码配置
* 支持声明式配置