import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
var SimpleNgForRow = (function () {
    function SimpleNgForRow($implicit, index) {
        this.$implicit = $implicit;
        this.index = index;
    }
    Object.defineProperty(SimpleNgForRow.prototype, "even", {
        get: function () {
            return this.index % 2 === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleNgForRow.prototype, "odd", {
        get: function () {
            return !this.even;
        },
        enumerable: true,
        configurable: true
    });
    return SimpleNgForRow;
}());
export { SimpleNgForRow };
var SimpleNgFor = (function () {
    function SimpleNgFor(_viewContainer, _template) {
        this._viewContainer = _viewContainer;
        this._template = _template;
    }
    Object.defineProperty(SimpleNgFor.prototype, "ngForTemplate", {
        set: function (value) {
            if (value) {
                this._template = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    SimpleNgFor.prototype.ngDoCheck = function () {
        var oldLen = this._viewContainer.length;
        var newLen = this.simpleNgForOf.length;
        var minLen = Math.min(oldLen, newLen);
        for (var i = 0; i < minLen; i++) {
            var row = this.simpleNgForOf[i];
            var viewRef = this._viewContainer.get(i);
            viewRef.context.$implicit = row;
        }
        for (var i = oldLen; i < newLen; i++) {
            var row = this.simpleNgForOf[i];
            this._viewContainer.createEmbeddedView(this._template, new SimpleNgForRow(row, i));
        }
        for (var i = oldLen - 1; i >= newLen; i--) {
            this._viewContainer.remove(i);
        }
    };
    return SimpleNgFor;
}());
export { SimpleNgFor };
SimpleNgFor.decorators = [
    { type: Directive, args: [{
                selector: '[simpleNgFor][simpleNgForOf]'
            },] },
];
SimpleNgFor.ctorParameters = function () { return [
    { type: ViewContainerRef, },
    { type: TemplateRef, },
]; };
SimpleNgFor.propDecorators = {
    'simpleNgForOf': [{ type: Input },],
    'ngForTemplate': [{ type: Input },],
};
//# sourceMappingURL=simple-ngfor.directive.js.map