import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {OurpalmTableColumn} from "../../model/ourpalm-table-column";

@Component({
    selector: '[ourpalm-table-header]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-container *ngFor="let column of columns"><!-- 隐藏列 -->
            <th *ngIf="column.show">
                <ng-container *ngIf="column.checkbox">
                    <ourpalm-table-header-checkobxcell
                            [checkAll]="checkAll"
                            (checkAllChange)="checkAllChange.emit($event)"
                            (onHeaderCheckBoxChange)="onHeaderCheckBoxChange.emit($event)">
                    </ourpalm-table-header-checkobxcell>
                </ng-container>
                <ng-container *ngIf="!column.checkbox">
                    <ourpalm-table-header-cell
                            [column]="column"
                            (onSortColumn)="onSortColumn.emit($event)">
                    </ourpalm-table-header-cell>
                </ng-container>
            </th>
        </ng-container>
    `
})
export class OurpalmTableHeaderComponent {

    @Input() columns: OurpalmTableColumn[];

    @Input() checkAll: boolean = false;
    @Output() checkAllChange: EventEmitter<any> = new EventEmitter();

    @Output() onHeaderCheckBoxChange: EventEmitter<void> = new EventEmitter<void>();
    @Output() onSortColumn: EventEmitter<OurpalmTableColumn> = new EventEmitter<OurpalmTableColumn>();

}