import {Component, ContentChild, TemplateRef} from "@angular/core";

@Component({
    selector: 'ourpalm-table-rowview',
    template: ` `
})
export class OurpalmTableRowViewComponent {

    @ContentChild(TemplateRef)
    template: TemplateRef<any>;

}
