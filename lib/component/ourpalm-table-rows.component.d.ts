import { ApplicationRef, ComponentFactoryResolver, ElementRef, Injector, OnDestroy, OnInit } from "@angular/core";
import { OurpalmTableColumn } from "../model/ourpalm-table-column";
import { OurpalmTable } from "../model/ourpalm-table";
export declare class OurpalmTableRowComponent implements OnInit, OnDestroy {
    el: ElementRef;
    private componentFactoryResolver;
    private appRef;
    private injector;
    rows: any[];
    columns: OurpalmTableColumn[];
    table: OurpalmTable;
    dynamicColumn: boolean;
    private contextMenu;
    private contextMenuRef;
    constructor(el: ElementRef, componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    ngOnInit(): void;
    ngOnDestroy(): void;
    appendRowContextMenuComponentToBody(): void;
    getStyler(column: OurpalmTableColumn, rowIndex: number, columnIndex: number, rowData: any): any;
    onClickRow(rowIndex: number, rowData: any, event: any): void;
    showContextMenu(event: any, rowIndex: number, cellIndex: number, rowData: any, column: OurpalmTableColumn): void;
}
