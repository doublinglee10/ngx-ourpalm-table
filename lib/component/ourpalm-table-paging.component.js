import { Component, Input } from "@angular/core";
var OurpalmTablePagingComponent = (function () {
    function OurpalmTablePagingComponent() {
    }
    OurpalmTablePagingComponent.prototype.ngOnInit = function () {
    };
    OurpalmTablePagingComponent.prototype.changePageSize = function () {
        this.table.changePageSize(+this.table.pageSize);
        this.saveCachePageSize();
    };
    OurpalmTablePagingComponent.prototype.saveCachePageSize = function () {
        if (this.table.cacheKey && this.table.cachePageSize && window.localStorage) {
            window.localStorage.setItem("ngx-ourpalm-table-" + this.table.cacheKey + "-pagesize", "" + this.table.pageSize);
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
    OurpalmTablePagingComponent.prototype.focusout = function () {
        this.table.tmpCurrentPage = this.table.currentPage;
    };
    OurpalmTablePagingComponent.prototype.keyEnterEvent = function (event) {
        if (event.keyCode == 13 && this.table.skipPage) {
            if (this.table.tmpCurrentPage && this.table.tmpCurrentPage >= 1 && this.table.tmpCurrentPage <= this.table.allPage) {
                this.table.gotoSkipPage(this.table.tmpCurrentPage);
            }
        }
    };
    return OurpalmTablePagingComponent;
}());
export { OurpalmTablePagingComponent };
OurpalmTablePagingComponent.decorators = [
    { type: Component, args: [{
                selector: '[ourpalm-table-paging]',
                styles: ["td span.page-left { float: left; text-align: left; width: 68%; } td span.page-left select { height: 20px; line-height: 20px; padding: 0; margin-top: -2px; max-width: 50px; display: inline-block; } td span.page-right { float: right; text-align: right; } /*  ourpalm-table-pager */ .ourpalm-table-pager { padding: 2px 4px; cursor: pointer; border: none; background-color: inherit; } .ourpalm-table-pager:enabled:hover { /*opacity: 0.8;*/ transform: scale(1.2, 1.2); } .ourpalm-table-pager:disabled { opacity: 0.5; cursor: default; } input[type=number] { text-align: center; height: 20px; line-height: 20px; padding: 0; margin-top: -2px; width: auto; max-width: 62px; min-width: 30px; display: inline-block; }"],
                template: "\n        <td *ngIf=\"table.pagination\" [attr.colspan]=\"table.columns.length\">\n            <span class=\"page-left\">\n                <select class=\"form-control input-sm\" [(ngModel)]=\"table.pageSize\" (change)=\"changePageSize()\">\n                    <option *simpleNgFor=\"let val of table.pageList\" [value]=\"val\">{{val}}</option>\n                </select>\n                <button class=\"glyphicon glyphicon-step-backward ourpalm-table-pager\" (click)=\"firstPage()\"\n                        [disabled]=\"table.currentPage <= 1\"></button>\n                <button class=\"glyphicon glyphicon-backward ourpalm-table-pager\" (click)=\"prePage()\"\n                        [disabled]=\"table.currentPage <= 1\"></button>\n                \u7B2C\n                <input type=\"number\" [(ngModel)]=\"table.tmpCurrentPage\" min=\"1\" max=\"{{table.allPage}}\"\n                       (focusout)=\"focusout()\" (keydown)=\"keyEnterEvent($event)\" [readonly]=\"!table.skipPage\"\n                       class=\"form-control input-sm\">\n                \u9875,\u5171{{table.allPage}}\u9875\n                <button class=\"glyphicon glyphicon-forward ourpalm-table-pager\" (click)=\"nextPage()\"\n                        [disabled]=\"table.currentPage == table.allPage || table.allPage == 0\"></button>\n                <button class=\"glyphicon glyphicon-step-forward ourpalm-table-pager\" (click)=\"lastPage()\"\n                        [disabled]=\"table.currentPage == table.allPage || table.allPage == 0\"></button>\n                <button *ngIf=\"table.showRefreshBtn\" class=\"glyphicon glyphicon-refresh ourpalm-table-pager\"\n                        (click)=\"refresh()\"></button>\n                <button *ngIf=\"table.showSettingBtn\" class=\"glyphicon glyphicon-cog ourpalm-table-pager\"\n                        (click)=\"table.openSetting()\"></button>\n            </span>\n            <span class=\"page-right\">\u663E\u793A{{table.start}}-{{table.end}}\u6761\u8BB0\u5F55,\u5171{{table.total}}\u6761\u8BB0\u5F55</span>\n\n            <div *ngIf=\"table?.openSettings\">\n                <ourpalm-table-settings [table]=\"table\"\n                                        [tableComponent]=\"tableComponent\"\n                                        [columns]=\"table.columns\">\n                </ourpalm-table-settings>\n            </div>\n        </td>\n    "
            },] },
];
OurpalmTablePagingComponent.ctorParameters = function () { return []; };
OurpalmTablePagingComponent.propDecorators = {
    'table': [{ type: Input },],
    'tableComponent': [{ type: Input },],
};
//# sourceMappingURL=ourpalm-table-paging.component.js.map