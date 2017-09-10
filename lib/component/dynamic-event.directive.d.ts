import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from "@angular/core";
export declare class DynamicEventDirective implements OnInit, OnDestroy {
    private el;
    private renderer;
    listenClickEvent: boolean;
    listenDbClickEvent: boolean;
    listenContextMenuEvent: boolean;
    onClick: EventEmitter<Event>;
    onDbClick: EventEmitter<Event>;
    onContextMenu: EventEmitter<Event>;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
