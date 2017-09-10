import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from "@angular/core";
var DynamicEventDirective = (function () {
    function DynamicEventDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.listenClickEvent = false;
        this.listenDbClickEvent = false;
        this.listenContextMenuEvent = false;
        this.onClick = new EventEmitter();
        this.onDbClick = new EventEmitter();
        this.onContextMenu = new EventEmitter();
    }
    DynamicEventDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.listenClickEvent) {
            this.renderer.listen(this.el.nativeElement, 'click', function (event) {
                _this.onClick.emit(event);
            });
        }
        if (this.listenDbClickEvent) {
            this.renderer.listen(this.el.nativeElement, 'dblclick', function (event) {
                _this.onDbClick.emit(event);
            });
        }
        if (this.listenContextMenuEvent) {
            this.renderer.listen(this.el.nativeElement, 'contextmenu', function (event) {
                _this.onContextMenu.emit(event);
            });
        }
    };
    DynamicEventDirective.prototype.ngOnDestroy = function () {
    };
    return DynamicEventDirective;
}());
export { DynamicEventDirective };
DynamicEventDirective.decorators = [
    { type: Directive, args: [{
                selector: '[dynamic-event-directive]'
            },] },
];
DynamicEventDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
]; };
DynamicEventDirective.propDecorators = {
    'listenClickEvent': [{ type: Input },],
    'listenDbClickEvent': [{ type: Input },],
    'listenContextMenuEvent': [{ type: Input },],
    'onClick': [{ type: Output },],
    'onDbClick': [{ type: Output },],
    'onContextMenu': [{ type: Output },],
};
//# sourceMappingURL=dynamic-event.directive.js.map