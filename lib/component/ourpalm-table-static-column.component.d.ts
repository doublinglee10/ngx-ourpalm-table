import { ChangeDetectorRef, DoCheck, OnChanges, OnInit, TemplateRef } from "@angular/core";
import { OurpalmTableColumn } from "../model/ourpalm-table-column";
import { OurpalmTable } from "../model/ourpalm-table";
export declare class OurpalmTableStaticColumnComponent implements OnInit {
    column: OurpalmTableColumn;
    template: TemplateRef<any>;
    ngOnInit(): void;
}
export declare class OurpalmTableColumnTemplateRenderer implements OnChanges, DoCheck {
    changeDetectorRef: ChangeDetectorRef;
    row: any;
    index: number;
    table: OurpalmTable;
    column: OurpalmTableColumn;
    constructor(changeDetectorRef: ChangeDetectorRef);
    onClickCheckBox(event: Event): void;
    onCheckBoxChange(event: Event): void;
    private lastUuid;
    ngOnChanges(): void;
    ngDoCheck(): void;
}
