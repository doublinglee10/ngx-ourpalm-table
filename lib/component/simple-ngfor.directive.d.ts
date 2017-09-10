import { DoCheck, TemplateRef, ViewContainerRef } from '@angular/core';
export declare class SimpleNgForRow {
    $implicit: any;
    index: number;
    constructor($implicit: any, index: number);
    readonly even: boolean;
    readonly odd: boolean;
}
export declare class SimpleNgFor implements DoCheck {
    private _viewContainer;
    private _template;
    simpleNgForOf: any[];
    constructor(_viewContainer: ViewContainerRef, _template: TemplateRef<SimpleNgForRow>);
    ngForTemplate: TemplateRef<SimpleNgForRow>;
    ngDoCheck(): void;
}
