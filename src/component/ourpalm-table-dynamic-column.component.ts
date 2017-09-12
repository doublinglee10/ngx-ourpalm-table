import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnChanges} from "@angular/core";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";
import {OurpalmTable} from "../model/ourpalm-table";
import {uuid} from "../model/uuid";

/**
 * 优化思路
 * 使用OnPush策略，给rowData增加uuid字段，只有当UUID字段更新时才更新UI
 */
@Component({
    selector: '[ourpalm-table-dynamic-column]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <!-- 隐藏列 -->
        <ng-container [class.hidden]="!column.show">
            <!-- 排序列 -->
            <ng-container *ngIf="column.sort">
                <span [innerHTML]="value | safeHtml"></span>
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
                <span [innerHTML]="value | safeHtml"></span>
            </ng-container>
        </ng-container>
    `
})
export class OurpalmTableDynamicColumnComponent implements OnChanges, DoCheck {

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

    get value(): any {
        if (typeof this.row === 'object') {
            return this.column.formatter ? this.column.formatter(this.row[this.column.field], this.row) : this.row[this.column.field];
        } else {
            return this.value;
        }
    }

    onClickCheckBox(event: Event) {
        //会触发cell的点击事件和row的select事件，所以这里需要阻止事件冒泡
        event.stopPropagation();
    }

    onCheckBoxChange(event: Event) {
        event.stopPropagation();

        if (this.row.__checked__ && this.table.singleSelect) {
            this.table.rows.forEach(row => {
                if (row !== this.row) {
                    row.__checked__ = false
                }
            });
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
