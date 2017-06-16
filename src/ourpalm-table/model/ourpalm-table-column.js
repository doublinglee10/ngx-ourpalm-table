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
        /** 列排序方向,取值 asc 或 desc */
        this.sortOrder = 'asc';
        /** 是否为行号列 1...* */
        this.rownumbers = false;
        /** 是否隐藏列 */
        this.show = true;
        /** 是否为多选列 */
        this.checkbox = false;
        // this = table;
        var table = Object.assign({}, {
            header: '',
            field: '',
            sort: false,
            sortOrder: 'asc',
            rownumbers: false,
            show: true,
            checkbox: false,
            formatter: function (value, row) { return value; }
        }, optcolumn);
        this.header = table.header;
        this.field = table.field;
        this.sort = table.sort;
        this.sortOrder = table.sortOrder;
        this.rownumbers = table.rownumbers;
        this.show = table.show;
        this.checkbox = table.checkbox;
        this.formatter = table.formatter;
    }
    return OurpalmTableColumn;
}());
exports.OurpalmTableColumn = OurpalmTableColumn;
