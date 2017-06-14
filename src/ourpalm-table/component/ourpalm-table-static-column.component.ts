import {Input, OnInit, Component, TemplateRef, ContentChild} from "@angular/core";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";

@Component({
    selector: 'td[ourpalm-table-column]',
    template: ``
})
export class OurpalmTableStaticColumnComponent implements OnInit {

    @Input('ourpalm-table-column')
    column: OurpalmTableColumn;

    @ContentChild(TemplateRef)
    template: TemplateRef<any>;

    ngOnInit(): void {
        this.column = new OurpalmTableColumn(this.column);
    }
}

@Component({
    selector: 'ourpalm-table-columnTemplateRenderer',
    template: `
        <!-- 排序列 -->
        <ng-container *ngIf="column.sort">
            <template [ngTemplateOutlet]="columnDir?.template" [ngOutletContext]="{'$implicit': column, '$row': row}"></template>
        </ng-container>
        <!-- checkbox列 -->
        <ng-container *ngIf="column.checkbox">
            <input type="checkbox" [(ngModel)]="row.__checked__">
        </ng-container>
        <!-- 序号列 -->
        <ng-container *ngIf="column.rownumbers">
            {{index+1}}
        </ng-container>
        <!-- 正常列 -->
        <ng-container *ngIf="!column.sort && !column.checkbox && !column.rownumbers">
            <template [ngTemplateOutlet]="columnDir?.template" [ngOutletContext]="{'$implicit': column, '$row': row}"></template>
        </ng-container>
    `
})

export class OurpalmTableColumnTemplateRenderer implements OnInit {

    @Input()
    columnDir: OurpalmTableStaticColumnComponent;

    @Input()
    row: any;

    @Input()
    index: number;

    column: OurpalmTableColumn;

    ngOnInit() {
        this.column = this.columnDir.column;
    }
}