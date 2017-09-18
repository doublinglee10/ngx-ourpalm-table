import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {OurpalmTable} from "../model/ourpalm-table";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";

@Component({
    selector: '[ourpalm-table-header]',
    styleUrls: ['./ourpalm-table-header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <th *ngFor="let column of columns; let i = index" [class.hidden]="!column.show"><!-- 隐藏列 -->
            <!-- 排序列 -->
            <span *ngIf="column.sort" (click)="sortColumn(column)" [class.sortable]="column.sort">
                {{column.header}}
                <i class="fa"
                   [ngClass]="{'fa-sort-asc': column.sortOrder == 'asc', 'fa-sort-desc': column.sortOrder == 'desc', 'fa-sort': !column.sortOrder}"></i>
            </span>
            <!-- checkbox列 -->
            <ng-container *ngIf="column.checkbox">
                <input type="checkbox" [(ngModel)]="checkAll" (change)="onCheckBoxChange()">
            </ng-container>
            <!-- 序号列 -->
            <ng-container *ngIf="column.rownumbers">
                {{column.header}}
            </ng-container>
            <!-- 正常列 -->
            <ng-container *ngIf="!column.sort && !column.checkbox && !column.rownumbers">
                {{column.header}}
            </ng-container>
        </th>
    `
})
export class OurpalmTableHeaderComponent implements OnInit {

    @Input() table: OurpalmTable;
    @Input() columns: OurpalmTableColumn[];

    checkAll: boolean = false;

    ngOnInit(): void {
    }

    private onCheckBoxChange() {
        if (!this.table.singleSelect) {
            this.table.rows = this.table.rows.map((row: any) => {
                return {...row, ...{__checked__: this.checkAll}}
            });
        } else if (!this.checkAll) {
            this.table.rows = this.table.rows.map((row: any) => {
                return {...row, ...{__checked__: false}}
            });
        }

        if (this.table.checkOnSelect) {
            this.table.rows = this.table.rows.map((row: any) => {
                if (row.__checked__ != row.__selected__)
                    return {...row, ...{__selected__: !!row.__checked__}};
                return row;
            });
        }

        this.table.onHeaderCheckBoxChange && this.table.onHeaderCheckBoxChange();
    }

    private sortColumn(column: OurpalmTableColumn) {
        switch (column.sortOrder) {
            case 'asc':
                column.sortOrder = 'desc';
                break;
            case 'desc':
                column.sortOrder = 'asc';
                break;
            default:
                column.sortOrder = 'asc';
                break;
        }

        if (!this.table.multiSort) {
            this.columns.forEach(_column => {
                if (_column !== column) {
                    _column.sortOrder = null;
                }
            });
        }

        if (this.table.serverSort) {
            this.table.invokeLoadData();
        } else {
            this.table.rows.sort((row1, row2) => {
                switch (column.sortOrder) {
                    case 'asc':
                        return column.sorter(column, row1, row2) as number;
                    case 'desc':
                    default:
                        return -column.sorter(column, row1, row2) as number;
                }
            });
            this.table.rows = [...this.table.rows];
        }
    }

}