import {Component, ContentChild, Input, TemplateRef} from "@angular/core";
import {OurpalmTableColumn} from "../../model/ourpalm-table-column";

@Component({
    selector: 'ourpalm-table-column',
    template: ` `
})
export class OurpalmTableColumnComponent {

    @Input()
    column: OurpalmTableColumn;

    @ContentChild(TemplateRef)
    template: TemplateRef<any>;
}