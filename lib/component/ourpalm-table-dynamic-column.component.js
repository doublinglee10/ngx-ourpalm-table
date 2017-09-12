import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";
import { uuid } from "../model/uuid";
var OurpalmTableDynamicColumnComponent = (function () {
    function OurpalmTableDynamicColumnComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
    Object.defineProperty(OurpalmTableDynamicColumnComponent.prototype, "value", {
        get: function () {
            if (typeof this.row === 'object') {
                return this.column.formatter ? this.column.formatter(this.row[this.column.field], this.row) : this.row[this.column.field];
            }
            else {
                return this.value;
            }
        },
        enumerable: true,
        configurable: true
    });
    OurpalmTableDynamicColumnComponent.prototype.onClickCheckBox = function (event) {
        event.stopPropagation();
    };
    OurpalmTableDynamicColumnComponent.prototype.onCheckBoxChange = function (event) {
        var _this = this;
        event.stopPropagation();
        if (this.row.__checked__ && this.table.singleSelect) {
            this.table.rows.forEach(function (row) {
                if (row !== _this.row) {
                    row.__checked__ = false;
                }
            });
        }
        if (this.table.checkOnSelect) {
            this.row.__selected__ = !!this.row.__checked__;
        }
        this.table.onRowCheckBoxChange && this.table.onRowCheckBoxChange(this.row, this.index);
    };
    OurpalmTableDynamicColumnComponent.prototype.ngOnChanges = function () {
        if (typeof this.row === 'object') {
            if (!this.row.__uuid__) {
                this.row.__uuid__ = uuid();
            }
            this.lastRowUuid = this.row.__uuid__;
        }
        this.lastColumnUuid = this.column.__uuid__;
    };
    OurpalmTableDynamicColumnComponent.prototype.ngDoCheck = function () {
        if (this.lastColumnUuid !== this.column.__uuid__) {
            this.changeDetectorRef.markForCheck();
        }
        else if (typeof this.row === 'object' && this.lastRowUuid !== this.row.__uuid__) {
            this.changeDetectorRef.markForCheck();
        }
    };
    return OurpalmTableDynamicColumnComponent;
}());
export { OurpalmTableDynamicColumnComponent };
OurpalmTableDynamicColumnComponent.decorators = [
    { type: Component, args: [{
                selector: '[ourpalm-table-dynamic-column]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: "\n        <!-- \u9690\u85CF\u5217 -->\n        <ng-container [class.hidden]=\"!column.show\">\n            <!-- \u6392\u5E8F\u5217 -->\n            <ng-container *ngIf=\"column.sort\">\n                <span [innerHTML]=\"value | safeHtml\"></span>\n            </ng-container>\n            <!-- checkbox\u5217 -->\n            <ng-container *ngIf=\"column.checkbox\">\n                <input type=\"checkbox\" [(ngModel)]=\"row.__checked__\" (change)=\"onCheckBoxChange($event)\"\n                       (click)=\"onClickCheckBox($event)\">\n            </ng-container>\n            <!-- \u5E8F\u53F7\u5217 -->\n            <ng-container *ngIf=\"column.rownumbers\">\n                {{index + 1}}\n            </ng-container>\n            <!-- \u6B63\u5E38\u5217 -->\n            <ng-container *ngIf=\"!column.sort && !column.checkbox && !column.rownumbers\">\n                <span [innerHTML]=\"value | safeHtml\"></span>\n            </ng-container>\n        </ng-container>\n    "
            },] },
];
OurpalmTableDynamicColumnComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
OurpalmTableDynamicColumnComponent.propDecorators = {
    'row': [{ type: Input },],
    'index': [{ type: Input },],
    'table': [{ type: Input },],
    'column': [{ type: Input },],
};
//# sourceMappingURL=ourpalm-table-dynamic-column.component.js.map