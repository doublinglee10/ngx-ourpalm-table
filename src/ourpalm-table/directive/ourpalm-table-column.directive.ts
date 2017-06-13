import {Input, OnInit, TemplateRef, ViewContainerRef, Component, ViewChild, AfterViewInit} from "@angular/core";
import {OurpalmTableColumn} from "../model/ourpalm-table-column";

export class ColumnContext {
    constructor(public $implicit: any) {

    }
}


@Component({
    selector: 'ourpalm-table-column',
    template: `
        <h1>hello</h1>
        <ng-template #tpl>
            <ng-content></ng-content>
        </ng-template>
    `
})
export class OurpalmTableColumnDirective implements OnInit,AfterViewInit {

    @Input('column')
    column: OurpalmTableColumn;

    @ViewChild('tpl')
    tplRef: TemplateRef<any>;

    @ViewChild('tpl', {read: ViewContainerRef})
    tplVcRef: ViewContainerRef;

    $row: any = 'abc';

    constructor(private _viewContainer: ViewContainerRef) {
        // console.warn(arguments);
        // let tpl = this.tplVcRef.createEmbeddedView(this.tplRef);
        // console.warn(tpl);
    }

    ngOnInit(): void {
        this.column = new OurpalmTableColumn(this.column);
    }

    ngAfterViewInit(): void {
        let tpl = this.tplVcRef.createEmbeddedView(this.tplRef);
        console.warn(tpl);

        // let tpl = this.tplRef.createEmbeddedView(null);
    }

    createView(container: ViewContainerRef) {
        let tpl = container.createEmbeddedView(this.tplRef);
        console.warn(tpl);
    }
}