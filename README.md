## ngx-ourpalm-table

基于angular2.x、bootstrap的表格控件，支持编程式和声明式列配置

#### Demo(声明式配置)
```xml
<ourpalm-table [table]="table">
    <ourpalm-table-column [column]="{header: '全选', field: 'checkAll', checkbox: true}"></ourpalm-table-column>
    <ourpalm-table-column [column]="{header: '序号', field: 'number', rownumbers: true}"></ourpalm-table-column>
    <ourpalm-table-column [column]="{header: '姓名', field: 'name'}">
        <ng-template let-data="$row">
            {{data.name}}
        </ng-template>
    </ourpalm-table-column>
    <ourpalm-table-column [column]="{header: '年龄', field: 'age'}">
        <ng-template let-row="$row">
            {{row.age}}
        </ng-template>
    </ourpalm-table-column>
</ourpalm-table>
```

```js
export class AppComponent {

    table: OurpalmTable;

    constructor() {
        this.table = new OurpalmTable({
            loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {
                var start = (table.currentPage - 1) * table.pageSize + 1;
                var end = start + table.pageSize;
                end = end > 86 ? 86 : end;
                //构造服务器假数据
                var rows = [];
                for (; start < end; start++) {
                    rows.push({
                        name: `zhangsan${start}`,
                        age: start,
                        email: `zhangsan${start}@163.com`
                    });
                }

                setTimeout(function () {
                    callback({
                        total: 86,
                        rows: rows
                    });
                }, 300);
            }
        });
    }
}
```



#### Demo(编程式配置)
```xml
<ourpalm-table [table]="table"></ourpalm-table>
```

```js
export class AppComponent {

    table: OurpalmTable;

    constructor() {
        this.table = new OurpalmTable({
            columns: [{
                header: '全选',
                checkbox: true
            }, {
                header: '序号',
                rownumbers: true
            }, {
                header: '姓名',
                field: 'name'
            }, {
                header: '年龄',
                field: 'age'
            }],
            loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {
                var start = (table.currentPage - 1) * table.pageSize + 1;
                var end = start + table.pageSize;
                end = end > 86 ? 86 : end;
                //构造服务器假数据
                var rows = [];
                for (; start < end; start++) {
                    rows.push({
                        name: `zhangsan${start}`,
                        age: start,
                        email: `zhangsan${start}@163.com`
                    });
                }

                setTimeout(function () {
                    callback({
                        total: 86,
                        rows: rows
                    });
                }, 300);
            }
        });
    }
}
```

#### 表属性

|	属性名				  |	 属性值类型 		  | 	   默认值 	   |		描述 					|
|-------------------------|-------------------|--------------------|-----------------------------|
|	pagination     		  |     boolean   	  |		true		   |	是否显示分页控件		|
|	singleSelect    	  |     boolean   	  |		false		   |	是否限制只能选中一行			|
|	serverSort     		  |     boolean   	  |		true	   	   |	是否要服务器排序		|
|	pageList     		  |     array 		  |	[10,20,30,40,50]   |	在设置分页属性的时候 初始化页面大小选择列表		|
|	defaultPageSize       |     int   		  |		10			   |	在设置分页属性的时候初始化页面大小	|
|	skipPage              |     boolean   	  |		true		   |	在设置分页属性的时候是否允许用户跳转页面	|
|	cacheKey              |     string   	  |		''  		   |	客户端存储table信息是对应存放在localStorage中的key	|
|	cachePageSize         |     boolean   	  |		false		   |	是否在客户端存储table的页大小,刷新的时候页大小不变,保存在localStorage中,key为${cacheKey}-pageSize	|
|	cacheColumns          |     boolean   	  |		false		   |	是否在客户端存在table的列隐藏信息,刷新的时候列的隐藏信息不变,保存在localStorage中,key为${cacheKey}-columns	|
|	pagePosition          |     string   	  |		bottom		   |	分页条在那里显示可取值 'bottom', 'top', 'both'	|




#### 列属性

|	属性名				  |	 属性值类型 		  | 	   默认值 	   |		描述 					|
|-------------------------|-------------------|--------------------|-----------------------------|
|	header     		 	  |     string   	  |		''			   |	表头					   |
|	field		    	  |     string   	  |		''			   |	字段名称		      	  |
|	sort	     		  |     boolean   	  |		false	   	   |	是否列排序				 |
|	sortOrder     		  |     string 		  |		asc			   |	列排序方向,取值 asc 或 desc	|
|	rownumbers		      |     boolean		  |		false		   |	是否为行号列 1...*				|
|	show			      |     boolean		  |		true		   |	是否隐藏列				|
|	checkbox		      |     boolean		  |		false		   |	是否为多选列				|



#### 方法

|	方法名				  |	 参数 		      | 	            	描述 					|
|-------------------------|-------------------|-------------------------------------------------|
|	getDisplayedColumns   |                   |		 获取显示的列信息				   |
|	getDisplayedRows      |                   |		 获取显示的行信息				   |
|	getSelectedRows       |                   |		 获取选中的行信息				   |
|	getSortColumns        |                   |		 获取排序的列信息				   |
|	getOptions            |                   |		 获取表格的实时信息,如 currentPage, pageSize  |
|	changeColumns         |   columns[]       |		 动态修改表的列定义，只支持编程方式，不支持声明式方式  |
|	firstPage             |                   |		 跳转到第一页  |
|	prePage               |                   |		 跳转到上一页  |
|	nextPage              |                   |		 跳转到下一页  |
|	lastPage              |                   |		 跳转到最后一页  |
|	refresh               |                   |		 刷新当前页    |
|	gotoSkipPage          |   page:number     |		 跳转页 1...最大页    |


*注意：所有数据为只读的，不要自己修改数据*