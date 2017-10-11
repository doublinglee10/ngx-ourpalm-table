import {Component} from "@angular/core";
import {ngfor_page2_rows} from "./ngfor-data/page2.data";
import {ngfor_page1_rows} from "./ngfor-data/page1.data";
import {ngfor_columns} from "./ngfor-data/columns.data";
import {OurpalmTable, Page} from "../../../src/model/ourpalm-table";

@Component({
    selector: '',
    template: `
        <h1>V3</h1>
        <button class="btn btn-primary btn-xs" (click)="page1()">page1</button>
        <button class="btn btn-primary btn-xs" (click)="page2()">page2</button>

        <div class="container">
            <div class="row">
                <div class="table-responsive">
                    <!--<ourpalm-table-->
                    <!--[columns]="columns"-->
                    <!--[rows]="rows"-->
                    <!--[total]="1000">-->
                    <!--</ourpalm-table>-->
                    <ourpalm-table-container
                            [table]="table">
                    </ourpalm-table-container>
                </div>
            </div>
        </div>
    `
})
export class OurpalmTableV3Component {

    rows: any[];

    columns: any[];

    table: OurpalmTable;

    ngOnInit() {
        this.columns = ngfor_columns;

        this.table = new OurpalmTable({
            columns: [{
                header: '全选',
                checkbox: true
            }, {
                header: '序号',
                rownumbers: true
            }, {
                header: '姓名',
                field: 'name',
                sort: true
            }, {
                header: '年龄',
                field: 'age',
                sort: true
            }],
            serverSort: false,
            pageSize: 10,
            pageList: [10, 50, 100, 200, 1000],
            loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {
                var start = (table.currentPage - 1) * table.pageSize + 1;
                var end = (+start) + (+table.pageSize);
                end = end > 1186 ? 1186 : end;
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
                        total: 1186,
                        rows: rows
                    });
                }, 100);
            }
        });
    }

    page1() {
        this.rows = ngfor_page1_rows;
    }

    page2() {
        this.rows = ngfor_page2_rows;
    }

    ngDoCheck() {
        console.time("check");
        console.log('check start');
    }

    ngAfterViewChecked() {
        console.timeEnd("check");
        console.log('check end');
    }
}