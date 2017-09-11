import {OurpalmTable, Page} from "../../src/model/ourpalm-table";
import {Component} from "@angular/core";
import {uuid} from "../../src/model/uuid";

@Component({
    selector: 'string-row',
    template: `
        <ourpalm-table [table]="table">
            <ourpalm-table-column [column]="{header: '全选', field: 'checkAll', checkbox: true}"></ourpalm-table-column>
            <ourpalm-table-column [column]="{header: '序号', field: 'number', rownumbers: true}"></ourpalm-table-column>
            <ourpalm-table-column [column]="{header: 'uuid', field: 'age', sort: true}">
                <ng-template let-row="$row">
                    {{row}}
                </ng-template>
            </ourpalm-table-column>
        </ourpalm-table>
    `
})
export class StringRowTableComponent {

    table: OurpalmTable;

    constructor() {
        this.table = new OurpalmTable({
            singleSelect: false,
            ctrlSelect: true,
            selectOnCheck: true,
            checkOnSelect: true,
            enabledFloatThead: true,
            serverSort: false,
            pageSize: 100,
            pageList: [10, 100, 200],
            loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {
                console.log('load data');

                var start = (table.currentPage - 1) * table.pageSize + 1;
                var end = start + table.pageSize;
                end = end > 286 ? 286 : end;
                //构造服务器假数据
                var rows = [];
                for (; start < end; start++) {
                    rows.push(uuid());
                }

                setTimeout(function () {
                    callback({
                        total: 286,
                        rows: rows
                    });
                }, 100);
            }
        });
    }

    ngDoCheck() {
        console.log('static table check');
    }
}
