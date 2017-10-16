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
import {ContextMenu, ContextMenuService} from "glowworm/lib/context-menu";

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
                        <td ourpalm-table-body-cell
                            [class.hidden]="!column.show"
                            [row]="row"
                            [column]="column"
                            (click)="onClickCellEvent(j, column, row)"
                            (dblclick)="onDbClickCellEvent(j, column, row)"
                            (onRowCheckBoxChange)="onRowCheckBoxChange.emit(row)"
                            (contextmenu)="onContextMenu($event, i, j, row, column)">
                        </td>
                    </ng-container>
                </tr>
            </ng-container>
            <ng-container *ngIf="rowViewShowType !== 'column'">
                <tr class="cardview">
                    <ourpalm-table-body-rowview
                            [rowIndex]="i"
                            [row]="row.data"
                            [rowView]="rowView"
                            [template]="rowViewTemplate">
                    </ourpalm-table-body-rowview>
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

    onClickCellEvent(cellIndex: number, row: OurpalmTableRow, column: OurpalmTableColumn) {
        this.onClickCell.emit({
            index: cellIndex,
            row,
            column
        });
    }

    onDbClickCellEvent(cellIndex: number, column: OurpalmTableColumn, row: OurpalmTableRow) {
        this.onDbClickCell.emit({
            index: cellIndex,
            row,
            column
        });
    }

    onContextMenu(event: any, rowIndex: number, cellIndex: number, row: OurpalmTableRow, column: OurpalmTableColumn) {
        if (!column.disabledContextMenu) {
            event.preventDefault();
            event.stopPropagation();

            if (!row.selected) {
                this.onClickRow.emit({row: row, event: event});
            }

            // 如果当前列没有禁用右键菜单，且 可显示的右键菜单数不为0
            let length = this.rowMenus.filter((menu: ContextMenu) => !menu.separator).filter((menu: ContextMenu) => {
                return typeof menu.show === 'function' ? menu.show() : menu.show;
            }).length;

            if (length > 0) {
                this.contextMenuService.show.next({
                    event: event,
                    menus: this.rowMenus
                });
            }
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