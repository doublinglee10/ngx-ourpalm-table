"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ourpalm_table_1 = require("../model/ourpalm-table");
var OurpalmTableHeaderComponent = (function () {
    function OurpalmTableHeaderComponent() {
        this.checkAll = false;
    }
    OurpalmTableHeaderComponent.prototype.ngOnInit = function () {
    };
    OurpalmTableHeaderComponent.prototype.onCheckBoxChange = function () {
        var _this = this;
        if (!this.table.singleSelect) {
            this.table.rows.forEach(function (row) { return row.__checked__ = _this.checkAll; });
        }
        else if (!this.checkAll) {
            this.table.rows.forEach(function (row) { return row.__checked__ = false; });
        }
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
        }
    };
    return OurpalmTableHeaderComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_1.OurpalmTable)
], OurpalmTableHeaderComponent.prototype, "table", void 0);
OurpalmTableHeaderComponent = __decorate([
    core_1.Component({
        selector: '[ourpalm-table-header]',
        styleUrls: ['./ourpalm-table-header.component.css'],
        template: "\n        <th *ngFor=\"let column of table.columns; let i = index\" [class.hidden]=\"!column.show\"><!-- \u9690\u85CF\u5217 -->\n            <!-- \u6392\u5E8F\u5217 -->\n            <span *ngIf=\"column.sort\" (click)=\"sortColumn(column)\">\n                {{column.header}}\n                <i class=\"fa\" [ngClass]=\"{'fa-sort-asc': column.sortOrder == 'asc', 'fa-sort-desc': column.sortOrder == 'desc', 'fa-sort': !column.sortOrder}\"></i>\n            </span>\n            <!-- checkbox\u5217 -->\n            <ng-container *ngIf=\"column.checkbox\">\n                <input type=\"checkbox\" [(ngModel)]=\"checkAll\" (change)=\"onCheckBoxChange()\">\n            </ng-container>\n            <!-- \u5E8F\u53F7\u5217 -->\n            <ng-container *ngIf=\"column.rownumbers\">\n                {{column.header}}\n            </ng-container>\n            <!-- \u6B63\u5E38\u5217 -->\n            <ng-container *ngIf=\"!column.sort && !column.checkbox && !column.rownumbers\">\n                {{column.header}}\n            </ng-container>\n        </th>\n    "
    })
], OurpalmTableHeaderComponent);
exports.OurpalmTableHeaderComponent = OurpalmTableHeaderComponent;
//# sourceMappingURL=ourpalm-table-header.component.js.map