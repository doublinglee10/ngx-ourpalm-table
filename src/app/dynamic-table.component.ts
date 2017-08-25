import {Component, NgZone} from "@angular/core";
import {OurpalmTable, Page} from "./ourpalm-table/model/ourpalm-table";

@Component({
    selector: 'dynamic-table',
    template: `
        <button (click)="changeTable1()">table01</button>
        <button (click)="changeTable2()">table02</button>
        <ourpalm-table [table]="table"></ourpalm-table>
    `
})
export class DynamicTableComponent {

    table: OurpalmTable;

    table1Columns: any[];
    table2Columns: any[];

    constructor(private ngZone: NgZone) {

        this.table1Columns = [];
        for (let i = 0; i < 10; i++) {
            this.table1Columns.push({
                field: 'field1-' + i,
                header: 'header1-' + i
            });
        }

        this.table2Columns = [];
        for (let i = 0; i < 20; i++) {
            this.table2Columns.push({
                field: 'field2-' + i,
                header: 'header2-' + i
            });
        }

        this.table = new OurpalmTable({
            cacheKey: 'table01',
            cachePageSize: true,
            cacheColumns: true,
            pagePosition: 'both',
            columns: this.table1Columns,
            loadData: this.loadData
        });
    }

    loadData(table: OurpalmTable, callback: (page: Page) => {}) {
        setTimeout(() => {
            let rows = [];
            if (table.cacheKey == 'table01') {
                for (let i = 0; i < 50; i++) {
                    let row: any = {};
                    for (let j = 0; j < 10; j++) {
                        row['field1-' + j] = 'data1' + i;
                    }
                    rows.push(row);
                }
            } else if (table.cacheKey == 'table02') {
                for (let i = 0; i < 50; i++) {
                    let row: any = {};
                    for (let j = 0; j < 20; j++) {
                        row['field2-' + j] = 'data2' + i;
                    }
                    rows.push(row);
                }
            }

            callback({
                total: 486000,
                rows: rows
            });
        }, 300);
    }

    changeTable1() {
        this.table.setOptions({
            cacheKey: 'table01',
            cachePageSize: true,
            cacheColumns: true,
            columns: this.table1Columns
        })
    }


    changeTable2() {
        this.table.setOptions({
            cacheKey: 'table02',
            cachePageSize: true,
            cacheColumns: true,
            columns: this.table2Columns
        })
    }


}