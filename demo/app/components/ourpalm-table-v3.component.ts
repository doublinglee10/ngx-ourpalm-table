import {Component} from "@angular/core";
import {ngfor_page2_rows} from "./ngfor-data/page2.data";
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
                    <ourpalm-table [table]="table"></ourpalm-table>
                </div>
            </div>
        </div>
    `
})
export class OurpalmTableV3Component {

    rows: any[];

    columns: any[];

    table: OurpalmTable;

    table1Columns: any[];
    table2Columns: any[];
    table3Columns: any[];

    ngOnInit() {
        this.table1Columns = [];
        for (let i = 0; i < 10; i++) {
            this.table1Columns.push({
                field: 'field1-' + i,
                header: 'header1-' + i
            });
        }
        this.table1Columns.unshift({
            field: 'checkbox',
            header: '选择列',
            checkbox: true
        }, {
            field: 'rownumbers',
            header: '序号',
            rownumbers: true,
            show: false,
            disabledContextMenu: true
        });

        this.table2Columns = [];
        for (let i = 0; i < 20; i++) {
            this.table2Columns.push({
                field: 'field2-' + i,
                header: 'header2-' + i
            });
        }
        this.table2Columns.unshift({
            field: 'checkbox',
            header: '选择列',
            checkbox: true
        }, {
            field: 'rownumbers',
            header: '序号',
            rownumbers: true,
            show: false
        });

        this.table3Columns = [];
        for (let i = 0; i < 50; i++) {
            this.table3Columns.push({
                field: 'field3-' + i,
                header: 'header3-' + i
            });
        }
        this.table3Columns.unshift({
            field: 'checkbox',
            header: '选择列',
            checkbox: true
        }, {
            field: 'rownumbers',
            header: '序号',
            rownumbers: true,
            show: false
        });

        this.table = new OurpalmTable({
            columns: this.table1Columns,
            serverSort: false,
            pagePosition: 'bottom',
            cacheKey: 'table01',
            cacheColumns: true,
            cachePageSize: true,
            pageSize: 2,
            pageList: [2, 5, 10, 50, 100, 200, 1000],
            loadData: (table: OurpalmTable, callback: (page: Page) => {}) => {
                let rows = [];
                let start = (table.currentPage - 1) * table.pageSize + 1;
                let end = +start + table.pageSize;
                for (let i = start; i < end; i++) {
                    let row: any = {};
                    for (let j = 0; j < 10; j++) {
                        row['field1-' + j] = `data1-${i}-${this.randomStr()}`;
                    }
                    rows.push(row);
                }

                console.log('load data success');

                setTimeout(() => {
                    callback({
                        total: 486000,
                        rows: rows
                    });
                });
            },
            rowMenus: [
                {
                    text: '新建',
                    submenus: [{
                        text: '文件',
                        iconCls: 'fa fa-file'
                    }, {
                        text: '文件夹',
                        iconCls: 'fa fa-folder'
                    }, {
                        text: '.ignore file',
                        submenus: [{
                            text: '.gitignore file(Git)'
                        }, {
                            text: '.cvsignore file(Cvs)'
                        }]
                    }]
                },
                {
                    text: '打开',
                    onclick: function () {
                        alert('打开')
                    },
                    show: () => {
                        return this.table.getSelectedRows().length % 2 == 0;
                    }
                },
                {
                    separator: true
                }, {
                    text: '设置',
                    onclick: function () {
                        alert('设置')
                    }
                }
            ]
        });
    }

    page1() {
        this.table.openSettings = true;
    }

    page2() {
        this.rows = ngfor_page2_rows;
    }

    randomStr() {
        return Math.random().toString(36).substring(2, 15);
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