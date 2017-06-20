"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var OurpalmTableSettingsComponent = (function () {
    function OurpalmTableSettingsComponent() {
        this.columns = [];
    }
    OurpalmTableSettingsComponent.prototype.ngOnInit = function () {
        this.columns = this.table.columns.map(function (column) { return Object.assign({}, column); });
        this.columns.filter(function (column) { return column.show; }).map(function (column) { return column.__fshow__ = true; });
        this.columns.map(function (column) { return column.__lshow__ = column.__rshow__ = false; });
    };
    OurpalmTableSettingsComponent.prototype.showColumn = function () {
        this.columns.filter(function (column) { return column.__lshow__; }).map(function (column) { return column.__fshow__ = true; });
    };
    OurpalmTableSettingsComponent.prototype.hideColumn = function () {
        this.columns.filter(function (column) { return column.__rshow__; }).map(function (column) { return column.__fshow__ = false; });
    };
    OurpalmTableSettingsComponent.prototype.resetColumn = function () {
        this.columns = this.table.__columns.map(function (column) { return Object.assign({}, column); });
        this.columns.filter(function (column) { return column.show; }).map(function (column) { return column.__fshow__ = true; });
        this.columns.map(function (column) { return column.__lshow__ = column.__rshow__ = false; });
    };
    OurpalmTableSettingsComponent.prototype.saveColumn = function () {
        var _this = this;
        var tmpColumns = [];
        this.columns.forEach(function (col1) {
            _this.table.columns.forEach(function (col2) {
                if (col1.field == col2.field) {
                    tmpColumns.push(Object.assign(col2, { show: !!col1.__fshow__ }));
                }
            });
        });
        this.table.columns.splice(0);
        tmpColumns.forEach(function (col) {
            _this.table.columns.push(col);
        });
        if (this.table.cacheKey && this.table.cacheColumns && window.localStorage) {
            var columnArr_1 = [];
            this.table.columns.forEach(function (column) {
                columnArr_1.push({ field: column.field, show: column.show });
            });
            window.localStorage.setItem("ngx-ourpalm-table-" + this.table.cacheKey + "-columns", JSON.stringify(columnArr_1));
        }
    };
    OurpalmTableSettingsComponent.prototype.close = function () {
        this.table.openSettings = false;
    };
    return OurpalmTableSettingsComponent;
}());
__decorate([
    core_1.Input()
], OurpalmTableSettingsComponent.prototype, "table");
OurpalmTableSettingsComponent = __decorate([
    core_1.Component({
        selector: 'ourpalm-table-settings',
        styleUrls: ['./ourpalm-table-settings.component.css'],
        template: "\n        <div>\n            <div class=\"ourpalm-mask\"></div>\n            <div class=\"ourpalm-dialog\">\n                <div class=\"modal-content ourpalm-table-settings\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"close()\"><span aria-hidden=\"true\">&times;</span></button>\n                        <h4 class=\"modal-title\">\u81EA\u5B9A\u4E49\u5217\u8868\u9879</h4> \n                    </div>\n                    <div class=\"modal-body\">\n                        <div class=\"row\">\n                            <div class=\"col-md-5\">\n                                <span>\u6240\u6709\u5217</span>\n                                <div class=\"col-con\">\n                                    <input type=\"text\" placeholder=\"\u8F93\u5165\u503C...\" [(ngModel)]=\"lmodel\">\n                                    <ul>\n                                        <li *ngFor=\"let col of columns | lcolumnFilter:lmodel\">\n                                            <input type=\"checkbox\" [(ngModel)]=\"col.__lshow__\">\n                                            <span>{{col.header}}</span>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                            <div class=\"col-md-2\" style=\"padding:0px;margin:0px;text-align:center;\">\n                                <div style=\"margin-top:130px;margin-bottom:10px;\">\n                                    <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"showColumn()\"><i class=\"fa fa-long-arrow-right\"></i></button>\n                                </div>\n                                <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"hideColumn()\"><i class=\"fa fa-long-arrow-left\"></i></button>\n                            </div>\n                            <div class=\"col-md-5\">\n                                <span>\u5DF2\u9009\u5217</span>\n                                <div class=\"col-con\">\n                                    <input type=\"text\" placeholder=\"\u8F93\u5165\u503C...\" [(ngModel)]=\"rmodel\">\n                                    <ul dnd-sortable-container [sortableData]=\"columns\"> \n                                        <li *ngFor=\"let col of columns | rcolumnFilter:rmodel; let i = index;\" dnd-sortable [sortableIndex]=\"i\">\n                                            <input type=\"checkbox\" [(ngModel)]=\"col.__rshow__\">\n                                            <span>{{col.header}}</span>                      \n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <div class=\"btn-group btn-group-sm\" style=\"float:right;\">\n                                    <button type=\"button\" class=\"btn btn-default\" data-toggle=\"tooltip\" title=\"\u8FD8\u539F\" (click)=\"resetColumn()\">\u8FD8\u539F</button>\n                                    <button type=\"button\" class=\"btn btn-default\" data-toggle=\"tooltip\" title=\"\u4FDD\u5B58\" (click)=\"saveColumn()\">\u4FDD\u5B58</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    "
    })
], OurpalmTableSettingsComponent);
exports.OurpalmTableSettingsComponent = OurpalmTableSettingsComponent;
var ColumnSettingsLeftFilter = (function () {
    function ColumnSettingsLeftFilter() {
    }
    ColumnSettingsLeftFilter.prototype.transform = function (columns, name) {
        return !name ? columns : columns.filter(function (column) { return column.header.startsWith(name); });
    };
    return ColumnSettingsLeftFilter;
}());
ColumnSettingsLeftFilter = __decorate([
    core_1.Pipe({
        name: 'lcolumnFilter',
        pure: false
    }),
    core_1.Injectable()
], ColumnSettingsLeftFilter);
exports.ColumnSettingsLeftFilter = ColumnSettingsLeftFilter;
var ColumnSettingsRightFilter = (function () {
    function ColumnSettingsRightFilter() {
    }
    ColumnSettingsRightFilter.prototype.transform = function (columns, name) {
        return name ? columns.filter(function (col) { return col.__fshow__; }).filter(function (column) { return column.header.startsWith(name); }) : columns.filter(function (col) { return col.__fshow__; });
    };
    return ColumnSettingsRightFilter;
}());
ColumnSettingsRightFilter = __decorate([
    core_1.Pipe({
        name: 'rcolumnFilter',
        pure: false
    }),
    core_1.Injectable()
], ColumnSettingsRightFilter);
exports.ColumnSettingsRightFilter = ColumnSettingsRightFilter;
