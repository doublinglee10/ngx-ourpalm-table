import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
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
                <ng-container *ngIf="!column.template">
                    {{value}}
                </ng-container>
                <ng-container *ngIf="column.template">
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
export class OurpalmTableBodyCellComponent {

    @Input() column: OurpalmTableColumn;
    @Input() row: OurpalmTableRow;

    @Output() onRowCheckBoxChange: EventEmitter<any> = new EventEmitter();

    get value(): any {
        return this.column.formatter ? this.column.formatter(this.row.data[this.column.field], this.row.data) : this.row.data[this.column.field];
    }

    onClickCheckBox(event: Event) {
        //会触发cell的点击事件和row的select事件，所以这里需要阻止事件冒泡
        event.stopPropagation();
    }
}