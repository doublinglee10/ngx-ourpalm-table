import {ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";
import {OurpalmTable} from "../model/ourpalm-table";
import {uuid} from "../model/uuid";
import {ContextMenu, ContextMenuService} from "glowworm/lib/context-menu";

@Component({
    selector: '[ourpalm-table-rows]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./ourpalm-table-rows.component.css'],
    template: `
        <ng-container [ngSwitch]="dynamicColumn">
            <ng-container *ngSwitchCase="true">
                <!--动态列-->
                <ng-container *ngFor="let row of rows; let i = index;">
                    <ng-container *ngIf="!table.rowView || (table.rowView && table.rowViewShowType !== 'rowView')">
                        <tr [ngClass]="{'row-selected': row.__selected__}"
                            (click)="onClickRow(i, row, $event)"
                            dynamic-event-directive
                            [listenDbClickEvent]="table.onDbClickRow"
                            (onDbClick)="table.onDbClickRow(i, row)">
                            <ng-container *ngFor="let column of table.columns; let j = index">
                                <td ourpalm-table-dynamic-column
                                    [table]="table"
                                    [row]="row"
                                    [column]="column"
                                    [index]="i"
                                    [class.hidden]="!column.show"
                                    [ngStyle]="getStyler(column, i, j, row)"
                                    [listenClickEvent]="table.onClickCell"
                                    (onClick)="table.onClickCell(i, j, row, column)"
                                    dynamic-event-directive
                                    [listenDbClickEvent]="table.onDbClickCell"
                                    (onDbClick)="table.onDbClickCell(i, j, row, column)"
                                    [listenContextMenuEvent]="!!table.rowMenus"
                                    (onContextMenu)="showContextMenu($event, i, j, row, column)">
                                </td>
                            </ng-container>
                        </tr>
                    </ng-container>
                    <ng-container *ngIf="table.rowView && table.rowViewShowType !== 'column'">
                        <span [innerHTML]="table.rowView.renderRow(i, row) | safeHtml"></span>
                    </ng-container>
                </ng-container>
            </ng-container>
            <ng-container *ngSwitchCase="false">
                <!--静态列-->
                <ng-container *ngFor="let row of rows; let i = index;">
                    <ng-container
                            *ngIf="!table.rowViewTemplate || (table.rowViewTemplate && table.rowViewShowType !== 'rowView')">
                        <tr [ngClass]="{'row-selected': row.__selected__}"
                            (click)="onClickRow(i, row, $event)"
                            dynamic-event-directive
                            [listenDbClickEvent]="table.onDbClickRow"
                            (onDbClick)="table.onDbClickRow(i, row)">
                            <td *ngFor="let col of table.columns; let j = index"
                                [class.hidden]="!col.show"
                                [ngStyle]="getStyler(col, i, j, row)"
                                dynamic-event-directive
                                [listenClickEvent]="table.onClickCell"
                                (onClick)="table.onClickCell(i, j, row, col)"
                                [listenDbClickEvent]="table.onDbClickCell"
                                (onDbClick)="table.onDbClickCell(i, j, row, col)"
                                [listenContextMenuEvent]="!!table.rowMenus"
                                (onContextMenu)="showContextMenu($event, i, j, row, col)">
                                <ourpalm-table-columnTemplateRenderer [table]="table"
                                                                      [column]="col"
                                                                      [row]="row"
                                                                      [index]="i">
                                </ourpalm-table-columnTemplateRenderer>
                            </td>
                        </tr>
                    </ng-container>
                    <ng-container *ngIf="table.rowViewTemplate && table.rowViewShowType !== 'column'">
                        <tr class="cardview">
                            <td [attr.colspan]="table.columns.length">
                                <ng-template [ngTemplateOutlet]="table.rowViewTemplate"
                                             [ngOutletContext]="{'$implicit': column, '$row': row, '$index': i}">
                                </ng-template>
                            </td>
                        </tr>
                    </ng-container>
                </ng-container>
            </ng-container>
        </ng-container>
    `
})
export class OurpalmTableRowComponent implements OnInit, OnDestroy {

    @Input() rows: any[];

    @Input() columns: OurpalmTableColumn[];

    @Input() table: OurpalmTable;

    @Input() dynamicColumn: boolean;

    constructor(public el: ElementRef,
                private contextMenuService: ContextMenuService) {
    }

    ngOnInit(): void {
        if (this.table.rowMenus && this.table.rowMenus.length > 0) {
            this.contextMenuService.onMenuDirectiveInit();
        }
    }

    ngOnDestroy(): void {
        if (this.table.rowMenus && this.table.rowMenus.length > 0) {
            this.contextMenuService.onMenuDirectiveDestroy();
        }
    }

    getStyler(column: OurpalmTableColumn, rowIndex: number, columnIndex: number, rowData: any) {
        if (typeof column.styler == 'function') {
            return column.styler(rowIndex, columnIndex, rowData);
        } else {
            return column.styler;
        }
    }

    onClickRow(rowIndex: number, rowData: any, event: any) {
        if (this.table.onClickRow) {
            this.table.onClickRow(rowIndex, rowData);
        }

        if (this.table.singleSelect || (!this.table.singleSelect && this.table.ctrlSelect && !event.ctrlKey)) {
            this.table.rows.forEach((row) => {
                if (row !== rowData) { //如果这个row不是当前点击的row
                    if (row.__selected__) {
                        row.__uuid__ = uuid();
                        row.__selected__ = false;
                    }
                } else {
                    row.__selected__ = !row.__selected__;
                    row.__uuid__ = uuid();
                }
            });
        } else {
            rowData.__selected__ = !rowData.__selected__;
            rowData.__uuid__ = uuid();
        }

        if (this.table.selectOnCheck) {
            this.table.rows.forEach((row: any) => {
                if (row.__checked__ != row.__selected__) {
                    row.__checked__ = !!row.__selected__;
                    row.__uuid__ = uuid();
                }
            });
        }
    }

    showContextMenu(event: any, rowIndex: number, cellIndex: number, rowData: any, column: OurpalmTableColumn) {
        if (!column.disabledContextMenu) {
            event.preventDefault();
            event.stopPropagation();

            if (!rowData.__selected__) {
                this.onClickRow(rowIndex, rowData, event);
            }

            // 如果当前列没有禁用右键菜单，且 可显示的右键菜单数不为0
            let length = this.table.rowMenus.filter((menu: ContextMenu) => !menu.separator).filter((menu: ContextMenu) => {
                return typeof menu.show === 'function' ? menu.show() : menu.show;
            }).length;

            if (length > 0) {
                this.contextMenuService.show.next({
                    event: event,
                    menus: this.table.rowMenus
                });
            }
        }
    }
}
