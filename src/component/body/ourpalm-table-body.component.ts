import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewEncapsulation
} from "@angular/core";
import {OurpalmTableColumn} from "../../model/ourpalm-table-column";
import {OurpalmTableRow} from "../../model/ourpalm-table-row";
import {RowView, RowViewShowType} from "../../model/ourpalm-table";
import {OurpalmTableCell} from "../../model/ourpalm-table-cell";
import {getElementOffset, isMobileDevice} from "../../utils/detech-device";
import {ContextMenu, ContextMenuService} from "glowworm";

@Component({
    selector: '[ourpalm-table-body]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-container *ngFor="let row of rows; let i = index;">
            <ng-container *ngIf="rowViewShowType !== 'rowView'">
                <tr [ngClass]="{'row-selected': row.selected}"
                    (click)="onClickRow.emit({row: row, event: $event})"
                    (dblclick)="onDbClickRow.emit(row)">
                    <ng-container *ngFor="let column of columns; let j = index">
                        <ng-container *ngIf="column.checkbox && column.show">
                            <td ourpalm-table-body-checkboxcell
                                [row]="row"
                                [ngStyle]="getStyler(column, i, j, row.data)"
                                (click)="onClickCellEvent($event, j, row, column)"
                                (dblclick)="onDbClickCellEvent(j, row, column)"
                                (onRowCheckBoxChange)="onRowCheckBoxChange.emit(row);onRowCheckBoxChangeEvent($event, j, row, column);"
                                (contextmenu)="onContextMenu($event, i, j, row, column)">
                            </td>
                        </ng-container>
                        <ng-container *ngIf="!column.checkbox && column.show">
                            <td ourpalm-table-body-cell
                                [row]="row.data"
                                [column]="column"
                                [rowIndex]="i"
                                [cellIndex]="j"
                                [ngStyle]="getStyler(column, i, j, row.data)"
                                (click)="onClickCellEvent($event, j, row, column)"
                                (dblclick)="onDbClickCellEvent(j, row, column)"
                                (contextmenu)="onContextMenu($event, i, j, row, column)">
                            </td>
                        </ng-container>
                    </ng-container>
                </tr>
            </ng-container>
            <ng-container *ngIf="rowViewShowType !== 'column'">
                <tr class="cardview"
                    [ngClass]="{'row-selected': row.selected}"
                    (click)="onClickRow.emit({row: row, event: $event})"
                    (dblclick)="onDbClickRow.emit(row)">
                    <td colspan="100000">
                        <ourpalm-table-body-rowview
                                [rowIndex]="i"
                                [row]="row.data"
                                [rowView]="rowView"
                                [template]="rowViewTemplate">
                        </ourpalm-table-body-rowview>
                    </td>
                </tr>
            </ng-container>
        </ng-container>
    `
})
export class OurpalmTableBodyComponent implements OnInit, OnDestroy {

    @Input() columns: OurpalmTableColumn[];
    @Input() rows: OurpalmTableRow[];

    /**
     * 'rowView' | 'column' | 'both'
     */
    @Input() rowViewShowType: RowViewShowType;
    @Input() rowView: RowView;
    @Input() rowViewTemplate: TemplateRef<any>;

    /** 用户点击一行的时候触发 */
    @Output() onClickRow: EventEmitter<any> = new EventEmitter();
    /** 用户双击一行的时候触发 */
    @Output() onDbClickRow: EventEmitter<OurpalmTableRow> = new EventEmitter();
    /** 用户点击单元格的时候触发 */
    @Output() onClickCell: EventEmitter<OurpalmTableCell> = new EventEmitter();
    /** 用户双击单元格的时候触发 */
    @Output() onDbClickCell: EventEmitter<OurpalmTableCell> = new EventEmitter();
    /** 用户选择列表行checkbox时触发 */
    @Output() onRowCheckBoxChange: EventEmitter<OurpalmTableRow> = new EventEmitter();

    constructor(private contextMenuService: ContextMenuService) {
    }

    /** 行上下文菜单 */
    _rowMenus: ContextMenu[];

    @Input() set rowMenus(rowMenus: ContextMenu[]) {
        this._rowMenus = this._deepCloneMenus(rowMenus);
    }

    get rowMenus() {
        return this._rowMenus;
    }

    ngOnInit(): void {
        if (this.rowMenus && this.rowMenus.length > 0) {
            this.contextMenuService.onMenuDirectiveInit();
        }
    }

    ngOnDestroy(): void {
        if (this.rowMenus && this.rowMenus.length > 0) {
            this.contextMenuService.onMenuDirectiveDestroy();
        }
    }

    onClickCellEvent(event: any, cellIndex: number, row: OurpalmTableRow, column: OurpalmTableColumn) {
        this.onClickCell.emit({
            index: cellIndex,
            row,
            column
        });

        //移动端当点击cell的时候弹出右键菜单
        if (isMobileDevice()) {
            this.onContextMenu(event, row.index, cellIndex, row, column);
        }
    }

    onDbClickCellEvent(cellIndex: number, column: OurpalmTableColumn, row: OurpalmTableRow) {
        this.onDbClickCell.emit({
            index: cellIndex,
            row,
            column
        });
    }

    onRowCheckBoxChangeEvent(event: any, cellIndex: number, row: OurpalmTableRow, column: OurpalmTableColumn) {
        //移动端当点击checkbox时弹出右键菜单
        if (row.checked && isMobileDevice()) {
            let {top, left, width, height} = getElementOffset(event.target);
            event.pageY = top + height;
            event.pageX = left + width;
            this.onContextMenu(event, row.index, cellIndex, row, column);
        }
    }

    onContextMenu(event: any, rowIndex: number, cellIndex: number, row: OurpalmTableRow, column: OurpalmTableColumn) {
        if (!column.disabledContextMenu) {
            event.preventDefault();
            event.stopPropagation();

            if (!row.selected) {
                this.onClickRow.emit({row: row, event: event});
            }

            // 如果当前列没有禁用右键菜单，且 可显示的右键菜单数不为0
            let length = this.rowMenus ? this.rowMenus.filter((menu: ContextMenu) => !menu.separator).filter((menu: ContextMenu) => {
                return typeof menu.show === 'function' ? menu.show() : menu.show;
            }).length : 0;

            if (length > 0) {
                this.contextMenuService.show.next({
                    event: event,
                    menus: this.rowMenus
                });
            }
        }
    }

    getStyler(column: OurpalmTableColumn, rowIndex: number, columnIndex: number, rowData: any) {
        if (typeof column.styler == 'function') {
            return column.styler(rowIndex, columnIndex, rowData);
        } else {
            return column.styler;
        }
    }

    private _deepCloneMenus(menus: ContextMenu[]): ContextMenu[] {
        if (!menus) return;

        function deepCloneMenu(menu: ContextMenu): ContextMenu {
            if (menu.submenus) {
                menu.submenus = menu.submenus.map((submenu) => deepCloneMenu(submenu));
            }
            return new ContextMenu(menu);
        }

        return menus.map(menu => deepCloneMenu(menu));
    }
}