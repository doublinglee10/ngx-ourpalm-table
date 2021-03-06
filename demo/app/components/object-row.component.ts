import {OurpalmTable, Page} from "../../../src/model/ourpalm-table";
import {Component} from "@angular/core";
import {uuid} from "../../../src/model/uuid";

@Component({
    selector: 'object-row',
    template: `
        <div>
            <button (click)="change1()">change1</button>
            <button (click)="change2()">change2</button>
            <button (click)="change3()">change3</button>
        </div>
        <div>
            <ourpalm-table [table]="table">
                <ourpalm-table-column
                        [column]="{header: '全选', field: 'checkAll', checkbox: true}"></ourpalm-table-column>
                <ourpalm-table-column
                        [column]="{header: '序号', field: 'number', rownumbers: true}"></ourpalm-table-column>
                <ourpalm-table-column [column]="{header: 'uuid', field: 'age', sort: true}">
                    <ng-template let-row="$row">
                        {{row.text}}
                    </ng-template>
                </ourpalm-table-column>
            </ourpalm-table>
        </div>
    `
})
export class ObjectRowTableComponent {

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

    row1 = {text: '1'};
    row2 = {text: '2'};
    row3 = {text: '3'};

    change1() {
        this.table.setPageData({
            currentPage: 1,
            pageSize: 1,
            total: 1,
            rows: [this.row1]
        });
    }

    change2() {
        this.table.setPageData({
            currentPage: 1,
            pageSize: 1,
            total: 2,
            rows: [this.row1, this.row2]
        });
    }

    change3() {
        this.table.setPageData({
            currentPage: 1,
            pageSize: 1,
            total: 3,
            rows: [this.row1, this.row2, this.row3]
        });
    }

    ngDoCheck() {
        console.log('static table check');
    }
}
