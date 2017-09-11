import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Renderer2 } from "@angular/core";
import { RowContextMenu } from "../model/row-content-menu";
var RowContextMenuComponent = (function () {
    function RowContextMenuComponent(changeDetectorRef, renderer) {
        this.changeDetectorRef = changeDetectorRef;
        this.renderer = renderer;
    }
    Object.defineProperty(RowContextMenuComponent.prototype, "menus", {
        get: function () {
            return this._menus;
        },
        set: function (_menus) {
            var _this = this;
            if (_menus) {
                this._menus = _menus.map(function (menu) { return _this.deepCloneMenu(menu); });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowContextMenuComponent.prototype, "styler", {
        get: function () {
            return this._styler;
        },
        set: function (styler) {
            this._styler = styler;
            if (styler && styler.display == 'none') {
                this.removeListener();
            }
            else if (styler && styler.display == 'block') {
                this.addListener();
            }
        },
        enumerable: true,
        configurable: true
    });
    RowContextMenuComponent.prototype.addListener = function () {
        var _this = this;
        if (this.menus) {
            if (!this.clickListen) {
                this.clickListen = this.renderer.listen(document, 'click', function (event) {
                    _this.styler = { display: 'none' };
                    _this.changeDetectorRef.markForCheck();
                });
            }
            if (!this.contextMenuListen) {
                this.contextMenuListen = this.renderer.listen(document, 'contextmenu', function (event) {
                    if (!_this.rowComponent.el.nativeElement.contains(event.target)) {
                        _this.styler = { display: 'none' };
                        _this.changeDetectorRef.markForCheck();
                    }
                });
            }
        }
    };
    RowContextMenuComponent.prototype.removeListener = function () {
        if (this.clickListen) {
            this.clickListen();
            this.clickListen = null;
        }
        if (this.contextMenuListen) {
            this.contextMenuListen();
            this.contextMenuListen = null;
        }
    };
    RowContextMenuComponent.prototype.onClickMenu = function (menu) {
        this.styler = { display: 'none' };
        menu.onclick && menu.onclick();
    };
    RowContextMenuComponent.prototype.showMenu = function (menu) {
        if (typeof menu.show == "function") {
            return menu.show();
        }
        return menu.show;
    };
    RowContextMenuComponent.prototype.deepCloneMenu = function (menu) {
        var _this = this;
        if (menu.submenus) {
            menu.submenus = menu.submenus.map(function (submenu) {
                return _this.deepCloneMenu(submenu);
            });
        }
        return new RowContextMenu(menu);
    };
    return RowContextMenuComponent;
}());
export { RowContextMenuComponent };
RowContextMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ourpalm-table-row-context-menu',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["/** 多级菜单样式开始 */ .dropdown-submenu { position: relative; } .dropdown-submenu > .dropdown-menu { top: 0; left: 100%; margin-top: -6px; margin-left: -1px; -webkit-border-radius: 0 6px 6px 6px; -moz-border-radius: 0 6px 6px; border-radius: 0 6px 6px 6px; } .dropdown-submenu:hover > .dropdown-menu { display: block; } .dropdown-submenu > a:after { display: block; content: \" \"; float: right; width: 0; height: 0; border-color: transparent; border-style: solid; border-width: 5px 0 5px 5px; border-left-color: #ccc; margin-top: 5px; margin-right: -10px; } .dropdown-submenu:hover > a:after { border-left-color: #fff; } .dropdown-submenu.pull-left { float: none; } .dropdown-submenu.pull-left > .dropdown-menu { left: -100%; margin-left: 10px; -webkit-border-radius: 6px 0 6px 6px; -moz-border-radius: 6px 0 6px 6px; border-radius: 6px 0 6px 6px; } .dropdown-menu > li > a { padding: 3px 20px 3px 10px; } /** 多级菜单样式 结束 */ .row-context-menu { display: none; } .row-context-menu > .dropdown-menu { display: block; } .row-context-menu .empty-icon { display: inline-block; width: 23px; } "],
                template: "\n        <ng-template #menusTpl let-menus>\n            <ul class=\"dropdown-menu\">\n                <ng-container *simpleNgFor=\"let menu of menus\">\n                    <ng-container *ngIf=\"menu.separator\">\n                        <li class=\"divider\" [class.hidden]=\"!showMenu(menu)\"></li>\n                    </ng-container>\n                    <ng-container *ngIf=\"!menu.separator && !menu.submenus\">\n                        <li (click)=\"onClickMenu(menu)\" [class.hidden]=\"!showMenu(menu)\">\n                            <a><i [ngClass]=\"menu.iconCls || 'empty-icon'\"></i>{{ menu.text }}</a>\n                        </li>\n                    </ng-container>\n                    <ng-container *ngIf=\"menu.submenus\">\n                        <li class=\"dropdown-submenu\" [class.hidden]=\"!showMenu(menu)\">\n                            <a tabindex=\"-1\"><i [ngClass]=\"menu.iconCls || 'empty-icon'\"></i>{{ menu.text }}</a>\n                            <ng-container *ngTemplateOutlet=\"menusTpl;context:{$implicit: menu.submenus}\">\n                            </ng-container>\n                        </li>\n                    </ng-container>\n                </ng-container>\n            </ul>\n        </ng-template>\n\n\n        <div class=\"row-context-menu\" *ngIf=\"menus\" [ngStyle]=\"styler\">\n            <ng-container *ngTemplateOutlet=\"menusTpl; context:{ $implicit: menus }\"></ng-container>\n        </div>\n    "
            },] },
];
RowContextMenuComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
    { type: Renderer2, },
]; };
RowContextMenuComponent.propDecorators = {
    'rowComponent': [{ type: Input },],
    'menus': [{ type: Input, args: ['menus',] },],
    'styler': [{ type: Input },],
};
//# sourceMappingURL=row-context-menu.component.js.map