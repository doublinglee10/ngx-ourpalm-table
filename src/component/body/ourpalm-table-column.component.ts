import {Component, ContentChild, Input, TemplateRef,AfterContentInit} from "@angular/core";
import {OurpalmTableColumn} from "../../model/ourpalm-table-column";

@Component({
    selector: 'ourpalm-table-column',
    template: ` `
})
export class OurpalmTableColumnComponent implements AfterContentInit{

    @Input()
    column: OurpalmTableColumn;

    @ContentChild(TemplateRef)
    template: TemplateRef<any>;

    @ContentChild('header', {read: TemplateRef})
    headerTemplate: TemplateRef<any>;

    @ContentChild('row',{read:TemplateRef})
    rowTemplate:TemplateRef<any>;

    ngAfterContentInit(){
        this.template = this.rowTemplate || this.template;
    }



}