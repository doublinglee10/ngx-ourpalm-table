import {OnInit, Component, Input} from "@angular/core";
import {OurpalmTable} from "../model/ourpalm-table";


@Component({
    selector: '[ourpalm-table-header]',
    template: `
        <th *ngFor="let column of table.columns; let i = index" [class.hidden]="!column.show"><!-- 隐藏列 -->
            <!-- 排序列 -->
            <ng-container *ngIf="column.sort">{{column.header}}</ng-container>
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

    @Input()
    table: OurpalmTable;

    checkAll: boolean = false;

    ngOnInit(): void {
    }

    onCheckBoxChange() {
        if (!this.table.singleSelect) {
            this.table.rows.forEach((row: any) => row.__checked__ = this.checkAll);
        } else if (!this.checkAll) {
            this.table.rows.forEach((row: any) => row.__checked__ = false);
        }
    }

}