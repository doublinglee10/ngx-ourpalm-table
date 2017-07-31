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

    table2: OurpalmTable;

    constructor() {
        this.table = new OurpalmTable({
            autoLoadData: true,
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
                console.info('current page: ', table.currentPage);

                var start = (table.currentPage - 1) * table.pageSize + 1;
                var end = start + table.pageSize;
                end = end > 86 ? 86 : end;
                //构造服务器假数据
                var rows = [];
                for (; start <= end; start++) {
                    rows.push({
                        name: `zhangsan${start}`,
                        age: start,
                        email: `zhangsan${start}@163.com`
                    });
                }
                setTimeout(function () {
                    callback({
                        total: 0,
                        rows: []
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
            },
            onHeaderCheckBoxChange: function () {
                console.info('onHeaderCheckBoxChange', arguments);
            },
            onRowCheckBoxChange: function () {
                console.info('onRowCheckBoxChange', arguments);
            }
        });

        this.table2 = new OurpalmTable({
            cacheKey: 'table02',
            cachePageSize: true,
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
                for (; start <= end; start++) {
                    rows.push({
                        name: `lisi-${this.randomString(24)} ${this.randomString(24)}`,
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

        // console.info(this.table2);

        // setTimeout(() => {
        // let columns = this.table2.getDisplayedColumns();
        // console.log('displayed columns', columns);
        //
        // let rows = this.table2.getDisplayedRows();
        // console.log('displayed rows', rows);
        //
        // rows = this.table2.getSelectedRows();
        // console.log('selected rows', rows);
        //
        // console.log('options', this.table2.getOptions());

        // this.table2.changeColumns([{
        //     field: 'checkAll',
        //     header: '全选',
        //     checkbox: true
        // }, {
        //     header: '姓名',
        //     field: 'name'
        // }, {
        //     header: '年龄',
        //     field: 'age'
        // }]);
        // }, 3000);
    }

    changeOptions() {
        this.table.setOptions({
            autoLoadData: true,
            currentPage: 2,
            defaultPageSize: 20
        });
    }

    setPageData() {
        var rows = [];
        let start = 21, end = 40;
        for (; start < end; start++) {
            rows.push({
                name: `data${start}`,
                age: start,
                email: `data${start}@163.com`
            });
        }

        this.table.setPageData({
            currentPage: 2,
            pageSize: 20,
            total: 86,
            rows: rows
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
