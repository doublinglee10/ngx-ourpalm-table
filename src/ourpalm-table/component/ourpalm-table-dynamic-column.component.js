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
var ourpalm_table_column_1 = require("../model/ourpalm-table-column");
var ourpalm_table_1 = require("../model/ourpalm-table");
var OurpalmTableDynamicColumnComponent = (function () {
    function OurpalmTableDynamicColumnComponent() {
    }
    OurpalmTableDynamicColumnComponent.prototype.ngOnInit = function () {
    };
    OurpalmTableDynamicColumnComponent.prototype.value = function () {
        return this.column.formatter ? this.column.formatter(this.row[this.column.field], this.row) : this.row[this.column.field];
    };
    OurpalmTableDynamicColumnComponent.prototype.onCheckBoxChange = function () {
        if (this.row.__checked__ && this.table.singleSelect) {
            this.table.rows.forEach(function (row) { return row.__checked__ = false; });
            this.row.__checked__ = true;
        }
    };
    return OurpalmTableDynamicColumnComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_column_1.OurpalmTableColumn)
], OurpalmTableDynamicColumnComponent.prototype, "column", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], OurpalmTableDynamicColumnComponent.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OurpalmTableDynamicColumnComponent.prototype, "row", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_1.OurpalmTable)
], OurpalmTableDynamicColumnComponent.prototype, "table", void 0);
OurpalmTableDynamicColumnComponent = __decorate([
    core_1.Component({
        selector: '[ourpalm-table-dynamic-column]',
        template: "\n        <!-- \u9690\u85CF\u5217 -->\n        <ng-container [class.hidden]=\"!column.show\">\n            <!-- \u6392\u5E8F\u5217 -->\n            <ng-container *ngIf=\"column.sort\">{{value()}}</ng-container>\n            <!-- checkbox\u5217 -->\n            <ng-container *ngIf=\"column.checkbox\">\n                <input type=\"checkbox\" [(ngModel)]=\"row.__checked__\" (change)=\"onCheckBoxChange()\">\n            </ng-container>\n            <!-- \u5E8F\u53F7\u5217 -->\n            <ng-container *ngIf=\"column.rownumbers\">\n                {{index+1}}\n            </ng-container>\n            <!-- \u6B63\u5E38\u5217 -->\n            <ng-container *ngIf=\"!column.sort && !column.checkbox && !column.rownumbers\">\n                {{value()}}\n            </ng-container>\n        </ng-container>\n    "
    })
], OurpalmTableDynamicColumnComponent);
exports.OurpalmTableDynamicColumnComponent = OurpalmTableDynamicColumnComponent;
//# sourceMappingURL=ourpalm-table-dynamic-column.component.js.map