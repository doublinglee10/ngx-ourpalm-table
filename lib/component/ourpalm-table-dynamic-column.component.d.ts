import { ChangeDetectorRef, DoCheck, OnChanges } from "@angular/core";
import { OurpalmTableColumn } from "../model/ourpalm-table-column";
import { OurpalmTable } from "../model/ourpalm-table";
export declare class OurpalmTableDynamicColumnComponent implements OnChanges, DoCheck {
    changeDetectorRef: ChangeDetectorRef;
    row: any;
    index: number;
    table: OurpalmTable;
    column: OurpalmTableColumn;
    constructor(changeDetectorRef: ChangeDetectorRef);
    readonly value: any;
    onClickCheckBox(event: Event): void;
    onCheckBoxChange(event: Event): void;
    private lastRowUuid;
    private lastColumnUuid;
    ngOnChanges(): void;
    ngDoCheck(): void;
}
