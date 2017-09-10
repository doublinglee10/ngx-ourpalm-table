import { DomSanitizer } from "@angular/platform-browser";
import { PipeTransform } from "@angular/core";
export declare class SafeHtmlPipe implements PipeTransform {
    private sanitized;
    constructor(sanitized: DomSanitizer);
    transform(value: any): any;
}
