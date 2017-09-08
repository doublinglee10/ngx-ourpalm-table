import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2} from "@angular/core";

@Directive({
    selector: '[dynamic-event-directive]'
})
export class DynamicEventDirective implements OnInit, OnDestroy {

    @Input() listenClickEvent: boolean = false;
    @Input() listenDbClickEvent: boolean = false;
    @Input() listenContextMenuEvent: boolean = false;

    @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onDbClick: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onContextMenu: EventEmitter<Event> = new EventEmitter<Event>();

    constructor(private el: ElementRef,
                private renderer: Renderer2) {
    }

    ngOnInit(): void {
        if (this.listenClickEvent) {
            this.renderer.listen(this.el.nativeElement, 'click', (event) => {
                this.onClick.emit(event);
            });
        }

        if (this.listenDbClickEvent) {
            this.renderer.listen(this.el.nativeElement, 'dblclick', (event) => {
                this.onDbClick.emit(event);
            });
        }

        if (this.listenContextMenuEvent) {
            this.renderer.listen(this.el.nativeElement, 'contextmenu', (event) => {
                this.onContextMenu.emit(event);
            });
        }
    }

    ngOnDestroy(): void {
    }
}