import {Component} from "@angular/core";
import {OurpalmTable, Page} from "../ourpalm-table/model/ourpalm-table";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    table: OurpalmTable;

    table2: OurpalmTable;

    constructor() {
        this.table = new OurpalmTable({
            cacheKey: 'table01',
            cachePageSize: true,
            cacheColumns: true,
            pagination: true,
            pagePosition: 'both',
            defaultPageSize: 10,
            skipPage: true,
            pageList: [10, 30, 50, 100, 150],
            singleSelect: true,
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

        this.table2 = new OurpalmTable({
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
            pagination: true,
            pagePosition: 'both',
            defaultPageSize: 10,
            skipPage: true,
            pageList: [10, 30, 50, 100, 150],
            singleSelect: true,
            loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {
                var start = (table.currentPage - 1) * table.pageSize + 1;
                var end = start + table.pageSize;
                end = end > 86 ? 86 : end;
                //构造服务器假数据
                var rows = [];
                for (; start < end; start++) {
                    rows.push({
                        name: `lisi${start}`,
                        age: start,
                        email: `lisi${start}@163.com`
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

        setTimeout(() => {
            let columns = this.table2.getDisplayedColumns();
            console.log('displayed columns', columns);

            let rows = this.table2.getDisplayedRows();
            console.log('displayed rows', rows);

            rows = this.table2.getSelectedRows();
            console.log('selected rows', rows);

            console.log('options', this.table2.getOptions());

            this.table2.changeColumns([{
                field: 'checkAll',
                header: '全选',
                checkbox: true
            }, {
                header: '姓名',
                field: 'name'
            }, {
                header: '年龄',
                field: 'age'
            }]);
        }, 3000);
    }
}
