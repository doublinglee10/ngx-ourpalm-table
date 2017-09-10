var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
var OurpalmTableHeaderComponent = (function () {
    function OurpalmTableHeaderComponent() {
        this.checkAll = false;
    }
    OurpalmTableHeaderComponent.prototype.ngOnInit = function () {
    };
    OurpalmTableHeaderComponent.prototype.onCheckBoxChange = function () {
        var _this = this;
        if (!this.table.singleSelect) {
            this.table.rows = this.table.rows.map(function (row) {
                return __assign({}, row, { __checked__: _this.checkAll });
            });
        }
        else if (!this.checkAll) {
            this.table.rows = this.table.rows.map(function (row) {
                return __assign({}, row, { __checked__: false });
            });
        }
        if (this.table.checkOnSelect) {
            this.table.rows = this.table.rows.map(function (row) {
                if (row.__checked__ != row.__selected__)
                    return __assign({}, row, { __selected__: !!row.__checked__ });
                return row;
            });
        }
        this.table.onHeaderCheckBoxChange && this.table.onHeaderCheckBoxChange();
    };
    OurpalmTableHeaderComponent.prototype.sortColumn = function (column) {
        switch (column.sortOrder) {
            case 'asc':
                column.sortOrder = 'desc';
                break;
            case 'desc':
                column.sortOrder = 'asc';
                break;
            default:
                column.sortOrder = 'asc';
                break;
        }
        if (this.table.serverSort) {
            this.table.invokeLoadData();
        }
        else {
            this.table.rows.sort(function (row1, row2) {
                switch (column.sortOrder) {
                    case 'asc':
                        return column.sorter(column, row1, row2);
                    case 'desc':
                    default:
                        return -column.sorter(column, row1, row2);
                }
            });
            this.table.rows = this.table.rows.slice();
        }
    };
    return OurpalmTableHeaderComponent;
}());
export { OurpalmTableHeaderComponent };
OurpalmTableHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: '[ourpalm-table-header]',
                styles: [".fa-sort-asc { vertical-align: bottom; } .fa-sort-desc { vertical-align: top; }"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: "\n        <th *ngFor=\"let column of columns; let i = index\" [class.hidden]=\"!column.show\"><!-- \u9690\u85CF\u5217 -->\n            <!-- \u6392\u5E8F\u5217 -->\n            <span *ngIf=\"column.sort\" (click)=\"sortColumn(column)\">\n                {{column.header}}\n                <i class=\"fa\"\n                   [ngClass]=\"{'fa-sort-asc': column.sortOrder == 'asc', 'fa-sort-desc': column.sortOrder == 'desc', 'fa-sort': !column.sortOrder}\"></i>\n            </span>\n            <!-- checkbox\u5217 -->\n            <ng-container *ngIf=\"column.checkbox\">\n                <input type=\"checkbox\" [(ngModel)]=\"checkAll\" (change)=\"onCheckBoxChange()\">\n            </ng-container>\n            <!-- \u5E8F\u53F7\u5217 -->\n            <ng-container *ngIf=\"column.rownumbers\">\n                {{column.header}}\n            </ng-container>\n            <!-- \u6B63\u5E38\u5217 -->\n            <ng-container *ngIf=\"!column.sort && !column.checkbox && !column.rownumbers\">\n                {{column.header}}\n            </ng-container>\n        </th>\n    "
            },] },
];
OurpalmTableHeaderComponent.ctorParameters = function () { return []; };
OurpalmTableHeaderComponent.propDecorators = {
    'table': [{ type: Input },],
    'columns': [{ type: Input },],
};
//# sourceMappingURL=ourpalm-table-header.component.js.map