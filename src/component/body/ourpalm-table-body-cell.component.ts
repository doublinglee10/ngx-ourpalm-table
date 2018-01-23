import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from "@angular/core";
import {OurpalmTableColumn} from "../../model/ourpalm-table-column";

@Component({
    selector: '[ourpalm-table-body-cell]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <!-- 正常列(包括排序列) -->
        <ng-container *ngIf="!column.checkbox || !column.rownumbers">
            <ng-container *ngIf="!column.template"> <!-- 动态列 -->
                <span [innerHTML]="value ? (value | safeHtml) : value"></span>
            </ng-container>
            <ng-container *ngIf="column.template"> <!-- 静态列 -->
                <ng-template [ngTemplateOutlet]="column.template"
                             [ngTemplateOutletContext]="{'$implicit': column, '$row': row, '$rowIndex': rowIndex, '$cellIndex': cellIndex}">
                </ng-template>
            </ng-container>
        </ng-container>
        <!-- 序号列 -->
        <ng-container *ngIf="column.rownumbers">
            {{rowIndex + 1}}
        </ng-container>
    `
})
export class OurpalmTableBodyCellComponent {

    @Input() column: OurpalmTableColumn;
    @Input() row: any;
    @Input() rowIndex: number;
    @Input() cellIndex: number;

    get value(): any {
        return this.column.formatter ? this.column.formatter(this.row[this.column.field], this.row) : this.row[this.column.field];
    }
}