"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var OurpalmTablePagingComponent = (function () {
    function OurpalmTablePagingComponent() {
    }
    OurpalmTablePagingComponent.prototype.ngOnInit = function () {
        this.table.__tmpCurrentPage = this.table.currentPage;
    };
    OurpalmTablePagingComponent.prototype.changePageSize = function () {
        this.table.defaultPageSize = +this.table.defaultPageSize;
        this.table.changePageSize(this.table.defaultPageSize);
        this.saveCachePageSize();
    };
    OurpalmTablePagingComponent.prototype.saveCachePageSize = function () {
        if (this.table.cacheKey && this.table.cachePageSize && window.localStorage) {
            window.localStorage.setItem("ngx-ourpalm-table-" + this.table.cacheKey + "-pagesize", "" + this.table.defaultPageSize);
        }
    };
    OurpalmTablePagingComponent.prototype.firstPage = function () {
        this.table.firstPage();
    };
    OurpalmTablePagingComponent.prototype.prePage = function () {
        this.table.prePage();
    };
    OurpalmTablePagingComponent.prototype.nextPage = function () {
        this.table.nextPage();
    };
    OurpalmTablePagingComponent.prototype.lastPage = function () {
        this.table.lastPage();
    };
    OurpalmTablePagingComponent.prototype.refresh = function () {
        this.table.refresh();
    };
    OurpalmTablePagingComponent.prototype.settings = function () {
        this.table.openSettings = true;
    };
    OurpalmTablePagingComponent.prototype.focusout = function () {
        this.table.__tmpCurrentPage = this.table.currentPage;
    };
    OurpalmTablePagingComponent.prototype.keyEnterEvent = function (event) {
        if (event.keyCode == 13 && this.table.skipPage) {
            if (this.table.__tmpCurrentPage && this.table.__tmpCurrentPage >= 1 && this.table.__tmpCurrentPage <= this.table.allPage) {
                this.table.gotoSkipPage(this.table.__tmpCurrentPage);
            }
        }
    };
    return OurpalmTablePagingComponent;
}());
__decorate([
    core_1.Input()
], OurpalmTablePagingComponent.prototype, "table");
OurpalmTablePagingComponent = __decorate([
    core_1.Component({
        selector: '[ourpalm-table-paging]',
        styleUrls: ['./ourpalm-table-paging.component.css'],
        template: "\n        <td *ngIf=\"table.pagination\" [attr.colspan]=\"table.columns.length\">\n            <span class=\"page-left\">\n                <select class=\"form-control input-sm\" [(ngModel)]=\"table.defaultPageSize\" (change)=\"changePageSize()\">\n                    <option *ngFor=\"let val of table.pageList\" [value]=\"val\">{{val}}</option>\n                </select>\n                <button class=\"glyphicon glyphicon-step-backward ourpalm-table-pager\" (click)=\"firstPage()\" [disabled]=\"table.currentPage == 1\"></button>\n                <button class=\"glyphicon glyphicon-backward ourpalm-table-pager\" (click)=\"prePage()\" [disabled]=\"table.currentPage == 1\"></button>\n                \u7B2C\n                <input type=\"number\" [(ngModel)]=\"table.__tmpCurrentPage\" min=\"1\" max=\"{{table.allPage}}\" (focusout)=\"focusout()\" (keydown)=\"keyEnterEvent($event)\" [readonly]=\"!table.skipPage\" class=\"form-control input-sm\">\n                \u9875,\u5171{{table.allPage}}\u9875\n                <button class=\"glyphicon glyphicon-forward ourpalm-table-pager\" (click)=\"nextPage()\" [disabled]=\"table.currentPage == table.allPage\"></button>\n                <button class=\"glyphicon glyphicon-step-forward ourpalm-table-pager\" (click)=\"lastPage()\" [disabled]=\"table.currentPage == table.allPage\"></button>\n                <button class=\"glyphicon glyphicon-refresh ourpalm-table-pager\" (click)=\"refresh()\"></button>\n                <button class=\"glyphicon glyphicon-cog ourpalm-table-pager\" (click)=\"settings()\"></button>\n            </span>\n            <span class=\"page-right\">\u663E\u793A{{table.start}}-{{table.end}}\u6761\u8BB0\u5F55,\u5171{{table.total}}\u6761\u8BB0\u5F55</span>\n            \n            <div *ngIf=\"table?.openSettings\">\n                <ourpalm-table-settings [table]=\"table\"></ourpalm-table-settings>\n            </div>\n        </td>\n    "
    })
], OurpalmTablePagingComponent);
exports.OurpalmTablePagingComponent = OurpalmTablePagingComponent;
