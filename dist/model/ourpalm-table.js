"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ourpalm_table_column_1 = require("./ourpalm-table-column");
/**
 * 表属性
 */
var OurpalmTable = (function () {
    function OurpalmTable(optable) {
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
        // this = table;
        var table = Object.assign({}, {
            columns: [],
            pagination: true,
            singleSelect: false,
            serverSort: true,
            pageList: [10, 20, 30, 40, 50],
            defaultPageSize: 10,
            skipPage: true,
            cacheKey: '',
            cachePageSize: false,
            cacheColumns: false,
            pagePosition: 'bottom',
            loadData: function (table, callback) {
            }
        }, optable);
        this.columns = table.columns.map(function (column) { return new ourpalm_table_column_1.OurpalmTableColumn(column); });
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
    }
    OurpalmTable.prototype.onLoadSuccess = function (page) {
        this.total = page.total;
        this.rows = page.rows;
        this.allPage = this.total % this.pageSize == 0 ? this.total / this.pageSize : (Math.floor(this.total / this.pageSize) + 1);
        this.start = (this.currentPage - 1) * this.pageSize + 1;
        this.end = this.start + this.rows.length;
        this.__tmpCurrentPage = this.currentPage;
    };
    //获取显示的列信息
    OurpalmTable.prototype.getDisplayedColumns = function () {
        var columns = [];
        this.columns.forEach(function (column) {
            if (column.show) {
                columns.push(Object.assign({}, column));
            }
        });
        return columns;
    };
    //获取显示的行信息
    OurpalmTable.prototype.getDisplayedRows = function () {
        return this.rows.map(function (row) { return Object.assign({}, row); });
    };
    //获取选中的行信息
    OurpalmTable.prototype.getSelectedRows = function () {
        return this.rows.filter(function (row) { return row.__checked__; }).map(function (row) { return Object.assign({}, row); });
    };
    //获取排序的列信息
    OurpalmTable.prototype.getSortColumns = function () {
    };
    //获取表格的实时信息
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
    //修改列定义,支持动态列
    OurpalmTable.prototype.changeColumns = function (columns) {
        this.columns = columns.map(function (column) { return new ourpalm_table_column_1.OurpalmTableColumn(column); });
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
    OurpalmTable.prototype.invokeLoadData = function () {
        this.loadData(this, this.onLoadSuccess.bind(this));
    };
    return OurpalmTable;
}());
exports.OurpalmTable = OurpalmTable;
//# sourceMappingURL=ourpalm-table.js.map