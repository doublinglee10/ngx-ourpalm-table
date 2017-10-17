import {Component} from "@angular/core";
import {OurpalmTable, Page} from "../../../src/model/ourpalm-table";

@Component({
    selector: '',
    template: `
        <h1>All Feature</h1>
        <div class="container">
            <div class="row">
                <label>tableClass</label>
                <input type="text" [(ngModel)]="table.tableClass" style="width:80%;">
            </div>
            <div class="row">
                <label>pagination</label>
                <button class="btn btn-primary btn-xs" (click)="table.pagination = true;"
                        [ngClass]="{'btn-danger': table.pagination}">pagination true
                </button>
                <button class="btn btn-primary btn-xs" (click)="table.pagination = false"
                        [ngClass]="{'btn-danger': !table.pagination}">pagination false
                </button>
            </div>
            <div class="row">
                <label>singleSelect</label>
                <button class="btn btn-primary btn-xs" (click)="table.singleSelect = true;"
                        [ngClass]="{'btn-danger': table.singleSelect}">singleSelect true
                </button>
                <button class="btn btn-primary btn-xs" (click)="table.singleSelect = false"
                        [ngClass]="{'btn-danger': !table.singleSelect}">singleSelect false
                </button>
            </div>
            <div class="row">
                <label>multiSort</label>
                <button class="btn btn-primary btn-xs" (click)="table.multiSort = true;"
                        [ngClass]="{'btn-danger': table.multiSort}">multiSort true
                </button>
                <button class="btn btn-primary btn-xs" (click)="table.multiSort = false"
                        [ngClass]="{'btn-danger': !table.multiSort}">multiSort false
                </button>
            </div>
            <div class="row">
                <label>skipPage</label>
                <button class="btn btn-primary btn-xs" (click)="table.skipPage = true;"
                        [ngClass]="{'btn-danger': table.skipPage}">skipPage true
                </button>
                <button class="btn btn-primary btn-xs" (click)="table.skipPage = false"
                        [ngClass]="{'btn-danger': !table.skipPage}">skipPage false
                </button>
            </div>
            <div class="row">
                <label>pagePosition</label>
                <button class="btn btn-primary btn-xs" (click)="table.pagePosition = 'top';"
                        [ngClass]="{'btn-danger': table.pagePosition == 'top'}">pagePosition top
                </button>
                <button class="btn btn-primary btn-xs" (click)="table.pagePosition = 'bottom'"
                        [ngClass]="{'btn-danger': table.pagePosition == 'bottom'}">pagePosition bottom
                </button>
                <button class="btn btn-primary btn-xs" (click)="table.pagePosition = 'both'"
                        [ngClass]="{'btn-danger': table.pagePosition == 'both'}">pagePosition both
                </button>
            </div>
            <div class="row">
                <label>showRefreshBtn</label>
                <button class="btn btn-primary btn-xs" (click)="table.showRefreshBtn = true;"
                        [ngClass]="{'btn-danger': table.showRefreshBtn}">showRefreshBtn true
                </button>
                <button class="btn btn-primary btn-xs" (click)="table.showRefreshBtn = false"
                        [ngClass]="{'btn-danger': !table.showRefreshBtn}">showRefreshBtn false
                </button>
            </div>
            <div class="row">
                <label>showSettingBtn</label>
                <button class="btn btn-primary btn-xs" (click)="table.showSettingBtn = true;"
                        [ngClass]="{'btn-danger': table.showSettingBtn}">showSettingBtn true
                </button>
                <button class="btn btn-primary btn-xs" (click)="table.showSettingBtn = false"
                        [ngClass]="{'btn-danger': !table.showSettingBtn}">showSettingBtn false
                </button>
            </div>
            <div class="row">
                <label>checkOnSelect</label>
                <button class="btn btn-primary btn-xs" (click)="table.checkOnSelect = true;"
                        [ngClass]="{'btn-danger': table.checkOnSelect}">checkOnSelect true
                </button>
                <button class="btn btn-primary btn-xs" (click)="table.checkOnSelect = false"
                        [ngClass]="{'btn-danger': !table.checkOnSelect}">checkOnSelect false
                </button>
            </div>
            <div class="row">
                <label>selectOnCheck</label>
                <button class="btn btn-primary btn-xs" (click)="table.selectOnCheck = true;"
                        [ngClass]="{'btn-danger': table.selectOnCheck}">selectOnCheck true
                </button>
                <button class="btn btn-primary btn-xs" (click)="table.selectOnCheck = false"
                        [ngClass]="{'btn-danger': !table.selectOnCheck}">selectOnCheck false
                </button>
            </div>
            <div class="row">
                <label>ctrlSelect</label>
                <button class="btn btn-primary btn-xs" (click)="table.ctrlSelect = true;"
                        [ngClass]="{'btn-danger': table.ctrlSelect}">ctrlSelect true
                </button>
                <button class="btn btn-primary btn-xs" (click)="table.ctrlSelect = false"
                        [ngClass]="{'btn-danger': !table.ctrlSelect}">ctrlSelect false
                </button>
            </div>
            <div class="row">
                <button class="btn btn-primary btn-xs" (click)="L(table.getDisplayedColumns())">
                    getDisplayedColumns
                </button>
                <button class="btn btn-primary btn-xs" (click)="L(table.getSelectedRows())">getSelectedRows</button>
                <button class="btn btn-primary btn-xs" (click)="L(table.getCheckedRows())">getCheckedRows</button>
                <button class="btn btn-primary btn-xs" (click)="L(table.getSortColumns())">getSortColumns</button>
                <button class="btn btn-primary btn-xs" (click)="table.firstPage()">firstPage</button>
                <button class="btn btn-primary btn-xs" (click)="table.prePage()">prePage</button>
                <button class="btn btn-primary btn-xs" (click)="table.nextPage()">nextPage</button>
                <button class="btn btn-primary btn-xs" (click)="table.lastPage()">lastPage</button>
                <button class="btn btn-primary btn-xs" (click)="table.refresh()">refresh</button>
                <button class="btn btn-primary btn-xs" (click)="table.checkAll()">checkAll</button>
                <button class="btn btn-primary btn-xs" (click)="table.uncheckAll()">uncheckAll</button>
                <button class="btn btn-primary btn-xs" (click)="table.openSetting()">openSetting</button>
            </div>
            <div class="row">
                <label>gotoSkipPage</label>
                <input type="number" [(ngModel)]="_skipPage" class="input-sm">
                <button class="btn btn-primary btn-xs" (click)="table.gotoSkipPage(_skipPage)">gotoSkipPage</button>
            </div>
            <div class="row">
                <label>checkRow / uncheckRow</label>
                <input type="number" [(ngModel)]="_rowIndex" class="input-sm">
                <button class="btn btn-primary btn-xs" (click)="table.checkRow(_rowIndex)">checkRow</button>
                <button class="btn btn-primary btn-xs" (click)="table.uncheckRow(_rowIndex)">uncheckRow</button>
            </div>
        </div>

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

    _skipPage: number = 2;
    _rowIndex: number = 1;

    table: OurpalmTable;
    columns: any[];

    ngOnInit() {
        this.columns = [];
        for (let i = 0; i < 10; i++) {
            this.columns.push({
                field: 'field1-' + i,
                header: 'header1-' + i,
                sort: true
            });
        }
        this.columns.unshift({
            field: 'checkbox',
            header: '选择列',
            checkbox: true
        }, {
            field: 'rownumbers',
            header: '序号',
            rownumbers: true,
            show: false,
            disabledContextMenu: true,
            styler: {'fontWeight': 'bold', color: 'red'}
        });

        this.table = new OurpalmTable({
            columns: this.columns,
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
            ],
            onClickRow: function () {
                console.log('click row', arguments);
            },
            onDblClickRow: function () {
                console.log('dblclick row', arguments)
            },
            onClickCell: function () {
                console.log('click cell', arguments);
            },
            onDblClickCell: function () {
                console.log('dblclick cell', arguments)
            },
            onHeaderCheckBoxChange: function () {
                console.log('onHeaderCheckBoxChange', arguments);
            },
            onRowCheckBoxChange: function () {
                console.log('onRowCheckBoxChange', arguments);
            }
        });
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

    L() {
        console.log(arguments);
    }
}