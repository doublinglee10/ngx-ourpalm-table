import {TemplateRef} from "@angular/core";

/**
 * 表列属性
 */
export class OurpalmTableColumn {
    /** 表头 */
    header: string = '';

    headerTpl?:TemplateRef<any>;
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
    styler?: (rowIndex: number, columnIndex: number, rowData: any) => any | any;
    /** 单元格formatter(格式化器)函数 */
    formatter?: (value: any, row: any) => {} = (value, row) => value;
    /** td的class*/
    clazz?: string;
    /** 列排序函数 */
    sorter?: (column: OurpalmTableColumn, row1: any, row2: any) => any = (column, row1, row2) => {
        let param1 = row1[column.field];
        let param2 = row2[column.field];
        //如果两个参数均为字符串类型
        if (typeof param1 == "string" && typeof param2 == "string") {
            return param1.localeCompare(param2);
        }
        //如果参数1为数字，参数2为字符串
        if (typeof param1 == "number" && typeof param2 == "string") {
            return -1;
        }
        //如果参数1为字符串，参数2为数字
        if (typeof param1 == "string" && typeof param2 == "number") {
            return 1;
        }
        //如果两个参数均为数字
        if (typeof param1 == "number" && typeof param2 == "number") {
            if (param1 > param2) return 1;
            if (param1 == param2) return 0;
            if (param1 < param2) return -1;
        }
    };

    template?: TemplateRef<any>;

    constructor(column: OurpalmTableColumn) {
        Object.assign(this, column);
    }
}
