"use strict";
exports.__esModule = true;
/**
 * 表属性
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
        /** 单元格formatter(格式化器)函数 */
        this.formatter = function (value, row) { return value; };
        this.sorter = function (column, row1, row2) {
            return row1[column.field] - row2[column.field];
        };
        // this = table;
        var table = Object.assign({}, {
            header: this.header,
            field: this.field,
            sort: this.sort,
            sortOrder: this.sortOrder,
            rownumbers: this.rownumbers,
            show: this.show,
            checkbox: this.checkbox,
            formatter: this.formatter,
            sorter: this.sorter,
            __template__: this.__template__
        }, optcolumn);
        this.header = table.header;
        this.field = table.field;
        this.sort = table.sort;
        this.sortOrder = table.sortOrder;
        this.rownumbers = table.rownumbers;
        this.show = table.show;
        this.checkbox = table.checkbox;
        this.formatter = table.formatter;
        this.sorter = table.sorter;
        this.__template__ = table.__template__;
    }
    return OurpalmTableColumn;
}());
exports.OurpalmTableColumn = OurpalmTableColumn;
