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
import {OurpalmTableColumn} from "../../model/ourpalm-table-column";
import {OurpalmTableRow} from "../../model/ourpalm-table-row";

@Component({
    selector: '[ourpalm-table-body-cell]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-container [class.hidden]="!column.show"><!-- 隐藏列 -->
            <!-- 正常列(包括排序列) -->
            <ng-container *ngIf="!column.checkbox || !column.rownumbers">
                <ng-container *ngIf="!column.template"> <!-- 动态列 -->
                    {{value}}
                </ng-container>
                <ng-container *ngIf="column.template"> <!-- 静态列 -->
                    <ng-template [ngTemplateOutlet]="column.template"
                                 [ngOutletContext]="{'$implicit': column, '$row': row.data}">
                    </ng-template>
                </ng-container>
            </ng-container>
            <!-- checkbox列 -->
            <ng-container *ngIf="column.checkbox">
                <input type="checkbox" [(ngModel)]="row.checked" (change)="onRowCheckBoxChange.emit($event)"
                       (click)="onClickCheckBox($event)">
            </ng-container>
            <!-- 序号列 -->
            <ng-container *ngIf="column.rownumbers">
                {{row.index + 1}}
            </ng-container>
        </ng-container>
    `
})
export class OurpalmTableBodyCellComponent implements OnChanges, DoCheck {

    @Input() column: OurpalmTableColumn;
    @Input() row: OurpalmTableRow;

    @Output() onRowCheckBoxChange: EventEmitter<any> = new EventEmitter();

    constructor(public changeDetectorRef: ChangeDetectorRef) {
    }

    get value(): any {
        return this.column.formatter ? this.column.formatter(this.row.data[this.column.field], this.row.data) : this.row.data[this.column.field];
    }

    onClickCheckBox(event: Event) {
        //会触发cell的点击事件和row的select事件，所以这里需要阻止事件冒泡
        event.stopPropagation();
    }

    private _pre_selected: any;
    private _pre_checked: any;

    ngOnChanges() {
        if (this.row) {
            this._pre_selected = this.row.selected;
            this._pre_checked = this.row.checked;
        }
    }

    ngDoCheck() {
        if (this.row && (this.row.checked != this._pre_checked || this.row.selected != this._pre_selected)) {
            this._pre_selected = this.row.selected;
            this._pre_checked = this.row.checked;
            this.changeDetectorRef.markForCheck();
        }
    }
}