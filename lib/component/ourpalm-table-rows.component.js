import { ApplicationRef, ChangeDetectionStrategy, Component, ComponentFactoryResolver, ElementRef, Injector, Input } from "@angular/core";
import { RowContextMenuComponent } from "./row-context-menu.component";
import { uuid } from "../model/uuid";
var OurpalmTableRowComponent = (function () {
    function OurpalmTableRowComponent(el, componentFactoryResolver, appRef, injector) {
        this.el = el;
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    OurpalmTableRowComponent.prototype.ngOnInit = function () {
        if (this.table.rowMenus && this.table.rowMenus.length > 0) {
            this.appendRowContextMenuComponentToBody();
        }
    };
    OurpalmTableRowComponent.prototype.ngOnDestroy = function () {
        if (this.contextMenuRef) {
            this.appRef.detachView(this.contextMenuRef.hostView);
            this.contextMenuRef.destroy();
        }
    };
    OurpalmTableRowComponent.prototype.appendRowContextMenuComponentToBody = function () {
        this.contextMenuRef = this.componentFactoryResolver
            .resolveComponentFactory(RowContextMenuComponent)
            .create(this.injector);
        this.appRef.attachView(this.contextMenuRef.hostView);
        var domElem = this.contextMenuRef.hostView
            .rootNodes[0];
        document.body.appendChild(domElem);
        this.contextMenu = this.contextMenuRef.instance;
        this.contextMenu.rowComponent = this;
        this.contextMenu.menus = this.table.rowMenus;
        this.contextMenu.changeDetectorRef.detectChanges();
    };
    OurpalmTableRowComponent.prototype.getStyler = function (column, rowIndex, columnIndex, rowData) {
        if (typeof column.styler == 'function') {
            return column.styler(rowIndex, columnIndex, rowData);
        }
        else {
            return column.styler;
        }
    };
    OurpalmTableRowComponent.prototype.onClickRow = function (rowIndex, rowData, event) {
        if (this.table.onClickRow) {
            this.table.onClickRow(rowIndex, rowData);
        }
        if (this.table.singleSelect || (!this.table.singleSelect && this.table.ctrlSelect && !event.ctrlKey)) {
            this.table.rows.forEach(function (row) {
                if (row !== rowData) {
                    if (row.__selected__) {
                        row.__uuid__ = uuid();
                        row.__selected__ = false;
                    }
                }
                else {
                    row.__selected__ = !row.__selected__;
                    row.__uuid__ = uuid();
                }
            });
        }
        else {
            rowData.__selected__ = !rowData.__selected__;
            rowData.__uuid__ = uuid();
        }
        if (this.table.selectOnCheck) {
            this.table.rows.forEach(function (row) {
                if (row.__checked__ != row.__selected__) {
                    row.__checked__ = !!row.__selected__;
                    row.__uuid__ = uuid();
                }
            });
        }
    };
    OurpalmTableRowComponent.prototype.showContextMenu = function (event, rowIndex, cellIndex, rowData, column) {
        if (!column.disabledContextMenu) {
            event.preventDefault();
            if (!rowData.__selected__) {
                this.onClickRow(rowIndex, rowData, event);
            }
            var length_1 = this.table.rowMenus.filter(function (menu) { return !menu.separator; }).filter(function (menu) {
                console.log(menu.text, typeof menu.show === 'function' ? menu.show() : menu.show);
                return typeof menu.show === 'function' ? menu.show() : menu.show;
            }).length;
            if (length_1 > 0) {
                this.contextMenu.styler = {
                    display: 'block',
                    position: 'absolute',
                    left: event.pageX + "px",
                    top: event.pageY + "px"
                };
                this.contextMenu.changeDetectorRef.markForCheck();
            }
            else if (this.contextMenu.styler && this.contextMenu.styler.display != 'none') {
                this.contextMenu.styler = {
                    display: 'none'
                };
                this.contextMenu.changeDetectorRef.markForCheck();
            }
        }
    };
    return OurpalmTableRowComponent;
}());
export { OurpalmTableRowComponent };
OurpalmTableRowComponent.decorators = [
    { type: Component, args: [{
                selector: '[ourpalm-table-rows]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["tr.row-selected { background-color: #ffdfff !important; /*background-color: #e4e3e3 !important;*/ }"],
                template: "\n        <ng-container [ngSwitch]=\"dynamicColumn\">\n            <ng-container *ngSwitchCase=\"true\">\n                <!--\u52A8\u6001\u5217-->\n                <tr *simpleNgFor=\"let row of rows; let i = index;\"\n                    [ngClass]=\"{'row-selected': row.__selected__}\"\n                    (click)=\"onClickRow(i, row, $event)\"\n\n                    dynamic-event-directive\n                    [listenDbClickEvent]=\"table.onDbClickRow\"\n                    (onDbClick)=\"table.onDbClickRow(i, row)\">\n                    <!--[listenClickEvent]=\"table.onClickRow\"-->\n                    <!--(onClick)=\"table.onClickRow(i, row)\"-->\n                    <ng-container *simpleNgFor=\"let column of table.columns; let j = index\">\n                        <td ourpalm-table-dynamic-column\n                            [table]=\"table\"\n                            [row]=\"row\"\n                            [column]=\"column\"\n                            [index]=\"i\"\n                            [class.hidden]=\"!column.show\"\n                            [ngStyle]=\"getStyler(column, i, j, row)\"\n                            [listenClickEvent]=\"table.onClickCell\"\n                            (onClick)=\"table.onClickCell(i, j, row, column)\"\n                            dynamic-event-directive\n                            [listenDbClickEvent]=\"table.onDbClickCell\"\n                            (onDbClick)=\"table.onDbClickCell(i, j, row, column)\"\n                            [listenContextMenuEvent]=\"!!table.rowMenus\"\n                            (onContextMenu)=\"showContextMenu($event, i, j, row, column)\">\n                        </td>\n                    </ng-container>\n                </tr>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"false\">\n                <!--\u9759\u6001\u5217-->\n                <tr *simpleNgFor=\"let row of rows; let i = index;\"\n                    [ngClass]=\"{'row-selected': row.__selected__}\"\n                    (click)=\"onClickRow(i, row, $event)\"\n\n                    dynamic-event-directive\n                    [listenDbClickEvent]=\"table.onDbClickRow\"\n                    (onDbClick)=\"table.onDbClickRow(i, row)\">\n                    <!--[listenClickEvent]=\"table.onClickRow\"-->\n                    <!--(onClick)=\"table.onClickRow(i, row)\"-->\n                    <td *simpleNgFor=\"let col of table.columns; let j = index\"\n                        [class.hidden]=\"!col.show\"\n                        [ngStyle]=\"getStyler(col, i, j, row)\"\n                        dynamic-event-directive\n                        [listenClickEvent]=\"table.onClickCell\"\n                        (onClick)=\"table.onClickCell(i, j, row, col)\"\n                        [listenDbClickEvent]=\"table.onDbClickCell\"\n                        (onDbClick)=\"table.onDbClickCell(i, j, row, col)\"\n                        [listenContextMenuEvent]=\"!!table.rowMenus\"\n                        (onContextMenu)=\"showContextMenu($event, i, j, row, col)\">\n                        <ourpalm-table-columnTemplateRenderer [table]=\"table\"\n                                                              [column]=\"col\"\n                                                              [row]=\"row\"\n                                                              [index]=\"i\">\n                        </ourpalm-table-columnTemplateRenderer>\n                    </td>\n                </tr>\n            </ng-container>\n            <!--<row-context-menu [menus]=\"table.rowMenus\" [rowComponent]=\"this\"></row-context-menu>-->\n        </ng-container>\n    "
            },] },
];
OurpalmTableRowComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: ComponentFactoryResolver, },
    { type: ApplicationRef, },
    { type: Injector, },
]; };
OurpalmTableRowComponent.propDecorators = {
    'rows': [{ type: Input },],
    'columns': [{ type: Input },],
    'table': [{ type: Input },],
    'dynamicColumn': [{ type: Input },],
};
//# sourceMappingURL=ourpalm-table-rows.component.js.map