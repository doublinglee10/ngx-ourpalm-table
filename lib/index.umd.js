/**
             * ngx-ourpalm-table - 基于angular2.x、bootstrap的表格控件，支持编程式和声明式列配置
             * @version v0.2.7
             * @author undefined
             * @link https://github.com/lishichao1002/ngx-ourpalm-table#readme
             * @license MIT
             */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"), require("@angular/platform-browser"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common", "@angular/forms", "@angular/platform-browser"], factory);
	else if(typeof exports === 'object')
		exports["ngx-ourpalm-table"] = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"), require("@angular/platform-browser"));
	else
		root["ngx-ourpalm-table"] = factory(root["ng"]["core"], root["ng"]["common"], root["ng"]["forms"], root["ng"]["platformBrowser"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_50__, __WEBPACK_EXTERNAL_MODULE_51__, __WEBPACK_EXTERNAL_MODULE_52__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ourpalm_table_column_1 = __webpack_require__(6);
/**
 * 表属性
 */
var OurpalmTable = (function () {
    function OurpalmTable(table) {
        /** 用户配置的原始的列信息 */
        this.__columns = [];
        /** 表格的class */
        this.tableClass = 'table table-bordered table-striped table-hover text-center';
        /** 初始化table的时候是否自动加载数据 */
        this.autoLoadData = true;
        /** 表格列属性 */
        this.columns = [];
        /** 是否显示分页控件 */
        this.pagination = true;
        /** 是否限制只能选中一行 */
        this.singleSelect = false;
        /** 是否要服务器排序 */
        this.serverSort = true;
        /** 在设置分页属性的时候 初始化页面大小选择列表 */
        this.pageList = [10, 20, 30, 40, 50];
        /** 在设置分页属性的时候是否允许用户跳转页面 */
        this.skipPage = true;
        /** 客户端存储table信息是对应存放在localStorage中的key */
        this.cacheKey = '';
        /** 是否在客户端存储table的页大小,刷新的时候页大小不变,保存在localStorage中,key为ourpalm-table-${cacheKey}-pageSize */
        this.cachePageSize = false;
        /** 是否在客户端存在table的列隐藏信息,刷新的时候列的隐藏信息不变,保存在localStorage中,key为ourpalm-table-${cacheKey}-columns */
        this.cacheColumns = false;
        /** 分页条在那里显示可取值 'bottom', 'top', 'both' */
        this.pagePosition = 'bottom';
        /** 是否显示刷新按钮*/
        this.showRefreshBtn = true;
        /** 是否显示设置按钮*/
        this.showSettingBtn = true;
        /** 是否固定到顶部,依赖jquery*/
        this.enabledFloatThead = false;
        /** 固定到顶部的距离,单位像素*/
        this.floatTheadConfig = {
            zIndex: 10,
            responsiveContainer: function ($table) {
                return $table.closest('.table-responsive');
            }
        };
        /** 勾选时选中 */
        this.checkOnSelect = true;
        /** 选中时勾选 */
        this.selectOnCheck = true;
        /** 按住ctrl时为多选 */
        this.ctrlSelect = false;
        /** 加载数据成功回调 */
        this.loadData = function () {
            return null;
        };
        /** ngFor trackBy row */
        this.trackByFun = function (rowIndex, rowData) { return rowIndex; };
        /** 是否打开自定义列表项 */
        this.openSettings = false;
        /** 分页信息 */
        this.total = 0; //总共记录数
        this.rows = []; //当前页数据
        this.currentPage = 1; //当前第几页
        this.pageSize = 10; //当前页大小
        Object.assign(this, table);
        this.columns = this.columns.map(function (column) { return new ourpalm_table_column_1.OurpalmTableColumn(column); });
        this.__columns = this.columns.map(function (column) { return new ourpalm_table_column_1.OurpalmTableColumn(column); });
        this.reloadCacheColumns();
        this.reloadCachePageSize();
        this.reflowTable();
    }
    OurpalmTable.prototype.reflowTable = function () {
        this.tableComponent && this.tableComponent.reflowTable();
    };
    OurpalmTable.prototype.onLoadSuccess = function (_page) {
        var page = {
            currentPage: _page.currentPage,
            pageSize: _page.pageSize,
            total: _page.total,
            rows: (_page.rows || []).slice()
        };
        this.pageSize = page.pageSize || this.pageSize;
        this.total = page.total;
        this.rows = page.rows;
        this.currentPage = page.currentPage || this.currentPage;
        this.tmpCurrentPage = this.allPage > 0 ? (page.currentPage || this.currentPage) : 0;
        this.reflowTable();
    };
    Object.defineProperty(OurpalmTable.prototype, "allPage", {
        /**
         * 总共多少页
         */
        get: function () {
            return Math.max(Math.ceil(this.total / this.pageSize), 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OurpalmTable.prototype, "start", {
        /**
         * 开始位置
         */
        get: function () {
            if (this.allPage > 0)
                return (this.currentPage - 1) * this.pageSize + 1;
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OurpalmTable.prototype, "end", {
        /**
         * 结束位置
         */
        get: function () {
            if (this.allPage > 0)
                return this.start + this.rows.length - 1;
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    /*获取显示的列信息*/
    OurpalmTable.prototype.getDisplayedColumns = function () {
        var columns = [];
        this.columns.forEach(function (column) {
            column.show && columns.push(Object.assign({}, column));
        });
        return columns;
    };
    /*获取显示的行信息*/
    OurpalmTable.prototype.getDisplayedRows = function () {
        return this.rows.map(function (row) { return Object.assign({}, row); });
    };
    /*获取选中的行信息*/
    OurpalmTable.prototype.getSelectedRows = function () {
        return this.rows.filter(function (row) { return row.__selected__; }).map(function (row) { return Object.assign({}, row); });
    };
    /*获取勾选中的行信息*/
    OurpalmTable.prototype.getCheckedRows = function () {
        return this.rows.filter(function (row) { return row.__checked__; }).map(function (row) { return Object.assign({}, row); });
    };
    /*获取排序的列信息*/
    OurpalmTable.prototype.getSortColumns = function () {
        return this.columns.filter(function (column) { return column.sort; }).map(function (col) { return Object.assign({}, col); });
    };
    /*获取表格的实时信息*/
    OurpalmTable.prototype.getOptions = function () {
        return {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            pagination: this.pagination,
            singleSelect: this.singleSelect,
            serverSort: this.serverSort,
            pageList: [].concat(this.pageList),
            skipPage: this.skipPage,
            cacheKey: this.cacheKey,
            cachePageSize: this.cachePageSize,
            cacheColumns: this.cacheColumns,
            pagePosition: this.pagePosition,
        };
    };
    /*修改列定义,支持动态列,不会触发重新加载数据*/
    OurpalmTable.prototype.changeColumns = function (columns) {
        this.columns = columns.map(function (column) { return new ourpalm_table_column_1.OurpalmTableColumn(column); });
        this.__columns = columns.map(function (column) { return new ourpalm_table_column_1.OurpalmTableColumn(column); });
        // this.reflowTable();
        this.reloadCacheColumns();
        this.reloadCachePageSize();
        this.reflowTable();
    };
    /*跳转到第一页，触发重新加载数据*/
    OurpalmTable.prototype.firstPage = function () {
        this.currentPage = 1;
        this.invokeLoadData();
    };
    /*跳转到上一页，触发重新加载数据*/
    OurpalmTable.prototype.prePage = function () {
        this.currentPage--;
        this.invokeLoadData();
    };
    /*跳转到下一页，触发重新加载数据*/
    OurpalmTable.prototype.nextPage = function () {
        this.currentPage++;
        this.invokeLoadData();
    };
    /*跳转到末一页，触发重新加载数据*/
    OurpalmTable.prototype.lastPage = function () {
        this.currentPage = this.allPage;
        this.invokeLoadData();
    };
    /*刷新当前页，触发重新加载数据*/
    OurpalmTable.prototype.refresh = function () {
        this.invokeLoadData();
    };
    /*修改页大小，触发重新加载数据*/
    OurpalmTable.prototype.changePageSize = function (pageSize) {
        this.currentPage = 1;
        this.pageSize = pageSize;
        this.invokeLoadData();
    };
    /*跳转到N页，触发重新加载数据*/
    OurpalmTable.prototype.gotoSkipPage = function (page) {
        this.currentPage = page;
        this.invokeLoadData();
    };
    /*加载完成时，可通过该方法设置PageData*/
    OurpalmTable.prototype.setPageData = function (page) {
        this.onLoadSuccess(page);
    };
    /*重新配置table属性，触发重新加载数据*/
    OurpalmTable.prototype.setOptions = function (table) {
        Object.assign(this, table);
        this.columns = this.columns.map(function (column) { return new ourpalm_table_column_1.OurpalmTableColumn(column); });
        this.__columns = this.columns.map(function (column) { return new ourpalm_table_column_1.OurpalmTableColumn(column); });
        if (this.autoLoadData) {
            this.invokeLoadData();
        }
        this.reloadCacheColumns();
        this.reloadCachePageSize();
        this.reflowTable();
    };
    /*勾选当前页中的所有行*/
    OurpalmTable.prototype.checkAll = function () {
        this.rows.forEach(function (row) {
            row.__checked__ = true;
        });
    };
    /*取消勾选当前页中的所有行*/
    OurpalmTable.prototype.uncheckAll = function () {
        this.rows.forEach(function (row) {
            row.__checked__ = false;
        });
    };
    /*勾选一行，行索引从0开始，传入行索引*/
    OurpalmTable.prototype.checkRow = function (index) {
        var row = this.rows[index];
        if (row) {
            row.__checked__ = true;
        }
    };
    /*取消勾选一行，行索引从0开始，传入行索*/
    OurpalmTable.prototype.uncheckRow = function (index) {
        var row = this.rows[index];
        if (row) {
            row.__checked__ = false;
        }
    };
    OurpalmTable.prototype.openSetting = function () {
        this.openSettings = true;
    };
    OurpalmTable.prototype.invokeLoadData = function () {
        this.loadData(this, this.onLoadSuccess.bind(this));
    };
    OurpalmTable.prototype.setTableComponent = function (tableComponent) {
        this.tableComponent = tableComponent;
    };
    OurpalmTable.prototype.reloadCacheColumns = function () {
        var _this = this;
        if (this.cacheKey && this.cacheColumns && window.localStorage) {
            var cache = window.localStorage.getItem("ngx-ourpalm-table-" + this.cacheKey + "-columns");
            if (cache) {
                var columnArr = JSON.parse(cache);
                if (columnArr.length == this.columns.length) {
                    var tmpColumns_1 = [];
                    columnArr.forEach((function (col1) {
                        _this.columns.forEach(function (col2) {
                            if (col1.field == col2.field) {
                                tmpColumns_1.push(Object.assign(col2, col1));
                            }
                        });
                    }));
                    this.columns.splice(0);
                    tmpColumns_1.forEach(function (col) {
                        _this.columns.push(col);
                    });
                }
                else {
                    window.localStorage.removeItem("ngx-ourpalm-table-" + this.cacheKey + "-columns");
                }
            }
        }
    };
    OurpalmTable.prototype.reloadCachePageSize = function () {
        if (this.cacheKey && this.cachePageSize && window.localStorage) {
            var pageSize = window.localStorage.getItem("ngx-ourpalm-table-" + this.cacheKey + "-pagesize");
            if (pageSize) {
                this.pageSize = +pageSize;
            }
        }
    };
    return OurpalmTable;
}());
exports.OurpalmTable = OurpalmTable;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function randomString() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
function uuid() {
    var uuid = [];
    for (var i = 0; i < 4; i++) {
        uuid.push(randomString());
    }
    return uuid.join('-');
}
exports.uuid = uuid;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var core_1 = __webpack_require__(0);
var ourpalm_table_1 = __webpack_require__(1);
var ourpalm_table_static_column_component_1 = __webpack_require__(12);
var OurpalmTableComponent = (function () {
    function OurpalmTableComponent(zone) {
        this.zone = zone;
        //是否是动态列，默认为声明式
        this.dynamicColumn = false;
    }
    OurpalmTableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.table && this.table.setTableComponent(this);
        if (this.table.enabledFloatThead) {
            this.zone.runOutsideAngular(function () {
                _this.$table = $(_this.el.nativeElement);
                _this.$table.floatThead(__assign({}, _this.table.floatTheadConfig));
            });
        }
    };
    OurpalmTableComponent.prototype.reflowTable = function () {
        this.table.enabledFloatThead && this.$table.floatThead('reflow');
    };
    OurpalmTableComponent.prototype.ngOnDestroy = function () {
        if (this.table.enabledFloatThead) {
            this.$table.floatThead('destroy');
        }
    };
    OurpalmTableComponent.prototype.ngAfterContentInit = function () {
        //声明式列，不支持动态列特性
        if (this.columnDirs.toArray().length > 0) {
            this.dynamicColumn = false;
            var columns = this.columnDirs.toArray().map(function (columnDir) { return Object.assign(columnDir.column, { template: columnDir.template }); });
            this.table.__columns = this.table.columns.map(function (col) { return Object.assign({}, col); });
            this.table.changeColumns(columns);
        }
        else {
            this.dynamicColumn = true;
        }
        //加载数据
        if (this.table.autoLoadData) {
            this.table.invokeLoadData();
        }
    };
    return OurpalmTableComponent;
}());
__decorate([
    core_1.ViewChild('el'),
    __metadata("design:type", core_1.ElementRef)
], OurpalmTableComponent.prototype, "el", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_1.OurpalmTable)
], OurpalmTableComponent.prototype, "table", void 0);
__decorate([
    core_1.ContentChildren(ourpalm_table_static_column_component_1.OurpalmTableStaticColumnComponent),
    __metadata("design:type", core_1.QueryList)
], OurpalmTableComponent.prototype, "columnDirs", void 0);
OurpalmTableComponent = __decorate([
    core_1.Component({
        selector: 'ourpalm-table',
        styles: [__webpack_require__(48)],
        changeDetection: core_1.ChangeDetectionStrategy.Default,
        template: "\n        <table #el [ngClass]=\"table.tableClass\">\n            <thead>\n                <ng-container *ngIf=\"table.pagination && table.pagePosition != 'bottom' \">\n                    <tr class=\"ourpalm-table-pageing\" ourpalm-table-paging [table]=\"table\"></tr>\n                </ng-container>\n                <tr ourpalm-table-header [table]=\"table\" [columns]=\"table.columns\"></tr>\n            </thead>\n            <tbody ourpalm-table-rows [table]=\"table\" [rows]=\"table.rows\" [dynamicColumn]=\"dynamicColumn\"\n                   [columns]=\"table.columns\">\n            </tbody>\n            <tfoot>\n                <ng-container *ngIf=\"table.pagination && table.pagePosition != 'top' \">\n                    <tr class=\"ourpalm-table-pageing\" ourpalm-table-paging [table]=\"table\" [tableComponent]=\"this\"></tr>\n                </ng-container>\n            </tfoot>\n        </table>\n    "
    }),
    __metadata("design:paramtypes", [core_1.NgZone])
], OurpalmTableComponent);
exports.OurpalmTableComponent = OurpalmTableComponent;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = __webpack_require__(3);
/**
 * 表列属性
 */
var OurpalmTableColumn = (function () {
    function OurpalmTableColumn(optcolumn) {
        /** 表头 */
        this.header = '';
        /** 字段名称 */
        this.field = '';
        /** 是否列排序 */
        this.sort = false;
        /** 列排序方向,取值 asc 或 desc 或 null*/
        this.sortOrder = null;
        /** 是否为行号列 1...* */
        this.rownumbers = false;
        /** 是否隐藏列 */
        this.show = true;
        /** 是否为多选列 */
        this.checkbox = false;
        /** 是否禁止右键菜单 */
        this.disabledContextMenu = false;
        /** 单元格formatter(格式化器)函数 */
        this.formatter = function (value, row) { return value; };
        /** 列排序函数 */
        this.sorter = function (column, row1, row2) {
            return row1[column.field] - row2[column.field];
        };
        /** uuid: 唯一标示,用来优化变更检测 */
        this.__uuid__ = uuid_1.uuid();
        Object.assign(this, optcolumn);
    }
    return OurpalmTableColumn;
}());
exports.OurpalmTableColumn = OurpalmTableColumn;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dragulaExpt = __webpack_require__(37);
exports.dragula = dragulaExpt.default || dragulaExpt;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var dragula_class_1 = __webpack_require__(7);
var core_1 = __webpack_require__(0);
var DragulaService = (function () {
    function DragulaService() {
        this.cancel = new core_1.EventEmitter();
        this.cloned = new core_1.EventEmitter();
        this.drag = new core_1.EventEmitter();
        this.dragend = new core_1.EventEmitter();
        this.drop = new core_1.EventEmitter();
        this.out = new core_1.EventEmitter();
        this.over = new core_1.EventEmitter();
        this.remove = new core_1.EventEmitter();
        this.shadow = new core_1.EventEmitter();
        this.dropModel = new core_1.EventEmitter();
        this.removeModel = new core_1.EventEmitter();
        this.events = [
            'cancel', 'cloned', 'drag', 'dragend', 'drop', 'out', 'over',
            'remove', 'shadow', 'dropModel', 'removeModel'
        ];
        this.bags = [];
    }
    DragulaService.prototype.add = function (name, drake) {
        var bag = this.find(name);
        if (bag) {
            throw new Error('Bag named: "' + name + '" already exists.');
        }
        bag = { name: name, drake: drake };
        this.bags.push(bag);
        if (drake.models) {
            this.handleModels(name, drake);
        }
        if (!bag.initEvents) {
            this.setupEvents(bag);
        }
        return bag;
    };
    DragulaService.prototype.find = function (name) {
        for (var _i = 0, _a = this.bags; _i < _a.length; _i++) {
            var bag = _a[_i];
            if (bag.name === name) {
                return bag;
            }
        }
    };
    DragulaService.prototype.destroy = function (name) {
        var bag = this.find(name);
        var i = this.bags.indexOf(bag);
        this.bags.splice(i, 1);
        bag.drake.destroy();
    };
    DragulaService.prototype.setOptions = function (name, options) {
        var bag = this.add(name, dragula_class_1.dragula(options));
        this.handleModels(name, bag.drake);
    };
    DragulaService.prototype.handleModels = function (name, drake) {
        var _this = this;
        var dragElm;
        var dragIndex;
        var dropIndex;
        var sourceModel;
        drake.on('remove', function (el, source) {
            if (!drake.models) {
                return;
            }
            sourceModel = drake.models[drake.containers.indexOf(source)];
            sourceModel.splice(dragIndex, 1);
            // console.log('REMOVE');
            // console.log(sourceModel);
            _this.removeModel.emit([name, el, source]);
        });
        drake.on('drag', function (el, source) {
            dragElm = el;
            dragIndex = _this.domIndexOf(el, source);
        });
        drake.on('drop', function (dropElm, target, source) {
            if (!drake.models || !target) {
                return;
            }
            dropIndex = _this.domIndexOf(dropElm, target);
            sourceModel = drake.models[drake.containers.indexOf(source)];
            // console.log('DROP');
            // console.log(sourceModel);
            if (target === source) {
                sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
            }
            else {
                var notCopy = dragElm === dropElm;
                var targetModel = drake.models[drake.containers.indexOf(target)];
                var dropElmModel = notCopy ? sourceModel[dragIndex] : JSON.parse(JSON.stringify(sourceModel[dragIndex]));
                if (notCopy) {
                    sourceModel.splice(dragIndex, 1);
                }
                targetModel.splice(dropIndex, 0, dropElmModel);
                target.removeChild(dropElm); // element must be removed for ngFor to apply correctly
            }
            _this.dropModel.emit([name, dropElm, target, source]);
        });
    };
    DragulaService.prototype.setupEvents = function (bag) {
        bag.initEvents = true;
        var that = this;
        var emitter = function (type) {
            function replicate() {
                var args = Array.prototype.slice.call(arguments);
                that[type].emit([bag.name].concat(args));
            }
            bag.drake.on(type, replicate);
        };
        this.events.forEach(emitter);
    };
    DragulaService.prototype.domIndexOf = function (child, parent) {
        return Array.prototype.indexOf.call(parent.children, child);
    };
    return DragulaService;
}());
DragulaService = __decorate([
    core_1.Injectable()
], DragulaService);
exports.DragulaService = DragulaService;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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
var platform_browser_1 = __webpack_require__(52);
var core_1 = __webpack_require__(0);
var SafeHtmlPipe = (function () {
    function SafeHtmlPipe(sanitized) {
        this.sanitized = sanitized;
    }
    SafeHtmlPipe.prototype.transform = function (value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    };
    return SafeHtmlPipe;
}());
SafeHtmlPipe = __decorate([
    core_1.Pipe({ name: 'safeHtml' }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
], SafeHtmlPipe);
exports.SafeHtmlPipe = SafeHtmlPipe;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ourpalm_table_1 = __webpack_require__(1);
var TableConfig = (function () {
    function TableConfig() {
    }
    TableConfig.prototype.create = function (table) {
        return new ourpalm_table_1.OurpalmTable(Object.assign({}, this.config, table));
    };
    return TableConfig;
}());
TableConfig = __decorate([
    core_1.Injectable()
], TableConfig);
exports.TableConfig = TableConfig;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var ourpalm_table_1 = __webpack_require__(1);
var row_context_menu_component_1 = __webpack_require__(13);
var uuid_1 = __webpack_require__(3);
var OurpalmTableRowComponent = (function () {
    function OurpalmTableRowComponent(el, componentFactoryResolver, appRef, injector) {
        this.el = el;
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    OurpalmTableRowComponent.prototype.ngOnInit = function () {
        if (this.table.rowMenus && this.table.rowMenus.length > 0) {
            this.appendRowContextMenuComponentToBody();
        }
    };
    OurpalmTableRowComponent.prototype.ngOnDestroy = function () {
        if (this.contextMenuRef) {
            // remove it from the component tree and from the DOM
            this.appRef.detachView(this.contextMenuRef.hostView);
            this.contextMenuRef.destroy();
        }
    };
    OurpalmTableRowComponent.prototype.appendRowContextMenuComponentToBody = function () {
        // Create a component reference from the component
        this.contextMenuRef = this.componentFactoryResolver
            .resolveComponentFactory(row_context_menu_component_1.RowContextMenuComponent)
            .create(this.injector);
        // Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(this.contextMenuRef.hostView);
        // Get DOM element from component
        var domElem = this.contextMenuRef.hostView
            .rootNodes[0];
        // Append DOM element to the body
        document.body.appendChild(domElem);
        // set @Input() properties
        this.contextMenu = this.contextMenuRef.instance;
        this.contextMenu.rowComponent = this;
        this.contextMenu.menus = this.table.rowMenus;
        this.contextMenu.changeDetectorRef.detectChanges();
    };
    OurpalmTableRowComponent.prototype.getStyler = function (column, rowIndex, columnIndex, rowData) {
        if (typeof column.styler == 'function') {
            return column.styler(rowIndex, columnIndex, rowData);
        }
        else {
            return column.styler;
        }
    };
    OurpalmTableRowComponent.prototype.onClickRow = function (rowIndex, rowData, event) {
        if (this.table.onClickRow) {
            this.table.onClickRow(rowIndex, rowData);
        }
        if (this.table.singleSelect || (!this.table.singleSelect && this.table.ctrlSelect && !event.ctrlKey)) {
            this.table.rows.forEach(function (row) {
                if (row !== rowData) {
                    if (row.__selected__) {
                        row.__uuid__ = uuid_1.uuid();
                        row.__selected__ = false;
                    }
                }
                else {
                    row.__selected__ = !row.__selected__;
                    row.__uuid__ = uuid_1.uuid();
                }
            });
        }
        else {
            rowData.__selected__ = !rowData.__selected__;
            rowData.__uuid__ = uuid_1.uuid();
        }
        if (this.table.selectOnCheck) {
            this.table.rows.forEach(function (row) {
                if (row.__checked__ != row.__selected__) {
                    row.__checked__ = !!row.__selected__;
                    row.__uuid__ = uuid_1.uuid();
                }
            });
        }
    };
    OurpalmTableRowComponent.prototype.showContextMenu = function (event, rowIndex, cellIndex, rowData, column) {
        if (!column.disabledContextMenu) {
            event.preventDefault();
            if (!rowData.__selected__) {
                this.onClickRow(rowIndex, rowData, event);
            }
            // 如果当前列没有禁用右键菜单，且 可显示的右键菜单数不为0
            var length_1 = this.table.rowMenus.filter(function (menu) { return !menu.separator; }).filter(function (menu) {
                console.log(menu.text, typeof menu.show === 'function' ? menu.show() : menu.show);
                return typeof menu.show === 'function' ? menu.show() : menu.show;
            }).length;
            if (length_1 > 0) {
                this.contextMenu.styler = {
                    display: 'block',
                    position: 'absolute',
                    left: event.pageX + "px",
                    top: event.pageY + "px"
                };
                this.contextMenu.changeDetectorRef.markForCheck();
            }
            else if (this.contextMenu.styler && this.contextMenu.styler.display != 'none') {
                this.contextMenu.styler = {
                    display: 'none'
                };
                this.contextMenu.changeDetectorRef.markForCheck();
            }
        }
    };
    return OurpalmTableRowComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], OurpalmTableRowComponent.prototype, "rows", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], OurpalmTableRowComponent.prototype, "columns", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_1.OurpalmTable)
], OurpalmTableRowComponent.prototype, "table", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], OurpalmTableRowComponent.prototype, "dynamicColumn", void 0);
OurpalmTableRowComponent = __decorate([
    core_1.Component({
        selector: '[ourpalm-table-rows]',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        styles: [__webpack_require__(46)],
        template: "\n        <ng-container [ngSwitch]=\"dynamicColumn\">\n            <ng-container *ngSwitchCase=\"true\">\n                <!--\u52A8\u6001\u5217-->\n                <tr *simpleNgFor=\"let row of rows; let i = index;\"\n                    [ngClass]=\"{'row-selected': row.__selected__}\"\n                    (click)=\"onClickRow(i, row, $event)\"\n\n                    dynamic-event-directive\n                    [listenDbClickEvent]=\"table.onDbClickRow\"\n                    (onDbClick)=\"table.onDbClickRow(i, row)\">\n                    <!--[listenClickEvent]=\"table.onClickRow\"-->\n                    <!--(onClick)=\"table.onClickRow(i, row)\"-->\n                    <ng-container *simpleNgFor=\"let column of table.columns; let j = index\">\n                        <td ourpalm-table-dynamic-column\n                            [table]=\"table\"\n                            [row]=\"row\"\n                            [column]=\"column\"\n                            [index]=\"i\"\n                            [class.hidden]=\"!column.show\"\n                            [ngStyle]=\"getStyler(column, i, j, row)\"\n                            [listenClickEvent]=\"table.onClickCell\"\n                            (onClick)=\"table.onClickCell(i, j, row, column)\"\n                            dynamic-event-directive\n                            [listenDbClickEvent]=\"table.onDbClickCell\"\n                            (onDbClick)=\"table.onDbClickCell(i, j, row, column)\"\n                            [listenContextMenuEvent]=\"!!table.rowMenus\"\n                            (onContextMenu)=\"showContextMenu($event, i, j, row, column)\">\n                        </td>\n                    </ng-container>\n                </tr>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"false\">\n                <!--\u9759\u6001\u5217-->\n                <tr *simpleNgFor=\"let row of rows; let i = index;\"\n                    [ngClass]=\"{'row-selected': row.__selected__}\"\n                    (click)=\"onClickRow(i, row, $event)\"\n\n                    dynamic-event-directive\n                    [listenDbClickEvent]=\"table.onDbClickRow\"\n                    (onDbClick)=\"table.onDbClickRow(i, row)\">\n                    <!--[listenClickEvent]=\"table.onClickRow\"-->\n                    <!--(onClick)=\"table.onClickRow(i, row)\"-->\n                    <td *simpleNgFor=\"let col of table.columns; let j = index\"\n                        [class.hidden]=\"!col.show\"\n                        [ngStyle]=\"getStyler(col, i, j, row)\"\n                        dynamic-event-directive\n                        [listenClickEvent]=\"table.onClickCell\"\n                        (onClick)=\"table.onClickCell(i, j, row, col)\"\n                        [listenDbClickEvent]=\"table.onDbClickCell\"\n                        (onDbClick)=\"table.onDbClickCell(i, j, row, col)\"\n                        [listenContextMenuEvent]=\"!!table.rowMenus\"\n                        (onContextMenu)=\"showContextMenu($event, i, j, row, col)\">\n                        <ourpalm-table-columnTemplateRenderer [table]=\"table\"\n                                                              [column]=\"col\"\n                                                              [row]=\"row\"\n                                                              [index]=\"i\">\n                        </ourpalm-table-columnTemplateRenderer>\n                    </td>\n                </tr>\n            </ng-container>\n            <!--<row-context-menu [menus]=\"table.rowMenus\" [rowComponent]=\"this\"></row-context-menu>-->\n        </ng-container>\n    "
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.ComponentFactoryResolver,
        core_1.ApplicationRef,
        core_1.Injector])
], OurpalmTableRowComponent);
exports.OurpalmTableRowComponent = OurpalmTableRowComponent;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var ourpalm_table_column_1 = __webpack_require__(6);
var ourpalm_table_1 = __webpack_require__(1);
var uuid_1 = __webpack_require__(3);
var OurpalmTableStaticColumnComponent = (function () {
    function OurpalmTableStaticColumnComponent() {
    }
    OurpalmTableStaticColumnComponent.prototype.ngOnInit = function () {
        this.column = new ourpalm_table_column_1.OurpalmTableColumn(this.column);
    };
    return OurpalmTableStaticColumnComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_column_1.OurpalmTableColumn)
], OurpalmTableStaticColumnComponent.prototype, "column", void 0);
__decorate([
    core_1.ContentChild(core_1.TemplateRef),
    __metadata("design:type", core_1.TemplateRef)
], OurpalmTableStaticColumnComponent.prototype, "template", void 0);
OurpalmTableStaticColumnComponent = __decorate([
    core_1.Component({
        selector: 'ourpalm-table-column',
        template: " "
    })
], OurpalmTableStaticColumnComponent);
exports.OurpalmTableStaticColumnComponent = OurpalmTableStaticColumnComponent;
var OurpalmTableColumnTemplateRenderer = (function () {
    function OurpalmTableColumnTemplateRenderer(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
    OurpalmTableColumnTemplateRenderer.prototype.onClickCheckBox = function (event) {
        //会触发cell的点击事件和row的select事件，所以这里需要阻止事件冒泡
        event.stopPropagation();
    };
    OurpalmTableColumnTemplateRenderer.prototype.onCheckBoxChange = function (event) {
        event.stopPropagation();
        if (this.row.__checked__ && this.table.singleSelect) {
            this.table.rows.forEach(function (row) { return row.__checked__ = false; });
            this.row.__checked__ = true;
        }
        if (this.table.checkOnSelect) {
            this.row.__selected__ = !!this.row.__checked__;
        }
        this.table.onRowCheckBoxChange && this.table.onRowCheckBoxChange(this.row, this.index);
    };
    OurpalmTableColumnTemplateRenderer.prototype.ngOnChanges = function () {
        // 每次对象改变是记录对象的uuid
        if (typeof this.row === 'object') {
            if (!this.row.__uuid__) {
                this.row.__uuid__ = uuid_1.uuid();
            }
            this.lastRowUuid = this.row.__uuid__;
        }
        this.lastColumnUuid = this.column.__uuid__;
    };
    OurpalmTableColumnTemplateRenderer.prototype.ngDoCheck = function () {
        // 每次DoCheck时检查对象的uuid是否改变
        if (this.lastColumnUuid !== this.column.__uuid__) {
            this.changeDetectorRef.markForCheck();
        }
        else if (typeof this.row === 'object' && this.lastRowUuid !== this.row.__uuid__) {
            this.changeDetectorRef.markForCheck();
        }
    };
    return OurpalmTableColumnTemplateRenderer;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OurpalmTableColumnTemplateRenderer.prototype, "row", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], OurpalmTableColumnTemplateRenderer.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_1.OurpalmTable)
], OurpalmTableColumnTemplateRenderer.prototype, "table", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_column_1.OurpalmTableColumn)
], OurpalmTableColumnTemplateRenderer.prototype, "column", void 0);
OurpalmTableColumnTemplateRenderer = __decorate([
    core_1.Component({
        selector: 'ourpalm-table-columnTemplateRenderer',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        template: "\n        <!-- \u6392\u5E8F\u5217 -->\n        <ng-container *ngIf=\"column.sort\">\n            <ng-template [ngTemplateOutlet]=\"column.template\"\n                         [ngOutletContext]=\"{'$implicit': column, '$row': row}\"></ng-template>\n        </ng-container>\n        <!-- checkbox\u5217 -->\n        <ng-container *ngIf=\"column.checkbox\">\n            <input type=\"checkbox\" [(ngModel)]=\"row.__checked__\" (change)=\"onCheckBoxChange($event)\"\n                   (click)=\"onClickCheckBox($event)\">\n        </ng-container>\n        <!-- \u5E8F\u53F7\u5217 -->\n        <ng-container *ngIf=\"column.rownumbers\">\n            {{index + 1}}\n        </ng-container>\n        <!-- \u6B63\u5E38\u5217 -->\n        <ng-container *ngIf=\"!column.sort && !column.checkbox && !column.rownumbers\">\n            <ng-template [ngTemplateOutlet]=\"column.template\"\n                         [ngOutletContext]=\"{'$implicit': column, '$row': row}\"></ng-template>\n        </ng-container>\n    "
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
], OurpalmTableColumnTemplateRenderer);
exports.OurpalmTableColumnTemplateRenderer = OurpalmTableColumnTemplateRenderer;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var row_content_menu_1 = __webpack_require__(24);
var ourpalm_table_rows_component_1 = __webpack_require__(11);
/**
 * 优化思路
 * 使用OnPush策略，菜单显示时注册全局监听事件，菜单隐藏时取消全局监听事件
 */
var RowContextMenuComponent = (function () {
    function RowContextMenuComponent(changeDetectorRef, renderer) {
        this.changeDetectorRef = changeDetectorRef;
        this.renderer = renderer;
    }
    Object.defineProperty(RowContextMenuComponent.prototype, "menus", {
        get: function () {
            return this._menus;
        },
        set: function (_menus) {
            var _this = this;
            if (_menus) {
                this._menus = _menus.map(function (menu) { return _this.deepCloneMenu(menu); });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowContextMenuComponent.prototype, "styler", {
        get: function () {
            return this._styler;
        },
        set: function (styler) {
            this._styler = styler;
            if (styler && styler.display == 'none') {
                this.removeListener();
            }
            else if (styler && styler.display == 'block') {
                this.addListener();
            }
        },
        enumerable: true,
        configurable: true
    });
    RowContextMenuComponent.prototype.addListener = function () {
        var _this = this;
        if (this.menus) {
            if (!this.clickListen) {
                this.clickListen = this.renderer.listen(document, 'click', function (event) {
                    _this.styler = { display: 'none' };
                    _this.changeDetectorRef.markForCheck();
                });
            }
            if (!this.contextMenuListen) {
                this.contextMenuListen = this.renderer.listen(document, 'contextmenu', function (event) {
                    if (!_this.rowComponent.el.nativeElement.contains(event.target)) {
                        _this.styler = { display: 'none' };
                        _this.changeDetectorRef.markForCheck();
                    }
                });
            }
        }
    };
    RowContextMenuComponent.prototype.removeListener = function () {
        if (this.clickListen) {
            this.clickListen();
            this.clickListen = null;
        }
        if (this.contextMenuListen) {
            this.contextMenuListen();
            this.contextMenuListen = null;
        }
    };
    RowContextMenuComponent.prototype.onClickMenu = function (menu) {
        this.styler = { display: 'none' };
        menu.onclick && menu.onclick();
    };
    RowContextMenuComponent.prototype.showMenu = function (menu) {
        if (typeof menu.show == "function") {
            return menu.show();
        }
        return menu.show;
    };
    RowContextMenuComponent.prototype.deepCloneMenu = function (menu) {
        var _this = this;
        if (menu.submenus) {
            menu.submenus = menu.submenus.map(function (submenu) {
                return _this.deepCloneMenu(submenu);
            });
        }
        return new row_content_menu_1.RowContextMenu(menu);
    };
    return RowContextMenuComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_rows_component_1.OurpalmTableRowComponent)
], RowContextMenuComponent.prototype, "rowComponent", void 0);
__decorate([
    core_1.Input('menus'),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], RowContextMenuComponent.prototype, "menus", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], RowContextMenuComponent.prototype, "styler", null);
RowContextMenuComponent = __decorate([
    core_1.Component({
        selector: 'ourpalm-table-row-context-menu',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        styles: [__webpack_require__(49)],
        template: "\n        <ng-template #menusTpl let-menus>\n            <ul class=\"dropdown-menu\">\n                <ng-container *simpleNgFor=\"let menu of menus\">\n                    <ng-container *ngIf=\"menu.separator\">\n                        <li class=\"divider\" [class.hidden]=\"!showMenu(menu)\"></li>\n                    </ng-container>\n                    <ng-container *ngIf=\"!menu.separator && !menu.submenus\">\n                        <li (click)=\"onClickMenu(menu)\" [class.hidden]=\"!showMenu(menu)\">\n                            <a><i [ngClass]=\"menu.iconCls || 'empty-icon'\"></i>{{ menu.text }}</a>\n                        </li>\n                    </ng-container>\n                    <ng-container *ngIf=\"menu.submenus\">\n                        <li class=\"dropdown-submenu\" [class.hidden]=\"!showMenu(menu)\">\n                            <a tabindex=\"-1\"><i [ngClass]=\"menu.iconCls || 'empty-icon'\"></i>{{ menu.text }}</a>\n                            <ng-container *ngTemplateOutlet=\"menusTpl;context:{$implicit: menu.submenus}\">\n                            </ng-container>\n                        </li>\n                    </ng-container>\n                </ng-container>\n            </ul>\n        </ng-template>\n\n\n        <div class=\"row-context-menu\" *ngIf=\"menus\" [ngStyle]=\"styler\">\n            <ng-container *ngTemplateOutlet=\"menusTpl; context:{ $implicit: menus }\"></ng-container>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
        core_1.Renderer2])
], RowContextMenuComponent);
exports.RowContextMenuComponent = RowContextMenuComponent;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var dragula_provider_1 = __webpack_require__(8);
var dragula_class_1 = __webpack_require__(7);
var DragulaDirective = (function () {
    function DragulaDirective(el, dragulaService) {
        this.el = el;
        this.dragulaService = dragulaService;
        this.container = el.nativeElement;
    }
    DragulaDirective.prototype.ngOnInit = function () {
        var _this = this;
        // console.log(this.bag);
        var bag = this.dragulaService.find(this.dragula);
        var checkModel = function () {
            if (_this.dragulaModel) {
                if (_this.drake.models) {
                    _this.drake.models.push(_this.dragulaModel);
                }
                else {
                    _this.drake.models = [_this.dragulaModel];
                }
            }
        };
        if (bag) {
            this.drake = bag.drake;
            checkModel();
            this.drake.containers.push(this.container);
        }
        else {
            this.drake = dragula_class_1.dragula([this.container], Object.assign({}, this.dragulaOptions));
            checkModel();
            this.dragulaService.add(this.dragula, this.drake);
        }
    };
    DragulaDirective.prototype.ngOnChanges = function (changes) {
        // console.log('dragula.directive: ngOnChanges');
        // console.log(changes);
        if (changes && changes.dragulaModel) {
            if (this.drake) {
                if (this.drake.models) {
                    var modelIndex = this.drake.models.indexOf(changes.dragulaModel.previousValue);
                    this.drake.models.splice(modelIndex, 1, changes.dragulaModel.currentValue);
                }
                else {
                    this.drake.models = [changes.dragulaModel.currentValue];
                }
            }
        }
    };
    return DragulaDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DragulaDirective.prototype, "dragula", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DragulaDirective.prototype, "dragulaModel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DragulaDirective.prototype, "dragulaOptions", void 0);
DragulaDirective = __decorate([
    core_1.Directive({ selector: '[dragula]' }),
    __metadata("design:paramtypes", [core_1.ElementRef, dragula_provider_1.DragulaService])
], DragulaDirective);
exports.DragulaDirective = DragulaDirective;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(50);
var ourpalm_table_component_1 = __webpack_require__(5);
var ourpalm_table_header_component_1 = __webpack_require__(19);
var forms_1 = __webpack_require__(51);
var ourpalm_table_paging_component_1 = __webpack_require__(20);
var ourpalm_table_dynamic_column_component_1 = __webpack_require__(18);
var ourpalm_table_static_column_component_1 = __webpack_require__(12);
var ourpalm_table_settings_component_1 = __webpack_require__(21);
var ng2_dragula_1 = __webpack_require__(39);
var ourpalm_table_rows_component_1 = __webpack_require__(11);
var dynamic_event_directive_1 = __webpack_require__(17);
var table_config_1 = __webpack_require__(10);
var safe_html_pipe_1 = __webpack_require__(9);
var row_context_menu_component_1 = __webpack_require__(13);
var simple_ngfor_directive_1 = __webpack_require__(22);
var OurpalmTableModule = OurpalmTableModule_1 = (function () {
    function OurpalmTableModule() {
    }
    OurpalmTableModule.forRoot = function () {
        return {
            ngModule: OurpalmTableModule_1,
            providers: [table_config_1.TableConfig]
        };
    };
    return OurpalmTableModule;
}());
OurpalmTableModule = OurpalmTableModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            ng2_dragula_1.DragulaModule
        ],
        declarations: [
            ourpalm_table_component_1.OurpalmTableComponent,
            ourpalm_table_dynamic_column_component_1.OurpalmTableDynamicColumnComponent,
            ourpalm_table_static_column_component_1.OurpalmTableStaticColumnComponent,
            ourpalm_table_header_component_1.OurpalmTableHeaderComponent,
            ourpalm_table_settings_component_1.OurpalmTableSettingsComponent,
            ourpalm_table_rows_component_1.OurpalmTableRowComponent,
            row_context_menu_component_1.RowContextMenuComponent,
            dynamic_event_directive_1.DynamicEventDirective,
            ourpalm_table_paging_component_1.OurpalmTablePagingComponent,
            ourpalm_table_static_column_component_1.OurpalmTableColumnTemplateRenderer,
            ourpalm_table_settings_component_1.ColumnSettingsLeftFilter,
            ourpalm_table_settings_component_1.ColumnSettingsRightFilter,
            safe_html_pipe_1.SafeHtmlPipe,
            simple_ngfor_directive_1.SimpleNgFor
        ],
        exports: [
            ourpalm_table_component_1.OurpalmTableComponent,
            ourpalm_table_static_column_component_1.OurpalmTableStaticColumnComponent,
            safe_html_pipe_1.SafeHtmlPipe,
            simple_ngfor_directive_1.SimpleNgFor
        ],
        providers: [],
        entryComponents: [
            row_context_menu_component_1.RowContextMenuComponent
        ]
    })
], OurpalmTableModule);
exports.OurpalmTableModule = OurpalmTableModule;
var OurpalmTableModule_1;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function atoa (a, n) { return Array.prototype.slice.call(a, n); }


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var DynamicEventDirective = (function () {
    function DynamicEventDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.listenClickEvent = false;
        this.listenDbClickEvent = false;
        this.listenContextMenuEvent = false;
        this.onClick = new core_1.EventEmitter();
        this.onDbClick = new core_1.EventEmitter();
        this.onContextMenu = new core_1.EventEmitter();
    }
    DynamicEventDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.listenClickEvent) {
            this.renderer.listen(this.el.nativeElement, 'click', function (event) {
                _this.onClick.emit(event);
            });
        }
        if (this.listenDbClickEvent) {
            this.renderer.listen(this.el.nativeElement, 'dblclick', function (event) {
                _this.onDbClick.emit(event);
            });
        }
        if (this.listenContextMenuEvent) {
            this.renderer.listen(this.el.nativeElement, 'contextmenu', function (event) {
                _this.onContextMenu.emit(event);
            });
        }
    };
    DynamicEventDirective.prototype.ngOnDestroy = function () {
    };
    return DynamicEventDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicEventDirective.prototype, "listenClickEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicEventDirective.prototype, "listenDbClickEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicEventDirective.prototype, "listenContextMenuEvent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicEventDirective.prototype, "onClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicEventDirective.prototype, "onDbClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicEventDirective.prototype, "onContextMenu", void 0);
DynamicEventDirective = __decorate([
    core_1.Directive({
        selector: '[dynamic-event-directive]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer2])
], DynamicEventDirective);
exports.DynamicEventDirective = DynamicEventDirective;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var ourpalm_table_column_1 = __webpack_require__(6);
var ourpalm_table_1 = __webpack_require__(1);
var uuid_1 = __webpack_require__(3);
/**
 * 优化思路
 * 使用OnPush策略，给rowData增加uuid字段，只有当UUID字段更新时才更新UI
 */
var OurpalmTableDynamicColumnComponent = (function () {
    function OurpalmTableDynamicColumnComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
    Object.defineProperty(OurpalmTableDynamicColumnComponent.prototype, "value", {
        get: function () {
            return this.column.formatter ? this.column.formatter(this.row[this.column.field], this.row) : this.row[this.column.field];
        },
        enumerable: true,
        configurable: true
    });
    OurpalmTableDynamicColumnComponent.prototype.onClickCheckBox = function (event) {
        //会触发cell的点击事件和row的select事件，所以这里需要阻止事件冒泡
        event.stopPropagation();
    };
    OurpalmTableDynamicColumnComponent.prototype.onCheckBoxChange = function (event) {
        var _this = this;
        event.stopPropagation();
        if (this.row.__checked__ && this.table.singleSelect) {
            this.table.rows.forEach(function (row) {
                if (row !== _this.row) {
                    row.__checked__ = false;
                }
            });
        }
        if (this.table.checkOnSelect) {
            this.row.__selected__ = !!this.row.__checked__;
        }
        this.table.onRowCheckBoxChange && this.table.onRowCheckBoxChange(this.row, this.index);
    };
    OurpalmTableDynamicColumnComponent.prototype.ngOnChanges = function () {
        // 每次对象改变是记录对象的uuid
        if (typeof this.row === 'object') {
            if (!this.row.__uuid__) {
                this.row.__uuid__ = uuid_1.uuid();
            }
            this.lastRowUuid = this.row.__uuid__;
        }
        this.lastColumnUuid = this.column.__uuid__;
    };
    OurpalmTableDynamicColumnComponent.prototype.ngDoCheck = function () {
        // 每次DoCheck时检查对象的uuid是否改变
        if (this.lastColumnUuid !== this.column.__uuid__) {
            this.changeDetectorRef.markForCheck();
        }
        else if (typeof this.row === 'object' && this.lastRowUuid !== this.row.__uuid__) {
            this.changeDetectorRef.markForCheck();
        }
    };
    return OurpalmTableDynamicColumnComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OurpalmTableDynamicColumnComponent.prototype, "row", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], OurpalmTableDynamicColumnComponent.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_1.OurpalmTable)
], OurpalmTableDynamicColumnComponent.prototype, "table", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_column_1.OurpalmTableColumn)
], OurpalmTableDynamicColumnComponent.prototype, "column", void 0);
OurpalmTableDynamicColumnComponent = __decorate([
    core_1.Component({
        selector: '[ourpalm-table-dynamic-column]',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        template: "\n        <!-- \u9690\u85CF\u5217 -->\n        <ng-container [class.hidden]=\"!column.show\">\n            <!-- \u6392\u5E8F\u5217 -->\n            <ng-container *ngIf=\"column.sort\">\n                <span [innerHTML]=\"value | safeHtml\"></span>\n            </ng-container>\n            <!-- checkbox\u5217 -->\n            <ng-container *ngIf=\"column.checkbox\">\n                <input type=\"checkbox\" [(ngModel)]=\"row.__checked__\" (change)=\"onCheckBoxChange($event)\"\n                       (click)=\"onClickCheckBox($event)\">\n            </ng-container>\n            <!-- \u5E8F\u53F7\u5217 -->\n            <ng-container *ngIf=\"column.rownumbers\">\n                {{index + 1}}\n            </ng-container>\n            <!-- \u6B63\u5E38\u5217 -->\n            <ng-container *ngIf=\"!column.sort && !column.checkbox && !column.rownumbers\">\n                <span [innerHTML]=\"value | safeHtml\"></span>\n            </ng-container>\n        </ng-container>\n    "
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
], OurpalmTableDynamicColumnComponent);
exports.OurpalmTableDynamicColumnComponent = OurpalmTableDynamicColumnComponent;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var core_1 = __webpack_require__(0);
var ourpalm_table_1 = __webpack_require__(1);
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
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_1.OurpalmTable)
], OurpalmTableHeaderComponent.prototype, "table", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], OurpalmTableHeaderComponent.prototype, "columns", void 0);
OurpalmTableHeaderComponent = __decorate([
    core_1.Component({
        selector: '[ourpalm-table-header]',
        styles: [__webpack_require__(44)],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        template: "\n        <th *ngFor=\"let column of columns; let i = index\" [class.hidden]=\"!column.show\"><!-- \u9690\u85CF\u5217 -->\n            <!-- \u6392\u5E8F\u5217 -->\n            <span *ngIf=\"column.sort\" (click)=\"sortColumn(column)\">\n                {{column.header}}\n                <i class=\"fa\"\n                   [ngClass]=\"{'fa-sort-asc': column.sortOrder == 'asc', 'fa-sort-desc': column.sortOrder == 'desc', 'fa-sort': !column.sortOrder}\"></i>\n            </span>\n            <!-- checkbox\u5217 -->\n            <ng-container *ngIf=\"column.checkbox\">\n                <input type=\"checkbox\" [(ngModel)]=\"checkAll\" (change)=\"onCheckBoxChange()\">\n            </ng-container>\n            <!-- \u5E8F\u53F7\u5217 -->\n            <ng-container *ngIf=\"column.rownumbers\">\n                {{column.header}}\n            </ng-container>\n            <!-- \u6B63\u5E38\u5217 -->\n            <ng-container *ngIf=\"!column.sort && !column.checkbox && !column.rownumbers\">\n                {{column.header}}\n            </ng-container>\n        </th>\n    "
    })
], OurpalmTableHeaderComponent);
exports.OurpalmTableHeaderComponent = OurpalmTableHeaderComponent;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var ourpalm_table_1 = __webpack_require__(1);
var ourpalm_table_component_1 = __webpack_require__(5);
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
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_1.OurpalmTable)
], OurpalmTablePagingComponent.prototype, "table", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_component_1.OurpalmTableComponent)
], OurpalmTablePagingComponent.prototype, "tableComponent", void 0);
OurpalmTablePagingComponent = __decorate([
    core_1.Component({
        selector: '[ourpalm-table-paging]',
        styles: [__webpack_require__(45)],
        template: "\n        <td *ngIf=\"table.pagination\" [attr.colspan]=\"table.columns.length\">\n            <span class=\"page-left\">\n                <select class=\"form-control input-sm\" [(ngModel)]=\"table.pageSize\" (change)=\"changePageSize()\">\n                    <option *simpleNgFor=\"let val of table.pageList\" [value]=\"val\">{{val}}</option>\n                </select>\n                <button class=\"glyphicon glyphicon-step-backward ourpalm-table-pager\" (click)=\"firstPage()\"\n                        [disabled]=\"table.currentPage <= 1\"></button>\n                <button class=\"glyphicon glyphicon-backward ourpalm-table-pager\" (click)=\"prePage()\"\n                        [disabled]=\"table.currentPage <= 1\"></button>\n                \u7B2C\n                <input type=\"number\" [(ngModel)]=\"table.tmpCurrentPage\" min=\"1\" max=\"{{table.allPage}}\"\n                       (focusout)=\"focusout()\" (keydown)=\"keyEnterEvent($event)\" [readonly]=\"!table.skipPage\"\n                       class=\"form-control input-sm\">\n                \u9875,\u5171{{table.allPage}}\u9875\n                <button class=\"glyphicon glyphicon-forward ourpalm-table-pager\" (click)=\"nextPage()\"\n                        [disabled]=\"table.currentPage == table.allPage || table.allPage == 0\"></button>\n                <button class=\"glyphicon glyphicon-step-forward ourpalm-table-pager\" (click)=\"lastPage()\"\n                        [disabled]=\"table.currentPage == table.allPage || table.allPage == 0\"></button>\n                <button *ngIf=\"table.showRefreshBtn\" class=\"glyphicon glyphicon-refresh ourpalm-table-pager\"\n                        (click)=\"refresh()\"></button>\n                <button *ngIf=\"table.showSettingBtn\" class=\"glyphicon glyphicon-cog ourpalm-table-pager\"\n                        (click)=\"table.openSetting()\"></button>\n            </span>\n            <span class=\"page-right\">\u663E\u793A{{table.start}}-{{table.end}}\u6761\u8BB0\u5F55,\u5171{{table.total}}\u6761\u8BB0\u5F55</span>\n\n            <div *ngIf=\"table?.openSettings\">\n                <ourpalm-table-settings [table]=\"table\"\n                                        [tableComponent]=\"tableComponent\"\n                                        [columns]=\"table.columns\">\n                </ourpalm-table-settings>\n            </div>\n        </td>\n    "
    })
], OurpalmTablePagingComponent);
exports.OurpalmTablePagingComponent = OurpalmTablePagingComponent;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var ourpalm_table_1 = __webpack_require__(1);
var ourpalm_table_component_1 = __webpack_require__(5);
var uuid_1 = __webpack_require__(3);
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
                                originColumn.__uuid__ = uuid_1.uuid();
                            }
                            distColumns.push(originColumn);
                        }
                        else {
                            var sortedOriginColumn = _this.getTableColumn(newColumn.field);
                            sortedOriginColumn.show = newColumn.show;
                            sortedOriginColumn.__uuid__ = uuid_1.uuid();
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
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_1.OurpalmTable)
], OurpalmTableSettingsComponent.prototype, "table", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", ourpalm_table_component_1.OurpalmTableComponent)
], OurpalmTableSettingsComponent.prototype, "tableComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], OurpalmTableSettingsComponent.prototype, "columns", void 0);
OurpalmTableSettingsComponent = __decorate([
    core_1.Component({
        selector: 'ourpalm-table-settings',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        styles: [__webpack_require__(47)],
        template: "\n        <div>\n            <div class=\"ourpalm-mask\"></div>\n            <div class=\"ourpalm-dialog\">\n                <div class=\"modal-content ourpalm-table-settings\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"close()\">\n                            <span aria-hidden=\"true\">&times;</span></button>\n                        <h4 class=\"modal-title\">\u81EA\u5B9A\u4E49\u5217\u8868\u9879</h4>\n                    </div>\n                    <div class=\"modal-body\">\n                        <div class=\"row\">\n                            <div class=\"col-md-5\">\n                                <span>\u5907\u9009\u5217</span>\n                                <div class=\"col-con\">\n                                    <input type=\"text\" placeholder=\"\u8F93\u5165\u503C...\" [(ngModel)]=\"lmodel\">\n                                    <ul>\n                                        <li *simpleNgFor=\"let col of lcolumns | lcolumnFilter:lmodel\">\n                                            <label>\n                                                <input type=\"checkbox\" [(ngModel)]=\"col.__lshow__\">\n                                                <span>{{col.header}}</span>\n                                            </label>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                            <div class=\"col-md-2\" style=\"padding:0px;margin:0px;text-align:center;\">\n                                <div style=\"margin-top:130px;margin-bottom:10px;\">\n                                    <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"showColumn()\">\n                                        <i class=\"glyphicon glyphicon-arrow-right\"></i>\n                                    </button>\n                                </div>\n                                <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"hideColumn()\">\n                                    <i class=\"glyphicon glyphicon-arrow-left\"></i>\n                                </button>\n                            </div>\n                            <div class=\"col-md-5\">\n                                <span>\u5DF2\u9009\u5217</span>\n                                <div class=\"col-con\">\n                                    <input type=\"text\" placeholder=\"\u8F93\u5165\u503C...\" [(ngModel)]=\"rmodel\">\n                                    <ul [dragula]=\"'setting-columns'\" [dragulaModel]=\"rcolumns\">\n                                        <li *simpleNgFor=\"let col of rcolumns | rcolumnFilter:rmodel; let i = index;\">\n                                            <label>\n                                                <input type=\"checkbox\" [(ngModel)]=\"col.__rshow__\">\n                                                <span>{{col.header}}</span>\n                                            </label>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <div class=\"btn-group btn-group-sm\" style=\"float:right;\">\n                                    <button type=\"button\" class=\"btn btn-default\" (click)=\"resetColumn()\">\u8FD8\u539F</button>\n                                    <button type=\"button\" class=\"btn btn-default\" (click)=\"saveColumn()\">\u4FDD\u5B58</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [core_1.NgZone])
], OurpalmTableSettingsComponent);
exports.OurpalmTableSettingsComponent = OurpalmTableSettingsComponent;
var ColumnSettingsLeftFilter = (function () {
    function ColumnSettingsLeftFilter() {
    }
    ColumnSettingsLeftFilter.prototype.transform = function (columns, name) {
        return !name ? columns : columns.filter(function (column) { return column.header.includes(name); });
    };
    return ColumnSettingsLeftFilter;
}());
ColumnSettingsLeftFilter = __decorate([
    core_1.Pipe({
        name: 'lcolumnFilter',
        pure: true
    }),
    core_1.Injectable()
], ColumnSettingsLeftFilter);
exports.ColumnSettingsLeftFilter = ColumnSettingsLeftFilter;
var ColumnSettingsRightFilter = (function () {
    function ColumnSettingsRightFilter() {
    }
    ColumnSettingsRightFilter.prototype.transform = function (columns, name) {
        return name ? columns.filter(function (column) { return column.header.includes(name); }) : columns;
    };
    return ColumnSettingsRightFilter;
}());
ColumnSettingsRightFilter = __decorate([
    core_1.Pipe({
        name: 'rcolumnFilter',
        pure: true
    }),
    core_1.Injectable()
], ColumnSettingsRightFilter);
exports.ColumnSettingsRightFilter = ColumnSettingsRightFilter;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var SimpleNgForRow = (function () {
    function SimpleNgForRow($implicit, index) {
        this.$implicit = $implicit;
        this.index = index;
    }
    Object.defineProperty(SimpleNgForRow.prototype, "even", {
        get: function () {
            return this.index % 2 === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleNgForRow.prototype, "odd", {
        get: function () {
            return !this.even;
        },
        enumerable: true,
        configurable: true
    });
    return SimpleNgForRow;
}());
exports.SimpleNgForRow = SimpleNgForRow;
var SimpleNgFor = (function () {
    function SimpleNgFor(_viewContainer, _template) {
        this._viewContainer = _viewContainer;
        this._template = _template;
    }
    Object.defineProperty(SimpleNgFor.prototype, "ngForTemplate", {
        set: function (value) {
            if (value) {
                this._template = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    SimpleNgFor.prototype.ngDoCheck = function () {
        var oldLen = this._viewContainer.length;
        var newLen = this.simpleNgForOf.length;
        var minLen = Math.min(oldLen, newLen);
        // update existing rows
        for (var i = 0; i < minLen; i++) {
            var row = this.simpleNgForOf[i];
            var viewRef = this._viewContainer.get(i);
            viewRef.context.$implicit = row;
        }
        // add missing rows
        for (var i = oldLen; i < newLen; i++) {
            var row = this.simpleNgForOf[i];
            this._viewContainer.createEmbeddedView(this._template, new SimpleNgForRow(row, i));
        }
        // remove superfluous rows
        for (var i = oldLen - 1; i >= newLen; i--) {
            this._viewContainer.remove(i);
        }
    };
    return SimpleNgFor;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SimpleNgFor.prototype, "simpleNgForOf", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef),
    __metadata("design:paramtypes", [core_1.TemplateRef])
], SimpleNgFor.prototype, "ngForTemplate", null);
SimpleNgFor = __decorate([
    core_1.Directive({
        selector: '[simpleNgFor][simpleNgForOf]'
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef, core_1.TemplateRef])
], SimpleNgFor);
exports.SimpleNgFor = SimpleNgFor;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ourpalm_table_module_1 = __webpack_require__(15);
exports.OurpalmTableModule = ourpalm_table_module_1.OurpalmTableModule;
var ourpalm_table_1 = __webpack_require__(1);
exports.OurpalmTable = ourpalm_table_1.OurpalmTable;
var table_config_1 = __webpack_require__(10);
exports.TableConfig = table_config_1.TableConfig;
var ourpalm_table_column_1 = __webpack_require__(6);
exports.OurpalmTableColumn = ourpalm_table_column_1.OurpalmTableColumn;
var safe_html_pipe_1 = __webpack_require__(9);
exports.SafeHtmlPipe = safe_html_pipe_1.SafeHtmlPipe;
var ourpalm_table_component_1 = __webpack_require__(5);
exports.OurpalmTableComponent = ourpalm_table_component_1.OurpalmTableComponent;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 右键弹出菜单配置
 */
var RowContextMenu = (function () {
    function RowContextMenu(menu) {
        /** 分割线 */
        this.separator = false;
        /** 是否显示 */
        this.show = true;
        Object.assign(this, menu);
    }
    return RowContextMenu;
}());
exports.RowContextMenu = RowContextMenu;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ticky = __webpack_require__(42);

module.exports = function debounce (fn, args, ctx) {
  if (!fn) { return; }
  ticky(function run () {
    fn.apply(ctx || null, args || []);
  });
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atoa = __webpack_require__(16);
var debounce = __webpack_require__(25);

module.exports = function emitter (thing, options) {
  var opts = options || {};
  var evt = {};
  if (thing === undefined) { thing = {}; }
  thing.on = function (type, fn) {
    if (!evt[type]) {
      evt[type] = [fn];
    } else {
      evt[type].push(fn);
    }
    return thing;
  };
  thing.once = function (type, fn) {
    fn._once = true; // thing.off(fn) still works!
    thing.on(type, fn);
    return thing;
  };
  thing.off = function (type, fn) {
    var c = arguments.length;
    if (c === 1) {
      delete evt[type];
    } else if (c === 0) {
      evt = {};
    } else {
      var et = evt[type];
      if (!et) { return thing; }
      et.splice(et.indexOf(fn), 1);
    }
    return thing;
  };
  thing.emit = function () {
    var args = atoa(arguments);
    return thing.emitterSnapshot(args.shift()).apply(this, args);
  };
  thing.emitterSnapshot = function (type) {
    var et = (evt[type] || []).slice(0);
    return function () {
      var args = atoa(arguments);
      var ctx = this || thing;
      if (type === 'error' && opts.throws !== false && !et.length) { throw args.length === 1 ? args[0] : args; }
      et.forEach(function emitter (listen) {
        if (opts.async) { debounce(listen, args, ctx); } else { listen.apply(ctx, args); }
        if (listen._once) { thing.off(type, listen); }
      });
      return thing;
    };
  };
  return thing;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
var NativeCustomEvent = global.CustomEvent;

function useNative () {
  try {
    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
    return  'cat' === p.type && 'bar' === p.detail.foo;
  } catch (e) {
  }
  return false;
}

/**
 * Cross-browser `CustomEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 *
 * @public
 */

module.exports = useNative() ? NativeCustomEvent :

// IE >= 9
'function' === typeof document.createEvent ? function CustomEvent (type, params) {
  var e = document.createEvent('CustomEvent');
  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, void 0);
  }
  return e;
} :

// IE <= 8
function CustomEvent (type, params) {
  var e = document.createEventObject();
  e.type = type;
  if (params) {
    e.bubbles = Boolean(params.bubbles);
    e.cancelable = Boolean(params.cancelable);
    e.detail = params.detail;
  } else {
    e.bubbles = false;
    e.cancelable = false;
    e.detail = void 0;
  }
  return e;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var customEvent = __webpack_require__(27);
var eventmap = __webpack_require__(29);
var doc = global.document;
var addEvent = addEventEasy;
var removeEvent = removeEventEasy;
var hardCache = [];

if (!global.addEventListener) {
  addEvent = addEventHard;
  removeEvent = removeEventHard;
}

module.exports = {
  add: addEvent,
  remove: removeEvent,
  fabricate: fabricateEvent
};

function addEventEasy (el, type, fn, capturing) {
  return el.addEventListener(type, fn, capturing);
}

function addEventHard (el, type, fn) {
  return el.attachEvent('on' + type, wrap(el, type, fn));
}

function removeEventEasy (el, type, fn, capturing) {
  return el.removeEventListener(type, fn, capturing);
}

function removeEventHard (el, type, fn) {
  var listener = unwrap(el, type, fn);
  if (listener) {
    return el.detachEvent('on' + type, listener);
  }
}

function fabricateEvent (el, type, model) {
  var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
  if (el.dispatchEvent) {
    el.dispatchEvent(e);
  } else {
    el.fireEvent('on' + type, e);
  }
  function makeClassicEvent () {
    var e;
    if (doc.createEvent) {
      e = doc.createEvent('Event');
      e.initEvent(type, true, true);
    } else if (doc.createEventObject) {
      e = doc.createEventObject();
    }
    return e;
  }
  function makeCustomEvent () {
    return new customEvent(type, { detail: model });
  }
}

function wrapperFactory (el, type, fn) {
  return function wrapper (originalEvent) {
    var e = originalEvent || global.event;
    e.target = e.target || e.srcElement;
    e.preventDefault = e.preventDefault || function preventDefault () { e.returnValue = false; };
    e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
    e.which = e.which || e.keyCode;
    fn.call(el, e);
  };
}

function wrap (el, type, fn) {
  var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
  hardCache.push({
    wrapper: wrapper,
    element: el,
    type: type,
    fn: fn
  });
  return wrapper;
}

function unwrap (el, type, fn) {
  var i = find(el, type, fn);
  if (i) {
    var wrapper = hardCache[i].wrapper;
    hardCache.splice(i, 1); // free up a tad of memory
    return wrapper;
  }
}

function find (el, type, fn) {
  var i, item;
  for (i = 0; i < hardCache.length; i++) {
    item = hardCache[i];
    if (item.element === el && item.type === type && item.fn === fn) {
      return i;
    }
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var eventmap = [];
var eventname = '';
var ron = /^on/;

for (eventname in global) {
  if (ron.test(eventname)) {
    eventmap.push(eventname.slice(2));
  }
}

module.exports = eventmap;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".fa-sort-asc {\r\n    vertical-align: bottom;\r\n}\r\n\r\n.fa-sort-desc {\r\n    vertical-align: top;\r\n}", ""]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "td span.page-left {\r\n    float: left;\r\n    text-align: left;\r\n    width: 68%;\r\n}\r\n\r\ntd span.page-left select {\r\n    height: 20px;\r\n    line-height: 20px;\r\n    padding: 0;\r\n    margin-top: -2px;\r\n    max-width: 50px;\r\n    display: inline-block;\r\n}\r\n\r\ntd span.page-right {\r\n    float: right;\r\n    text-align: right;\r\n}\r\n\r\n/*  ourpalm-table-pager */\r\n.ourpalm-table-pager {\r\n    padding: 2px 4px;\r\n    cursor: pointer;\r\n    border: none;\r\n    background-color: inherit;\r\n}\r\n\r\n.ourpalm-table-pager:enabled:hover {\r\n    /*opacity: 0.8;*/\r\n    transform: scale(1.2, 1.2);\r\n}\r\n\r\n.ourpalm-table-pager:disabled {\r\n    opacity: 0.5;\r\n    cursor: default;\r\n}\r\n\r\ninput[type=number] {\r\n    text-align: center;\r\n    height: 20px;\r\n    line-height: 20px;\r\n    padding: 0;\r\n    margin-top: -2px;\r\n    width: auto;\r\n    max-width: 62px;\r\n    min-width: 30px;\r\n    display: inline-block;\r\n}", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "tr.row-selected {\r\n    background-color: #ffdfff !important;\r\n    /*background-color: #e4e3e3 !important;*/\r\n}", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".ourpalm-mask {\r\n    position: fixed;\r\n    width: 100%;\r\n    height: 800%;\r\n    top: 0px;\r\n    left: 0px;\r\n    background-color: #000000;\r\n    opacity: 0.3;\r\n    z-index: 2000;\r\n}\r\n\r\n.ourpalm-dialog {\r\n    position: fixed;\r\n    /*width: 30%;*/\r\n    /*height: 30%;*/\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    z-index: 2001;\r\n}\r\n\r\n.ourpalm-table-settings {\r\n    max-width: 800px !important;\r\n    min-width: 600px !important;\r\n}\r\n\r\n.ourpalm-table-settings .modal-body {\r\n    text-align: left;\r\n}\r\n\r\n.ourpalm-table-settings .checkbox-inline {\r\n    width: 25%;\r\n    white-space: nowrap; /* 不换行 */\r\n    overflow: hidden;\r\n}\r\n\r\n.ourpalm-table-settings .checkbox-inline + .checkbox-inline {\r\n    margin-left: 0px;\r\n}\r\n\r\n.col-con {\r\n    border: 1px solid #bbb;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.col-con [type=text] {\r\n    width: 100%;\r\n    border: none;\r\n    padding-top: 2px;\r\n    padding-left: 10px;\r\n    border-bottom: 1px solid #aaa;\r\n}\r\n\r\n.ourpalm-table-settings ul {\r\n    list-style: none;\r\n    height: 300px;\r\n    overflow-y: auto;\r\n    padding: 0px;\r\n}\r\n\r\n.ourpalm-table-settings ul li {\r\n    list-style: none !important;\r\n    padding: 6px 10px;\r\n}\r\n\r\n.ourpalm-table-settings ul li:hover {\r\n    background-color: antiquewhite;\r\n}\r\n\r\n.ourpalm-table-settings ul li label {\r\n    margin-bottom: 0;\r\n    font-weight: normal;\r\n}\r\n\r\n.ourpalm-table-settings ul li label span {\r\n    width: 160px;\r\n    display: inline-block;\r\n}\r\n\r\nli.gu-transit {\r\n    list-style: none !important;\r\n    background-color: antiquewhite;\r\n    opacity: 0.7;\r\n    border: 1px dashed #aaaaaa;\r\n}\r\n\r\n.gu-mirror {\r\n    position: fixed !important;\r\n    list-style: none !important;\r\n    margin: 0 !important;\r\n    z-index: 9999 !important;\r\n    opacity: 0.8;\r\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)\";\r\n    filter: alpha(opacity=80);\r\n}\r\n\r\n.gu-hide {\r\n    display: none !important;\r\n}\r\n\r\n.gu-unselectable {\r\n    -webkit-user-select: none !important;\r\n    -moz-user-select: none !important;\r\n    -ms-user-select: none !important;\r\n    user-select: none !important;\r\n}", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".ourpalm-table-pageing {\r\n    background-color: #f9f9f9 !important;\r\n}\r\n\r\ntable {\r\n    margin-bottom: 0px;\r\n}\r\n\r\nthead tr {\r\n    background-color: #eceaea;\r\n}\r\n\r\ntable /deep/ tr td, table /deep/ tr th {\r\n    max-width: 400px !important;\r\n    word-break: keep-all; /* 不换行 */\r\n    white-space: nowrap; /* 不换行 */\r\n    overflow: hidden;\r\n    text-overflow: ellipsis; /*省略号*/\r\n}", ""]);

// exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/** 多级菜单样式开始 */\r\n.dropdown-submenu {\r\n    position: relative;\r\n}\r\n\r\n.dropdown-submenu > .dropdown-menu {\r\n    top: 0;\r\n    left: 100%;\r\n    margin-top: -6px;\r\n    margin-left: -1px;\r\n    -webkit-border-radius: 0 6px 6px 6px;\r\n    -moz-border-radius: 0 6px 6px;\r\n    border-radius: 0 6px 6px 6px;\r\n}\r\n\r\n.dropdown-submenu:hover > .dropdown-menu {\r\n    display: block;\r\n}\r\n\r\n.dropdown-submenu > a:after {\r\n    display: block;\r\n    content: \" \";\r\n    float: right;\r\n    width: 0;\r\n    height: 0;\r\n    border-color: transparent;\r\n    border-style: solid;\r\n    border-width: 5px 0 5px 5px;\r\n    border-left-color: #ccc;\r\n    margin-top: 5px;\r\n    margin-right: -10px;\r\n}\r\n\r\n.dropdown-submenu:hover > a:after {\r\n    border-left-color: #fff;\r\n}\r\n\r\n.dropdown-submenu.pull-left {\r\n    float: none;\r\n}\r\n\r\n.dropdown-submenu.pull-left > .dropdown-menu {\r\n    left: -100%;\r\n    margin-left: 10px;\r\n    -webkit-border-radius: 6px 0 6px 6px;\r\n    -moz-border-radius: 6px 0 6px 6px;\r\n    border-radius: 6px 0 6px 6px;\r\n}\r\n\r\n.dropdown-menu > li > a {\r\n    padding: 3px 20px 3px 10px;\r\n}\r\n/** 多级菜单样式 结束 */\r\n\r\n\r\n.row-context-menu {\r\n    display: none;\r\n}\r\n\r\n.row-context-menu > .dropdown-menu {\r\n    display: block;\r\n}\r\n\r\n.row-context-menu .empty-icon {\r\n    display: inline-block;\r\n    width: 23px;\r\n}\r\n\r\n\r\n", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cache = {};
var start = '(?:^|\\s)';
var end = '(?:\\s|$)';

function lookupClass (className) {
  var cached = cache[className];
  if (cached) {
    cached.lastIndex = 0;
  } else {
    cache[className] = cached = new RegExp(start + className + end, 'g');
  }
  return cached;
}

function addClass (el, className) {
  var current = el.className;
  if (!current.length) {
    el.className = className;
  } else if (!lookupClass(className).test(current)) {
    el.className += ' ' + className;
  }
}

function rmClass (el, className) {
  el.className = el.className.replace(lookupClass(className), ' ').trim();
}

module.exports = {
  add: addClass,
  rm: rmClass
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var emitter = __webpack_require__(26);
var crossvent = __webpack_require__(28);
var classes = __webpack_require__(36);
var doc = document;
var documentElement = doc.documentElement;

function dragula (initialContainers, options) {
  var len = arguments.length;
  if (len === 1 && Array.isArray(initialContainers) === false) {
    options = initialContainers;
    initialContainers = [];
  }
  var _mirror; // mirror image
  var _source; // source container
  var _item; // item being dragged
  var _offsetX; // reference x
  var _offsetY; // reference y
  var _moveX; // reference move x
  var _moveY; // reference move y
  var _initialSibling; // reference sibling when grabbed
  var _currentSibling; // reference sibling now
  var _copy; // item used for copying
  var _renderTimer; // timer for setTimeout renderMirrorImage
  var _lastDropTarget = null; // last container item was over
  var _grabbed; // holds mousedown context until first mousemove

  var o = options || {};
  if (o.moves === void 0) { o.moves = always; }
  if (o.accepts === void 0) { o.accepts = always; }
  if (o.invalid === void 0) { o.invalid = invalidTarget; }
  if (o.containers === void 0) { o.containers = initialContainers || []; }
  if (o.isContainer === void 0) { o.isContainer = never; }
  if (o.copy === void 0) { o.copy = false; }
  if (o.copySortSource === void 0) { o.copySortSource = false; }
  if (o.revertOnSpill === void 0) { o.revertOnSpill = false; }
  if (o.removeOnSpill === void 0) { o.removeOnSpill = false; }
  if (o.direction === void 0) { o.direction = 'vertical'; }
  if (o.ignoreInputTextSelection === void 0) { o.ignoreInputTextSelection = true; }
  if (o.mirrorContainer === void 0) { o.mirrorContainer = doc.body; }

  var drake = emitter({
    containers: o.containers,
    start: manualStart,
    end: end,
    cancel: cancel,
    remove: remove,
    destroy: destroy,
    canMove: canMove,
    dragging: false
  });

  if (o.removeOnSpill === true) {
    drake.on('over', spillOver).on('out', spillOut);
  }

  events();

  return drake;

  function isContainer (el) {
    return drake.containers.indexOf(el) !== -1 || o.isContainer(el);
  }

  function events (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousedown', grab);
    touchy(documentElement, op, 'mouseup', release);
  }

  function eventualMovements (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousemove', startBecauseMouseMoved);
  }

  function movements (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](documentElement, 'selectstart', preventGrabbed); // IE8
    crossvent[op](documentElement, 'click', preventGrabbed);
  }

  function destroy () {
    events(true);
    release({});
  }

  function preventGrabbed (e) {
    if (_grabbed) {
      e.preventDefault();
    }
  }

  function grab (e) {
    _moveX = e.clientX;
    _moveY = e.clientY;

    var ignore = whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey;
    if (ignore) {
      return; // we only care about honest-to-god left clicks and touch events
    }
    var item = e.target;
    var context = canStart(item);
    if (!context) {
      return;
    }
    _grabbed = context;
    eventualMovements();
    if (e.type === 'mousedown') {
      if (isInput(item)) { // see also: https://github.com/bevacqua/dragula/issues/208
        item.focus(); // fixes https://github.com/bevacqua/dragula/issues/176
      } else {
        e.preventDefault(); // fixes https://github.com/bevacqua/dragula/issues/155
      }
    }
  }

  function startBecauseMouseMoved (e) {
    if (!_grabbed) {
      return;
    }
    if (whichMouseButton(e) === 0) {
      release({});
      return; // when text is selected on an input and then dragged, mouseup doesn't fire. this is our only hope
    }
    // truthy check fixes #239, equality fixes #207
    if (e.clientX !== void 0 && e.clientX === _moveX && e.clientY !== void 0 && e.clientY === _moveY) {
      return;
    }
    if (o.ignoreInputTextSelection) {
      var clientX = getCoord('clientX', e);
      var clientY = getCoord('clientY', e);
      var elementBehindCursor = doc.elementFromPoint(clientX, clientY);
      if (isInput(elementBehindCursor)) {
        return;
      }
    }

    var grabbed = _grabbed; // call to end() unsets _grabbed
    eventualMovements(true);
    movements();
    end();
    start(grabbed);

    var offset = getOffset(_item);
    _offsetX = getCoord('pageX', e) - offset.left;
    _offsetY = getCoord('pageY', e) - offset.top;

    classes.add(_copy || _item, 'gu-transit');
    renderMirrorImage();
    drag(e);
  }

  function canStart (item) {
    if (drake.dragging && _mirror) {
      return;
    }
    if (isContainer(item)) {
      return; // don't drag container itself
    }
    var handle = item;
    while (getParent(item) && isContainer(getParent(item)) === false) {
      if (o.invalid(item, handle)) {
        return;
      }
      item = getParent(item); // drag target should be a top element
      if (!item) {
        return;
      }
    }
    var source = getParent(item);
    if (!source) {
      return;
    }
    if (o.invalid(item, handle)) {
      return;
    }

    var movable = o.moves(item, source, handle, nextEl(item));
    if (!movable) {
      return;
    }

    return {
      item: item,
      source: source
    };
  }

  function canMove (item) {
    return !!canStart(item);
  }

  function manualStart (item) {
    var context = canStart(item);
    if (context) {
      start(context);
    }
  }

  function start (context) {
    if (isCopy(context.item, context.source)) {
      _copy = context.item.cloneNode(true);
      drake.emit('cloned', _copy, context.item, 'copy');
    }

    _source = context.source;
    _item = context.item;
    _initialSibling = _currentSibling = nextEl(context.item);

    drake.dragging = true;
    drake.emit('drag', _item, _source);
  }

  function invalidTarget () {
    return false;
  }

  function end () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    drop(item, getParent(item));
  }

  function ungrab () {
    _grabbed = false;
    eventualMovements(true);
    movements(true);
  }

  function release (e) {
    ungrab();

    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    if (dropTarget && ((_copy && o.copySortSource) || (!_copy || dropTarget !== _source))) {
      drop(item, dropTarget);
    } else if (o.removeOnSpill) {
      remove();
    } else {
      cancel();
    }
  }

  function drop (item, target) {
    var parent = getParent(item);
    if (_copy && o.copySortSource && target === _source) {
      parent.removeChild(_item);
    }
    if (isInitialPlacement(target)) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, target, _source, _currentSibling);
    }
    cleanup();
  }

  function remove () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var parent = getParent(item);
    if (parent) {
      parent.removeChild(item);
    }
    drake.emit(_copy ? 'cancel' : 'remove', item, parent, _source);
    cleanup();
  }

  function cancel (revert) {
    if (!drake.dragging) {
      return;
    }
    var reverts = arguments.length > 0 ? revert : o.revertOnSpill;
    var item = _copy || _item;
    var parent = getParent(item);
    var initial = isInitialPlacement(parent);
    if (initial === false && reverts) {
      if (_copy) {
        if (parent) {
          parent.removeChild(_copy);
        }
      } else {
        _source.insertBefore(item, _initialSibling);
      }
    }
    if (initial || reverts) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, parent, _source, _currentSibling);
    }
    cleanup();
  }

  function cleanup () {
    var item = _copy || _item;
    ungrab();
    removeMirrorImage();
    if (item) {
      classes.rm(item, 'gu-transit');
    }
    if (_renderTimer) {
      clearTimeout(_renderTimer);
    }
    drake.dragging = false;
    if (_lastDropTarget) {
      drake.emit('out', item, _lastDropTarget, _source);
    }
    drake.emit('dragend', item);
    _source = _item = _copy = _initialSibling = _currentSibling = _renderTimer = _lastDropTarget = null;
  }

  function isInitialPlacement (target, s) {
    var sibling;
    if (s !== void 0) {
      sibling = s;
    } else if (_mirror) {
      sibling = _currentSibling;
    } else {
      sibling = nextEl(_copy || _item);
    }
    return target === _source && sibling === _initialSibling;
  }

  function findDropTarget (elementBehindCursor, clientX, clientY) {
    var target = elementBehindCursor;
    while (target && !accepted()) {
      target = getParent(target);
    }
    return target;

    function accepted () {
      var droppable = isContainer(target);
      if (droppable === false) {
        return false;
      }

      var immediate = getImmediateChild(target, elementBehindCursor);
      var reference = getReference(target, immediate, clientX, clientY);
      var initial = isInitialPlacement(target, reference);
      if (initial) {
        return true; // should always be able to drop it right back where it was
      }
      return o.accepts(_item, target, _source, reference);
    }
  }

  function drag (e) {
    if (!_mirror) {
      return;
    }
    e.preventDefault();

    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var x = clientX - _offsetX;
    var y = clientY - _offsetY;

    _mirror.style.left = x + 'px';
    _mirror.style.top = y + 'px';

    var item = _copy || _item;
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    var changed = dropTarget !== null && dropTarget !== _lastDropTarget;
    if (changed || dropTarget === null) {
      out();
      _lastDropTarget = dropTarget;
      over();
    }
    var parent = getParent(item);
    if (dropTarget === _source && _copy && !o.copySortSource) {
      if (parent) {
        parent.removeChild(item);
      }
      return;
    }
    var reference;
    var immediate = getImmediateChild(dropTarget, elementBehindCursor);
    if (immediate !== null) {
      reference = getReference(dropTarget, immediate, clientX, clientY);
    } else if (o.revertOnSpill === true && !_copy) {
      reference = _initialSibling;
      dropTarget = _source;
    } else {
      if (_copy && parent) {
        parent.removeChild(item);
      }
      return;
    }
    if (
      (reference === null && changed) ||
      reference !== item &&
      reference !== nextEl(item)
    ) {
      _currentSibling = reference;
      dropTarget.insertBefore(item, reference);
      drake.emit('shadow', item, dropTarget, _source);
    }
    function moved (type) { drake.emit(type, item, _lastDropTarget, _source); }
    function over () { if (changed) { moved('over'); } }
    function out () { if (_lastDropTarget) { moved('out'); } }
  }

  function spillOver (el) {
    classes.rm(el, 'gu-hide');
  }

  function spillOut (el) {
    if (drake.dragging) { classes.add(el, 'gu-hide'); }
  }

  function renderMirrorImage () {
    if (_mirror) {
      return;
    }
    var rect = _item.getBoundingClientRect();
    _mirror = _item.cloneNode(true);
    _mirror.style.width = getRectWidth(rect) + 'px';
    _mirror.style.height = getRectHeight(rect) + 'px';
    classes.rm(_mirror, 'gu-transit');
    classes.add(_mirror, 'gu-mirror');
    o.mirrorContainer.appendChild(_mirror);
    touchy(documentElement, 'add', 'mousemove', drag);
    classes.add(o.mirrorContainer, 'gu-unselectable');
    drake.emit('cloned', _mirror, _item, 'mirror');
  }

  function removeMirrorImage () {
    if (_mirror) {
      classes.rm(o.mirrorContainer, 'gu-unselectable');
      touchy(documentElement, 'remove', 'mousemove', drag);
      getParent(_mirror).removeChild(_mirror);
      _mirror = null;
    }
  }

  function getImmediateChild (dropTarget, target) {
    var immediate = target;
    while (immediate !== dropTarget && getParent(immediate) !== dropTarget) {
      immediate = getParent(immediate);
    }
    if (immediate === documentElement) {
      return null;
    }
    return immediate;
  }

  function getReference (dropTarget, target, x, y) {
    var horizontal = o.direction === 'horizontal';
    var reference = target !== dropTarget ? inside() : outside();
    return reference;

    function outside () { // slower, but able to figure out any position
      var len = dropTarget.children.length;
      var i;
      var el;
      var rect;
      for (i = 0; i < len; i++) {
        el = dropTarget.children[i];
        rect = el.getBoundingClientRect();
        if (horizontal && (rect.left + rect.width / 2) > x) { return el; }
        if (!horizontal && (rect.top + rect.height / 2) > y) { return el; }
      }
      return null;
    }

    function inside () { // faster, but only available if dropped inside a child element
      var rect = target.getBoundingClientRect();
      if (horizontal) {
        return resolve(x > rect.left + getRectWidth(rect) / 2);
      }
      return resolve(y > rect.top + getRectHeight(rect) / 2);
    }

    function resolve (after) {
      return after ? nextEl(target) : target;
    }
  }

  function isCopy (item, container) {
    return typeof o.copy === 'boolean' ? o.copy : o.copy(item, container);
  }
}

function touchy (el, op, type, fn) {
  var touch = {
    mouseup: 'touchend',
    mousedown: 'touchstart',
    mousemove: 'touchmove'
  };
  var pointers = {
    mouseup: 'pointerup',
    mousedown: 'pointerdown',
    mousemove: 'pointermove'
  };
  var microsoft = {
    mouseup: 'MSPointerUp',
    mousedown: 'MSPointerDown',
    mousemove: 'MSPointerMove'
  };
  if (global.navigator.pointerEnabled) {
    crossvent[op](el, pointers[type], fn);
  } else if (global.navigator.msPointerEnabled) {
    crossvent[op](el, microsoft[type], fn);
  } else {
    crossvent[op](el, touch[type], fn);
    crossvent[op](el, type, fn);
  }
}

function whichMouseButton (e) {
  if (e.touches !== void 0) { return e.touches.length; }
  if (e.which !== void 0 && e.which !== 0) { return e.which; } // see https://github.com/bevacqua/dragula/issues/261
  if (e.buttons !== void 0) { return e.buttons; }
  var button = e.button;
  if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
    return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0);
  }
}

function getOffset (el) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
    top: rect.top + getScroll('scrollTop', 'pageYOffset')
  };
}

function getScroll (scrollProp, offsetProp) {
  if (typeof global[offsetProp] !== 'undefined') {
    return global[offsetProp];
  }
  if (documentElement.clientHeight) {
    return documentElement[scrollProp];
  }
  return doc.body[scrollProp];
}

function getElementBehindPoint (point, x, y) {
  var p = point || {};
  var state = p.className;
  var el;
  p.className += ' gu-hide';
  el = doc.elementFromPoint(x, y);
  p.className = state;
  return el;
}

function never () { return false; }
function always () { return true; }
function getRectWidth (rect) { return rect.width || (rect.right - rect.left); }
function getRectHeight (rect) { return rect.height || (rect.bottom - rect.top); }
function getParent (el) { return el.parentNode === doc ? null : el.parentNode; }
function isInput (el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || isEditable(el); }
function isEditable (el) {
  if (!el) { return false; } // no parents were editable
  if (el.contentEditable === 'false') { return false; } // stop the lookup
  if (el.contentEditable === 'true') { return true; } // found a contentEditable element in the chain
  return isEditable(getParent(el)); // contentEditable is set to 'inherit'
}

function nextEl (el) {
  return el.nextElementSibling || manually();
  function manually () {
    var sibling = el;
    do {
      sibling = sibling.nextSibling;
    } while (sibling && sibling.nodeType !== 1);
    return sibling;
  }
}

function getEventHost (e) {
  // on touchend event, we have to use `e.changedTouches`
  // see http://stackoverflow.com/questions/7192563/touchend-event-properties
  // see https://github.com/bevacqua/dragula/issues/34
  if (e.targetTouches && e.targetTouches.length) {
    return e.targetTouches[0];
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0];
  }
  return e;
}

function getCoord (coord, e) {
  var host = getEventHost(e);
  var missMap = {
    pageX: 'clientX', // IE8
    pageY: 'clientY' // IE8
  };
  if (coord in missMap && !(coord in host) && missMap[coord] in host) {
    coord = missMap[coord];
  }
  return host[coord];
}

module.exports = dragula;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = __webpack_require__(0);
var dragula_directive_1 = __webpack_require__(14);
var dragula_provider_1 = __webpack_require__(8);
var DragulaModule = (function () {
    function DragulaModule() {
    }
    return DragulaModule;
}());
DragulaModule = __decorate([
    core_1.NgModule({
        exports: [dragula_directive_1.DragulaDirective],
        declarations: [dragula_directive_1.DragulaDirective],
        providers: [dragula_provider_1.DragulaService]
    })
], DragulaModule);
exports.DragulaModule = DragulaModule;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dragula_class_1 = __webpack_require__(7);
exports.dragula = dragula_class_1.dragula;
var dragula_directive_1 = __webpack_require__(14);
exports.DragulaDirective = dragula_directive_1.DragulaDirective;
var dragula_provider_1 = __webpack_require__(8);
exports.DragulaService = dragula_provider_1.DragulaService;
var dragular_module_1 = __webpack_require__(38);
exports.DragulaModule = dragular_module_1.DragulaModule;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(40)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {var si = typeof setImmediate === 'function', tick;
if (si) {
  tick = function (fn) { setImmediate(fn); };
} else {
  tick = function (fn) { setTimeout(fn, 0); };
}

module.exports = tick;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43).setImmediate))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(41);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(30);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(31);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(32);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(33);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(34);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(35);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_50__;

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_51__;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_52__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.umd.js.map