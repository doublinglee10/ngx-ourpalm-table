import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";
import {OurpalmTable} from "../model/ourpalm-table";

@Component({
    selector: '[ourpalm-table-rows]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container [ngSwitch]="dynamicColumn">
            <ng-container *ngSwitchCase="true">
                <!--动态列-->
                <tr *ngFor="let row of rows; trackBy: table.trackByFun; let i = index;"
                    dynamic-event-directive
                    [listenClickEvent]="table.onClickRow"
                    (onClick)="table.onClickRow(i, row)"
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
                            dynamic-event-directive
                            [listenClickEvent]="table.onClickCell"
                            (onClick)="table.onClickCell(i, j, row, column)"
                            [listenDbClickEvent]="table.onDbClickCell"
                            (onDbClick)="table.onDbClickCell(i, j, row, column)">
                        </td>
                    </ng-container>
                </tr>
            </ng-container>
            <ng-container *ngSwitchCase="false">
                <!--静态列-->
                <tr *ngFor="let row of rows; trackBy: table.trackByFun ; let i = index;"
                    dynamic-event-directive
                    [listenClickEvent]="table.onClickRow"
                    (onClick)="table.onClickRow(i, row)"
                    [listenDbClickEvent]="table.onDbClickRow"
                    (onDbClick)="table.onDbClickRow(i, row)">
                    <td *ngFor="let col of table.columns; let j = index"
                        [class.hidden]="!col.show"
                        [ngStyle]="getStyler(col, i, j, row)"
                        dynamic-event-directive
                        [listenClickEvent]="table.onClickCell"
                        (onClick)="table.onClickCell(i, j, row, col)"
                        [listenDbClickEvent]="table.onDbClickCell"
                        (onDbClick)="table.onDbClickCell(i, j, row, col)">
                        <ourpalm-table-columnTemplateRenderer [table]="table"
                                                              [column]="col"
                                                              [row]="row"
                                                              [index]="i">
                        </ourpalm-table-columnTemplateRenderer>
                    </td>
                </tr>
            </ng-container>
        </ng-container>
    `
})
export class OurpalmTableRowComponent {

    @Input() rows: any[];

    @Input() columns: OurpalmTableColumn[];

    @Input() table: OurpalmTable;

    @Input() dynamicColumn: boolean;

    getStyler(columns: OurpalmTableColumn, rowIndex: number, columnIndex: number, rowData: any) {
        if (typeof columns.styler == 'function') {
            return columns.styler(rowIndex, columnIndex, rowData);
        } else {
            return columns.styler;
        }
    }
}