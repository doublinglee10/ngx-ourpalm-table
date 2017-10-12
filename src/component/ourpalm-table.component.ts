import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewEncapsulation
} from "@angular/core";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";
import {ContextMenu} from "glowworm/lib/context-menu";
import {RowView, RowViewShowType} from "../model/ourpalm-table";
import {OurpalmTableRow} from "../model/ourpalm-table-row";
import {OurpalmTableCell} from "../model/ourpalm-table-cell";

@Component({
    selector: 'ourpalm-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <table [ngClass]="tableClass">
            <thead>
                <tr *ngIf="pagination && pagePosition !== 'bottom'"
                    ourpalm-table-paging
                    [currentPage]="currentPage"
                    (currentPageChange)="currentPageChange.emit($event)"
                    [pageSize]="pageSize"
                    (pageSizeChange)="pageSizeChange.emit($event)"
                    [total]="total"
                    [rows]="rows.length"
                    [skipPage]="skipPage"
                    [pageList]="pageList"
                    [showRefreshBtn]="showRefreshBtn"
                    (onChange)="onPagingChange.emit($event)"
                    (onRefresh)="onPagingRefresh.emit($event)">
                </tr>
                <tr ourpalm-table-header
                    [columns]="columns"
                    [checkAll]="checkAll"
                    (checkAllChange)="onHeaderCheckBoxChangeEvent($event)"
                    (onSortColumn)="onSortColumn.emit($event)">
                </tr>
            </thead>
            <tbody ourpalm-table-body
                   [columns]="columns"
                   [rows]="rows"
                   [rowMenus]="rowMenus"
                   [rowView]="rowView"
                   [rowViewShowType]="rowViewShowType"
                   [rowViewTemplate]="rowViewTemplate"
                   (onClickRow)="onClickRowEvent($event)"
                   (onDbClickRow)="onDbClickRow.emit($event)"
                   (onClickCell)="onClickCell.emit($event)"
                   (onDbClickCell)="onDbClickCell.emit($event)"
                   (onRowCheckBoxChange)="onRowCheckBoxChangeEvent($event)">
            </tbody>
            <tfoot>
                <tr *ngIf="pagination && pagePosition !== 'top'"
                    ourpalm-table-paging
                    [currentPage]="currentPage"
                    (currentPageChange)="currentPageChange.emit($event)"
                    [pageSize]="pageSize"
                    (pageSizeChange)="pageSizeChange.emit($event)"
                    [total]="total"
                    [rows]="rows.length"
                    [skipPage]="skipPage"
                    [pageList]="pageList"
                    [showRefreshBtn]="showRefreshBtn"
                    (onChange)="onPagingChange.emit($event)"
                    (onRefresh)="onPagingRefresh.emit($event)">
                </tr>
            </tfoot>
        </table>
    `,
    styleUrls: [
        '../styles/index.css'
    ]
})
export class OurpalmTableComponent {

    @Input('table') _table; //TODO delete

    @Input() tableClass: string = 'table table-bordered table-striped table-hover text-center';

    /** 当前页 */
    @Input() currentPage: number = 1;
    /** 每页显示数据条数 */
    @Input() pageSize: number = 10;
    /** 是否显示分页控件 */
    @Input() pagination: boolean = true;
    /** 在设置分页属性的时候 初始化页面大小选择列表 */
    @Input() pageList: number[] = [10, 20, 30, 40, 50];
    /** 在设置分页属性的时候是否允许用户跳转页面 */
    @Input() skipPage: boolean = true;
    /** 分页条在那里显示可取值 'bottom', 'top', 'both' */
    @Input() pagePosition: 'bottom' | 'top' | 'both' = 'bottom';
    /** 是否显示刷新按钮*/
    @Input() showRefreshBtn: boolean = true;
    /** 是否显示设置按钮*/
    @Input() showSettingBtn: boolean = true;
    /** 是否打开自定义列表项 */
    @Input() openSettings: boolean = false;
    /** 分页触发加载数据事件 */
    @Output() onPagingChange: EventEmitter<void> = new EventEmitter<void>();
    /** 分页刷新触发加载数据事件 */
    @Output() onPagingRefresh: EventEmitter<void> = new EventEmitter<void>();
    /** currentPage 双向绑定 */
    @Output() currentPageChange: EventEmitter<number> = new EventEmitter();
    /** pageSize 双向绑定 */
    @Output() pageSizeChange: EventEmitter<number> = new EventEmitter();
    /** check all rows */
    @Input() checkAll: boolean = false;

    /** 客户端存储table信息是对应存放在localStorage中的key */
    @Input() cacheKey: string = '';
    /** 是否在客户端存储table的页大小,刷新的时候页大小不变,保存在localStorage中,key为ourpalm-table-${cacheKey}-pageSize */
    @Input() cachePageSize: boolean = false;
    /** 是否在客户端存在table的列隐藏信息,刷新的时候列的隐藏信息不变,保存在localStorage中,key为ourpalm-table-${cacheKey}-columns */
    @Input() cacheColumns: boolean = false;

    /** 是否限制只能选中一行 */
    @Input() singleSelect: boolean = false;
    /** 是否要服务器排序 */
    // @Input() serverSort: boolean = true;
    /** 是否允许多列排序 */
    // @Input() multiSort: boolean = true;
    /** 勾选时选中 */
    @Input() checkOnSelect: boolean = true;
    /** 选中时勾选 */
    @Input() selectOnCheck: boolean = true;
    /** 按住ctrl时为多选 */
    @Input() ctrlSelect: boolean = false;
    /** 行上下文菜单 */
    @Input() rowMenus: ContextMenu[];
    /** 自定义行渲染*/
    @Input() rowView: RowView;
    /** 自定义行渲染模板*/
    @Input() rowViewTemplate: TemplateRef<any>;
    /** 自定义行渲染模式 */
    @Input() rowViewShowType: RowViewShowType = 'column';

    /** 用户点击一行的时候触发 */
    @Output() onClickRow: EventEmitter<OurpalmTableRow> = new EventEmitter();
    /** 用户双击一行的时候触发 */
    @Output() onDbClickRow: EventEmitter<OurpalmTableRow> = new EventEmitter();
    /** 用户点击单元格的时候触发 */
    @Output() onClickCell: EventEmitter<OurpalmTableCell> = new EventEmitter();
    /** 用户双击单元格的时候触发 */
    @Output() onDbClickCell: EventEmitter<OurpalmTableCell> = new EventEmitter();
    /** 用户选择列表行checkbox时触发 */
    @Output() onRowCheckBoxChange: EventEmitter<OurpalmTableRow> = new EventEmitter();

    /** 用户选择头部checkbox时触发 */
    @Output() onHeaderCheckBoxChange: EventEmitter<any> = new EventEmitter();
    /** 用户点击头部排序时触发 */
    @Output() onSortColumn: EventEmitter<OurpalmTableColumn> = new EventEmitter<OurpalmTableColumn>();

    /** 总共多少条数据用来计算分页 */
    @Input() total: number = 0;

    /** 表格数据 */
    rows: OurpalmTableRow[];

    /** 表格列属性 */
    columns: OurpalmTableColumn[];

    /** 原始的表格数据 */
    @Input('rows') set _rows(rows: any[]) {
        rows = rows || [];
        let __rows: OurpalmTableRow[] = rows.map((row: any, index: number) => {
            return {
                index: index,
                selected: false,
                checked: false,
                data: row
            }
        });
        this.rows = __rows;
    }

    /** 原始的表格列数据 */
    @Input('columns') set _columns(columns: OurpalmTableColumn[]) {
        columns = columns || [];
        let __columns: OurpalmTableColumn[] = columns.map(column => new OurpalmTableColumn(column));
        this.columns = __columns;
    }

    /** 用户点击一行的时候触发 */
    onClickRowEvent({row, event}) {
        if (this.singleSelect || (!this.singleSelect && this.ctrlSelect && !event.ctrlKey)) {
            this.rows.forEach((_row) => {
                if (row !== _row) {
                    _row.selected = false;
                } else {
                    _row.selected = !_row.selected;
                }
            });
        } else {
            row.selected = !row.selected;
        }

        if (this.selectOnCheck) {
            this.rows.forEach((row) => {
                if (row.checked != row.selected) {
                    row.checked = row.selected;
                }
            });
        }
    }

    /** 用户双击一行的时候触发 */
    onDblClickRowEvent(row: OurpalmTableRow) {

    }

    /** 用户点击单元格的时候触发 */
    onClickCellEvent(cell: OurpalmTableCell) {

    }

    /** 用户双击单元格的时候触发 */
    onDblClickCellEvent(cell: OurpalmTableCell) {

    }

    /** 用户选择列表行checkbox时触发 */
    onRowCheckBoxChangeEvent(row: OurpalmTableRow) {
        if (this.singleSelect && row.checked) {
            this.rows.forEach((row) => {
                row.checked = false;
            });
            row.checked = true;
        }

        if (this.checkOnSelect) {
            row.selected = row.checked;
        }

        this.onRowCheckBoxChange.emit(row);
    }

    /** 用户选择头部checkbox时触发 */
    onHeaderCheckBoxChangeEvent(checkAll: boolean) {
        if (!this.singleSelect) {
            this.rows = this.rows.map((row) => {
                return {
                    ...row,
                    checked: checkAll
                }
            });
        } else if (!this.checkOnSelect) {
            this.rows = this.rows.map((row) => {
                return {
                    ...row,
                    checked: false
                }
            });
        }

        if (this.checkOnSelect) {
            this.rows = this.rows.map((row) => {
                if (row.checked != row.selected) {
                    return {...row, ...{selected: row.checked}}
                }
                return row;
            });
        }
        this.onHeaderCheckBoxChange.emit();
    }

    /** 用户点击头部排序时触发 */
    onSortColumnEvent(column: OurpalmTableColumn) {

    }

    onPagingChangeEvent() {
        console.log('onPagingChange', this.currentPage, this.pageSize);
    }
}