import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {OurpalmTableColumn} from "../../model/ourpalm-table-column";

@Component({
    selector: 'ourpalm-table-header-cell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <!-- 排序列 -->
        <span *ngIf="column.sort" (click)="onSortColumn.next(column)" [class.sortable]="column.sort">
            <ng-container *ngIf="showTemplate()">
                <ng-template [ngTemplateOutlet]="column.headerTpl"></ng-template>
            </ng-container>
            <ng-container *ngIf="!showTemplate()">
                {{column.header}}
            </ng-container>
                <i class="fa"
                   [ngClass]="{'fa-sort-asc': column.sortOrder == 'asc', 'fa-sort-desc': column.sortOrder == 'desc', 'fa-sort': !column.sortOrder}"></i>
        </span>
        <!-- 正常列 | 序号列-->
        <ng-container *ngIf="!column.sort && !column.checkbox">
            <ng-container *ngIf="showTemplate()">
                <ng-template [ngTemplateOutlet]="column.headerTpl"></ng-template>
            </ng-container>
            <ng-container *ngIf="!showTemplate()">
                {{column.header}}
            </ng-container>
        </ng-container>
    `
})
export class OurpalmTableHeaderCellComponent {

    @Input() column: OurpalmTableColumn;
    @Output() onSortColumn: EventEmitter<OurpalmTableColumn> = new EventEmitter();

    showTemplate():boolean{
        console.log(Boolean(this.column.headerTpl));
        return Boolean(this.column.headerTpl)
    }
}