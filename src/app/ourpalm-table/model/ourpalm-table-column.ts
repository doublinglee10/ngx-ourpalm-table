import {TemplateRef} from "@angular/core";

/**
 * 表属性
 */
export class OurpalmTableColumn {
    /** 表头 */
    header: string = '';
    /** 字段名称 */
    field: string = '';
    /** 是否列排序 */
    sort?: boolean = false;
    /** 列排序方向,取值 asc 或 desc 或 null*/
    sortOrder?: string = null;
    /** 是否为行号列 1...* */
    rownumbers?: boolean = false;
    /** 是否隐藏列 */
    show?: boolean = true;
    /** 是否为多选列 */
    checkbox?: boolean = false;
    /** 单元格formatter(格式化器)函数 */
    formatter?: (value: any, row: any) => {} = (value, row) => value;
    sorter?: (column: OurpalmTableColumn, row1: any, row2: any) => {} = (column, row1, row2) => {
        return row1[column.field] - row2[column.field];
    };

    __template__: TemplateRef<any>;

    constructor(optcolumn: OurpalmTableColumn) {
        // this = table;
        let table = Object.assign({}, {
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
}