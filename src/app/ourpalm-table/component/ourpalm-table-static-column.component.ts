import {ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef} from "@angular/core";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";
import {OurpalmTable} from "../model/ourpalm-table";

@Component({
    selector: 'ourpalm-table-column',
    template: ` `
})
export class OurpalmTableStaticColumnComponent implements OnInit {

    @Input()
    column: OurpalmTableColumn;

    @ContentChild(TemplateRef)
    template: TemplateRef<any>;

    ngOnInit(): void {
        this.column = new OurpalmTableColumn(this.column);
    }
}

@Component({
    selector: 'ourpalm-table-columnTemplateRenderer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <!-- 排序列 -->
        <ng-container *ngIf="column.sort">
            <ng-template [ngTemplateOutlet]="column.template"
                         [ngOutletContext]="{'$implicit': column, '$row': row}"></ng-template>
        </ng-container>
        <!-- checkbox列 -->
        <ng-container *ngIf="column.checkbox">
            <input type="checkbox" [(ngModel)]="row.__checked__" (change)="onCheckBoxChange($event)"
                   (click)="onClickCheckBox($event)">
        </ng-container>
        <!-- 序号列 -->
        <ng-container *ngIf="column.rownumbers">
            {{index + 1}}
        </ng-container>
        <!-- 正常列 -->
        <ng-container *ngIf="!column.sort && !column.checkbox && !column.rownumbers">
            <ng-template [ngTemplateOutlet]="column.template"
                         [ngOutletContext]="{'$implicit': column, '$row': row}"></ng-template>
        </ng-container>
    `
})

export class OurpalmTableColumnTemplateRenderer {

    @Input()
    row: any;

    @Input()
    index: number;

    @Input()
    table: OurpalmTable;

    @Input()
    column: OurpalmTableColumn;

    onClickCheckBox(event: Event) {
        event.stopPropagation();
    }

    onCheckBoxChange(event: Event) {
        event.stopPropagation();

        if (this.row.__checked__ && this.table.singleSelect) {
            this.table.rows.forEach(row => row.__checked__ = false);
            this.row.__checked__ = true;
        }

        if (this.table.checkOnSelect) {
            this.row.__selected__ = !!this.row.__checked__;
        }

        this.table.onRowCheckBoxChange && this.table.onRowCheckBoxChange(this.row, this.index);
    }
}