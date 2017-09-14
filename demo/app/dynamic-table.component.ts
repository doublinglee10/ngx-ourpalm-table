import {Component, ElementRef, NgZone, ViewChild} from "@angular/core";
import {OurpalmTable, Page} from "../../src/model/ourpalm-table";
import {TableConfig} from "../../src/model/table.config";
import {OurpalmTableComponent} from "../../src/component/ourpalm-table.component";

@Component({
    selector: 'dynamic-table',
    template: `
        <div style="z-index:1;width:800px;margin:0 50px;">
            <button (click)="log($event)">click event test</button>
            <button (click)="changeTable1()">table01</button>
            <button (click)="changeTable2()">table02</button>
            <button (click)="changeTable3()">table03</button>
            <button (click)="toggle()">toggle</button>
        </div>
        <div #container class="table-responsive" style="margin:10px 50px;">
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


    toggle() {
        $('.navbar.navbar-fixed-top').toggleClass('hidden');
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

        this.table = this.tableConfig.create({
            cacheKey: 'table01',
            customClass: 'mytable',
            enabledFloatThead: true,
            floatTheadConfig: {
                zIndex: 10,
                responsiveContainer: function ($table) {
                    return $table.closest('.table-responsive');
                },
                top: function () {
                    if ((<any>window).screenfull.isFullscreen) {
                        return 0;
                    } else {
                        return 50;
                    }
                }
            },
            autoLoadData: true,
            cachePageSize: true,
            cacheColumns: true,
            singleSelect: false,
            ctrlSelect: true,
            selectOnCheck: true,
            checkOnSelect: true,
            pagePosition: 'bottom',
            columns: this.table1Columns,
            pageSize: 100,
            pageList: [10, 50, 100, 200, 500, 1000, 2000, 5000],
            loadData: this.loadData.bind(this),
            rowMenus: [{
                text: '详情',
                submenus: [{
                    text: '用户详情',
                    show: () => {
                        return true
                    },
                    onclick: () => {
                    }
                }, {
                    text: '角色详情',
                    show: () => {
                        return true
                    },
                    onclick: () => {
                    }
                }, {
                    text: '订单详情',
                    show: () => {
                        return true
                    },
                    onclick: () => {
                    }
                }]
            }, {
                text: '封停',
                submenus: [{
                    text: '角色封停',
                    show: () => {
                        return true
                    },
                    onclick: () => {
                    }
                }, {
                    text: '用户封停',
                    show: () => {
                        return true
                    },
                    onclick: () => {
                    }
                }, {
                    text: '设备封停',
                    show: () => {
                        return true
                    },
                    onclick: () => {
                    }
                }, {
                    text: 'IP封停',
                    show: () => {
                        return true
                    },
                    onclick: () => {
                    }
                }]
            }, {
                text: '禁言',
                submenus: [{
                    text: '角色禁言',
                    show: () => {
                        return true
                    },
                    onclick: () => {
                    }
                }, {
                    text: '用户禁言',
                    show: () => {
                        return true
                    },
                    onclick: () => {
                    }
                }, {
                    text: '设备禁言',
                    show: () => {
                        return true
                    },
                    onclick: () => {
                    }
                }, {
                    text: 'IP禁言',
                    show: () => {
                        return true
                    },
                    onclick: () => {
                    }
                }]
            }, {
                text: '重置密码',
                show: () => {
                    return true
                },
                onclick: () => {
                }
            }, {
                text: '账号绑定',
                show: () => {
                    return true
                },
                onclick: () => {
                }
            }, {
                text: '标记测试号',
                show: () => {
                    return true
                },
                onclick: () => {
                }
            }, {
                text: '补单',
                show: () => {
                    return true
                },
                onclick: () => {
                }
            }, {
                text: '重新发货',
                show: () => {
                    return true
                },
                onclick: () => {
                }
            }, {
                text: 'display',
                submenus: [{
                    text: 'display日志',
                    show: () => {
                        return true
                    },
                    submenus: [{
                        text: '按角色',
                        show: () => {
                            return true
                        },
                        onclick: () => {
                        }
                    }, {
                        text: '按账户',
                        show: () => {
                            return true
                        },
                        onclick: () => {
                        }
                    }, {
                        text: '按MAC',
                        show: () => {
                            return true
                        },
                        onclick: () => {
                        }
                    }, {
                        text: '按IDFA',
                        show: () => {
                            return true
                        },
                        onclick: () => {
                        }
                    }, {
                        text: '按IP',
                        show: () => {
                            return true
                        },
                        onclick: () => {
                        }
                    }]
                }, {
                    text: 'display订单',
                    show: () => {
                        return true
                    },
                    submenus: [{
                        text: '按角色',
                        show: () => {
                            return this.table.getSelectedRows().length >= 3;
                        },
                        onclick: () => {
                        }
                    }, {
                        text: '按账户',
                        show: () => {
                            return this.table.getSelectedRows().length >= 3;
                        },
                        onclick: () => {
                        }
                    }]
                }]
            }]
        });
    }

    loadData(table: OurpalmTable, callback: (page: Page) => {}) {
        let rows = [];
        if (table.cacheKey == 'table01') {
            let start = (table.currentPage - 1) * table.pageSize + 1;
            let end = +start + table.pageSize;
            for (let i = start; i < end; i++) {
                let row: any = {};
                for (let j = 0; j < 10; j++) {
                    row['field1-' + j] = `data1-${i}-${this.randomStr()}`;
                }
                rows.push(row);
            }
        } else if (table.cacheKey == 'table02') {
            let start = (table.currentPage - 1) * table.pageSize + 1;
            let end = start + table.pageSize;
            for (let i = start; i < end; i++) {
                let row: any = {};
                for (let j = 0; j < 20; j++) {
                    row['field2-' + j] = `data2-${i}-${this.randomStr()}`;
                }
                rows.push(row);
            }
        } else if (table.cacheKey == 'table03') {
            let start = (table.currentPage - 1) * table.pageSize + 1;
            let end = start + table.pageSize;
            for (let i = start; i < end; i++) {
                let row: any = {};
                for (let j = 0; j < 50; j++) {
                    row['field3-' + j] = `data3-${i}-${this.randomStr()}`;
                }
                rows.push(row);
            }
        }

        console.log('load data success');

        callback({
            total: 486000,
            rows: rows
        });
    }

    randomStr() {
        return Math.random().toString(36).substring(2, 15);
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

    log(event: Event) {
        event.preventDefault();
        console.log('click test');
    }

}
