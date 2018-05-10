import {OurpalmTable, Page} from "../../../src/model/ourpalm-table";
import {Component} from "@angular/core";

@Component({
    selector: 'static-table',
    template: `
        <ourpalm-table [table]="table">
            <ourpalm-table-column
                    [column]="{header: '全选', field: 'checkAll', checkbox: true, styler: styler, clazz: 'myclazz' }"></ourpalm-table-column>
            <ourpalm-table-column
                    [column]="{header: '序号', field: 'number', rownumbers: true, styler: styler}"></ourpalm-table-column>
            <ourpalm-table-column [column]="{header: '姓名', field: 'name', sort: true}">
                <ng-template #header>
                    <span style="color:red;">姓名</span>
                </ng-template>
                <ng-template #row let-data="$row">
                    <span style="color:red;">{{data.name}}</span>
                </ng-template>
            </ourpalm-table-column>
            <ourpalm-table-column [column]="{header: '年龄', field: 'age', sort: true, headerTpl: ageHeader}">
                <ng-template #ageHeader>
                    <span style="color:blue;">年龄</span>
                </ng-template>
                <ng-template #row let-row="$row" let-rowIndex="$rowIndex" let-cellIndex="$cellIndex">
                    {{row.age}} - {{rowIndex}} - {{cellIndex}}
                </ng-template>
            </ourpalm-table-column>
        </ourpalm-table>
    `
})
export class StaticTableComponent {

    styler = () => {
        return {
            width: '50px'
        }
    };

    table: OurpalmTable;

    constructor() {
        this.table = new OurpalmTable({
            cacheKey: 'table001',
            cacheColumns: true,
            cachePageSize: true,
            singleSelect: false,
            ctrlSelect: true,
            selectOnCheck: true,
            checkOnSelect: true,
            // enabledFloatThead: true,
            floatTheadConfig: {
                zIndex: 10,
                top: 50,
                responsiveContainer: function ($table) {
                    return $table.closest('.table-responsive');
                }
            },
            serverSort: true,
            multiSort: true,
            pageSize: 100,
            pageList: [10, 100, 200],
            loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {
                let columns = this.table.getSortColumns();
                console.log(columns.map(col => `${col.field} : ${col.sortOrder}`).join(' - '));

                var start = (table.currentPage - 1) * table.pageSize + 1;
                var end = start + table.pageSize;
                end = end > 286 ? 286 : end;
                //构造服务器假数据
                var rows = [];
                for (; start < end; start++) {
                    rows.push({
                        name: `zhangsan${start}`,
                        age: start,
                        email: `zhangsan${start}@163.com`,
                        test: `test${start}`
                    });
                }
                setTimeout(function () {
                    callback({
                        total: 286,
                        rows: rows
                    });
                }, 100);
            },
            rowMenus: [
                {
                    text: '新建',
                    submenus: [{
                        text: '文件',
                        iconCls: 'fa fa-file'
                    }, {
                        text: '文件夹',
                        iconCls: 'fa fa-folder'
                    }, {
                        text: '.ignore file',
                        submenus: [{
                            text: '.gitignore file(Git)',
                            onclick: function () {
                                alert('gitignore file(Git)')
                            }
                        }, {
                            text: '.cvsignore file(Cvs)',
                            onclick: function () {
                                alert('cvsignore file(Cvs)')
                            }
                        }]
                    }]
                },
                {
                    text: '打开',
                    onclick: function () {
                        alert('打开')
                    }
                },
                {
                    separator: true
                }, {
                    text: '设置',
                    onclick: function () {
                        alert('设置')
                    }
                }
            ],
            onClickRow: (rowIndex: number, rowData: any) => {
                console.warn('click row');
            },
            /** 用户双击一行的时候触发 */
            onDbClickRow: (rowIndex: number, rowData: any) => {
                console.warn('dbclick row');
            },
            /** 用户点击单元格的时候触发 */
            onClickCell: (rowIndex: number, cellIndex: number, rowData: any, column: any) => {
                console.warn('click cell');
            },
            onDbClickCell: (rowIndex: number, rowData: any) => {
                console.warn('dbclick cell');
            }
        });

        setTimeout(() => {
            console.log('动态添加列');
            this.table.columns = [
                ...this.table.columns,
                {
                    field: 'test',
                    header: 'test'
                }
            ];
        }, 5000)
    }

    ngDoCheck() {
        console.log('static table check');
    }
}
