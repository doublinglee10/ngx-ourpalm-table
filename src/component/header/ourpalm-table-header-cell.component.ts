import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {OurpalmTableColumn} from "../../model/ourpalm-table-column";

@Component({
    selector: 'ourpalm-table-header-cell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <!-- 排序列 -->
        <span *ngIf="column.sort" (click)="onSortColumn.next(column)" [class.sortable]="column.sort">
                {{column.header}}
                <i class="fa"
                   [ngClass]="{'fa-sort-asc': column.sortOrder == 'asc', 'fa-sort-desc': column.sortOrder == 'desc', 'fa-sort': !column.sortOrder}"></i>
        </span>
        <!-- checkbox列 -->
        <ng-container *ngIf="column.checkbox">
            <input type="checkbox" [(ngModel)]="checkAll" (change)="onHeaderCheckBoxChange.next()">
        </ng-container>
        <!-- 正常列 | 序号列-->
        <ng-container *ngIf="!column.sort && !column.checkbox">
            {{column.header}}
        </ng-container>
    `
})
export class OurpalmTableHeaderCellComponent {

    @Input() column: OurpalmTableColumn;

    @Output() onHeaderCheckBoxChange: EventEmitter<void> = new EventEmitter<void>();
    @Output() onSortColumn: EventEmitter<OurpalmTableColumn> = new EventEmitter<OurpalmTableColumn>();

}