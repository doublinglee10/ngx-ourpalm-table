import { ChangeDetectorRef, Renderer2 } from "@angular/core";
import { RowContextMenu } from "../model/row-content-menu";
import { OurpalmTableRowComponent } from "./ourpalm-table-rows.component";
export declare class RowContextMenuComponent {
    changeDetectorRef: ChangeDetectorRef;
    private renderer;
    _styler: any;
    _menus: RowContextMenu[];
    rowComponent: OurpalmTableRowComponent;
    clickListen: any;
    contextMenuListen: any;
    constructor(changeDetectorRef: ChangeDetectorRef, renderer: Renderer2);
    menus: RowContextMenu[];
    styler: any;
    addListener(): void;
    removeListener(): void;
    onClickMenu(menu: RowContextMenu): void;
    showMenu(menu: RowContextMenu): boolean;
}
