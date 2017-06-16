"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
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
    return OurpalmTableHeaderComponent;
}());
__decorate([
    core_1.Input()
], OurpalmTableHeaderComponent.prototype, "table");
OurpalmTableHeaderComponent = __decorate([
    core_1.Component({
        selector: '[ourpalm-table-header]',
        template: "\n        <th *ngFor=\"let column of table.columns; let i = index\" [class.hidden]=\"!column.show\"><!-- \u9690\u85CF\u5217 -->\n            <!-- \u6392\u5E8F\u5217 -->\n            <ng-container *ngIf=\"column.sort\">{{column.header}}</ng-container>\n            <!-- checkbox\u5217 -->\n            <ng-container *ngIf=\"column.checkbox\">\n                <input type=\"checkbox\" [(ngModel)]=\"checkAll\" (change)=\"onCheckBoxChange()\">\n            </ng-container>\n            <!-- \u5E8F\u53F7\u5217 -->\n            <ng-container *ngIf=\"column.rownumbers\">\n                {{column.header}}\n            </ng-container>\n            <!-- \u6B63\u5E38\u5217 -->\n            <ng-container *ngIf=\"!column.sort && !column.checkbox && !column.rownumbers\">\n                {{column.header}}\n            </ng-container>\n        </th>\n    "
    })
], OurpalmTableHeaderComponent);
exports.OurpalmTableHeaderComponent = OurpalmTableHeaderComponent;
