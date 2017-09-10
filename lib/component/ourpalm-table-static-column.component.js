import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { OurpalmTableColumn } from "../model/ourpalm-table-column";
import { uuid } from "../model/uuid";
var OurpalmTableStaticColumnComponent = (function () {
    function OurpalmTableStaticColumnComponent() {
    }
    OurpalmTableStaticColumnComponent.prototype.ngOnInit = function () {
        this.column = new OurpalmTableColumn(this.column);
    };
    return OurpalmTableStaticColumnComponent;
}());
export { OurpalmTableStaticColumnComponent };
OurpalmTableStaticColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'ourpalm-table-column',
                template: " "
            },] },
];
OurpalmTableStaticColumnComponent.ctorParameters = function () { return []; };
OurpalmTableStaticColumnComponent.propDecorators = {
    'column': [{ type: Input },],
    'template': [{ type: ContentChild, args: [TemplateRef,] },],
};
var OurpalmTableColumnTemplateRenderer = (function () {
    function OurpalmTableColumnTemplateRenderer(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
    OurpalmTableColumnTemplateRenderer.prototype.onClickCheckBox = function (event) {
        event.stopPropagation();
    };
    OurpalmTableColumnTemplateRenderer.prototype.onCheckBoxChange = function (event) {
        event.stopPropagation();
        if (this.row.__checked__ && this.table.singleSelect) {
            this.table.rows.forEach(function (row) { return row.__checked__ = false; });
            this.row.__checked__ = true;
        }
        if (this.table.checkOnSelect) {
            this.row.__selected__ = !!this.row.__checked__;
        }
        this.table.onRowCheckBoxChange && this.table.onRowCheckBoxChange(this.row, this.index);
    };
    OurpalmTableColumnTemplateRenderer.prototype.ngOnChanges = function () {
        if (!this.row.__uuid__) {
            this.row.__uuid__ = uuid();
        }
        this.lastUuid = this.row.__uuid__;
    };
    OurpalmTableColumnTemplateRenderer.prototype.ngDoCheck = function () {
        if (this.lastUuid !== this.row.__uuid__) {
            this.changeDetectorRef.markForCheck();
        }
    };
    return OurpalmTableColumnTemplateRenderer;
}());
export { OurpalmTableColumnTemplateRenderer };
OurpalmTableColumnTemplateRenderer.decorators = [
    { type: Component, args: [{
                selector: 'ourpalm-table-columnTemplateRenderer',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: "\n        <!-- \u6392\u5E8F\u5217 -->\n        <ng-container *ngIf=\"column.sort\">\n            <ng-template [ngTemplateOutlet]=\"column.template\"\n                         [ngOutletContext]=\"{'$implicit': column, '$row': row}\"></ng-template>\n        </ng-container>\n        <!-- checkbox\u5217 -->\n        <ng-container *ngIf=\"column.checkbox\">\n            <input type=\"checkbox\" [(ngModel)]=\"row.__checked__\" (change)=\"onCheckBoxChange($event)\"\n                   (click)=\"onClickCheckBox($event)\">\n        </ng-container>\n        <!-- \u5E8F\u53F7\u5217 -->\n        <ng-container *ngIf=\"column.rownumbers\">\n            {{index + 1}}\n        </ng-container>\n        <!-- \u6B63\u5E38\u5217 -->\n        <ng-container *ngIf=\"!column.sort && !column.checkbox && !column.rownumbers\">\n            <ng-template [ngTemplateOutlet]=\"column.template\"\n                         [ngOutletContext]=\"{'$implicit': column, '$row': row}\"></ng-template>\n        </ng-container>\n    "
            },] },
];
OurpalmTableColumnTemplateRenderer.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
OurpalmTableColumnTemplateRenderer.propDecorators = {
    'row': [{ type: Input },],
    'index': [{ type: Input },],
    'table': [{ type: Input },],
    'column': [{ type: Input },],
};
//# sourceMappingURL=ourpalm-table-static-column.component.js.map