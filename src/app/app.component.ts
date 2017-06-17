import {Component} from "@angular/core";
import {OurpalmTable, Page} from "../ourpalm-table/model/ourpalm-table";
import {OurpalmTableColumn} from "../ourpalm-table/model/ourpalm-table-column";

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
            autoLoadData: false,
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
                console.info('loadData', table, callback);

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
                    console.info('callback');
                    callback({
                        total: 86,
                        rows: rows
                    });
                }, 300);
            },
            // onClickRow: function (rowIndex: number, rowData: any) {
            //     console.info('onClickRow', arguments);
            // },
            // onDbClickRow: function (rowIndex: number, rowData: any) {
            //     console.info('onDbClickRow', arguments);
            // },
            // onClickCell: function (rowIndex: number, cellIndex: number, rowData: any, column: OurpalmTableColumn) {
            //     console.info('onClickCell', arguments);
            // },
            // onDbClickCell: function (rowIndex: number, cellIndex: number, rowData: any, column: OurpalmTableColumn) {
            //     console.info('onDbClickCell', arguments);
            // }
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
                field: 'name',
                sort: true
            }, {
                header: '年龄',
                field: 'age',
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
                        name: `lisi-${this.randomString(4)}`,
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

        console.info(this.table2);

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
            defaultPageSize: 30
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
