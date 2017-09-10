import { ElementRef } from "@angular/core";
import { OurpalmTableColumn } from "../model/ourpalm-table-column";
import { OurpalmTable } from "../model/ourpalm-table";
import { RowContextMenuComponent } from "./row-context-menu.component";
export declare class OurpalmTableRowComponent {
    el: ElementRef;
    rows: any[];
    columns: OurpalmTableColumn[];
    table: OurpalmTable;
    dynamicColumn: boolean;
    contextMenu: RowContextMenuComponent;
    constructor(el: ElementRef);
    getStyler(column: OurpalmTableColumn, rowIndex: number, columnIndex: number, rowData: any): any;
    onClickRow(rowIndex: number, rowData: any, event: any): void;
    showContextMenu(event: any, rowIndex: number, cellIndex: number, rowData: any, column: OurpalmTableColumn): void;
}
