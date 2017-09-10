var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { ChangeDetectionStrategy, Component, ContentChildren, Input, NgZone, ViewChild } from "@angular/core";
import { OurpalmTableStaticColumnComponent } from "./ourpalm-table-static-column.component";
var OurpalmTableComponent = (function () {
    function OurpalmTableComponent(zone) {
        this.zone = zone;
        this.dynamicColumn = false;
    }
    OurpalmTableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.table && this.table.setTableComponent(this);
        if (this.table.enabledFloatThead) {
            this.zone.runOutsideAngular(function () {
                _this.$table = $(_this.el.nativeElement);
                _this.$table.floatThead(__assign({}, _this.table.floatTheadConfig));
            });
        }
    };
    OurpalmTableComponent.prototype.reflowTable = function () {
        this.table.enabledFloatThead && this.$table.floatThead('reflow');
    };
    OurpalmTableComponent.prototype.ngOnDestroy = function () {
        if (this.table.enabledFloatThead) {
            this.$table.floatThead('destroy');
        }
    };
    OurpalmTableComponent.prototype.ngAfterContentInit = function () {
        if (this.columnDirs.toArray().length > 0) {
            this.dynamicColumn = false;
            var columns = this.columnDirs.toArray().map(function (columnDir) { return Object.assign(columnDir.column, { template: columnDir.template }); });
            this.table.__columns = this.table.columns.map(function (col) { return Object.assign({}, col); });
            this.table.changeColumns(columns);
        }
        else {
            this.dynamicColumn = true;
        }
        if (this.table.autoLoadData) {
            this.table.invokeLoadData();
        }
    };
    return OurpalmTableComponent;
}());
export { OurpalmTableComponent };
OurpalmTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'ourpalm-table',
                styles: [".ourpalm-table-pageing { background-color: #f9f9f9 !important; } table { margin-bottom: 0px; } thead tr { background-color: #eceaea; } table /deep/ tr td, table /deep/ tr th { max-width: 400px !important; word-break: keep-all; /* 不换行 */ white-space: nowrap; /* 不换行 */ overflow: hidden; text-overflow: ellipsis; /*省略号*/ }"],
                changeDetection: ChangeDetectionStrategy.Default,
                template: "\n        <table #el [ngClass]=\"table.tableClass\">\n            <thead>\n                <ng-container *ngIf=\"table.pagination && table.pagePosition != 'bottom' \">\n                    <tr class=\"ourpalm-table-pageing\" ourpalm-table-paging [table]=\"table\"></tr>\n                </ng-container>\n                <tr ourpalm-table-header [table]=\"table\" [columns]=\"table.columns\"></tr>\n            </thead>\n            <tbody ourpalm-table-rows [table]=\"table\" [rows]=\"table.rows\" [dynamicColumn]=\"dynamicColumn\"\n                   [columns]=\"table.columns\">\n            </tbody>\n            <tfoot>\n                <ng-container *ngIf=\"table.pagination && table.pagePosition != 'top' \">\n                    <tr class=\"ourpalm-table-pageing\" ourpalm-table-paging [table]=\"table\" [tableComponent]=\"this\"></tr>\n                </ng-container>\n            </tfoot>\n        </table>\n    "
            },] },
];
OurpalmTableComponent.ctorParameters = function () { return [
    { type: NgZone, },
]; };
OurpalmTableComponent.propDecorators = {
    'el': [{ type: ViewChild, args: ['el',] },],
    'table': [{ type: Input },],
    'columnDirs': [{ type: ContentChildren, args: [OurpalmTableStaticColumnComponent,] },],
};
//# sourceMappingURL=ourpalm-table.component.js.map