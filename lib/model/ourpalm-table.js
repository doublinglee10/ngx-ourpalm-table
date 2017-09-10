import { OurpalmTableColumn } from "./ourpalm-table-column";
var OurpalmTable = (function () {
    function OurpalmTable(table) {
        this.__columns = [];
        this.tableClass = 'table table-bordered table-striped table-hover text-center';
        this.autoLoadData = true;
        this.columns = [];
        this.pagination = true;
        this.singleSelect = false;
        this.serverSort = true;
        this.pageList = [10, 20, 30, 40, 50];
        this.skipPage = true;
        this.cacheKey = '';
        this.cachePageSize = false;
        this.cacheColumns = false;
        this.pagePosition = 'bottom';
        this.showRefreshBtn = true;
        this.showSettingBtn = true;
        this.enabledFloatThead = false;
        this.floatTheadConfig = {
            zIndex: 10,
            responsiveContainer: function ($table) {
                return $table.closest('.table-responsive');
            }
        };
        this.checkOnSelect = true;
        this.selectOnCheck = true;
        this.ctrlSelect = false;
        this.loadData = function () {
            return null;
        };
        this.trackByFun = function (rowIndex, rowData) { return rowIndex; };
        this.openSettings = false;
        this.total = 0;
        this.rows = [];
        this.currentPage = 1;
        this.pageSize = 10;
        Object.assign(this, table);
        this.columns = this.columns.map(function (column) { return new OurpalmTableColumn(column); });
        this.__columns = this.columns.map(function (column) { return new OurpalmTableColumn(column); });
        this.reloadCacheColumns();
        this.reloadCachePageSize();
        this.reflowTable();
    }
    OurpalmTable.prototype.reflowTable = function () {
        this.tableComponent && this.tableComponent.reflowTable();
    };
    OurpalmTable.prototype.onLoadSuccess = function (page) {
        this.pageSize = page.pageSize || this.pageSize;
        this.total = page.total;
        this.rows = page.rows;
        this.currentPage = page.currentPage || this.currentPage;
        this.tmpCurrentPage = this.allPage > 0 ? (page.currentPage || this.currentPage) : 0;
        this.reflowTable();
    };
    Object.defineProperty(OurpalmTable.prototype, "allPage", {
        get: function () {
            return Math.max(Math.ceil(this.total / this.pageSize), 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OurpalmTable.prototype, "start", {
        get: function () {
            if (this.allPage > 0)
                return (this.currentPage - 1) * this.pageSize + 1;
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OurpalmTable.prototype, "end", {
        get: function () {
            if (this.allPage > 0)
                return this.start + this.rows.length - 1;
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    OurpalmTable.prototype.getDisplayedColumns = function () {
        var columns = [];
        this.columns.forEach(function (column) {
            column.show && columns.push(Object.assign({}, column));
        });
        return columns;
    };
    OurpalmTable.prototype.getDisplayedRows = function () {
        return this.rows.map(function (row) { return Object.assign({}, row); });
    };
    OurpalmTable.prototype.getSelectedRows = function () {
        return this.rows.filter(function (row) { return row.__selected__; }).map(function (row) { return Object.assign({}, row); });
    };
    OurpalmTable.prototype.getCheckedRows = function () {
        return this.rows.filter(function (row) { return row.__checked__; }).map(function (row) { return Object.assign({}, row); });
    };
    OurpalmTable.prototype.getSortColumns = function () {
        return this.columns.filter(function (column) { return column.sort; }).map(function (col) { return Object.assign({}, col); });
    };
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
    OurpalmTable.prototype.changeColumns = function (columns) {
        this.columns = columns.map(function (column) { return new OurpalmTableColumn(column); });
        this.__columns = columns.map(function (column) { return new OurpalmTableColumn(column); });
        this.reloadCacheColumns();
        this.reloadCachePageSize();
        this.reflowTable();
    };
    OurpalmTable.prototype.firstPage = function () {
        this.currentPage = 1;
        this.invokeLoadData();
    };
    OurpalmTable.prototype.prePage = function () {
        this.currentPage--;
        this.invokeLoadData();
    };
    OurpalmTable.prototype.nextPage = function () {
        this.currentPage++;
        this.invokeLoadData();
    };
    OurpalmTable.prototype.lastPage = function () {
        this.currentPage = this.allPage;
        this.invokeLoadData();
    };
    OurpalmTable.prototype.refresh = function () {
        this.invokeLoadData();
    };
    OurpalmTable.prototype.changePageSize = function (pageSize) {
        this.currentPage = 1;
        this.pageSize = pageSize;
        this.invokeLoadData();
    };
    OurpalmTable.prototype.gotoSkipPage = function (page) {
        this.currentPage = page;
        this.invokeLoadData();
    };
    OurpalmTable.prototype.setPageData = function (page) {
        this.onLoadSuccess(page);
    };
    OurpalmTable.prototype.setOptions = function (table) {
        Object.assign(this, table);
        this.columns = this.columns.map(function (column) { return new OurpalmTableColumn(column); });
        this.__columns = this.columns.map(function (column) { return new OurpalmTableColumn(column); });
        if (this.autoLoadData) {
            this.invokeLoadData();
        }
        this.reloadCacheColumns();
        this.reloadCachePageSize();
        this.reflowTable();
    };
    OurpalmTable.prototype.checkAll = function () {
        this.rows.forEach(function (row) {
            row.__checked__ = true;
        });
    };
    OurpalmTable.prototype.uncheckAll = function () {
        this.rows.forEach(function (row) {
            row.__checked__ = false;
        });
    };
    OurpalmTable.prototype.checkRow = function (index) {
        var row = this.rows[index];
        if (row) {
            row.__checked__ = true;
        }
    };
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
export { OurpalmTable };
//# sourceMappingURL=ourpalm-table.js.map