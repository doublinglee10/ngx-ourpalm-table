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
var OurpalmTableSettingsComponent = (function () {
    function OurpalmTableSettingsComponent() {
    }
    OurpalmTableSettingsComponent.prototype.close = function () {
        this.table.openSettings = false;
    };
    OurpalmTableSettingsComponent.prototype.toggleColumn = function (col) {
        col.show = !col.show;
        this.saveCacheColumns();
    };
    OurpalmTableSettingsComponent.prototype.saveCacheColumns = function () {
        if (this.table.cacheKey && this.table.cacheColumns && window.localStorage) {
            var columnObj_1 = {};
            this.table.columns.forEach(function (column) {
                columnObj_1[column.field] = column.show;
            });
            window.localStorage.setItem("ngx-ourpalm-table-" + this.table.cacheKey + "-columns", JSON.stringify(columnObj_1));
        }
    };
    return OurpalmTableSettingsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_1.OurpalmTable)
], OurpalmTableSettingsComponent.prototype, "table", void 0);
OurpalmTableSettingsComponent = __decorate([
    core_1.Component({
        selector: 'ourpalm-table-settings',
        styleUrls: ['./ourpalm-table-settings.component.css'],
        template: "\n        <div *ngIf=\"table.openSettings\">\n            <div class=\"ourpalm-mask\"></div>\n            <div class=\"ourpalm-dialog\">\n                <div class=\"modal-content ourpalm-table-settings\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"close()\"><span aria-hidden=\"true\">&times;</span></button>\n                        <h4 class=\"modal-title\">\u81EA\u5B9A\u4E49\u5217\u8868\u9879</h4> \n                    </div>\n                    <div class=\"modal-body\">\n                        <label class=\"checkbox-inline\" *ngFor=\"let col of table.columns\">\n                            <input type=\"checkbox\" [(ngModel)]=\"col.show\" (click)=\"toggleColumn(col)\"><span>{{col.header}}</span>\n                        </label>\n                    </div>\n                </div>\n            </div>\n        </div>\n    "
    })
], OurpalmTableSettingsComponent);
exports.OurpalmTableSettingsComponent = OurpalmTableSettingsComponent;
//# sourceMappingURL=ourpalm-table-settings.component.js.map