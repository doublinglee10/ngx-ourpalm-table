import {Component, ElementRef, NgZone, ViewChild} from "@angular/core";
import {OurpalmTable, Page} from "./ourpalm-table/model/ourpalm-table";
import {TableConfig} from "./ourpalm-table/model/table.config";
import {OurpalmTableComponent} from "./ourpalm-table/component/ourpalm-table.component";

@Component({
    selector: 'dynamic-table',
    template: `
        <div style="z-index:1;width:800px;margin:0 50px;">
            <button (click)="log()">click event test</button>
            <button (click)="changeTable1()">table01</button>
            <button (click)="changeTable2()">table02</button>
            <button (click)="changeTable3()">table03</button>
            <button (click)="addWidth()">+ width</button>
            <button (click)="subWidth()">- width</button>
            <button (click)="toggle()">toggle</button>
        </div>
        <div #container class="table-responsive" style="margin:10px 50px;width:800px;">
            <ourpalm-table [table]="table"></ourpalm-table>
        </div>
    `
})
export class DynamicTableComponent {

    table: OurpalmTable;

    table1Columns: any[];
    table2Columns: any[];
    table3Columns: any[];

    @ViewChild('container') container: ElementRef;

    @ViewChild(OurpalmTableComponent) tb: OurpalmTableComponent;

    margin: number = 800;

    ngOnInit() {
        // if ((<any>window).screenfull && (<any>window).screenfull.enabled) {
        //     (<any>window).screenfull.on('change', () => {
        //         if ((<any>window).screenfull.isFullscreen) {
        //             // this.tb.floatThead({
        //             //     top: 100
        //             // });
        //             $(document).trigger('ngx-ourpalm-table:floatThead', {
        //                 top: 100
        //             });
        //         } else {
        //             // this.tb.floatThead({
        //             //     top: 50
        //             // });
        //             $(document).trigger('ngx-ourpalm-table:floatThead', {
        //                 top: 50
        //             });
        //         }
        //     });
        // }
    }

    addWidth() {
        this.margin += 100;
        $(this.container.nativeElement).css('width', `${this.margin}px`);
    }

    subWidth() {
        this.margin -= 100;
        $(this.container.nativeElement).css('width', `${this.margin}px`);
    }

    toggle() {
        if ((<any>window).screenfull.enabled) {
            (<any>window).screenfull.toggle();
        }
    }

    constructor(private ngZone: NgZone,
                private tableConfig: TableConfig) {

        this.table1Columns = [];
        for (let i = 0; i < 10; i++) {
            this.table1Columns.push({
                field: 'field1-' + i,
                header: 'header1-' + i
            });
        }
        this.table1Columns.unshift({
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
            field: 'rownumbers',
            header: '序号',
            rownumbers: true,
            show: false
        });

        this.table = this.tableConfig.create({
            cacheKey: 'table01',
            customClass: 'mytable',
            enabledFloatThead: true,
            autoLoadData: true,
            cachePageSize: true,
            cacheColumns: true,
            singleSelect: false,
            // pagePosition: 'both',
            columns: this.table1Columns,
            pageSize: 100,
            pageList: [10, 50, 100, 200, 500, 1000, 2000, 5000],
            loadData: this.loadData,
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

    loadData(table: OurpalmTable, callback: (page: Page) => {}) {
        setTimeout(() => {
            let rows = [];
            if (table.cacheKey == 'table01') {
                let start = (table.currentPage - 1) * table.pageSize + 1;
                let end = +start + table.pageSize;
                for (let i = start; i < end; i++) {
                    let row: any = {};
                    for (let j = 0; j < 10; j++) {
                        row['field1-' + j] = 'data1-ssssssssssssssssssssssss' + i;
                    }
                    rows.push(row);
                }
            } else if (table.cacheKey == 'table02') {
                let start = (table.currentPage - 1) * table.pageSize + 1;
                let end = start + table.pageSize;
                for (let i = start; i < end; i++) {
                    let row: any = {};
                    for (let j = 0; j < 20; j++) {
                        row['field2-' + j] = 'data2-fffffffffffffffffffffffffffffffffffffffff' + i;
                    }
                    rows.push(row);
                }
            } else if (table.cacheKey == 'table03') {
                let start = (table.currentPage - 1) * table.pageSize + 1;
                let end = start + table.pageSize;
                for (let i = start; i < end; i++) {
                    let row: any = {};
                    for (let j = 0; j < 50; j++) {
                        row['field3-' + j] = 'data3-fffffffffffffffffffffffffffffffffffffffff' + i;
                    }
                    rows.push(row);
                }
            }

            callback({
                total: 486000,
                rows: rows
            });
        }, 1000);
    }

    changeTable1() {
        this.table.setOptions({
            cacheKey: 'table01',
            cachePageSize: true,
            cacheColumns: true,
            columns: this.table1Columns,
            rows: []
        })
    }


    changeTable2() {
        this.table.setOptions({
            cacheKey: 'table02',
            cachePageSize: true,
            cacheColumns: true,
            columns: this.table2Columns,
            rows: []
        })
    }

    changeTable3() {
        this.table.setOptions({
            cacheKey: 'table03',
            cachePageSize: true,
            cacheColumns: true,
            columns: this.table3Columns,
            rows: []
        })
    }

    ngDoCheck() {
        console.log('dynamic table check');
    }

    log() {
        console.log('click test');
    }

}