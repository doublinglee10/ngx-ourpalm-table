import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DoCheck,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewEncapsulation
} from "@angular/core";
import {OurpalmTableRow} from "../../model/ourpalm-table-row";

@Component({
    selector: '[ourpalm-table-body-checkboxcell]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <input type="checkbox"
               [(ngModel)]="row.checked"
               (change)="onRowCheckBoxChange.emit($event)"
               (click)="onClickCheckBox($event)"
        />
    `
})
export class OurpalmTableBodyCheckboxCellComponent implements OnChanges, DoCheck {

    @Input() row: OurpalmTableRow;
    @Output() onRowCheckBoxChange: EventEmitter<any> = new EventEmitter();

    constructor(public changeDetectorRef: ChangeDetectorRef) {
    }

    onClickCheckBox(event: Event) {
        //会触发cell的点击事件和row的select事件，所以这里需要阻止事件冒泡
        event.stopPropagation();
    }

    private _pre_checked: any;

    ngOnChanges() {
        if (this.row) {
            this._pre_checked = this.row.checked;
        }
    }

    ngDoCheck() {
        if (this.row && (this.row.checked != this._pre_checked)) {
            this._pre_checked = this.row.checked;
            this.changeDetectorRef.markForCheck();
        }
    }
}