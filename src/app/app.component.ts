import {Component} from "@angular/core";
import {OurpalmTable, Page} from "./ourpalm-table/model/ourpalm-table";
import {OurpalmTableColumn} from "./ourpalm-table/model/ourpalm-table-column";
import {oolumns, rows} from "./config";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    table: OurpalmTable;

    constructor() {

        let columns = oolumns.map((col: any) => {
            return {
                field: col.name,
                header: col.desc,
                show: col.view == '1' ? true : false
            }
        });

        this.table = new OurpalmTable({
            // cacheKey: 'table02',
            cachePageSize: false,
            cacheColumns: true,
            columns: columns,
            serverSort: false,
            pagination: true,
            // pagePosition: 'both',
            skipPage: true,
            defaultPageSize: 100,
            pageList: [100, 200, 500, 1000, 5000, 10000],
            // fixTop: true,
            distanceTop: 0,
            singleSelect: true,
            loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {

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
        let $chars = 'abcdefhijkmnprstwxyz2345678';
        let maxPos = $chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
}
