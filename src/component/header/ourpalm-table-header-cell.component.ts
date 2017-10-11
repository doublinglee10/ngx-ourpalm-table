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
            <input type="checkbox"
                   [(ngModel)]="checkAll"
                   (change)="onHeaderCheckBoxChange.emit($event);checkAllChange.emit(checkAll)">
        </ng-container>
        <!-- 正常列 | 序号列-->
        <ng-container *ngIf="!column.sort && !column.checkbox">
            {{column.header}}
        </ng-container>
    `
})
export class OurpalmTableHeaderCellComponent {

    @Input() checkAll: boolean = false;
    @Input() column: OurpalmTableColumn;

    @Output() onHeaderCheckBoxChange: EventEmitter<any> = new EventEmitter();
    @Output() checkAllChange: EventEmitter<any> = new EventEmitter();
    @Output() onSortColumn: EventEmitter<OurpalmTableColumn> = new EventEmitter();
}