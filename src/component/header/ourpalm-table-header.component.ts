import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {OurpalmTableColumn} from "../../model/ourpalm-table-column";

@Component({
    selector: '[ourpalm-table-header]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <tr>
            <th *ngFor="let column of columns" [class.hidden]="!column.show"><!-- 隐藏列 -->
                <ourpalm-table-header-cell
                        [column]="column"
                        (onSortColumn)="onSortColumn.emit($event)"
                        (onHeaderCheckBoxChange)="onHeaderCheckBoxChange.emit($event)">
                </ourpalm-table-header-cell>
            </th>
        </tr>
    `
})
export class OurpalmTableHeaderComponent {

    @Input() columns: OurpalmTableColumn[];

    @Output() onHeaderCheckBoxChange: EventEmitter<void> = new EventEmitter<void>();
    @Output() onSortColumn: EventEmitter<OurpalmTableColumn> = new EventEmitter<OurpalmTableColumn>();

}