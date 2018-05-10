import {AfterViewInit, Component, ContentChild, ContentChildren, Input, QueryList} from "@angular/core";
import {OurpalmTable} from "../model/ourpalm-table";
import {OurpalmTableRowViewComponent} from "./body/ourpalm-table-rowview.component";
import {OurpalmTableColumnComponent} from "./body/ourpalm-table-column.component";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";
import {OurpalmTableRow} from "../model/ourpalm-table-row";
import {OurpalmTableCell} from "../model/ourpalm-table-cell";
import {sortColumns} from "../utils/column-helpers";

@Component({
    selector: 'ourpalm-table',
    template: `
        <ourpalm-table-wrapper
                [tableClass]="table?.tableClass"
                [singleSelect]="table?.singleSelect"
                [checkOnSelect]="table?.checkOnSelect"
                [selectOnCheck]="table?.selectOnCheck"
                [ctrlSelect]="table?.ctrlSelect"
                [rowMenus]="table?.rowMenus"

                [cacheKey]="table?.cacheKey"
                [cacheColumns]="table?.cacheColumns"
                [cachePageSize]="table?.cachePageSize"

                [originalColumns]="table?.originalColumns"
                [(columns)]="table.columns"
                (onHeaderCheckBoxChange)="onHeaderCheckBoxChangeEvent()"
                (onSortColumn)="onSortColumnEvent($event)"

                [rows]="table?.tableRows"
                [rowView]="table?.rowView"
                [rowViewShowType]="table?.rowViewShowType"
                [rowViewTemplate]="table?.rowViewTemplate"
                (onClickRow)="onClickRowEvent($event)"
                (onDbClickRow)="onDblClickRowEvent($event)"
                (onClickCell)="onClickCellEvent($event)"
                (onDbClickCell)="onDblClickCellEvent($event)"
                (onRowCheckBoxChange)="onRowCheckBoxChangeEvent($event)"

                [pagination]="table?.pagination"
                [pagePosition]="table?.pagePosition"
                [(currentPage)]="table.currentPage"
                [(pageSize)]="table.pageSize"
                [total]="table?.total"
                [skipPage]="table?.skipPage"
                [pageList]="table?.pageList"
                [showRefreshBtn]="table?.showRefreshBtn"
                [showSettingBtn]="table.showSettingBtn"
                [(openSettings)]="table.openSettings"
                (onPagingChange)="onPagingChangeEvent()"
                (onPagingRefresh)="onPagingRefreshEvent()">
        </ourpalm-table-wrapper>
    `
})
export class OurpalmTableComponent implements AfterViewInit {

    @Input('table') table: OurpalmTable;

    @ContentChildren(OurpalmTableColumnComponent)
    private columnComponents: QueryList<OurpalmTableColumnComponent>;
    @ContentChild(OurpalmTableRowViewComponent)
    private rowViewComponent: OurpalmTableRowViewComponent;

    ngAfterViewInit() {
        Promise.resolve().then(() => {
            let staticColumns = this.columnComponents.toArray().map((columnComponent: OurpalmTableColumnComponent) => {
                let column: OurpalmTableColumn = columnComponent.column;
                column.template = columnComponent.template;
                column.headerTpl = columnComponent.headerTemplate || column.headerTpl;
                return new OurpalmTableColumn(column);
            });

            if (staticColumns.length > 0) {
                this.table.columns = staticColumns;
            }

            if (this.rowViewComponent) {
                this.table.rowViewTemplate = this.rowViewComponent.template;
            }

            if (this.table.autoLoadData) {
                this.table.invokeLoadData();
            }
        });
    }

    /** 用户点击一行的时候触发 */
    onClickRowEvent(row: OurpalmTableRow) {
        this.table && this.table.onClickRow && this.table.onClickRow(row.index, row.data);
    }

    /** 用户双击一行的时候触发 */
    onDblClickRowEvent(row: OurpalmTableRow) {
        this.table && this.table.onDbClickRow && this.table.onDbClickRow(row.index, row.data);
    }

    /** 用户点击单元格的时候触发 */
    onClickCellEvent(cell: OurpalmTableCell) {
        this.table && this.table.onClickCell && this.table.onClickCell(cell.row.index, cell.index, cell.row.data, cell.column);
    }

    /** 用户双击单元格的时候触发 */
    onDblClickCellEvent(cell: OurpalmTableCell) {
        this.table && this.table.onDbClickCell && this.table.onDbClickCell(cell.row.index, cell.index, cell.row.data, cell.column);
    }

    /** 用户选择列表行checkbox时触发 */
    onRowCheckBoxChangeEvent(row: OurpalmTableRow) {
        this.table && this.table.onRowCheckBoxChange && this.table.onRowCheckBoxChange(row.data, row.index);
    }

    /** 用户选择头部checkbox时触发 */
    onHeaderCheckBoxChangeEvent() {
        this.table && this.table.onHeaderCheckBoxChange && this.table.onHeaderCheckBoxChange();
    }

    /** 用户点击头部排序时触发 */
    onSortColumnEvent(column: OurpalmTableColumn) {
        sortColumns(column, this.table);
    }

    onPagingChangeEvent() {
        this.table.invokeLoadData();
    }

    onPagingRefreshEvent() {
        this.table.invokeLoadData();
    }
}