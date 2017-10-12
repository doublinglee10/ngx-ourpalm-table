import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {OurpalmTableColumn} from "../../model/ourpalm-table-column";

@Component({
    selector: '[ourpalm-table-header]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <th *ngFor="let column of columns" [class.hidden]="!column.show"><!-- 隐藏列 -->
            <ourpalm-table-header-cell
                    [column]="column"
                    [checkAll]="checkAll"
                    (checkAllChange)="checkAllChange.emit($event)"
                    (onSortColumn)="onSortColumn.emit($event)"
                    (onHeaderCheckBoxChange)="onHeaderCheckBoxChange.emit($event)">
            </ourpalm-table-header-cell>
        </th>
    `
})
export class OurpalmTableHeaderComponent {

    @Input() columns: OurpalmTableColumn[];

    @Input() checkAll: boolean = false;
    @Output() checkAllChange: EventEmitter<any> = new EventEmitter();

    @Output() onHeaderCheckBoxChange: EventEmitter<void> = new EventEmitter<void>();
    @Output() onSortColumn: EventEmitter<OurpalmTableColumn> = new EventEmitter<OurpalmTableColumn>();

}