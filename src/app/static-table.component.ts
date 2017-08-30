import {OurpalmTable, Page} from "./ourpalm-table/model/ourpalm-table";
import {Component} from "@angular/core";

@Component({
    selector: 'static-table',
    template: `
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
    `
})
export class StaticTableComponent {

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