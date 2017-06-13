import {Input, Component, OnInit} from "@angular/core";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";


@Component({
    selector: '[ourpalm-table-column]',
    template: `
        <!-- 隐藏列 -->
        <ng-container [class.hidden]="!column.show">
            <!-- 排序列 -->
            <ng-container *ngIf="column.sort">{{value()}}</ng-container>
            <!-- checkbox列 -->
            <ng-container *ngIf="column.checkbox">
                <input type="checkbox" [(ngModel)]="row.__checked__" name="checkAll">
            </ng-container>
            <!-- 序号列 -->
            <ng-container *ngIf="column.rownumbers">
                {{index+1}}
            </ng-container>
            <!-- 正常列 -->
            <ng-container *ngIf="!column.sort && !column.checkbox && !column.rownumbers">
                {{value()}}
            </ng-container>
        </ng-container>
    `
})
export class OurpalmTableColumnComponent implements OnInit {

    @Input()
    column: OurpalmTableColumn;

    @Input()
    index: number;

    @Input()
    row: any;

    ngOnInit(): void {
    }

    value(): any {
        return this.column.formatter ? this.column.formatter(this.row[this.column.field], this.row) : this.row[this.column.field];
    }
}