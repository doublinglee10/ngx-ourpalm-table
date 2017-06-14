/**
 * 表属性
 */
export declare class OurpalmTableColumn {
    /** 表头 */
    header: string;
    /** 字段名称 */
    field: string;
    /** 是否列排序 */
    sort?: boolean;
    /** 列排序方向,取值 asc 或 desc */
    sortOrder?: string;
    /** 是否为行号列 1...* */
    rownumbers?: boolean;
    /** 是否隐藏列 */
    show?: boolean;
    /** 是否为多选列 */
    checkbox?: boolean;
    /** 单元格formatter(格式化器)函数 */
    formatter?: (value, row) => {};
    constructor(optcolumn: OurpalmTableColumn);
}
