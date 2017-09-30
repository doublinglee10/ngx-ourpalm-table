import {TemplateRef} from "@angular/core";

/**
 * 表列属性
 */
export class OurpalmTableColumn {
    /** 表头 */
    header: string = '';
    /** 字段名称 */
    field: string = '';
    /** 是否列排序 */
    sort?: boolean = false;
    /** 列排序方向,取值 asc 或 desc 或 null*/
    sortOrder?: 'asc' | 'desc' | null = null;
    /** 是否为行号列 1...* */
    rownumbers?: boolean = false;
    /** 是否隐藏列 */
    show?: boolean = true;
    /** 是否为多选列 */
    checkbox?: boolean = false;
    /** 是否禁止右键菜单 */
    disabledContextMenu?: boolean = false;
    /** td的宽 */
    styler?: (rowIndex: number, columnIndex: number, rowData: any) => any;
    /** 单元格formatter(格式化器)函数 */
    formatter?: (value: any, row: any) => {} = (value, row) => value;
    /** 列排序函数 */
    sorter?: (column: OurpalmTableColumn, row1: any, row2: any) => {} | any = (column, row1, row2) => {
        return row1[column.field] - row2[column.field];
    };

    template?: TemplateRef<any>;

    constructor(optcolumn: OurpalmTableColumn) {
        Object.assign(this, optcolumn);
    }
}
