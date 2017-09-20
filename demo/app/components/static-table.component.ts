import {OurpalmTable, Page} from "../../../src/model/ourpalm-table";
import {Component} from "@angular/core";

@Component({
    selector: 'static-table',
    template: `
        <ourpalm-table [table]="table">
            <ourpalm-table-column [column]="{header: '全选', field: 'checkAll', checkbox: true}"></ourpalm-table-column>
            <ourpalm-table-column [column]="{header: '序号', field: 'number', rownumbers: true}"></ourpalm-table-column>
            <ourpalm-table-column [column]="{header: '姓名', field: 'name', sort: true}">
                <ng-template let-data="$row">
                    {{data.name}}
                </ng-template>
            </ourpalm-table-column>
            <ourpalm-table-column [column]="{header: '年龄', field: 'age', sort: true}">
                <ng-template let-row="$row">
                    {{row.age}}
                </ng-template>
            </ourpalm-table-column>
        </ourpalm-table>
    `
})
export class StaticTableComponent {

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
                        email: `zhangsan${start}@163.com`
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
                            text: '.gitignore file(Git)'
                        }, {
                            text: '.cvsignore file(Cvs)'
                        }]
                    }]
                },
                {
                    text: '打开',
                    onclick: function () {
                        alert('打开')
                    },
                    show: () => {
                        return this.table.getSelectedRows().length % 2 == 0;
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
            ]
        });
    }

    ngDoCheck() {
        console.log('static table check');
    }
}
