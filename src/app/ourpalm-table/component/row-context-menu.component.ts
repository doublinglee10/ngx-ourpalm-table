import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Renderer2} from "@angular/core";
import {RowContextMenu} from "../model/row-content-menu";
import {OurpalmTableRowComponent} from "./ourpalm-table-rows.component";

@Component({
    selector: 'row-context-menu',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./row-context-menu.component.css'],
    template: `
        <ng-template #menusTpl let-menus>
            <ul class="dropdown-menu">
                <ng-container *ngFor="let menu of menus">
                    <ng-container *ngIf="menu.separator">
                        <li class="divider" [class.hidden]="!showMenu(menu)"></li>
                    </ng-container>
                    <ng-container *ngIf="!menu.separator && !menu.submenus">
                        <li (click)="onClickMenu(menu)" [class.hidden]="!showMenu(menu)">
                            <a><i [ngClass]="menu.iconCls || 'empty-icon'"></i>{{ menu.text }}</a>
                        </li>
                    </ng-container>
                    <ng-container *ngIf="menu.submenus">
                        <li class="dropdown-submenu" [class.hidden]="!showMenu(menu)">
                            <a tabindex="-1"><i [ngClass]="menu.iconCls || 'empty-icon'"></i>{{ menu.text }}</a>
                            <ng-container *ngTemplateOutlet="menusTpl;context:{$implicit: menu.submenus}">
                            </ng-container>
                        </li>
                    </ng-container>
                </ng-container>
            </ul>
        </ng-template>


        <div class="row-context-menu" *ngIf="menus" [ngStyle]="styler">
            <ng-container *ngTemplateOutlet="menusTpl; context:{ $implicit: menus }"></ng-container>
        </div>
    `
})
export class RowContextMenuComponent {

    _styler: any;
    _menus: RowContextMenu[];

    @Input() rowComponent: OurpalmTableRowComponent;

    clickListen: any;
    contextMenuListen: any;

    constructor(public changeDetectorRef: ChangeDetectorRef,
                private renderer: Renderer2) {
    }

    @Input('menus') set menus(_menus: RowContextMenu[]) {
        if (_menus) {
            this._menus = _menus.map((menu) => this.deepCloneMenu(menu));
        }
    }

    get menus() {
        return this._menus;
    }

    @Input() set styler(styler: any) {
        this._styler = styler;
        if (styler && styler.display == 'none') {
            this.removeListener();
        } else if (styler && styler.display == 'block') {
            this.addListener();
        }
    }

    get styler() {
        return this._styler;
    }

    addListener() {
        if (this.menus) {
            if (!this.clickListen) {
                this.clickListen = this.renderer.listen(document, 'click', (event) => {
                    this.styler = {display: 'none'};
                    this.changeDetectorRef.markForCheck();
                });
            }
            if (!this.contextMenuListen) {
                this.contextMenuListen = this.renderer.listen(document, 'contextmenu', (event) => {
                    if (!this.rowComponent.el.nativeElement.contains(event.target)) {
                        this.styler = {display: 'none'};
                        this.changeDetectorRef.markForCheck();
                    }
                });
            }
        }
    }

    removeListener() {
        if (this.clickListen) {
            this.clickListen();
            this.clickListen = null;
        }
        if (this.contextMenuListen) {
            this.contextMenuListen();
            this.contextMenuListen = null;
        }
    }

    onClickMenu(menu: RowContextMenu) {
        this.styler = {display: 'none'};
        menu.onclick && menu.onclick();
    }

    showMenu(menu: RowContextMenu): boolean {
        if (typeof menu.show == "function") {
            return menu.show();
        }
        return menu.show;
    }

    deepCloneMenu(menu: RowContextMenu): RowContextMenu {
        if (menu.submenus) {
            menu.submenus = menu.submenus.map((submenu: RowContextMenu) => {
                return this.deepCloneMenu(submenu);
            });
        }
        return new RowContextMenu(menu);
    }
}