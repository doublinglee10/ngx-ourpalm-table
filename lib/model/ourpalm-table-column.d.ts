import { TemplateRef } from "@angular/core";
export declare class OurpalmTableColumn {
    header: string;
    field: string;
    sort?: boolean;
    sortOrder?: string;
    rownumbers?: boolean;
    show?: boolean;
    checkbox?: boolean;
    disabledContextMenu?: boolean;
    styler?: (rowIndex: number, columnIndex: number, rowData: any) => any;
    formatter?: (value: any, row: any) => {};
    sorter?: (column: OurpalmTableColumn, row1: any, row2: any) => {} | any;
    __uuid__?: string;
    __fshow__?: any;
    __lshow__?: any;
    __rshow__?: any;
    template?: TemplateRef<any>;
    constructor(optcolumn: OurpalmTableColumn);
}
