import { ChangeDetectionStrategy, Component, Injectable, Input, NgZone, Pipe } from "@angular/core";
import { uuid } from "../model/uuid";
var OurpalmTableSettingsComponent = (function () {
    function OurpalmTableSettingsComponent(ngZone) {
        this.ngZone = ngZone;
        this.columns = [];
        this.tempcolumns = [];
        this.lcolumns = [];
        this.rcolumns = [];
    }
    OurpalmTableSettingsComponent.prototype.ngOnInit = function () {
        this.tempcolumns = this.columns.map(function (column) { return Object.assign({}, column); }).slice();
        this.lcolumns = this.tempcolumns.filter(function (column) { return !column.show; }).slice();
        this.rcolumns = this.tempcolumns.filter(function (column) { return column.show; }).slice();
    };
    OurpalmTableSettingsComponent.prototype.showColumn = function () {
        this.lcolumns.filter(function (column) { return column.__lshow__; }).forEach(function (column) {
            column.show = true;
            delete column.__lshow__;
            delete column.__rshow__;
        });
        this.lcolumns = this.tempcolumns.filter(function (column) { return !column.show; }).slice();
        this.rcolumns = this.tempcolumns.filter(function (column) { return column.show; }).slice();
    };
    OurpalmTableSettingsComponent.prototype.hideColumn = function () {
        this.rcolumns.filter(function (column) { return column.__rshow__; }).forEach(function (column) {
            column.show = false;
            delete column.__lshow__;
            delete column.__rshow__;
        });
        this.lcolumns = this.tempcolumns.filter(function (column) { return !column.show; }).slice();
        this.rcolumns = this.tempcolumns.filter(function (column) { return column.show; }).slice();
    };
    OurpalmTableSettingsComponent.prototype.resetColumn = function () {
        this.tempcolumns = this.table.__columns.map(function (column) { return Object.assign({}, column); }).slice();
        this.lcolumns = this.tempcolumns.filter(function (column) { return !column.show; }).slice();
        this.rcolumns = this.tempcolumns.filter(function (column) { return column.show; }).slice();
    };
    OurpalmTableSettingsComponent.prototype.saveColumn = function () {
        var _this = this;
        this.close();
        this.ngZone.runOutsideAngular(function () {
            setTimeout(function () {
                _this.ngZone.run(function () {
                    var columns = _this.rcolumns.concat(_this.lcolumns).map(function (column) {
                        delete column.__lshow__;
                        delete column.__rshow__;
                        return Object.assign({}, column);
                    });
                    var distColumns = [];
                    for (var i = 0; i < columns.length; i++) {
                        var originColumn = _this.table.columns[i];
                        var newColumn = columns[i];
                        if (originColumn.field === newColumn.field) {
                            if (originColumn.show != newColumn.show) {
                                originColumn.show = newColumn.show;
                                originColumn.__uuid__ = uuid();
                            }
                            distColumns.push(originColumn);
                        }
                        else {
                            var sortedOriginColumn = _this.getTableColumn(newColumn.field);
                            sortedOriginColumn.show = newColumn.show;
                            sortedOriginColumn.__uuid__ = uuid();
                            distColumns.push(sortedOriginColumn);
                        }
                    }
                    _this.table.columns = distColumns;
                    if (_this.table.cacheKey && _this.table.cacheColumns && window.localStorage) {
                        var columnArr_1 = [];
                        _this.table.columns.forEach(function (column) {
                            columnArr_1.push({ field: column.field, show: column.show });
                        });
                        window.localStorage.setItem("ngx-ourpalm-table-" + _this.table.cacheKey + "-columns", JSON.stringify(columnArr_1));
                    }
                    _this.table.reflowTable();
                });
            });
        });
    };
    OurpalmTableSettingsComponent.prototype.close = function () {
        this.table.openSettings = false;
    };
    OurpalmTableSettingsComponent.prototype.getTableColumn = function (field) {
        for (var i = 0; i < this.table.columns.length; i++) {
            var column = this.table.columns[i];
            if (column.field === field) {
                return column;
            }
        }
    };
    return OurpalmTableSettingsComponent;
}());
export { OurpalmTableSettingsComponent };
OurpalmTableSettingsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ourpalm-table-settings',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".ourpalm-mask { position: fixed; width: 100%; height: 800%; top: 0px; left: 0px; background-color: #000000; opacity: 0.3; z-index: 2000; } .ourpalm-dialog { position: fixed; /*width: 30%;*/ /*height: 30%;*/ top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2001; } .ourpalm-table-settings { max-width: 800px !important; min-width: 600px !important; } .ourpalm-table-settings .modal-body { text-align: left; } .ourpalm-table-settings .checkbox-inline { width: 25%; white-space: nowrap; /* 不换行 */ overflow: hidden; } .ourpalm-table-settings .checkbox-inline + .checkbox-inline { margin-left: 0px; } .col-con { border: 1px solid #bbb; margin-bottom: 10px; } .col-con [type=text] { width: 100%; border: none; padding-top: 2px; padding-left: 10px; border-bottom: 1px solid #aaa; } .ourpalm-table-settings ul { list-style: none; height: 300px; overflow-y: auto; padding: 0px; } .ourpalm-table-settings ul li { list-style: none !important; padding: 6px 10px; } .ourpalm-table-settings ul li:hover { background-color: antiquewhite; } .ourpalm-table-settings ul li label { margin-bottom: 0; font-weight: normal; } .ourpalm-table-settings ul li label span { width: 160px; display: inline-block; } li.gu-transit { list-style: none !important; background-color: antiquewhite; opacity: 0.7; border: 1px dashed #aaaaaa; } .gu-mirror { position: fixed !important; list-style: none !important; margin: 0 !important; z-index: 9999 !important; opacity: 0.8; -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)\"; filter: alpha(opacity=80); } .gu-hide { display: none !important; } .gu-unselectable { -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important; }"],
                template: "\n        <div>\n            <div class=\"ourpalm-mask\"></div>\n            <div class=\"ourpalm-dialog\">\n                <div class=\"modal-content ourpalm-table-settings\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"close()\">\n                            <span aria-hidden=\"true\">&times;</span></button>\n                        <h4 class=\"modal-title\">\u81EA\u5B9A\u4E49\u5217\u8868\u9879</h4>\n                    </div>\n                    <div class=\"modal-body\">\n                        <div class=\"row\">\n                            <div class=\"col-md-5\">\n                                <span>\u5907\u9009\u5217</span>\n                                <div class=\"col-con\">\n                                    <input type=\"text\" placeholder=\"\u8F93\u5165\u503C...\" [(ngModel)]=\"lmodel\">\n                                    <ul>\n                                        <li *simpleNgFor=\"let col of lcolumns | lcolumnFilter:lmodel\">\n                                            <label>\n                                                <input type=\"checkbox\" [(ngModel)]=\"col.__lshow__\">\n                                                <span>{{col.header}}</span>\n                                            </label>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                            <div class=\"col-md-2\" style=\"padding:0px;margin:0px;text-align:center;\">\n                                <div style=\"margin-top:130px;margin-bottom:10px;\">\n                                    <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"showColumn()\">\n                                        <i class=\"glyphicon glyphicon-arrow-right\"></i>\n                                    </button>\n                                </div>\n                                <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"hideColumn()\">\n                                    <i class=\"glyphicon glyphicon-arrow-left\"></i>\n                                </button>\n                            </div>\n                            <div class=\"col-md-5\">\n                                <span>\u5DF2\u9009\u5217</span>\n                                <div class=\"col-con\">\n                                    <input type=\"text\" placeholder=\"\u8F93\u5165\u503C...\" [(ngModel)]=\"rmodel\">\n                                    <ul [dragula]=\"'setting-columns'\" [dragulaModel]=\"rcolumns\">\n                                        <li *simpleNgFor=\"let col of rcolumns | rcolumnFilter:rmodel; let i = index;\">\n                                            <label>\n                                                <input type=\"checkbox\" [(ngModel)]=\"col.__rshow__\">\n                                                <span>{{col.header}}</span>\n                                            </label>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <div class=\"btn-group btn-group-sm\" style=\"float:right;\">\n                                    <button type=\"button\" class=\"btn btn-default\" (click)=\"resetColumn()\">\u8FD8\u539F</button>\n                                    <button type=\"button\" class=\"btn btn-default\" (click)=\"saveColumn()\">\u4FDD\u5B58</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    "
            },] },
];
OurpalmTableSettingsComponent.ctorParameters = function () { return [
    { type: NgZone, },
]; };
OurpalmTableSettingsComponent.propDecorators = {
    'table': [{ type: Input },],
    'tableComponent': [{ type: Input },],
    'columns': [{ type: Input },],
};
var ColumnSettingsLeftFilter = (function () {
    function ColumnSettingsLeftFilter() {
    }
    ColumnSettingsLeftFilter.prototype.transform = function (columns, name) {
        return !name ? columns : columns.filter(function (column) { return column.header.includes(name); });
    };
    return ColumnSettingsLeftFilter;
}());
export { ColumnSettingsLeftFilter };
ColumnSettingsLeftFilter.decorators = [
    { type: Pipe, args: [{
                name: 'lcolumnFilter',
                pure: true
            },] },
    { type: Injectable },
];
ColumnSettingsLeftFilter.ctorParameters = function () { return []; };
var ColumnSettingsRightFilter = (function () {
    function ColumnSettingsRightFilter() {
    }
    ColumnSettingsRightFilter.prototype.transform = function (columns, name) {
        return name ? columns.filter(function (column) { return column.header.includes(name); }) : columns;
    };
    return ColumnSettingsRightFilter;
}());
export { ColumnSettingsRightFilter };
ColumnSettingsRightFilter.decorators = [
    { type: Pipe, args: [{
                name: 'rcolumnFilter',
                pure: true
            },] },
    { type: Injectable },
];
ColumnSettingsRightFilter.ctorParameters = function () { return []; };
//# sourceMappingURL=ourpalm-table-settings.component.js.map