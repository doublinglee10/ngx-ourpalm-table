import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";

@Component({
    selector: 'ourpalm-table-header-checkobxcell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <!-- checkbox列 -->
        <input type="checkbox"
               [(ngModel)]="checkAll"
               (change)="onHeaderCheckBoxChange.emit($event);checkAllChange.emit(checkAll)"
        />
    `
})
export class OurpalmTableHeaderCheckboxCellComponent {

    @Input() checkAll: boolean = false;
    @Output() checkAllChange: EventEmitter<any> = new EventEmitter();

    @Output() onHeaderCheckBoxChange: EventEmitter<any> = new EventEmitter();
}