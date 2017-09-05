import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";
import {OurpalmTable} from "../model/ourpalm-table";

@Component({
    selector: '[ourpalm-table-rows]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['ourpalm-table-rows.component.css'],
    template: `
        <ng-container [ngSwitch]="dynamicColumn">
            <ng-container *ngSwitchCase="true">
                <!--动态列-->
                <tr *ngFor="let row of rows; trackBy: table.trackByFun; let i = index;"
                    [ngClass]="{'row-selected': row.__checkrow__}"
                    (click)="onClickRow(i, row, $event)"

                    dynamic-event-directive
                    [listenDbClickEvent]="table.onDbClickRow"
                    (onDbClick)="table.onDbClickRow(i, row)">
                    <!--[listenClickEvent]="table.onClickRow"-->
                    <!--(onClick)="table.onClickRow(i, row)"-->
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
                            (onDbClick)="table.onDbClickCell(i, j, row, column)">
                        </td>
                    </ng-container>
                </tr>
            </ng-container>
            <ng-container *ngSwitchCase="false">
                <!--静态列-->
                <tr *ngFor="let row of rows; trackBy: table.trackByFun ; let i = index;"
                    [ngClass]="{'row-selected': row.__checkrow__}"
                    (click)="onClickRow(i, row, $event)"

                    dynamic-event-directive
                    [listenDbClickEvent]="table.onDbClickRow"
                    (onDbClick)="table.onDbClickRow(i, row)">
                    <!--[listenClickEvent]="table.onClickRow"-->
                    <!--(onClick)="table.onClickRow(i, row)"-->
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

    getStyler(column: OurpalmTableColumn, rowIndex: number, columnIndex: number, rowData: any) {
        if (typeof column.styler == 'function') {
            return column.styler(rowIndex, columnIndex, rowData);
        } else {
            return column.styler;
        }
    }

    onClickRow(rowIndex: number, rowData: any, event: any) {
        console.log('on click row', event.ctrlKey);

        if (this.table.onClickRow) {
            this.table.onClickRow(rowIndex, rowData);
        }

        if (this.table.singleSelect || (!this.table.singleSelect && this.table.ctrlSelect && !event.ctrlKey)) {
            this.table.rows = this.table.rows.map((row) => {
                if (row != rowData) {
                    if (row.__checkrow__) {
                        return {...row, ...{__checkrow__: false}}
                    } else {
                        return row;
                    }
                } else {
                    return {...row, ...{__checkrow__: !row.__checkrow__}}
                }
            });
        } else {
            Object.assign(rowData, {__checkrow__: !rowData.__checkrow__});
        }

        if (this.table.selectOnCheck) {
            this.table.rows = this.table.rows.map((row: any) => {
                if (row.__checked__ != row.__checkrow__)
                    return {...row, ...{__checked__: !!row.__checkrow__}};
                return row;
            });
        }
    }
}