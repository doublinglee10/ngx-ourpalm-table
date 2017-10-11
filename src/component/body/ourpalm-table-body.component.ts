import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewEncapsulation
} from "@angular/core";
import {OurpalmTableColumn} from "../../model/ourpalm-table-column";
import {OurpalmTableRow} from "../../model/ourpalm-table-row";
import {RowView, RowViewShowType} from "../../model/ourpalm-table";
import {OurpalmTableCell} from "../../model/ourpalm-table-cell";

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
                            (onRowCheckBoxChange)="onRowCheckBoxChange.emit(row)">
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
export class OurpalmTableBodyComponent {


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
}