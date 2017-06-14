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
    /** 列排序方向,取值 asc 或 desc */
    sortOrder?: string = 'asc';
    /** 是否为行号列 1...* */
    rownumbers?: boolean = false;
    /** 是否隐藏列 */
    show?: boolean = true;
    /** 是否为多选列 */
    checkbox?: boolean = false;
    /** 单元格formatter(格式化器)函数 */
    formatter?: (value: any, row: any) => {};

    constructor(optcolumn: OurpalmTableColumn) {
        // this = table;
        let table = Object.assign({}, {
            header: '',
            field: '',
            sort: false,
            sortOrder: 'asc',
            rownumbers: false,
            show: true,
            checkbox: false,
            formatter: (value: any, row: any) => value
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
}