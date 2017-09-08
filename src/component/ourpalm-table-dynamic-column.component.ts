import {Input, Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";
import {OurpalmTable} from "../model/ourpalm-table";

@Component({
    selector: '[ourpalm-table-dynamic-column]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <!-- 隐藏列 -->
        <ng-container [class.hidden]="!column.show">
            <!-- 排序列 -->
            <ng-container *ngIf="column.sort">
                <span [innerHTML]="value | safeHtml"></span>
            </ng-container>
            <!-- checkbox列 -->
            <ng-container *ngIf="column.checkbox">
                <input type="checkbox" [(ngModel)]="row.__checked__" (change)="onCheckBoxChange()">
            </ng-container>
            <!-- 序号列 -->
            <ng-container *ngIf="column.rownumbers">
                {{index+1}}
            </ng-container>
            <!-- 正常列 -->
            <ng-container *ngIf="!column.sort && !column.checkbox && !column.rownumbers">
                <span [innerHTML]="value | safeHtml"></span>
            </ng-container>
        </ng-container>
    `
})
export class OurpalmTableDynamicColumnComponent implements OnInit {

    @Input()
    column: OurpalmTableColumn;

    @Input()
    index: number;

    @Input()
    row: any;

    @Input()
    table: OurpalmTable;

    ngOnInit(): void {
    }

    get value(): any {
        return this.column.formatter ? this.column.formatter(this.row[this.column.field], this.row) : this.row[this.column.field];
    }

    private onCheckBoxChange() {
        if (this.row.__checked__ && this.table.singleSelect) {
            this.table.rows.forEach(row => row.__checked__ = false);
            this.row.__checked__ = true;
        }
    }
}