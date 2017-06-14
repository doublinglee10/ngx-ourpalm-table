import { OnInit, TemplateRef } from "@angular/core";
import { OurpalmTableColumn } from "../model/ourpalm-table-column";
import { OurpalmTable } from "../model/ourpalm-table";
export declare class OurpalmTableStaticColumnComponent implements OnInit {
    column: OurpalmTableColumn;
    template: TemplateRef<any>;
    ngOnInit(): void;
}
export declare class OurpalmTableColumnTemplateRenderer implements OnInit {
    columnDir: OurpalmTableStaticColumnComponent;
    row: any;
    index: number;
    table: OurpalmTable;
    column: OurpalmTableColumn;
    ngOnInit(): void;
    private onCheckBoxChange();
}
