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
var ourpalm_table_static_column_component_1 = require("./ourpalm-table-static-column.component");
var OurpalmTableComponent = (function () {
    function OurpalmTableComponent() {
        //是否是动态列，默认为声明式
        this.dynamicColumn = false;
    }
    OurpalmTableComponent.prototype.ngAfterContentInit = function () {
        //声明式列，不支持动态列特性
        if (this.table.columns.length == 0) {
            this.dynamicColumn = false;
            this.table.columns = this.columnDirs.toArray().map(function (columnDir) { return Object.assign(columnDir.column, { __template__: columnDir.template }); });
            this.table.__columns = this.table.columns.map(function (col) { return Object.assign({}, col); });
        }
        else {
            this.dynamicColumn = true;
        }
        this.reloadCacheColumns();
        this.reloadCachePageSize();
        //加载数据
        if (this.table.autoLoadData) {
            this.table.invokeLoadData();
        }
    };
    OurpalmTableComponent.prototype.reloadCacheColumns = function () {
        var _this = this;
        if (this.table.cacheKey && this.table.cacheColumns && window.localStorage) {
            var cache = window.localStorage.getItem("ngx-ourpalm-table-" + this.table.cacheKey + "-columns");
            if (cache) {
                var columnArr = JSON.parse(cache);
                if (columnArr.length == this.table.columns.length) {
                    var tmpColumns_1 = [];
                    columnArr.forEach((function (col1) {
                        _this.table.columns.forEach(function (col2) {
                            if (col1.field == col2.field) {
                                tmpColumns_1.push(Object.assign(col2, col1));
                            }
                        });
                    }));
                    this.table.columns.splice(0);
                    tmpColumns_1.forEach(function (col) {
                        _this.table.columns.push(col);
                    });
                }
                else {
                    window.localStorage.removeItem("ngx-ourpalm-table-" + this.table.cacheKey + "-columns");
                }
            }
        }
    };
    OurpalmTableComponent.prototype.reloadCachePageSize = function () {
        if (this.table.cacheKey && this.table.cachePageSize && window.localStorage) {
            var pageSize = window.localStorage.getItem("ngx-ourpalm-table-" + this.table.cacheKey + "-pagesize");
            if (pageSize) {
                this.table.defaultPageSize = +pageSize;
                this.table.pageSize = this.table.defaultPageSize;
            }
        }
    };
    return OurpalmTableComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_1.OurpalmTable)
], OurpalmTableComponent.prototype, "table", void 0);
__decorate([
    core_1.ContentChildren(ourpalm_table_static_column_component_1.OurpalmTableStaticColumnComponent),
    __metadata("design:type", core_1.QueryList)
], OurpalmTableComponent.prototype, "columnDirs", void 0);
__decorate([
    core_1.ContentChild(core_1.TemplateRef),
    __metadata("design:type", core_1.TemplateRef)
], OurpalmTableComponent.prototype, "template", void 0);
OurpalmTableComponent = __decorate([
    core_1.Component({
        selector: 'ourpalm-table',
        styleUrls: ['./ourpalm-table.component.css'],
        template: "\n        <table class=\"table table-bordered table-striped table-hover text-center\">\n            <thead>\n                <ng-container *ngIf=\"table.pagination && table.pagePosition != 'bottom' \">\n                    <tr class=\"ourpalm-table-pageing\" ourpalm-table-paging [table]=\"table\"></tr>\n                </ng-container>\n                <tr ourpalm-table-header [table]=\"table\"></tr>\n            </thead>\n            <tbody>\n                <!--\u52A8\u6001\u5217-->\n                <ng-container *ngIf=\"dynamicColumn\"> \n                    <tr *ngFor=\"let row of table.rows; let i = index;\" (dblclick)=\"table.onDbClickRow(i, row)\" (click)=\"table.onClickRow(i, row)\">\n                        <ng-container *ngFor=\"let column of table.columns; let j = index;\">\n                            <td ourpalm-table-dynamic-column [table]=\"table\" [row]=\"row\" [column]=\"column\" [index]=\"i\" [class.hidden]=\"!column.show\" (dblclick)=\"table.onDbClickCell(i, j, row, column)\" (click)=\"table.onClickCell(i, j, row, column)\"></td>\n                        </ng-container>\n                    </tr>\n                </ng-container>\n                <!--\u9759\u6001\u5217-->\n                <ng-container *ngIf=\"!dynamicColumn\">\n                    <tr *ngFor=\"let row of table.rows; let i = index;\" (dblclick)=\"table.onDbClickRow(i, row)\" (click)=\"table.onClickRow(i, row)\">\n                        <td *ngFor=\"let col of table.columns; let j = index;\" [class.hidden]=\"!col.show\" (dblclick)=\"table.onDbClickCell(i, j, row, col)\" (click)=\"table.onClickCell(i, j, row, col)\">\n                            <ourpalm-table-columnTemplateRenderer [table]=\"table\" [column]=\"col\" [row]=\"row\" [index]=\"i\"></ourpalm-table-columnTemplateRenderer>\n                        </td>\n                    </tr>\n                </ng-container>\n            </tbody>\n            <tfoot>\n                <ng-container *ngIf=\"table.pagination && table.pagePosition != 'top' \">\n                    <tr class=\"ourpalm-table-pageing\" ourpalm-table-paging [table]=\"table\"></tr>\n                </ng-container>\n            </tfoot>\n        </table>\n    "
    })
], OurpalmTableComponent);
exports.OurpalmTableComponent = OurpalmTableComponent;
//# sourceMappingURL=ourpalm-table.component.js.map