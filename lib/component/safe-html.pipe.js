import { DomSanitizer } from "@angular/platform-browser";
import { Pipe } from "@angular/core";
var SafeHtmlPipe = (function () {
    function SafeHtmlPipe(sanitized) {
        this.sanitized = sanitized;
    }
    SafeHtmlPipe.prototype.transform = function (value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    };
    return SafeHtmlPipe;
}());
export { SafeHtmlPipe };
SafeHtmlPipe.decorators = [
    { type: Pipe, args: [{ name: 'safeHtml' },] },
];
SafeHtmlPipe.ctorParameters = function () { return [
    { type: DomSanitizer, },
]; };
//# sourceMappingURL=safe-html.pipe.js.map