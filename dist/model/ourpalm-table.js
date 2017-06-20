"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ourpalm_table_column_1 = require("./ourpalm-table-column");
/**
 * 表属性
 */
var OurpalmTable = (function () {
    function OurpalmTable(optable) {
        if (optable === void 0) { optable = {}; }
        /** 用户配置的原始的列信息 */
        this.__columns = [];
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
        /** 在设置分页属性的时候初始化页面大小 */
        this.defaultPageSize = 10;
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
        /** 加载数据成功回调 */
        this.loadData = function () {
            return null;
        };
        /** 用户点击一行的时候触发 */
        this.onClickRow = function () {
            return null;
        };
        /** 用户双击一行的时候触发 */
        this.onDbClickRow = function () {
            return null;
        };
        /** 用户点击单元格的时候触发 */
        this.onClickCell = function () {
            return null;
        };
        /** 用户双击单元格的时候触发 */
        this.onDbClickCell = function () {
            return null;
        };
        /** 是否打开自定义列表项 */
        this.openSettings = false;
        /** 分页信息 */
        this.start = 0; //开始位置
        this.end = 0; //结束位置
        this.total = 0; //总共记录数
        this.rows = []; //当前页数据
        this.currentPage = 1; //当前第几页
        this.pageSize = 10; //当前页大小
        this.allPage = 0; //总共多少页
        this.changeOptions(optable);
    }
    OurpalmTable.prototype.onLoadSuccess = function (page) {
        this.pageSize = page.pageSize || this.pageSize;
        this.defaultPageSize = this.pageSize;
        this.currentPage = page.currentPage || this.currentPage;
        this.total = page.total;
        this.rows = page.rows;
        this.allPage = this.total % this.pageSize == 0 ? this.total / this.pageSize : (Math.floor(this.total / this.pageSize) + 1);
        this.start = (this.currentPage - 1) * this.pageSize + 1;
        this.end = this.start + this.rows.length - 1;
        this.__tmpCurrentPage = this.currentPage;
    };
    /*获取显示的列信息*/
    OurpalmTable.prototype.getDisplayedColumns = function () {
        var columns = [];
        this.columns.forEach(function (column) {
            if (column.show) {
                columns.push(Object.assign({}));
            }
        });
        return columns;
    };
    /*获取显示的行信息*/
    OurpalmTable.prototype.getDisplayedRows = function () {
        return this.rows.map(function (row) { return Object.assign({}, row); });
    };
    /*获取选中的行信息*/
    OurpalmTable.prototype.getSelectedRows = function () {
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
            defaultPageSize: this.defaultPageSize,
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
    OurpalmTable.prototype.setOptions = function (optable) {
        this.changeOptions(optable);
        if (this.autoLoadData) {
            this.invokeLoadData();
        }
    };
    OurpalmTable.prototype.changeOptions = function (optable) {
        var table = Object.assign({}, {
            autoLoadData: this.autoLoadData,
            columns: this.columns,
            pagination: this.pagination,
            singleSelect: this.singleSelect,
            serverSort: this.serverSort,
            pageList: this.pageList,
            defaultPageSize: this.defaultPageSize,
            skipPage: this.skipPage,
            cacheKey: this.cacheKey,
            cachePageSize: this.cachePageSize,
            cacheColumns: this.cacheColumns,
            pagePosition: this.pagePosition,
            loadData: this.loadData,
            onClickRow: this.onClickRow,
            onDbClickRow: this.onDbClickRow,
            onClickCell: this.onClickCell,
            onDbClickCell: this.onDbClickCell,
            currentPage: this.currentPage
        }, optable);
        this.autoLoadData = table.autoLoadData;
        this.columns = table.columns.map(function (column) { return new ourpalm_table_column_1.OurpalmTableColumn(column); });
        this.__columns = table.columns.map(function (column) { return new ourpalm_table_column_1.OurpalmTableColumn(column); });
        this.pagination = table.pagination;
        this.singleSelect = table.singleSelect;
        this.serverSort = table.serverSort;
        this.pageList = table.pageList;
        this.pageSize = table.defaultPageSize;
        this.defaultPageSize = table.defaultPageSize;
        this.skipPage = table.skipPage;
        this.cacheKey = table.cacheKey;
        this.cachePageSize = table.cachePageSize;
        this.cacheColumns = table.cacheColumns;
        this.pagePosition = table.pagePosition;
        this.loadData = table.loadData;
        this.onClickRow = table.onClickRow;
        this.onDbClickRow = table.onDbClickRow;
        this.onClickCell = table.onClickCell;
        this.onDbClickCell = table.onDbClickCell;
        this.currentPage = table.currentPage;
    };
    OurpalmTable.prototype.invokeLoadData = function () {
        this.loadData(this, this.onLoadSuccess.bind(this));
    };
    return OurpalmTable;
}());
exports.OurpalmTable = OurpalmTable;
//# sourceMappingURL=ourpalm-table.js.map