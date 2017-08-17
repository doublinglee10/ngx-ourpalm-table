import {Component} from "@angular/core";
import {OurpalmTable, Page} from "./ourpalm-table/model/ourpalm-table";
import {OurpalmTableColumn} from "./ourpalm-table/model/ourpalm-table-column";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    table: OurpalmTable;

    constructor() {
        this.table = new OurpalmTable({
            // cacheKey: 'table02',
            cachePageSize: false,
            cacheColumns: true,
            columns: [{
                header: '全选',
                checkbox: true,
                field: 'checkbox'
            }, {
                header: '序号',
                rownumbers: true,
                field: 'rownumbers'
            }, {
                header: '姓名',
                field: 'name',
                sort: true
            }, {
                header: '生日',
                field: 'birth',
                sort: true
            }, {
                header: '邮箱',
                field: 'email',
                sort: true
            }, {
                header: '手机',
                field: 'phone',
                sort: true
            }, {
                header: '住址',
                field: 'address',
                sort: true
            }, {
                header: '爱好',
                field: 'hobby',
                sort: true
            }, {
                header: '学习',
                field: 'school',
                sort: true
            }],
            serverSort: false,
            pagination: true,
            pagePosition: 'both',
            skipPage: true,
            defaultPageSize: 100,
            pageList: [100, 200, 500, 1000, 5000, 10000],
            fixTop: true,
            distanceTop: 0,
            singleSelect: true,
            loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {
                var start = (table.currentPage - 1) * table.pageSize + 1;
                var end = start + table.pageSize;
                end = end > 486000 ? 486000 : end;
                //构造服务器假数据
                var rows = [];
                for (; start <= end; start++) {
                    rows.push({
                        name: `lisi-${this.randomString(24)} ${this.randomString(24)}`,
                        age: start,
                        email: `lisi${start}@163.com`
                    });
                }

                setTimeout(function () {
                    callback({
                        total: 486000,
                        rows: rows
                    });
                }, 300);
            },
            onClickRow: function (rowIndex: number, rowData: any) {
                console.info('onClickRow', arguments);
            },
            onDbClickRow: function (rowIndex: number, rowData: any) {
                console.info('onDbClickRow', arguments);
            },
            onClickCell: function (rowIndex: number, cellIndex: number, rowData: any, column: OurpalmTableColumn) {
                console.info('onClickCell', arguments);
            },
            onDbClickCell: function (rowIndex: number, cellIndex: number, rowData: any, column: OurpalmTableColumn) {
                console.info('onDbClickCell', arguments);
            }
        });

    }

    checkAll() {
        this.table.checkAll();
    }

    uncheckAll() {
        this.table.uncheckAll();
    }

    checkRow() {
        this.table.checkRow(2);
    }

    uncheckRow() {
        this.table.uncheckRow(2);
    }

    randomString(len) {
        len = len || 32;
        var $chars = 'abcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
}
