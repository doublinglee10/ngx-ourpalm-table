import {
    ApplicationRef,
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    Injector,
    Input,
    OnDestroy,
    OnInit
} from "@angular/core";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";
import {OurpalmTable} from "../model/ourpalm-table";
import {RowContextMenuComponent} from "./row-context-menu.component";
import {uuid} from "../model/uuid";

@Component({
    selector: '[ourpalm-table-rows]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./ourpalm-table-rows.component.css'],
    template: `
        <ng-container [ngSwitch]="dynamicColumn">
            <ng-container *ngSwitchCase="true">
                <!--动态列-->
                <tr *simpleNgFor="let row of rows; let i = index;"
                    [ngClass]="{'row-selected': row.__selected__}"
                    (click)="onClickRow(i, row, $event)"

                    dynamic-event-directive
                    [listenDbClickEvent]="table.onDbClickRow"
                    (onDbClick)="table.onDbClickRow(i, row)">
                    <!--[listenClickEvent]="table.onClickRow"-->
                    <!--(onClick)="table.onClickRow(i, row)"-->
                    <ng-container *simpleNgFor="let column of table.columns; let j = index">
                        <td ourpalm-table-dynamic-column
                            [table]="table"
                            [row]="row"
                            [column]="column"
                            [index]="i"
                            [class.hidden]="!column.show"
                            [ngStyle]="getStyler(column, i, j, row)"
                            [listenClickEvent]="table.onClickCell"
                            (onClick)="table.onClickCell(i, j, row, column)"
                            dynamic-event-directive
                            [listenDbClickEvent]="table.onDbClickCell"
                            (onDbClick)="table.onDbClickCell(i, j, row, column)"
                            [listenContextMenuEvent]="!!table.rowMenus"
                            (onContextMenu)="showContextMenu($event, i, j, row, column)">
                        </td>
                    </ng-container>
                </tr>
            </ng-container>
            <ng-container *ngSwitchCase="false">
                <!--静态列-->
                <tr *simpleNgFor="let row of rows; let i = index;"
                    [ngClass]="{'row-selected': row.__selected__}"
                    (click)="onClickRow(i, row, $event)"

                    dynamic-event-directive
                    [listenDbClickEvent]="table.onDbClickRow"
                    (onDbClick)="table.onDbClickRow(i, row)">
                    <!--[listenClickEvent]="table.onClickRow"-->
                    <!--(onClick)="table.onClickRow(i, row)"-->
                    <td *simpleNgFor="let col of table.columns; let j = index"
                        [class.hidden]="!col.show"
                        [ngStyle]="getStyler(col, i, j, row)"
                        dynamic-event-directive
                        [listenClickEvent]="table.onClickCell"
                        (onClick)="table.onClickCell(i, j, row, col)"
                        [listenDbClickEvent]="table.onDbClickCell"
                        (onDbClick)="table.onDbClickCell(i, j, row, col)"
                        [listenContextMenuEvent]="!!table.rowMenus"
                        (onContextMenu)="showContextMenu($event, i, j, row, col)">
                        <ourpalm-table-columnTemplateRenderer [table]="table"
                                                              [column]="col"
                                                              [row]="row"
                                                              [index]="i">
                        </ourpalm-table-columnTemplateRenderer>
                    </td>
                </tr>
            </ng-container>
            <!--<row-context-menu [menus]="table.rowMenus" [rowComponent]="this"></row-context-menu>-->
        </ng-container>
    `
})
export class OurpalmTableRowComponent implements OnInit, OnDestroy {

    @Input() rows: any[];

    @Input() columns: OurpalmTableColumn[];

    @Input() table: OurpalmTable;

    @Input() dynamicColumn: boolean;

    private contextMenu: RowContextMenuComponent;
    private contextMenuRef: ComponentRef<RowContextMenuComponent>;

    constructor(public el: ElementRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector) {
    }

    ngOnInit(): void {
        if (this.table.rowMenus && this.table.rowMenus.length > 0) {
            this.appendRowContextMenuComponentToBody();
        }
    }

    ngOnDestroy(): void {
        if (this.contextMenuRef) {
            // remove it from the component tree and from the DOM
            this.appRef.detachView(this.contextMenuRef.hostView);
            this.contextMenuRef.destroy();
        }
    }

    appendRowContextMenuComponentToBody() {
        // Create a component reference from the component
        this.contextMenuRef = this.componentFactoryResolver
            .resolveComponentFactory(RowContextMenuComponent)
            .create(this.injector);

        // Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(this.contextMenuRef.hostView);

        // Get DOM element from component
        const domElem = (this.contextMenuRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // Append DOM element to the body
        document.body.appendChild(domElem);

        // set @Input() properties
        this.contextMenu = this.contextMenuRef.instance;
        this.contextMenu.rowComponent = this;
        this.contextMenu.menus = this.table.rowMenus;
        this.contextMenu.changeDetectorRef.detectChanges();
    }

    getStyler(column: OurpalmTableColumn, rowIndex: number, columnIndex: number, rowData: any) {
        if (typeof column.styler == 'function') {
            return column.styler(rowIndex, columnIndex, rowData);
        } else {
            return column.styler;
        }
    }

    onClickRow(rowIndex: number, rowData: any, event: any) {
        if (this.table.onClickRow) {
            this.table.onClickRow(rowIndex, rowData);
        }

        if (this.table.singleSelect || (!this.table.singleSelect && this.table.ctrlSelect && !event.ctrlKey)) {
            this.table.rows.forEach((row) => {
                if (row !== rowData) { //如果这个row不是当前点击的row
                    if (row.__selected__) {
                        row.__uuid__ = uuid();
                        row.__selected__ = false;
                    }
                } else {
                    row.__selected__ = !row.__selected__;
                    row.__uuid__ = uuid();
                }
            });
        } else {
            rowData.__selected__ = !rowData.__selected__;
            rowData.__uuid__ = uuid();
        }

        if (this.table.selectOnCheck) {
            this.table.rows.forEach((row: any) => {
                if (row.__checked__ != row.__selected__) {
                    row.__checked__ = !!row.__selected__;
                    row.__uuid__ = uuid();
                }
            });
        }
    }

    showContextMenu(event: any, rowIndex: number, cellIndex: number, rowData: any, column: OurpalmTableColumn) {
        if (!column.disabledContextMenu) {
            event.preventDefault();
            if (!rowData.__selected__) {
                this.onClickRow(rowIndex, rowData, event);
            }
            this.contextMenu.styler = {
                display: 'block',
                position: 'absolute',
                left: `${event.pageX}px`,
                top: `${event.pageY}px`
            };
            this.contextMenu.changeDetectorRef.markForCheck();
        }
    }
}
