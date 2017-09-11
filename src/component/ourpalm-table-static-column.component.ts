import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    DoCheck,
    Input,
    OnChanges,
    OnInit,
    TemplateRef
} from "@angular/core";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";
import {OurpalmTable} from "../model/ourpalm-table";
import {uuid} from "../model/uuid";

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

export class OurpalmTableColumnTemplateRenderer implements OnChanges, DoCheck {

    @Input()
    row: any;

    @Input()
    index: number;

    @Input()
    table: OurpalmTable;

    @Input()
    column: OurpalmTableColumn;

    constructor(public changeDetectorRef: ChangeDetectorRef) {
    }

    onClickCheckBox(event: Event) {
        //会触发cell的点击事件和row的select事件，所以这里需要阻止事件冒泡
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

    /**
     * 记录上次的唯一标示
     */
    private lastRowUuid: string;
    private lastColumnUuid: string;

    ngOnChanges() {
        // 每次对象改变是记录对象的uuid
        if (typeof this.row === 'object') {
            if (!this.row.__uuid__) {
                this.row.__uuid__ = uuid();
            }
            this.lastRowUuid = this.row.__uuid__;
        }
        this.lastColumnUuid = this.column.__uuid__;
    }

    ngDoCheck() {
        // 每次DoCheck时检查对象的uuid是否改变
        if (this.lastColumnUuid !== this.column.__uuid__) {
            this.changeDetectorRef.markForCheck();
        } else if (typeof this.row === 'object' && this.lastRowUuid !== this.row.__uuid__) {
            this.changeDetectorRef.markForCheck();
        }
    }
}
